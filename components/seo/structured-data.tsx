"use client"

import { Project } from "@/lib/projects";
import Script from "next/script";

export function PersonStructuredData() {
  const personData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Nayan Acharya",
    "alternateName": "Nayan135",
    "url": "https://nayan135.com.np",
    "sameAs": [
      "https://github.com/nayan135",
      "https://linkedin.com/in/nayan135",
      "https://x.com/nooneknows135"
    ],
    "jobTitle": "Developer",
    "knowsAbout": ["Web Development", "Full-Stack Development", "JavaScript", "React", "Next.js"],
    "worksFor": {
      "@type": "Organization",
      "name": "Nayan Acharya Portfolio"
    },
    "image": "https://nayan135.com.np/images/avatars/myself.jpg",
    "description": "Nayan Acharya is a full-stack developer specializing in web development, creating projects like FitGreen and Edumentor."
  };

  return (
    <Script 
      id="person-schema" 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }} 
    />
  );
}

export function ProjectStructuredData({ project }: { project: Project }) {
  const projectData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.title,
    "applicationCategory": "WebApplication",
    "operatingSystem": "All",
    "description": project.description,
    "author": {
      "@type": "Person",
      "name": "Nayan Acharya",
      "url": "https://nayan135.com.np"
    },
    "image": `https://nayan135.com.np${project.image}`,
    "url": project.demoUrl || `https://nayan135.com.np/projects/${project.slug}`,
    "codeRepository": project.githubUrl,
    "programmingLanguage": ["JavaScript", "TypeScript", "React", "Next.js"],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <Script 
      id={`project-schema-${project.slug}`} 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(projectData) }} 
    />
  );
}
