import { useEffect, useState } from "react";
import profile from "./profile.js";
import useReveal from "./useReveal.js";
import {
  MailIcon,
  PhoneIcon,
  PinIcon,
  LinkedInIcon,
  GitHubIcon,
  ArrowIcon,
  DownloadIcon,
  DocumentIcon,
} from "./icons.jsx";

const RESUME_URL = `${import.meta.env.BASE_URL}resume/Mukesh_Dhale_Resume.pdf`;

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "certifications", label: "Certifications" },
  { id: "resume", label: "Resume" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-inner">
        <a href="#top" className="brand">
          MD<span className="dot">.</span>
        </a>
        <nav className={`nav-links ${open ? "open" : ""}`}>
          {NAV.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <button
          className="burger"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-glow" />
      <div className="hero-inner">
        <span className="status-pill reveal">
          <span className="status-dot" /> Open to Work
        </span>
        <p className="eyebrow reveal">Hi, I&apos;m</p>
        <h1 className="reveal">
          {profile.name}
          <span className="cursor">|</span>
        </h1>
        <p className="hero-title reveal">{profile.title}</p>
        <p className="hero-tagline reveal">{profile.tagline}</p>
        <div className="hero-cta reveal">
          <a className="btn-primary" href={RESUME_URL} download>
            Download Resume <DownloadIcon />
          </a>
          <a className="btn-ghost" href="#contact">
            Get in touch
          </a>
          <a className="btn-ghost" href="#experience">
            View experience
          </a>
        </div>
        <div className="hero-meta reveal">
          <span>
            <PinIcon /> {profile.location}
          </span>
          <span>
            <MailIcon /> {profile.email}
          </span>
        </div>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll down">
        <span />
      </a>
    </section>
  );
}

function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <button className="btn-ghost" onClick={handleCopy} type="button">
      {copied ? "Copied!" : "Copy email"}
    </button>
  );
}

export default function App() {
  useReveal();

  return (
    <>
      <Navbar />
      <Hero />

      <main className="content">
        <section id="about" className="block reveal">
          <p className="eyebrow">01 · About</p>
          <h2>About Me</h2>
          <p className="summary">{profile.summary}</p>
        </section>

        <section id="experience" className="block reveal">
          <p className="eyebrow">02 · Career</p>
          <h2>Work Experience</h2>
          <div className="timeline">
            {profile.experience.map((job) => (
              <div className="timeline-item reveal" key={job.company}>
                <span className="timeline-dot" />
                <div className="timeline-card">
                  <div className="timeline-header">
                    <h3>{job.role}</h3>
                    <span className="duration">{job.duration}</span>
                  </div>
                  <p className="company">
                    {job.company} · {job.location}
                  </p>
                  <ul>
                    {job.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="block reveal">
          <p className="eyebrow">03 · Projects</p>
          <h2>Projects</h2>
          <div className="projects-grid">
            {profile.projects.map((project) => (
              <div className="project-card" key={project.name}>
                <h3>{project.name}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <div className="chips">
                  {project.tech.map((tech) => (
                    <span className="chip" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
                <ul>
                  {project.points.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="skills" className="block reveal">
          <p className="eyebrow">04 · Toolbox</p>
          <h2>Skills</h2>
          <div className="skills-grid">
            {profile.skills.map((group) => (
              <div className="skill-card" key={group.category}>
                <h3>{group.category}</h3>
                <div className="chips">
                  {group.items.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="education" className="block reveal">
          <p className="eyebrow">05 · Education</p>
          <h2>Education</h2>
          {profile.education.map((edu) => (
            <div className="edu-item" key={edu.degree}>
              <h3>{edu.degree}</h3>
              <span className="duration">{edu.duration}</span>
            </div>
          ))}
        </section>

        <section id="certifications" className="block reveal">
          <p className="eyebrow">06 · Certifications</p>
          <h2>Certifications</h2>
          <div className="cert-grid">
            {profile.certifications.map((cert) => (
              <a
                className="cert-card"
                key={cert.name}
                href={`${import.meta.env.BASE_URL}${cert.image}`}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={`${import.meta.env.BASE_URL}${cert.image}`}
                  alt={cert.name}
                  loading="lazy"
                />
                <div className="cert-info">
                  <h3>{cert.name}</h3>
                  <span className="duration">{cert.date}</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="resume" className="block reveal">
          <p className="eyebrow">07 · Resume</p>
          <h2>Resume</h2>
          <div className="resume-card">
            <div className="resume-card-icon">
              <DocumentIcon />
            </div>
            <div className="resume-card-info">
              <h3>Mukesh_Dhale_Resume.pdf</h3>
              <p className="summary">
                Full resume with detailed work experience, skills, and education.
              </p>
            </div>
            <div className="resume-card-actions">
              <a className="btn-primary" href={RESUME_URL} download>
                Download <DownloadIcon />
              </a>
              <a className="btn-ghost" href={RESUME_URL} target="_blank" rel="noreferrer">
                View
              </a>
            </div>
          </div>
        </section>

        <section id="contact" className="block reveal contact-block">
          <p className="eyebrow">08 · Contact</p>
          <h2>Let&apos;s Build Something</h2>
          <p className="summary">
            Open to new opportunities — feel free to reach out over email or connect on
            LinkedIn.
          </p>
          <div className="contact-actions">
            <a className="btn-primary" href={`mailto:${profile.email}`}>
              Email Me <ArrowIcon />
            </a>
            <a className="btn-ghost" href={RESUME_URL} download>
              Download Resume <DownloadIcon />
            </a>
            <CopyEmailButton />
          </div>
          <div className="social-row">
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href={`tel:${profile.phone}`} aria-label="Phone">
              <PhoneIcon />
            </a>
          </div>
        </section>

        <footer>
          © {new Date().getFullYear()} {profile.name}. Built with React.
        </footer>
      </main>
    </>
  );
}
