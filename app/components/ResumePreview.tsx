"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import { ResumeSliceTypes } from "../types/resumeSliceTypes";
import { TemplateDesign, TemplateInfo } from "../types/templatesTypes";
import LineComponent from "./LineComponent";
import { useAppDispatch } from "../hooks/storeHooks";
import { addTemplateId } from "../redux/slice/templatesSlice";

interface ResumePreviewPropsTypes {
  data: ResumeSliceTypes;
  templateInfo: TemplateInfo;
  children?: ReactNode;
  id: string;
}

const ResumePreview = ({
  children,
  data,
  templateInfo,
  id,
}: ResumePreviewPropsTypes) => {
  const dispatch = useAppDispatch();
  // resume pages
  const [pages, setPages] = useState<ReactNode[]>([]);
  // resume pages elements
  const generatePages = () => {
    // template info
    const { templateDesign, templateName, templateType } = templateInfo;
    // resume data
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
    } = data; // resume data

    // creating page for each page in template design
    templateDesign.forEach((page: TemplateDesign, pageIndex: number) => {
      // page info
      const { pageCSS, pageElementCSS, pageNumber, pageStructure } = page;
      // page elements css
      const {
        nameCSS,
        addressCSS,
        certificateElementsCSS,
        certificationsContainerCSS,
        educationElementsCSS,
        educationsContainerCSS,
        experiencesContainerCSS,
        languagesContainerCSS,
        languageElementsCSS,
        projectElementsCSS,
        projectsContainerCSS,
        skillsCSS,
        hobbiesCSS,
        objectiveCSS,
        emailCSS,
        experienceElementsCSS,
        githubCSS,
        lineCSS,
        linkedInCSS,
        phoneCSS,
      } = pageElementCSS;
      // creating elements for the page
      const elements: ReactNode[] = []; // elements array based on page structure
      // elements for the page
      pageStructure.forEach((element: string, elementIndex: number) => {
        switch (element) {
          case "name":
            elements.push(
              <Element
                className={nameCSS}
                content={name}
                id={`Resume-template-${templateName}-page-${pageNumber}-name-${elementIndex}`}
                key={`Resume-template-${templateName}-page-${pageNumber}-name-${elementIndex}`}
              />
            );
            break;
          case "linkedIn":
            elements.push(
              <Element
                className={linkedInCSS}
                content={"LinkedIn"}
                link
                href={linkedIn}
                linkType="link"
                id={`Resume-template-${templateName}-page-${pageNumber}-linkedIn-${elementIndex}`}
                key={`Resume-template-${templateName}-page-${pageNumber}-linkedIn-${elementIndex}`}
              />
            );
            break;
          case "github":
            elements.push(
              <Element
                className={githubCSS}
                content={"Github"}
                link
                linkType="link"
                href={github}
                id={`Resume-template-${templateName}-page-${pageNumber}-github-${elementIndex}`}
                key={`Resume-template-${templateName}-page-${pageNumber}-github-${elementIndex}`}
              />
            );
            break;
          case "address":
            elements.push(
              <Element
                className={addressCSS}
                id={`Resume-template-${templateName}-page-${pageNumber}-address-${elementIndex}`}
                content={address}
                key={`Resume-template-${templateName}-page-${pageNumber}-address-${elementIndex}`}
              />
            );
            break;
          case "objective":
            elements.push(
              <Element
                className={objectiveCSS}
                content={"Objective"}
                id={`Resume-template-${templateName}-page-${pageNumber}-objective-${elementIndex}`}
                key={`Resume-template-${templateName}-page-${pageNumber}-objective-${elementIndex}`}
              >
                <Element
                  content={objective}
                  id={`Resume-template-${templateName}-page-${pageNumber}-objective-${elementIndex}-objective`}
                />
              </Element>
            );
            break;
          case "line":
            elements.push(
              <LineComponent
                className={lineCSS}
                key={`Resume-template-${templateName}-page-${pageNumber}-objective-${elementIndex}`}
              />
            );
            break;
          case "email":
            elements.push(
              <Element
                className={emailCSS}
                //   content={email}
                id={`Resume-template-${templateName}-page-${pageNumber}-emails-${elementIndex}`}
                key={`Resume-template-${templateName}-page-${pageNumber}-emails-${elementIndex}`}
              >
                <Element
                  content={email[0]}
                  id={`Resume-template-${templateName}-page-${pageNumber}-emails-${elementIndex}-email-1`}
                  key={`Resume-template-${templateName}-page-${pageNumber}-emails-${elementIndex}-email-1`}
                  link
                  linkType="mail"
                  href={email[0]}
                />
                {/* creating second email element if it exists */}
                {email[1] && (
                  <Element
                    content={email[1]}
                    id={`Resume-template-${templateName}-page-${pageNumber}-emails-${elementIndex}-email-2`}
                    key={`Resume-template-${templateName}-page-${pageNumber}-emails-${elementIndex}-email-2`}
                    link
                    linkType="mail"
                    href={email[1]}
                  />
                )}
              </Element>
            );
            break;
          case "phone":
            elements.push(
              <Element
                className={phoneCSS}
                //   content={phone}
                id={`Resume-template-${templateName}-page-${pageNumber}-phones-${elementIndex}`}
                key={`Resume-template-${templateName}-page-${pageNumber}-phones-${elementIndex}`}
              >
                <Element
                  content={phone[0]}
                  id={`Resume-template-${templateName}-page-${pageNumber}-phones-${elementIndex}-phone-1`}
                  key={`Resume-template-${templateName}-page-${pageNumber}-phones-${elementIndex}-phone-1`}
                  link
                  linkType="phone"
                  href={phone[0]}
                />
                {/* creating second phone element if it exists */}
                {phone[1] && (
                  <Element
                    content={phone[1]}
                    id={`Resume-template-${templateName}-page-${pageNumber}-phones-${elementIndex}-phone-2`}
                    key={`Resume-template-${templateName}-page-${pageNumber}-phones-${elementIndex}-phone-2`}
                    link
                    linkType="phone"
                    href={phone[0]}
                  />
                )}
              </Element>
            );
            break;
          case "skills":
            elements.push(
              <Element
                className={skillsCSS}
                content={"Skills"}
                id={`Resume-template-${templateName}-page-${pageNumber}-skills-${elementIndex}`}
                key={`Resume-template-${templateName}-page-${pageNumber}-skills-${elementIndex}`}
              >
                {skills.map((skill: string, skillIndex: number) => {
                  return (
                    <Element
                      id={`Resume-template-${templateName}-page-${pageNumber}-skills-${elementIndex}-skill-${skillIndex}`}
                      key={`Resume-template-${templateName}-page-${pageNumber}-skills-${elementIndex}-skill-${skillIndex}`}
                      content={skill}
                    />
                  );
                })}
              </Element>
            );
            break;
          case "hobbies":
            elements.push(
              <Element
                className={hobbiesCSS}
                content={"Hobbies"}
                id={`Resume-template-${templateName}-page-${pageNumber}-hobbies-${elementIndex}`}
                key={`Resume-template-${templateName}-page-${pageNumber}-hobbies-${elementIndex}`}
              >
                {hobbies.map((hobby: string, hobbyIndex: number) => {
                  return (
                    <Element
                      id={`Resume-template-${templateName}-page-${pageNumber}-hobbies-${elementIndex}-hobby-${hobbyIndex}`}
                      key={`Resume-template-${templateName}-page-${pageNumber}-hobbies-${elementIndex}-hobby-${hobbyIndex}`}
                      content={hobby}
                    />
                  );
                })}
              </Element>
            );
            break;
          case "experiences":
            elements.push(
              <Element
                className={experiencesContainerCSS}
                content={"Experiences"}
                id={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}`}
                key={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}`}
              >
                {experiences.map(
                  (
                    experience: ResumeSliceTypes["experiences"][0],
                    expIndex: number
                  ) => {
                    const {
                      company,
                      description,
                      endDate,
                      location,
                      startDate,
                      title,
                    } = experience;
                    const {
                      companyCSS,
                      descriptionCSS,
                      endDateCSS,
                      locationCSS,
                      startDateCSS,
                      titleCSS,
                      experienceElementCSS,
                    } = experienceElementsCSS;
                    return (
                      <Element
                        id={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}-experience-${expIndex}`}
                        key={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}-experience-${expIndex}`}
                        className={experienceElementCSS}
                      >
                        {/* title */}
                        <Element
                          className={titleCSS}
                          content={title}
                          id={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}-experience-${expIndex}-title`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}-experience-${expIndex}-title`}
                        />
                        {/* company */}
                        <Element
                          className={companyCSS}
                          content={company}
                          id={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}-experience-${expIndex}-company`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}-experience-${expIndex}-company`}
                        />
                        {/* location */}
                        <Element
                          className={locationCSS}
                          content={location}
                          id={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}-experience-${expIndex}-location`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}-experience-${expIndex}-location`}
                        />
                        {/* dates */}
                        <Element
                          // className={}
                          // content={}
                          id={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}-experience-${expIndex}-dates`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}-experience-${expIndex}-dates`}
                        >
                          {/* startDate */}
                          <Element
                            className={startDateCSS}
                            content={startDate}
                            id={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}-experience-${expIndex}-dates-startDateCSS`}
                            key={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}-experience-${expIndex}-startDateCSS`}
                          />
                          {/* endDate */}
                          <Element
                            className={endDateCSS}
                            content={endDate}
                            id={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}-experience-${expIndex}-dates-endDate`}
                            key={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}-experience-${expIndex}-endDate`}
                          />
                        </Element>
                        {/* description */}
                        <Element
                          className={descriptionCSS}
                          content={description}
                          id={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}-experience-${expIndex}-description`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-experiences-${elementIndex}-experience-${expIndex}-description`}
                        />
                      </Element>
                    );
                  }
                )}
              </Element>
            );
            break;
          case "educations":
            elements.push(
              <Element
                className={educationsContainerCSS}
                content={"Educations"}
                id={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}`}
                key={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}`}
              >
                {educations.map(
                  (
                    education: ResumeSliceTypes["educations"][0],
                    edIndex: number
                  ) => {
                    const {
                      degree,
                      description,
                      endDate,
                      major,
                      school,
                      startDate,
                    } = education;
                    const {
                      degreeCSS,
                      descriptionCSS,
                      endDateCSS,
                      majorCSS,
                      schoolCSS,
                      startDateCSS,
                      educationElementCSS,
                    } = educationElementsCSS;

                    return (
                      <Element
                        id={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}-educations-${edIndex}`}
                        key={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}-educations-${edIndex}`}
                        className={educationElementCSS}
                      >
                        {/* school */}
                        <Element
                          id={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}education-school`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}education-school`}
                          className={schoolCSS}
                          content={school}
                        />
                        {/* degree */}
                        <Element
                          id={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}-education-degree`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}-education-degree`}
                          className={degreeCSS}
                          content={degree}
                        />
                        {/* major */}
                        <Element
                          id={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}-education-major`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}-education-major`}
                          className={majorCSS}
                          content={major}
                        />
                        {/* dates */}
                        <Element
                          // className={}
                          // content={}
                          id={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}-education-${edIndex}-dates`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}-education-${edIndex}-dates`}
                        >
                          {/* startDate */}
                          <Element
                            className={startDateCSS}
                            content={startDate}
                            id={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}-education-${edIndex}-dates-startDate`}
                            key={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}-education-${edIndex}-startDate`}
                          />
                          {/* endDate */}
                          <Element
                            className={endDateCSS}
                            content={endDate}
                            id={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}-education-${edIndex}-dates-endDate`}
                            key={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}-education-${edIndex}-endDate`}
                          />
                        </Element>
                        {/* description */}
                        <Element
                          id={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}-education-description`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-educations-${elementIndex}-education-description`}
                          className={descriptionCSS}
                          content={description}
                        />
                      </Element>
                    );
                  }
                )}
              </Element>
            );
            break;
          case "certifications":
            elements.push(
              <Element
                className={certificationsContainerCSS}
                content={"Certifications"}
                id={`Resume-template-${templateName}-page-${pageNumber}-certifications-${elementIndex}`}
                key={`Resume-template-${templateName}-page-${pageNumber}-certifications-${elementIndex}`}
              >
                {certifications.map(
                  (
                    certificate: ResumeSliceTypes["certifications"][0],
                    certIndex: number
                  ) => {
                    const { authority, endDate, license, name, startDate } =
                      certificate;
                    const {
                      authorityCSS,
                      endDateCSS,
                      licenseCSS,
                      nameCSS,
                      startDateCSS,
                      certificationElementCSS,
                    } = certificateElementsCSS;
                    return (
                      <Element
                        className={certificationElementCSS}
                        id={`Resume-template-${templateName}-page-${pageNumber}-certifications-${elementIndex}-certificate-${certIndex}`}
                        key={`Resume-template-${templateName}-page-${pageNumber}-certifications-${elementIndex}-certificate-${certIndex}`}
                      >
                        {/* name */}
                        <Element
                          className={nameCSS}
                          content={name}
                          id={`Resume-template-${templateName}-page-${pageNumber}-certifications-${elementIndex}-certificate-${certIndex}-name`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-certifications-${elementIndex}-certificate-${certIndex}-name`}
                        />
                        {/* authority */}
                        <Element
                          className={authorityCSS}
                          content={authority}
                          id={`Resume-template-${templateName}-page-${pageNumber}-certifications-${elementIndex}-certificate-${certIndex}-authority`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-certifications-${elementIndex}-certificate-${certIndex}-authority`}
                        />
                        {/* license */}
                        <Element
                          className={licenseCSS}
                          content={license}
                          id={`Resume-template-${templateName}-page-${pageNumber}-certifications-${elementIndex}-certificate-${certIndex}-license`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-certifications-${elementIndex}-certificate-${certIndex}-license`}
                        />
                        {/* dates */}
                        <Element
                          // className={}
                          // content={}
                          id={`Resume-template-${templateName}-page-${pageNumber}-certifications-${elementIndex}-certificate-${certIndex}-dates`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-certifications-${elementIndex}-certificate-${certIndex}-dates`}
                        >
                          {/* startDate */}
                          <Element
                            className={startDateCSS}
                            content={startDate}
                            id={`Resume-template-${templateName}-page-${pageNumber}-certifications-${elementIndex}-certificate-${certIndex}-dates-startDate`}
                            key={`Resume-template-${templateName}-page-${pageNumber}-certifications-${elementIndex}-certificate-${certIndex}-startDate`}
                          />
                          {/* endDate */}
                          <Element
                            className={endDateCSS}
                            content={endDate}
                            id={`Resume-template-${templateName}-page-${pageNumber}-certifications-${elementIndex}-certificate-${certIndex}-dates-endDate`}
                            key={`Resume-template-${templateName}-page-${pageNumber}-certifications-${elementIndex}-certificate-${certIndex}-endDate`}
                          />
                        </Element>
                      </Element>
                    );
                  }
                )}
              </Element>
            );
            break;
          case "projects":
            elements.push(
              <Element
                className={projectsContainerCSS}
                //   content={projects}
                id={`Resume-template-${templateName}-page-${pageNumber}-projects-${elementIndex}`}
                key={`Resume-template-${templateName}-page-${pageNumber}-projects-${elementIndex}`}
                content={"Projects"}
              >
                {projects.map(
                  (
                    project: ResumeSliceTypes["projects"][0],
                    pIndex: number
                  ) => {
                    const { demo, description, github, name, technologies } =
                      project;
                    const {
                      demoCSS,
                      descriptionCSS,
                      githubCSS,
                      nameCSS,
                      technologiesCSS,
                      projectElementCSS,
                    } = projectElementsCSS;

                    return (
                      <Element
                        className={projectElementCSS}
                        id={`Resume-template-${templateName}-page-${pageNumber}-projects-${elementIndex}-project-${pIndex}`}
                        key={`Resume-template-${templateName}-page-${pageNumber}-projects-${elementIndex}-project-${pIndex}`}
                      >
                        {/* name */}
                        <Element
                          className={nameCSS}
                          content={name}
                          id={`Resume-template-${templateName}-page-${pageNumber}-projects-${elementIndex}-project-${pIndex}-name`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-projects-${elementIndex}-project-${pIndex}-name`}
                        />
                        {/* demo */}
                        <Element
                          className={demoCSS}
                          content={"Website"}
                          id={`Resume-template-${templateName}-page-${pageNumber}-projects-${elementIndex}-project-${pIndex}-demo`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-projects-${elementIndex}-project-${pIndex}-demo`}
                          link
                          linkType="link"
                          href={demo}
                        />
                        {/* github */}
                        <Element
                          className={githubCSS}
                          content={"Github"}
                          id={`Resume-template-${templateName}-page-${pageNumber}-projects-${elementIndex}-project-${pIndex}-github`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-projects-${elementIndex}-project-${pIndex}-github`}
                          link
                          linkType="link"
                          href={github}
                        />
                        {/* description */}
                        <Element
                          className={descriptionCSS}
                          content={description}
                          id={`Resume-template-${templateName}-page-${pageNumber}-projects-${elementIndex}-project-${pIndex}-description`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-projects-${elementIndex}-project-${pIndex}-description`}
                        />
                        {/* technologies */}
                        <Element
                          className={technologiesCSS}
                          //   content={technologies}
                          id={`Resume-template-${templateName}-page-${pageNumber}-projects-${elementIndex}-project-${pIndex}-technologies`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-projects-${elementIndex}-project-${pIndex}-technologies`}
                        >
                          {technologies.map(
                            (technology: string, techIndex: number) => {
                              return (
                                <Element
                                  //   className={}
                                  content={technology}
                                  id={`Resume-template-${templateName}-page-${pageNumber}-projects-${elementIndex}-project-${pIndex}-technologies-technology-${techIndex}`}
                                  key={`Res /ume-template-${templateName}-page-${pageNumber}-projects-${elementIndex}-project-${pIndex}-technologies-technology-${techIndex}`}
                                />
                              );
                            }
                          )}
                        </Element>
                      </Element>
                    );
                  }
                )}
              </Element>
            );
            break;
          case "language":
            elements.push(
              <Element
                className={languagesContainerCSS}
                //   content={languages}
                id={`Resume-template-${templateName}-page-${pageNumber}-languages-${elementIndex}`}
                key={`Resume-template-${templateName}-page-${pageNumber}-languages-${elementIndex}`}
                content={"Languages"}
              >
                {languages.map(
                  (
                    language: ResumeSliceTypes["languages"][0],
                    langIndex: number
                  ) => {
                    const { level, name } = language;
                    const { levelCSS, nameCSS, languageElementCSS } =
                      languageElementsCSS;

                    return (
                      <Element
                        className={languageElementCSS}
                        id={`Resume-template-${templateName}-page-${pageNumber}-languages-${elementIndex}-language-${langIndex}`}
                        key={`Resume-template-${templateName}-page-${pageNumber}-languages-${elementIndex}-language-${langIndex}`}
                      >
                        {/* name */}
                        <Element
                          className={nameCSS}
                          content={name}
                          id={`Resume-template-${templateName}-page-${pageNumber}-languages-${elementIndex}-language-${langIndex}-name`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-languages-${elementIndex}-language-${langIndex}-name`}
                        />
                        {/* level */}
                        <Element
                          className={levelCSS}
                          content={level}
                          id={`Resume-template-${templateName}-page-${pageNumber}-languages-${elementIndex}-language-${langIndex}-level`}
                          key={`Resume-template-${templateName}-page-${pageNumber}-languages-${elementIndex}-language-${langIndex}-level`}
                        />
                      </Element>
                    );
                  }
                )}
              </Element>
            );
            break;
          default:
            break;
        }
      });

      // creating page element
      if (pages.length <= 0) {
        const pageElement: ReactNode[] = [];
        pageElement.push(
          <Element
            className={`${pageCSS} w-a4 h-a4`}
            id={`Resume-template-${templateName}-page-${pageNumber}`}
            key={`Resume-template-${templateName}-page-${pageNumber}`}
          >
            {elements.map((element: ReactNode) => element)}
          </Element>
        );
        setPages(pageElement);
      } else {
        const pageElement: ReactNode[] = [...pages];
        pageElement.push(
          <Element
            className={`${pageCSS} w-a4 h-a4`}
            id={`Resume-template-${templateName}-page-${pageNumber}`}
            key={`Resume-template-${templateName}-page-${pageNumber}`}
          >
            {elements.map((element: ReactNode) => element)}
          </Element>
        );
        setPages(pageElement);
      }
    });
  };

  // generating pages on component mount
  useEffect(() => {
    generatePages();
    dispatch(addTemplateId(id));
  }, [dispatch, id]);

  return (
    <div
      id={id}
      className="w-full h-full flex flex-col items-center justify-center"
    >
      {pages.map((page: ReactNode) => page)}
    </div>
  );
};
export default ResumePreview;

const Element = ({
  content,
  className,
  id,
  children,
  link,
  href,
  linkType,
}: {
  content?: string | string[];
  className?: string[] | string;
  id: string;
  children?: ReactNode;
  link?: boolean;
  href?: string;
  linkType?: "link" | "mail" | "phone";
}) => {
  const [linkTo, setLinkTo] = useState<string>(""); // making link more dynamic
  // setting linkTo based on linkType
  useEffect(() => {
    if (linkType) {
      switch (linkType) {
        case "mail":
          setLinkTo(`mailto:${href}`);
          break;
        case "phone":
          setLinkTo(`tel:${href}`);
        default:
          setLinkTo(`${href}`);
      }
    }
  }, [linkType]);
  return (
    <>
      {link ? (
        <a
          href={linkTo}
          className={`${className}`}
          key={id}
          id={id}
          target="_blank"
        >
          {/* rendering content if content */}
          {content && content}
          {/* rendering children if children */}
          {children && children}
        </a>
      ) : (
        <div className={`${className}`} key={id} id={id}>
          {/* rendering content if content */}
          {content && content}
          {/* rendering children if children */}
          {children && children}
        </div>
      )}
    </>
  );
};
