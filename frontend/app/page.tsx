'use client';

import { useEffect, useState } from 'react';
import './styles.css';

type Entry = {
  year: string;
  name: string;
  description: string;
};

const projects: Entry[] = [
  {
    year: '2025',
    name: 'hush',
    description:
      'A lightweight, command-line password manager built in Go as a streamlined alternative to pass. It focuses on simplicity, secure local storage, and fast credential retrieval directly from the terminal.',
  },
  {
    year: '2024',
    name: 'tuneshift',
    description:
      'A web utility designed to easily migrate your music library, playlists, and favorite songs from Apple Music to Spotify. It maps track metadata across streaming platforms to ensure your music transfers seamlessly.',
  },
];

const work: Entry[] = [
  {
    year: '2026',
    name: 'Maplestamps — building a customer loyalty app',
    description: 'Currently working on a customer loyalty app... more details soon.',
  },
  {
    year: '2026',
    name: 'Founding Software Engineer @ Eign',
    description: 'As the founding engineer, I took Eign’s platform from zero to launch. I architected our core full-stack infrastructure, building a highly scalable, Google Maps-style embeddable widget SDK that allows external real estate platforms to display rich location analytics. Beyond building the frontend geospatial visualizations (POIs, route travel times, and custom index layers), I designed the entire backend developer ecosystem from scratch—including secure API key management, multi-tenant rate limiting, and Stripe subscription billing. To maximize commercial impact, I designed the backend to decouple the raw data layer from the frontend widgets, exposing standalone, high-throughput APIs for nearby POI and transit travel-time data that could be purchased and consumed separately by enterprise clients. To optimize costs, I helped transition our mapping reliance away from expensive third-party APIs by building an efficient data-serving layer that pulls custom proprietary indices directly out of Databricks into our production systems.',
  },
  {
    year: '2025',
    name: 'Meta Production Engineering Fellow',
    description: 'Learnt about production engineering from industry leaders in Meta, and gained hands on experience in production engineering.',
  },
  {
    year: '2025',
    name: 'Apache Airflow Contributor',
    description: "During my time working with RBC and the Major League Hacking fellowship, I contributed core UI and observability features to the Apache Airflow 3.0 beta release. One notable challenge involved triaging a baffling bug where macOS users completely lost the ability to highlight or copy DAG source code from the web interface, while Windows and Linux users were unaffected. I traced the root cause to a compatibility regression in the underlying React code-rendering component. To fix this, I swapped out and customized the viewing component to ensure uniform cross-platform behavior  and went a step further by designing and implementing intuitive, native download and clipboard-copy actions to permanently streamline the developer workflow. Additionally, I expanded Airflow's production troubleshooting capabilities by engineering a direct 'Download Task Instance Logs' feature into the observability dashboard, significantly cutting down triage times for engineers debugging distributed workflow executions.",
  },
  {
    year: '2024',
    name: 'Embedded Software Developer Intern @ Ciena',
    description: "During my second term with Ciena, I focused on accelerating security infrastructure provisioning and upgrading low-level system observability. I designed and launched a full-stack internal web platform using Flask that automated TACACS+ security server provisioning, eliminating the manual friction of Ciena's proprietary CLI and slashing setup times by 60%. Additionally, I moved down the stack to engineer a high-performance logging API in C for our network device security testing infrastructure, injecting comprehensive tracing mechanisms into every execution run. To ensure long-term stability and strict code quality before integration, I implemented a robust testing framework using Pytest, achieving 83% test coverage across the newly developed API.",
  },
  {
    year: '2024',
    name: 'Software Developer @ Develop for Good',
    description: 'I volunteered as a full-stack developer to build digital products for non-profit organizations. Utilizing React and Node.js, I designed and implemented responsive organizational discovery portals and interactive appointment scheduling systems. My work focused on optimizing frontend user experience alongside designing efficient REST APIs to deliver rapid data availability to hundreds of concurrent users.',
  },
  {
    year: '2024',
    name: 'Embedded Software Developer Intern @ Ciena',
    description: "For my first term at Ciena, I worked directly with carrier-grade networking hardware to heavily optimize automated testing and modern device configuration pipelines. I architected an automated OSPF/ISIS routing regression testing framework that radically cut validation cycles by 95%, bringing execution times down from over two hours to just five minutes. To modernize our infrastructure management, I developed a JSON-driven hardware provisioning and parsing framework to permanently replace legacy TL1 command-line tooling, accelerating feature validation across 15+ engineers and minimizing simulator configuration times from 10 minutes to just 30 seconds. I also expanded hardware regression coverage by 40% by engineering custom telemetry parsers to monitor CPU and memory performance on the 6500-series platform.",
  },
  {
    year: '2023',
    name: 'Software Developer Intern @ Ericsson',
    description: 'I built full-stack internal tooling to optimize test infrastructure visibility for distributed engineering teams. I engineered a real-time test analytics platform using React and Flask, and orchestrated a major data migration by moving legacy Excel-based test tracking assets over to an optimized, heavily indexed PostgreSQL database schema—reducing critical query latency from 10 seconds down to under 1 second. To reduce manual engineering friction, I also automated the deployment lifecycle of Grafana observability dashboards via Python scripting.',
  },
  {
    year: '2022',
    name: 'Undergraduate Research Assistant @ University of Waterloo',
    description: 'I applied machine learning techniques to academic data to identify early-semester risk patterns in student performance. Using scikit-learn, I engineered data features and built a predictive classification model that achieved 92% accuracy in predicting course drops within the first month. I then built an interactive, vanilla JavaScript web application to clearly visualize the training data pipeline and model insights for stakeholders.',
  },
];

const PROMPT = 'andrew@portfolio:~$ ';
const COMMAND = 'whoami';

function useTyped(text: string, speed = 70, startDelay = 250) {
  const [out, setOut] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setOut(text);
      setDone(true);
      return;
    }
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    const start = setTimeout(function step() {
      i += 1;
      setOut(text.slice(0, i));
      if (i < text.length) {
        timer = setTimeout(step, speed);
      } else {
        setDone(true);
      }
    }, startDelay);
    return () => {
      clearTimeout(start);
      clearTimeout(timer);
    };
  }, [text, speed, startDelay]);
  return { out, done };
}

function Section({
  label,
  entries,
}: {
  label: string;
  entries: Entry[];
}) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section className="block">
      <div className="cmd-line">
        <span className="prompt">{PROMPT}</span>
        <span className="cmd">cat {label}.md</span>
      </div>
      <ul className="entries" role="list">
        {entries.map((entry, i) => {
          const isOpen = open === i;
          return (
            <li className="entry" key={`${entry.name}-${i}`}>
              <button
                type="button"
                className={`entry-row ${isOpen ? 'is-open' : ''}`}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="caret" aria-hidden="true">
                  {isOpen ? '▾' : '▸'}
                </span>
                <span className="year">{entry.year}</span>
                <span className="entry-name">{entry.name}</span>
              </button>
              <div className={`blob ${isOpen ? 'open' : ''}`}>
                <p>
                  <span className="blob-mark" aria-hidden="true">
                    └─{' '}
                  </span>
                  {entry.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default function Home() {
  const { out, done } = useTyped(COMMAND);

  return (
    <main className="page">
      <header className="intro">
        <div className="cmd-line">
          <span className="prompt">{PROMPT}</span>
          <span className="cmd">{out}</span>
          {!done && <span className="cursor" aria-hidden="true" />}
        </div>

        <div className={`reveal-on-done ${done ? 'shown' : ''}`}>
          <h1 className="name">Andrew Arochukwu</h1>
          <p className="meta">// last updated 2026-06-27</p>
        </div>
      </header>

      <section className={`about reveal-on-done ${done ? 'shown' : ''}`}>
        <p>
          A software developer hoping to make it to the NBA or be the CEO of the
          fastest-growing unicorn startup in three years.
        </p>
        <p>
          Currently living in Toronto. In my free time I read, work on Maplestamps and
          chip away at Project Euler.
        </p>
        <p>I enjoy history, literature, and math. Please send book recommendations.</p>
        <p className="resume-line">
          <span className="comment">// grab a copy →</span>{' '}
          <a className="resume-link" href="/resume.pdf" download>
            <span className="resume-prompt">$</span> ./resume.pdf
            <span className="resume-arrow" aria-hidden="true">↓</span>
          </a>
        </p>
        <p className="contact">
          <span className="sep">·</span>
          <a className="link" href="https://www.linkedin.com/in/acarochu/" target="_blank" rel="noreferrer">
            linkedin
          </a>
          <span className="sep">·</span>
          <a className="link" href="mailto:andrewarochukwu@gmail.com">
            andrewarochukwu@gmail.com
          </a>
        </p>
      </section>

      <div className={`reveal-on-done ${done ? 'shown' : ''}`}>
        <section className="block">
          <div className="cmd-line">
            <span className="prompt">{PROMPT}</span>
            <span className="cmd">cat reading.md</span>
          </div>
          <ul className="entries" role="list">
            <li className="entry static">
              <div className="entry-row">
                <span className="caret dim" aria-hidden="true">
                  •
                </span>
                <span className="year">2026-06</span>
                <span className="entry-name">Emperor to Citizen — Pu Yi</span>
              </div>
            </li>
          </ul>
        </section>

        <Section label="projects" entries={projects} />
        <Section label="work" entries={work} />

        <section className="block">
          <div className="cmd-line">
            <span className="prompt">{PROMPT}</span>
            <span className="cmd">cat education.md</span>
          </div>
          <ul className="entries" role="list">
            <li className="entry static">
              <div className="entry-row">
                <span className="caret dim" aria-hidden="true">
                  •
                </span>
                <span className="year">2027</span>
                <span className="entry-name">
                  BMath, Computational Mathematics &amp; Statistics — University of
                  Waterloo
                </span>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}