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
  faGear,
  faBell,
  faVolumeHigh,
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
  Happy: "/assets/pic/pic-27.png",
  Okay: "/assets/pic/pic-27.png",
  Sad: "/assets/pic/pic-27.png",
  Stressed: "/assets/pic/pic-27.png",
  Angry: "/assets/pic/pic-27.png",
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
    <div className="min-h-[100svh] bg-[#edf4ed] md:flex">
      <main
        id="main"
        className="min-h-[100svh] min-w-0 flex-1 overflow-x-hidden pb-[74px] md:pb-0"
      >
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
                onClick={() => setShowReset(true)}
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
              className={`min-h-[46px] w-full cursor-pointer rounded-[28px] bg-[#118773] px-6 text-[17px] font-semibold text-white transition-colors hover:bg-[#087460] active:bg-[#075746] disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] ${isLogin ? "!mt-2" : ""}`}
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
      <img src="/assets/pic/pic-57.png" width="250" height="258" alt="" />
    </div>
  );
}
function BottomNav({ current, go }) {
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 h-[74px] bg-[#087965] px-2 pb-[19px] pt-[15px] text-[#087460] md:sticky md:inset-auto md:top-0 md:order-first md:flex md:h-screen md:w-[270px] md:shrink-0 md:flex-col md:bg-[#0d705e] md:p-6 md:text-white"
      aria-label="Navigasi utama"
    >
      <div className="hidden items-center gap-3 border-b border-white/20 pb-6 md:flex">
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
      <div className="grid h-[40px] grid-cols-6 rounded-[23px] bg-[#f5f7e9] px-1 md:mt-8 md:h-auto md:grid-cols-1 md:gap-2 md:rounded-none md:bg-transparent md:px-0">
        {nav.map(([id, label, icon]) => (
          <button
            key={id}
            className={`flex min-w-0 cursor-pointer flex-col items-center justify-center gap-0.5 rounded-xl px-1 text-[13px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f3d56a] md:min-h-12 md:flex-row md:justify-start md:gap-3 md:px-4 md:text-[17px] ${current === id ? "bg-[#c5e1d2] text-[#075746] md:bg-white/15 md:text-white" : "text-[#087460] hover:bg-[#dcebdd] md:text-white/75 md:hover:bg-white/10 md:hover:text-white"}`}
            onClick={() => go(id)}
            aria-current={current === id ? "page" : undefined}
          >
            <Icon icon={icon} />
            <span className="max-w-full truncate text-[8px] font-medium leading-none md:text-[14px] md:font-semibold md:leading-normal">
              {label}
            </span>
          </button>
        ))}
      </div>
      <div className="mt-auto hidden rounded-2xl bg-white/10 p-4 md:block">
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
function LegacyHome({ go, user }) {
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
          <img className="deco deco-leaf" src="/assets/pic/pic-7.png" alt="" aria-hidden="true" />
          <img className="deco deco-twig" src="/assets/pic/pic-8.png" alt="" aria-hidden="true" />
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
            src="/assets/pic/pic-9.png"
            alt=""
            aria-hidden="true"
          />
          <img
            className="deco deco-flowers"
            src="/assets/pic/pic-10.png"
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
          src="/assets/pic/pic-22.png"
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
function LegacyFeature({ icon, image, title, text, onClick }) {
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
function Home({ go, user }) {
  return (
    <div className="min-h-[calc(100svh-74px)] bg-[#cfe8d2] font-['Poppins'] text-[#163f35] md:grid md:min-h-screen md:grid-cols-[minmax(430px,0.95fr)_minmax(480px,1.05fr)] md:grid-rows-[auto_auto] md:gap-7 md:bg-[#eef5ec] md:p-8">
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
            {moodOptions.map(([m, icon, c]) => (
              <button key={m} aria-label={m} onClick={() => go("mood")} className="flex min-w-0 cursor-pointer flex-col items-center gap-1 rounded-xl py-0.5 transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#087460]">
                <span className="grid size-[42px] place-items-center rounded-full border-[3px] border-white text-[21px] text-[#355f4f] shadow-sm md:size-[62px] md:text-[30px]" style={{ backgroundColor: c }}><Icon icon={icon} /></span>
                <span className="max-w-full truncate text-[11px] font-medium md:text-sm">{m}</span>
              </button>
            ))}
          </div>
          <button className="mx-auto mt-1 flex min-h-[29px] w-[196px] cursor-pointer items-center justify-center gap-1 rounded-[18px] bg-[#72a77b] px-5 text-[12px] font-medium text-white hover:bg-[#5d9168] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746] md:mt-4 md:min-h-11 md:w-[260px] md:text-base" onClick={() => go("mood")}>
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
        </header>
        <div className="relative z-10 flex items-center px-4 md:px-12">
          <img className="h-[76px] w-[70px] object-contain md:h-24 md:w-24" src="/assets/pic/pic-17.png" alt="Maskot ReMind" />
          <p className="text-[18px] font-semibold leading-[23px] md:text-2xl">Hai, Ramadhani<br />Septhea Dwi Putri<br /><b className="text-[13px] text-white [text-shadow:0_2px_3px_rgba(34,82,54,.45)] md:text-base">“Yuk, selesaikan tugasmu satu per satu!”</b></p>
        </div>
        <span className={`relative z-10 ml-8 inline-block min-w-[117px] rounded-full px-4 text-center text-[18px] leading-6 text-[#242424] ${selected.priority === "Tinggi" ? "bg-[#e25b55]" : selected.priority === "Sedang" ? "bg-[#a8baaa]" : "bg-[#9fb69e]"}`}>{selected.priority}</span>
        <div className="relative z-10 mx-auto mt-7 grid max-w-[900px] gap-3 px-[15px] md:grid-cols-2 md:px-10">
          {[selected, ...tasks.filter((task) => task.id !== selected.id).slice(0, 1)].map((task) => (
            <article className="rounded-[46px] bg-[#a9bead] px-8 pb-3 pt-2 text-white md:min-h-[260px] md:px-10 md:py-6" key={task.id}>
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
  if (tasks.length > 0 && tasks.every((task) => task.done))
    return (
      <section className="relative mx-auto min-h-[calc(100dvh-69px)] w-full max-w-[1120px] overflow-hidden bg-[#e3f5e5] bg-[url('/assets/pic/pic-62.png')] bg-cover px-4 pt-[105px] text-center text-[#075746] md:min-h-screen md:pt-24">
        <img className="mx-auto w-[225px] md:w-[280px]" src="/assets/pic/pic-31.png" alt="Maskot menyelesaikan tugas" />
        <h1 className="mt-5 text-[26px] font-bold md:text-4xl">Semua tugas selesai!</h1>
        <p className="mt-2 text-[16px] font-medium md:text-xl">Kamu sudah melakukan yang terbaik hari ini</p>
        <blockquote className="relative mx-auto mt-4 flex min-h-[164px] max-w-[358px] items-start justify-center rounded-[45px] bg-white px-8 pt-7 text-[16px] leading-6 text-[#174f38] md:max-w-[560px] md:text-xl">Jangan lupa istirahat ya,<br />kamu juga perlu waktu buat diri sendiri<img className="absolute -bottom-5 left-1/2 w-[120px] -translate-x-1/2" src="/assets/pic/pic-19.png" alt="" /></blockquote>
        <button className="mt-10 min-h-[50px] w-[250px] rounded-full bg-[#61aa91] text-[16px] text-white hover:bg-[#4c957d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#075746]" onClick={() => go("home")}>Kembali ke Beranda</button>
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
          <button className="grid size-11 place-items-center text-xl text-white focus-visible:outline-2 focus-visible:outline-[#087460]" onClick={() => setShowReminder(true)} aria-label="Reminder">
            <Icon icon={faBell} />
          </button>
        </div>
        <div className="-mt-2 flex items-center md:mt-0">
          <img className="h-[77px] w-[76px] object-contain md:h-28 md:w-28" src="/assets/pic/pic-17.png" alt="Maskot ReMind" width="86" height="77" />
          <div>
          <h1 className="text-[18px] font-semibold leading-[22px] md:text-2xl md:leading-7">
            Hai, Ramadhani
            <br />
            Septhea Dwi Putri
          </h1>
          <p className="text-[13px] font-bold text-white [text-shadow:0_2px_3px_rgba(34,82,54,.48)] md:text-base">“Yuk, selesaikan tugasmu satu per satu!”</p>
          </div>
        </div>
        <div className="mt-1 flex items-end justify-between md:mx-auto md:max-w-[820px]">
          <h2 className="text-[18px] font-medium md:text-2xl">Checklist Tugas</h2>
          <aside className="flex min-h-[78px] min-w-[155px] items-center justify-center gap-2 rounded-[18px] !border-2 !border-[#79a784] bg-white/30 md:min-w-[210px]">
            <b className="grid size-[57px] place-items-center rounded-full !border-[6px] !border-[#075746] bg-[#d9efdc] text-[16px] text-[#242424]">{percent}%</b>
            <span className="text-[17px] font-semibold">Selesai</span>
          </aside>
        </div>
        <button className="mx-auto mt-3 flex min-h-[61px] w-full max-w-[335px] items-center justify-center gap-4 rounded-full !border-[3px] !border-black bg-[#7faa8a] text-[18px] font-semibold text-white shadow-[7px_8px_0_#000] hover:bg-[#719b7c] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#087460] md:max-w-[520px]" onClick={() => setAdding(true)}>
          <Icon icon={faPlus} /> Tambah Tugas
        </button>
      </section>
      <section className="mx-auto min-h-[430px] w-full max-w-[1120px] bg-white px-[13px] pb-12 pt-4 text-[#174f38] md:px-12 md:py-8">
        <h2 className="ml-2 text-[18px] font-medium md:text-2xl">Hari Ini</h2>
        {visible.length ? (
          <div className="mx-auto mt-1 min-h-[365px] max-w-[900px] overflow-hidden rounded-[52px] bg-[#80aa8b] pt-6 md:grid md:grid-cols-2 md:gap-px md:rounded-[38px] md:p-6">
            {visible.map((t) => (
              <article className="relative flex min-h-[65px] items-center border-b border-white px-5 text-white md:rounded-2xl md:border md:px-4" key={t.id}>
                <button
                  className={`grid size-[28px] shrink-0 place-items-center rounded-sm !border-[3px] !border-white text-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${t.done ? "bg-white text-[#78aa8b]" : "bg-transparent"}`}
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
                  <h2 className="text-[12px] font-semibold leading-[14px]">{t.title}</h2>
                  {!t.done && <p className="text-[11px] font-semibold leading-[14px]">
                    {new Date(t.date).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>}
                  {!t.done && t.note && <small className="block text-[10px] leading-[12px]">{t.note}</small>}
                </button>
                <span className={`h-[11px] w-[73px] shrink-0 rounded-full ${t.priority === "Tinggi" ? "bg-[#ef6c80]" : t.priority === "Sedang" ? "bg-[#f4f486]" : "bg-[#a9c39f]"}`} aria-label={`Prioritas ${t.priority}`} />
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
        <div className="fixed inset-0 z-[100] grid place-items-center bg-black/10 px-4">
          <div className="w-full max-w-[360px] rounded-[48px] bg-white px-8 pb-7 pt-7 text-center text-[#111] shadow-xl md:max-w-[460px]" role="dialog" aria-modal="true" aria-label="Reminder tugas">
            <Icon className="text-[35px]" icon={faBell} />
            <h2 className="mt-1 text-[18px] font-semibold">Reminder</h2>
            <p className="mt-1 text-[17px] leading-[22px]">Tugas “Membuat PPT presentasi”<br />akan dimulai dalam 10 menit.</p>
            <div className="mt-10 flex justify-between gap-8"><button className="min-h-[40px] flex-1 rounded-full !border-[4px] !border-[#075b2a] bg-white text-[16px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]" onClick={() => setShowReminder(false)}>Nanti</button><button className="min-h-[40px] flex-1 rounded-full bg-[#075b2a] text-[16px] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460]" onClick={() => setShowReminder(false)}>Oke</button></div>
          </div>
        </div>
      )}
    </>
  );
}
function TaskForm({ close, save }) {
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
          </div>
          <div className="flex items-center md:mt-2">
            <img className="h-[77px] w-[76px] object-contain md:h-24 md:w-24" src="/assets/pic/pic-17.png" alt="Maskot ReMind" />
            <p className="text-[18px] font-semibold leading-[22px] text-[#174f38] md:text-2xl">Hai, Ramadhani<br />Septhea Dwi Putri<br /><b className="text-[13px] text-white [text-shadow:0_2px_3px_rgba(34,82,54,.48)] md:text-base">“Yuk, selesaikan tugasmu satu per satu!”</b></p>
          </div>
        </header>
      <form
        className="mx-auto max-w-[760px] space-y-2 px-10 pt-4 md:grid md:grid-cols-2 md:gap-x-8 md:space-y-0"
        onSubmit={(e) => {
          e.preventDefault();
          save(form);
        }}
      >
        <label className="block md:col-span-2"><span className="ml-1 text-[17px] font-semibold">Nama Tugas *</span><textarea required rows="2" className="mx-auto -mt-1 block h-[64px] w-full max-w-[292px] resize-none rounded-full !border-[3px] !border-black bg-[#78a985] px-5 py-2 text-center text-[14px] font-semibold leading-[19px] text-white outline-none focus-visible:ring-2 focus-visible:ring-[#087460] md:max-w-none" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
        <label className="block"><span className="ml-1 text-[17px] font-semibold">Tanggal*</span><input className="mx-auto -mt-1 block min-h-[64px] w-full max-w-[292px] rounded-full !border-[3px] !border-black bg-[#78a985] px-6 text-center text-[14px] font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-[#087460] md:max-w-none" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></label>
        <label className="block"><span className="ml-1 text-[17px] font-semibold">Waktu*</span><input className="mx-auto -mt-1 block min-h-[64px] w-full max-w-[292px] rounded-full !border-[3px] !border-black bg-[#78a985] px-6 text-center text-[14px] font-semibold text-white outline-none focus-visible:ring-2 focus-visible:ring-[#087460] md:max-w-none" type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></label>
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
            className="mx-auto mt-1 block min-h-[100px] w-full max-w-[282px] resize-none rounded-[8px] !border-[3px] !border-black px-4 py-3 text-[15px] outline-none focus-visible:ring-2 focus-visible:ring-[#087460] md:max-w-none"
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
    <section className="mx-auto min-h-[calc(100dvh-69px)] w-full max-w-[1120px] bg-[#d3edda] px-[22px] pb-5 pt-3 text-[#075746] md:grid md:min-h-screen md:grid-cols-[1fr_0.9fr] md:gap-x-12 md:px-14 md:py-9">
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
            onClick={() => setSeconds(defaults[mode])}
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
function Mood({ go, persist }) {
  const [mood, setMood] = useState("Happy");
  const [sleep, setSleep] = useState(7);
  const [stress, setStress] = useState(20);
  const [influences, setInfluences] = useState("");
  const [result, setResult] = useState(false);
  if (result)
    return (
      <section className="relative flex min-h-[calc(100svh-74px)] flex-col items-center overflow-hidden bg-[#e6f3e4] px-7 pb-5 pt-5 font-['Poppins'] text-[#174d3f] md:min-h-screen md:px-12 md:py-9">
        <img src="/assets/pic/pic-62.png" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45" />
        <button className="relative z-10 flex min-h-11 w-full cursor-pointer items-center gap-3 text-left text-[20px] font-semibold hover:text-[#087460] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] md:max-w-[760px] md:text-[27px]" onClick={() => setResult(false)}>
          <Icon icon={faArrowLeft} /> Hasil mood tracker
        </button>
        <div className="relative z-10 mt-7 flex min-h-[128px] w-[210px] items-center justify-center gap-2 rounded-[28px] bg-[#d5e4c8]/90 px-5 md:w-[340px]">
          <img src="/assets/pic/pic-31.png" alt="" className="w-[95px] object-contain md:w-[130px]" />
          <b className="text-[24px] leading-[1.55] md:text-[32px]">
            Mood
            <br />
            Tracker
          </b>
        </div>
        <article className="relative z-10 mt-[86px] w-full max-w-[262px] rounded-[18px] bg-[#fffdf6] px-6 pb-4 pt-5 shadow-[0_3px_8px_rgba(36,58,48,0.45)] md:mt-10 md:max-w-[540px] md:px-12">
          <h2 className="absolute -top-7 left-1/2 m-0 w-[208px] -translate-x-1/2 rounded-[22px] bg-[#91b779] py-2 text-center text-[17px] text-white md:w-[300px] md:text-xl">Your mood today</h2>
          {[
            [moodOptions.find(([name]) => name === mood)?.[1], mood],
            [faBed, `${sleep} jam`],
            [faBrain, stress < 35 ? "Rendah" : stress < 70 ? "Sedang" : "Tinggi"],
          ].map(([icon, value]) => (
            <p key={value} className="m-0 grid min-h-[48px] grid-cols-[54px_24px_1fr] items-center text-[20px]">
              <Icon icon={icon} className="text-[34px] text-[#087460]" /> <span>:</span> <b>{value}</b>
            </p>
          ))}
        </article>
        <article className="relative z-10 mt-11 w-full max-w-[330px] rounded-[22px] bg-[#fffdf6] px-4 pb-7 pt-10 shadow-[0_3px_8px_rgba(36,58,48,0.45)] md:max-w-[650px] md:px-10">
          <h2 className="absolute -top-6 left-1/2 m-0 w-[270px] -translate-x-1/2 rounded-[24px] bg-[#91b779] py-2 text-center text-[22px] text-white md:w-[360px]">Note for you</h2>
          <p className="m-0 text-justify text-[15px] font-semibold leading-[1.55] md:text-lg">
            Hari ini cukup baik, suasana hati stabil. Tugas kuliah lancar dan
            tidak terlalu banyak pikiran. Semoga besok tetap baik!
          </p>
        </article>
        <button className="relative z-10 mt-auto min-h-[32px] w-[218px] cursor-pointer rounded-[18px] bg-[#07816d] px-5 text-[15px] font-semibold text-white hover:bg-[#075f50] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746] md:mt-8 md:min-h-11 md:w-[280px] md:text-lg" onClick={() => go("screening")}>
          Next skrining stress ---&gt;
        </button>
      </section>
    );
  return (
    <section className="relative min-h-[calc(100svh-74px)] overflow-hidden bg-[#e6f3e4] px-3 pb-4 pt-4 font-['Poppins'] text-[#174d3f] md:grid md:min-h-screen md:grid-cols-[0.85fr_1.15fr] md:grid-rows-[auto_auto_1fr_auto] md:gap-x-7 md:px-12 md:py-9">
      <img src="/assets/pic/pic-62.png" alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45" />
      <button className="relative z-10 flex min-h-11 items-center gap-3 px-4 text-[20px] font-semibold md:col-span-2 md:text-[27px]" onClick={() => go("home")}>
        <Icon icon={faArrowLeft} /> Mood Tracker
      </button>
      <img className="relative z-10 mx-auto mt-1 block w-[110px] object-contain md:col-start-1 md:mt-6 md:w-[150px]" src="/assets/pic/pic-26.png" alt="" />
      <p className="relative z-10 mx-auto -mt-1 w-[338px] rounded-[32px] bg-[#b8d2aa]/80 py-2 text-center text-[14px] leading-[1.35] text-[#174d3f] md:col-start-1 md:row-start-3 md:mt-2 md:w-full md:max-w-[440px] md:text-lg">
        Hai, Ramadhani
        <br />
        Septhea Dwi Putri
        <br />
        <b>Yuk, cek mood kamu hari ini!</b>
      </p>
      <div className="relative z-10 mt-3 rounded-[24px] bg-[#fffdf6] pb-4 pt-8 md:col-start-1 md:row-start-4 md:mt-5 md:px-5 md:pb-7">
        <h2 className="absolute left-0 top-0 m-0 w-[150px] rounded-[20px] bg-[#91b779] py-1 text-center text-[17px] font-medium text-white">Mood</h2>
        <div className="grid grid-cols-5 gap-1 px-6 md:gap-3">
          {moodOptions.map(([m, icon, c]) => (
            <button
              key={m}
              aria-label={m}
              className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl py-1 text-[11px] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#087460] ${mood === m ? "bg-[#dcebd2]" : ""}`}
              onClick={() => setMood(m)}
            >
              <span className="grid size-[42px] place-items-center rounded-full border-2 border-white text-xl text-[#355f4f] shadow" style={{ backgroundColor: c }}><Icon icon={icon} /></span>
              <span>{m}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="relative z-10 mt-9 grid grid-cols-2 gap-3 md:col-start-2 md:row-start-2 md:mt-6 md:gap-5">
        <label className="grid min-h-[94px] grid-cols-[52px_1fr] items-center rounded-[12px] border border-[#718779] bg-[#fffdf6] px-2 py-2 shadow-[0_2px_5px_rgba(36,58,48,0.35)] md:min-h-[160px] md:p-5">
          <Icon icon={faBed} className="text-[38px] text-[#087460]" />
          <span className="text-center text-[13px] font-semibold md:text-lg">Kualitas<br />tidur</span>
          <input
            type="number"
            min="1"
            max="12"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            placeholder="Ketik disini jam tidur"
            className="col-span-2 h-[28px] rounded-[18px] border-0 bg-[#cedebf] px-3 text-[9px] outline-none focus-visible:ring-2 focus-visible:ring-[#087460] md:h-10 md:text-sm"
          />
        </label>
        <label className="grid min-h-[94px] grid-cols-[52px_1fr] items-center rounded-[12px] border border-[#718779] bg-[#fffdf6] px-2 py-2 shadow-[0_2px_5px_rgba(36,58,48,0.35)] md:min-h-[160px] md:p-5">
          <Icon icon={faBrain} className="text-[38px] text-[#087460]" />
          <span className="text-center text-[11px] font-semibold md:text-lg">Tingkat beban<br />mental/stres</span>
          <input
            type="number"
            min="0"
            max="100"
            value={stress}
            onChange={(e) => setStress(e.target.value)}
            placeholder="Ketik disini berapa %"
            className="col-span-2 h-[28px] rounded-[18px] border-0 bg-[#cedebf] px-3 text-[9px] outline-none focus-visible:ring-2 focus-visible:ring-[#087460] md:h-10 md:text-sm"
          />
        </label>
      </div>
      <label className="relative z-10 mx-auto mt-8 grid min-h-[143px] w-[256px] grid-cols-[72px_1fr] items-center rounded-[18px] border border-[#718779] bg-[#fffdf6] px-4 py-3 shadow-[0_3px_8px_rgba(36,58,48,0.45)] md:col-start-2 md:row-start-3 md:mt-5 md:min-h-[230px] md:w-full md:max-w-[600px] md:p-8">
        <Icon icon={faListCheck} className="text-[58px] text-[#087460] md:text-[72px]" />
        <span className="text-center text-[17px] font-semibold md:text-[24px]">Faktor pengaruh<br />mood</span>
        <textarea
          placeholder="Ketik disini"
          value={influences}
          onChange={(event) => setInfluences(event.target.value)}
          className="col-span-2 min-h-[42px] resize-none rounded-[22px] border-0 bg-[#cedebf] px-5 py-3 text-[11px] outline-none focus-visible:ring-2 focus-visible:ring-[#087460] md:min-h-[90px] md:text-base"
        />
      </label>
      <button
        className="relative z-10 ml-auto mt-[44px] block min-h-[30px] w-[187px] cursor-pointer rounded-[18px] bg-[#07816d] px-4 text-[19px] font-semibold text-white hover:bg-[#075f50] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#075746] md:col-start-2 md:row-start-4 md:mt-5 md:min-h-11 md:w-[240px]"
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
          Hai, Ramadhani
          <br />
          Septhea Dwi Putri
          <br />
              <b className="text-white [text-shadow:0_2px_4px_rgba(31,68,45,.48)]">Yuk, cek kondisi mentalmu!</b>
            </p>
          </div>
          <article className="mx-auto mt-3 w-full max-w-[320px] rounded-[43px] bg-[#80aa8b] px-7 pb-[42px] pt-[42px] text-white md:mt-0 md:max-w-[510px] md:px-12 md:py-12">
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
        <h1 className="-mt-1 text-center text-[28px] font-bold text-white [text-shadow:0_3px_5px_rgba(28,73,50,.55)] md:text-4xl">Hasil skrining</h1>
        <div className="mx-auto mt-9 grid max-w-[340px] grid-cols-2 gap-6 md:max-w-[620px] md:gap-10">
          <article className="flex min-h-[158px] flex-col items-center justify-center rounded-[38px] bg-[#f4faef] text-center">
            <Icon icon={faFaceSadTear} className="text-[47px] text-[#e5b04d]" aria-hidden="true" />
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
        <button className="mx-auto mt-5 flex min-h-[47px] w-full max-w-[230px] items-center justify-center gap-2 rounded-full bg-[#9cc17e] text-[17px] font-bold text-white [text-shadow:0_2px_2px_rgba(0,0,0,.28)] hover:bg-[#87ad69] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087460] md:max-w-[300px] md:text-xl" onClick={() => go("home")}>
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
          className="mx-auto mt-[37px] flex min-h-[47px] w-[230px] items-center justify-center gap-5 rounded-full bg-[#9cc17e] text-[19px] font-bold text-white [text-shadow:0_2px_2px_rgba(0,0,0,.3)] enabled:hover:bg-[#87ad69] disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#087460] md:mt-8"
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
          <img src="/assets/pic/pic-38.png" alt="" aria-hidden="true" />
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
            src="/assets/pic/pic-19.png"
            alt=""
            aria-hidden="true"
          />
          <img
            className="sos-corner sos-corner-flower"
            src="/assets/pic/pic-22.png"
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
    "/assets/pic/pic-47.png",
    "/assets/pic/pic-48.png",
    "/assets/pic/pic-49.png",
    "/assets/pic/pic-50.png",
    "/assets/pic/pic-51.png",
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
        src="/assets/pic/pic-46.png"
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
          src={playing > 0 ? covers[playing - 1] : "/assets/pic/pic-49.png"}
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
        <img src="/assets/pic/pic-67.png" alt="" />
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
    <div className="min-h-[calc(100svh-74px)] bg-[#cde9d3] font-['Poppins'] text-[#174d3f] md:grid md:min-h-screen md:grid-cols-[minmax(400px,0.9fr)_minmax(500px,1.1fr)] md:gap-7 md:bg-[#eef5ec] md:p-8">
      <section className="relative overflow-hidden rounded-b-[58px] bg-[#a9cbb0] px-9 pb-7 pt-4 md:rounded-[32px] md:px-12 md:py-10 md:shadow-[0_18px_45px_rgba(22,84,67,0.12)]">
        <img src="/assets/pic/pic-61.png" width="818" height="276" alt="" aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[86px] w-full object-cover md:h-[120px]" />
        <button className="absolute right-4 top-4 z-10 grid size-12 cursor-pointer place-items-center rounded-full bg-[#087460] text-2xl text-white hover:bg-[#075746] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" onClick={() => setEditing(true)} aria-label="Pengaturan profil">
          <Icon icon={faGear} />
        </button>
        <div className="relative z-10 mx-auto mt-0 grid size-[76px] place-items-center rounded-full border-[5px] border-white bg-[#087460] text-[38px] text-white md:mt-5 md:size-28 md:text-[54px]">
          <Icon icon={faUser} />
        </div>
        <h1 className="mb-0 mt-2 text-center text-[16px] font-semibold md:text-[25px]">{user.name}</h1>
        <p className="m-0 text-center text-[12px] font-semibold md:text-base">{user.age} · {user.gender}</p>
        <button className="mx-auto mt-1 flex min-h-[36px] w-full cursor-pointer items-center justify-center gap-2 rounded-[10px] bg-[#f6f8eb] px-5 text-[16px] font-semibold hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#087460] md:mt-3 md:max-w-[420px]" onClick={() => setEditing(true)}>
          <Icon icon={faUser} /> Kelola Profil
        </button>
        <div className="mx-auto mt-1 max-w-[440px] md:mt-3">
          <h2 className="mb-1 mt-0 text-[18px] font-semibold">Keluarga &amp; Teman</h2>
          {[1, 2, 3].map((item) => (
            <button className="flex min-h-[38px] w-full cursor-pointer items-center gap-2 text-left text-[15px] font-medium hover:text-[#087460] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#087460] md:min-h-[42px]" key={item} onClick={() => go("contacts")}>
              <span className="grid size-9 place-items-center rounded-full bg-[#2f7558] text-white"><Icon icon={faUser} /></span>
              Tambah Kontak Baru
            </button>
          ))}
        </div>
        <Icon icon={faChevronRight} className="absolute bottom-1 left-1/2 rotate-90 text-2xl" aria-hidden="true" />
      </section>
      <section className="mx-3 my-3 overflow-hidden rounded-[54px] bg-[#7fac8b] px-0 pb-2 pt-4 md:m-0 md:rounded-[32px] md:px-4 md:py-6 md:shadow-[0_18px_45px_rgba(22,84,67,0.12)]">
        <blockquote className="mx-4 mb-4 mt-0 text-center font-['Playfair_Display'] text-[14px] font-bold text-[#fff36e] md:text-xl">
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
