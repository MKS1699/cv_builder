import { ResumeSliceTypes } from "../types/resumeSliceTypes";

export const sampleResume: ResumeSliceTypes = {
  name: "John Doe",
  email: "johndoe@example.com",
  phone: "+1-234-567-8901",
  address: "123 Main Street, City, State, ZIP",
  linkedIn: "https://www.linkedin.com/in/johndoe",
  github: "https://github.com/johndoe",
  skills: ["JavaScript", "React", "Node.js", "CSS", "HTML"],
  experiences: [
    {
      title: "Software Engineer",
      company: "Tech Corp",
      location: "New York, NY",
      startDate: "Jan 2020",
      endDate: "Dec 2023",
      description:
        "Developed web applications using React and Node.js, improving performance by 20%.",
    },
    {
      title: "Software Engineer",
      company: "Tech Corp",
      location: "New York, NY",
      startDate: "Jan 2020",
      endDate: "Dec 2023",
      description:
        "Developed web applications using React and Node.js, improving performance by 20%.",
    },
  ],
  educations: [
    {
      school: "State University",
      degree: "Bachelor of Science",
      major: "Computer Science",
      startDate: "Aug 2016",
      endDate: "Jul 2020",
      description:
        "Graduated with honors, focusing on full-stack web development.",
    },
    {
      school: "State University",
      degree: "Bachelor of Science",
      major: "Computer Science",
      startDate: "Aug 2016",
      endDate: "Jul 2020",
      description:
        "Graduated with honors, focusing on full-stack web development.",
    },
  ],
  projects: [
    {
      name: "Portfolio Website",
      description:
        "A personal portfolio showcasing projects and skills, built with React and CSS.",
      technologies: ["React", "CSS", "JavaScript"],
      github: "https://github.com/johndoe/portfolio",
      demo: "https://johndoe.com",
    },
    {
      name: "Portfolio Website",
      description:
        "A personal portfolio showcasing projects and skills, built with React and CSS.",
      technologies: ["React", "CSS", "JavaScript"],
      github: "https://github.com/johndoe/portfolio",
      demo: "https://johndoe.com",
    },
  ],
  certifications: [
    {
      name: "Certified Web Developer",
      authority: "Tech Certification Institute",
      license: "12345",
      startDate: "Feb 2021",
      endDate: "Jan 2024",
    },
    {
      name: "Certified Web Developer",
      authority: "Tech Certification Institute",
      license: "12345",
      startDate: "Feb 2021",
      endDate: "Jan 2024",
    },
  ],
  languages: [
    {
      name: "English",
      level: "advanced",
    },
    {
      name: "Spanish",
      level: "intermediate",
    },
  ],
  hobbies: ["Chess", "Photography", "Coding"],
  objective:
    "To leverage my skills in software development to contribute to impactful projects and grow professionally in a dynamic environment.",
};
