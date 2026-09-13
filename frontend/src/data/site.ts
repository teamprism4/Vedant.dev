// ─────────────────────────────────────────────────────────────────────────────
// Central site/profile data — single source of truth.
// EDIT ME: update your details, social links, and resume path here.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
    name: "Vedant Garje",
    role: "Software Engineer",
    location: "India",
    email: "vedantgarje3@gmail.com",
    phone: process.env.NEXT_PUBLIC_PHONE,
  
    // Drop your real resume at frontend/public/resume.pdf (keep this path/name,
    // or change it here if you rename the file).
    resumeUrl: process.env.NEXT_PUBLIC_RESUME_URL || "/resume.pdf",
  
    socials: {
      github: "https://github.com/vedant4375",
      linkedin: "https://linkedin/in/vedant-garje-291956356",
      leetcode: "https://leetcode.com/vedant43",
    },
  } as const;
  
  export type Site = typeof site;