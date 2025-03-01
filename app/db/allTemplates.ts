import {
  TemplateDesign,
  TemplateInfo,
  Templates,
} from "../types/templatesTypes";
import { dummyTemplate } from "./sampleTemplate";

const faangPathDesign: TemplateDesign = {
  pageNumber: 1,
  pageCSS:
    "border-solid border-2 border-green-500 rounded-md p-2 flex flex-col gap-2 item-center",
  pageElementCSS: {
    nameCSS: "text-center text-3xl uppercase w-full",
    emailCSS: "",
    phoneCSS: "w-fit",
    addressCSS: "w-fit",
    linkedInCSS: "w-fit",
    githubCSS: "",
    skillsCSS: "",
    hobbiesCSS: "",
    objectiveCSS: "",
    lineCSS: "",
    experiencesContainerCSS: "",
    experienceElementsCSS: {
      experienceElementCSS: "",
      titleCSS: "",
      companyCSS: "",
      locationCSS: "",
      startDateCSS: "",
      endDateCSS: "",
      descriptionCSS: "",
    },
    educationsContainerCSS: "",
    educationElementsCSS: {
      educationElementCSS: "",
      schoolCSS: "",
      degreeCSS: "",
      majorCSS: "",
      startDateCSS: "",
      endDateCSS: "",
      descriptionCSS: "",
    },
    certificationsContainerCSS: "",
    certificateElementsCSS: {
      certificationElementCSS: "",
      nameCSS: "",
      authorityCSS: "",
      licenseCSS: "",
      startDateCSS: "",
      endDateCSS: "",
    },
    projectsContainerCSS: "",
    projectElementsCSS: {
      projectElementCSS: "",
      nameCSS: "",
      technologiesCSS: "",
      githubCSS: "",
      demoCSS: "",
      descriptionCSS: "",
    },
    languagesContainerCSS: "",
    languageElementsCSS: {
      languageElementCSS: "",
      nameCSS: "",
      levelCSS: "",
    },
  },
  pageStructure: [
    "name",
    "phone",
    "address",
    "email",
    "linkedIn",
    "github",
    "objective",
    "educations",
    "skills",
    "certifications",
    "experiences",
    "projects",
    "language",
    "hobbies",
  ],
};

const faangPathTemplate: TemplateInfo = {
  templateName: "FAANG Path",
  templateType: "single", // Default to "single"
  templateDesign: [faangPathDesign],
};

export const TEMPLATES: Templates = [
  //   {
  //     templateName: "",
  //     templateType: "single",
  //     templateDesign: [
  //       {
  //         pageNumber: 1,
  //         pageCSS: "",
  //         pageElementCSS: {
  //           nameCSS: "",
  //           emailCSS: "",
  //           phoneCSS: "",
  //           addressCSS: "",
  //           linkedInCSS: "",
  //           githubCSS: "",
  //           skillsCSS: "",
  //           hobbiesCSS: "",
  //           objectiveCSS: "",
  //           lineCSS: "",
  //           experiencesCSS: "",
  //           experienceElementsCSS: {
  //             titleCSS: "",
  //             companyCSS: "",
  //             locationCSS: "",
  //             startDateCSS: "",
  //             endDateCSS: "",
  //             descriptionCSS: "",
  //           },
  //           educationsCSS: "",
  //           educationElementsCSS: {
  //             schoolCSS: "",
  //             degreeCSS: "",
  //             majorCSS: "",
  //             startDateCSS: "",
  //             endDateCSS: "",
  //             descriptionCSS: "",
  //           },
  //           certificationsCSS: "",
  //           certificateElementsCSS: {
  //             nameCSS: "",
  //             authorityCSS: "",
  //             licenseCSS: "",
  //             startDateCSS: "",
  //             endDateCSS: "",
  //           },
  //           projectsCSS: "",
  //           projectElementsCSS: {
  //             nameCSS: "",
  //             technologiesCSS: "",
  //             githubCSS: "",
  //             demoCSS: "",
  //             descriptionCSS: "",
  //           },
  //           languageCSS: "",
  //           languageElementsCSS: {
  //             nameCSS: "",
  //             levelCSS: "",
  //           },
  //         },
  //         pageStructure: [],
  //       },
  //     ],
  //   },
  dummyTemplate,
  faangPathTemplate,
  // dummyTemplate,
  // dummyTemplate,
  // dummyTemplate,
  // dummyTemplate,
];

// empty states

// Empty variable for TemplateDesign
const emptyTemplateDesign: TemplateDesign = {
  pageNumber: 1,
  pageCSS: "",
  pageElementCSS: {
    nameCSS: "",
    emailCSS: "",
    phoneCSS: "",
    addressCSS: "",
    linkedInCSS: "",
    githubCSS: "",
    skillsCSS: "",
    hobbiesCSS: "",
    objectiveCSS: "",
    lineCSS: "",
    experiencesContainerCSS: "",
    experienceElementsCSS: {
      experienceElementCSS: "",
      titleCSS: "",
      companyCSS: "",
      locationCSS: "",
      startDateCSS: "",
      endDateCSS: "",
      descriptionCSS: "",
    },
    educationsContainerCSS: "",
    educationElementsCSS: {
      educationElementCSS: "",
      schoolCSS: "",
      degreeCSS: "",
      majorCSS: "",
      startDateCSS: "",
      endDateCSS: "",
      descriptionCSS: "",
    },
    certificationsContainerCSS: "",
    certificateElementsCSS: {
      certificationElementCSS: "",
      nameCSS: "",
      authorityCSS: "",
      licenseCSS: "",
      startDateCSS: "",
      endDateCSS: "",
    },
    projectsContainerCSS: "",
    projectElementsCSS: {
      projectElementCSS: "",
      nameCSS: "",
      technologiesCSS: "",
      githubCSS: "",
      demoCSS: "",
      descriptionCSS: "",
    },
    languagesContainerCSS: "",
    languageElementsCSS: {
      languageElementCSS: "",
      nameCSS: "",
      levelCSS: "",
    },
  },
  pageStructure: [],
};

// Empty variable for TemplateInfo
const emptyTemplateInfo: TemplateInfo = {
  templateName: "",
  templateType: "single", // Default to "single"
  templateDesign: [],
};

// Empty variable for Templates
const emptyTemplates: Templates = [];

export const ALL_TEMPLATES: string[] = ["faangSimple"];
