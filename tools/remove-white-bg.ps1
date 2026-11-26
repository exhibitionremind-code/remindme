param(
  [Parameter(Mandatory = $true)]
  [string]$InputDirectory,
  [Parameter(Mandatory = $true)]
  [string]$OutputDirectory
)

Add-Type -AssemblyName System.Drawing

$sourceRoot = [System.IO.Path]::GetFullPath($InputDirectory)
$outputRoot = [System.IO.Path]::GetFullPath($OutputDirectory)
[System.IO.Directory]::CreateDirectory($outputRoot) | Out-Null

function Test-EdgeWhite([System.Drawing.Color]$color) {
  if ($color.A -eq 0) { return $true }
  $minimum = [Math]::Min($color.R, [Math]::Min($color.G, $color.B))
  $maximum = [Math]::Max($color.R, [Math]::Max($color.G, $color.B))
  return $minimum -ge 230 -and ($maximum - $minimum) -le 22
}

$results = foreach ($file in Get-ChildItem -LiteralPath $sourceRoot -Filter '*.png' -File) {
  $source = [System.Drawing.Bitmap]::FromFile($file.FullName)
  try {
    $bitmap = New-Object System.Drawing.Bitmap($source.Width, $source.Height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
      $graphics.DrawImageUnscaled($source, 0, 0)
    } finally {
      $graphics.Dispose()
    }

    $width = $bitmap.Width
    $height = $bitmap.Height
    $visited = New-Object 'bool[]' ($width * $height)
    $queue = New-Object 'System.Collections.Generic.Queue[int]'

    for ($x = 0; $x -lt $width; $x++) {
      $queue.Enqueue($x)
      if ($height -gt 1) { $queue.Enqueue((($height - 1) * $width) + $x) }
    }
    for ($y = 1; $y -lt ($height - 1); $y++) {
      $queue.Enqueue($y * $width)
      if ($width -gt 1) { $queue.Enqueue(($y * $width) + $width - 1) }
    }

    $removed = 0
    while ($queue.Count -gt 0) {
      $index = $queue.Dequeue()
      if ($visited[$index]) { continue }
      $visited[$index] = $true

      $x = $index % $width
      $y = [Math]::Floor($index / $width)
      $color = $bitmap.GetPixel($x, $y)
      if (-not (Test-EdgeWhite $color)) { continue }

      $minimum = [Math]::Min($color.R, [Math]::Min($color.G, $color.B))
      $alpha = if ($color.A -eq 0) { 0 } else { [Math]::Min(255, [Math]::Max(0, [Math]::Round((255 - $minimum) * 10.2))) }
      $bitmap.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $color.R, $color.G, $color.B))
      $removed++

      if ($x -gt 0) { $queue.Enqueue($index - 1) }
      if ($x + 1 -lt $width) { $queue.Enqueue($index + 1) }
      if ($y -gt 0) { $queue.Enqueue($index - $width) }
      if ($y + 1 -lt $height) { $queue.Enqueue($index + $width) }
    }

    $destination = Join-Path $outputRoot $file.Name
    $bitmap.Save($destination, [System.Drawing.Imaging.ImageFormat]::Png)
    $bitmap.Dispose()

    [PSCustomObject]@{
      Name = $file.Name
      Width = $width
      Height = $height
      PixelsMadeTransparent = $removed
      Output = $destination
    }
  } finally {
    $source.Dispose()
  }
}

$results | Sort-Object Name | Format-Table -AutoSize
