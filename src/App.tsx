import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  ExternalLink,
  GitMerge,
  GitPullRequest,
  Github,
  Globe2,
  Linkedin,
  Mail,
  Moon,
  Sun,
} from "lucide-react";

import {
  calComPullRequests,
  experience,
  highlights,
  openSource,
  profile,
  rocketChatPullRequests,
  selectedWork,
} from "./data";
import { cn } from "./lib/utils";

const socialLinks: Array<{
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}> = [
  { label: "Email", href: profile.email, icon: Mail },
  { label: "LinkedIn", href: profile.linkedin, icon: Linkedin },
  { label: "Twitter", href: profile.twitter, icon: XLogo },
  { label: "GitHub", href: profile.github, icon: Github },
];

const orderedExperience = [...experience].sort((a, b) =>
  b.startedAt.localeCompare(a.startedAt),
);

const particles = [
  { left: "7%", top: "9%", size: 3, duration: 17, delay: 0, x: 18, y: -22 },
  { left: "15%", top: "72%", size: 2, duration: 15, delay: 1.2, x: -14, y: 18 },
  { left: "24%", top: "31%", size: 4, duration: 21, delay: 0.4, x: 20, y: 16 },
  { left: "32%", top: "86%", size: 2, duration: 18, delay: 2.1, x: -18, y: -14 },
  { left: "41%", top: "14%", size: 2, duration: 16, delay: 0.8, x: 15, y: 24 },
  { left: "49%", top: "58%", size: 3, duration: 22, delay: 1.8, x: -22, y: 15 },
  { left: "58%", top: "25%", size: 2, duration: 19, delay: 0.2, x: 16, y: -18 },
  { left: "66%", top: "78%", size: 4, duration: 24, delay: 2.7, x: -20, y: 22 },
  { left: "74%", top: "41%", size: 2, duration: 14, delay: 1.5, x: 14, y: -16 },
  { left: "84%", top: "11%", size: 3, duration: 20, delay: 0.6, x: -16, y: 20 },
  { left: "91%", top: "65%", size: 2, duration: 17, delay: 2.3, x: 18, y: 14 },
  { left: "96%", top: "88%", size: 3, duration: 23, delay: 1.1, x: -15, y: -20 },
];

type PullRequest = Omit<(typeof rocketChatPullRequests)[number], "merged"> & {
  merged?: string;
  status?: "open" | "closed" | "merged";
};

type Project = (typeof selectedWork)[number];

function XLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function App() {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    window.localStorage.getItem("theme") === "light" ? "light" : "dark",
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-background px-5 py-10 text-foreground sm:px-8 sm:py-16">
      <ParticleBackground theme={theme} />
      <div className="relative z-10 mx-auto max-w-[680px]">
        <div className="mb-8 flex items-center justify-between">
          <a
            href="#"
            aria-label={profile.name}
            className="block h-14 w-14 overflow-hidden rounded-full border border-border bg-muted transition hover:border-foreground"
            onClick={(event) => event.preventDefault()}
          >
            <img
              src="/ggh.png"
              alt=""
              className="h-full w-full object-cover object-[64%_50%]"
            />
          </a>
          <button
            type="button"
            aria-label="Toggle theme"
            onClick={() =>
              setTheme((value) => (value === "dark" ? "light" : "dark"))
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition hover:border-foreground hover:text-foreground"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </button>
        </div>

        <section>
          <h1 className="max-w-[660px] font-serif text-[42px] font-normal leading-[1.05] tracking-normal text-foreground sm:text-[52px]">
            {profile.title}
          </h1>
          <p className="mt-6 max-w-[620px] text-[15.5px] leading-8 text-muted-foreground">
            {profile.bio}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {highlights.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border px-3 py-1 text-[13px] text-muted-foreground"
              >
                {item}
              </span>
            ))}
          </div>
          <nav
            className="mt-6 flex flex-wrap gap-2 text-[14px] text-foreground"
            aria-label="Contact and social links"
          >
            {socialLinks.map((link) => (
              <SocialLink key={link.label} {...link} />
            ))}
          </nav>
        </section>

        <Section title="Experience" className="mt-16">
          <ol className="space-y-8" aria-label="Experience timeline">
            {orderedExperience.map((item, index) => (
              <li
                key={item.role}
                className="relative grid gap-2 pl-9 sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-x-6"
              >
                {index !== orderedExperience.length - 1 && (
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-[7px] top-5 h-[calc(100%+1.25rem)] w-px",
                      index === 0 ? "bg-foreground" : "bg-border",
                    )}
                  />
                )}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full border bg-background",
                    index === 0 ? "border-foreground" : "border-border",
                  )}
                >
                  <span
                    className={cn(
                      "h-1.5 w-1.5 rounded-full",
                      index === 0 ? "bg-foreground" : "bg-muted-foreground",
                    )}
                  />
                </span>
                <div>
                  <h3 className="text-[15px] font-medium leading-6">
                    {item.role}
                  </h3>
                  <p className="mt-1 text-[14.5px] leading-7 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <p className="text-[14px] leading-6 text-muted-foreground sm:text-right">
                  {item.period}
                </p>
              </li>
            ))}
          </ol>
        </Section>

        <Section title="Open Source" className="mt-16">
          <div className="space-y-4">
            <OpenSourceGroup
              name="Rocket.Chat"
              description="Contributions across Rocket.Chat and EmbeddedChat."
              pullRequests={rocketChatPullRequests}
            />
            <OpenSourceGroup
              name="Cal.com"
              description="Contribution to Cal.com's open-source scheduling platform."
              pullRequests={calComPullRequests}
            />
          </div>
        </Section>

        <Section title="Projects" className="mt-16">
          <div className="space-y-5">
            {selectedWork.map((work) => (
              <ProjectCard key={work.name} work={work} />
            ))}
          </div>
        </Section>

        <Section title="Community & Skills" className="mt-16">
          <div className="space-y-4">
            {openSource.map((item) => (
              <WorkLink key={item.name} href={item.href}>
                <span className="flex items-start justify-between gap-4">
                  <span className="block text-[15px] font-medium leading-6">
                    {item.name}
                  </span>
                  <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
                </span>
                <span className="mt-1 block text-[14.5px] leading-7 text-muted-foreground">
                  {item.description}
                </span>
              </WorkLink>
            ))}
          </div>
        </Section>

        <footer className="mt-16 pb-3 text-[14px] text-muted-foreground">
          (c) 2026 {profile.name}
        </footer>
      </div>
    </main>
  );
}

function ParticleBackground({ theme }: { theme: "light" | "dark" }) {
  const shouldReduceMotion = useReducedMotion();
  const particleColor =
    theme === "dark" ? "hsl(0 0% 96% / 0.62)" : "hsl(0 0% 8% / 0.32)";
  const lineColor =
    theme === "dark" ? "hsl(0 0% 96% / 0.12)" : "hsl(0 0% 8% / 0.09)";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 20%, ${lineColor} 0 1px, transparent 1px), radial-gradient(circle at 80% 40%, ${lineColor} 0 1px, transparent 1px)`,
          backgroundSize: "140px 140px, 190px 190px",
        }}
      />
      {particles.map((particle, index) => (
        <motion.span
          key={`${particle.left}-${particle.top}`}
          className="absolute rounded-full"
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            backgroundColor: particleColor,
            boxShadow: `0 0 ${particle.size * 9}px ${particleColor}`,
          }}
          initial={false}
          animate={
            shouldReduceMotion
              ? { opacity: theme === "dark" ? 0.42 : 0.26 }
              : {
                  x: [0, particle.x, 0],
                  y: [0, particle.y, 0],
                  opacity: [
                    theme === "dark" ? 0.34 : 0.18,
                    theme === "dark" ? 0.72 : 0.42,
                    theme === "dark" ? 0.34 : 0.18,
                  ],
                  scale: [1, index % 2 === 0 ? 1.45 : 1.2, 1],
                }
          }
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function ProjectCard({ work }: { work: Project }) {
  const preview = getProjectPreview(work.href);
  const disabled = work.href === "#";

  return (
    <a
      href={work.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-disabled={disabled}
      className={cn(
        "group block overflow-hidden rounded-md border border-border bg-card transition",
        disabled
          ? "cursor-default"
          : "hover:-translate-y-0.5 hover:border-foreground",
      )}
      onClick={(event) => {
        if (disabled) event.preventDefault();
      }}
    >
      {preview && (
        <span className="block border-b border-border bg-muted p-2">
          <span className="block overflow-hidden rounded-sm border border-border bg-background">
            <span className="flex h-7 items-center gap-1.5 border-b border-border bg-card px-3">
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#ffbd2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
              <span className="ml-2 min-w-0 truncate text-[11px] leading-none text-muted-foreground">
                {preview.host}
              </span>
            </span>
            <span className="relative block aspect-[16/9] overflow-hidden bg-background">
              <iframe
                title={`${work.name} website preview`}
                src={preview.href}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin"
                className="absolute left-0 top-0 h-[285.714%] w-[285.714%] origin-top-left scale-[0.35] border-0"
                tabIndex={-1}
              />
            </span>
          </span>
        </span>
      )}
      <span className="block p-4">
        <span className="flex items-start justify-between gap-4">
          <span className="min-w-0">
            <span className="block text-[15px] font-medium leading-6">
              {work.name} / {work.category}{" "}
              <span className="text-muted-foreground">{work.stack}</span>
            </span>
            {preview && (
              <span className="mt-1 flex items-center gap-1.5 text-[13px] leading-5 text-muted-foreground">
                <Globe2 className="h-3.5 w-3.5" />
                {preview.host}
              </span>
            )}
          </span>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover:text-foreground" />
        </span>
        <span className="mt-2 block text-[14.5px] leading-7 text-muted-foreground">
          {work.description}
        </span>
      </span>
    </a>
  );
}

function getProjectPreview(href: string) {
  if (href === "#") return null;

  try {
    const url = new URL(href);
    if (!["http:", "https:"].includes(url.protocol)) return null;
    if (url.hostname.includes("linkedin.com")) return null;

    return {
      host: url.hostname.replace(/^www\./, ""),
      href: url.href,
    };
  } catch {
    return null;
  }
}

function OpenSourceGroup({
  name,
  description,
  pullRequests,
}: {
  name: string;
  description: string;
  pullRequests: readonly PullRequest[];
}) {
  const mergedCount = pullRequests.filter(
    (pullRequest) =>
      pullRequest.status === "merged" ||
      (!pullRequest.status && Boolean(pullRequest.merged)),
  ).length;

  return (
    <details className="group border-y border-border">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block text-[15px] font-medium leading-6">
            {name}
          </span>
          <span className="mt-1 block text-[14.5px] leading-7 text-muted-foreground">
            {description} {mergedCount} merged PRs.
          </span>
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground transition group-open:rotate-180 group-hover:text-foreground" />
      </summary>
      <div className="border-t border-border">
        {pullRequests.map((pullRequest) => {
          const isMerged =
            pullRequest.status === "merged" ||
            (!pullRequest.status && Boolean(pullRequest.merged));
          const StatusIcon = isMerged ? GitMerge : GitPullRequest;
          const statusText = isMerged
            ? `merged${pullRequest.merged ? ` ${pullRequest.merged}` : ""}`
            : (pullRequest.status ?? "open");

          return (
            <a
              key={pullRequest.href}
              href={pullRequest.href}
              target="_blank"
              rel="noreferrer"
              className="group/pr block border-b border-border py-3 transition last:border-b-0 hover:translate-x-0.5"
            >
              <span className="flex items-start justify-between gap-4">
                <span className="flex min-w-0 items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition group-hover/pr:border-foreground group-hover/pr:text-foreground"
                  >
                    <GitPullRequest className="h-3.5 w-3.5" />
                  </span>
                  <span className="block text-[15px] font-medium leading-6">
                    {pullRequest.title}
                  </span>
                </span>
                <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition group-hover/pr:text-foreground" />
              </span>
              <span className="mt-1 flex items-center gap-1.5 pl-8 text-[14px] leading-6 text-muted-foreground">
                {pullRequest.repo} #{pullRequest.number}
                <span aria-hidden="true" className="text-muted-foreground">
                  /
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <StatusIcon
                    aria-hidden="true"
                    className={cn(
                      "h-3.5 w-3.5",
                      isMerged ? "text-[#8957e5]" : "text-[#1f883d]",
                    )}
                  />
                  {statusText}
                </span>
              </span>
            </a>
          );
        })}
      </div>
    </details>
  );
}

function Section({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={cn(className)}>
      <h2 className="mb-5 font-serif text-[24px] font-normal italic leading-none">
        {title}
      </h2>
      {children}
    </section>
  );
}

function SocialLink({
  label,
  href,
  icon: Icon,
}: {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex h-9 items-center gap-2 rounded-full border border-border px-3 text-muted-foreground transition hover:border-foreground hover:text-foreground"
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </a>
  );
}

function WorkLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const disabled = href === "#";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-disabled={disabled}
      className={cn(
        "group block rounded-sm border-b border-border py-3 transition last:border-b-0",
        disabled ? "cursor-default" : "hover:translate-x-0.5",
      )}
      onClick={(event) => {
        if (disabled) event.preventDefault();
      }}
    >
      {children}
    </a>
  );
}

export default App;
