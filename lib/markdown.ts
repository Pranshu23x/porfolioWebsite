import fs from "fs";
import path from "path";

export interface MarkdownContent {
  hero: {
    name: string;
    tagline: string;
    description: string;
  };
  about: string;
  skillset: {
    focus: string[];
    techStack: string[];
    infrastructure: string[];
    currentDirection: string[];
  };
  signals: string[];
  projects: Array<{
    title: string;
    problem: string;
    solution: string;
    impact: string;
    techStack: string[];
    status?: string;
    isFlagship?: boolean;
    takeaways?: string[];
  }>;
  engineeringApproach: Array<{
    title: string;
    description: string;
  }>;
  hireability: {
    points: Array<{
      title: string;
      description: string;
    }>;
    expectations: string[];
  };
  direction: {
    focus: string;
    longTerm: string;
  };
  footer: {
    name: string;
    label: string;
    links: Array<{ name: string; url: string }>;
  };
}

export function getMarkdownContent(): MarkdownContent {
  const filePath = path.join(process.cwd(), "markdown.md");
  const fileContent = fs.readFileSync(filePath, "utf-8").replace(/\r\n/g, "\n");

  // Robust sections splitting
  const sections = fileContent.split(/\n(?=#[^#]|##[^#])/);

  const heroSection = sections[0].trim();
  const nameMatch = heroSection.match(/# (.*)/);
  const heroLines = heroSection.split("\n").filter(l => l.trim() && !l.startsWith("#"));
  const description = heroLines.filter(l => !l.includes("[View Work]")).join("\n");

  const findSection = (query: string) => sections.find(s => s.toLowerCase().includes(query.toLowerCase())) || "";

  // Robust About Me extraction
  const lines = fileContent.split("\n");
  const aboutIdx = lines.findIndex(l => l.toLowerCase().includes("about me") && l.startsWith("##"));
  let aboutContent = "";
  if (aboutIdx !== -1) {
    const nextHeaderIdx = lines.findIndex((l, i) => i > aboutIdx && (l.startsWith("#") || l.startsWith("---")));
    aboutContent = lines.slice(aboutIdx + 1, nextHeaderIdx !== -1 ? nextHeaderIdx : undefined).join("\n").trim();
  }

  const skillsetSection = findSection("Skillset");
  const signalsSection = findSection("Signals");
  const projectsAll = findSection("Projects");
  const engineeringSection = findSection("Approach");
  const hireabilitySection = findSection("Hireability");
  const directionSection = findSection("Direction");
  
  const getListItems = (text: string, header: string) => {
    const sectionMatch = text.match(new RegExp(`\\*\\*${header}\\*\\*([\\s\\S]*?)(?=\\n\\*\\*|$)`));
    if (!sectionMatch) return [];
    return sectionMatch[1].split("\n").map(l => l.replace(/^[-*]\s*/, "").trim()).filter(Boolean);
  };

  const skillset = {
    focus: getListItems(skillsetSection, "Focus"),
    techStack: getListItems(skillsetSection, "Tech Stack"),
    infrastructure: getListItems(skillsetSection, "Infrastructure"),
    currentDirection: getListItems(skillsetSection, "Current Direction")
  };

  const signals = signalsSection.split("\n")
    .map(l => l.replace(/^[-*]\s*/, "").trim())
    .filter(l => l && !l.startsWith("#") && !l.includes("No tutorials"));

  const projectBlocks = projectsAll.split(/\n(?=## )/);
  const projects = projectBlocks.slice(1).map(block => {
    const titleMatch = block.match(/## (.*)/);
    const title = titleMatch?.[1] || "";
    const isFlagship = title.includes("(Flagship)");
    
    const getSubSection = (t: string, heads: string[]) => {
      for (const head of heads) {
        const match = t.match(new RegExp(`### ${head}([\\s\\S]*?)(?=\\n### |$)`));
        if (match) return match[1].trim();
      }
      return "";
    };

    return {
      title: title.replace("(Flagship)", "").trim(),
      isFlagship,
      problem: getSubSection(block, ["What It Is", "What It Solves"]),
      solution: getSubSection(block, ["Why It Exists", "Solution"]),
      impact: getSubSection(block, ["Key Outcomes", "Highlights", "What It Does"]),
      techStack: getSubSection(block, ["System Design Thinking"]).split("\n")
        .map(l => l.replace(/^[-*]\s*/, "").trim()).filter(Boolean),
      status: getSubSection(block, ["Status"]) || ""
    };
  });

  const points: any[] = [];
  const pointMatches = hireabilitySection.matchAll(/### \d+\. (.*)\n([\s\S]*?)(?=\n### |$)/g);
  for (const match of pointMatches) {
    points.push({ title: match[1].trim(), description: match[2].trim() });
  }
  
  const expectationsText = hireabilitySection.match(/## What You Can Expect From Me([\s\S]*?)(?=#|$)/)?.[1] || "";
  const expectations = expectationsText.split("\n")
    .map(l => l.replace(/^[-*]\s*/, "").trim())
    .filter(Boolean);

  const directionFocus = directionSection.match(/reduce friction between:\n\*\*(.*)\*\*/)?.[1] || "";
  const longTerm = directionSection.match(/## 🔮 Long-Term([\s\S]*?)(?=#|$)/)?.[1]?.trim() || "";

  const lastSection = sections[sections.length - 1];
  const nameLine = lastSection.match(/\*\*(.*?)\*\*/)?.[1] || nameMatch?.[1] || "Pranshu Kumar";
  const labelLine = lastSection.match(/`(.*?)`/)?.[1] || "Systems & Intelligence";
  const footerLinks: any[] = [];
  const linkMatches = lastSection.matchAll(/\[(.*?)\]\((.*?)\)/g);
  for (const match of linkMatches) {
    footerLinks.push({ name: match[1], url: match[2] });
  }

  return {
    hero: {
      name: nameMatch?.[1] || "Pranshu",
      tagline: "I build things because I can’t tolerate inefficient systems.",
      description: description
    },
    about: aboutContent,
    skillset,
    signals,
    projects,
    engineeringApproach: [
      { title: "Ownership", description: "I don’t just write features. I take responsibility for outcomes." },
      { title: "Systems Thinking", description: "I design for scale, modularity, and maintainability from day one." },
      { title: "Execution Speed", description: "I ship fast, iterate faster, and prioritize feedback over perfection." },
      { title: "Practical AI", description: "I use AI where it adds leverage — not where it adds hype." }
    ],
    hireability: { points, expectations },
    direction: { focus: directionFocus, longTerm },
    footer: { name: nameLine, label: labelLine, links: footerLinks }
  };
}
