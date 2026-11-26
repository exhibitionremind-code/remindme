import { useEffect, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faListCheck,
  faHeadphones,
  faBookOpen,
  faUser,
  faHeartPulse,
  faBrain,
  faClock,
  faSeedling,
  faMusic,
  faPhone,
  faArrowLeft,
  faChevronRight,
  faCircleCheck,
  faPlus,
  faMagnifyingGlass,
  faPlay,
  faPause,
  faRotateRight,
  faBed,
  faFaceSmile,
  faFaceMeh,
  faFaceSadTear,
  faFaceAngry,
  faTriangleExclamation,
  faWind,
  faLocationDot,
  faXmark,
  faFloppyDisk,
  faRightFromBracket,
  faEnvelope,
  faLock,
  faUserLarge,
  faMobileScreen,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebook } from "@fortawesome/free-brands-svg-icons";
import {
  addEmergencyContact,
  getSession,
  hasSupabase,
  loadWorkspace,
  replaceTasks,
  resetPassword,
  saveMood,
  saveProfile,
  saveScreening,
  signIn,
  signInOAuth,
  signOut,
  signUp,
  watchSession,
} from "./lib/remindApi";

const nav = [
  ["home", "Beranda", faHouse],
  ["mood", "Mood Tracker", faHeartPulse],
  ["playlist", "Listening", faHeadphones],
  ["education", "Edukasi", faBookOpen],
  ["tasks", "Aktivitas", faListCheck],
  ["profile", "Profile", faUser],
];
const moodOptions = [
  ["Happy", faFaceSmile, "#f2c94c"],
  ["Okay", faFaceMeh, "#82c6b3"],
  ["Sad", faFaceSadTear, "#62a5c3"],
  ["Stressed", faBrain, "#be8bc6"],
  ["Angry", faFaceAngry, "#ef8c83"],
];
const moodImages = {
  Happy: "/assets/mood-happy-circle.png",
  Okay: "/assets/mood-okay-circle.png",
  Sad: "/assets/mood-sad-circle.png",
  Stressed: "/assets/mood-stressed-circle.png",
  Angry: "/assets/mood-angry-circle.png",
};
const education = [
  {
    topic: "Kesehatan Mental",
    icon: faSeedling,
    citation:
      "Vadnerkar, A., Daphale, S., & Kaul, A. (2025). Mental health literacy and awareness in young adults. Economic Sciences, 21(2), 139–145. https://doi.org/10.69889/ft32qh15",
    cards: [
      [
        "Apa arti kesehatan mental sebenarnya?",
        "Kesehatan mental bukan sekadar bebas dari gangguan jiwa, melainkan kondisi saat kamu merasa tenang, mampu mengenali potensi diri, dan sanggup menghadapi pasang surut kehidupan sehari-hari.",
      ],
      [
        "Berdamai dengan Diri Sendiri",
        "Tidak apa-apa jika hari ini terasa berat. Menerima kenyataan bahwa kamu sedang tidak baik-baik saja adalah langkah awal yang sangat berani untuk memulihkan kembali ketenangan batinmu.",
      ],
      [
        "Istirahat adalah Kebutuhan",
        "Mengambil waktu untuk berhenti sejenak bukanlah tanda kelemahan atau kemalasan. Otak dan mentalmu butuh waktu offline untuk memproses informasi dan mengisi ulang energi positif.",
      ],
      [
        "Mentalmu Berharga",
        "Jangan ragu untuk memprioritaskan kesehatan psikologis di tengah kesibukanmu. Merawat pikiran sama pentingnya dengan merawat kesehatan fisik agar kamu bisa terus bertumbuh secara seimbang.",
      ],
    ],
  },
  {
    topic: "Kenali Stres",
    icon: faBrain,
    citation:
      "Eslami, A., Mirzahosseini, H., & Monirpour, N. (2023). Modeling the mediating role of thinking styles in the relationship between human agency and self-regulation of knowledge by choosing styles to cope with academic stress in male students. Journal of Adolescent and Youth Psychological Studies (JAYPS), 4(1), 9-19. https://doi.org/10.61838/kman.jayps.4.1.2",
    cards: [
      [
        "Kenali Alarm Stresmu",
        "Saat pundak terasa kaku, kepala pening, atau emosi mendadak mudah tersulut, itu tanda fisik bahwa stres sedang menumpuk. Jangan diabaikan, segera ambil waktu untuk mengendurkan otot-ototmu.",
      ],
      [
        "Teknik Pernapasan",
        "Tarik napas dalam selama 4 detik, tahan selama 7 detik, lalu hembuskan perlahan lewat mulut selama 8 detik. Ulangi tiga kali untuk menurunkan detak jantung dan menjernihkan pikiran yang kalut.",
      ],
      [
        "Fokus pada Kendali Diri",
        "Ingatlah bahwa tidak semua hal di dunia ini bisa kita kontrol. Lepaskan kekhawatiran atas hal-hal di luar kendalimu, dan fokuslah sepenuhnya pada apa yang bisa kamu ubah saat ini.",
      ],
      [
        "Brain Dump Kilat",
        "Ketika kepala terasa penuh sesak oleh beban pikiran, ambil secarik kertas dan tuliskan semuanya tanpa disaring. Mengeluarkan isi kepala ke dalam tulisan terbukti ampuh meredakan kecemasan instan.",
      ],
    ],
  },
  {
    topic: "Cegah Burnout",
    icon: faBed,
    citation:
      "Najwa, H., & Dwiyanti, E. (2026). Preventive strategies for occupational burnout in corporate settings: A systematic literature review. Journal of Community Mental Health and Public Policy, 8(2), 146–157. https://doi.org/10.51602/cmhp.v8i2.400",
    cards: [
      [
        "Tetapkan Boundaries",
        "Belajarlah mengatakan “tidak” pada hal-hal yang melampaui kapasitas energimu. Menjaga batasan diri yang tegas adalah bentuk perlindungan utama agar kamu terhindar dari kelelahan ekstrem.",
      ],
      [
        "Cangkir yang Kosong",
        "You cannot pour from an empty cup. Kamu tidak bisa merawat orang lain atau menyelesaikan tugas dengan baik jika dirimu sendiri kehabisan tenaga. Rawat dirimu dulu sebelum menuntut produktivitas tinggi.",
      ],
      [
        "Ubah Pola Kerja",
        "Jika kamu merasa lelah terus-menerus, evaluasi kembali jadwal harianmu. Pecah tugas besar menjadi langkah-langkah kecil yang lebih realistis dan berikan jeda istirahat di setiap sesinya.",
      ],
      [
        "Jeda dari Layar",
        "Burnout sering kali diperparah oleh paparan informasi digital yang tiada henti. Matikan ponsel atau alihkan pandangan dari layar selama 10–15 menit untuk membiarkan matamu dan otakmu benar-benar beristirahat.",
      ],
    ],
  },
  {
    topic: "Emosi & Dukungan",
    icon: faHeartPulse,
    citation:
      "Qi, Y., Manchuk, V., Korylchuk, N., Kabitska, O., & Sydorovych, O. (2025). Students' Coping Strategies in Response to Academic Stress: A Study of Psychological Mechanisms and Their Effects on Adaptation. Futurity of Social Sciences, 3(3), 24–45. https://doi.org/10.57125/FS.2025.09.20.02",
    cards: [
      [
        "Rasakan, Jangan Ditekan",
        "Marah, sedih, atau kecewa adalah emosi yang sangat valid. Jangan menghukum dirimu sendiri karena merasa rapuh; izinkan dirimu merasakannya sejenak sebelum perlahan melepaskannya.",
      ],
      [
        "Cari Support System",
        "Dikelilingi oleh orang-orang yang mau mendengar tanpa menghakimi adalah anugerah besar. Jangan memendam semuanya sendirian, carilah satu orang terpercaya untuk berbagi cerita.",
      ],
      [
        "Beban Menjadi Ringan",
        "Masalah yang dibagi ibarat beban yang dibagi dua. Sering kali, sekadar didengarkan dan dipahami oleh orang lain sudah cukup untuk membuat hatimu terasa jauh lebih lega.",
      ],
      [
        "Perlakukan Dirimu seperti Sahabatmu",
        "Sering kali kita menjadi kritikus paling kejam bagi diri sendiri. Mulai hari ini, bicaralah pada dirimu sendiri dengan penuh kebaikan dan pengertian, seperti kamu menyemangati sahabat terbaikmu.",
      ],
    ],
  },
];
const initialTasks = [
  {
    id: 1,
    title: "Membaca Materi Kuliah Sistem Informasi Keperawatan",
    date: "2026-10-03",
    time: "13:00",
    priority: "Sedang",
    note: "",
    done: true,
  },
  {
    id: 2,
    title: "Sistem Informasi Keperawatan",
    date: "2026-10-03",
    time: "13:00",
    priority: "Sedang",
    note: "Untuk Persiapan UTS",
    done: false,
  },
];
const initialContacts = [
  { name: "Natasha", phone: "+62 822 3226 5433", relation: "Keluarga" },
  { name: "Jeno", phone: "+62 134 4532 6117", relation: "Teman" },
  { name: "Carmen", phone: "+62 822 5344 7129", relation: "Teman" },
];
const songs = [
  ["u + me = <3", "Hearts2Hearts", "3:30"],
  ["Rude", "Olivia Rodrigo", "3:11"],
  ["Begin Again", "Taylor Swift", "4:10"],
  ["Sunny day", "Beabadoobee", "3:58"],
  ["Wonderwall", "Oasis", "3:11"],
  ["Just the way you are", "Bruno Mars", "3:40"],
];

function App() {
  const [screen, setScreen] = useState(() => {
    if (localStorage.getItem("remind-entered")) return "home";
    if (localStorage.getItem("remind-onboarded")) return "welcome";
    return "onboarding";
  });
  const [user, setUser] = useState({
    name: "Ramadhani Septhea Dwi Putri",
    email: "thearamadhani@gmail.com",
    age: "18 Tahun",
    gender: "Perempuan",
    phone: "+62 456 3917 2008",
    about:
      "Saya suka mendengarkan musik, menonton video, dan menyukai warna pink.",
  });
  const [tasks, setTasks] = useState(
    () =>
      JSON.parse(localStorage.getItem("remind-tasks") || "null") ||
      initialTasks,
  );
  const [contacts, setContacts] = useState(initialContacts);
  const [toast, setToast] = useState("");
  const [session, setSession] = useState(null);
  const [authReady, setAuthReady] = useState(!hasSupabase);
  useEffect(
    () => localStorage.setItem("remind-tasks", JSON.stringify(tasks)),
    [tasks],
  );
  useEffect(() => {
    if (!hasSupabase) return;
    let alive = true;
    const hydrate = async (nextSession) => {
      if (!alive) return;
      setSession(nextSession);
      if (!nextSession) {
        setAuthReady(true);
        return;
      }
      try {
        const workspace = await loadWorkspace(nextSession.user.id);
        if (!alive || !workspace) return;
        if (workspace.profile) {
          const profile = workspace.profile;
          setUser((current) => ({
            ...current,
            name: profile.full_name || current.name,
            email: nextSession.user.email || current.email,
            age: profile.age ? `${profile.age} Tahun` : current.age,
            gender: profile.gender || current.gender,
            phone: profile.phone || current.phone,
            about: profile.about || current.about,
          }));
        }
        if (workspace.tasks.length) {
          setTasks(
            workspace.tasks.map((task) => ({
              id: task.id,
              title: task.title,
              date: task.due_date,
              time: task.due_time?.slice(0, 5) || "",
              priority: task.priority,
              note: task.note || "",
              done: task.completed,
            })),
          );
        }
        if (workspace.contacts.length) {
          setContacts(
            workspace.contacts.map((contact) => ({
              id: contact.id,
              name: contact.name,
              phone: contact.phone,
              relation: contact.relation || "Lainnya",
            })),
          );
        }
        setScreen("home");
      } catch (error) {
        flash(error.message || "Data Supabase tidak dapat dimuat");
      } finally {
        if (alive) setAuthReady(true);
      }
    };
    getSession()
      .then(hydrate)
      .catch(() => setAuthReady(true));
    const stop = watchSession(hydrate);
    return () => {
      alive = false;
      stop();
    };
  }, []);
  const enter = (nextSession = null) => {
    if (nextSession) setSession(nextSession);
    localStorage.setItem("remind-entered", "1");
    setScreen("home");
  };
  const flash = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };
  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      flash(error.message || "Gagal keluar akun");
    }
    setSession(null);
    localStorage.removeItem("remind-entered");
    setScreen("welcome");
  };
  const updateTasks = (value) => {
    setTasks((current) => {
      const next = typeof value === "function" ? value(current) : value;
      if (session?.user?.id) {
        replaceTasks(session.user.id, next).catch((error) =>
          flash(error.message || "Tugas gagal disinkronkan"),
        );
      }
      return next;
    });
  };
  const content =
    screen === "home" ? (
      <Home go={setScreen} user={user} />
    ) : screen === "tasks" ? (
      <Tasks
        tasks={tasks}
        setTasks={updateTasks}
        flash={flash}
        go={setScreen}
      />
    ) : screen === "pomodoro" ? (
      <Pomodoro go={setScreen} />
    ) : screen === "mood" ? (
      <Mood
        go={setScreen}
        persist={(entry) => saveMood(session?.user?.id, entry)}
      />
    ) : screen === "screening" ? (
      <Screening
        go={setScreen}
        persist={(answers) => saveScreening(session?.user?.id, answers)}
      />
    ) : screen === "sos" ? (
      <SOS go={setScreen} />
    ) : screen === "playlist" ? (
      <Playlist go={setScreen} />
    ) : screen === "education" ? (
      <Education go={setScreen} />
    ) : screen === "contacts" ? (
      <Contacts
        go={setScreen}
        contacts={contacts}
        setContacts={setContacts}
        persist={(contact) => addEmergencyContact(session?.user?.id, contact)}
      />
    ) : screen === "profile" ? (
      <Profile
        user={user}
        setUser={setUser}
        flash={flash}
        logout={logout}
        go={setScreen}
        persist={(profile) => saveProfile(session?.user?.id, profile)}
      />
    ) : null;
  if (!authReady)
    return (
      <main className="app-loading">
        <img src="/assets/pic/pic-2.png" alt="ReMind" />
        <span>Memuat ruangmu…</span>
      </main>
    );
  if (screen === "onboarding")
    return (
      <Onboarding
        next={(target) => {
          localStorage.setItem("remind-onboarded", "1");
          setScreen(target);
        }}
      />
    );
  if (screen === "welcome" || screen === "login" || screen === "signup")
    return <Auth screen={screen} setScreen={setScreen} enter={enter} />;
  return (
    <div className="app-shell">
      <main id="main" className="phone-canvas">
        {content}
      </main>
      <BottomNav current={screen} go={setScreen} />
      {toast && (
        <div className="toast" role="status">
          <Icon icon={faCircleCheck} />
          {toast}
        </div>
      )}
    </div>
  );
}

function Onboarding({ next }) {
  return (
    <main id="main" className="onboarding-page">
      <button
        className="onboarding-back"
        onClick={() => next("welcome")}
        aria-label="Lewati onboarding"
      >
        <Icon icon={faArrowLeft} />
      </button>
      <div className="onboarding-hero">
        <p className="onboarding-hello">Hello!</p>
        <p className="onboarding-subhello">Welcome to</p>
        <img
          className="onboarding-logo"
          src="/assets/pic/pic-2.png"
          alt="ReMind"
        />
        <p className="onboarding-tagline">Rest Your Mind, Reset Your Day.</p>
      </div>
      <div className="onboarding-cta">
        <h2>Grow Into Your Best Self !</h2>
        <p>
          Reflect on your daily feelings, conquer stress, and unlock your true
          potential effortlessly.
        </p>
        <button className="onboarding-start" onClick={() => next("welcome")}>
          <Icon icon={faChevronRight} /> Get Started
        </button>
        <button className="onboarding-skip" onClick={() => next("login")}>
          Skip
        </button>
      </div>
    </main>
  );
}
function Auth({ screen, setScreen, enter }) {
  const [showReset, setShowReset] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const submitAuth = async (event) => {
    event.preventDefault();
    setMessage("");
    const form = new FormData(event.currentTarget);
    const email = String(form.get("email") || "");
    const password = String(form.get("password") || "");
    if (!hasSupabase) {
      enter();
      return;
    }
    setBusy(true);
    try {
      if (screen === "login") {
        const result = await signIn(email, password);
        enter(result.session);
      } else {
        if (password !== form.get("confirmPassword"))
          throw new Error("Konfirmasi password belum sama.");
        const result = await signUp({
          email,
          password,
          fullName: String(form.get("fullName") || ""),
          phone: String(form.get("phone") || ""),
        });
        if (result.session) enter(result.session);
        else setMessage("Akun dibuat. Periksa email untuk konfirmasi akun.");
      }
    } catch (error) {
      setMessage(error.message || "Autentikasi gagal. Silakan coba lagi.");
    } finally {
      setBusy(false);
    }
  };
  return (
    <main id="main" className={`auth-page auth-${screen}`}>
      <div className="auth-art">
        <BrainMascot />
        <div className="brand">
          <b>ReMind</b>
          <span>Rest Your Mind, Reset Your Day.</span>
        </div>
        {screen === "login" && (
          <div className="auth-heading">
            <h1>Hello!</h1>
            <p>Welcome to ReMind</p>
          </div>
        )}
      </div>
      {screen === "welcome" ? (
        <section className="welcome-card">
          <h1>Welcome</h1>
          <p>
            A safe space to breathe, heal from exhaustion, and practice
            self-care.
            <br />
            Let us help you rediscover peace and balance in your daily life.
          </p>
          <button className="primary" onClick={() => setScreen("signup")}>
            Create Account
          </button>
          <button className="text-button" onClick={() => setScreen("login")}>
            Already have an account
          </button>
        </section>
      ) : (
        <section className="auth-card">
          <button
            className="back"
            onClick={() => setScreen("welcome")}
            aria-label="Kembali"
          >
            <Icon icon={faArrowLeft} />
            {screen === "signup" && <span>Back to login</span>}
          </button>
          <BrainMascot small flex={screen === "signup"} />
          <h1>{screen === "login" ? "Login" : "Create Your Account"}</h1>
          <p>{screen === "login" ? "" : "Lengkapi data untuk memulai"}</p>
          <form onSubmit={submitAuth}>
            {screen === "signup" && (
              <Field
                name="fullName"
                label="Nama lengkap"
                placeholder="Enter your full name"
                icon={faUserLarge}
              />
            )}
            <Field
              name="email"
              label="Email"
              type="email"
              placeholder={screen === "login" ? "Email" : "Enter your email"}
              icon={faEnvelope}
            />
            <Field
              name="password"
              label="Password"
              type="password"
              placeholder={
                screen === "login" ? "Password" : "Create a password"
              }
              icon={faLock}
            />
            {screen === "signup" && (
              <>
                <Field
                  name="confirmPassword"
                  label="Konfirmasi password"
                  type="password"
                  placeholder="Confirm password"
                  icon={faLock}
                />
                <Field
                  name="phone"
                  label="Nomor telepon"
                  type="tel"
                  placeholder="Enter your phone number"
                  icon={faMobileScreen}
                />
              </>
            )}{" "}
            {screen === "login" && (
              <button
                type="button"
                className="forgot"
                onClick={() => setShowReset(true)}
              >
                Forgot Password
              </button>
            )}
            {message && (
              <p className="auth-message" role="status">
                {message}
              </p>
            )}
            <button className="primary" type="submit" disabled={busy}>
              {busy ? "Memproses…" : screen === "login" ? "Login" : "Sign Up"}
            </button>
          </form>
          {screen === "login" && (
            <>
              <div className="or">
                <span>Or login with</span>
              </div>
              <div className="social">
                <button
                  onClick={async () => {
                    if (!hasSupabase) return enter();
                    try {
                      await signInOAuth("facebook");
                    } catch (error) {
                      setMessage(
                        "Login Facebook belum diaktifkan. Hubungi admin.",
                      );
                    }
                  }}
                  aria-label="Login dengan Facebook"
                >
                  <img src="/assets/pic/pic-0.png" alt="" />
                </button>
                <button
                  onClick={async () => {
                    if (!hasSupabase) return enter();
                    try {
                      await signInOAuth("google");
                    } catch (error) {
                      setMessage(
                        "Login Google belum diaktifkan. Hubungi admin.",
                      );
                    }
                  }}
                  aria-label="Login dengan Google"
                >
                  <img src="/assets/pic/pic-1.png" alt="" />
                </button>
              </div>
            </>
          )}
          {screen === "login" && (
            <button className="text-button" onClick={() => setScreen("signup")}>
              Don’t have account? Sign Up
            </button>
          )}
        </section>
      )}
      {showReset && (
        <Modal title="Reset Password" close={() => setShowReset(false)}>
          <form
            className="reset-form"
            onSubmit={async (event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              const email = String(form.get("resetEmail") || "");
              const pw = String(form.get("resetPassword") || "");
              const confirm = String(form.get("resetConfirm") || "");
              if (pw && pw !== confirm) {
                setMessage("Konfirmasi password belum sama.");
                return;
              }
              try {
                if (hasSupabase) await resetPassword(email);
                setMessage("Tautan reset password telah dikirim ke emailmu.");
                setShowReset(false);
              } catch (error) {
                setMessage(error.message || "Gagal mengirim tautan reset.");
              }
            }}
          >
            <div className="reset-lock" aria-hidden="true">
              <Icon icon={faLock} />
            </div>
            <p>Enter your email to reset your password.</p>
            <Field
              name="resetEmail"
              label="Email Address"
              type="email"
              placeholder="xxxxxxxx@gmail.com"
              icon={faEnvelope}
            />
            <Field
              name="resetPassword"
              label="Password baru"
              type="password"
              placeholder="Password baru"
              icon={faLock}
            />
            <Field
              name="resetConfirm"
              label="Konfirmasi password"
              type="password"
              placeholder="Confirm Password"
              icon={faLock}
            />
            <button className="primary" type="submit">
              Reset Password
            </button>
          </form>
        </Modal>
      )}
    </main>
  );
}
function Field({ label, icon, ...props }) {
  const id = label.toLowerCase().replace(/\s/g, "-");
  return (
    <label className={icon ? "field has-icon" : "field"} htmlFor={id}>
      <span>{label}</span>
      {icon && <Icon icon={icon} className="field-glyph" aria-hidden="true" />}
      <input id={id} required {...props} />
    </label>
  );
}
function BrainMascot({ small = false, flex = false }) {
  const src = flex ? "/assets/pic/pic-58.png" : "/assets/pic/pic-57.png";
  const cls = `brain brain-img${small ? " small" : ""}${flex ? " flex" : ""}`;
  return <img className={cls} src={src} alt="" aria-hidden="true" />;
}
function _OldBrainMascot({ small = false }) {
  return (
    <div className={"brain " + (small ? "small" : "")} aria-hidden="true">
      <img src="/assets/brain-welcome.png" width="571" height="588" alt="" />
    </div>
  );
}
function BottomNav({ current, go }) {
  return (
    <nav className="bottom-nav" aria-label="Navigasi utama">
      <div className="desktop-brand">
        <img
          src="/assets/remind-logo-full.png"
          width="1004"
          height="1004"
          alt="ReMind"
        />
        <span>
          Rest Your Mind,
          <br />
          Reset Your Day.
        </span>
      </div>
      <div className="nav-items">
        {nav.map(([id, label, icon]) => (
          <button
            key={id}
            className={current === id ? "active" : ""}
            onClick={() => go(id)}
            aria-current={current === id ? "page" : undefined}
          >
            <Icon icon={icon} />
            <span>{label}</span>
          </button>
        ))}
      </div>
      <div className="desktop-support">
        <Icon icon={faHeartPulse} />
        <div>
          <b>Butuh bantuan?</b>
          <span>Dukungan tersedia untukmu</span>
        </div>
        <button onClick={() => go("sos")}>Buka SOS</button>
      </div>
    </nav>
  );
}
function Header({ title, subtitle, action }) {
  return (
    <header className="page-header">
      <div>
        <p>{subtitle}</p>
        <h1>{title}</h1>
      </div>
      {action}
    </header>
  );
}
function Home({ go, user }) {
  return (
    <>
      <section className="home-hero">
        <div className="home-topbar">
          <img
            src="/assets/pic/pic-2.png"
            width="1004"
            height="1004"
            alt="ReMind"
          />
          <button onClick={() => go("sos")} aria-label="Buka SOS">
            <img src="/assets/pic/pic-6.png" alt="" />
          </button>
        </div>
        <div className="hello">
          <span>Halo,</span>
          <h1>{user.name}!</h1>
        </div>
        <img
          className="home-mascot"
          src="/assets/pic/pic-5.png"
          width="86"
          height="77"
          alt=""
        />
        <div className="mood-question">
          <img className="deco deco-leaf" src="/assets/home-leaf.png" alt="" aria-hidden="true" />
          <img className="deco deco-twig" src="/assets/home-twig.png" alt="" aria-hidden="true" />
          <h2>How are you feeling today?</h2>
          <div className="moods">
            {moodOptions.map(([m, , c]) => (
              <button
                key={m}
                aria-label={m}
                onClick={() => go("mood")}
                style={{ "--mood": c }}
              >
                <img src={moodImages[m]} width="48" height="48" alt="" />
                <span>{m}</span>
              </button>
            ))}
          </div>
          <button className="primary compact" onClick={() => go("mood")}>
            Check My Mood <Icon icon={faChevronRight} />
          </button>
          <img
            className="deco deco-caterpillar"
            src="/assets/home-caterpillar.png"
            alt=""
            aria-hidden="true"
          />
          <img
            className="deco deco-flowers"
            src="/assets/home-flowers.png"
            alt=""
            aria-hidden="true"
          />
        </div>
      </section>
      <section className="section home-wellness">
        <h2>Your Wellness</h2>
        <div className="wellness-grid">
          <Feature
            image="/assets/pic/pic-11.png"
            title="Pomodoro"
            text="Belajar & Istirahat"
            onClick={() => go("pomodoro")}
          />
          <Feature
            image="/assets/pic/pic-12.png"
            title="Grounding"
            text="Tenangkan Diri"
            onClick={() => go("sos")}
          />
          <Feature
            image="/assets/pic/pic-13.png"
            title="Mental Health"
            text="Edukasi & Flashcard"
            onClick={() => go("education")}
          />
          <Feature
            image="/assets/pic/pic-16.png"
            title="Mood Playlist"
            text="Musik Sesuai Suasana"
            onClick={() => go("playlist")}
          />
        </div>
      </section>
      <section className="daily-reminder">
        <img
          src="/assets/success-leaves.png"
          width="154"
          height="94"
          alt=""
        />
        <div>
          <b>Daily Reminder</b>
          <p>
            “You don't have to do everything at once.
            <br />
            Take it one step at a time”
          </p>
        </div>
      </section>
    </>
  );
}
function Feature({ icon, image, title, text, onClick }) {
  return (
    <button className="feature" onClick={onClick}>
      <span>
        {image ? <img src={image} alt="" /> : <Icon icon={icon} />}
      </span>
      <b>{title}</b>
      <small>{text}</small>
      <Icon className="chev" icon={faChevronRight} />
    </button>
  );
}
function Tasks({ tasks, setTasks, flash, go }) {
  const [adding, setAdding] = useState(false);
  const [searching, setSearching] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [showReminder, setShowReminder] = useState(false);
  const visible = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  );
  const completed = tasks.filter((task) => task.done).length;
  const percent = tasks.length
    ? Math.round((completed / tasks.length) * 100)
    : 0;
  if (selected) {
    const toggle = (id) =>
      setTasks((current) =>
        current.map((task) =>
          task.id === id ? { ...task, done: !task.done } : task,
        ),
      );
    return (
      <section className="task-detail-page">
        <header>
          <button onClick={() => setSelected(null)} aria-label="Kembali">
            <Icon icon={faArrowLeft} />
          </button>
          <h1>Detail Tugas</h1>
          <button onClick={() => { setSelected(null); setSearching(true); }} aria-label="Cari">
            <Icon icon={faMagnifyingGlass} />
          </button>
        </header>
        <div className="task-detail-greeting">
          <img src="/assets/pic/pic-17.png" alt="" />
          <p>Hai, Ramadhani<br />Septhea Dwi Putri<br /><b>“Yuk, selesaikan tugasmu satu per satu!”</b></p>
        </div>
        <span className={`detail-priority ${selected.priority.toLowerCase()}`}>{selected.priority}</span>
        {[selected, ...tasks.filter((task) => task.id !== selected.id).slice(0, 1)].map((task) => (
          <article key={task.id}>
            <h2>{task.title}</h2>
            <div><span><Icon icon={faClock} /> {new Date(task.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span><span><Icon icon={faClock} /> {task.time}</span></div>
            <p>Catatan : <b>{task.note || "-"}</b></p>
            <button onClick={() => toggle(task.id)}><i className={task.done ? "checked" : ""} /> {task.done ? "Tandai Belum Selesai" : "Tandai Selesai"}</button>
          </article>
        ))}
        <footer><b>Kamu pasti bisa!</b><small>Jangan lupa istirahat juga ya</small></footer>
      </section>
    );
  }
  if (tasks.length > 0 && tasks.every((task) => task.done))
    return (
      <section className="tasks-complete-page">
        <img src="/assets/pic/pic-31.png" alt="" />
        <h1>Semua tugas selesai!</h1>
        <p>Kamu sudah melakukan yang terbaik hari ini</p>
        <blockquote>Jangan lupa istirahat ya,<br />kamu juga perlu waktu buat diri sendiri</blockquote>
        <button onClick={() => go("home")}>Kembali ke Beranda</button>
      </section>
    );
  if (searching)
    return (
      <section className="tasks-search-page">
        <header>
          <button onClick={() => setSearching(false)} aria-label="Kembali">
            <Icon icon={faArrowLeft} />
          </button>
          <h1>Telusuri</h1>
        </header>
        <label className="search">
          <Icon icon={faMagnifyingGlass} />
          <input
            autoFocus
            aria-label="Cari"
            placeholder="Cari"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <p>Hasil Pencarian ({visible.length})</p>
        <div className="search-results">
          {visible.map((task) => (
            <button key={task.id} onClick={() => setSearching(false)}>
              <Icon icon={faClock} />
              <span>{task.title}</span>
            </button>
          ))}
          <button onClick={() => setSearching(false)}>
            <Icon icon={faClock} />
            <span>Mood Tracker</span>
          </button>
        </div>
      </section>
    );
  return (
    <>
      <section className="tasks-hero">
        <div className="tasks-toolbar">
          <button onClick={() => go("home")} aria-label="Kembali">
            <Icon icon={faArrowLeft} />
          </button>
          <button onClick={() => setSearching(true)} aria-label="Cari">
            <Icon icon={faMagnifyingGlass} />
          </button>
          <button onClick={() => setShowReminder(true)} aria-label="Reminder">
            <Icon icon={faMusic} />
          </button>
        </div>
        <img src="/assets/pic/pic-17.png" alt="" width="86" height="77" />
        <div>
          <h1>
            Hai, Ramadhani
            <br />
            Septhea Dwi Putri
          </h1>
          <p>“Yuk, selesaikan tugasmu satu per satu!”</p>
        </div>
        <aside>
          <b>{percent}%</b>
          <span>Selesai</span>
        </aside>
        <h2>Checklist Tugas</h2>
        <button className="add-task" onClick={() => setAdding(true)}>
          <Icon icon={faPlus} /> Tambah Tugas
        </button>
      </section>
      <section className="section tasks-content">
        <h2>Hari Ini</h2>
        {visible.length ? (
          <div className="task-list">
            {visible.map((t) => (
              <article className="task" key={t.id}>
                <button
                  className={"check " + (t.done ? "done" : "")}
                  onClick={() =>
                    setTasks(
                      tasks.map((x) =>
                        x.id === t.id ? { ...x, done: !x.done } : x,
                      ),
                    )
                  }
                  aria-label={
                    t.done ? "Tandai belum selesai" : "Tandai selesai"
                  }
                >
                  {t.done && <Icon icon={faCircleCheck} />}
                </button>
                <button className="task-body" onClick={() => setSelected(t)}>
                  <h2>{t.title}</h2>
                  <p>
                    {new Date(t.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    · {t.time}
                  </p>
                  <small>{t.note}</small>
                </button>
                <span className={"priority " + t.priority.toLowerCase()}>
                  {t.priority}
                </span>
              </article>
            ))}
          </div>
        ) : (
          <Empty
            title="Tidak ada tugas ditemukan"
            text="Ubah kata pencarian atau tambahkan tugas baru."
          />
        )}
      </section>
      {adding && (
        <TaskForm
          close={() => setAdding(false)}
          save={(t) => {
            setTasks([...tasks, { ...t, id: Date.now(), done: false }]);
            setAdding(false);
            flash("Tugas berhasil disimpan");
          }}
        />
      )}
      {showReminder && (
        <div className="reminder-overlay">
          <div role="dialog" aria-modal="true" aria-label="Reminder tugas">
            <Icon icon={faMusic} />
            <h2>Reminder</h2>
            <p>Tugas “Membuat PPT presentasi”<br />akan dimulai dalam 10 menit.</p>
            <div><button onClick={() => setShowReminder(false)}>Nanti</button><button onClick={() => setShowReminder(false)}>Oke</button></div>
          </div>
        </div>
      )}
    </>
  );
}
function TaskForm({ close, save }) {
  const [form, setForm] = useState({
    title: "",
    date: "2026-10-03",
    time: "13:00",
    priority: "Sedang",
    note: "",
  });
  return (
    <Modal title="Tambah Tugas" close={close}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          save(form);
        }}
      >
        <Field
          label="Nama Tugas"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Contoh: Membaca materi"
        />
        <div className="form-row">
          <Field
            label="Tanggal"
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          <Field
            label="Waktu"
            type="time"
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
          />
        </div>
        <div className="field">
          <span>Prioritas *</span>
          <div className="priority-pills" role="radiogroup" aria-label="Prioritas">
            {["Rendah", "Sedang", "Tinggi"].map((p) => (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={form.priority === p}
                className={`priority-pill priority-${p.toLowerCase()} ${form.priority === p ? "active" : ""}`}
                onClick={() => setForm({ ...form, priority: p })}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <label className="field">
          <span>Catatan (opsional)</span>
          <textarea
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            placeholder="Tambahkan catatan..."
          />
        </label>
        <div className="form-actions">
          <button className="primary" type="submit">
            <Icon icon={faFloppyDisk} /> Simpan Tugas
          </button>
          <button className="secondary" type="button" onClick={close}>
            <Icon icon={faXmark} /> Batal
          </button>
        </div>
      </form>
    </Modal>
  );
}
function Pomodoro({ go }) {
  const [mode, setMode] = useState("focus");
  const defaults = { focus: 40 * 60, short: 10 * 60, long: 20 * 60 };
  const [seconds, setSeconds] = useState(defaults.focus);
  const [running, setRunning] = useState(false);
  const [pausedNotice, setPausedNotice] = useState(false);
  const [alarmNotice, setAlarmNotice] = useState("");
  useEffect(() => {
    if (!running) return;
    const timer = setInterval(
      () =>
        setSeconds((s) => {
          if (s <= 1) {
            setRunning(false);
            return 0;
          }
          return s - 1;
        }),
      1000,
    );
    return () => clearInterval(timer);
  }, [running]);
  const choose = (m) => {
    setMode(m);
    setSeconds(defaults[m]);
    setRunning(false);
  };
  const pct = 1 - seconds / defaults[mode];
  if (seconds === 0 && mode === "focus")
    return (
      <section className="alarm-page">
        <h1>POMODORO - ALARM</h1>
        <span>
          <Icon icon={faMusic} /> Berbunyi
        </span>
        <div className="alarm-rings">
          <i />
        </div>
        <strong>+02:23</strong>
        <h2>
          Waktu belajar telah
          <br />
          berakhir
        </h2>
        <p>
          Kamu melewati batas belajar selama 2 menit 23 detik.
          <br />
          Hentikan alarm atau lanjut ke sesi istirahat.
        </p>
        <div className="alarm-actions">
          <button
            onClick={() => {
              setSeconds(defaults.focus);
              setRunning(false);
            }}
          >
            Hentikan alarm
          </button>
          <button
            onClick={() => {
              choose("short");
              setAlarmNotice("Sesi istirahat berhasil dimulai!");
            }}
          >
            Mulai sesi istirahat
          </button>
        </div>
        {alarmNotice && (
          <div className="pomodoro-notice success-overlay">
            <div role="dialog" aria-modal="true">
              <Icon icon={faCircleCheck} />
              <p>{alarmNotice}</p>
              <button onClick={() => setAlarmNotice("")}>Kembali ke Pomodoro</button>
            </div>
          </div>
        )}
      </section>
    );
  return (
    <>
      <header className="pomodoro-header">
        <button onClick={() => go("home")} aria-label="Kembali">
          <Icon icon={faArrowLeft} />
        </button>
        <div>
          <h1>POMODORO</h1>
          <h2>{mode === "focus" ? "Saatnya Belajar" : "Tarik Napas"}</h2>
          <p>{mode === "focus" ? "Jaga ritme, satu sesi penuh." : "Beristirahat tanpa kehilangan ritme"}</p>
        </div>
      </header>
      <section className="timer-section">
        <div className="timer" style={{ "--progress": `${pct * 360}deg` }}>
          <span>
            {String(Math.floor(seconds / 60)).padStart(2, "0")}:
            {String(seconds % 60).padStart(2, "0")}
          </span>
          <small>{running ? "• Fokus sedang berlangsung" : ""}</small>
        </div>
        <p className="timer-caption">
          {mode === "focus"
            ? "Menyelesaikan membaca materi kuliah Sistem Informasi Keperawatan"
            : "Regangkan bahu dan minum air"}
        </p>
        <div className="timer-actions">
          <button
            onClick={() => setSeconds(defaults[mode])}
            aria-label="Ulangi"
          >
            <Icon icon={faRotateRight} />
          </button>
          <button
            className="play"
            onClick={() => {
              if (running) {
                setRunning(false);
                setPausedNotice(true);
              } else setRunning(true);
            }}
            aria-label={running ? "Jeda" : "Mulai"}
          >
            <Icon icon={running ? faPause : faPlay} />
            {running
              ? mode === "focus"
                ? "Jeda Sesi"
                : "Jeda Istirahat"
              : seconds < defaults[mode]
                ? mode === "focus"
                  ? "Lanjut Sesi"
                  : "Lanjut Istirahat"
                : mode === "focus"
                  ? "Mulai Sesi"
                  : "Mulai Istirahat"}
          </button>
          <button
            onClick={() => {
              const next = mode === "focus" ? "short" : "focus";
              choose(next);
            }}
            aria-label="Lewati ke sesi berikutnya"
          >
            <Icon icon={faForwardStep} />
          </button>
        </div>
        <div className="session-tabs">
          <button
            className={mode === "focus" ? "active" : ""}
            onClick={() => choose("focus")}
          >
            Fokus 40m
          </button>
          <button
            className={mode === "short" ? "active" : ""}
            onClick={() => choose("short")}
          >
            Istirahat 10m
          </button>
          <button
            className={mode === "long" ? "active" : ""}
            onClick={() => choose("long")}
          >
            Istirahat 20m
          </button>
        </div>
        <div className="progress-card">
          <b>SIKLUS HARI INI</b>
          <div className="cycle-dots" aria-hidden="true">
            {[0, 1, 2, 3].map((n) => (
              <i
                key={n}
                className={n < (running ? 3 : 0) ? "done" : ""}
              />
            ))}
          </div>
          <span>{running ? "3 dari 4 selesai" : "0 dari 4 selesai"}</span>
        </div>
        <div className="focus-card">
          <b>Fokus Hari Ini</b>
          <div>
            <strong>
              {running ? "2j 10m" : "0m"}
              <small>Waktu fokus</small>
            </strong>
            <strong>
              {running ? "3" : "0"}
              <small>Sesi selesai</small>
            </strong>
            <strong>
              {running ? "80%" : "0%"}
              <small>Target harian</small>
            </strong>
          </div>
        </div>
      </section>
      {pausedNotice && (
        <div className="pomodoro-notice success-overlay">
          <div role="dialog" aria-modal="true" aria-label="Sesi dijeda">
            <Icon icon={faCircleCheck} />
            <p>Sesi {mode === "focus" ? "belajar" : "istirahat"} telah dijeda</p>
            <button onClick={() => setPausedNotice(false)}>Oke</button>
          </div>
        </div>
      )}
    </>
  );
}
function Mood({ go, persist }) {
  const [mood, setMood] = useState("Happy");
  const [sleep, setSleep] = useState(7);
  const [stress, setStress] = useState(20);
  const [influences, setInfluences] = useState("");
  const [result, setResult] = useState(false);
  if (result)
    return (
      <section className="mood-page mood-result-page">
        <button className="page-back" onClick={() => setResult(false)}>
          <Icon icon={faArrowLeft} /> Hasil mood tracker
        </button>
        <div className="mood-result-brand">
          <img src="/assets/pic/pic-31.png" alt="" />
          <b>
            Mood
            <br />
            Tracker
          </b>
        </div>
        <article className="mood-summary-card">
          <h2>Your mood today</h2>
          <p>
            <img src={moodImages[mood]} alt="" /> <span>:</span> <b>{mood}</b>
          </p>
          <p>
            <Icon icon={faBed} /> <span>:</span> <b>{sleep} jam</b>
          </p>
          <p>
            <Icon icon={faBrain} /> <span>:</span>{" "}
            <b>{stress < 35 ? "Rendah" : stress < 70 ? "Sedang" : "Tinggi"}</b>
          </p>
        </article>
        <article className="mood-note-card">
          <h2>Note for you</h2>
          <p>
            Hari ini cukup baik, suasana hati stabil. Tugas kuliah lancar dan
            tidak terlalu banyak pikiran. Semoga besok tetap baik!
          </p>
        </article>
        <button className="mood-next" onClick={() => go("screening")}>
          Next skrining stress ---&gt;
        </button>
      </section>
    );
  return (
    <section className="mood-page mood-entry-page">
      <button className="page-back" onClick={() => go("home")}>
        <Icon icon={faArrowLeft} /> Mood Tracker
      </button>
      <img className="mood-mascot" src="/assets/pic/pic-26.png" alt="" />
      <p className="mood-greeting">
        Hai, Ramadhani
        <br />
        Septhea Dwi Putri
        <br />
        <b>Yuk, cek mood kamu hari ini!</b>
      </p>
      <div className="mood-select-card">
        <h2>Mood</h2>
        <div className="mood-pick">
          {moodOptions.map(([m, , c]) => (
            <button
              key={m}
              aria-label={m}
              className={mood === m ? "active" : ""}
              style={{ "--mood": c }}
              onClick={() => setMood(m)}
            >
              <img src={moodImages[m]} width="52" height="52" alt="" />
              <span>{m}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="mood-metrics">
        <label>
          <Icon icon={faBed} />
          <span>
            Kualitas
            <br />
            tidur
          </span>
          <input
            type="number"
            min="1"
            max="12"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            placeholder="Ketik disini jam tidur"
          />
        </label>
        <label>
          <Icon icon={faBrain} />
          <span>
            Tingkat beban
            <br />
            mental/stres
          </span>
          <input
            type="number"
            min="0"
            max="100"
            value={stress}
            onChange={(e) => setStress(e.target.value)}
            placeholder="Ketik disini berapa %"
          />
        </label>
      </div>
      <label className="mood-factor">
        <Icon icon={faListCheck} />
        <span>
          Faktor pengaruh
          <br />
          mood
        </span>
        <textarea
          placeholder="Ketik disini"
          value={influences}
          onChange={(event) => setInfluences(event.target.value)}
        />
      </label>
      <button
        className="mood-next"
        onClick={() => {
          persist?.({ mood, sleep, stress, influences }).catch(() => {});
          setResult(true);
        }}
      >
        Next ---&gt;&gt;&gt;
      </button>
    </section>
  );
}
function Screening({ go, persist }) {
  const qs = [
    "Kurang tertarik atau kurang menikmati melakukan sesuatu.",
    "Merasa sedih, tertekan, atau putus asa.",
    "Merasa gugup, cemas, atau tegang.",
    "Tidak dapat menghentikan atau mengendalikan rasa khawatir.",
  ];
  const opts = [
    "Tidak pernah",
    "Beberapa hari",
    "Lebih dari separuh hari",
    "Hampir setiap hari",
  ];
  const [step, setStep] = useState(-1);
  const [ans, setAns] = useState([]);
  const [selected, setSelected] = useState(null);
  if (step === -1)
    return (
      <section className="screening-page screening-start">
        <button className="page-back" onClick={() => go("mood")}>
          <Icon icon={faArrowLeft} /> Skrining stress
        </button>
        <img className="screening-mascot" src="/assets/pic/pic-30.png" alt="" />
        <p className="screening-greeting">
          Hai, Ramadhani
          <br />
          Septhea Dwi Putri
          <br />
          <b>Yuk, cek kondisi mentalmu!</b>
        </p>
        <article className="screening-intro-card">
          <h2>
            <Icon icon={faListCheck} /> Skrining kesehatan mental menggunakan
            PHQ-4
          </h2>
          <p>
            Jawab berdasarkan apa yang kamu rasakan selama 2 minggu terakhir.
          </p>
          <div>
            <Icon icon={faCircleCheck} /> PHQ-4 terdiri dari 4 pertanyaan
            singkat mengenai gejala depresi dan kecemasan.
          </div>
          <button onClick={() => setStep(0)}>
            Mulai <Icon icon={faArrowLeft} />
          </button>
        </article>
      </section>
    );
  if (step === 4) {
    const dep = ans[0] + ans[1],
      anx = ans[2] + ans[3];
    return (
      <section className="screening-page screening-result">
        <button className="page-back" onClick={() => go("mood")}>
          <Icon icon={faArrowLeft} /> Hasil skrining
        </button>
        <img className="screening-mascot" src="/assets/pic/pic-30.png" alt="" />
        <h1>Hasil skrining</h1>
        <div className="result-scores">
          <article>
            <img src="/assets/mood-sad-circle.png" alt="" />
            <span>
              Depresi
              <br />
              PHQ-2
            </span>
            <b>{dep}/6</b>
          </article>
          <article>
            <img src="/assets/mood-stressed-circle.png" alt="" />
            <span>
              Kecemasan
              <br />
              GAD-2
            </span>
            <b>{anx}/6</b>
          </article>
        </div>
        <p className="screening-disclaimer">
          <Icon icon={faCircleCheck} /> Penting untuk diketahui hasil ini
          merupakan skrining awal dan bukan diagnosis. Jika hasil skrining
          membuatmu khawatir atau kamu merasa kondisi ini mengganggu aktivitas
          sehari-hari, pertimbangkan untuk berbicara dengan tenaga kesehatan
          atau orang yang kamu percaya.
        </p>
        <button className="screening-home" onClick={() => go("home")}>
          <Icon icon={faHouse} /> Kembali ke beranda
        </button>
      </section>
    );
  }
  return (
    <section className="screening-page screening-question-page">
      <div className="screening-progress">
        <b>{step + 1}/4</b>
        <span>
          <i style={{ width: `${(step + 1) * 25}%` }} />
        </span>
      </div>
      <img className="screening-mascot" src="/assets/pic/pic-30.png" alt="" />
      <article className="screening-question-card">
        <p>
          Selama 2 minggu terakhir, seberapa sering kamu mengalami masalah
          berikut? <b>{qs[step]}</b>
        </p>
        <div>
          {opts.map((o, i) => (
            <button
              className={selected === i ? "selected" : ""}
              key={o}
              onClick={() => setSelected(i)}
            >
              <i />
              {o}
            </button>
          ))}
        </div>
        <button
          className="screening-next"
          disabled={selected === null}
          onClick={() => {
            const nextAnswers = [...ans, selected];
            setAns(nextAnswers);
            if (step === 3) persist?.(nextAnswers).catch(() => {});
            setSelected(null);
            setStep(step + 1);
          }}
        >
          Lanjut <Icon icon={faArrowLeft} />
        </button>
      </article>
    </section>
  );
}
function SOS({ go }) {
  const [stage, setStage] = useState("home");
  const [seconds, setSeconds] = useState(272);
  useEffect(() => {
    if (stage !== "active" || seconds <= 0) return;
    const timer = setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => clearInterval(timer);
  }, [stage, seconds]);
  const back = () => {
    if (stage === "home") go("home");
    else if (["choice", "sent"].includes(stage)) setStage("home");
    else if (["detail", "contacts"].includes(stage)) setStage("active");
    else setStage("choice");
  };
  const top = (title = "") => (
    <div className="sos-top">
      <button onClick={back} aria-label="Kembali">
        <Icon icon={faArrowLeft} />
      </button>
      {title && <h1>{title}</h1>}
      <span>
        <Icon icon={faMagnifyingGlass} />
        <Icon icon={faMusic} />
      </span>
    </div>
  );
  if (stage === "breathing")
    return (
      <section className="sos-page breathing-page">
        {top("Teknik pernapasan")}
        <p>
          Tarik napas pelan-pelan
          <br />
          agar pikiran juga ikut tenang
        </p>
        <img src="/assets/pic/pic-42.png" alt="" />
        <article>
          <h2>pernapasan 4-7-8</h2>
          <p>Teknik sederhana untuk menenangkan pikiran dan tubuh</p>
          <div>
            {[
              [faWind, "4 detik", "Tarik napas"],
              [faPause, "7 detik", "Tahan napas"],
              [faHeartPulse, "8 detik", "Hembuskan napas"],
            ].map(([icon, time, label]) => (
              <span key={time}>
                <Icon icon={icon} />
                <b>{time}</b>
                <small>{label}</small>
              </span>
            ))}
          </div>
        </article>
        <button className="sos-main-action">Mulai sekarang</button>
      </section>
    );
  if (stage === "emotional")
    return (
      <section className="sos-page emotional-page">
        {top("Dukungan Emosional")}
        <img src="/assets/pic/pic-31.png" alt="" />
        <h2>
          Kamu tidak sendirian,
          <br />
          ada yang mendengarkan.
        </h2>
        <p>
          Jika kamu merasa cemas, sedih,
          <br />
          atau tertekan, kamu bisa langsung
          <br />
          terhubung dengan konselor kami.
        </p>
        <a href="tel:119">
          <Icon icon={faPhone} /> Hubungi Konselor
        </a>
        <b>Tersedia 24 jam</b>
      </section>
    );
  if (stage === "contacts")
    return (
      <section className="sos-page sos-contacts-page">
        {top("Kontak darurat")}
        <label>
          <Icon icon={faMagnifyingGlass} />
          <input aria-label="Cari kontak" />
          <button>
            <Icon icon={faPlus} />
          </button>
        </label>
        <h2>Kontak utama</h2>
        {[
          ["Natasha", "+6282232265433"],
          ["Jeno", "+6213445326117"],
          ["Carmen", "+6282253447129"],
          ["Keunho", "+6282283345627"],
        ].map(([name, phone]) => (
          <article key={name}>
            <Icon icon={faUser} />
            <span>
              <b>{name}</b>
              <small>{phone}</small>
            </span>
            <a href={`tel:${phone}`} aria-label={`Hubungi ${name}`}>
              <Icon icon={faPhone} />
            </a>
          </article>
        ))}
      </section>
    );
  if (stage === "detail")
    return (
      <section className="sos-page sos-detail-page">
        {top("Detail SOS")}
        <article className="status-card">
          <Icon icon={faLocationDot} />
          <span>
            <b>Dalam perjalanan</b>
            <small>Tim bantuan sedang dalam perjalanan</small>
          </span>
        </article>
        <div className="map-placeholder">
          <i />
          <b>AMBULANS</b>
          <span />
        </div>
        <article>
          <Icon icon={faHeartPulse} />
          <span>
            <b>Tim medis</b>
            <small>Ambulans RS Umum</small>
          </span>
          <a href="tel:119">
            <Icon icon={faPhone} />
          </a>
        </article>
        <article>
          <Icon icon={faLocationDot} />
          <span>
            <b>Lokasimu saat ini:</b>
            <small>
              Jl. Srijaya Negara No.21, Palembang
              <br />
              -2.9731, 104.7556
            </small>
          </span>
        </article>
        <article className="hold-card">
          <img src="/assets/hold-flower.png" alt="" aria-hidden="true" />
          <span>
            <b>Hold on Tight.</b>
            <small>Kami sedang dalam perjalanan menuju kamu &lt;3</small>
          </span>
        </article>
      </section>
    );
  if (stage === "active") {
    const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}.${String(seconds % 60).padStart(2, "0")}`;
    return (
      <section className="sos-page sos-active-page">
        {top()}
        <strong>SOS Aktif!</strong>
        <p>
          Tim bantuan sedang dalam
          <br />
          perjalanan menuju ke lokasimu
        </p>
        <button className="sos-countdown" onClick={() => setStage("detail")}>
          <b>{time}</b>
          <small>Sisa waktu</small>
        </button>
        <article className="sos-location">
          <Icon icon={faLocationDot} />
          <span>
            <b>Lokasimu saat ini:</b>
            <small>
              Jl. Srijaya Negara No.21, Palembang
              <br />
              -2.9731, 104.7556
            </small>
          </span>
        </article>
        <div className="sos-service-row">
          <a href="tel:+6282281235569">
            <img className="sos-service-icon" src="/assets/pic/pic-37.png" alt="" />
            <b>Tim medis</b>
            <small>+6282281235569</small>
          </a>
          <button onClick={() => setStage("contacts")}>
            <img className="sos-service-icon" src="/assets/pic/pic-36.png" alt="" />
            <b>
              Orang
              <br />
              Terdekat
            </b>
          </button>
          <a href="tel:119">
            <img className="sos-service-icon" src="/assets/pic/pic-66.png" alt="" />
            <b>Ambulans</b>
            <small>119</small>
          </a>
        </div>
        <button
          className="cancel-sos"
          onClick={() => {
            setStage("home");
            setSeconds(272);
          }}
        >
          <Icon icon={faXmark} /> Batalkan SOS
        </button>
      </section>
    );
  }
  const choice = stage === "choice" || stage === "sent";
  return (
    <section
      className={`sos-page ${choice ? "sos-choice-page" : "sos-home-page"}`}
    >
      {top()}
      <img className="sos-mascot" src="/assets/pic/pic-31.png" alt="" />
      {choice ? (
        <>
          <h2>
            Kamu terlihat sedang
            <br />
            dalam situasi darurat?
          </h2>
          <p>
            Pilih jenis bantuan yang kamu butuhkan
            <br />
            atau langsung hubungi kami.
          </p>
          <div className="sos-options">
            {[
              [
                "Darurat Medis",
                "Butuh bantuan medis segera (ambulans, rumah sakit, dll)",
                "/assets/pic/pic-33.png",
                "sent",
              ],
              [
                "Butuh Dukungan Emosional",
                "Kamu merasa cemas, sedih, atau ingin bercerita",
                "/assets/pic/pic-63.png",
                "emotional",
              ],
              [
                "Hubungi Kontak Darurat",
                "Orang terdekat yang sudah ditambahkan",
                "/assets/pic/pic-64.png",
                "contacts",
              ],
              [
                "Lainnya",
                "Kekerasan, kecelakaan, atau keadaan darurat lainnya",
                "/assets/pic/pic-65.png",
                "sent",
              ],
            ].map(([name, text, img, next]) => (
              <button key={name} onClick={() => setStage(next)}>
                <img className="sos-option-icon" src={img} alt="" />
                <span>
                  <b>{name}</b>
                  <small>{text}</small>
                </span>
                <Icon icon={faChevronRight} />
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>
            Butuh bantuan
            <br />
            segera?
          </h2>
          <p>
            Tekan tombol SOS jika kamu merasa
            <br />
            sedang dalam bahaya, tertekan, atau
            <br />
            membutuhkan pertolongan.
          </p>
          <button className="sos-call" onClick={() => setStage("choice")} aria-label="SOS">
            <img src="/assets/pic/pic-23.png" alt="" />
          </button>
          <small>
            Satu sentuhan,
            <br />
            bisa menyelamatkanmu.
          </small>
          <button
            className="breathing-link"
            onClick={() => setStage("breathing")}
          >
            <Icon icon={faWind} /> Teknik pernapasan 4-7-8
          </button>
          <img
            className="sos-corner sos-corner-leaf"
            src="/assets/corner-leaf.png"
            alt=""
            aria-hidden="true"
          />
          <img
            className="sos-corner sos-corner-flower"
            src="/assets/corner-flower.png"
            alt=""
            aria-hidden="true"
          />
        </>
      )}
      {stage === "sent" && (
        <div className="sos-overlay">
          <article>
            <img src="/assets/pic/pic-34.png" alt="" />
            <h2>SOS Berhasil dikirim!</h2>
            <p>
              Tim darurat sudah menerima informasi kamu dan segera menuju ke
              lokasi.
            </p>
            <button onClick={() => setStage("active")}>Oke</button>
          </article>
        </div>
      )}
    </section>
  );
}
function Playlist({ go }) {
  const [playing, setPlaying] = useState(0);
  const [progress, setProgress] = useState(34);
  useEffect(() => {
    if (playing === null) return;
    const timer = setInterval(
      () => setProgress((value) => (value + 0.3) % 100),
      1000,
    );
    return () => clearInterval(timer);
  }, [playing]);
  const covers = [
    "/assets/album-blue.png",
    "/assets/album-red.png",
    "/assets/album-pink.png",
    "/assets/album-city.png",
    "/assets/album-yellow.png",
  ];
  return (
    <section className="playlist-page">
      <header>
        <button onClick={() => go("home")} aria-label="Kembali">
          <Icon icon={faArrowLeft} />
        </button>
        <h1>Detail Playlist</h1>
      </header>
      <img
        className="playlist-cover"
        src="/assets/forest.png"
        alt="Pemandangan pepohonan dari jendela"
      />
      <div className="playlist-copy">
        <h2>Good Vibes Only</h2>
        <p>
          Lagu-lagu ceria untuk mengembalikan
          <br />
          semangatmu!
        </p>
        <span>
          <Icon icon={faMusic} /> 1h 35m &nbsp; • &nbsp; 100 Lagu
        </span>
      </div>
      <div className="song-list">
        {songs.slice(1).map((s, i) => (
          <button
            key={s[0]}
            aria-label={`Putar ${s[0]} oleh ${s[1]}`}
            onClick={() => {
              setPlaying(i + 1);
              setProgress(0);
            }}
            className={playing === i + 1 ? "playing" : ""}
          >
            <img src={covers[i]} alt="" />
            <div>
              <b>{s[0]}</b>
              <small>{s[1]}</small>
            </div>
            <time>{s[2]}</time>
            <span>⋮</span>
          </button>
        ))}
      </div>
      <div className="mini-player">
        <img
          src={playing > 0 ? covers[playing - 1] : "/assets/album-art.png"}
          alt=""
        />
        <div>
          <b>{songs[playing]?.[0] || songs[0][0]}</b>
          <small>{songs[playing]?.[1] || songs[0][1]}</small>
          <label>
            <i style={{ width: `${progress}%` }} />
            <span>1:47</span>
            <span>4:11</span>
          </label>
        </div>
        <button onClick={() => setProgress(0)} aria-label="Sebelumnya">
          <Icon icon={faPlay} />
        </button>
        <button
          onClick={() => setPlaying(playing === null ? 0 : null)}
          aria-label={playing === null ? "Putar" : "Jeda"}
        >
          <Icon icon={playing === null ? faPlay : faPause} />
        </button>
        <button
          onClick={() => {
            setPlaying(
              (playing ?? 0) >= songs.length - 1 ? 0 : (playing ?? 0) + 1,
            );
            setProgress(0);
          }}
          aria-label="Berikutnya"
        >
          <Icon icon={faPlay} />
        </button>
      </div>
    </section>
  );
}
function Education({ go }) {
  const [topic, setTopic] = useState(null);
  const [card, setCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  if (topic !== null) {
    const item = education[topic],
      data = item.cards[card];
    const cardArt =
      topic === 0
        ? "/assets/pic/pic-67.png"
        : topic === 1
          ? "/assets/pic/pic-68.png"
          : topic === 2
            ? "/assets/pic/pic-69.png"
            : "/assets/pic/pic-70.png";
    return (
      <section className="education-page flashcard-page">
        <header>
          <button
            onClick={() => {
              setTopic(null);
              setFlipped(false);
            }}
            aria-label="Kembali"
          >
            <Icon icon={faArrowLeft} />
          </button>
          <div>
            <small>F L A S H C A R D</small>
            <h1>{item.topic}</h1>
          </div>
          <button aria-label="Notifikasi">
            <Icon icon={faMusic} />
          </button>
        </header>
        <div className={`flashcard ${flipped ? "flipped" : ""}`}>
          <button
            className="flashcard-face"
            onClick={() => setFlipped(!flipped)}
          >
            {flipped ? (
              <>
                <span>JAWABAN RINGKAS</span>
                <p>{data[1]}</p>
                <blockquote>{item.citation}</blockquote>
                <small>
                  <Icon icon={faSeedling} /> Ketuk untuk kembali
                </small>
              </>
            ) : (
              <>
                <span>
                  {item.topic === "Kesehatan Mental" ? "Mental" : item.topic}
                </span>
                <i>
                  <Icon icon={faCircleCheck} />
                </i>
                <img src={cardArt} alt="" />
                <h2>{data[0]}</h2>
                <small>
                  <Icon icon={faSeedling} /> Ketuk untuk lihat jawaban
                </small>
              </>
            )}
          </button>
          <button
            className="next-card"
            onClick={() => {
              setCard((card + 1) % item.cards.length);
              setFlipped(false);
            }}
          >
            Kartu berikutnya →
          </button>
          <aside>
            <Icon icon={faHeartPulse} />
            <p>
              <b>Kamu tidak harus menghadapinya sendiri.</b>
              <br />
              Jika tekanan mulai mengganggu keseharian, hubungi orang terpercaya
              atau tenaga profesional.
            </p>
          </aside>
          <p className="disclaimer">
            Konten ini bersifat edukatif, bukan alat diagnosis atau pengganti
            bantuan profesional
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="education-page education-home">
      <header>
        <button onClick={() => go("home")} aria-label="Kembali">
          <Icon icon={faArrowLeft} />
        </button>
        <p>
          Ruang Belajar<strong>Edukasi</strong>
        </p>
        <button aria-label="Notifikasi">
          <Icon icon={faMusic} />
        </button>
      </header>
      <section className="education-hero">
        <div>
          <small>MENTAL HEALTH</small>
          <h1>
            Kenali dirimu,
            <br />
            <em>Jaga dirimu.</em>
          </h1>
          <p>
            Pelajari kesehatan mental melalui
            <br />
            materi dan kartu singkat berbasis
            <br />
            jurnal.
          </p>
        </div>
        <img src="/assets/plant-pot-canva.png" alt="" />
      </section>
      <div className="education-stats">
        <span>
          <b>4</b>Topik Utama
        </span>
        <span>
          <b>16</b>Kartu Edukasi
        </span>
        <span>
          <b>5 min</b>Belajar Ringan
        </span>
      </div>
      <div className="education-heading">
        <small>KARTU EDUKASI</small>
        <h2>Satu Menit untuk dirimu</h2>
      </div>
      <section className="topic-list">
        {education.map((t, i) => (
          <button
            key={t.topic}
            onClick={() => {
              setTopic(i);
              setCard(0);
              setFlipped(false);
            }}
          >
            <Icon icon={t.icon} />
            <span>
              <small>TOPIK 0{i + 1}</small>
              <b>{t.topic}</b>
              <em>4 Kartu Edukasi</em>
            </span>
            <b className="topic-arrow">→</b>
          </button>
        ))}
      </section>
    </section>
  );
}
function Contacts({ go, persist, contacts, setContacts }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    relation: "Keluarga",
  });
  const [saved, setSaved] = useState(false);
  return (
    <section className="contacts-page">
      <header>
        <button onClick={() => go("profile")} aria-label="Kembali">
          <Icon icon={faArrowLeft} />
        </button>
        <div>
          <h1>Tambah Kontak Baru</h1>
          <p>Simpan Kontak Darurat di Satu Tempat</p>
        </div>
      </header>
      <div className="contact-list">
        {contacts.map((contact, index) => (
          <article key={contact.name}>
            <div>
              <Icon icon={faUser} />
              <span>
                <b>Detail Kontak {index + 1}</b>
                <small>Pastikan nomor mudah dihubungi</small>
              </span>
            </div>
            <dl>
              <dt>NAMA LENGKAP*</dt>
              <dd>{contact.name}</dd>
              <dt>KATEGORI/HUBUNGAN*</dt>
              <dd>{contact.relation}</dd>
              <dt>NOMOR TELEPON*</dt>
              <dd>{contact.phone}</dd>
            </dl>
          </article>
        ))}
        <article>
          <div>
            <Icon icon={faUser} />
            <span>
              <b>Detail Kontak {contacts.length + 1}</b>
              <small>Pastikan nomor mudah dihubungi</small>
            </span>
          </div>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                await persist?.(form);
              } catch {
                return;
              }
              setContacts([...contacts, form]);
              setForm({ name: "", phone: "", relation: "Keluarga" });
              setSaved(true);
            }}
          >
            <Field
              label="NAMA LENGKAP*"
              placeholder="Masukkan nama"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <Field
              label="NOMOR TELEPON*"
              placeholder="Masukkan nomor"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              icon={faPhone}
            />
            <div className="field">
              <span>KATEGORI/HUBUNGAN*</span>
              <div className="relation-pills" role="radiogroup" aria-label="Kategori">
                {["Keluarga", "Teman", "Kerja", "Lainnya"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    role="radio"
                    aria-checked={form.relation === r}
                    className={`relation-pill ${form.relation === r ? "active" : ""}`}
                    onClick={() => setForm({ ...form, relation: r })}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div className="form-actions">
              <button className="primary" type="submit">
                <Icon icon={faFloppyDisk} /> Simpan Kontak
              </button>
              <button
                className="secondary"
                type="button"
                onClick={() =>
                  setForm({ name: "", phone: "", relation: "Keluarga" })
                }
              >
                <Icon icon={faXmark} /> Batal
              </button>
            </div>
          </form>
        </article>
      </div>
      {saved && (
        <div className="success-overlay">
          <div role="dialog" aria-modal="true" aria-label="Kontak disimpan">
            <Icon icon={faCircleCheck} />
            <b>Berhasil</b>
            <p>Kontak berhasil disimpan</p>
            <button onClick={() => setSaved(false)}>Ok</button>
          </div>
        </div>
      )}
    </section>
  );
}
function Profile({ user, setUser, logout, go, persist }) {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  if (editing)
    return (
      <section className="profile-edit">
        <header>
          <button onClick={() => setEditing(false)} aria-label="Kembali">
            <Icon icon={faArrowLeft} />
          </button>
          <div>
            <h1>Kelola Profil</h1>
            <p>Perbarui Informasi Akunmu</p>
          </div>
        </header>
        <div className="profile-summary">
          <div className="avatar">
            <Icon icon={faUser} />
          </div>
          <div>
            <b>{user.name}</b>
            <span>
              {user.age}, {user.gender}
            </span>
            <span>{user.email}</span>
            <button type="button">Ganti Foto</button>
          </div>
        </div>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await persist?.(user);
            } catch {
              return;
            }
            setSaved(true);
          }}
        >
          <Field
            label="NAMA LENGKAP*"
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
          <Field
            label="UMUR*"
            value={user.age}
            onChange={(e) => setUser({ ...user, age: e.target.value })}
          />
          <label className="field">
            <span>JENIS KELAMIN*</span>
            <select
              value={user.gender}
              onChange={(e) => setUser({ ...user, gender: e.target.value })}
            >
              <option>Perempuan</option>
              <option>Laki-laki</option>
            </select>
          </label>
          <Field
            label="EMAIL*"
            type="email"
            value={user.email}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
          <Field
            label="NOMOR TELEPON*"
            value={user.phone}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
          />
          <label className="field">
            <span>TENTANG SAYA</span>
            <textarea
              value={user.about}
              onChange={(e) => setUser({ ...user, about: e.target.value })}
            />
          </label>
          <button className="primary" type="submit">
            <Icon icon={faCircleCheck} /> SIMPAN PERUBAHAN
          </button>
          <button className="profile-logout" type="button" onClick={logout}>
            <Icon icon={faRightFromBracket} /> KELUAR AKUN
          </button>
        </form>
        {saved && (
          <div className="success-overlay">
            <div role="dialog" aria-modal="true" aria-label="Data diperbarui">
              <Icon icon={faCircleCheck} />
              <b>Berhasil</b>
              <p>Data berhasil diperbarui</p>
              <button
                onClick={() => {
                  setSaved(false);
                  setEditing(false);
                }}
              >
                Ok
              </button>
            </div>
          </div>
        )}
      </section>
    );
  return (
    <>
      <section className="profile-hero">
        <div className="avatar">
          <Icon icon={faUser} />
        </div>
        <h1>{user.name}</h1>
        <p>
          {user.age} · {user.gender}
        </p>
        <button className="manage-profile" onClick={() => setEditing(true)}>
          <Icon icon={faUser} /> Kelola Profil
        </button>
        <div className="trusted-contacts">
          <h2>Keluarga &amp; Teman</h2>
          {[1, 2, 3].map((item) => (
            <button key={item} onClick={() => go("contacts")}>
              <Icon icon={faUser} /> Tambah Kontak Baru
            </button>
          ))}
        </div>
      </section>
      <section className="section profile-list">
        <blockquote>
          “Jangan bandingkan dirimu dengan orang lain, jadilah versi terbaik
          dari dirimu sendiri!”
        </blockquote>
        <button onClick={() => go("education")}>
          <img src="/assets/pic/pic-14.png" alt="" />
          <span>
            <b>Riwayat Pembelajaran</b>
            <small>Apa saja yang sudah kamu pelajari?</small>
          </span>
        </button>
        <button onClick={() => go("tasks")}>
          <img src="/assets/pic/pic-15.png" alt="" />
          <span>
            <b>Checklist Tugas</b>
            <small>Lihat tugas-tugas yang sudah kamu kerjakan</small>
          </span>
        </button>
        <button onClick={() => go("mood")}>
          <img src="/assets/pic/pic-16.png" alt="" />
          <span>
            <b>Mood Tracker</b>
            <small>Bagaimana mood kamu hari ini?</small>
          </span>
        </button>
      </section>
    </>
  );
}
function Modal({ title, close, children }) {
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [close]);
  return (
    <div
      className="modal-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <section
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header>
          <h2 id="modal-title">{title}</h2>
          <button onClick={close} aria-label="Tutup dialog">
            <Icon icon={faXmark} />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}
function Empty({ title, text }) {
  return (
    <div className="empty">
      <Icon icon={faSeedling} />
      <h2>{title}</h2>
      <p>{text}</p>
    </div>
  );
}
export default App;
