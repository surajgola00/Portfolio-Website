import surajgolaData from "./surajgola.json";
import member2Data from "./member2.json";
import member3Data from "./member3.json";
import member4Data from "./member4.json";
import {
  createAvatarPlaceholder,
  createSectionPlaceholder,
} from "../../utils/placeholders";

const stripHtml = (value = "") =>
  value
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const getParagraphsFromHtml = (value = "", fallback = "") => {
  const paragraphMatches = value.match(/<p>(.*?)<\/p>/g) ?? [];
  const paragraphs = paragraphMatches
    .map((paragraph) => stripHtml(paragraph))
    .filter(Boolean);

  if (paragraphs.length > 0) {
    return paragraphs;
  }

  return fallback ? [fallback] : [];
};

const normalizeSkills = (skills = []) =>
  skills.map((group) => ({
    category: group.category || "Skills",
    items: Array.isArray(group.items)
      ? group.items
      : Array.isArray(group.tags)
        ? group.tags
        : [],
  }));

const normalizeExperience = (experience = []) =>
  experience.map((item) => ({
    ...item,
    title: item.title || item.position || item.role || "Experience",
    organization: item.organization || item.company || item.institution || "",
    type: item.type || (item.company ? "work" : "experience"),
    date: item.date || item.duration || "",
  }));

const resolveImageUrl = (imageUrl, fallbackLabel) => {
  if (!imageUrl || imageUrl.includes("via.placeholder.com")) {
    return createSectionPlaceholder(fallbackLabel);
  }

  return imageUrl;
};

const normalizeProjects = (projects = []) =>
  projects.map((project) => ({
    ...project,
    imageUrl: resolveImageUrl(project.imageUrl, project.title),
    demoLink: project.demoLink === "#" ? "" : project.demoLink,
    repoLink: project.repoLink === "#" ? "" : project.repoLink,
  }));

const normalizeCertificates = (certificates = []) =>
  certificates.map((certificate) => ({
    ...certificate,
    imageUrl: resolveImageUrl(certificate.imageUrl, certificate.title),
    credentialUrl:
      certificate.credentialUrl === "#" ? "" : certificate.credentialUrl,
  }));

const normalizeAchievements = (achievements = []) =>
  achievements.map((achievement, index) => ({
    id: achievement.id || `achievement-${index + 1}`,
    title: achievement.title || "Achievement",
    issuer: achievement.issuer || achievement.organization || "Achievement",
    date: achievement.date || achievement.year || "",
    description: achievement.description || "",
    credentialUrl:
      achievement.credentialUrl === "#" ? "" : achievement.credentialUrl || "",
  }));

const normalizeMember = (member) => {
  const aboutParagraphs = getParagraphsFromHtml(
    member.aboutHtml || member.about || "",
    member.bio || member.objective || "",
  );

  return {
    ...member,
    slug: member.slug || member.id,
    imageUrl:
      member.imageUrl || member.image || createAvatarPlaceholder(member.name),
    about: stripHtml(member.aboutHtml || member.about || member.bio || ""),
    aboutParagraphs,
    skills: normalizeSkills(member.skills),
    projects: normalizeProjects(member.projects),
    experience: normalizeExperience(member.experience),
    certificates: normalizeCertificates(member.certificates),
    achievements: normalizeAchievements(member.achievements),
    resumeUrl: member.resumeUrl || null,
    resume: member.resume || null,
    contact: {
      email: member.email || "",
      phone: member.phone || "",
      location: member.location || "",
    },
  };
};

export const surajgola = normalizeMember(surajgolaData);
export const member2 = normalizeMember(member2Data);
export const member3 = normalizeMember(member3Data);
export const member4 = normalizeMember(member4Data);

export const MEMBERS_ARRAY = [surajgola, member2, member3, member4];

export const getMemberById = (id) =>
  MEMBERS_ARRAY.find((member) => member.id === id);

export const getAllMembers = () => MEMBERS_ARRAY;
