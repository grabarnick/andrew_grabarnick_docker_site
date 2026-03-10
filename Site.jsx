import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Linkedin, Mail, Calendar, Sparkles, Code2, Rocket, LineChart } from "lucide-react";

// —— Replace with your actual Calendly link ——
const calendlyUrl = "https://calendly.com/grabarnick/30min";
// —— Optionally host your resume alongside the site build ——
const resumeUrl = "https://grabarnick.notion.site/Andrew-Grabarnick-CV-25e821657fb580b9b895c8a692abfeb8";
const linkedinUrl = "https://www.linkedin.com/in/andrey-grabarnick";
const emailUrl = "mailto:agrabarnick@gmail.com";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-10">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-base text-zinc-500 max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-zinc-200/70 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow ${className}`}>
      {children}
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="text-left">
      <div className="text-3xl font-semibold tracking-tight">{value}</div>
      <div className="mt-1 text-sm text-zinc-500">{label}</div>
    </div>
  );
}

function Project({ title, tag, description, bullets, link }) {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between gap-2">
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{title}</h3>
          <p className="text-xs mt-1 inline-flex items-center gap-1 rounded-full bg-zinc-100 px-2 py-0.5 text-zinc-600">{tag}</p>
        </div>
      </div>
      <p className="mt-4 text-zinc-600 text-sm leading-relaxed">{description}</p>
      <ul className="mt-4 space-y-2 text-sm text-zinc-700 list-disc pl-5">
        {bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
      {link && (
        <a href={link} className="inline-flex items-center mt-4 gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm hover:bg-zinc-50">
          <ArrowRight className="h-4 w-4" /> Go to Product
        </a>
      )}
    </Card>
  );
}

export default function Site() {
  const openCalendly = () => {
    window.open(calendlyUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-zinc-50 text-zinc-900">
      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 bg-white/80 border-b border-zinc-100">
        <nav className="max-w-4xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-xl bg-black text-white grid place-items-center font-semibold">AG</div>
            <span className="hidden sm:block text-sm text-zinc-600">Andrew Grabarnick</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <a href="#experience" className="text-sm text-zinc-600 hover:text-zinc-900 px-2 py-1 rounded-lg">Experience</a>
            <a href="#expertise" className="text-sm text-zinc-600 hover:text-zinc-900 px-2 py-1 rounded-lg">Expertise</a>
            <a href="#about" className="text-sm text-zinc-600 hover:text-zinc-900 px-2 py-1 rounded-lg">About</a>
            <button onClick={openCalendly} className="inline-flex items-center gap-2 rounded-xl bg-black text-white text-sm px-3 py-2 hover:bg-zinc-800">
              <Calendar className="h-4 w-4" /> Book a Call
            </button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_-10%,rgba(0,0,0,0.05),transparent)]" />
        <div className="max-w-4xl mx-auto px-4 md:px-6 pt-16 pb-10">
          <motion.div variants={container} initial="hidden" animate="show" className="text-left">
            <motion.img
              variants={item}
              src="/andrew_grabarnick.jpg"
              alt="Andrew Grabarnick"
              className="h-24 w-24 md:h-32 md:w-32 rounded-full object-cover border border-zinc-200 shadow-sm mb-4"
            />
            <motion.h1 variants={item} className="text-3xl md:text-5xl font-semibold tracking-tight leading-tight">
              Hey, I'm Andrew Grabarnick.<br />
              Product Leader at the forefront of AI innovation.
            </motion.h1>
            <motion.p variants={item} className="mt-5 text-base md:text-lg text-zinc-600 max-w-3xl">
              I build enterprise-grade automation tools and solutions. For over 10 years, our products have powered automation for major companies across Europe, Russia, and the CIS.
            </motion.p>
            <motion.div variants={item} className="mt-8 grid grid-cols-2 gap-3 md:flex md:items-center">
              <button onClick={openCalendly} className="inline-flex w-full md:w-auto items-center justify-center md:justify-start gap-2 rounded-xl bg-black text-white px-4 py-2 text-sm hover:bg-zinc-800">
                <Calendar className="h-4 w-4" /> Schedule Consultation
              </button>
              <a href={resumeUrl} className="inline-flex w-full md:w-auto items-center justify-center md:justify-start gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm hover:bg-zinc-50">
                <ArrowRight className="h-4 w-4" /> View CV
              </a>
              <a href={linkedinUrl} className="inline-flex w-full md:w-auto items-center justify-center md:justify-start gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm hover:bg-zinc-50">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
              <a href={emailUrl} className="inline-flex w-full md:w-auto items-center justify-center md:justify-start gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm hover:bg-zinc-50">
                <Mail className="h-4 w-4" /> Email
              </a>
            </motion.div>
            <motion.div variants={item} className="mt-10 grid grid-cols-3 md:grid-cols-6 gap-6 max-w-3xl">
              <Stat value="10+ yrs" label="Dev, Design & AI" />
              <Stat value="140+" label="Team Led" />
              <Stat value="6" label="Products Managed" />
              <Stat value="4" label="Cloud Envs" />
              <Stat value="30%" label="YoY Growth" />
              <Stat value="$5M+" label="YRR Built" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="max-w-4xl mx-auto px-4 md:px-6 py-16">
        <SectionHeading title="Experience" subtitle="Products, projects, clients and success stories" />
        <div className="grid md:grid-cols-2 gap-6">
          <Project
            title="Stractik AI"
            tag="2026 • Agentic Driven Decision Intelligence"
            description="A multi-agent autonomous system designed to transform unstructured institutional knowledge into actionable business decisions using a graph-based RAG architecture."
            bullets={[
              "Engineered a 0-to-1 solution to automate complex, non-linear business workflows",
              "Agentic Business Automation",
              "Built a production-ready stack (TypeScript, Node.js, React, Docker) with a focus on modularity and rapid deployment",
            ]}

            link="https://stractik.com"
          />
          <Project
            title="Just AI Agent Platform"
            tag="2025 • Agent Developer Platform • Modular Runtime"
            description="Developer platform to compose domain‑specific AI agents with interchangeable modules (tools, memory, policies). Supports cloud and on‑prem LLMs, enterprise RAG and secure integrations."
            bullets={[
              "Multi‑model strategy (OpenAI, Anthropic, LLaMA, Qwen)",
              "Catalog of ready‑made agent blocks with customization",
              "AI Dev Assistant to scaffold agent projects automatically",
            ]}
            link="https://just-ai.com/agent-platform"
          />
          <Project
            title="Just AI Conversational Platform (JAICP)"
            tag="$5M+ YRR • Developer Platform • DSL • SDK • CI/CD"
            description="Platform for engineers to build, test and deploy conversational agents at enterprise scale. Proprietary DSL with code-first workflows, SDKs, APIs, analytics and release management."
            bullets={[
              "Designed DX: from project scaffolding to CI/CD and on‑prem releases",
              "Advanced workspace, roles & administration for large orgs",
              "Enterprise analytics and observability for conversation quality",
            ]}
            link="https://just-ai.com/jaicp"
          />
          <Project
            title="AI Voice Prompter"
            tag="AI Tooling • Voice"
            description="Tooling for voice‑first prompting and agent orchestration in enterprise scenarios."
            bullets={["Shipped as part of product suite", "Adoption via developer teams", "Improved productivity in support & ops"]}
            link="https://just-ai.com/ai-souffler"
          />

          <Project
            title="HUB48"
            tag="$50k+ MRR • B2B Automation"
            description="Scaled B2B communication automation platform for the US market. Led product from 0 → $50k+ MRR with 100+ corporate clients."
            bullets={["Architected user platform & analytics dashboard", "Lead scoring and qualification system", "Integrated with enterprise automation stack"]}
          />
          <Project
            title="Maryand"
            tag="$10k+ MRR • Premium Leather Goods Brand"
            description="Created and scaled a premium leather goods brand from concept to profitable business."
            bullets={["Built full-cycle manufacturing process from scratch, including workshop setup and quality control", "Developed efficient production management system and integrated CRM solutions", "Built scalable business processes for sustainable growth"]}
          />

        </div>
      </section>

      {/* Expertise */}
      <section id="expertise" className="max-w-4xl mx-auto px-4 md:px-6 py-16">
        <SectionHeading title="Expertise" subtitle="Developer platforms, LLM systems and product strategy" />
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-zinc-100"><Sparkles className="h-5 w-5" /></div>
              <h3 className="font-semibold">LLM & AI Systems</h3>
            </div>
            <p className="mt-3 text-sm text-zinc-600">Multi-model strategies with OpenAI, Anthropic, LLaMA, Qwen; RAG, agents, on‑prem & cloud.</p>
            <ul className="mt-4 space-y-2 text-sm list-disc pl-5 text-zinc-700">
              <li>Multi-model deployment (cloud + on‑prem)</li>
              <li>Enterprise RAG & knowledge routing</li>
              <li>Agent frameworks for Banking, HR, Insurance</li>
            </ul>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-zinc-100"><Code2 className="h-5 w-5" /></div>
              <h3 className="font-semibold">Developer Platforms</h3>
            </div>
            <p className="mt-3 text-sm text-zinc-600">AI-agents, DSLs, SDKs, APIs, testing tools, CI/CD, extensions, analytics and DX improvements.</p>
            <ul className="mt-4 space-y-2 text-sm list-disc pl-5 text-zinc-700">
              <li>Agents Platform — AI-agents builder & modular runtime</li>
              <li>JAICP — conversational AI platform (DSL, SDK, CI/CD)</li>
              <li>API management & extension systems</li>
            </ul>
          </Card>
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-zinc-100"><LineChart className="h-5 w-5" /></div>
              <h3 className="font-semibold">Product Leadership</h3>
            </div>
            <p className="mt-3 text-sm text-zinc-600">Vision, roadmap, pricing, GTM. Leading cross‑functional teams to scalable outcomes.</p>
            <ul className="mt-4 space-y-2 text-sm list-disc pl-5 text-zinc-700">
              <li>30% YoY revenue growth across portfolio</li>
              <li>140+ cross‑functional team leadership</li>
              <li>Analytics, experimentation, JTBD</li>
            </ul>
          </Card>
        </div>
      </section>

      {/* Clients */}
      <section id="clients" className="max-w-4xl mx-auto px-4 md:px-6 py-16">
        <SectionHeading title="Clients" subtitle="Selected brands and institutions I've worked with" />
        <Card className="p-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
            {[
              "BNP Paribas Cardif",
              "Philip Morris International",
              "Burger King",
              "Tele2",
              "Richmond & Wandsworth",
              "Royal Institute of Navigation",
              "Dodo Pizza",
              "Kodland",
              "Jardim Exótico",
              "Alpha Bank",
              "Sovcombank",
            ].map((client) => (
              <div
                key={client}
                className="text-center rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-800 hover:bg-zinc-50"
              >
                {client}
              </div>
            ))}
          </div>
        </Card>
      </section>

      {/* About */}
      <section id="about" className="max-w-4xl mx-auto px-4 md:px-6 py-16">
        <Card className="p-8">
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-semibold tracking-tight">About Andrew</h3>
              <p className="mt-4 text-zinc-700 leading-relaxed">
                I build developer platforms that turn cutting‑edge AI into practical tools. With a foundation in full‑stack development and more than a decade in product, I bridge technical depth and product intuition—crafting systems developers actually love to use.
              </p>
              <ul className="mt-6 grid sm:grid-cols-2 gap-3 text-sm text-zinc-700 list-disc pl-5">
                <li>Head of AI Products @ Just AI</li>
                <li>Previously founder → scaled to $50k+ MRR</li>
                <li>6 products portfolio • 4 cloud envs • on‑prem</li>
                <li>English 🇬🇧 (full professional), Russian 🇷🇺 (native)</li>
              </ul>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a href={resumeUrl} className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm hover:bg-zinc-50">
                  <ArrowRight className="h-4 w-4" /> Download Resume
                </a>
                <a href="https://www.linkedin.com/in/andrey-grabarnick" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm hover:bg-zinc-50">
                  <Linkedin className="h-4 w-4" /> Connect on LinkedIn
                </a>
                <a href="mailto:agrabarnick@gmail.com" className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-4 py-2 text-sm hover:bg-zinc-50">
                  <Mail className="h-4 w-4" /> Email
                </a>
              </div>
            </div>
            <div>
              <div className="rounded-2xl bg-gradient-to-br from-zinc-100 to-white border border-zinc-200 p-5 shadow-inner">
                <div className="text-sm text-zinc-600">Focus</div>
                <ul className="mt-3 space-y-2 text-sm text-zinc-800">
                  <li>Developer Experience (DX)</li>
                  <li>AI Agents & RAG Systems</li>
                  <li>Platform Architecture</li>
                  <li>GTM & Pricing</li>
                </ul>
              </div>
              <div className="mt-4 rounded-2xl bg-gradient-to-br from-zinc-100 to-white border border-zinc-200 p-5 shadow-inner">
                <div className="text-sm text-zinc-600">Toolbox</div>
                <ul className="mt-3 space-y-2 text-sm text-zinc-800">
                  <li>OpenAI, Anthropic, LLaMA, Qwen</li>
                  <li>TypeScript, Node.js, Python</li>
                  <li>Postgres, MongoDB</li>
                  <li>Cloud & On‑prem orchestration</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* CTA / Calendly */}
      <section className="max-w-4xl mx-auto px-4 md:px-6 pb-20">
        <Card className="p-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-semibold tracking-tight">Let's talk</h3>
              <p className="mt-2 text-zinc-600">Book a 30‑minute meeting. We'll discuss strategy, AI architecture, and the shortest path to value.</p>
              <div className="mt-4 flex items-center gap-3">
                <button onClick={openCalendly} className="inline-flex items-center gap-2 rounded-xl bg-black text-white px-4 py-2 text-sm hover:bg-zinc-800">
                  <Calendar className="h-4 w-4" /> Open Calendly
                </button>
              </div>
            </div>
            <div className="flex-1 w-full">
              <div className="rounded-xl overflow-hidden border border-zinc-200">
                {/* Inline Calendly embed (replace URL with yours) */}
                <iframe title="Calendly" src={`${calendlyUrl}?hide_gdpr_banner=1`} className="w-full h-[520px]" />
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-100 bg-white/60">
        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-zinc-500">© {new Date().getFullYear()} Andrew Grabarnick</div>
          <div className="flex items-center gap-3">
            <a href="https://www.linkedin.com/in/andrey-grabarnick" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-sm hover:bg-zinc-50"><Linkedin className="h-4 w-4" /> LinkedIn</a>
            <a href="mailto:agrabarnick@gmail.com" className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 bg-white px-3 py-1.5 text-sm hover:bg-zinc-50"><Mail className="h-4 w-4" /> Email</a>
          </div>
        </div>
      </footer>
    </div>
  );
}