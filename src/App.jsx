import { useEffect, useId, useRef, useState } from "react";
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
  faGear,
  faBell,
  faVolumeHigh,
  faFilter,
  faHeart,
  faBookmark,
  faPhoneSlash,
  faCalendarDays,
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
  ["Happy", "/assets/mood-happy-circle.png"],
  ["Okay", "/assets/mood-okay-circle.png"],
  ["Sad", "/assets/mood-sad-circle.png"],
  ["Stressed", "/assets/mood-stressed-circle.png"],
  ["Angry", "/assets/mood-angry-circle.png"],
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
    priority: "Tinggi",
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
  { name: "Keunho", phone: "+62 822 8334 5627", relation: "Teman" },
];
const songs = [
  ["u + me = <3", "Hearts2Hearts", "3:11"],
  ["Rude", "Olivia Rodrigo", "3:30"],
  ["Begin Again", "Taylor Swift", "3:11"],
  ["Sunny day", "Beabadoobee", "4:10"],
  ["Wonderwall", "Oasis", "3:58"],
  ["Just the way you are", "Bruno Mars", "3:11"],
];
function nameFromUser(user, fallback = "") {
  const meta = user?.user_metadata || {};
  return (
    meta.full_name ||
    meta.name ||
    (user?.email ? user.email.split("@")[0] : "") ||
    fallback
  );
}
function splitName(name = "") {
  const parts = String(name).trim().split(/\s+/);
  return { first: parts[0] || "", rest: parts.slice(1).join(" ") || "" };
}

function App() {
  const [screen, setScreen] = useState(() => {
    const preview = ["127.0.0.1", "localhost"].includes(
      window.location.hostname,
    )
      ? new URLSearchParams(window.location.search).get("preview")
      : null;
    if (
      [
        "onboarding",
        "welcome",
        "login",
        "signup",
        "home",
        "tasks",
        "pomodoro",
        "mood",
        "screening",
        "sos",
        "playlist",
        "education",
        "contacts",
        "profile",
      ].includes(preview)
    )
      return preview;
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
    avatar: "",
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
            name: profile.full_name || nameFromUser(nextSession.user, current.name),
            email: nextSession.user.email || current.email,
            age: profile.age ? `${profile.age} Tahun` : current.age,
            gender: profile.gender || current.gender,
            phone: profile.phone || current.phone,
            avatar:
              profile.avatar_url ||
              nextSession.user.user_metadata?.avatar_url ||
              current.avatar,
            about: profile.about || current.about,
          }));
        } else {
          setUser((current) => ({
            ...current,
            name: nameFromUser(nextSession.user, current.name),
            email: nextSession.user.email || current.email,
            avatar:
              nextSession.user.user_metadata?.avatar_url || current.avatar,
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
    if (nextSession) {
      setSession(nextSession);
      setUser((current) => ({
        ...current,
        name: nameFromUser(nextSession.user, current.name),
        email: nextSession.user.email || current.email,
        avatar: nextSession.user.user_metadata?.avatar_url || current.avatar,
      }));
    }
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
        user={user}
      />
    ) : screen === "pomodoro" ? (
      <Pomodoro go={setScreen} />
    ) : screen === "mood" ? (
      <Mood
        go={setScreen}
        user={user}
        persist={(entry) => saveMood(session?.user?.id, entry)}
      />
    ) : screen === "screening" ? (
      <Screening
        go={setScreen}
        user={user}
        persist={(answers) => saveScreening(session?.user?.id, answers)}
      />
    ) : screen === "sos" ? (
      <SOS go={setScreen} contacts={contacts} tasks={tasks} />
    ) : screen === "playlist" ? (
      <Playlist go={setScreen} />
    ) : screen === "education" ? (
      <Education go={setScreen} tasks={tasks} />
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
      <main className="grid min-h-[100dvh] place-content-center justify-items-center gap-3 bg-[#e7f2df] font-['Poppins'] text-[#1d654f]">
        <img src="/assets/pic/pic-2.png" alt="ReMind" width="838" height="518" className="size-[92px] object-contain" />
        <span className="text-xs font-semibold">Memuat ruangmu…</span>
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
    <div className="min-h-[100svh] bg-[#edf4ed] lg:flex">
      <main
        id="main"
        className="min-h-[100svh] min-w-0 flex-1 overflow-x-hidden pb-[74px] lg:pb-0"
      >
        {content}
      </main>
      <BottomNav current={screen} go={setScreen} />
      {toast && (
        <div
          className="fixed left-1/2 top-5 z-[80] flex w-[min(calc(100%-2rem),430px)] -translate-x-1/2 items-center gap-2.5 rounded-[14px] border border-[#8fc0aa] bg-white px-4 py-3.5 font-['Poppins'] text-sm text-[#195240] shadow-[0_10px_30px_#153b2d35]"
          role="status"
        >
          <Icon icon={faCircleCheck} className="shrink-0 text-[#0f6b58]" />
          {toast}
        </div>
      )}
    </div>
  );
}

function Onboarding({ next }) {
  return (
    <main
      id="main"
      className="relative isolate grid min-h-[100svh] w-full overflow-hidden bg-[#eef6e8] font-['Poppins'] text-[#174d3f] md:grid-cols-2"
    >
      <img
        src="/assets/pic/pic-62.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 h-full w-full object-cover opacity-30"
      />
      <button
        className="absolute left-7 top-8 z-20 grid size-11 cursor-pointer place-items-center rounded-full text-[25px] text-[#176b59] transition-colors hover:bg-white/50 active:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] md:left-10 md:top-9"
        onClick={() => next("welcome")}
        aria-label="Lewati onboarding"
      >
        <Icon icon={faArrowLeft} />
      </button>
      <section className="flex min-h-[505px] flex-col items-center px-6 pt-[108px] text-center md:min-h-screen md:justify-center md:pt-0">
        <p className="m-0 text-[44px] font-bold leading-none tracking-[-1.5px] md:text-[58px]">
          Hello!
        </p>
        <p className="mb-0 mt-3 text-[21px] font-medium leading-none md:text-[26px]">
          Welcome to
        </p>
        <img
          src="/assets/pic/pic-2.png"
          alt="ReMind"
          width="838"
          height="518"
          fetchPriority="high"
          className="mt-10 h-auto w-[370px] max-w-none object-contain md:w-[390px]"
        />
        <p className="-mt-1 text-[15px] font-medium md:text-lg">
          Rest Your Mind, Reset Your Day.
        </p>
      </section>
      <section className="flex min-h-[339px] flex-col px-8 pb-[128px] pt-3 md:min-h-screen md:justify-center md:px-[clamp(48px,8vw,120px)] md:pb-0 md:pt-0">
        <div className="md:max-w-[570px] md:rounded-[36px] md:bg-white/55 md:p-12 md:shadow-[0_24px_70px_rgba(22,84,67,0.12)]">
        <h1 className="m-0 font-['Playfair_Display'] text-[21px] font-bold italic leading-tight text-[#13977e] md:text-[38px]">
          Grow Into Your Best Self !
        </h1>
        <p className="mb-[46px] mt-2 max-w-[330px] text-[13px] leading-[1.55] text-[#173d35] md:mb-5 md:max-w-[520px] md:text-[17px]">
          Reflect on your daily feelings, conquer stress, and unlock your true
          potential effortlessly.
        </p>
        <div className="flex items-center justify-between gap-4">
          <button
            className="flex min-h-14 cursor-pointer items-center gap-3 rounded-[27px] bg-[#bfe3d4] py-2 pl-3 pr-6 text-[16px] font-bold text-[#075746] shadow-[0_12px_24px_rgba(24,113,87,0.14)] transition-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]"
            onClick={() => next("welcome")}
          >
            <span className="grid size-10 place-items-center rounded-full bg-[#087460] text-xl text-white">
              <Icon icon={faChevronRight} />
            </span>
            Get Started
          </button>
          <button
            className="absolute bottom-[132px] right-8 min-h-11 cursor-pointer px-2 text-[15px] font-bold text-[#174d3f] hover:text-[#087460] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] md:static"
            onClick={() => next("login")}
          >
            Skip
          </button>
        </div>
        </div>
      </section>
    </main>
  );
}
function Auth({ screen, setScreen, enter }) {
  const [showReset, setShowReset] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [resetMessage, setResetMessage] = useState("");
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
  if (screen === "welcome")
    return (
      <main
        id="main"
        className="relative isolate min-h-[100svh] overflow-hidden bg-[#edf7e8] font-['Poppins'] text-white md:grid md:grid-cols-[1.05fr_0.95fr]"
      >
        <img
          src="/assets/pic/pic-62.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover opacity-25 md:opacity-55"
        />
        <div
          aria-hidden="true"
          className="absolute left-[-460px] top-[328px] -z-10 h-[690px] w-[870px] rounded-[50%] bg-[#13836f] md:inset-y-0 md:left-0 md:h-auto md:w-[55%] md:rounded-none"
        />
        <section className="flex min-h-[100svh] flex-col justify-end px-5 pb-[70px] md:justify-center md:px-[clamp(48px,8vw,130px)] md:pb-0">
          <div className="max-w-[430px]">
            <h1 className="m-0 text-[40px] font-semibold leading-none tracking-[-1px] md:text-[64px]">
              Welcome
            </h1>
            <p className="mb-5 mt-4 max-w-[335px] text-[15px] leading-[1.55] md:mb-8 md:max-w-[480px] md:text-lg">
              A safe space to breathe, heal from exhaustion, and practice
              self-care.
              <br />
              Let us help you rediscover peace and balance in your daily life.
            </p>
            <div className="grid gap-7 px-5 md:max-w-[390px] md:px-0">
              <button
                className="min-h-[54px] cursor-pointer rounded-[9px] bg-[#f6f9ec] px-6 text-[22px] font-semibold text-[#61a58f] shadow-[0_2px_5px_rgba(4,72,58,0.28)] transition-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={() => setScreen("signup")}
              >
                Create Account
              </button>
              <button
                className="min-h-[54px] cursor-pointer rounded-[9px] bg-[#f6f9ec] px-4 text-[20px] font-semibold text-[#61a58f] shadow-[0_2px_5px_rgba(4,72,58,0.28)] transition-transform hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={() => setScreen("login")}
              >
                Already have an account
              </button>
            </div>
          </div>
        </section>
        <section className="absolute inset-x-0 top-10 -z-10 hidden items-center justify-center md:static md:z-0 md:flex">
          <img
            src="/assets/pic/pic-2.png"
            alt="ReMind"
            width="838"
            height="518"
            className="w-[min(72%,470px)] object-contain"
          />
        </section>
      </main>
    );

  const isLogin = screen === "login";
  return (
    <>
      <main
        id="main"
        className="min-h-[100svh] overflow-hidden bg-[#0f8a73] font-['Poppins'] text-[#242424] md:grid md:grid-cols-[0.9fr_1.1fr] md:bg-[#eaf4e5]"
      >
        <header className={`relative overflow-hidden bg-[#0f8a73] text-white ${isLogin ? "h-[260px]" : "h-[150px]"} md:h-screen`}>
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-[155px] bg-[radial-gradient(circle,#a8d8bc_2px,transparent_2.6px)] bg-[length:13px_13px] opacity-80 md:h-[46%] md:bg-[length:16px_16px]"
          />
          <div className={`absolute left-8 z-10 ${isLogin ? "top-[160px]" : "hidden"} md:left-[clamp(48px,8vw,120px)] md:top-1/2 md:block md:-translate-y-1/2`}>
            <h1 className="m-0 text-[43px] font-semibold leading-none md:text-[68px]">Hello!</h1>
            <p className="mb-0 mt-3 text-[21px] font-medium md:text-[29px]">Welcome to ReMind</p>
          </div>
          <img
            src={isLogin ? "/assets/pic/pic-57.png" : "/assets/pic/pic-58.png"}
            alt=""
            aria-hidden="true"
            width={isLogin ? "250" : "286"}
            height={isLogin ? "258" : "240"}
            className={`absolute z-20 object-contain ${isLogin ? "bottom-[-28px] right-3 w-[128px]" : "hidden"} md:bottom-[10%] md:right-[7%] md:block md:w-[clamp(180px,20vw,300px)]`}
          />
        </header>
        <section className={`relative z-10 -mt-[1px] min-h-[calc(100svh-259px)] rounded-t-[58px] bg-[#edf6e9] px-8 pb-8 ${isLogin ? "pt-2" : "min-h-[calc(100svh-149px)] pt-2"} md:mt-0 md:flex md:min-h-screen md:items-center md:rounded-none md:px-[clamp(56px,8vw,140px)] md:py-12`}>
          <div className="mx-auto w-full max-w-[520px]">
          <button
            className={`mb-2 flex min-h-11 cursor-pointer items-center gap-2 text-[15px] font-semibold text-[#242424] hover:text-[#087460] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] ${isLogin ? "sr-only md:not-sr-only" : ""}`}
            onClick={() => setScreen("welcome")}
            aria-label="Kembali"
          >
            <Icon icon={faArrowLeft} className="text-[#087460]" />
            <span>{isLogin ? "Back" : "Back to login"}</span>
          </button>
          <h1 className={`m-0 font-semibold tracking-[-1px] ${isLogin ? "mb-8 text-[39px]" : "mb-6 text-[30px]"} md:text-[44px]`}>
            {isLogin ? "Login" : "Create Your Account"}
          </h1>
          <form className={isLogin ? "space-y-6" : "space-y-[26px]"} onSubmit={submitAuth}>
            {!isLogin && (
              <AuthField
                name="fullName"
                label="Nama lengkap"
                placeholder="Enter your full name"
                icon={faUserLarge}
              />
            )}
            <AuthField
              name="email"
              label="Email"
              type="email"
              placeholder={isLogin ? "Email" : "Enter your email"}
              icon={faEnvelope}
            />
            <AuthField
              name="password"
              label="Password"
              type="password"
              placeholder={isLogin ? "Password" : "Create a password"}
              icon={faLock}
            />
            {!isLogin && (
              <>
                <AuthField
                  name="confirmPassword"
                  label="Konfirmasi password"
                  type="password"
                  placeholder="Confirm password"
                  icon={faLock}
                />
                <AuthField
                  name="phone"
                  label="Nomor telepon"
                  type="tel"
                  placeholder="Enter your phone number"
                  icon={faMobileScreen}
                />
              </>
            )}
            {isLogin && (
              <button
                type="button"
                className="-mt-3 ml-auto block min-h-11 cursor-pointer px-1 text-[13px] font-medium hover:text-[#087460] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]"
                onClick={() => {
                  setResetMessage("");
                  setShowReset(true);
                }}
              >
                Forgot Password
              </button>
            )}
            {message && (
              <p className="m-0 rounded-xl bg-[#f8dbe1] px-4 py-3 text-center text-xs font-semibold text-[#8c3e4d]" role="status">
                {message}
              </p>
            )}
            <button
              className={`min-h-[46px] w-full cursor-pointer rounded-[28px] bg-[#0f6b58] px-6 text-[17px] font-semibold text-white transition-colors hover:bg-[#0b5748] active:bg-[#075746] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] ${isLogin ? "!mt-2" : ""}`}
              type="submit"
              disabled={busy}
            >
              {busy ? "Memproses…" : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          {isLogin && (
            <>
              <div className="my-7 flex items-center gap-4 text-[13px] text-[#7d827d] before:h-px before:flex-1 before:bg-[#8c928c] after:h-px after:flex-1 after:bg-[#8c928c]">
                <span className="shrink-0">Or login with</span>
              </div>
              <div className="flex justify-center gap-4">
                <button
                  className="grid size-12 cursor-pointer place-items-center rounded-full transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]"
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
                  <img className="size-12 object-contain" src="/assets/pic/pic-0.png" alt="" />
                </button>
                <button
                  className="grid size-12 cursor-pointer place-items-center rounded-full transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]"
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
                  <img className="size-12 object-contain" src="/assets/pic/pic-1.png" alt="" />
                </button>
              </div>
            </>
          )}
          {isLogin && (
            <button
              className="mx-auto mt-7 block min-h-11 cursor-pointer px-2 text-[13px] text-[#6e736f] hover:text-[#087460] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]"
              onClick={() => setScreen("signup")}
            >
              Don’t have account? <span className="text-[#62b7a5]">Sign Up</span>
            </button>
          )}
          {!isLogin && (
            <img
              src="/assets/pic/pic-58.png"
              alt=""
              aria-hidden="true"
              className="mx-auto mt-2 w-[145px] object-contain md:hidden"
            />
          )}
          </div>
        </section>
      </main>
      {showReset && (
        <Modal title="Reset Password" close={() => setShowReset(false)}>
          <form
            className="text-center"
            onSubmit={async (event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              const email = String(form.get("resetEmail") || "");
              const pw = String(form.get("resetPassword") || "");
              const confirm = String(form.get("resetConfirm") || "");
              if (pw && pw !== confirm) {
                setResetMessage("Konfirmasi password belum sama.");
                return;
              }
              try {
                if (hasSupabase) await resetPassword(email);
                setResetMessage("Tautan reset password telah dikirim ke emailmu.");
                setShowReset(false);
              } catch (error) {
                setResetMessage(error.message || "Gagal mengirim tautan reset.");
              }
            }}
          >
            <div
              className="mx-auto mb-2.5 grid size-12 place-items-center rounded-xl bg-[#e3efe6] text-2xl text-[#07513f]"
              aria-hidden="true"
            >
              <Icon icon={faLock} />
            </div>
            <p className="mb-3 text-sm leading-6 text-[#4d6a5f]">
              Masukkan email akunmu untuk menerima tautan reset password.
            </p>
            <div className="space-y-3 text-left">
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
                placeholder="Konfirmasi password"
                icon={faLock}
              />
            </div>
            {resetMessage && (
              <p
                className="mb-3 mt-4 rounded-xl bg-[#f8dbe1] px-4 py-3 text-center text-xs font-semibold text-[#8c3e4d]"
                role="status"
              >
                {resetMessage}
              </p>
            )}
            <button
              className="mt-5 min-h-[46px] w-full cursor-pointer rounded-full bg-[#0f6b58] px-6 text-base font-semibold text-white transition-colors hover:bg-[#0b5748] active:bg-[#075746] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]"
              type="submit"
            >
              Kirim tautan reset
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}
function AuthField({ label, icon, ...props }) {
  const id = `auth-${label.toLowerCase().replace(/\s/g, "-")}`;
  return (
    <label className="relative block" htmlFor={id}>
      <span className="sr-only">{label}</span>
      <Icon
        icon={icon}
        aria-hidden="true"
        className="pointer-events-none absolute left-7 top-1/2 z-10 -translate-y-1/2 text-[14px] text-[#a2a2a2]"
      />
      <input
        id={id}
        required
        className="h-[46px] w-full rounded-[26px] border-0 bg-white py-3 pl-[62px] pr-5 text-[14px] font-semibold text-[#333] outline-none placeholder:text-[#a2a2a2] focus-visible:ring-2 focus-visible:ring-[#138a74] focus-visible:ring-offset-2 md:h-[54px] md:text-base"
        {...props}
      />
    </label>
  );
}
function Field({ label, icon, className = "", inputClassName = "", ...props }) {
  const id = useId();
  return (
    <label className={`block ${className}`} htmlFor={id}>
      <span className="mb-1.5 ml-1 block text-[11px] font-bold uppercase tracking-wide text-[#365e53]">
        {label}
      </span>
      <span className="relative block">
        {icon && (
          <Icon
            icon={icon}
            aria-hidden="true"
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[15px] text-[#5f8577]"
          />
        )}
        <input
          id={id}
          required
          className={`min-h-[46px] w-full rounded-xl border border-[#9fbeae] bg-[#f2f7ef] px-3.5 py-2.5 text-[15px] text-[#173d35] outline-none transition-colors placeholder:text-[#6f8d83] focus-visible:border-[#0f6b58] focus-visible:ring-2 focus-visible:ring-[#0f6b58]/35 ${icon ? "pl-11" : ""} ${inputClassName}`}
          {...props}
        />
      </span>
    </label>
  );
}
function NotificationBell({ tasks = [], go, variant = "badge", className = "" }) {
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("remind-read-notifications") || "[]");
    } catch {
      return [];
    }
  });
  const pendingTasks = tasks.filter((task) => !task.done).slice(0, 3);
  const notifications = [
    ...pendingTasks.map((task) => ({
      id: `task-${task.id}`,
      title: "Tugas menunggu",
      text: task.title,
      target: "tasks",
    })),
    {
      id: `mood-${new Date().toDateString()}`,
      title: "Cek mood harian",
      text: "Luangkan satu menit untuk mencatat mood dan beban pikiranmu hari ini.",
      target: "mood",
    },
    {
      id: "support",
      title: "Dukungan selalu tersedia",
      text: "Kamu bisa membuka SOS dan menghubungi kontak darurat kapan saja.",
      target: "sos",
    },
  ];
  const unread = notifications.filter((item) => !read.includes(item.id)).length;
  const markRead = (ids) => {
    const next = Array.from(new Set([...read, ...ids]));
    setRead(next);
    localStorage.setItem("remind-read-notifications", JSON.stringify(next));
  };
  const buttonTone =
    variant === "plain"
      ? "text-white hover:bg-white/15"
      : variant === "ghost"
        ? "text-[#174d3f] hover:bg-white/50"
        : "bg-white text-[#174d3f] hover:bg-[#eef6e7]";
  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          markRead(notifications.map((item) => item.id));
        }}
        aria-label={unread ? `Notifikasi, ${unread} belum dibaca` : "Notifikasi"}
        className={`relative grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] md:text-lg ${buttonTone} ${className}`}
      >
        <Icon icon={faBell} aria-hidden="true" />
        {unread > 0 && (
          <span className="absolute right-2 top-2 size-2 rounded-full bg-[#ff8d86] ring-2 ring-white" aria-hidden="true" />
        )}
      </button>
      {open && (
        <Modal title="Notifikasi" close={() => setOpen(false)}>
          <div className="mt-4 grid gap-2.5">
            {notifications.map((item) => {
              const isUnread = !read.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    markRead([item.id]);
                    if (go) {
                      setOpen(false);
                      go(item.target);
                    }
                  }}
                  className={`grid w-full cursor-pointer grid-cols-[40px_1fr] items-start gap-3 rounded-2xl border px-3.5 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] ${isUnread ? "border-[#9fbeae] bg-[#f2f7ef]" : "border-transparent bg-white"}`}
                >
                  <span className="grid size-10 place-items-center rounded-full bg-[#dce9df] text-[#0f6b58]">
                    <Icon icon={faBell} aria-hidden="true" />
                  </span>
                  <span className="grid">
                    <b className="text-sm text-[#173d35] md:text-base">{item.title}</b>
                    <small className="mt-0.5 text-xs leading-5 text-[#4f6b60] md:text-sm">
                      {item.text}
                    </small>
                  </span>
                </button>
              );
            })}
          </div>
          <button
            type="button"
            onClick={() => markRead(notifications.map((item) => item.id))}
            className="mt-4 min-h-11 w-full cursor-pointer rounded-full bg-[#e2eee6] px-4 text-sm font-semibold text-[#07513f] transition-colors hover:bg-[#d1e3d7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] md:text-base"
          >
            Tandai semua dibaca
          </button>
        </Modal>
      )}
    </>
  );
}
function BottomNav({ current, go }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 h-[74px] bg-[#087965] px-2 pb-[19px] pt-[15px] text-[#087460] lg:sticky lg:inset-auto lg:top-0 lg:order-first lg:flex lg:h-screen lg:w-[270px] lg:shrink-0 lg:flex-col lg:bg-[#0d705e] lg:p-6 lg:text-white"
      aria-label="Navigasi utama"
    >
      <div className="hidden items-center gap-3 border-b border-white/20 pb-6 lg:flex">
        <img
          src="/assets/pic/pic-3.png"
          width="92"
          height="86"
          alt=""
          className="size-14 object-contain"
        />
        <div>
          <img
            src="/assets/pic/pic-4.png"
            width="146"
            height="56"
            alt="ReMind"
            className="w-[112px] object-contain brightness-0 invert"
          />
          <span className="mt-1 block text-[10px] leading-tight text-white/75">
            Rest Your Mind, Reset Your Day.
          </span>
        </div>
      </div>
      <div className="grid h-[40px] grid-cols-6 rounded-[23px] bg-[#f5f7e9] px-1 lg:mt-8 lg:h-auto lg:grid-cols-1 lg:gap-2 lg:rounded-none lg:bg-transparent lg:px-0">
        {nav.map(([id, label, icon]) => (
          <button
            key={id}
            className={`flex min-w-0 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3d56a] md:text-lg lg:min-h-12 lg:flex-row lg:justify-start lg:gap-3 lg:px-4 lg:text-xl ${current === id ? "bg-[#c5e1d2] text-[#075746] lg:bg-white/15 lg:text-white" : "text-[#087460] hover:bg-[#dcebdd] lg:text-white/75 lg:hover:bg-white/10 lg:hover:text-white"}`}
            onClick={() => go(id)}
            aria-current={current === id ? "page" : undefined}
          >
            <Icon icon={icon} />
            <span className="max-w-full truncate text-[8px] font-medium leading-none md:text-[11px] lg:text-[14px] lg:font-semibold lg:leading-normal">
              {label}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-auto hidden rounded-2xl bg-white/10 p-4 lg:block">
        <Icon
          icon={faHeartPulse}
          className="mb-3 text-2xl text-[#f2a1b8]"
        />
        <div>
          <b className="block">Butuh bantuan?</b>
          <span className="text-xs text-white/70">
            Dukungan tersedia untukmu
          </span>
        </div>
        <button
          className="mt-4 min-h-11 w-full cursor-pointer rounded-xl bg-[#f6f8eb] font-bold text-[#a7374a] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          onClick={() => go("sos")}
        >
          Buka SOS
        </button>
      </div>
    </nav>
  );
}
function Home({ go, user }) {
  return (
    <div className="min-h-[calc(100svh-74px)] bg-[#cfe8d2] font-['Poppins'] text-[#163f35] xl:grid xl:min-h-screen xl:grid-cols-[minmax(430px,0.95fr)_minmax(480px,1.05fr)] xl:grid-rows-[auto_auto] xl:gap-7 xl:bg-[#eef5ec] xl:p-8">
      <section className="relative h-[330px] overflow-hidden px-4 pt-2 md:h-auto md:min-h-[520px] md:rounded-[32px] md:bg-[#cfe8d2] md:p-8 md:shadow-[0_18px_45px_rgba(22,84,67,0.12)]">
        <img src="/assets/pic/pic-62.png" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25" />
        <div className="relative z-10 flex h-[54px] items-center justify-between">
          <div className="flex items-center gap-1.5">
            <img src="/assets/pic/pic-3.png" width="92" height="86" alt="" className="h-[45px] w-[48px] object-contain md:h-16 md:w-16" />
            <img src="/assets/pic/pic-4.png" width="146" height="56" alt="ReMind" className="w-[76px] object-contain md:w-[112px]" />
          </div>
          <button className="grid size-[50px] cursor-pointer place-items-center rounded-full transition-transform hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] md:size-16" onClick={() => go("sos")} aria-label="Buka SOS">
            <img src="/assets/pic/pic-6.png" width="102" height="100" alt="" className="size-full object-contain" />
          </button>
        </div>
        <div className="relative z-10 mt-1 flex items-center gap-3 md:mt-5">
          <img src="/assets/pic/pic-5.png" width="108" height="82" alt="" className="h-[55px] w-[62px] shrink-0 object-contain md:h-[82px] md:w-[108px]" />
          <h1 className="m-0 text-[17px] font-medium leading-[1.45] md:text-[24px]">Halo, {user.name}!♡</h1>
        </div>
        <div className="absolute inset-x-4 bottom-3 z-10 h-[178px] rounded-[38px] border-[3px] border-[#6f9d7c] bg-[#d9ecd6]/95 px-7 pb-2 pt-3 md:inset-x-8 md:bottom-8 md:h-[245px] md:px-10 md:pt-6">
          <img src="/assets/pic/pic-7.png" alt="" aria-hidden="true" className="absolute -left-1 bottom-1 h-12 w-10 object-contain" />
          <img src="/assets/pic/pic-8.png" alt="" aria-hidden="true" className="absolute -right-1 top-0 h-16 w-12 object-contain" />
          <h2 className="m-0 text-center text-[14px] font-bold md:text-xl">How are you feeling today?</h2>
          <div className="mt-2 grid grid-cols-5 gap-1 md:mt-5 md:gap-3">
            {moodOptions.map(([m, image]) => (
              <button key={m} aria-label={m} onClick={() => go("mood")} className="flex min-w-0 cursor-pointer flex-col items-center gap-1 rounded-xl py-0.5 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#087460]">
                <span className="grid size-[42px] place-items-center overflow-hidden rounded-full md:size-[62px]"><img src={image} alt="" width="62" height="62" className="size-full object-contain" /></span>
                <span className="max-w-full truncate text-[11px] font-medium md:text-sm">{m}</span>
              </button>
            ))}
          </div>
          <button className="mx-auto mt-1 flex min-h-11 w-[196px] cursor-pointer items-center justify-center gap-1 rounded-[18px] bg-[#2f7d66] px-5 text-[12px] font-medium text-white hover:bg-[#286b57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746] md:mt-4 md:min-h-11 md:w-[260px] md:text-base" onClick={() => go("mood")}>
            Check My Mood <Icon icon={faChevronRight} />
          </button>
          <img src="/assets/pic/pic-9.png" alt="" aria-hidden="true" className="absolute bottom-1 right-5 h-5 w-9 object-contain" />
          <img src="/assets/pic/pic-10.png" alt="" aria-hidden="true" className="absolute bottom-0 left-0 h-10 w-12 object-contain" />
        </div>
      </section>
      <section className="rounded-[36px] bg-white px-[18px] pb-[18px] pt-3 md:rounded-[32px] md:px-8 md:py-7 md:shadow-[0_18px_45px_rgba(22,84,67,0.10)]">
        <h2 className="mb-0 mt-0 font-['Playfair_Display'] text-[17px] font-bold md:mb-3 md:text-[26px]">Your Wellness</h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:gap-5">
          <Feature image="/assets/pic/pic-11.png" title="Pomodoro" text="Belajar & Istirahat" onClick={() => go("pomodoro")} />
          <Feature image="/assets/pic/pic-12.png" title="Grounding" text="Tenangkan Diri" onClick={() => go("sos")} />
          <Feature image="/assets/pic/pic-13.png" title="Mental Health" text="Edukasi & Flashcard" onClick={() => go("education")} />
          <Feature image="/assets/pic/pic-16.png" title="Mood Playlist" text="Musik Sesuai Suasana" onClick={() => go("playlist")} />
        </div>
      </section>
      <section className="relative mx-1 mb-0 mt-5 min-h-[102px] overflow-hidden rounded-[42px] border-[8px] border-white bg-[#f4f7e7] px-[82px] py-3 md:col-span-2 md:mx-0 md:my-0 md:min-h-[130px] md:rounded-[32px] md:px-[170px] md:py-7">
        <img src="/assets/pic/pic-22.png" width="222" height="272" alt="" className="absolute -bottom-16 -left-8 h-[150px] w-[125px] object-contain md:-bottom-28 md:h-[260px] md:w-[210px]" />
        <img src="/assets/pic/pic-20.png" width="130" height="152" alt="" className="absolute -right-2 -top-3 h-20 w-16 rotate-[-18deg] object-contain md:h-28 md:w-24" />
        <div className="relative z-10">
          <b className="font-['Playfair_Display'] text-[16px] font-bold md:text-[22px]">Daily Reminder</b>
          <p className="mb-0 mt-1 text-[11px] leading-[1.45] md:text-[15px]">“You don't have to do everything at once.<br />Take it one step at a time”</p>
        </div>
      </section>
    </div>
  );
}
function Feature({ icon, image, title, text, onClick }) {
  return (
    <button className="relative flex min-h-[114px] cursor-pointer flex-col items-start rounded-[22px] bg-[#e6eed9] px-5 pb-3 pt-2 text-left text-[#174d3f] transition-transform odd:bg-[#e7efda] even:bg-[#b9d2b9] hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] md:min-h-[190px] md:px-7 md:py-5" onClick={onClick}>
      <span className="grid size-[54px] place-items-center rounded-full bg-[#c4ddd0] md:size-[82px]">
        {image ? <img src={image} alt="" className="size-full object-contain" /> : <Icon icon={icon} />}
      </span>
      <b className="mt-0.5 text-[13px] font-bold md:mt-3 md:text-xl">{title}</b>
      <small className="text-[9px] leading-tight text-[#46695d] md:text-sm">{text}</small>
      <Icon className="absolute right-3 top-1/2 text-[14px] text-[#075c49] md:right-5 md:text-xl" icon={faChevronRight} />
    </button>
  );
}
function Tasks({ tasks, setTasks, flash, go, user }) {
  const { first, rest } = splitName(user?.name);
  const [adding, setAdding] = useState(false);
  const [searching, setSearching] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [dateFilter, setDateFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState([]);
  const visible = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  );
  const todayKey = new Date().toDateString();
  const tomorrowDate = new Date();
  tomorrowDate.setDate(tomorrowDate.getDate() + 1);
  const tomorrowKey = tomorrowDate.toDateString();
  const filteredTasks = tasks.filter((task) => {
    const taskDate = task.date ? new Date(task.date).toDateString() : "";
    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && taskDate === todayKey) ||
      (dateFilter === "tomorrow" && taskDate === tomorrowKey) ||
      (dateFilter === "upcoming" &&
        task.date &&
        new Date(task.date).getTime() > tomorrowDate.getTime());
    const matchesPriority =
      priorityFilter.length === 0 || priorityFilter.includes(task.priority);
    return matchesDate && matchesPriority;
  });
  const filterActive = dateFilter !== "all" || priorityFilter.length > 0;
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
      <section className="relative mx-auto min-h-[calc(100dvh-69px)] w-full max-w-[1120px] overflow-hidden bg-white pb-10 text-[#174f38] md:min-h-screen">
        <div className="absolute inset-x-0 top-0 h-[153px] bg-[#d9efdc] bg-[url('/assets/pic/pic-62.png')] bg-cover opacity-80" />
        <header className="relative z-10 flex min-h-12 items-center gap-5 px-5 pt-2 md:px-12 md:pt-7">
          <button className="grid size-11 place-items-center text-[27px] text-[#73a883] focus-visible:outline-2 focus-visible:outline-[#087460]" onClick={() => setSelected(null)} aria-label="Kembali">
            <Icon icon={faArrowLeft} />
          </button>
          <h1 className="text-[18px] font-semibold md:text-2xl">Detail Tugas</h1>
          <button className="ml-auto grid size-11 place-items-center text-xl text-white focus-visible:outline-2 focus-visible:outline-[#087460]" onClick={() => { setSelected(null); setSearching(true); }} aria-label="Cari">
            <Icon icon={faMagnifyingGlass} />
          </button>
          <NotificationBell tasks={tasks} go={go} variant="plain" />
        </header>
        <div className="relative z-10 flex items-center px-4 md:px-12">
          <img className="h-[76px] w-[70px] object-contain md:h-24 md:w-24" src="/assets/pic/pic-17.png" alt="Maskot ReMind" />
          <p className="text-[18px] font-semibold leading-[23px] md:text-2xl">Hai, {first}<br />{rest}<br /><b className="text-[13px] text-[#075746] md:text-base">“Yuk, selesaikan tugasmu satu per satu!”</b></p>
        </div>
        <span className={`relative z-10 ml-8 inline-block min-w-[117px] rounded-full px-4 text-center text-[18px] leading-6 text-[#242424] ${selected.priority === "Tinggi" ? "bg-[#e25b55]" : selected.priority === "Sedang" ? "bg-[#a8baaa]" : "bg-[#9fb69e]"}`}>{selected.priority}</span>
        <div className="relative z-10 mx-auto mt-7 grid max-w-[900px] gap-3 px-[15px] lg:grid-cols-2 lg:px-10">
          {[selected, ...tasks.filter((task) => task.id !== selected.id).slice(0, 1)].map((task) => (
            <article className="rounded-[46px] bg-[#3d7359] px-8 pb-3 pt-2 text-white md:min-h-[260px] md:px-10 md:py-6" key={task.id}>
              <h2 className="text-center text-[18px] font-semibold leading-[23px] md:text-xl">{task.title}</h2>
              <div className="mt-1 flex items-center justify-between border-t-2 border-white pt-1 text-[15px] font-semibold md:mt-5 md:pt-3"><span><Icon className="mr-3 text-[30px]" icon={faClock} /> {new Date(task.date).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" })}</span><span><Icon className="mr-3 text-[30px]" icon={faClock} /> {task.time}</span></div>
              <p className="mt-4 text-[17px] font-semibold">Catatan : <b className="float-right mr-[38%]">{task.note || "-"}</b></p>
              <button className="mx-auto mt-7 flex min-h-10 w-[210px] items-center justify-center rounded-full bg-white text-[17px] font-semibold text-[#242424] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]" onClick={() => toggle(task.id)}><i className={`mr-3 size-6 rounded-sm !border-2 !border-[#138b78] ${task.done ? "bg-[#138b78]" : ""}`} /> {task.done ? "Tandai Belum Selesai" : "Tandai Selesai"}</button>
            </article>
          ))}
        </div>
        <footer className="mt-9 text-center text-[#242424]"><b className="block text-lg font-medium">Kamu pasti bisa!</b><small className="block text-[13px]">Jangan lupa istirahat juga ya</small></footer>
      </section>
    );
  }
  if (filtering)
    return (
      <section className="mx-auto min-h-[calc(100dvh-69px)] w-full max-w-[760px] bg-[#f4f8eb] px-5 pb-28 pt-4 font-['Poppins'] text-[#174f38] md:min-h-screen md:px-10 md:py-8">
        <header className="flex items-center gap-3">
          <button
            type="button"
            className="grid size-11 place-items-center text-[27px] text-[#73a883] transition-colors hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-[#087460]"
            onClick={() => setFiltering(false)}
            aria-label="Kembali"
          >
            <Icon icon={faArrowLeft} />
          </button>
          <h1 className="m-0 text-[22px] font-bold md:text-3xl">Filter</h1>
        </header>
        <h2 className="mb-3 mt-8 text-lg font-bold md:text-xl">Lihat berdasarkan</h2>
        <div className="flex flex-wrap gap-2">
          {[
            ["all", "Semua"],
            ["today", "Hari ini"],
            ["tomorrow", "Besok"],
            ["upcoming", "Mendatang"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              aria-pressed={dateFilter === value}
              onClick={() => setDateFilter(value)}
              className={`min-h-11 cursor-pointer rounded-full px-5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] ${dateFilter === value ? "bg-[#0f6b58] text-white" : "bg-[#f1f5e8] text-[#245347] hover:bg-[#e5eddb]"}`}
            >
              {label}
            </button>
          ))}
        </div>
        <h2 className="mb-3 mt-8 text-lg font-bold md:text-xl">Prioritas</h2>
        <div className="grid gap-3">
          {[
            ["Tinggi", "#ef8c9a"],
            ["Sedang", "#f4e56b"],
            ["Rendah", "#a9d3a7"],
          ].map(([priority, color]) => {
            const active = priorityFilter.includes(priority);
            return (
              <button
                key={priority}
                type="button"
                role="checkbox"
                aria-checked={active}
                onClick={() =>
                  setPriorityFilter((current) =>
                    current.includes(priority)
                      ? current.filter((item) => item !== priority)
                      : [...current, priority],
                  )
                }
                className="flex min-h-12 w-full cursor-pointer items-center gap-3 rounded-xl px-2 text-left text-base font-medium transition-colors hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]"
              >
                <span
                  className={`grid size-7 place-items-center rounded-md border-2 text-sm ${active ? "border-[#0f6b58] bg-[#0f6b58] text-white" : "border-[#7fa08f] bg-white text-transparent"}`}
                >
                  <Icon icon={faCircleCheck} aria-hidden="true" />
                </span>
                <Icon icon={faHeart} aria-hidden="true" style={{ color }} />
                <span>{priority}</span>
              </button>
            );
          })}
        </div>
        <div className="mt-10 grid gap-2.5">
          <button
            type="button"
            onClick={() => setFiltering(false)}
            className="min-h-12 w-full cursor-pointer rounded-full bg-[#2f7d66] px-5 text-base font-semibold text-white transition-colors hover:bg-[#286b57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Terapkan
          </button>
          <button
            type="button"
            onClick={() => {
              setDateFilter("all");
              setPriorityFilter([]);
            }}
            className="min-h-11 w-full cursor-pointer rounded-full px-5 text-sm font-semibold text-[#4f6b60] transition-colors hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]"
          >
            Reset filter
          </button>
        </div>
      </section>
    );
  if (tasks.length > 0 && tasks.every((task) => task.done))
    return (
      <section className="relative mx-auto min-h-[calc(100dvh-69px)] w-full max-w-[1120px] overflow-hidden bg-[#e3f5e5] bg-[url('/assets/pic/pic-62.png')] bg-cover px-4 pt-[105px] text-center text-[#075746] md:min-h-screen md:pt-24">
        <img className="mx-auto w-[225px] md:w-[280px]" src="/assets/pic/pic-31.png" alt="Maskot menyelesaikan tugas" />
        <h1 className="mt-5 text-[26px] font-bold md:text-4xl">Semua tugas selesai!</h1>
        <p className="mt-2 text-[16px] font-medium md:text-xl">Kamu sudah melakukan yang terbaik hari ini</p>
        <blockquote className="relative mx-auto mt-4 flex min-h-[164px] max-w-[358px] items-start justify-center rounded-[45px] bg-white px-8 pt-7 text-[16px] leading-6 text-[#174f38] md:max-w-[560px] md:text-xl">Jangan lupa istirahat ya,<br />kamu juga perlu waktu buat diri sendiri<img className="absolute -bottom-5 left-1/2 w-[120px] -translate-x-1/2" src="/assets/pic/pic-19.png" alt="" /></blockquote>
        <button className="mt-10 min-h-[50px] w-[250px] rounded-full bg-[#2f7d66] text-[16px] text-white hover:bg-[#286b57] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#075746]" onClick={() => go("home")}>Kembali ke Beranda</button>
      </section>
    );
  if (searching)
    return (
      <section className="mx-auto min-h-[calc(100dvh-69px)] w-full max-w-[1120px] bg-[#e3f5e5] bg-[url('/assets/pic/pic-62.png')] bg-cover px-7 pt-4 text-[#087f6d] md:min-h-screen md:px-16 md:pt-10">
        <header className="flex items-center gap-8">
          <button className="grid size-11 place-items-center text-[27px] text-[#73a883] focus-visible:outline-2 focus-visible:outline-[#087460]" onClick={() => setSearching(false)} aria-label="Kembali">
            <Icon icon={faArrowLeft} />
          </button>
          <h1 className="text-[18px] font-medium md:text-2xl">Telusuri</h1>
          <NotificationBell tasks={tasks} go={go} className="ml-auto" />
        </header>
        <label className="mx-auto mt-5 flex min-h-[35px] max-w-[740px] items-center rounded-[11px] bg-[#fbfbf5] px-3 text-[#3c9b89]">
          <Icon className="text-xl" icon={faMagnifyingGlass} />
          <input
            className="w-full bg-transparent text-center text-[16px] outline-none"
            autoFocus
            aria-label="Cari"
            placeholder="Cari"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <p className="mx-auto mt-3 max-w-[740px] text-[15px]">Hasil Pencarian ({visible.length})</p>
        <div className="mx-auto mt-4 grid max-w-[740px] gap-[14px] md:grid-cols-2">
          {visible.map((task) => (
            <button className="flex min-h-[61px] items-center rounded-[11px] bg-[#f4faef] px-3 text-[#087f6d] hover:bg-[#e5f0df] focus-visible:outline-2 focus-visible:outline-[#087460]" key={task.id} onClick={() => { setSearching(false); setSelected(task); }}>
              <Icon className="text-[31px]" icon={faClock} />
              <span className="flex-1 text-center text-[15px] font-semibold">{task.title}</span>
            </button>
          ))}
          <button className="flex min-h-[61px] items-center rounded-[11px] bg-[#f4faef] px-3 text-[#087f6d] hover:bg-[#e5f0df] focus-visible:outline-2 focus-visible:outline-[#087460]" onClick={() => go("mood")}>
            <Icon className="text-[31px]" icon={faClock} />
            <span className="flex-1 text-center text-[15px] font-semibold">Mood Tracker</span>
          </button>
        </div>
      </section>
    );
  return (
    <>
      <section className="relative mx-auto w-full max-w-[1120px] bg-[#e3f5e5] bg-[url('/assets/pic/pic-62.png')] bg-cover px-5 pb-3 pt-2 text-[#174f38] md:px-12 md:pb-8 md:pt-7">
        <div className="flex items-center">
          <button className="grid size-11 place-items-center text-[27px] text-[#73a883] focus-visible:outline-2 focus-visible:outline-[#087460]" onClick={() => go("home")} aria-label="Kembali">
            <Icon icon={faArrowLeft} />
          </button>
          <button className="ml-auto grid size-11 place-items-center text-xl text-white focus-visible:outline-2 focus-visible:outline-[#087460]" onClick={() => setSearching(true)} aria-label="Cari">
            <Icon icon={faMagnifyingGlass} />
          </button>
          <button className="grid size-11 place-items-center text-xl text-white focus-visible:outline-2 focus-visible:outline-[#087460]" onClick={() => setFiltering(true)} aria-label="Filter tugas">
            <Icon icon={faFilter} />
          </button>
          <NotificationBell tasks={tasks} go={go} variant="plain" />
        </div>
        <div className="-mt-2 flex items-center md:mt-0">
          <img className="h-[77px] w-[76px] object-contain md:h-28 md:w-28" src="/assets/pic/pic-17.png" alt="Maskot ReMind" width="86" height="77" />
          <div>
          <h1 className="text-[18px] font-semibold leading-[22px] md:text-2xl md:leading-7">
            Hai, {first}
            <br />
            {rest}
          </h1>
          <p className="text-[13px] font-bold text-[#075746] md:text-base">“Yuk, selesaikan tugasmu satu per satu!”</p>
          </div>
        </div>
        <div className="mt-1 flex items-end justify-between md:mx-auto md:max-w-[820px]">
          <h2 className="text-[18px] font-medium md:text-2xl">Checklist Tugas</h2>
          <aside className="flex min-h-[78px] min-w-[155px] items-center justify-center gap-2 rounded-[18px] !border-2 !border-[#79a784] bg-white/30 md:min-w-[210px]">
            <b className="grid size-[57px] place-items-center rounded-full !border-[6px] !border-[#075746] bg-[#d9efdc] text-[16px] text-[#242424]">{percent}%</b>
            <span className="text-[17px] font-semibold">Selesai</span>
          </aside>
        </div>
        <button className="mx-auto mt-3 flex min-h-[61px] w-full max-w-[335px] items-center justify-center gap-4 rounded-full !border-[3px] !border-black bg-[#2f7d66] text-[18px] font-semibold text-white shadow-[7px_8px_0_#000] hover:bg-[#286b57] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#087460] md:max-w-[520px]" onClick={() => setAdding(true)}>
          <Icon icon={faPlus} /> Tambah Tugas
        </button>
      </section>
      <section className="mx-auto min-h-[430px] w-full max-w-[1120px] bg-white px-[13px] pb-12 pt-4 text-[#174f38] md:px-12 md:py-8">
        <h2 className="ml-2 text-[18px] font-medium md:text-2xl">Hari Ini</h2>
        {filterActive && (
          <div className="ml-2 mt-1 flex flex-wrap items-center gap-2 text-xs text-[#4f6b60]">
            <span>
              {dateFilter === "all"
                ? "Semua tanggal"
                : dateFilter === "today"
                  ? "Hari ini"
                  : dateFilter === "tomorrow"
                    ? "Besok"
                    : "Mendatang"}
              {priorityFilter.length
                ? ` · Prioritas ${priorityFilter.join(", ")}`
                : ""}
            </span>
            <button
              type="button"
              onClick={() => {
                setDateFilter("all");
                setPriorityFilter([]);
              }}
              className="min-h-8 cursor-pointer rounded-full bg-[#eef5e9] px-3 font-semibold text-[#0f6b58] hover:bg-[#e0ecda] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]"
            >
              Hapus filter
            </button>
          </div>
        )}
        {filteredTasks.length ? (
          <div className="mx-auto mt-1 min-h-[200px] max-w-[900px] overflow-hidden rounded-[52px] bg-[#3d7359] pt-6 lg:grid lg:min-h-[220px] lg:grid-cols-2 lg:gap-px lg:rounded-[38px] lg:p-6">
            {filteredTasks.map((t) => (
              <article className="relative flex min-h-[65px] items-center border-b border-white px-5 text-white md:min-h-[84px] lg:min-h-[92px] lg:rounded-2xl lg:border lg:px-4" key={t.id}>
                <button
                  className={`grid size-[28px] shrink-0 place-items-center rounded-sm !border-[3px] !border-white text-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:size-9 lg:size-10 ${t.done ? "bg-white text-[#78aa8b]" : "bg-transparent"}`}
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
                <button className="min-w-0 flex-1 px-2 text-left focus-visible:outline-2 focus-visible:outline-white" onClick={() => setSelected(t)}>
                  <h2 className="text-[12px] font-semibold leading-[14px] md:text-base md:leading-5">{t.title}</h2>
                  {!t.done && <p className="text-[11px] font-semibold leading-[14px] md:text-[13px] md:leading-5">
                    {new Date(t.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>}
                  {!t.done && t.note && <small className="block text-[10px] leading-[12px] md:text-xs">{t.note}</small>}
                </button>
                <span className={`h-[11px] w-[73px] shrink-0 rounded-full md:h-3 md:w-[92px] ${t.priority === "Tinggi" ? "bg-[#ef6c80]" : t.priority === "Sedang" ? "bg-[#f4f486]" : "bg-[#a9c39f]"}`} aria-label={`Prioritas ${t.priority}`} />
              </article>
            ))}
          </div>
        ) : (
          <Empty
            title="Tidak ada tugas ditemukan"
            text={
              filterActive
                ? "Tidak ada tugas yang cocok dengan filter ini. Hapus filter atau tambahkan tugas baru."
                : "Ubah kata pencarian atau tambahkan tugas baru."
            }
          />
        )}
      </section>
      {adding && (
        <TaskForm
          close={() => setAdding(false)}
          user={user}
          tasks={tasks}
          go={go}
          save={(t) => {
            setTasks([...tasks, { ...t, id: Date.now(), done: false }]);
            setAdding(false);
            flash("Tugas berhasil disimpan");
          }}
        />
      )}
    </>
  );
}
function TaskForm({ close, save, user, tasks = [], go }) {
  const { first, rest } = splitName(user?.name);
  const [form, setForm] = useState({
    title: "Membaca Materi Kuliah Sistem Informasi Keperawatan",
    date: "2026-10-03",
    time: "13:00",
    priority: "Sedang",
    note: "",
  });
  return (
    <div className="fixed inset-0 z-[90] overflow-y-auto bg-white text-[#242424]">
      <div className="mx-auto min-h-screen w-full max-w-[1120px] pb-24">
        <header className="relative min-h-[153px] bg-[#d9efdc] bg-[url('/assets/pic/pic-62.png')] bg-cover px-5 pt-2 md:px-12 md:pt-7">
          <div className="flex items-center gap-5">
            <button className="grid size-11 place-items-center text-[27px] text-[#73a883] focus-visible:outline-2 focus-visible:outline-[#087460]" type="button" onClick={close} aria-label="Kembali"><Icon icon={faArrowLeft} /></button>
            <h1 className="text-[18px] font-semibold text-[#174f38] md:text-2xl">Tambah Tugas</h1>
            <NotificationBell tasks={tasks} go={go} className="ml-auto" />
          </div>
          <div className="flex items-center md:mt-2">
            <img className="h-[77px] w-[76px] object-contain md:h-24 md:w-24" src="/assets/pic/pic-17.png" alt="Maskot ReMind" />
            <p className="text-[18px] font-semibold leading-[22px] text-[#174f38] md:text-2xl">Hai, {first}<br />{rest}<br /><b className="text-[13px] text-[#075746] md:text-base">“Yuk, selesaikan tugasmu satu per satu!”</b></p>
          </div>
        </header>
      <form
        className="mx-auto max-w-[760px] space-y-2 px-10 pt-4 md:grid md:grid-cols-2 md:gap-x-8 md:space-y-0"
        onSubmit={(e) => {
          e.preventDefault();
          save(form);
        }}
      >
        <label className="block md:col-span-2"><span className="ml-1 text-[17px] font-semibold">Nama Tugas *</span><textarea required rows="2" className="mx-auto -mt-1 block h-[64px] w-full max-w-[292px] resize-none rounded-full !border-[3px] !border-black bg-[#78a985] px-5 py-2 text-center text-[14px] font-semibold leading-[19px] text-white outline-none focus-visible:ring-2 focus-visible:ring-[#087460] md:max-w-none md:text-base" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
        <label className="block"><span className="ml-1 text-[17px] font-semibold">Tanggal*</span><span className="relative mx-auto mt-0.5 block w-full max-w-[292px] md:max-w-none"><Icon icon={faCalendarDays} aria-hidden="true" className="pointer-events-none absolute left-5 top-1/2 text-base text-white/80 -translate-y-1/2" /><input className="block min-h-[64px] w-full rounded-full !border-[3px] !border-black bg-[#78a985] px-12 text-center text-[14px] font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-[#087460] md:text-base" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></span></label>
        <label className="block"><span className="ml-1 text-[17px] font-semibold">Waktu*</span><span className="relative mx-auto mt-0.5 block w-full max-w-[292px] md:max-w-none"><Icon icon={faClock} aria-hidden="true" className="pointer-events-none absolute left-5 top-1/2 text-base text-white/80 -translate-y-1/2" /><input className="block min-h-[64px] w-full rounded-full !border-[3px] !border-black bg-[#78a985] px-12 text-center text-[14px] font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-[#087460] md:text-base" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></span></label>
        <div className="md:col-span-2">
          <span className="ml-1 text-[17px] font-semibold">Prioritas *</span>
          <div className="-mx-7 mt-2 grid grid-cols-3 gap-2 md:mx-0" role="radiogroup" aria-label="Prioritas">
            {["Rendah", "Sedang", "Tinggi"].map((p) => (
              <button
                key={p}
                type="button"
                role="radio"
                aria-checked={form.priority === p}
                className={`min-h-[25px] rounded-full text-[16px] text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] ${p === "Rendah" ? "bg-[#9db49d]" : p === "Sedang" ? "bg-[#edff62]" : "bg-[#e25b55]"} ${form.priority === p ? "ring-2 ring-[#075746] ring-offset-2" : ""}`}
                onClick={() => setForm({ ...form, priority: p })}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <label className="block md:col-span-2">
          <span className="ml-1 text-[17px] font-semibold">Catatan (opsional)</span>
          <textarea
            className="mx-auto mt-1 block min-h-[100px] w-full max-w-[282px] resize-none rounded-[8px] !border-[3px] !border-black px-4 py-3 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-[#087460] md:max-w-none md:text-base"
            value={form.note}
            onChange={(e) => setForm({ ...form, note: e.target.value })}
            placeholder="Tambahkan catatan..."
          />
        </label>
        <div className="mx-auto mt-3 grid w-[155px] gap-2 md:col-span-2">
          <button className="flex min-h-[30px] items-center justify-center gap-3 rounded-md bg-[#eff6e8] text-[16px] font-semibold text-[#242424] hover:bg-[#dfead6] focus-visible:outline-2 focus-visible:outline-[#087460]" type="submit">
            <Icon icon={faFloppyDisk} /> Simpan Tugas
          </button>
          <button className="flex min-h-[30px] items-center justify-center gap-3 rounded-md bg-[#eff6e8] text-[16px] font-semibold text-[#242424] hover:bg-[#dfead6] focus-visible:outline-2 focus-visible:outline-[#087460]" type="button" onClick={close}>
            <Icon icon={faXmark} /> Batal
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}
function Pomodoro({ go }) {
  const defaults = { focus: 40 * 60, short: 10 * 60, long: 20 * 60 };
  const localPomodoroPreview = ["127.0.0.1", "localhost"].includes(window.location.hostname)
    ? new URLSearchParams(window.location.search).get("pomodoroState")
    : null;
  const initialMode = localPomodoroPreview === "break" ? "short" : "focus";
  const [mode, setMode] = useState(initialMode);
  const [seconds, setSeconds] = useState(localPomodoroPreview === "alarm" ? 0 : defaults[initialMode]);
  const [running, setRunning] = useState(false);
  const [pausedNotice, setPausedNotice] = useState(false);
  const [alarmNotice, setAlarmNotice] = useState("");
  const alarmAudio = useRef(null);
  const alarmPlayed = useRef(false);
  const stopAlarmSound = () => {
    if (!alarmAudio.current) return;
    clearInterval(alarmAudio.current.interval);
    alarmAudio.current.context.close?.().catch(() => {});
    alarmAudio.current = null;
  };
  const playAlarmSound = () => {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor) return;
    if (!alarmAudio.current) {
      const context = new AudioCtor();
      context.resume?.();
      alarmAudio.current = { context, interval: null };
    }
    const context = alarmAudio.current.context;
    const ring = () => {
      const now = context.currentTime;
      [0, 0.45, 0.9, 1.6].forEach((offset, index) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        oscillator.type = "sine";
        oscillator.frequency.value = index % 2 ? 660 : 880;
        gain.gain.setValueAtTime(0.0001, now + offset);
        gain.gain.exponentialRampToValueAtTime(0.18, now + offset + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + 0.32);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start(now + offset);
        oscillator.stop(now + offset + 0.35);
      });
    };
    ring();
    alarmAudio.current.interval = setInterval(ring, 2600);
  };
  const prepareAlarmSound = () => {
    const AudioCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtor || alarmAudio.current) return;
    const context = new AudioCtor();
    context.resume?.();
    alarmAudio.current = { context, interval: null };
  };
  useEffect(() => {
    if (seconds === 0 && mode === "focus") {
      if (!alarmPlayed.current) {
        alarmPlayed.current = true;
        playAlarmSound();
      }
    } else if (seconds > 0) {
      alarmPlayed.current = false;
    }
  }, [seconds, mode]);
  useEffect(() => () => stopAlarmSound(), []);
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
    stopAlarmSound();
    alarmPlayed.current = false;
    setMode(m);
    setSeconds(defaults[m]);
    setRunning(false);
  };
  const pct = 1 - seconds / defaults[mode];
  const minutes = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secondsPart = String(seconds % 60).padStart(2, "0");
  const hasProgress = running || seconds < defaults[mode];
  const Notice = ({ children, action = "Oke", onClose }) => (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/10 px-8">
      <div className="w-full max-w-[320px] rounded-[48px] bg-white px-8 pb-7 pt-9 text-center text-[#285e46] shadow-xl md:max-w-[420px]" role="dialog" aria-modal="true">
        <span className="mx-auto grid size-[82px] place-items-center rounded-full !border-[13px] !border-[#54ad5c] text-[51px] text-[#6ccc79]"><Icon icon={faCircleCheck} /></span>
        <p className="mt-6 text-[17px] leading-6">{children}</p>
        <button className="mt-5 min-h-[36px] rounded-full bg-[#075b2a] px-7 text-[15px] text-white hover:bg-[#06491f] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#087460]" onClick={onClose}>{action}</button>
      </div>
    </div>
  );
  if (seconds === 0 && mode === "focus")
    return (
      <section className="relative mx-auto min-h-[calc(100dvh-69px)] w-full max-w-[1120px] overflow-hidden bg-[linear-gradient(110deg,#004827,#58aaa3)] px-5 pb-6 pt-3 text-[#d9efdc] md:min-h-screen md:px-14 md:pt-8">
        <h1 className="text-[30px] font-medium md:text-4xl">POMODORO - ALARM</h1>
        <span className="mt-3 inline-flex min-h-[31px] items-center gap-2 rounded-full bg-white/20 px-4 text-[16px]">
          <Icon icon={faVolumeHigh} /> Berbunyi
        </span>
        <div className="relative mx-auto mt-[70px] grid size-[127px] place-items-center rounded-full bg-[#d5f3dd] shadow-[0_0_0_18px_rgba(184,229,208,.20),0_0_0_36px_rgba(184,229,208,.15),0_0_0_54px_rgba(184,229,208,.10)] md:mt-20 md:size-[180px]">
          <i className="absolute right-[14px] top-[18px] size-4 rounded-full bg-[#91f5dd]" />
        </div>
        <strong className="mt-[67px] block text-center text-[62px] font-medium leading-none text-white md:text-[72px]">+02:23</strong>
        <h2 className="mt-1 text-center text-[25px] font-semibold leading-8 text-white md:text-3xl">
          Waktu belajar telah
          <br />
          berakhir
        </h2>
        <p className="mt-2 text-center text-[13px] leading-5 text-[#d5e9df] md:text-base">
          Kamu melewati batas belajar selama 2 menit 23 detik.
          <br />
          Hentikan alarm atau lanjut ke sesi istirahat.
        </p>
        <div className="mx-auto mt-4 w-full max-w-[346px] rounded-[26px] bg-white/15 px-4 pb-4 pt-3 md:max-w-[520px]">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-[#d5e9df] pb-3 text-center text-[14px]"><span><b className="block text-[13px]">SESI SELESAI</b>Belajar • 40 menit</span><Icon icon={faChevronRight} /><span><b className="block text-[13px]">BERIKUTNYA</b>Istirahat • 10 menit</span></div>
          <button
            className="mt-3 min-h-[49px] w-full rounded-full bg-[#f4faef] text-[17px] text-[#26715c] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => {
              stopAlarmSound();
              alarmPlayed.current = false;
              setSeconds(defaults.focus);
              setRunning(false);
            }}
          >
            <span className="mr-2 inline-block size-6 align-middle !border !border-[#67a798]" /> Hentikan alarm
          </button>
          <button
            className="mt-3 min-h-[49px] w-full rounded-full !border-2 !border-white bg-transparent text-[17px] text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={() => {
              choose("short");
              setAlarmNotice("Sesi istirahat berhasil dimulai!");
            }}
          >
            <Icon className="mr-2" icon={faForwardStep} /> Mulai sesi istirahat
          </button>
        </div>
        {alarmNotice && (
          <Notice action="Kembali ke Pomodoro" onClose={() => setAlarmNotice("")}>{alarmNotice}</Notice>
        )}
      </section>
    );
  return (
    <section className="mx-auto min-h-[calc(100dvh-69px)] w-full max-w-[1120px] bg-[#d3edda] px-[22px] pb-5 pt-3 text-[#075746] xl:grid xl:min-h-screen xl:grid-cols-[1fr_0.9fr] xl:gap-x-12 lg:px-14 lg:py-9 md:min-h-screen">
      <header className="-ml-3 flex items-start gap-1 md:col-span-2 md:ml-0 md:gap-4">
        <button className="grid size-9 shrink-0 place-items-center text-[27px] text-[#73a883] focus-visible:outline-2 focus-visible:outline-[#087460]" onClick={() => go("home")} aria-label="Kembali">
          <Icon icon={faArrowLeft} />
        </button>
        <div>
          <h1 className="text-[29px] font-semibold leading-[30px] md:text-4xl">POMODORO</h1>
          <h2 className="text-[25px] font-semibold leading-[25px] text-[#138b78] md:text-3xl">{mode === "focus" ? "Saatnya Belajar" : "Tarik Napas"}</h2>
          <p className="text-[14px] text-[#138b78] md:text-base">{mode === "focus" ? "Jaga ritme, satu sesi penuh." : "Beristirahat tanpa kehilangan ritme"}</p>
        </div>
      </header>
      <div className="md:col-start-1 md:row-span-3">
        <div className="relative mx-auto mt-4 grid size-[252px] place-items-center rounded-full md:size-[330px]" style={{ background: `conic-gradient(#06492b ${pct * 360}deg, #69baa2 0deg)` }}>
          <div className="grid size-[239px] place-items-center rounded-full bg-[#d4f4dc] md:size-[313px]">
            <span className="mt-7 text-[70px] font-medium leading-none md:text-[84px]">{minutes}:{secondsPart}</span>
            <small className="-mt-12 text-[12px] md:text-sm">{hasProgress ? `• ${mode === "focus" ? "Fokus" : "Istirahat"} sedang berlangsung` : ""}</small>
          </div>
        </div>
        <p className="mx-auto mt-3 max-w-[300px] text-center text-[12px] leading-4 md:text-base md:leading-6">
          {mode === "focus"
            ? "Menyelesaikan membaca materi kuliah Sistem Informasi Keperawatan"
            : "Regangkan bahu dan minum air"}
        </p>
        <div className="mx-auto mt-3 grid max-w-[345px] grid-cols-[58px_1fr_58px] items-center gap-4">
          <button
            className="grid size-[58px] place-items-center rounded-full bg-[#9dd4a6] text-[29px] hover:bg-[#8bc596] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]"
            onClick={() => {
              stopAlarmSound();
              alarmPlayed.current = false;
              setSeconds(defaults[mode]);
            }}
            aria-label="Ulangi"
          >
            <Icon icon={faRotateRight} />
          </button>
          <button
            className="flex min-h-[55px] items-center justify-center gap-3 rounded-full bg-[#087f6d] text-[20px] text-white hover:bg-[#076d5e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746]"
            onClick={() => {
              if (running) {
                setRunning(false);
                setPausedNotice(true);
              } else {
                prepareAlarmSound();
                setRunning(true);
              }
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
            className="grid size-[58px] place-items-center rounded-full bg-[#eaf5e7] text-[29px] hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]"
            onClick={() => {
              const next = mode === "focus" ? "short" : "focus";
              choose(next);
            }}
            aria-label="Lewati ke sesi berikutnya"
          >
            <Icon icon={faForwardStep} />
          </button>
        </div>
      </div>
      <div className="mt-6 md:col-start-2 md:row-start-2 md:mt-2">
        <div className="rounded-[11px] bg-[#f4faef] px-5 py-3">
          <div className="flex items-center justify-between"><b className="text-[16px] font-medium">SIKLUS HARI INI</b><div className="flex gap-2" aria-hidden="true">
            {[0, 1, 2, 3].map((n) => (
              <i
                key={n}
                className={`h-2 w-8 rounded-full !border !border-[#075746] ${n < (hasProgress ? 3 : 0) ? "bg-[#075746]" : "bg-[#9dd4a6]"}`}
              />
            ))}
          </div></div>
          <span className="mt-1 block text-[22px] font-semibold">{hasProgress ? "3 dari 4 selesai" : "0 dari 4 selesai"}</span>
        </div>
        <div className="mx-auto flex h-[55px] w-[235px] items-center justify-center overflow-hidden"><img className="h-[68px] w-[105px] object-contain" src="/assets/pic/pic-31.png" alt="" /></div>
        <div className="rounded-[11px] bg-[#f4faef] px-4 pb-3 pt-4">
          <div className="flex justify-between"><b className="text-[20px] font-medium">Fokus Hari Ini</b><span className="rounded-full bg-[#c8dfc1] px-3 py-1 text-[14px]">♨ {hasProgress ? "5 hari" : "0 hari"}</span></div>
          <div className="mt-4 grid grid-cols-3">
            {[[hasProgress ? "2j 10m" : "0m", "Waktu fokus"], [hasProgress ? "3" : "0", "Sesi selesai"], [hasProgress ? "80%" : "0%", "Target harian"]].map(([value, label]) => <strong className="text-[22px] leading-5" key={label}>{value}<small className="block text-[11px] font-normal text-[#138b78]">{label}</small></strong>)}
          </div>
          <div className="mt-3 h-[7px] overflow-hidden rounded-full bg-[#9dd4a6]"><i className="block h-full bg-[#087f6d]" style={{ width: hasProgress ? "80%" : "1%" }} /></div>
        </div>
      </div>
      {pausedNotice && (
        <Notice onClose={() => setPausedNotice(false)}>Sesi {mode === "focus" ? "belajar" : "istirahat"} telah dijeda</Notice>
      )}
    </section>
  );
}
function Mood({ go, user, persist }) {
  const { first, rest } = splitName(user?.name);
  const [mood, setMood] = useState("Happy");
  const [sleep, setSleep] = useState(7);
  const [stress, setStress] = useState(20);
  const [influences, setInfluences] = useState("");
  const [result, setResult] = useState(false);
  const moodNote =
    stress >= 70 || ["Stressed", "Angry"].includes(mood)
      ? "Hari ini terasa berat. Tarik napas, kecilkan langkahmu, dan beri dirimu jeda. Kamu tidak harus menyelesaikan semuanya sekaligus."
      : mood === "Sad"
        ? "Sedih itu wajar. Beri dirimu waktu, lalu ceritakan pada orang yang kamu percaya jika rasanya terlalu penuh."
        : "Hari ini cukup baik. Pertahankan ritme istirahat dan kegiatan yang membuatmu merasa tenang.";
  if (result)
    return (
      <section className="relative min-h-[calc(100svh-74px)] overflow-hidden bg-[#e6f3e4] px-4 pb-8 pt-4 font-['Poppins'] text-[#174d3f] md:min-h-screen md:px-8 md:py-8">
        <img src="/assets/pic/pic-62.png" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1080px] flex-col lg:min-h-[calc(100svh-4rem)]">
          <button className="flex min-h-11 w-full cursor-pointer items-center gap-3 text-left text-xl font-semibold hover:text-[#087460] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] md:text-2xl" onClick={() => setResult(false)}>
            <Icon icon={faArrowLeft} aria-hidden="true" /> Hasil mood tracker
          </button>
          <div className="mt-4 grid gap-5 xl:flex-1 xl:content-center xl:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] xl:items-start xl:gap-8">
            <div className="grid gap-5">
              <div className="flex min-h-[128px] w-full items-center justify-center gap-3 rounded-[28px] bg-[#d5e4c8]/90 px-5 md:min-h-[150px]">
                <img src="/assets/pic/pic-31.png" alt="" className="w-[95px] object-contain md:w-[130px]" />
                <b className="text-2xl leading-[1.55] md:text-[32px]">
                  Mood
                  <br />
                  Tracker
                </b>
              </div>
              <article className="relative rounded-[18px] bg-[#fffdf6] px-5 pb-5 pt-8 shadow-[0_3px_8px_rgba(36,58,48,0.25)] md:px-8">
                <h2 className="absolute -top-6 left-1/2 m-0 w-[220px] -translate-x-1/2 rounded-[22px] bg-[#91b779] py-2 text-center text-[17px] text-white md:w-[300px] md:text-xl">Your mood today</h2>
                {[
                  { key: "mood", image: moodImages[mood], value: mood },
                  { key: "sleep", icon: faBed, value: `${sleep} jam` },
                  {
                    key: "stress",
                    icon: faBrain,
                    value: stress < 35 ? "Rendah" : stress < 70 ? "Sedang" : "Tinggi",
                  },
                ].map(({ key, image, icon, value }) => (
                  <p key={key} className="m-0 grid min-h-[52px] grid-cols-[54px_24px_1fr] items-center text-lg md:text-xl">
                    {image ? (
                      <img src={image} alt="" width="54" height="54" className="size-[42px] object-contain" />
                    ) : (
                      <Icon icon={icon} aria-hidden="true" className="text-[34px] text-[#087460]" />
                    )}{" "}
                    <span>:</span> <b>{value}</b>
                  </p>
                ))}
              </article>
            </div>
            <div className="grid gap-5">
              <article className="relative rounded-[22px] bg-[#fffdf6] px-5 pb-6 pt-9 shadow-[0_3px_8px_rgba(36,58,48,0.25)] md:px-8">
                <h2 className="absolute -top-5 left-1/2 m-0 w-[240px] -translate-x-1/2 rounded-[24px] bg-[#91b779] py-2 text-center text-xl text-white md:w-[320px]">Catatan untukmu</h2>
                <p className="m-0 text-justify text-[15px] font-semibold leading-[1.6] md:text-lg">
                  {moodNote}
                </p>
              </article>
              <button className="min-h-12 w-full cursor-pointer rounded-[18px] bg-[#07816d] px-5 text-base font-semibold text-white transition-colors hover:bg-[#075f50] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746] md:min-h-[50px] md:text-lg" onClick={() => go("screening")}>
                Lanjut ke skrining stress
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  return (
    <section className="relative min-h-[calc(100svh-74px)] overflow-hidden bg-[#e6f3e4] px-3 pb-6 pt-4 font-['Poppins'] text-[#174d3f] md:min-h-screen lg:px-10 lg:py-8">
      <img src="/assets/pic/pic-62.png" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45" />
      <div className="relative z-10 mx-auto w-full max-w-[1120px] lg:flex lg:min-h-[calc(100svh-4rem)] lg:flex-col">
        <button className="flex min-h-11 items-center gap-3 px-1 text-xl font-semibold hover:text-[#087460] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] md:text-2xl" onClick={() => go("home")}>
          <Icon icon={faArrowLeft} aria-hidden="true" /> Mood Tracker
        </button>
        <div className="mt-2 grid gap-4 xl:mt-5 xl:flex-1 xl:content-center xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] xl:items-start xl:gap-6">
          <div className="grid gap-3">
            <div className="text-center">
              <img className="mx-auto w-[110px] object-contain md:w-[150px]" src="/assets/pic/pic-26.png" alt="" />
              <p className="mx-auto mt-1 w-full max-w-[390px] rounded-[32px] bg-[#b8d2aa]/80 px-5 py-3 text-[14px] leading-[1.4] md:text-lg">
                Hai, {first}
                <br />
                {rest}
                <br />
                <b>Yuk, cek mood kamu hari ini!</b>
              </p>
            </div>
            <div className="relative rounded-[24px] bg-[#fffdf6] pb-4 pt-10 shadow-[0_4px_14px_rgba(36,58,48,0.10)] md:px-3 lg:px-4">
              <h2 className="absolute left-0 top-0 m-0 w-[150px] rounded-[20px] bg-[#91b779] py-1 text-center text-[17px] font-medium text-white">Mood</h2>
              <div className="grid grid-cols-5 gap-0.5 px-2 md:gap-2 lg:px-3">
                {moodOptions.map(([m, image]) => (
                  <button
                    key={m}
                    aria-label={m}
                    aria-pressed={mood === m}
                    className={`flex min-w-0 cursor-pointer flex-col items-center gap-0.5 rounded-xl py-1 text-[10px] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#087460] md:gap-1 md:text-sm ${mood === m ? "bg-[#dcebd2]" : ""}`}
                    onClick={() => setMood(m)}
                  >
                    <span className="grid size-[42px] place-items-center overflow-hidden rounded-full md:size-[48px]"><img src={image} alt="" width="48" height="48" className="size-full object-contain" /></span>
                    <span className="max-w-full truncate">{m === "Stressed" ? "Stress" : m}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <label className="grid min-h-[100px] grid-cols-[48px_1fr] items-center rounded-[14px] border border-[#718779] bg-[#fffdf6] px-3 py-3 shadow-[0_2px_5px_rgba(36,58,48,0.25)] lg:min-h-[120px] lg:p-5">
                <Icon icon={faBed} aria-hidden="true" className="text-[38px] text-[#087460]" />
                <span className="text-center text-[13px] font-semibold md:text-lg">Kualitas<br />tidur</span>
                <input
                  type="number"
                  min="1"
                  max="12"
                  value={sleep}
                  onChange={(e) => setSleep(e.target.value)}
                  placeholder="Ketik disini jam tidur"
                  aria-label="Kualitas tidur dalam jam"
                  className="col-span-2 mt-2 h-9 rounded-[18px] border-0 bg-[#cedebf] px-3 text-[11px] outline-none focus-visible:ring-2 focus-visible:ring-[#087460] md:h-10 md:text-sm"
                />
              </label>
              <label className="grid min-h-[100px] grid-cols-[48px_1fr] items-center rounded-[14px] border border-[#718779] bg-[#fffdf6] px-3 py-3 shadow-[0_2px_5px_rgba(36,58,48,0.25)] lg:min-h-[120px] lg:p-5">
                <Icon icon={faBrain} aria-hidden="true" className="text-[38px] text-[#087460]" />
                <span className="text-center text-[12px] font-semibold md:text-lg">Tingkat beban<br />mental/stres</span>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={stress}
                  onChange={(e) => setStress(e.target.value)}
                  placeholder="Ketik disini berapa %"
                  aria-label="Tingkat beban mental atau stres dalam persen"
                  className="col-span-2 mt-2 h-9 rounded-[18px] border-0 bg-[#cedebf] px-3 text-[11px] outline-none focus-visible:ring-2 focus-visible:ring-[#087460] md:h-10 md:text-sm"
                />
              </label>
            </div>
            <label className="grid grid-cols-[56px_1fr] items-center gap-2 rounded-[18px] border border-[#718779] bg-[#fffdf6] px-4 py-4 shadow-[0_3px_8px_rgba(36,58,48,0.25)] lg:p-6">
              <Icon icon={faListCheck} aria-hidden="true" className="text-[52px] text-[#087460] lg:text-[64px]" />
              <span className="text-center text-[17px] font-semibold md:text-[22px]">Faktor pengaruh<br />mood</span>
              <textarea
                placeholder="Ceritakan apa yang memengaruhi mood-mu"
                aria-label="Faktor pengaruh mood"
                value={influences}
                onChange={(event) => setInfluences(event.target.value)}
                className="col-span-2 mt-2 min-h-[86px] resize-y rounded-[18px] border-0 bg-[#cedebf] px-4 py-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[#087460] md:min-h-[110px] md:text-base"
              />
            </label>
            <button
              className="min-h-12 w-full cursor-pointer rounded-[18px] bg-[#07816d] px-5 text-base font-semibold text-white transition-colors hover:bg-[#075f50] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746] md:text-lg"
              onClick={() => {
                persist?.({ mood, sleep, stress, influences }).catch(() => {});
                setResult(true);
              }}
            >
              Lihat hasil mood
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
function Screening({ go, user, persist }) {
  const { first, rest } = splitName(user?.name);
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
  const ScreeningTitle = ({ label }) => (
    <button
      className="inline-flex min-h-11 items-center gap-5 text-left text-[23px] font-bold text-[#164d35] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087460] md:text-[28px]"
      onClick={() => (label === "Hasil skrining" ? go("mood") : setStep(-1))}
    >
      <Icon icon={faArrowLeft} className="text-[27px] text-[#75a984]" />
      {label}
    </button>
  );
  if (step === -1)
    return (
      <section className="mx-auto min-h-[calc(100dvh-69px)] w-full max-w-[1120px] bg-[#d3edda] px-5 pb-14 pt-2 text-[#174f38] md:min-h-screen md:px-12 md:py-9">
        <ScreeningTitle label="Skrining stress" />
        <div className="mx-auto mt-4 grid max-w-[960px] items-center md:mt-12 md:grid-cols-[0.8fr_1.2fr] md:gap-16">
          <div className="text-center">
            <img className="mx-auto w-[110px] md:w-[240px]" src="/assets/pic/pic-30.png" alt="Maskot ReMind" />
            <p className="mt-1 text-[16px] font-semibold leading-[21px] md:text-[24px] md:leading-8">
          Hai, {first}
          <br />
          {rest}
          <br />
              <b className="text-[#075746]">Yuk, cek kondisi mentalmu!</b>
            </p>
          </div>
          <article className="mx-auto mt-3 w-full max-w-[320px] rounded-[43px] bg-[#3d7359] px-7 pb-[42px] pt-[42px] text-white md:mt-0 md:max-w-[510px] md:px-12 md:py-12">
            <h2 className="flex items-center gap-3 text-[16px] font-bold leading-6 [text-shadow:0_2px_2px_rgba(0,0,0,.25)] md:text-[22px]">
              <Icon icon={faListCheck} className="text-[44px]" />
              Skrining kesehatan mental menggunakan PHQ-4
            </h2>
            <p className="mt-5 text-[15px] font-medium leading-[22px] md:text-lg">
              Jawab berdasarkan apa yang kamu rasakan selama 2 minggu terakhir.
            </p>
            <div className="mt-5 flex min-h-[138px] items-start gap-2 bg-[#f4faef] px-2 py-3 text-justify text-[16px] font-semibold leading-6 text-[#174f38] md:min-h-0 md:p-5 md:text-lg">
              <Icon icon={faCircleCheck} className="mt-0.5 shrink-0 text-[30px] text-[#138b78]" />
              <span>PHQ-4 terdiri dari 4 pertanyaan singkat mengenai gejala depresi dan kecemasan.</span>
            </div>
            <button className="mt-11 flex min-h-[45px] w-full items-center justify-center gap-5 rounded-full bg-[#138b78] text-[24px] font-bold text-white shadow-[6px_7px_0_#9abb70] hover:bg-[#087460] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white md:mt-8" onClick={() => setStep(0)}>
              Mulai <Icon icon={faChevronRight} />
            </button>
          </article>
        </div>
      </section>
    );
  if (step === 4) {
    const dep = ans[0] + ans[1],
      anx = ans[2] + ans[3];
    return (
      <section className="mx-auto min-h-[calc(100dvh-69px)] w-full max-w-[1120px] bg-[#d3edda] px-6 pb-14 pt-2 text-[#174f38] md:min-h-screen md:px-12 md:py-9">
        <ScreeningTitle label="Hasil skrining" />
        <img className="mx-auto mt-5 w-[128px] md:mt-0 md:w-[180px]" src="/assets/pic/pic-30.png" alt="Maskot ReMind" />
        <h1 className="-mt-1 text-center text-[28px] font-bold text-[#075746] md:text-4xl">Hasil skrining</h1>
        <div className="mx-auto mt-9 grid max-w-[340px] grid-cols-2 gap-6 md:max-w-[620px] md:gap-10">
          <article className="flex min-h-[158px] flex-col items-center justify-center rounded-[38px] bg-[#f4faef] text-center">
            <img src="/assets/mood-sad-circle.png" alt="" aria-hidden="true" width="47" height="47" className="size-[47px] object-contain" />
            <span className="mt-1 text-[15px] leading-5">
              Depresi
              <br />
              PHQ-2
            </span>
            <b className="mt-1 rounded-xl bg-[#d7f1ef] px-4 text-[37px] leading-[48px] text-[#087f6d]">{dep}/6</b>
          </article>
          <article className="flex min-h-[158px] flex-col items-center justify-center rounded-[38px] bg-[#e2c3ef] text-center">
            <Icon icon={faBrain} className="text-[47px] text-[#d46fb8]" aria-hidden="true" />
            <span className="mt-1 text-[15px] leading-5">
              Kecemasan
              <br />
              GAD-2
            </span>
            <b className="mt-1 rounded-xl bg-[#e58ae8] px-4 text-[37px] leading-[48px] text-[#087f6d]">{anx}/6</b>
          </article>
        </div>
        <p className="mx-auto mt-6 flex max-w-[590px] items-start gap-3 rounded-[27px] bg-[#f4faef] px-3 py-4 text-justify text-[12px] font-medium leading-[15px] md:px-6 md:text-base md:leading-6">
          <Icon icon={faCircleCheck} className="mt-0.5 shrink-0 text-[16px] text-[#138b78]" />
          <span>Penting untuk diketahui hasil ini merupakan skrining awal dan bukan diagnosis. Jika hasil skrining membuatmu khawatir atau kamu merasa kondisi ini mengganggu aktivitas sehari-hari, pertimbangkan untuk berbicara dengan tenaga kesehatan atau orang yang kamu percaya.</span>
        </p>
        <button className="mx-auto mt-5 flex min-h-[47px] w-full max-w-[230px] items-center justify-center gap-2 rounded-full bg-[#2f7d66] text-[17px] font-bold text-white hover:bg-[#286b57] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087460] md:max-w-[300px] md:text-xl" onClick={() => go("home")}>
          <Icon icon={faHouse} /> Kembali ke beranda
        </button>
      </section>
    );
  }
  return (
    <section className="mx-auto min-h-[calc(100dvh-69px)] w-full max-w-[1120px] bg-[#d3edda] px-6 pb-8 pt-2 text-[#174f38] md:min-h-screen md:px-12 md:py-9">
      {step > 0 && <ScreeningTitle label="Skrining stress" />}
      <div className={`mx-auto flex max-w-[300px] items-center gap-3 md:max-w-[520px] ${step === 0 ? "mt-[76px]" : "mt-[43px] md:mt-8"}`}>
        <b className="shrink-0 text-[24px] md:text-[28px]">{step + 1}/4</b>
        <span className="h-[27px] flex-1 rounded-full border-2 border-[#8dbb99] p-[3px]">
          <i className="block h-full rounded-full bg-[#76a985] transition-[width]" style={{ width: `${(step + 1) * 25}%` }} />
        </span>
      </div>
      <img className="mx-auto -mt-3 w-[130px] md:mt-1 md:w-[180px]" src="/assets/pic/pic-30.png" alt="Maskot ReMind" />
      <article className="mx-auto mt-6 w-full max-w-[324px] rounded-[27px] bg-[#f4faef] px-[15px] pb-[18px] pt-[15px] md:max-w-[620px] md:px-8 md:py-7">
        <p className="text-[16px] font-semibold leading-6 text-[#07816d] md:text-xl md:leading-8">
          Selama 2 minggu terakhir, seberapa sering kamu mengalami masalah
          berikut? <b className="font-semibold">{qs[step]}</b>
        </p>
        <div className="mt-5 space-y-[22px] md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
          {opts.map((o, i) => (
            <button
              className={`flex min-h-[50px] w-full items-center rounded-full !border-[4px] px-3 text-left text-[17px] font-medium leading-5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#087460] ${selected === i ? "!border-[#087f6d] bg-[#d9ebd2]" : "!border-[#9aaa7c] bg-transparent hover:bg-[#e6efdf]"}`}
              key={o}
              onClick={() => setSelected(i)}
            >
              <i className={`mr-1 h-4 w-4 shrink-0 rounded-full !border !border-[#62a17f] ${selected === i ? "bg-[#087f6d] shadow-[inset_0_0_0_3px_#f4faef]" : ""}`} />
              {o}
            </button>
          ))}
        </div>
        <button
          className="mx-auto mt-[37px] flex min-h-[47px] w-[230px] items-center justify-center gap-5 rounded-full bg-[#2f7d66] text-[19px] font-bold text-white enabled:hover:bg-[#286b57] disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087460] md:mt-8"
          disabled={selected === null}
          onClick={() => {
            const nextAnswers = [...ans, selected];
            setAns(nextAnswers);
            if (step === 3) persist?.(nextAnswers).catch(() => {});
            setSelected(null);
            setStep(step + 1);
          }}
        >
          {step === 3 ? "Lihat hasil" : "Lanjut"} <Icon icon={faChevronRight} />
        </button>
      </article>
    </section>
  );
}
function SosMap() {
  return (
    <div className="relative z-10 mx-auto my-4 w-[78%] overflow-hidden rounded-[10px] border-[5px] border-white bg-[#e8e2d9] shadow-sm md:w-[min(100%,480px)]">
      <svg
        viewBox="0 0 320 180"
        role="img"
        aria-label="Peta perjalanan ambulans menuju lokasi"
        className="block h-auto w-full"
      >
        <rect width="320" height="180" fill="#e9e3da" />
        <path d="M0 22 L110 22 L150 70 L150 180 L0 180 Z" fill="#d8e5c9" />
        <path d="M250 0 L320 0 L320 70 L280 95 L250 70 Z" fill="#d8e5c9" />
        <path d="M0 126 C55 118 84 142 126 153 C170 164 210 151 242 132 L320 124 L320 180 L0 180 Z" fill="#c6dcc0" />
        <path d="M-10 155 C50 138 102 168 160 166 C222 164 258 141 330 150" fill="none" stroke="#a8cfe8" strokeWidth="16" />
        <g fill="none" stroke="#ffffff" strokeLinecap="round">
          <path d="M-10 58 L110 58 L168 116 L330 116" strokeWidth="12" />
          <path d="M260 -10 L260 76 L232 108 L232 190" strokeWidth="11" />
          <path d="M-10 102 L80 102 L126 58" strokeWidth="9" />
          <path d="M320 36 L280 36 L232 84" strokeWidth="9" />
        </g>
        <g fill="none" stroke="#f4efe6" strokeWidth="3">
          <path d="M-10 58 L110 58 L168 116 L330 116" />
          <path d="M260 -10 L260 76 L232 108 L232 190" />
        </g>
        <path d="M126 94 L160 88 L186 104 L212 72 L238 58" fill="none" stroke="#d64b45" strokeWidth="3" strokeDasharray="5 4" />
        <image
          href="/assets/pic/ambulance-map.svg"
          x="146"
          y="58"
          width="88"
          height="66"
          aria-hidden="true"
        />
        <g transform="translate(230 52)">
          <path d="M0 0 C-9 0 -16 7 -16 16 C-16 28 0 42 0 42 C0 42 16 28 16 16 C16 7 9 0 0 0 Z" fill="#c72c2c" />
          <circle cx="0" cy="16" r="5.5" fill="#ffffff" />
        </g>
        <g fill="#95b58c">
          <circle cx="48" cy="40" r="7" />
          <circle cx="62" cy="48" r="5" />
          <circle cx="278" cy="150" r="8" />
          <circle cx="294" cy="142" r="5" />
        </g>
      </svg>
      <span className="absolute bottom-2 left-3 rounded bg-white px-1.5 py-0.5 text-[10px] font-bold text-[#174d3f]">
        AMBULANS
      </span>
    </div>
  );
}
function CallDialog({ target, close }) {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, []);
  useEffect(() => {
    const escape = (event) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [close]);
  const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  return (
    <div className="fixed inset-0 z-[120] flex flex-col items-center justify-between overflow-hidden bg-[linear-gradient(165deg,#075746,#0f8a73)] px-6 pb-10 pt-8 text-center font-['Poppins'] text-white">
      <div>
        <p className="m-0 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/65">
          Panggilan darurat · simulasi
        </p>
        <div className="relative mx-auto mt-10 grid size-[118px] place-items-center">
          <span
            aria-hidden="true"
            className="absolute inset-0 animate-ping rounded-full bg-white/15"
          />
          <span
            aria-hidden="true"
            className="absolute inset-2 rounded-full bg-white/10"
          />
          <span className="relative grid size-[88px] place-items-center overflow-hidden rounded-full border-4 border-white bg-[#2f7d66] text-4xl">
            <Icon icon={faUser} aria-hidden="true" />
          </span>
        </div>
        <h1 className="mb-1 mt-7 text-2xl font-semibold">{target.name}</h1>
        <p className="m-0 text-sm text-white/80">{target.phone}</p>
        <p className="mt-4 text-sm font-medium text-white/90" role="status" aria-live="polite">
          Memanggil · {time}
        </p>
      </div>
      <div className="w-full max-w-[360px]">
        <p className="mx-auto mb-5 max-w-[300px] text-xs leading-5 text-white/65">
          Ini hanya tampilan simulasi. Panggilan tidak benar-benar tersambung ke layanan darurat.
        </p>
        <button
          type="button"
          onClick={close}
          aria-label="Akhiri panggilan"
          className="mx-auto grid size-16 cursor-pointer place-items-center rounded-full bg-[#e45d68] text-2xl text-white shadow-[0_10px_25px_#00000033] transition-colors hover:bg-[#cf4a55] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
          <Icon icon={faPhoneSlash} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={close}
          className="mx-auto mt-3 block min-h-11 px-4 text-sm font-semibold text-white/80 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
function SOS({ go, contacts = [], tasks = [] }) {
  const [stage, setStage] = useState("home");
  const [seconds, setSeconds] = useState(272);
  const [contactQuery, setContactQuery] = useState("");
  const [callTarget, setCallTarget] = useState(null);
  const [breathing, setBreathing] = useState(false);
  const [breathTick, setBreathTick] = useState(0);
  useEffect(() => {
    if (stage !== "active" || seconds <= 0) return;
    const timer = setInterval(() => setSeconds((value) => value - 1), 1000);
    return () => clearInterval(timer);
  }, [stage, seconds]);
  useEffect(() => {
    if (!breathing) return;
    const timer = setInterval(() => setBreathTick((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, [breathing]);
  useEffect(() => {
    if (stage !== "sent") return;
    const escape = (event) => {
      if (event.key === "Escape") setStage("choice");
    };
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [stage]);
  const back = () => {
    if (stage === "home") go("home");
    else if (["choice", "sent"].includes(stage)) setStage("home");
    else if (["detail", "contacts"].includes(stage)) setStage("active");
    else setStage("choice");
  };
  const phase = breathTick % 19;
  const breathState =
    phase < 4
      ? ["Tarik napas", 4 - phase]
      : phase < 11
        ? ["Tahan napas", 11 - phase]
        : ["Hembuskan napas", 19 - phase];
  const pageClass =
    "relative min-h-[calc(100dvh-74px)] overflow-hidden bg-[#d9efdf] px-[15px] pb-[86px] pt-2.5 font-['Poppins'] text-[#174d3f] lg:min-h-screen lg:px-16 lg:pb-14 lg:pt-9";
  const callDialog = callTarget ? (
    <CallDialog target={callTarget} close={() => setCallTarget(null)} />
  ) : null;
  const top = (title = "") => (
    <div className="relative z-10 mx-auto grid min-h-11 w-full max-w-[1080px] grid-cols-[44px_1fr_44px] items-center gap-2">
      <button
        type="button"
        onClick={back}
        aria-label="Kembali"
        className="grid size-11 cursor-pointer place-items-center rounded-full text-xl text-[#619781] transition-colors hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]"
      >
        <Icon icon={faArrowLeft} aria-hidden="true" />
      </button>
      {title && <h1 className="m-0 text-center text-base font-semibold md:text-2xl">{title}</h1>}
      <NotificationBell tasks={tasks} go={go} variant="ghost" className="justify-self-end" />
    </div>
  );
  if (stage === "breathing")
    return (
      <section className={`${pageClass} text-center`}>
        <img
          src="/assets/pic/pic-62.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
        />
        {top("Teknik pernapasan")}
        <p className="relative z-10 mx-auto mt-2 max-w-[320px] text-sm leading-6">
          Tarik napas pelan-pelan
          <br />
          agar pikiran juga ikut tenang
        </p>
        <img
          src="/assets/pic/pic-42.png"
          alt=""
          aria-hidden="true"
          className="relative z-10 mx-auto my-2 h-[118px] w-[150px] object-contain md:h-[135px] md:w-[170px]"
        />
        <article className="relative z-10 mx-auto mt-2 w-full max-w-[760px] rounded-[18px] bg-[#c7d9b6] px-3 py-4 text-left md:rounded-3xl md:p-6">
          <h2 className="m-0 text-sm font-semibold md:text-lg">Pernapasan 4-7-8</h2>
          <p className="mb-6 mt-0.5 text-xs leading-5 md:text-sm">
            Teknik sederhana untuk menenangkan pikiran dan tubuh
          </p>
          <div className="grid grid-cols-3 gap-1 md:gap-3">
            {[
              [faWind, "4 detik", "Tarik napas"],
              [faPause, "7 detik", "Tahan napas"],
              [faHeartPulse, "8 detik", "Hembuskan napas"],
            ].map(([icon, time, label]) => (
              <span
                key={time}
                className="flex min-h-[100px] flex-col items-center justify-center rounded-[15px] bg-[#fffdf6] px-1 py-3 text-center md:min-h-[130px] md:rounded-[18px]"
              >
                <Icon icon={icon} aria-hidden="true" className="text-2xl text-[#668c6a]" />
                <b className="mt-2 text-sm md:text-base">{time}</b>
                <small className="text-[11px] md:text-xs">{label}</small>
              </span>
            ))}
          </div>
          {breathing && (
            <p
              className="mt-4 rounded-xl bg-white/70 px-4 py-3 text-center text-sm font-semibold text-[#275a45]"
              role="status"
              aria-live="polite"
            >
              {breathState[0]} · {breathState[1]} detik
            </p>
          )}
        </article>
        <button
          type="button"
          onClick={() => {
            setBreathTick(0);
            setBreathing((value) => !value);
          }}
          className="relative z-10 mt-[70px] min-h-11 w-full max-w-[760px] cursor-pointer rounded-full bg-[#98b877] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#86a768] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746] md:mt-7 md:text-base"
        >
          {breathing ? "Hentikan latihan" : "Mulai sekarang"}
        </button>
      </section>
    );
  if (stage === "emotional")
    return (
      <section className={`${pageClass} text-center`}>
        <img
          src="/assets/pic/pic-62.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
        />
        {top("Dukungan Emosional")}
        <img
          src="/assets/pic/pic-31.png"
          alt=""
          aria-hidden="true"
          className="relative z-10 mx-auto mb-4 mt-4 h-[110px] w-[130px] object-contain md:mb-3 md:h-[125px] md:w-[150px]"
        />
        <h2 className="relative z-10 mx-auto mt-1 max-w-[420px] text-[22px] font-semibold leading-[1.1] md:text-[32px]">
          Kamu tidak sendirian,
          <br />
          ada yang mendengarkan.
        </h2>
        <p className="relative z-10 mx-auto mt-3 max-w-[330px] text-[13px] leading-[1.5] md:text-sm">
          Jika kamu merasa cemas, sedih,
          <br />
          atau tertekan, kamu bisa langsung
          <br />
          terhubung dengan konselor kami.
        </p>
        <button
          type="button"
          onClick={() =>
            setCallTarget({ name: "Konselor ReMind", phone: "119" })
          }
          className="relative z-10 mx-auto mt-6 flex min-h-[46px] w-full max-w-[430px] cursor-pointer items-center justify-center gap-2.5 rounded-full bg-[#2f7d66] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#286b57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746] md:mt-7"
        >
          <Icon icon={faPhone} aria-hidden="true" /> Hubungi Konselor
        </button>
        <b className="relative z-10 mt-3 block text-xs font-semibold md:text-sm">
          Tersedia 24 jam
        </b>
        {callDialog}
      </section>
    );
  if (stage === "contacts")
    return (
      <section className={pageClass}>
        <img
          src="/assets/pic/pic-62.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
        />
        {top("Kontak darurat")}
        <label className="relative z-10 mx-auto mt-4 flex min-h-11 w-full max-w-[760px] items-center gap-2 rounded-lg bg-[#fffdf6] px-3 py-1 text-[#174d3f]">
          <Icon icon={faMagnifyingGlass} aria-hidden="true" className="text-[#5f927f]" />
          <input
            aria-label="Cari kontak"
            placeholder="Cari kontak"
            value={contactQuery}
            onChange={(event) => setContactQuery(event.target.value)}
            className="min-h-9 min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#6f8d83]"
          />
          <button
            type="button"
            onClick={() => go("contacts")}
            aria-label="Tambah kontak darurat"
            className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-[#2f7d66] text-sm text-white transition-colors hover:bg-[#286b57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746]"
          >
            <Icon icon={faPlus} aria-hidden="true" />
          </button>
        </label>
        <h2 className="relative z-10 mx-auto mt-4 w-full max-w-[760px] text-xs font-bold uppercase tracking-wide md:text-sm">
          Kontak utama
        </h2>
        {contacts.length === 0 && (
          <p className="relative z-10 mx-auto mt-3 max-w-[760px] rounded-[13px] bg-[#fffdf6] px-4 py-4 text-sm">
            Belum ada kontak darurat. Tambahkan dari halaman Kelola Profil.
          </p>
        )}
        {contacts.length > 0 &&
          contacts
            .filter((contact) =>
              `${contact.name} ${contact.phone}`
                .toLowerCase()
                .includes(contactQuery.toLowerCase()),
            )
            .map((contact) => (
          <article
            key={contact.id || contact.phone}
            className="relative z-10 mx-auto mt-2.5 grid w-full max-w-[760px] grid-cols-[40px_1fr_44px] items-center gap-2 rounded-[13px] bg-[#fffdf6] px-3 py-2.5 md:mt-3.5 md:gap-3 md:rounded-[18px] md:p-[18px]"
          >
            <Icon
              icon={faUser}
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-full bg-[#2f7d66] p-2 text-sm text-white md:size-10"
            />
            <span className="grid min-w-0">
              <b className="truncate text-sm md:text-base">{contact.name}</b>
              <small className="truncate text-xs text-[#4f6b60]">{contact.phone}</small>
            </span>
            <button
              type="button"
              onClick={() =>
                setCallTarget({ name: contact.name, phone: contact.phone })
              }
              aria-label={`Hubungi ${contact.name}`}
              className="grid size-11 cursor-pointer place-items-center rounded-full bg-[#2f7d66] text-sm text-white transition-colors hover:bg-[#286b57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746]"
            >
              <Icon icon={faPhone} aria-hidden="true" />
            </button>
          </article>
        ))}
        {contacts.length > 0 &&
          !contacts.some((contact) =>
            `${contact.name} ${contact.phone}`
              .toLowerCase()
              .includes(contactQuery.toLowerCase()),
          ) && (
            <p className="relative z-10 mx-auto mt-3 max-w-[760px] rounded-[13px] bg-[#fffdf6] px-4 py-4 text-sm">
              Kontak tidak ditemukan. Coba kata kunci lain.
            </p>
          )}
        {callDialog}
      </section>
    );
  if (stage === "detail")
    return (
      <section className={`${pageClass} md:px-8`}>
        <img
          src="/assets/pic/pic-62.png"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
        />
        {top("Detail SOS")}
        <article className="relative z-10 mx-auto mt-3 grid w-full max-w-[760px] grid-cols-[40px_1fr] items-center gap-2 rounded-[14px] bg-[#fffdf6] p-3 text-left md:mt-3.5 md:grid-cols-[46px_1fr] md:gap-3 md:rounded-[18px] md:p-[18px]">
          <Icon icon={faLocationDot} aria-hidden="true" className="text-2xl text-[#58a58c]" />
          <span className="grid">
            <b className="text-sm md:text-base">Dalam perjalanan</b>
            <small className="text-xs text-[#4f6b60]">
              Tim bantuan sedang dalam perjalanan
            </small>
          </span>
        </article>
        <SosMap />
        <article className="relative z-10 mx-auto mt-3 grid w-full max-w-[760px] grid-cols-[40px_1fr_44px] items-center gap-2 rounded-[14px] bg-[#fffdf6] p-3 text-left md:mt-3.5 md:grid-cols-[46px_1fr_auto] md:gap-3 md:rounded-[18px] md:p-[18px]">
          <Icon icon={faHeartPulse} aria-hidden="true" className="text-2xl text-[#58a58c]" />
          <span className="grid min-w-0">
            <b className="text-sm md:text-base">Tim medis</b>
            <small className="text-xs text-[#4f6b60]">Ambulans RS Umum</small>
          </span>
          <button
            type="button"
            onClick={() =>
              setCallTarget({ name: "Tim medis", phone: "119" })
            }
            aria-label="Hubungi tim medis"
            className="grid size-11 cursor-pointer place-items-center rounded-full bg-[#2f7d66] text-sm text-white transition-colors hover:bg-[#286b57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746]"
          >
            <Icon icon={faPhone} aria-hidden="true" />
          </button>
        </article>
        <article className="relative z-10 mx-auto mt-3 grid w-full max-w-[760px] grid-cols-[40px_1fr] items-center gap-2 rounded-[14px] bg-[#fffdf6] p-3 text-left md:mt-3.5 md:grid-cols-[46px_1fr] md:gap-3 md:rounded-[18px] md:p-[18px]">
          <Icon icon={faLocationDot} aria-hidden="true" className="text-2xl text-[#58a58c]" />
          <span className="grid">
            <b className="text-sm md:text-base">Lokasimu saat ini:</b>
            <small className="text-xs leading-5 text-[#4f6b60]">
              Jl. Srijaya Negara No.21, Palembang
              <br />
              -2.9731, 104.7556
            </small>
          </span>
        </article>
        <article className="relative z-10 mx-auto mt-3 grid w-full max-w-[760px] grid-cols-[40px_1fr] items-center gap-3 rounded-[14px] bg-[#dff3e6] p-3 text-left md:mt-3.5 md:grid-cols-[46px_1fr] md:gap-3 md:rounded-[18px] md:p-[18px]">
          <img src="/assets/pic/pic-38.png" alt="" aria-hidden="true" className="size-9 object-contain md:size-10" />
          <span className="grid">
            <b className="text-sm md:text-base">Hold on Tight.</b>
            <small className="text-xs text-[#4f6b60]">
              Kami sedang dalam perjalanan menuju kamu &lt;3
            </small>
          </span>
        </article>
        {callDialog}
      </section>
    );
  if (stage === "active") {
    const time = `${String(Math.floor(seconds / 60)).padStart(2, "0")}.${String(seconds % 60).padStart(2, "0")}`;
    return (
      <section
        className={`${pageClass} bg-[radial-gradient(circle_at_50%_30%,#effff1_0%,#8ed4af_48%,#1a815c_100%)] text-center`}
      >
        {top()}
        <strong className="relative z-10 mt-1 inline-block rounded-lg bg-[#ff8d86] px-5 py-1.5 text-xs font-semibold text-white md:text-sm">
          SOS Aktif!
        </strong>
        <p className="relative z-10 mx-auto mt-2 max-w-[320px] text-[13px] leading-6 md:text-sm">
          Tim bantuan sedang dalam
          <br />
          perjalanan menuju ke lokasimu
        </p>
        <button
          type="button"
          onClick={() => setStage("detail")}
          className="relative z-10 mx-auto my-4 flex size-[145px] cursor-pointer flex-col items-center justify-center rounded-full border-[12px] border-white bg-[conic-gradient(#428c76_0deg_30deg,#fff_30deg)] text-[#559a86] shadow-[0_5px_15px_#315b4f4a] transition-transform hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#075746] md:my-5 md:size-[180px] md:border-[14px] md:bg-[#fafff8]"
        >
          <b className="text-[27px] leading-none md:text-[34px]">{time}</b>
          <small className="mt-1 text-[11px] md:text-xs">Sisa waktu</small>
        </button>
        <article className="relative z-10 mx-auto grid w-full max-w-[760px] grid-cols-[38px_1fr] items-center gap-2 rounded-[14px] bg-[#fffdf6] p-3 text-left md:grid-cols-[46px_1fr] md:gap-3 md:rounded-[18px] md:p-[18px]">
          <Icon icon={faLocationDot} aria-hidden="true" className="text-2xl text-[#58a58c]" />
          <span className="grid">
            <b className="text-sm md:text-base">Lokasimu saat ini:</b>
            <small className="text-xs leading-5 text-[#4f6b60]">
              Jl. Srijaya Negara No.21, Palembang
              <br />
              -2.9731, 104.7556
            </small>
          </span>
        </article>
        <div className="relative z-10 mx-auto my-3 grid w-full max-w-[760px] grid-cols-3 gap-1.5 md:my-4 md:gap-3">
          <button
            type="button"
            onClick={() =>
              setCallTarget({ name: "Tim medis", phone: "+6282281235569" })
            }
            className="flex min-h-[111px] cursor-pointer flex-col items-center justify-center rounded-[22px] bg-[#fffdf6] px-2 py-3 text-[#265647] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746] md:min-h-[130px] md:p-4"
          >
            <img src="/assets/pic/pic-37.png" alt="" aria-hidden="true" className="size-11 object-contain" />
            <b className="mt-2 text-[11px] md:text-sm">Tim medis</b>
            <small className="text-[10px] md:text-xs">+6282281235569</small>
          </button>
          <button
            type="button"
            onClick={() => setStage("contacts")}
            className="flex min-h-[111px] cursor-pointer flex-col items-center justify-center rounded-[22px] bg-[#fffdf6] px-2 py-3 text-[#265647] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746] md:min-h-[130px] md:p-4"
          >
            <img src="/assets/pic/pic-36.png" alt="" aria-hidden="true" className="size-11 object-contain" />
            <b className="mt-2 text-[11px] leading-tight md:text-sm">
              Orang
              <br />
              Terdekat
            </b>
          </button>
          <button
            type="button"
            onClick={() => setCallTarget({ name: "Ambulans", phone: "119" })}
            className="flex min-h-[111px] cursor-pointer flex-col items-center justify-center rounded-[22px] bg-[#fffdf6] px-2 py-3 text-[#265647] transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746] md:min-h-[130px] md:p-4"
          >
            <img src="/assets/pic/pic-66.png" alt="" aria-hidden="true" className="size-11 object-contain" />
            <b className="mt-2 text-[11px] md:text-sm">Ambulans</b>
            <small className="text-[10px] md:text-xs">119</small>
          </button>
        </div>
        <button
          type="button"
          onClick={() => {
            setStage("home");
            setSeconds(272);
          }}
          className="relative z-10 min-h-12 w-full max-w-[760px] cursor-pointer rounded-3xl bg-[#067564] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#055f52] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Icon icon={faXmark} aria-hidden="true" className="mr-2" /> Batalkan SOS
        </button>
        {callDialog}
      </section>
    );
  }
  const choice = stage === "choice" || stage === "sent";
  return (
    <section className={`${pageClass} text-center`}>
      <img
        src="/assets/pic/pic-62.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
      />
      <img
        src="/assets/pic/pic-61.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[-25px] bottom-[42px] h-[170px] w-[calc(100%+50px)] object-cover opacity-80 md:hidden"
      />
      {top()}
      <img
        src="/assets/pic/pic-31.png"
        alt=""
        aria-hidden="true"
        className={`relative z-10 mx-auto block h-[95px] w-[118px] object-contain md:h-[125px] md:w-[150px] ${choice ? "mt-0 md:mt-2" : "mt-3 md:mt-2"}`}
      />
      {choice ? (
        <>
          <h2 className="relative z-10 mx-auto mt-1 max-w-[420px] text-[22px] font-semibold leading-[1.05] md:mt-2 md:text-[32px]">
            Kamu terlihat sedang
            <br />
            dalam situasi darurat?
          </h2>
          <p className="relative z-10 mx-auto mt-2 max-w-[340px] text-[13px] leading-[1.5] md:text-sm">
            Pilih jenis bantuan yang kamu butuhkan
            <br />
            atau langsung hubungi kami.
          </p>
          <div className="relative z-10 mx-auto mt-6 grid w-full max-w-[880px] gap-2.5 md:mt-8 md:grid-cols-2 md:gap-4">
            {[
              [
                "Darurat Medis",
                "Butuh bantuan medis segera (ambulans, rumah sakit, dll)",
                "/assets/pic/pic-33.png",
                "sent",
                "bg-[#f6b4c7]",
              ],
              [
                "Butuh Dukungan Emosional",
                "Kamu merasa cemas, sedih, atau ingin bercerita",
                "/assets/pic/pic-63.png",
                "emotional",
                "bg-[#f6efa6]",
              ],
              [
                "Hubungi Kontak Darurat",
                "Orang terdekat yang sudah ditambahkan",
                "/assets/pic/pic-64.png",
                "contacts",
                "bg-[#b7e6ed]",
              ],
              [
                "Lainnya",
                "Kekerasan, kecelakaan, atau keadaan darurat lainnya",
                "/assets/pic/pic-65.png",
                "sent",
                "bg-[#efc2ed]",
              ],
            ].map(([name, text, img, next, tone]) => (
              <button
                key={name}
                type="button"
                onClick={() => setStage(next)}
                className={`grid min-h-[64px] cursor-pointer grid-cols-[45px_1fr_18px] items-center gap-1.5 rounded-[12px] p-2 text-left text-[#452f37] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746] md:min-h-[96px] md:grid-cols-[58px_1fr_18px] md:gap-3 md:rounded-[18px] md:p-5 ${tone}`}
              >
                <img src={img} alt="" aria-hidden="true" className="size-11 object-contain md:size-12" />
                <span className="grid min-w-0">
                  <b className="text-[13px] leading-tight md:text-base">{name}</b>
                  <small className="text-[11px] leading-[1.25] md:text-xs">{text}</small>
                </span>
                <Icon icon={faChevronRight} aria-hidden="true" className="text-xs md:text-sm" />
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="relative z-10 mx-auto mt-2 max-w-[420px] text-[22px] font-semibold leading-[1.05] md:text-[32px]">
            Butuh bantuan
            <br />
            segera?
          </h2>
          <p className="relative z-10 mx-auto mt-2 max-w-[330px] text-[13px] leading-[1.5] md:text-sm">
            Tekan tombol SOS jika kamu merasa
            <br />
            sedang dalam bahaya, tertekan, atau
            <br />
            membutuhkan pertolongan.
          </p>
          <button
            type="button"
            onClick={() => setStage("choice")}
            aria-label="SOS"
            className="relative z-10 mx-auto my-6 grid size-[142px] cursor-pointer place-items-center rounded-full border-8 border-double border-white bg-[#f47c87] shadow-[0_0_20px_#ef7780] transition-transform hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#075746] md:my-6 md:size-[180px]"
          >
            <img src="/assets/pic/pic-23.png" alt="" aria-hidden="true" className="h-[72%] w-[72%] object-contain" />
          </button>
          <small className="relative z-10 block text-[11px] leading-[1.4] md:text-[13px]">
            Satu sentuhan,
            <br />
            bisa menyelamatkanmu.
          </small>
          <button
            type="button"
            onClick={() => {
              setBreathing(false);
              setBreathTick(0);
              setStage("breathing");
            }}
            className="relative z-10 mx-auto mt-[70px] flex min-h-11 w-fit cursor-pointer items-center gap-2 rounded-[17px] bg-[#d4e8cc] px-4 text-xs font-semibold text-[#28715b] transition-colors hover:bg-[#c5dfba] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746] md:mt-7"
          >
            <Icon icon={faWind} aria-hidden="true" /> Teknik pernapasan 4-7-8
          </button>
          <img
            src="/assets/pic/pic-19.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[60px] left-[-10px] z-0 w-[92px] object-contain opacity-95 md:hidden"
          />
          <img
            src="/assets/pic/pic-22.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-[60px] right-[-10px] z-0 w-[92px] object-contain opacity-95 md:hidden"
          />
        </>
      )}
      {stage === "sent" && (
        <div className="fixed inset-0 z-30 grid place-items-center bg-[#173e35]/45 px-5">
          <article className="w-full max-w-[460px] rounded-2xl bg-[#fffdf5] px-6 pb-7 pt-5 text-center md:px-10 md:pb-8">
            <img src="/assets/pic/pic-34.png" alt="" aria-hidden="true" className="mx-auto h-16 w-[73px] object-contain md:h-20 md:w-[90px]" />
            <h2 className="mb-1.5 mt-1 text-lg font-semibold md:text-xl">SOS Berhasil dikirim!</h2>
            <p className="mx-auto mb-0 max-w-[240px] text-xs leading-[1.45] md:text-sm">
              Tim darurat sudah menerima informasi kamu dan segera menuju ke lokasi.
            </p>
            <button
              type="button"
              onClick={() => setStage("active")}
              className="mt-5 min-h-11 w-full cursor-pointer rounded-full bg-[#2f7d66] px-5 text-sm font-bold text-white transition-colors hover:bg-[#286b57] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746] md:min-h-12"
            >
              Oke
            </button>
          </article>
        </div>
      )}
    </section>
  );
}
function Playlist({ go }) {
  const [current, setCurrent] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(
      () => setProgress((value) => (value + 0.3) % 100),
      1000,
    );
    return () => clearInterval(timer);
  }, [isPlaying]);
  const covers = [
    "/assets/pic/pic-47.png",
    "/assets/pic/pic-48.png",
    "/assets/pic/pic-49.png",
    "/assets/pic/pic-50.png",
    "/assets/pic/pic-51.png",
  ];
  const toSeconds = (value) =>
    value.split(":").reduce((total, part) => total * 60 + Number(part), 0);
  const totalSeconds = songs.reduce(
    (total, song) => total + toSeconds(song[2]),
    0,
  );
  const activeSong = songs[current] || songs[0];
  const duration = toSeconds(activeSong[2]);
  const played = Math.floor((progress / 100) * duration);
  const formatTime = (value) =>
    `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
  return (
    <section className="min-h-[calc(100svh-74px)] bg-[#f4f8eb] px-5 pb-[240px] pt-3 font-['Poppins'] text-[#08715d] md:min-h-screen md:px-10 md:pb-[190px] md:pt-8">
      <div className="mx-auto w-full max-w-[960px]">
        <header className="grid grid-cols-[44px_1fr_44px] items-center">
          <button
            type="button"
            onClick={() => go("home")}
            aria-label="Kembali"
            className="grid size-11 cursor-pointer place-items-center rounded-full text-xl text-[#689d84] transition-colors hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] md:text-2xl"
          >
            <Icon icon={faArrowLeft} aria-hidden="true" />
          </button>
          <h1 className="m-0 text-center text-base font-semibold md:text-2xl">
            Detail Playlist
          </h1>
          <span aria-hidden="true" />
        </header>
        <img
          src="/assets/pic/pic-46.png"
          alt="Pemandangan pepohonan dari jendela"
          width="800"
          height="400"
          className="mt-3 h-[180px] w-full rounded-2xl object-cover md:mt-5 md:h-[300px] md:rounded-[28px]"
        />
        <div className="px-1 pb-2 pt-4 md:pt-5">
          <h2 className="m-0 text-2xl font-semibold md:text-3xl">Good Vibes Only</h2>
          <p className="mb-1 mt-1 max-w-[420px] text-sm leading-6 md:text-base">
            Lagu-lagu ceria untuk mengembalikan semangatmu!
          </p>
          <span className="flex items-center gap-1.5 text-xs font-medium text-[#4a6b5d] md:text-sm">
            <Icon icon={faMusic} aria-hidden="true" /> {songs.length} lagu ·{" "}
            {Math.round(totalSeconds / 60)} menit
          </span>
        </div>
        <div className="rounded-2xl bg-[#fff9dd] p-2 md:grid md:grid-cols-2 md:gap-x-4 md:p-4">
          {songs.slice(1).map((song, index) => {
            const songIndex = index + 1;
            const active = current === songIndex;
            return (
              <button
                key={song[0]}
                type="button"
                aria-label={`Putar ${song[0]} oleh ${song[1]}`}
                aria-pressed={active}
                onClick={() => {
                  setCurrent(songIndex);
                  setIsPlaying(true);
                  setProgress(0);
                }}
                className={`grid min-h-[60px] w-full cursor-pointer grid-cols-[48px_1fr_auto] items-center gap-3 rounded-xl px-2 py-1.5 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] md:min-h-[76px] md:px-3 ${active ? "bg-[#e3efd8]" : "hover:bg-[#f2f4dd]"}`}
              >
                <img
                  src={covers[index]}
                  alt=""
                  aria-hidden="true"
                  width="48"
                  height="48"
                  className="size-12 rounded-lg object-cover"
                />
                <span className="grid min-w-0">
                  <b className="truncate text-sm font-semibold md:text-base">
                    {song[0]}
                  </b>
                  <small className="truncate text-xs text-[#4a6b5d] md:text-sm">
                    {song[1]}
                  </small>
                </span>
                <time className="text-xs text-[#4a6b5d] md:text-sm">
                  {song[2]}
                </time>
              </button>
            );
          })}
        </div>
      </div>
      <div className="fixed bottom-[86px] left-1/2 z-20 grid min-h-[80px] w-[calc(100%-2rem)] max-w-[620px] -translate-x-1/2 grid-cols-[48px_1fr_44px_44px_44px] items-center gap-2 rounded-2xl bg-[#2f7d66] p-2.5 text-white shadow-[0_10px_30px_#0b3d2f33] lg:bottom-6 lg:left-[calc(50%+135px)] lg:min-h-[86px] lg:gap-3 lg:p-3">
        <img
          src={covers[current - 1] || "/assets/pic/pic-49.png"}
          alt=""
          aria-hidden="true"
          width="48"
          height="48"
          className="size-12 rounded-lg object-cover"
        />
        <div className="min-w-0">
          <b className="block truncate text-xs font-semibold md:text-base">
            {activeSong[0]}
          </b>
          <small className="block truncate text-[11px] text-white md:text-sm">
            {activeSong[1]}
          </small>
          <div className="mt-2">
            <label className="relative block h-1 rounded-full bg-white/35" aria-label="Progres lagu">
              <i
                className="absolute inset-y-0 left-0 rounded-full bg-white"
                style={{ width: `${progress}%` }}
              />
            </label>
            <span className="mt-1 flex justify-between text-[10px] text-white md:text-[11px]">
              <span>{formatTime(played)}</span>
              <span>{activeSong[2]}</span>
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => {
            setCurrent((value) => (value <= 1 ? songs.length - 1 : value - 1));
            setProgress(0);
            setIsPlaying(true);
          }}
          aria-label="Sebelumnya"
          className="grid size-11 cursor-pointer place-items-center rounded-full transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-lg"
        >
          <Icon icon={faPlay} aria-hidden="true" className="-scale-x-100" />
        </button>
        <button
          type="button"
          onClick={() => setIsPlaying((value) => !value)}
          aria-label={isPlaying ? "Jeda" : "Putar"}
          className="grid size-11 cursor-pointer place-items-center rounded-full bg-white text-[#2f7d66] transition-colors hover:bg-[#f0f7ec] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-lg"
        >
          <Icon icon={isPlaying ? faPause : faPlay} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => {
            setCurrent((value) => (value >= songs.length - 1 ? 0 : value + 1));
            setProgress(0);
            setIsPlaying(true);
          }}
          aria-label="Berikutnya"
          className="grid size-11 cursor-pointer place-items-center rounded-full transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-lg"
        >
          <Icon icon={faPlay} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}
function Education({ go, tasks = [] }) {
  const [topic, setTopic] = useState(null);
  const [card, setCard] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [savedCards, setSavedCards] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("remind-saved-cards") || "[]");
    } catch {
      return [];
    }
  });
  const toggleSaved = (key) => {
    setSavedCards((current) => {
      const next = current.includes(key)
        ? current.filter((item) => item !== key)
        : [...current, key];
      localStorage.setItem("remind-saved-cards", JSON.stringify(next));
      return next;
    });
  };
  const totalCards = education.reduce(
    (total, item) => total + item.cards.length,
    0,
  );
  const pageClass =
    "min-h-[calc(100svh-74px)] bg-[#d4ecdc] px-[18px] pb-24 pt-2.5 font-['Poppins'] text-[#123f34] md:min-h-screen md:px-10 md:py-8";
  const backButton = (onClick) => (
    <button
      type="button"
      onClick={onClick}
      aria-label="Kembali"
      className="grid size-11 cursor-pointer place-items-center rounded-full text-xl text-[#173e33] transition-colors hover:bg-white/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] md:text-2xl"
    >
      <Icon icon={faArrowLeft} aria-hidden="true" />
    </button>
  );
  const musicButton = (
    <button
      type="button"
      onClick={() => go("playlist")}
      aria-label="Buka Listening"
      className="grid size-11 cursor-pointer place-items-center rounded-full bg-white text-sm text-[#173e33] transition-colors hover:bg-[#eef6e7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] md:text-base"
    >
      <Icon icon={faMusic} aria-hidden="true" />
    </button>
  );
  const headerActions = (
    <div className="flex shrink-0 items-center gap-2">
      {musicButton}
      <NotificationBell tasks={tasks} go={go} />
    </div>
  );
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
    const cardKey = `${topic}-${card}`;
    const saved = savedCards.includes(cardKey);
    return (
      <section className={pageClass}>
        <div className="mx-auto w-full max-w-[760px]">
          <header className="flex items-center gap-2">
            {backButton(() => {
              setTopic(null);
              setFlipped(false);
            })}
            <div className="min-w-0 flex-1 text-center">
              <small className="block text-[10px] font-semibold tracking-[0.18em] text-[#2f6a51]">
                FLASHCARD
              </small>
              <h1 className="m-0 truncate font-['Playfair_Display'] text-xl font-bold md:text-2xl">
                {item.topic}
              </h1>
            </div>
            {headerActions}
          </header>
          <div className="mt-5 md:mt-8">
            <div className={`relative overflow-hidden rounded-2xl shadow-[0_12px_25px_#234f3e20] md:rounded-3xl ${flipped ? "bg-[#075306] text-white" : "bg-[#f9f8f7] text-[#095427]"}`}>
              <button
                type="button"
                aria-pressed={flipped}
                onClick={() => setFlipped((value) => !value)}
                className="relative flex min-h-[320px] w-full cursor-pointer flex-col p-6 text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[#087460] md:min-h-[460px] md:p-9"
              >
                {flipped ? (
                  <>
                    <span className="text-xs font-semibold tracking-[0.18em]">
                      JAWABAN RINGKAS
                    </span>
                    <p className="mb-5 mt-6 text-base font-semibold italic leading-7 md:text-lg md:leading-8">
                      {data[1]}
                    </p>
                    <blockquote className="mx-1 mb-5 mt-0 rounded-2xl bg-[#548865] px-4 py-3 text-xs leading-5 md:text-sm md:leading-6">
                      {item.citation}
                    </blockquote>
                    <small className="mt-auto flex items-center gap-2 text-xs text-white/85">
                      <Icon icon={faSeedling} aria-hidden="true" /> Ketuk untuk kembali
                    </small>
                  </>
                ) : (
                  <>
                    <span className="text-xs font-semibold tracking-[0.18em]">
                      {item.topic === "Kesehatan Mental" ? "MENTAL" : item.topic.toUpperCase()}
                    </span>
                    <img
                      src={cardArt}
                      alt=""
                      aria-hidden="true"
                      width="96"
                      height="100"
                      className="mx-auto mb-2 mt-6 h-[100px] w-[96px] object-contain md:mt-10 md:h-[130px] md:w-[120px]"
                    />
                    <h2 className="mx-auto mb-10 mt-1 max-w-[440px] text-center font-['Playfair_Display'] text-xl font-bold italic leading-[1.35] md:text-3xl">
                      {data[0]}
                    </h2>
                    <small className="mt-auto flex items-center gap-2 text-xs text-[#4f6b60]">
                      <Icon
                        icon={faSeedling}
                        aria-hidden="true"
                        className="size-6 rounded-full bg-[#d9ecd9] p-1.5"
                      />
                      Ketuk untuk lihat jawaban
                    </small>
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 right-0 size-16 bg-[#b5dfba] [clip-path:polygon(100%_0,100%_100%,0_100%)]"
                    />
                  </>
                )}
              </button>
              <button
                type="button"
                onClick={() => toggleSaved(cardKey)}
                aria-label={saved ? "Hapus dari simpanan" : "Simpan kartu"}
                aria-pressed={saved}
                className={`absolute right-5 top-5 grid size-9 cursor-pointer place-items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] ${flipped ? "bg-white/15 text-white hover:bg-white/25" : saved ? "bg-[#075306] text-white" : "bg-[#e2f0e7] text-[#62a98a] hover:bg-[#d3e8dc]"}`}
              >
                <Icon icon={faBookmark} aria-hidden="true" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                setCard((value) => (value + 1) % item.cards.length);
                setFlipped(false);
              }}
              className="mt-3 min-h-12 w-full cursor-pointer rounded-xl bg-[#075306] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#064304] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746] md:text-base"
            >
              Kartu berikutnya
              <span className="ml-3 text-xs font-normal text-white/70">
                {card + 1}/{item.cards.length}
              </span>
            </button>
            <aside className="mt-4 grid grid-cols-[36px_1fr] items-center gap-3 rounded-xl bg-[#eef0ce] px-3 py-3">
              <Icon icon={faHeartPulse} aria-hidden="true" className="text-2xl text-[#3d6b4c]" />
              <p className="m-0 text-xs leading-5 md:text-sm">
                <b>Kamu tidak harus menghadapinya sendiri.</b>
                <br />
                Jika tekanan mulai mengganggu keseharian, hubungi orang terpercaya
                atau tenaga profesional.
              </p>
            </aside>
            <p className="mb-0 mt-3 text-center text-[11px] leading-5 text-[#4f6b60] md:text-xs">
              Konten ini bersifat edukatif, bukan alat diagnosis atau pengganti
              bantuan profesional.
            </p>
          </div>
        </div>
      </section>
    );
  }
  const topicTones = [
    "bg-[#f1deac]",
    "bg-[#a8d5ed]",
    "bg-[#f4dda8]",
    "bg-[#a8dba7]",
  ];
  return (
    <section className={pageClass}>
      <div className="mx-auto w-full max-w-[1000px]">
        <header className="flex items-center gap-2">
          {backButton(() => go("home"))}
          <p className="m-0 flex-1 text-center text-[10px] leading-tight md:text-xs">
            Ruang Belajar
            <strong className="block text-lg font-bold md:text-2xl">Edukasi</strong>
          </p>
          {headerActions}
        </header>
        <section className="mt-3 grid grid-cols-[1fr_92px] items-center gap-3 rounded-[18px] bg-[#07572e] px-4 py-5 text-white md:mt-6 md:grid-cols-[1fr_auto] md:gap-10 md:rounded-3xl md:px-8 md:py-8">
          <div>
            <small className="text-[10px] font-semibold tracking-wide text-white/75 md:text-xs">
              MENTAL HEALTH
            </small>
            <h1 className="mb-2 mt-1 text-[21px] font-semibold leading-[1.1] md:text-[36px]">
              Kenali dirimu,
              <br />
              <em className="font-['Playfair_Display'] italic">Jaga dirimu.</em>
            </h1>
            <p className="m-0 max-w-[420px] text-xs leading-5 text-white/85 md:text-base md:leading-7">
              Pelajari kesehatan mental melalui materi dan kartu singkat
              berbasis jurnal.
            </p>
          </div>
          <img
            src="/assets/pic/pic-67.png"
            alt=""
            aria-hidden="true"
            width="120"
            height="140"
            className="h-[112px] w-[88px] object-contain md:h-[190px] md:w-[160px]"
          />
        </section>
        <div className="mx-2 mt-4 grid grid-cols-3 rounded-[13px] bg-[#f9fbf0] px-1 py-2 md:mx-0 md:mt-6 md:py-4">
          {[
            [education.length, "Topik Utama"],
            [totalCards, "Kartu Edukasi"],
            [education[0]?.cards.length || 0, "Kartu / Topik"],
          ].map(([value, label], index) => (
            <span
              key={label}
              className={`grid px-1 text-center text-[10px] leading-4 md:text-xs ${index < 2 ? "border-r border-[#1a5c49]" : ""}`}
            >
              <b className="text-sm font-bold md:text-xl">{value}</b>
              {label}
            </span>
          ))}
        </div>
        <div className="mb-2.5 mt-5 md:mt-7">
          <small className="text-[10px] font-semibold tracking-[0.14em] text-[#2f6a51] md:text-xs">
            KARTU EDUKASI
          </small>
          <h2 className="mb-0 mt-1 text-lg font-semibold md:text-2xl">
            Satu Menit untuk dirimu
          </h2>
        </div>
        <div className="grid gap-2.5 md:grid-cols-2 md:gap-4">
          {education.map((item, index) => (
            <button
              key={item.topic}
              type="button"
              onClick={() => {
                setTopic(index);
                setCard(0);
                setFlipped(false);
              }}
              className={`flex min-h-[72px] w-full cursor-pointer items-center gap-3 rounded-[14px] px-3 py-2.5 text-left text-[#174d3f] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] md:min-h-[92px] md:gap-4 md:rounded-2xl md:px-5 md:py-4 ${topicTones[index % topicTones.length]}`}
            >
              <Icon
                icon={item.icon}
                aria-hidden="true"
                className="size-10 shrink-0 text-white md:size-12 lg:size-14"
              />
              <span className="grid min-w-0 flex-1">
                <small className="text-[10px] font-semibold tracking-wide md:text-xs">
                  TOPIK 0{index + 1}
                </small>
                <b className="truncate text-sm font-semibold md:text-lg">{item.topic}</b>
                <em className="text-[11px] not-italic text-[#315a4b] md:text-xs">
                  {item.cards.length} Kartu Edukasi
                </em>
              </span>
              <b
                aria-hidden="true"
                className="grid size-9 shrink-0 place-items-center rounded-full bg-[#f7fbef] text-base font-bold md:size-10"
              >
                →
              </b>
            </button>
          ))}
        </div>
      </div>
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
    <section className="min-h-[calc(100svh-74px)] bg-[#d8ecdd] px-[18px] pb-28 pt-3.5 font-['Poppins'] text-[#173d35] md:min-h-screen md:px-10 md:py-8">
      <div className="mx-auto w-full max-w-[820px]">
        <header className="mb-4 flex items-start gap-2">
          <button
            type="button"
            onClick={() => go("profile")}
            aria-label="Kembali"
            className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-xl text-[#578c76] transition-colors hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]"
          >
            <Icon icon={faArrowLeft} aria-hidden="true" />
          </button>
          <div>
            <h1 className="m-0 text-2xl font-bold leading-tight md:text-3xl">
              Tambah Kontak Baru
            </h1>
            <p className="mb-0 mt-1 text-xs text-[#4f6b60] md:text-sm">
              Simpan kontak darurat di satu tempat
            </p>
          </div>
        </header>
        <div className="grid gap-3 md:gap-4">
          {contacts.map((contact, index) => (
            <article
              key={contact.id || contact.phone}
              className="rounded-xl bg-[#eff6ec] p-3 md:rounded-2xl md:p-5"
            >
              <div className="flex items-center gap-2 rounded-lg bg-[#16735f] px-3 py-2 text-white">
                <Icon icon={faUser} aria-hidden="true" className="text-lg" />
                <span className="grid">
                  <b className="text-sm md:text-base">Detail Kontak {index + 1}</b>
                  <small className="text-[11px] text-white/80 md:text-xs">
                    Pastikan nomor mudah dihubungi
                  </small>
                </span>
              </div>
              <dl className="mb-0 mt-3 grid gap-2">
                {[
                  ["NAMA LENGKAP*", contact.name],
                  ["KATEGORI/HUBUNGAN*", contact.relation],
                  ["NOMOR TELEPON*", contact.phone],
                ].map(([term, value]) => (
                  <div key={term}>
                    <dt className="mb-1 text-[10px] font-bold uppercase tracking-wide text-[#174d3f] md:text-xs">
                      {term}
                    </dt>
                    <dd className="m-0 min-h-[38px] rounded-md bg-[#a9cdb2] px-3 py-2 text-sm">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
          <article className="rounded-xl bg-[#eff6ec] p-3 md:rounded-2xl md:p-5">
            <div className="flex items-center gap-2 rounded-lg bg-[#16735f] px-3 py-2 text-white">
              <Icon icon={faUser} aria-hidden="true" className="text-lg" />
              <span className="grid">
                <b className="text-sm md:text-base">
                  Detail Kontak {contacts.length + 1}
                </b>
                <small className="text-[11px] text-white/80 md:text-xs">
                  Pastikan nomor mudah dihubungi
                </small>
              </span>
            </div>
            <form
              className="mt-4 grid gap-3"
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
                autoComplete="name"
                icon={faUser}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                inputClassName="bg-[#a9cdb2]"
              />
              <Field
                label="NOMOR TELEPON*"
                placeholder="Masukkan nomor"
                autoComplete="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                icon={faPhone}
                inputClassName="bg-[#a9cdb2]"
              />
              <div>
                <span className="mb-1.5 ml-1 block text-[10px] font-bold uppercase tracking-wide text-[#365e53] md:text-xs">
                  KATEGORI/HUBUNGAN*
                </span>
                <div
                  className="flex flex-wrap gap-2"
                  role="radiogroup"
                  aria-label="Kategori"
                >
                  {["Keluarga", "Teman", "Kerja", "Lainnya"].map((relation) => (
                    <button
                      key={relation}
                      type="button"
                      role="radio"
                      aria-checked={form.relation === relation}
                      onClick={() => setForm({ ...form, relation })}
                      className={`min-h-11 cursor-pointer rounded-full border-2 px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] ${form.relation === relation ? "border-[#07513f] bg-[#0f6b58] text-white" : "border-transparent bg-[#cfe2d4] text-[#244a3f] hover:bg-[#c2d9c8]"}`}
                    >
                      {relation}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-1 grid grid-cols-2 gap-2.5">
                <button
                  type="submit"
                  className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0f6b58] px-4 text-sm font-bold text-white transition-colors hover:bg-[#0b5748] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746]"
                >
                  <Icon icon={faFloppyDisk} aria-hidden="true" /> Simpan Kontak
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setForm({ name: "", phone: "", relation: "Keluarga" })
                  }
                  className="flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full bg-[#e2eee6] px-4 text-sm font-bold text-[#07513f] transition-colors hover:bg-[#d1e3d7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]"
                >
                  <Icon icon={faXmark} aria-hidden="true" /> Batal
                </button>
              </div>
            </form>
          </article>
        </div>
      </div>
      {saved && (
        <SuccessDialog
          title="Berhasil"
          message="Kontak berhasil disimpan."
          close={() => setSaved(false)}
        />
      )}
    </section>
  );
}
function Profile({ user, setUser, logout, go, persist, flash }) {
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const handleAvatar = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      flash?.("Ukuran foto maksimal 1 MB.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setUser((current) => ({ ...current, avatar: String(reader.result) }));
    reader.readAsDataURL(file);
  };
  if (editing)
    return (
      <section className="min-h-[calc(100svh-74px)] bg-[#d8ecdd] px-[18px] pb-28 pt-4 font-['Poppins'] text-[#173d35] md:min-h-screen md:px-10 md:py-8">
        <div className="mx-auto w-full max-w-[820px]">
          <header className="mb-4 flex items-start gap-2">
            <button
              type="button"
              onClick={() => setEditing(false)}
              aria-label="Kembali"
              className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full text-xl text-[#578c76] transition-colors hover:bg-white/60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]"
            >
              <Icon icon={faArrowLeft} aria-hidden="true" />
            </button>
            <div>
              <h1 className="m-0 text-2xl font-bold leading-tight md:text-3xl">
                Kelola Profil
              </h1>
              <p className="mb-0 mt-1 text-xs text-[#4f6b60] md:text-sm">
                Perbarui informasi akunmu
              </p>
            </div>
          </header>
          <div className="flex items-center gap-3 rounded-xl bg-[#f4f7ef] p-3.5 md:p-5">
            <div className="grid size-16 shrink-0 place-items-center overflow-hidden rounded-full border-[3px] border-[#13806a] bg-[#edf4e9] text-2xl text-[#13806a] md:size-20">
              {user.avatar ? (
                <img src={user.avatar} alt="" className="size-full object-cover" />
              ) : (
                <Icon icon={faUser} aria-hidden="true" />
              )}
            </div>
            <div className="grid min-w-0 text-xs md:text-sm">
              <b className="truncate text-sm md:text-base">{user.name}</b>
              <span className="truncate text-[#4f6b60]">
                {user.age}, {user.gender}
              </span>
              <span className="truncate text-[#4f6b60]">{user.email}</span>
              <label className="mt-1.5 w-fit cursor-pointer rounded-md bg-[#aacbae] px-2 py-1 text-[11px] font-semibold text-[#173d35] transition-colors hover:bg-[#99bf9e] focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#087460]">
                Ganti Foto
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatar}
                  className="sr-only"
                />
              </label>
            </div>
          </div>
          <form
            className="mt-3 rounded-xl bg-[#f4f7ef] p-3.5 md:mt-4 md:rounded-2xl md:p-5"
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
            <div className="grid gap-3">
              <Field
                label="NAMA LENGKAP*"
                autoComplete="name"
                icon={faUser}
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
              />
              <Field
                label="UMUR*"
                inputMode="numeric"
                icon={faCalendarDays}
                value={user.age}
                onChange={(e) => setUser({ ...user, age: e.target.value })}
              />
              <label className="block">
                <span className="mb-1.5 ml-1 block text-[10px] font-bold uppercase tracking-wide text-[#365e53] md:text-xs">
                  JENIS KELAMIN*
                </span>
                <select
                  value={user.gender}
                  onChange={(e) => setUser({ ...user, gender: e.target.value })}
                  className="min-h-[46px] w-full rounded-xl border border-[#9fbeae] bg-[#f2f7ef] px-3.5 py-2.5 text-[15px] text-[#173d35] outline-none focus-visible:border-[#0f6b58] focus-visible:ring-2 focus-visible:ring-[#0f6b58]/35"
                >
                  <option>Perempuan</option>
                  <option>Laki-laki</option>
                </select>
              </label>
              <Field
                label="EMAIL*"
                type="email"
                autoComplete="email"
                icon={faEnvelope}
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
              <Field
                label="NOMOR TELEPON*"
                type="tel"
                autoComplete="tel"
                icon={faPhone}
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
              />
              <label className="block">
                <span className="mb-1.5 ml-1 block text-[10px] font-bold uppercase tracking-wide text-[#365e53] md:text-xs">
                  TENTANG SAYA
                </span>
                <textarea
                  value={user.about}
                  onChange={(e) => setUser({ ...user, about: e.target.value })}
                  className="min-h-[100px] w-full resize-y rounded-xl border border-[#9fbeae] bg-[#f2f7ef] px-3.5 py-2.5 text-[15px] text-[#173d35] outline-none focus-visible:border-[#0f6b58] focus-visible:ring-2 focus-visible:ring-[#0f6b58]/35"
                />
              </label>
            </div>
            <button
              type="submit"
              className="mt-4 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#0f6b58] px-5 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#0b5748] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746]"
            >
              <Icon icon={faCircleCheck} aria-hidden="true" /> Simpan Perubahan
            </button>
            <button
              type="button"
              onClick={logout}
              className="mt-2.5 flex min-h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#ffd8df] px-5 text-sm font-bold uppercase tracking-wide text-[#a91a34] transition-colors hover:bg-[#fbc7d1] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a31a34]"
            >
              <Icon icon={faRightFromBracket} aria-hidden="true" /> Keluar Akun
            </button>
          </form>
        </div>
        {saved && (
          <SuccessDialog
            title="Berhasil"
            message="Data berhasil diperbarui."
            close={() => {
              setSaved(false);
              setEditing(false);
            }}
          />
        )}
      </section>
    );
  return (
    <div className="min-h-[calc(100svh-74px)] bg-[#cde9d3] font-['Poppins'] text-[#174d3f] xl:grid xl:min-h-screen xl:grid-cols-[minmax(400px,0.9fr)_minmax(500px,1.1fr)] xl:gap-7 xl:bg-[#eef5ec] xl:p-8">
      <section className="relative overflow-hidden rounded-b-[58px] bg-[#a9cbb0] px-9 pb-7 pt-4 md:rounded-[32px] md:px-12 md:py-10 md:shadow-[0_18px_45px_rgba(22,84,67,0.12)]">
        <img src="/assets/pic/pic-61.png" width="818" height="276" alt="" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[86px] w-full object-cover md:h-[120px]" />
        <button className="absolute right-4 top-4 z-10 grid size-12 cursor-pointer place-items-center rounded-full bg-[#087460] text-2xl text-white hover:bg-[#075746] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white md:text-3xl" onClick={() => setEditing(true)} aria-label="Pengaturan profil">
          <Icon icon={faGear} />
        </button>
        <div className="relative z-10 mx-auto mt-0 grid size-[76px] place-items-center overflow-hidden rounded-full border-[5px] border-white bg-[#087460] text-[38px] text-white md:mt-5 md:size-28 md:text-[54px]">
          {user.avatar ? (
            <img src={user.avatar} alt="" className="size-full object-cover" />
          ) : (
            <Icon icon={faUser} aria-hidden="true" />
          )}
        </div>
        <h1 className="mb-0 mt-2 text-center text-[16px] font-semibold md:text-[25px]">{user.name}</h1>
        <p className="m-0 text-center text-[12px] font-semibold md:text-base">{user.age} · {user.gender}</p>
        <button className="mx-auto mt-1 flex min-h-[36px] w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#f6f8eb] px-5 text-[16px] font-semibold hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] md:mt-3 md:max-w-[420px]" onClick={() => setEditing(true)}>
          <Icon icon={faUser} /> Kelola Profil
        </button>
        <div className="mx-auto mt-1 max-w-[440px] md:mt-3">
          <h2 className="mb-1 mt-0 text-[18px] font-semibold">Keluarga &amp; Teman</h2>
          {[1, 2, 3].map((item) => (
            <button className="flex min-h-[38px] w-full cursor-pointer items-center gap-2 text-left text-[15px] font-medium hover:text-[#087460] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#087460] md:min-h-[44px] md:text-base" key={item} onClick={() => go("contacts")}>
              <span className="grid size-9 place-items-center rounded-full bg-[#2f7558] text-white"><Icon icon={faUser} /></span>
              Tambah Kontak Baru
            </button>
          ))}
        </div>
        <Icon icon={faChevronRight} className="absolute bottom-1 left-1/2 rotate-90 text-2xl" aria-hidden="true" />
      </section>
      <section className="mx-3 my-3 overflow-hidden rounded-[54px] bg-[#7fac8b] px-0 pb-2 pt-4 md:m-0 md:rounded-[32px] md:px-4 md:py-6 md:shadow-[0_18px_45px_rgba(22,84,67,0.12)]">
        <blockquote className="mx-4 mb-4 mt-0 text-center font-['Playfair_Display'] text-[14px] font-bold text-[#173d35] md:text-xl">
          “Jangan bandingkan dirimu dengan orang lain, jadilah versi terbaik
          dari dirimu sendiri!”
        </blockquote>
        {[
          ["education", "/assets/pic/pic-14.png", "Riwayat Pembelajaran", "Apa saja yang sudah kamu pelajari?"],
          ["tasks", "/assets/pic/pic-15.png", "Checklist Tugas", "Lihat tugas-tugas yang sudah kamu kerjakan"],
          ["mood", "/assets/pic/pic-16.png", "Mood Tracker", "Bagaimana mood kamu hari ini?"],
        ].map(([target, image, title, copy]) => (
          <button key={target} className="grid min-h-[92px] w-full cursor-pointer grid-cols-[76px_1fr] items-center gap-2 border-t-[3px] border-dashed border-[#b9d8c2] px-5 text-left transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-white md:min-h-[145px] md:grid-cols-[110px_1fr] md:px-8" onClick={() => go(target)}>
            <img src={image} alt="" className="size-[72px] object-contain md:size-[105px]" />
            <span className="grid">
              <b className="text-[18px] font-medium md:text-[25px]">{title}</b>
              <small className="text-[11px] md:text-[15px]">{copy}</small>
            </span>
          </button>
        ))}
      </section>
    </div>
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
      className="fixed inset-0 z-[130] flex items-end justify-center bg-[#102d26]/55 font-['Poppins'] md:items-center"
      onMouseDown={(e) => e.target === e.currentTarget && close()}
    >
      <section
        className="max-h-[92dvh] w-full max-w-[500px] overflow-auto rounded-t-[26px] bg-[#fbfaf1] px-6 pb-8 pt-6 shadow-[0_-20px_50px_#09271d38] md:max-w-[620px] md:rounded-[26px]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <header className="flex items-center justify-between gap-4">
          <h2
            id="modal-title"
            className="m-0 font-['Playfair_Display'] text-2xl font-bold text-[#07513f]"
          >
            {title}
          </h2>
          <button
            type="button"
            onClick={close}
            aria-label="Tutup dialog"
            className="grid size-11 shrink-0 cursor-pointer place-items-center rounded-full bg-[#dce9df] text-[#0f6b58] transition-colors hover:bg-[#cfe1d6] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]"
          >
            <Icon icon={faXmark} />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}
function SuccessDialog({ title, message, close }) {
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && close();
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [close]);
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-[#173d35]/45 px-5 font-['Poppins']">
      <div
        className="w-full max-w-[300px] rounded-lg bg-white px-5 py-5 text-center shadow-[4px_5px_0_#496258]"
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <Icon
          icon={faCircleCheck}
          aria-hidden="true"
          className="mx-auto mb-2 block text-[42px] text-[#30c346]"
        />
        <b className="block text-lg text-[#173d35]">{title}</b>
        <p className="my-2.5 text-sm text-[#5d6f66]">{message}</p>
        <button
          type="button"
          onClick={close}
          className="min-h-11 min-w-[88px] cursor-pointer rounded-full bg-[#b7dcf0] px-5 font-semibold text-[#173d35] transition-colors hover:bg-[#a5d1ea] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]"
        >
          Ok
        </button>
      </div>
    </div>
  );
}
function Empty({ title, text }) {
  return (
    <div className="mx-auto mt-8 max-w-[420px] px-6 py-10 text-center font-['Poppins'] text-[#174d3f]">
      <Icon icon={faSeedling} aria-hidden="true" className="mx-auto mb-3 text-[42px] text-[#6f9d7c]" />
      <h2 className="m-0 text-lg font-semibold">{title}</h2>
      <p className="mb-0 mt-2 text-sm leading-6 text-[#4f6b60]">{text}</p>
    </div>
  );
}
export default App;
