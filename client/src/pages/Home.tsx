/* Coastal Heirloom: editorial coastal modern, tactile paper, asymmetric rhythm, quiet motion. Keep content warm, specific, and never generic. */
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Copy,
  ExternalLink,
  Heart,
  MapPin,
  Menu,
  Music2,
  Pause,
  Play,
  Quote,
  Send,
  X,
} from "lucide-react";

const CONFIG = {
  couple: "Alya & Raka",
  bride: "Alya Putri",
  groom: "Raka Mahendra",
  nicknames: "Alya & Raka",
  parents: "Putri pertama dari Bapak Hendra Putra & Ibu Sari Lestari\nPutra kedua dari Bapak Bima Mahendra & Ibu Dina Wulandari",
  dateLabel: "12 Desember 2026",
  dateShort: "12.12.26",
  weekday: "Sabtu",
  ceremonyTime: "15.30 — 17.00 WIB",
  receptionTime: "18.30 — 21.00 WIB",
  venue: "The Cove House",
  address: "Jl. Pantai Senja No. 8, Sanur, Bali",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=The+Cove+House+Sanur+Bali",
  calendarStart: "20261212T073000Z",
  calendarEnd: "20261212T130000Z",
  timezone: "Asia/Makassar",
  audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  ewalletProvider: "DANA",
  ewalletNumber: "0812 3456 7890",
  bank: "BCA",
  accountNumber: "1234567890",
  accountHolder: "Alya Putri",
  paymentLink: "https://link.dana.id/alyaraka",
  heroImage: "/manus-storage/coastal-heirloom-hero_d42f7047.jpg",
  emblem: "/manus-storage/coastal-heirloom-emblem_c12196a7.png",
};

const GALLERY = [
  {
    src: "/manus-storage/coastal-heirloom-gallery-01_0a01f452.jpg",
    alt: "Tangan yang saling berdekatan di atas meja kayu dengan linen dan kerang kecil",
    caption: "Di antara hal-hal sederhana",
    ratio: "portrait",
  },
  {
    src: "/manus-storage/coastal-heirloom-gallery-02_410c7935.jpg",
    alt: "Dua sosok kecil berjalan di jalur berumput menghadap garis pantai",
    caption: "Menuju satu arah",
    ratio: "landscape",
  },
  {
    src: "/manus-storage/coastal-heirloom-gallery-03_3d431816.jpg",
    alt: "Detail cincin, sea glass, dan bunga kering di atas kertas bertekstur",
    caption: "Yang kami simpan",
    ratio: "tall",
  },
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1000&q=85",
    alt: "Pasangan berjalan berdampingan di tepi laut dalam cahaya sore",
    caption: "Sore yang kami pilih",
    ratio: "landscape",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=900&q=85",
    alt: "Detail busana putih dan buket bunga kecil dengan suasana lembut",
    caption: "Sebuah janji kecil",
    ratio: "portrait",
  },
  {
    src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?auto=format&fit=crop&w=900&q=85",
    alt: "Bayangan dua orang di atas pasir dekat garis air",
    caption: "Dan hari ini",
    ratio: "tall",
  },
];

function getGuestName() {
  const value = new URLSearchParams(window.location.search).get("to");
  const cleaned = (value ?? "").replace(/\s+/g, " ").trim();
  return cleaned ? cleaned.slice(0, 72) : "Tamu undangan";
}

function makeCalendarUrl() {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: `Pernikahan ${CONFIG.couple}`,
    dates: `${CONFIG.calendarStart}/${CONFIG.calendarEnd}`,
    details: `Akad dan resepsi ${CONFIG.couple}. Mohon hadir dengan hangat.`,
    location: `${CONFIG.venue}, ${CONFIG.address}`,
    ctz: CONFIG.timezone,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function formatCountdown(target: number) {
  const remaining = Math.max(0, target - Date.now());
  const totalSeconds = Math.floor(remaining / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function copyText(value: string) {
  if (navigator.clipboard?.writeText) return navigator.clipboard.writeText(value);
  const area = document.createElement("textarea");
  area.value = value;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  document.execCommand("copy");
  area.remove();
  return Promise.resolve();
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <div className="section-label">
      <AppLogo small />
      <span>{number}</span>
      <span>{children}</span>
    </div>
  );
}

function AppLogo({ small = false }: { small?: boolean }) {
  return <img className={small ? "app-logo app-logo--small" : "app-logo"} src={CONFIG.emblem} alt="Emblem Alya dan Raka" />;
}

export default function Home() {
  const guestName = useMemo(getGuestName, []);
  const [coverVisible, setCoverVisible] = useState(true);
  const [opening, setOpening] = useState(false);
  const [ready, setReady] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [countdown, setCountdown] = useState(() => formatCountdown(new Date("2026-12-12T15:30:00+08:00").getTime()));
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [rsvpStatus, setRsvpStatus] = useState("Hadir");
  const [rsvpName, setRsvpName] = useState("");
  const [rsvpMessage, setRsvpMessage] = useState("");
  const [rsvpFeedback, setRsvpFeedback] = useState("");
  const [guestbook, setGuestbook] = useState<Array<{ name: string; status: string; message: string; time: string }>>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("alya-raka-guestbook");
    if (stored) {
      try {
        setGuestbook(JSON.parse(stored));
      } catch {
        localStorage.removeItem("alya-raka-guestbook");
      }
    }
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(formatCountdown(new Date("2026-12-12T15:30:00+08:00").getTime())), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const elements = document.querySelectorAll<HTMLElement>(".reveal");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 },
    );
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [ready]);

  useEffect(() => {
    document.body.classList.toggle("lightbox-open", lightboxIndex !== null);
    return () => document.body.classList.remove("lightbox-open");
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") setLightboxIndex((current) => current === null ? null : (current + 1) % GALLERY.length);
      if (event.key === "ArrowLeft") setLightboxIndex((current) => current === null ? null : (current - 1 + GALLERY.length) % GALLERY.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [lightboxIndex]);

  const openInvitation = async () => {
    setOpening(true);
    setReady(true);
    const audio = audioRef.current;
    if (audio) {
      try {
        await audio.play();
        setMusicPlaying(true);
      } catch {
        setMusicPlaying(false);
      }
    }
    window.setTimeout(() => setCoverVisible(false), 760);
  };

  const toggleMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicPlaying) {
      audio.pause();
      setMusicPlaying(false);
    } else {
      try {
        await audio.play();
        setMusicPlaying(true);
      } catch {
        setMusicPlaying(false);
      }
    }
  };

  const handleCopy = async (key: string, value: string) => {
    await copyText(value);
    setCopied(key);
    window.setTimeout(() => setCopied(null), 2000);
  };

  const handleRsvp = (event: FormEvent) => {
    event.preventDefault();
    if (!rsvpName.trim() || !rsvpMessage.trim()) {
      setRsvpFeedback("Isi nama dan pesan singkatmu terlebih dahulu.");
      return;
    }
    const next = [
      { name: rsvpName.trim().slice(0, 80), status: rsvpStatus, message: rsvpMessage.trim().slice(0, 240), time: new Intl.DateTimeFormat("id-ID", { day: "numeric", month: "short", year: "numeric" }).format(new Date()) },
      ...guestbook,
    ];
    setGuestbook(next);
    localStorage.setItem("alya-raka-guestbook", JSON.stringify(next));
    setRsvpFeedback("Terima kasih — pesanmu sudah tersimpan di perangkat ini.");
    setRsvpName("");
    setRsvpMessage("");
  };

  const eventCalendarUrl = makeCalendarUrl();

  return (
    <div className={`invitation-shell ${ready ? "is-ready" : ""}`}>
      <audio ref={audioRef} src={CONFIG.audioUrl} loop preload="none" aria-label="Musik latar undangan" />

      {coverVisible && (
        <section className={`cover ${opening ? "cover--opening" : ""}`} aria-label="Sampul undangan">
          <img className="cover__image" src={CONFIG.heroImage} alt="Suasana pesisir yang tenang dengan stationery dan linen" />
          <div className="cover__veil" />
          <div className="cover__grain" />
          <div className="cover__content">
            <div className="cover__topline"><span>THE COASTAL EDITION</span><span>{CONFIG.dateShort}</span></div>
            <div className="cover__center">
              <AppLogo />
              <p className="eyebrow eyebrow--light">A private note, for you</p>
              <h1>{CONFIG.couple.split(" & ")[0]}<em>&</em>{CONFIG.couple.split(" & ")[1]}</h1>
              <p className="cover__date">{CONFIG.weekday}, {CONFIG.dateLabel}</p>
            </div>
            <div className="cover__bottom">
              <p>Untuk <strong>{guestName}</strong></p>
              <button className="button button--light cover__button" onClick={openInvitation} type="button">
                Buka undangan <ArrowDownRight size={17} strokeWidth={1.5} />
              </button>
              <span className="cover__hint">Scroll untuk membaca cerita kami</span>
            </div>
          </div>
        </section>
      )}

      <header className="site-header">
        <a className="header-brand" href="#top" aria-label="Kembali ke atas"><AppLogo small /><span>AR / 12.12.26</span></a>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          <a href="#story">Cerita</a><a href="#details">Detail acara</a><a href="#gallery">Galeri</a><a href="#rsvp">RSVP</a><a href="#gift">Tanda kasih</a>
        </nav>
        <span className="header-date">SANUR, BALI</span>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-section__image-wrap"><img src={CONFIG.heroImage} alt="Pemandangan pesisir dengan stationery untuk undangan Alya dan Raka" /></div>
          <div className="hero-section__copy reveal">
            <p className="eyebrow">12 — 12 — 26 / Sanur, Bali</p>
            <h2>Satu sore, dua nama,<br /><em>satu arah.</em></h2>
            <p className="hero-section__lede">Dengan segala hal baik yang telah membawa kami sampai di sini, kami mengundangmu untuk hadir dalam hari yang kami pilih untuk selamanya.</p>
            <a className="text-link" href="#story">Baca cerita kami <ArrowDownRight size={18} strokeWidth={1.5} /></a>
          </div>
          <div className="hero-section__mark"><span>01</span><span>THE BEGINNING</span></div>
        </section>

        <section className="story-section section-pad" id="story">
          <div className="content-rail"><SectionLabel number="01" >Cerita</SectionLabel></div>
          <div className="story-section__intro reveal"><p className="eyebrow">A small beginning</p><h2>Dimulai dari percakapan<br /><em>yang tidak direncanakan.</em></h2></div>
          <div className="story-section__body reveal"><Quote size={28} strokeWidth={1} /><p>Awalnya hanya satu pesan tentang tempat makan di dekat laut. Lalu menjadi percakapan yang selalu kami cari, perjalanan kecil di akhir pekan, dan rumah yang kami temukan di satu sama lain.</p><p>Hari ini, kami ingin merayakan bab berikutnya bersama orang-orang yang membuat perjalanan ini berarti.</p><span className="signature">Alya & Raka</span></div>
          <div className="story-section__image reveal"><img src="https://images.unsplash.com/photo-1474552226712-ac0f0961a954?auto=format&fit=crop&w=1200&q=85" alt="Detail bunga liar di atas kertas dengan cahaya sore" /></div>
        </section>

        <section className="details-section section-pad" id="details">
          <div className="content-rail"><SectionLabel number="02">Hari yang dinanti</SectionLabel></div>
          <div className="details-section__heading reveal"><p className="eyebrow">Keep this day close</p><h2>Datanglah dengan<br /><em>hati yang lapang.</em></h2></div>
          <div className="countdown reveal" aria-label="Hitung mundur menuju acara"><div className="countdown__intro">Menuju hari kami</div><div className="countdown__numbers"><div><strong>{countdown.days}</strong><span>hari</span></div><i>:</i><div><strong>{String(countdown.hours).padStart(2, "0")}</strong><span>jam</span></div><i>:</i><div><strong>{String(countdown.minutes).padStart(2, "0")}</strong><span>menit</span></div><i>:</i><div><strong>{String(countdown.seconds).padStart(2, "0")}</strong><span>detik</span></div></div></div>
          <div className="event-grid reveal">
            <article className="event-item"><span className="event-item__number">01</span><div><p className="eyebrow">Akad nikah</p><h3>{CONFIG.weekday}, 12 Desember 2026</h3><p>{CONFIG.ceremonyTime}</p><p className="event-item__venue">{CONFIG.venue}<br />{CONFIG.address}</p></div></article>
            <article className="event-item"><span className="event-item__number">02</span><div><p className="eyebrow">Resepsi</p><h3>{CONFIG.weekday}, 12 Desember 2026</h3><p>{CONFIG.receptionTime}</p><p className="event-item__venue">{CONFIG.venue}<br />{CONFIG.address}</p></div></article>
          </div>
          <div className="event-actions reveal"><a className="button button--ink" href={CONFIG.mapsUrl} target="_blank" rel="noreferrer"><MapPin size={16} /> Lihat lokasi <ExternalLink size={14} /></a><a className="button button--outline" href={eventCalendarUrl} target="_blank" rel="noreferrer"><CalendarDays size={16} /> Simpan ke Google Calendar</a></div>
        </section>

        <section className="gallery-section section-pad" id="gallery">
          <div className="content-rail"><SectionLabel number="03">Potongan hari kami</SectionLabel></div>
          <div className="gallery-heading reveal"><p className="eyebrow">Collected moments</p><h2>Yang ingin<br /><em>kami simpan.</em></h2><p>Beberapa potongan kecil dari perjalanan yang membawa kami ke hari ini.</p></div>
          <div className="gallery-grid reveal">{GALLERY.map((photo, index) => <button key={photo.src} className={`gallery-item gallery-item--${photo.ratio}`} onClick={() => setLightboxIndex(index)} type="button" aria-label={`Lihat foto ${index + 1}: ${photo.alt}`}><img src={photo.src} alt={photo.alt} loading="lazy" /><span className="gallery-item__overlay"><span>{String(index + 1).padStart(2, "0")}</span><span>{photo.caption}</span><ZoomIcon /></span></button>)}</div>
        </section>

        <section className="rsvp-section section-pad" id="rsvp">
          <div className="content-rail"><SectionLabel number="04">RSVP</SectionLabel></div>
          <div className="rsvp-layout">
            <div className="rsvp-copy reveal"><p className="eyebrow">A note from you</p><h2>Tinggalkan satu kalimat<br /><em>untuk hari kami.</em></h2><p>Konfirmasi kehadiranmu akan membantu kami menyiapkan tempat yang hangat untuk semua yang datang.</p></div>
            <form className="rsvp-form reveal" onSubmit={handleRsvp} noValidate><div className="form-stamp"><span>REPLY CARD</span><span>POSTED FROM SANUR</span></div><label htmlFor="rsvp-name">Nama lengkap<input id="rsvp-name" value={rsvpName} onChange={(event) => setRsvpName(event.target.value)} placeholder="Tulis namamu" autoComplete="name" /></label><fieldset><legend>Kehadiran</legend><div className="radio-row">{["Hadir", "Belum pasti", "Tidak dapat hadir"].map((status) => <label key={status} className={`radio-option ${rsvpStatus === status ? "is-selected" : ""}`}><input type="radio" name="attendance" value={status} checked={rsvpStatus === status} onChange={(event) => setRsvpStatus(event.target.value)} />{status}</label>)}</div></fieldset><label htmlFor="rsvp-message">Pesan ucapan<textarea id="rsvp-message" value={rsvpMessage} onChange={(event) => setRsvpMessage(event.target.value)} placeholder="Tulis sesuatu yang ingin kami baca" rows={4} /></label><button className="button button--ink button--submit" type="submit"><Send size={16} /> Kirim konfirmasi</button>{rsvpFeedback && <p className="form-feedback" role="status"><Check size={15} /> {rsvpFeedback}</p>}</form>
          </div>
          <div className="guestbook reveal"><div className="guestbook__header"><div><p className="eyebrow">Buku tamu</p><h3>Pesan untuk Alya & Raka</h3></div><span>{guestbook.length} pesan tersimpan</span></div>{guestbook.length === 0 ? <div className="guestbook__empty">Pesan ucapanmu akan muncul di sini setelah dikirim.</div> : <div className="guestbook__list">{guestbook.map((entry, index) => <article key={`${entry.name}-${index}`}><div><strong>{entry.name}</strong><span>{entry.status} · {entry.time}</span></div><p>“{entry.message}”</p></article>)}</div>}</div>
        </section>

        <section className="gift-section section-pad" id="gift">
          <div className="content-rail"><SectionLabel number="05">Tanda kasih</SectionLabel></div>
          <div className="gift-layout reveal"><div className="gift-copy"><p className="eyebrow">A thoughtful gesture</p><h2>Doa adalah<br /><em>hadiah pertama.</em></h2><p>Jika ingin mengirimkan tanda kasih, kamu dapat menggunakan salah satu pilihan di bawah ini. Terima kasih telah ikut merayakan kami.</p></div><div className="gift-details"><div className="gift-block"><div className="gift-block__head"><span>{CONFIG.ewalletProvider}</span><span>01</span></div><div className="qr-frame"><div className="qr-placeholder" aria-label={`QR code ${CONFIG.ewalletProvider}`}><span>QR</span><small>{CONFIG.ewalletProvider}</small></div></div><p className="gift-name">{CONFIG.accountHolder}</p><p className="gift-number">{CONFIG.ewalletNumber}</p><button className="copy-button" onClick={() => handleCopy("ewallet", CONFIG.ewalletNumber)} type="button"><Copy size={14} /> {copied === "ewallet" ? "Tersalin" : "Salin nomor e-wallet"}</button></div><div className="gift-block gift-block--bank"><div className="gift-block__head"><span>{CONFIG.bank}</span><span>02</span></div><p className="gift-bank-label">Nomor rekening</p><p className="gift-number">{CONFIG.accountNumber}</p><p className="gift-name">a.n. {CONFIG.accountHolder}</p><button className="copy-button" onClick={() => handleCopy("bank", CONFIG.accountNumber)} type="button"><Copy size={14} /> {copied === "bank" ? "Tersalin" : "Salin nomor rekening"}</button></div></div></div>
        </section>

        <footer className="site-footer"><div className="footer-stamp"><AppLogo /><span>THE COASTAL EDITION</span></div><p>Dengan hangat,<br /><strong>Alya & Raka</strong></p><span>AR / 12.12.26 / SANUR</span></footer>
      </main>

      <button className="music-control" onClick={toggleMusic} type="button" aria-label={musicPlaying ? "Jeda musik" : "Putar musik"} title={musicPlaying ? "Jeda musik" : "Putar musik"}>{musicPlaying ? <Pause size={16} /> : <Play size={16} />}<span>{musicPlaying ? "Jeda" : "Musik"}</span></button>
      <nav className="mobile-nav" aria-label="Navigasi cepat"><a href="#story"><Heart size={15} />Cerita</a><a href="#details"><Clock3 size={15} />Acara</a><a href="#gallery"><Menu size={15} />Galeri</a><a href="#rsvp"><Send size={15} />RSVP</a><a href="#gift"><span className="mobile-nav__dot">AR</span>Kasih</a></nav>

      {lightboxIndex !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Galeri foto" onClick={() => setLightboxIndex(null)}><button className="lightbox__close" type="button" aria-label="Tutup galeri" onClick={() => setLightboxIndex(null)}><X size={22} /></button><button className="lightbox__prev" type="button" aria-label="Foto sebelumnya" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + GALLERY.length) % GALLERY.length); }}><ArrowLeft size={22} /></button><figure onClick={(event) => event.stopPropagation()}><img src={GALLERY[lightboxIndex].src} alt={GALLERY[lightboxIndex].alt} /><figcaption><span>{String(lightboxIndex + 1).padStart(2, "0")} / {String(GALLERY.length).padStart(2, "0")}</span>{GALLERY[lightboxIndex].caption}</figcaption></figure><button className="lightbox__next" type="button" aria-label="Foto berikutnya" onClick={(event) => { event.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % GALLERY.length); }}><ArrowRight size={22} /></button></div>}
    </div>
  );
}

function ZoomIcon() { return <span className="zoom-icon" aria-hidden="true">↗</span>; }
