import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { motion, useScroll, useSpring, useTransform, AnimatePresence } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  Instagram,
  Download,
  ArrowUpRight,
  Sparkles,
  Code2,
  Brain,
  Cpu,
  Database,
  Cloud,
  Eye,
  Layers,
  Rocket,
  Trophy,
  Award,
  GraduationCap,
  Briefcase,
  Menu,
  X,
  ArrowUp,
  Star,
  Github as GithubIcon,
  ExternalLink,
} from "lucide-react";
import heroOrb from "@/assets/hero-orb.jpg";
import profileImg from "@/assets/profile.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <BackgroundFX />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

/* ---------- Background FX ---------- */
function BackgroundFX() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute -left-40 top-0 h-[600px] w-[600px] rounded-full bg-[#8b5cf6]/20 blur-[120px] animate-pulse-glow" />
      <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-[#06b6d4]/15 blur-[120px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-[#3b82f6]/15 blur-[120px] animate-pulse-glow" style={{ animationDelay: "4s" }} />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse at center, black 30%, transparent 70%)",
        }}
      />
      <Stars />
    </div>
  );
}

function Stars() {
  const stars = Array.from({ length: 40 }, (_, i) => i);
  return (
    <>
      {stars.map((i) => {
        const top = (i * 37) % 100;
        const left = (i * 53) % 100;
        const delay = (i % 10) * 0.3;
        return (
          <div
            key={i}
            className="absolute h-[2px] w-[2px] rounded-full bg-white/60 animate-pulse-glow"
            style={{ top: `${top}%`, left: `${left}%`, animationDelay: `${delay}s` }}
          />
        );
      })}
    </>
  );
}

/* ---------- Scroll Progress ---------- */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0% 50%" }}
      className="fixed left-0 top-0 z-[60] h-[2px] w-full bg-gradient-brand"
    />
  );
}

/* ---------- Navbar ---------- */
const NAV_ITEMS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Awards", href: "#achievements" },
  { label: "Contact", href: "#contact" },
];

function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY.current && y > 200);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed left-0 right-0 top-0 z-50 transition-all ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6">
        <a href="#top" className="group flex items-center gap-2">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.1 }}
            transition={{ duration: 0.6 }}
            className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-brand text-sm font-bold text-black shadow-[0_0_20px_rgba(139,92,246,0.5)]"
          >
            T
          </motion.div>
          <span className="font-display text-sm font-semibold tracking-wide">
            Tanishttha
          </span>
        </a>

        <nav className="hidden items-center gap-1 rounded-full glass px-2 py-2 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative rounded-full px-4 py-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-black transition-transform hover:scale-105 md:inline-flex"
        >
          Let's talk <ArrowUpRight className="h-4 w-4" />
        </a>

        <button
          className="rounded-full glass p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mx-6 mt-3 rounded-2xl glass-strong p-4 md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      setMouse({ x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden pt-32"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 md:grid-cols-[1.15fr_1fr] md:items-center">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs text-muted-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Available for select collaborations
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-display text-5xl font-semibold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
          >
            Engineering{" "}
            <span className="text-gradient animate-gradient">intelligent</span>
            <br /> systems, end to end.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            I'm <span className="text-foreground">Tanishttha Sehgal</span> — an
            AI/ML engineer building production-grade computer vision, NLP, and
            LLM-powered systems with a full-stack React, Flask & FastAPI
            backbone.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105"
            >
              <Sparkles className="h-4 w-4" />
              Explore my work
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-semibold text-foreground transition-all hover:bg-white/10"
            >
              <Download className="h-4 w-4" /> Résumé
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 1 }}
            className="mt-14 grid grid-cols-3 gap-6 max-w-md"
          >
            {[
              { k: "8.83", v: "CGPA / 10" },
              { k: "3", v: "Deployed AI apps" },
              { k: "6+", v: "Awards & wins" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-2xl font-semibold text-gradient">
                  {s.k}
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            transform: `perspective(1000px) rotateY(${mouse.x * 8}deg) rotateX(${-mouse.y * 8}deg)`,
          }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-brand opacity-40 blur-3xl" />
          <div className="animate-float relative h-full w-full">
            <img
              src={heroOrb}
              alt="Iridescent glass orb representing Tanishttha's creative work"
              width={1024}
              height={1024}
              className="h-full w-full object-contain drop-shadow-[0_0_60px_rgba(139,92,246,0.5)]"
            />
          </div>
          {/* Orbiting rings */}
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 30, ease: "linear", repeat: Infinity }}
            className="absolute inset-8 rounded-full border border-dashed border-white/10"
          />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs uppercase tracking-[0.3em] text-muted-foreground"
      >
        Scroll
      </motion.div>
    </section>
  );
}

/* ---------- Section wrapper ---------- */
function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="h-1 w-1 rounded-full bg-gradient-brand" />
            {eyebrow}
          </div>
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-4 text-muted-foreground">{subtitle}</p>
          )}
        </motion.div>
        {children}
      </div>
    </section>
  );
}

/* ---------- About ---------- */
function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title={
        <>
          A designer's eye, an{" "}
          <span className="text-gradient">engineer's mind.</span>
        </>
      }
    >
      <div className="grid gap-12 md:grid-cols-[1fr_1.4fr] md:items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl"
        >
          <div className="absolute -inset-1 rounded-3xl bg-gradient-brand opacity-70 blur-xl" />
          <div className="relative h-full w-full overflow-hidden rounded-3xl border border-white/10">
            <img
              src={profileImg}
              alt="Portrait of Tanishttha"
              loading="lazy"
              width={768}
              height={960}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
        </motion.div>

        <div className="space-y-6">
          <p className="text-lg leading-relaxed text-muted-foreground">
            I build at the intersection of{" "}
            <span className="text-foreground">artificial intelligence</span>{" "}
            and product design — shipping tools that feel considered,
            performant, and quietly magical. My work spans computer vision
            research, full-stack engineering, and design systems that scale.
          </p>
          <p className="text-lg leading-relaxed text-muted-foreground">
            Previously I've contributed to research labs, shipped production
            ML pipelines, and led teams to podium finishes at international
            hackathons.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            {[
              { icon: GraduationCap, k: "B.Tech CSE", v: "AI Specialization" },
              { icon: Trophy, k: "12+ Awards", v: "Hackathons & research" },
              { icon: Briefcase, k: "3 Internships", v: "AI & product teams" },
              { icon: Star, k: "1500+", v: "GitHub stars" },
            ].map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-4"
              >
                <s.icon className="mb-3 h-5 w-5 text-[color:var(--glow-purple)]" />
                <div className="font-display text-lg font-semibold">{s.k}</div>
                <div className="text-xs text-muted-foreground">{s.v}</div>
              </motion.div>
            ))}
          </div>

          <a
            href="#contact"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:scale-105"
          >
            <Download className="h-4 w-4" /> Download résumé
          </a>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Skills ---------- */
const SKILLS = [
  { icon: Brain, name: "Artificial Intelligence", level: 95, tags: ["LLMs", "RAG", "Agents"] },
  { icon: Eye, name: "Computer Vision", level: 92, tags: ["OpenCV", "YOLO", "Diffusion"] },
  { icon: Cpu, name: "Machine Learning", level: 90, tags: ["PyTorch", "TensorFlow", "Sklearn"] },
  { icon: Code2, name: "Frontend Engineering", level: 94, tags: ["React", "Next.js", "TS"] },
  { icon: Layers, name: "Backend & APIs", level: 88, tags: ["Node", "Python", "FastAPI"] },
  { icon: Database, name: "Databases", level: 85, tags: ["Postgres", "Redis", "Vector DBs"] },
  { icon: Cloud, name: "Cloud & DevOps", level: 82, tags: ["AWS", "Docker", "CI/CD"] },
  { icon: Sparkles, name: "Design Craft", level: 90, tags: ["Figma", "Motion", "Systems"] },
];

function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>A toolkit tuned for <span className="text-gradient">craft</span>.</>}
      subtitle="From research notebooks to production-grade interfaces, an end-to-end stack for shipping intelligent products."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {SKILLS.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -6, rotate: -1 }}
            className="group relative overflow-hidden rounded-2xl glass p-6 transition-shadow hover:shadow-[0_0_40px_-10px_rgba(139,92,246,0.5)]"
          >
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-brand opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50" />
            <s.icon className="mb-4 h-6 w-6 text-[color:var(--glow-cyan)]" />
            <h3 className="font-display text-lg font-semibold">{s.name}</h3>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${s.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: i * 0.05 + 0.2 }}
                className="h-full bg-gradient-brand"
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {s.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.02] px-2 py-0.5 text-[10px] text-muted-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Projects ---------- */
const PROJECTS = [
  {
    title: "Aurora Vision",
    category: "AI",
    desc: "Real-time multimodal assistant blending vision, voice, and reasoning for creative workflows.",
    tags: ["Next.js", "PyTorch", "WebRTC"],
    gradient: "from-purple-500/40 via-pink-500/30 to-cyan-500/30",
  },
  {
    title: "Prism CV",
    category: "Computer Vision",
    desc: "Edge-optimized object detection pipeline running 60fps on-device with sub-2% error.",
    tags: ["PyTorch", "ONNX", "Rust"],
    gradient: "from-cyan-500/40 via-blue-500/30 to-indigo-500/30",
  },
  {
    title: "Lumen Studio",
    category: "Web",
    desc: "Design-forward marketing site with award-winning motion and 99 Lighthouse score.",
    tags: ["Next.js", "GSAP", "Three.js"],
    gradient: "from-amber-500/30 via-rose-500/30 to-purple-500/30",
  },
  {
    title: "Nebula ML",
    category: "Machine Learning",
    desc: "Distributed training platform reducing model iteration time by 4x for research teams.",
    tags: ["Ray", "Kubernetes", "S3"],
    gradient: "from-indigo-500/40 via-purple-500/30 to-fuchsia-500/30",
  },
  {
    title: "Signal Papers",
    category: "Research",
    desc: "Novel attention mechanism for temporal signal classification. Published at NeurIPS workshop.",
    tags: ["Research", "PyTorch", "LaTeX"],
    gradient: "from-emerald-500/30 via-teal-500/30 to-cyan-500/30",
  },
  {
    title: "Orbit Analytics",
    category: "Web",
    desc: "Realtime product analytics dashboard powering decisions for 200+ SaaS teams.",
    tags: ["React", "ClickHouse", "tRPC"],
    gradient: "from-blue-500/30 via-cyan-500/30 to-teal-500/30",
  },
];

const FILTERS = ["All", "AI", "Web", "Machine Learning", "Computer Vision", "Research"];

function Projects() {
  const [filter, setFilter] = useState("All");
  const filtered = PROJECTS.filter((p) => filter === "All" || p.category === filter);
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title={<>Products, research & <span className="text-gradient">experiments</span>.</>}
      subtitle="A curated selection of things I've shipped, researched, and obsessed over."
    >
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
              filter === f
                ? "bg-white text-black"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {filtered.map((p, i) => (
            <motion.article
              key={p.title}
              layout
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-3xl glass"
            >
              <div className={`relative aspect-[16/10] overflow-hidden bg-gradient-to-br ${p.gradient}`}>
                <div className="absolute inset-0 backdrop-blur-3xl" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="h-40 w-40 rounded-full border border-white/20"
                  />
                  <div className="absolute h-24 w-24 rounded-full bg-gradient-brand opacity-70 blur-2xl" />
                  <div className="absolute font-display text-5xl font-bold text-white/90 mix-blend-overlay">
                    {p.title.split(" ")[0]}
                  </div>
                </div>
                <div className="absolute left-4 top-4 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-widest">
                  {p.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-display text-xl font-semibold">{p.title}</h3>
                  <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-foreground" />
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {p.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-3">
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs hover:bg-white/10"
                  >
                    <GithubIcon className="h-3.5 w-3.5" /> Code
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black hover:scale-105 transition-transform"
                  >
                    <ExternalLink className="h-3.5 w-3.5" /> Live
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}

/* ---------- Experience Timeline ---------- */
const TIMELINE = [
  {
    kind: "Work",
    icon: Briefcase,
    date: "2024 — Present",
    title: "AI Engineer · Aurora Labs",
    body: "Leading multimodal research and shipping production LLM tooling used by 50k+ creators.",
  },
  {
    kind: "Hackathon",
    icon: Trophy,
    date: "2024",
    title: "1st place · Global AI Hack",
    body: "Won grand prize among 800 teams for a real-time computer vision assistant.",
  },
  {
    kind: "Internship",
    icon: Rocket,
    date: "2023",
    title: "ML Research Intern · Prism AI",
    body: "Published a novel attention mechanism accepted at a NeurIPS workshop.",
  },
  {
    kind: "Education",
    icon: GraduationCap,
    date: "2021 — 2025",
    title: "B.Tech Computer Science · AI Track",
    body: "Graduated top of class with distinctions in ML, systems, and human-computer interaction.",
  },
];

function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Journey"
      title={<>A short <span className="text-gradient">timeline</span>.</>}
    >
      <div className="relative">
        <div className="absolute left-4 top-0 h-full w-px bg-gradient-to-b from-transparent via-white/15 to-transparent md:left-1/2" />
        <div className="space-y-10">
          {TIMELINE.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`relative flex flex-col gap-6 md:flex-row md:items-center ${
                i % 2 === 0 ? "md:flex-row-reverse" : ""
              }`}
            >
              <div className="absolute left-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full bg-background ring-1 ring-white/20 md:left-1/2">
                <div className="h-3 w-3 rounded-full bg-gradient-brand animate-pulse-glow" />
              </div>
              <div className="md:w-1/2" />
              <div className="glass ml-12 flex-1 rounded-2xl p-6 md:ml-0 md:w-1/2 md:mx-8">
                <div className="mb-2 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
                  <t.icon className="h-3.5 w-3.5" /> {t.kind} · {t.date}
                </div>
                <h3 className="font-display text-lg font-semibold">{t.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ---------- Achievements ---------- */
const ACHIEVEMENTS = [
  { icon: Trophy, title: "Global AI Hack — 1st", sub: "800 teams · 2024" },
  { icon: Award, title: "NeurIPS Workshop Paper", sub: "Accepted · 2023" },
  { icon: Star, title: "GitHub Arctic Vault", sub: "Contributor" },
  { icon: Sparkles, title: "Awwwards Honoree", sub: "Site of the Day" },
  { icon: Trophy, title: "Smart India Hackathon", sub: "Winner · 2023" },
  { icon: Award, title: "Google DSC Lead", sub: "2022 — 2023" },
];

function Achievements() {
  return (
    <Section
      id="achievements"
      eyebrow="Awards"
      title={<>A shelf of <span className="text-gradient">wins</span>.</>}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {ACHIEVEMENTS.map((a, i) => (
          <motion.div
            key={a.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="group flex items-center gap-4 rounded-2xl glass p-5"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-brand text-black shadow-[0_0_20px_rgba(139,92,246,0.4)]">
              <a.icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-display font-semibold">{a.title}</div>
              <div className="text-xs text-muted-foreground">{a.sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Testimonials ---------- */
const TESTIMONIALS = [
  {
    name: "Ananya R.",
    role: "CTO, Aurora Labs",
    quote:
      "Tanishttha ships work that feels effortless yet is technically deep. Rare combination.",
  },
  {
    name: "Marco V.",
    role: "Design Director, Lumen",
    quote:
      "The best kind of engineer — one who moves the design forward instead of just executing it.",
  },
  {
    name: "Prof. Dev Patel",
    role: "Research advisor",
    quote:
      "Her research instincts are years ahead. I expect her to define the next generation of ML tools.",
  },
];

function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % TESTIMONIALS.length), 5000);
    return () => clearInterval(t);
  }, []);
  const t = TESTIMONIALS[i];
  return (
    <Section
      id="testimonials"
      eyebrow="Kind words"
      title={<>What collaborators <span className="text-gradient">say</span>.</>}
    >
      <div className="relative mx-auto max-w-3xl">
        <div className="absolute -inset-4 rounded-3xl bg-gradient-brand opacity-20 blur-3xl" />
        <div className="relative rounded-3xl glass-strong p-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-6 flex gap-1">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-4 w-4 fill-current text-amber-300" />
                ))}
              </div>
              <p className="font-display text-2xl leading-snug text-foreground sm:text-3xl">
                "{t.quote}"
              </p>
              <div className="mt-8 flex items-center gap-4">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-brand font-semibold text-black">
                  {t.name[0]}
                </div>
                <div>
                  <div className="font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 flex gap-2">
            {TESTIMONIALS.map((_, k) => (
              <button
                key={k}
                onClick={() => setI(k)}
                className={`h-1 rounded-full transition-all ${
                  k === i ? "w-8 bg-white" : "w-4 bg-white/20"
                }`}
                aria-label={`Show testimonial ${k + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 900);
  };
  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title={<>Let's build something <span className="text-gradient">extraordinary</span>.</>}
      subtitle="Available for select engineering, research, and design collaborations."
    >
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          {[
            { icon: Mail, label: "hello@tanishttha.dev", href: "mailto:hello@tanishttha.dev" },
            { icon: Linkedin, label: "linkedin.com/in/tanishttha", href: "#" },
            { icon: Github, label: "github.com/tanishttha", href: "#" },
            { icon: Instagram, label: "@tanishttha.designs", href: "#" },
          ].map((c) => (
            <a
              key={c.label}
              href={c.href}
              className="group flex items-center justify-between rounded-2xl glass p-5 transition-all hover:bg-white/[0.06]"
            >
              <div className="flex items-center gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/5">
                  <c.icon className="h-4 w-4" />
                </div>
                <span className="text-sm">{c.label}</span>
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
            </a>
          ))}
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl glass-strong p-8">
          <div className="grid gap-5">
            {[
              { name: "name", label: "Your name", type: "text" },
              { name: "email", label: "Email", type: "email" },
            ].map((f) => (
              <label key={f.name} className="block">
                <span className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                  {f.label}
                </span>
                <input
                  type={f.type}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm outline-none transition-all focus:border-[color:var(--glow-purple)] focus:bg-white/[0.05]"
                />
              </label>
            ))}
            <label className="block">
              <span className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
                Tell me about your project
              </span>
              <textarea
                required
                rows={5}
                className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm outline-none transition-all focus:border-[color:var(--glow-purple)] focus:bg-white/[0.05]"
              />
            </label>
            <button
              type="submit"
              disabled={status !== "idle"}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-brand py-3.5 text-sm font-semibold text-black transition-transform hover:scale-[1.02] disabled:opacity-70"
            >
              {status === "sent" ? (
                <>Message sent · thank you</>
              ) : status === "sending" ? (
                <>Sending…</>
              ) : (
                <>
                  Send message <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
        <div className="flex items-center gap-3">
          <div className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-brand text-xs font-bold text-black">
            T
          </div>
          <span className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Tanishtha. Crafted with obsession.
          </span>
        </div>
        <div className="flex items-center gap-4">
          {[Github, Linkedin, Mail, Instagram].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="text-muted-foreground transition-colors hover:text-foreground"
              aria-label="social link"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-full glass-strong hover:bg-white/10"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
