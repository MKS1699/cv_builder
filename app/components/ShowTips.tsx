"use client";

import { ReactNode, useEffect, useState } from "react";
import { Tips } from ".";

interface ShowTipsProps {
  requiredFields: string[];
  activeField: string;
}
const ShowTips = ({ requiredFields, activeField }: ShowTipsProps) => {
  const errTitle = "Error Loading PDF";
  const errContent = `If there is a error saying "Error Loading PDF" then don't worry, you just start editing fields especially the name field and it will go away.`;
  const prvTitle = "Preview PDF";
  const prvContent =
    "The preview may look different than the downloaded PDF because of the scaling and formatting browser does to pdf when it renders the pdf as html.";
  //   console.log(activeField);

  //   name,
  //       address,
  //       email,
  //       linkedIn,
  //       github,
  //       educations,
  //       skills,
  //       phone,
  //       hobbies,
  //       languages,
  //       objective,

  const [requiredFieldsTips, setRequiredFieldsTips] = useState<ReactNode[]>([]);
  const [activeFieldTip, setActiveFieldTip] = useState<ReactNode | null>(null);

  // active field tip
  function createActiveFieldsTips(activeField: string) {
    let tip: ReactNode | null = null;
    switch (activeField) {
      case "name":
        tip = (
          <Tips
            content="Your name is the first thing they'll see!"
            title="Name"
            key={`Tip-${activeField}`}
            type="tip"
            activeMenu={activeField}
            menu="name"
          />
        );
        break;
      case "address":
        tip = (
          <Tips
            content="Make it easy for them to contact you."
            title="Address"
            key={`Tip-${activeField}`}
            type="tip"
            activeMenu={activeField}
            menu="address"
          />
        );
        break;
      case "email":
        tip = (
          <Tips
            content="This is how they'll reach out for an interview."
            title="Email"
            key={`Tip-${activeField}`}
            type="tip"
            activeMenu={activeField}
            menu="email"
          />
        );
        break;
      case "phone":
        tip = (
          <Tips
            content="How will they call you for an interview?"
            title="Mobile Number"
            key={`Tip-${activeField}`}
            type="tip"
            activeMenu={activeField}
            menu="phone"
          />
        );
        break;
      case "linkedIn":
        tip = (
          <Tips
            content="Your professional online presence is important!"
            title="LinkedIn Profile"
            key={`Tip-${activeField}`}
            type="tip"
            activeMenu={activeField}
            menu="linkedIn"
          />
        );
        break;
      case "github":
        tip = (
          <Tips
            content="Show off your coding skills and projects."
            title="GitHub Profile"
            key={`Tip-${activeField}`}
            type="tip"
            activeMenu={activeField}
            menu="github"
          />
        );
        break;
      case "education":
        tip = (
          <Tips
            content="What's your educational background? List it here."
            title="Education"
            key={`Tip-${activeField}`}
            type="tip"
            activeMenu={activeField}
            menu="education"
          />
        );
        break;
      case "skills":
        tip = (
          <Tips
            content="What are you good at? List your most relevant skills."
            title="Skills"
            key={`Tip-${activeField}`}
            type="tip"
            activeMenu={activeField}
            menu="skills"
          />
        );
        break;
      case "hobbies":
        tip = (
          <Tips
            content="Make yourself more relatable. What do you enjoy doing?"
            title="Hobbies"
            key={`Tip-${activeField}`}
            type="tip"
            activeMenu={activeField}
            menu="hobbies"
          />
        );
        break;
      case "languages":
        tip = (
          <Tips
            content="What languages do you speak? This can be a big plus."
            title="Languages"
            key={`Tip-${activeField}`}
            type="tip"
            activeMenu={activeField}
            menu="languages"
          />
        );
        break;
      case "objective":
        tip = (
          <Tips
            content="Tell them what you're looking for in a few sentences."
            title="Objective"
            key={`Tip-${activeField}`}
            type="tip"
            activeMenu={activeField}
            menu="objective"
          />
        );
        break;
      case "projects":
        tip = (
          <Tips
            content="Highlight your best projects to show what you can do."
            title="Projects"
            key={`Tip-${activeField}`}
            type="tip"
            activeMenu={activeField}
            menu="projects"
          />
        );
        break;
      case "experience":
        tip = (
          <Tips
            content="Showcase your professional experience and achievements."
            title="Experience"
            key={`Tip-${activeField}`}
            type="tip"
            activeMenu={activeField}
            menu="experience"
          />
        );
        break;
      case "certificates":
        tip = (
          <Tips
            content="List any relevant certifications you've earned."
            title="Certificates"
            key={`Tip-${activeField}`}
            type="tip"
            activeMenu={activeField}
            menu="certificates"
          />
        );
        break;
      default:
        // console.warn(`No tip configured for field: ${field}`);
        break;
    }
    setActiveFieldTip(tip);
  }

  useEffect(() => {
    createActiveFieldsTips(activeField);
  }, [activeField]);

  // required fields tips
  function createRequiredFieldsTips(requiredFields: string[]) {
    let tips: ReactNode[] = [];
    requiredFields.map((field: string, fieldIndex: number) => {
      tips.push(
        <Tips
          content={`${field[0].toUpperCase()}${field.slice(1)} is required.`}
          title={`${field[0].toUpperCase()}${field.slice(1)}`}
          key={`Tips-Required-Fields-${fieldIndex}`}
          type="alert"
          activeMenu={activeField}
          menu={field}
        />
      );
    });
    setRequiredFieldsTips(tips);
  }

  useEffect(() => {
    createRequiredFieldsTips(requiredFields);
  }, [requiredFields]);

  return (
    <div className="w-full h-auto flex flex-col gap-2">
      {/* pdf loading error tip */}
      <Tips
        content={errContent}
        title={errTitle}
        type="tip"
        activeMenu=""
        menu=""
      />
      {/* pdf preview tip */}
      <Tips
        content={prvContent}
        title={prvTitle}
        type="tip"
        activeMenu=""
        menu=""
      />
      {/* active field tip */}
      {activeFieldTip && activeFieldTip}
      {/* required field tips */}
      {requiredFieldsTips.length > 0 &&
        requiredFieldsTips.map((t: ReactNode) => t)}
    </div>
  );
};

export default ShowTips;
