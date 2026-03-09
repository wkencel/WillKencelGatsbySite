import type { Metadata } from "next"
import { FaGithub } from "react-icons/fa"

export const metadata: Metadata = {
  title: "Projects",
  description: "Will Kencel's projects and portfolio.",
}

const projects = [
  {
    title: "Xbox PC Gaming & Handhelds",
    company: "Microsoft",
    description:
      "Delivered 40+ features serving 50M+ monthly active users across PC and handheld devices including the ROG ALLY release. Spearheaded subscription compliance infrastructure impacting $30M+ annual revenue across 7 countries. Sole engineer driving multiple end-to-end user-facing features integrating with broader runtime services.",
    tech: ["React", "React Native", "TypeScript", "C#/.NET", "Azure", "Kusto"],
  },
  {
    title: "Aurora Technologies",
    company: "Founder",
    description:
      "Founded a software consultancy helping companies build full-stack applications and integrate AI tools. Notable client work includes Property.com — an AI-driven platform with LLM-powered function-calling, vector database, and conversational memory using OpenAI + LangChain — and OpenMotionAI, a physical therapy app leveraging ML and computer vision with AWS microservices.",
    tech: ["Python", "LangChain", "React Native", "AWS", "OpenAI", "Computer Vision"],
  },
  {
    title: "Xbox Payments",
    company: "Microsoft",
    description:
      "Built, tested, and shipped the Xbox global payments application to 100M+ users across 120+ countries and 200+ languages. Developed React/React Native SDKs with 30+ reusable components. Created an internal automated testing framework covering 20+ user flows. Migrated React to React Native, reducing payment flow latency by 400%.",
    tech: ["React", "React Native", "TypeScript", "C#/.NET", "Selenium", "Azure"],
  },
]

const openSource = {
  title: "Venus",
  org: "OSLabs",
  description: "Open source microservice monitoring tool with real-time data visualization dashboards.",
  tech: ["React", "Node.js", "D3/VisX", "WebSockets"],
  github: "https://github.com/oslabs-beta/venus",
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-12 text-3xl font-bold text-neutral-900">Projects</h1>

      <div className="space-y-8">
        {projects.map(project => (
          <article
            key={project.title}
            className="rounded-xl border border-neutral-200 bg-white p-6"
          >
            <div className="mb-1 text-sm font-medium text-blue-600">
              {project.company}
            </div>
            <h2 className="text-xl font-semibold text-neutral-900">
              {project.title}
            </h2>
            <p className="mt-3 text-neutral-600">{project.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map(t => (
                <span
                  key={t}
                  className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
                >
                  {t}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-12">
        <h2 className="mb-4 text-lg font-semibold text-neutral-900">
          Open Source
        </h2>
        <article className="rounded-xl border border-neutral-200 bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-1 text-sm font-medium text-blue-600">
                {openSource.org}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {openSource.title}
              </h3>
            </div>
            <a
              href={openSource.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-400 transition-colors hover:text-blue-600"
              aria-label="GitHub"
            >
              <FaGithub size={20} />
            </a>
          </div>
          <p className="mt-2 text-neutral-600">{openSource.description}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {openSource.tech.map(t => (
              <span
                key={t}
                className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-600"
              >
                {t}
              </span>
            ))}
          </div>
        </article>
      </div>
    </div>
  )
}
