export type Templates = TemplateInfo[];

export interface TemplateInfo {
  templateName: string; // name of the template
  templateType: "multi" | "single"; // single or multi page
  templateDesign: TemplateDesign[];
}

export interface TemplateDesign {
  pageNumber: number; // page number
  pageCSS: string; // css class for page
  pageElementCSS: {
    // single css required
    nameCSS: string;
    emailCSS: string;
    phoneCSS: string;
    addressCSS: string;
    linkedInCSS: string;
    githubCSS: string;
    skillsCSS: string;
    hobbiesCSS: string;
    objectiveCSS: string;
    lineCSS: string;
    // multi css required
    experiencesContainerCSS: string;
    experienceElementsCSS: {
      experienceElementCSS: string;
      titleCSS: string;
      companyCSS: string;
      locationCSS: string;
      startDateCSS: string;
      endDateCSS: string;
      descriptionCSS: string;
    };
    educationsContainerCSS: string;
    educationElementsCSS: {
      educationElementCSS: string;
      schoolCSS: string;
      degreeCSS: string;
      majorCSS: string;
      startDateCSS: string;
      endDateCSS: string;
      descriptionCSS: string;
    };
    certificationsContainerCSS: string;
    certificateElementsCSS: {
      certificationElementCSS: string;
      nameCSS: string;
      authorityCSS: string;
      licenseCSS: string;
      startDateCSS: string;
      endDateCSS: string;
    };
    projectsContainerCSS: string;
    projectElementsCSS: {
      projectElementCSS: string;
      nameCSS: string;
      technologiesCSS: string;
      githubCSS: string;
      demoCSS: string;
      descriptionCSS: string;
    };
    languagesContainerCSS: string;
    languageElementsCSS: {
      languageElementCSS: string;
      nameCSS: string;
      levelCSS: string;
    };
  };
  pageStructure: string[];
  // | "name"
  // | "email"
  // | "phone"
  // | "address"
  // | "linkedIn"
  // | "github"
  // | "skills"
  // | "hobbies"
  // | "objective"
  // | "experiences"
  // | "educations"
  // | "certifications"
  // | "projects"
  // | "language"
  // | "line"
}

// const t: TemplateDesign = {
//   pageCSS: "",
//   pageElementCSS: {},
//   pageNumber: 1,
//   pageStructure: [
//     "name",
//     "email",
//     "phone",
//     "address",
//     "linkedIn",
//     "github",
//     "skills",
//     "hobbies",
//     "objectives",
//     "experiences",
//     "educations",
//     "certifications",
//     "projects",
//     "language",
//     "line",
//   ],
// };
