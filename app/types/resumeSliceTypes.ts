export interface ResumeSliceTypes {
  name: string;
  email: string;
  phone: string;
  address: string;
  linkedIn: string; // profile link
  github: string; // profile link
  skills: string[];
  experiences: {
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  educations: {
    school: string; // school / college name
    degree: string; // degree / class name
    major: string; // specialization name
    startDate: string;
    endDate: string;
    description: string; // description on the degree
  }[];
  projects: {
    name: string;
    description: string;
    technologies: string[];
    github: string; // project github link
    demo: string; // project demo link
  }[];
  certifications: {
    name: string;
    authority: string;
    license: string;
    startDate: string;
    endDate: string;
  }[];
  languages: {
    name: string;
    level: string; //"beginner" | "intermediate" | "advanced";
  }[];
  hobbies: string[];
  objective: string;
}
