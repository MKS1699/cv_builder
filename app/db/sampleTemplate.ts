import { TemplateInfo, Templates } from "../types/templatesTypes";

export const dummyTemplate: TemplateInfo = {
  templateName: "Modern Resume",
  templateType: "single",
  templateDesign: [
    {
      pageNumber: 1,
      pageCSS: "border-solid border-2 border-green-500 rounded-md p-2",
      pageElementCSS: {
        nameCSS: "text-lg font-bold",
        emailCSS: "text-sm text-gray-600",
        phoneCSS: "text-sm text-gray-600",
        addressCSS: "text-sm text-gray-600",
        linkedInCSS: "text-sm text-blue-500",
        githubCSS: "text-sm text-blue-500",
        skillsCSS: "text-base font-medium",
        hobbiesCSS: "text-base font-medium",
        objectiveCSS: "text-base italic",
        lineCSS: "border-t border-gray-300 my-2",
        experiencesContainerCSS: "text-base font-semibold",
        experienceElementsCSS: {
          experienceElementCSS: "flex flex-col gap-2 item-center",
          titleCSS: "text-lg font-bold",
          companyCSS: "text-md font-semibold",
          locationCSS: "text-sm italic",
          startDateCSS: "text-sm",
          endDateCSS: "text-sm",
          descriptionCSS: "text-sm text-gray-700",
        },
        educationsContainerCSS: "text-base font-semibold",
        educationElementsCSS: {
          educationElementCSS: "flex flex-col gap-2 item-center",
          schoolCSS: "text-lg font-bold",
          degreeCSS: "text-md font-semibold",
          majorCSS: "text-sm italic",
          startDateCSS: "text-sm",
          endDateCSS: "text-sm",
          descriptionCSS: "text-sm text-gray-700",
        },
        certificationsContainerCSS: "text-base font-semibold",
        certificateElementsCSS: {
          certificationElementCSS: "flex flex-col gap-2 item-center",
          nameCSS: "text-lg font-bold",
          authorityCSS: "text-md font-semibold",
          licenseCSS: "text-sm italic",
          startDateCSS: "text-sm",
          endDateCSS: "text-sm",
        },
        projectsContainerCSS: "text-base font-semibold",
        projectElementsCSS: {
          projectElementCSS: "flex flex-col gap-2 item-center",
          nameCSS: "text-lg font-bold",
          technologiesCSS: "text-sm italic",
          githubCSS: "text-sm text-blue-500",
          demoCSS: "text-sm text-blue-500",
          descriptionCSS: "text-sm text-gray-700",
        },
        languagesContainerCSS: "text-base font-semibold",
        languageElementsCSS: {
          languageElementCSS: "flex flex-col gap-2 item-center",
          nameCSS: "text-lg font-bold",
          levelCSS: "text-sm italic",
        },
      },
      pageStructure: [
        // Personal Information Section
        "name",
        "email",
        "phone",
        "address",
        "linkedIn",
        "github",
        // Divider or Separator
        "line",
        // Objective Section
        "objective",
        // Divider or Separator
        "line",
        // Skills and Hobbies Section
        "skills",
        "hobbies",
        // Divider or Separator
        "line",
        // Professional Experience Section
        "experiences",
        // Divider or Separator
        "line",
        // Educational Background Section
        "educations",
        // Divider or Separator
        "line",
        // Certifications Section
        "certifications",
        // Divider or Separator
        "line",
        // Projects Section
        "projects",
        // Divider or Separator
        "line",
        // Languages Section
        "language",
      ],
    },
  ],
};
