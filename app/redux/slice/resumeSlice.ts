import { ResumeSliceTypes } from "@/app/types/resumeSliceTypes";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { resume } from "pdfkit";

const EmptyResumeCertificationsState: ResumeSliceTypes["certifications"] = [
  {
    authority: "",
    endDate: "",
    license: "",
    name: "",
    startDate: "",
  },
];

const EmptyResumeEducationsState: ResumeSliceTypes["educations"] = [
  {
    degree: "",
    description: "",
    endDate: "",
    major: "",
    school: "",
    startDate: "",
  },
];

const EmptyResumeExperiencesState: ResumeSliceTypes["experiences"] = [
  {
    company: "",
    description: "",
    endDate: "",
    location: "",
    startDate: "",
    title: "",
  },
];

const EmptyResumeLanguagesState: ResumeSliceTypes["languages"] = [
  { level: "", name: "" },
];

const EmptyResumeProjectsState: ResumeSliceTypes["projects"] = [
  {
    demo: "",
    description: "",
    github: "",
    name: "",
    technologies: [],
  },
];

export const EmptyResume: ResumeSliceTypes = {
  address: "",
  certifications: EmptyResumeCertificationsState,
  educations: EmptyResumeEducationsState,
  email: "",
  experiences: EmptyResumeExperiencesState,
  github: "",
  hobbies: [],
  languages: EmptyResumeLanguagesState,
  linkedIn: "",
  name: "",
  phone: "",
  projects: EmptyResumeProjectsState,
  skills: [],
  objective: "",
};

const initialState: ResumeSliceTypes = EmptyResume;

export const resumeSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    // reset
    // resume state
    resetResume: (state) => {
      state.address = EmptyResume.address;
      state.certifications = EmptyResume.certifications;
      state.educations = EmptyResume.educations;
      state.email = EmptyResume.email;
      state.experiences = EmptyResume.experiences;
      state.github = EmptyResume.github;
      state.hobbies = EmptyResume.hobbies;
      state.languages = EmptyResume.languages;
      state.linkedIn = EmptyResume.linkedIn;
      state.name = EmptyResume.name;
      state.phone = EmptyResume.phone;
      state.projects = EmptyResume.projects;
      state.skills = EmptyResume.skills;
      state.objective = EmptyResume.objective;
    },
    // update
    setResume: (state, action: PayloadAction<{ resume: ResumeSliceTypes }>) => {
      const {
        address,
        certifications,
        educations,
        email,
        experiences,
        github,
        hobbies,
        languages,
        linkedIn,
        name,
        objective,
        phone,
        projects,
        skills,
      } = action.payload.resume;

      state.address = address;
      state.certifications = certifications;
      state.educations = educations;
      state.email = email;
      state.experiences = experiences;
      state.github = github;
      state.hobbies = hobbies;
      state.languages = languages;
      state.linkedIn = linkedIn;
      state.name = name;
      state.phone = phone;
      state.projects = projects;
      state.skills = skills;
      state.objective = objective;
    },
    setResumeName: (state, action: PayloadAction<ResumeSliceTypes["name"]>) => {
      state.name = action.payload;
    },
    setResumeEmail: (
      state,
      action: PayloadAction<ResumeSliceTypes["email"]>
    ) => {
      state.email = action.payload;
    },
    setResumePhone: (
      state,
      action: PayloadAction<ResumeSliceTypes["phone"]>
    ) => {
      state.phone = action.payload;
    },
    setResumeAddress: (
      state,
      action: PayloadAction<ResumeSliceTypes["address"]>
    ) => {
      state.address = action.payload;
    },
    setResumeLinkedIn: (
      state,
      action: PayloadAction<ResumeSliceTypes["linkedIn"]>
    ) => {
      state.linkedIn = action.payload;
    },
    setResumeGithub: (
      state,
      action: PayloadAction<ResumeSliceTypes["github"]>
    ) => {
      state.github = action.payload;
    },
    setResumeSkills: (
      state,
      action: PayloadAction<ResumeSliceTypes["skills"]>
    ) => {
      state.skills = action.payload;
    },
    setResumeExperiences: (
      state,
      action: PayloadAction<ResumeSliceTypes["experiences"]>
    ) => {
      state.experiences = action.payload;
    },
    setResumeEducations: (
      state,
      action: PayloadAction<ResumeSliceTypes["educations"]>
    ) => {
      state.educations = action.payload;
    },
    setResumeProjects: (
      state,
      action: PayloadAction<ResumeSliceTypes["projects"]>
    ) => {
      state.projects = action.payload;
    },
    setResumeCertifications: (
      state,
      action: PayloadAction<ResumeSliceTypes["certifications"]>
    ) => {
      state.certifications = action.payload;
    },
    setResumeLanguages: (
      state,
      action: PayloadAction<ResumeSliceTypes["languages"]>
    ) => {
      state.languages = action.payload;
    },
    setResumeHobbies: (
      state,
      action: PayloadAction<ResumeSliceTypes["hobbies"]>
    ) => {
      state.hobbies = action.payload;
    },
    setResumeObjective: (
      state,
      action: PayloadAction<ResumeSliceTypes["objective"]>
    ) => {
      state.objective = action.payload;
    },
  },
});

export const {
  resetResume,
  setResume,
  setResumeAddress,
  setResumeCertifications,
  setResumeEducations,
  setResumeEmail,
  setResumeExperiences,
  setResumeGithub,
  setResumeHobbies,
  setResumeLanguages,
  setResumeLinkedIn,
  setResumeName,
  setResumeObjective,
  setResumePhone,
  setResumeProjects,
  setResumeSkills,
} = resumeSlice.actions;

export default resumeSlice.reducer;
