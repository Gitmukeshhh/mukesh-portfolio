import { useState } from "react";
import profile from "./profile.js";

const NAV = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="avatar">{profile.initials}</div>
      <h1>{profile.name}</h1>
      <p className="role">{profile.title}</p>
      <p className="tagline">{profile.tagline}</p>

      <div className="side-divider" />

      <ul className="contact-list">
        <li>
          <span className="icon">✉</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </li>
        <li>
          <span className="icon">☎</span>
          <span>{profile.phone}</span>
        </li>
        <li>
          <span className="icon">📍</span>
          <span>{profile.location}</span>
        </li>
        <li>
          <span className="icon">in</span>
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            linkedin.com/in/mukesh-dhale
          </a>
        </li>
        <li>
          <span className="icon">⌥</span>
          <a href={profile.github} target="_blank" rel="noreferrer">
            github.com/Gitmukeshhh
          </a>
        </li>
      </ul>

      <div className="side-divider" />

      <nav className="side-nav">
        {NAV.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.label}
          </a>
        ))}
      </nav>
    </aside>
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
    <button className="copy-btn" onClick={handleCopy} type="button">
      {copied ? "Copied!" : "Copy email address"}
    </button>
  );
}

export default function App() {
  return (
    <div className="page">
      <Sidebar />

      <main className="content">
        <section id="about" className="block">
          <h2>About Me</h2>
          <p className="summary">{profile.summary}</p>
        </section>

        <section id="experience" className="block">
          <h2>Work Experience</h2>
          <div className="timeline">
            {profile.experience.map((job) => (
              <div className="timeline-item" key={job.company}>
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
            ))}
          </div>
        </section>

        <section id="skills" className="block">
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

        <section id="education" className="block">
          <h2>Education</h2>
          {profile.education.map((edu) => (
            <div className="edu-item" key={edu.degree}>
              <h3>{edu.degree}</h3>
              <span className="duration">{edu.duration}</span>
            </div>
          ))}
        </section>

        <section id="contact" className="block">
          <h2>Get In Touch</h2>
          <p className="summary">
            Open to new opportunities — feel free to reach out over email or connect on
            LinkedIn.
          </p>
          <div className="contact-actions">
            <a className="btn-primary" href={`mailto:${profile.email}`}>
              Email Me
            </a>
            <CopyEmailButton />
          </div>
        </section>

        <footer>
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </main>
    </div>
  );
}
