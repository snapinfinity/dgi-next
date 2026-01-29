import { queryDocuments } from "@/lib/firestore";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://decograph.ae";

export default async function sitemap() {
  // Fetch all published projects
  const projects = await queryDocuments("projects", [
    { field: "status", operator: "==", value: "published" },
  ]);

  const projectUrls = projects.map((project) => ({
    url: `${BASE_URL}/works/${project.slug}`,
    lastModified: project.updatedAt ? new Date(project.updatedAt.seconds * 1000) : new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/works`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.5,
    },
    ...projectUrls,
  ];
}
