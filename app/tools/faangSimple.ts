import { ResumeSliceTypes } from "../types/resumeSliceTypes";

export async function faangSimple(resume: ResumeSliceTypes, doc: any) {
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
  } = resume;

  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  // name
  doc
    .font("Helvetica-Bold")
    .fontSize(22)
    .text(`${name.toUpperCase()}`, { align: "center", oblique: true });
  // phone & address
  doc
    .font("Helvetica")
    .fontSize(10)
    .fillColor("#1C4ED9") //link color
    .text(phone, 10, doc.y, {
      link: `tel:${phone}`,
      align: "left",
      continued: true,
    })
    .text(email, { link: `mailto:${email}`, align: "right" })
    .fillColor("black")
    .text(address, 10, doc.y, { align: "left", continued: true });

  doc
    .fillColor("#1C4ED9")
    .text(linkedIn, { link: linkedIn, align: "right" })
    .text(github, { link: github, align: "right" });

  doc.moveDown(1.5);
  // objective component
  // heading
  doc
    .fillColor("#000")
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("OBJECTIVE", 10, doc.y, { align: "left", fill: true })
    .moveTo(10, doc.y)
    .lineTo(pageWidth - 10, doc.y)
    .stroke();
  doc.moveDown();
  // objective
  doc
    .font("Helvetica")
    .fontSize(12)
    .text(objective, 20, doc.y, { width: pageWidth - 40 });
  doc.moveDown();
  // education component
  // heading
  doc
    .fillColor("#000")
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("EDUCATION", 10, doc.y, { align: "left", fill: true })
    .moveTo(10, doc.y)
    .lineTo(pageWidth - 10, doc.y)
    .stroke();
  doc.moveDown();
  // education
  educations.map((education: ResumeSliceTypes["educations"][0], _) => {
    const { degree, description, endDate, major, school, startDate } =
      education;
    if (degree.length > 0) {
      // degree
      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text(degree, 20, doc.y, { continued: true });
      // school
      doc.font("Helvetica-Bold").text(` , ${school}`, { continued: true });
      const dateWidth = doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .widthOfString(`${startDate} - ${endDate}`);
      // dates
      doc
        .font("Helvetica")
        .fontSize(10)
        .text(`${startDate} - ${endDate}`, 20, doc.y, {
          width: dateWidth,
          oblique: true,
          align: "right",
        });
      // major
      doc.fontSize(12).text(major, 20, doc.y, { oblique: true });
      // description
      doc.text(description, 20, doc.y, { align: "right" }); // description
      doc.moveDown();
    }
  });
  // languages component
  // heading
  doc
    .fillColor("#000")
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("LANGUAGES", 10, doc.y, {
      align: "left",
      fill: true,
    })
    .moveTo(10, doc.y)
    .lineTo(pageWidth - 10, doc.y)
    .stroke();
  doc.moveDown();
  languages.map((language: ResumeSliceTypes["languages"][0], _) => {
    const { level, name } = language;
    if (name.length > 0) {
      doc
        .font("Helvetica-Bold")
        .fontSize(12)
        .text(name, 20, doc.y, { align: "left", continued: true })
        .font("Helvetica")
        .text(level[0].toUpperCase() + level.slice(1), { align: "right" });
      doc.moveDown();
    }
  });
  // skills
  doc
    .fillColor("#000")
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("SKILLS", 10, doc.y, {
      align: "left",
      fill: true,
    })
    .moveTo(10, doc.y)
    .lineTo(pageWidth - 10, doc.y)
    .stroke();
  doc.moveDown();
  skills.map((skill: string, sIndex: number) => {
    const options =
      sIndex === skills.length - 1
        ? { oblique: true }
        : { continued: true, oblique: true };
    doc.font("Helvetica").fontSize(12).text(`${skill}, `, 20, doc.y, options);
  });
  doc.moveDown();
  // projects
  if (projects.length > 0 && projects[0].name.length > 0) {
    doc
      .fillColor("#000")
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("PROJECTS", 10, doc.y, {
        // align: "left",
        fill: true,
      })
      .moveTo(10, doc.y)
      .lineTo(pageWidth - 10, doc.y)
      .stroke();
    doc.moveDown();
    projects.map((project: ResumeSliceTypes["projects"][0], _) => {
      const { demo, description, github, name, technologies } = project;
      if (name.length > 0) {
        // name , demo & github
        doc
          .font("Helvetica-Bold")
          .fontSize(12)
          .text(name, 20, doc.y, { continued: true, align: "left" })
          .font("Helvetica")
          .fillColor("#1C4ED9")
          .text("Website", {
            link: demo,
            align: "center",
            underline: true,
            oblique: true,
            continued: true,
            fill: true,
          })
          .text("Github", {
            link: github,
            align: "right",
            underline: true,
            oblique: true,
            fill: true,
          });
        // description
        doc
          .fill("#000")
          .text(description, 30, doc.y, { oblique: true, align: "right" });
        // tech stack
        doc.font("Helvetica-Bold").text("Tech Stack : ", { continued: true });
        technologies.map((tech: string, tIndex: number) => {
          const options =
            tIndex === technologies.length - 1 ? {} : { continued: true };
          doc.font("Helvetica").text(`${tech}, `, options);
        });
        doc.moveDown();
      }
    });
  }
  // experiences
  if (experiences.length > 0 && experiences[0].title.length > 0) {
    doc
      .fillColor("#000")
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("EXPERIENCE", 10, doc.y, {
        // align: "left",
        fill: true,
      })
      .moveTo(10, doc.y)
      .lineTo(pageWidth - 10, doc.y)
      .stroke();
    doc.moveDown();
    experiences.map((experience: ResumeSliceTypes["experiences"][0], _) => {
      const { company, description, endDate, location, startDate, title } =
        experience;
      if (title.length > 0) {
        // title & dates
        doc
          .font("Helvetica-Bold")
          .fontSize(12)
          .text(title, 20, doc.y, { continued: true, align: "left" })
          .font("Helvetica")
          .text(`${startDate} - ${endDate}`, { align: "right" });
        // company & location
        doc
          .text(company, { oblique: true, continued: true, align: "left" })
          .text(location, { align: "right" });
        // description
        doc.text(description);
        doc.moveDown();
      }
    });
  }
  // certificates
  if (certifications.length > 0 && certifications[0].name.length > 0) {
    doc
      .fillColor("#000")
      .font("Helvetica-Bold")
      .fontSize(14)
      .text("CERTIFICATES", 10, doc.y, {
        // align: "left",
        fill: true,
      })
      .moveTo(10, doc.y)
      .lineTo(pageWidth - 10, doc.y)
      .stroke();
    doc.moveDown();
    certifications.map(
      (certificate: ResumeSliceTypes["certifications"][0], _) => {
        const { authority, endDate, license, name, startDate } = certificate;
        if (name.length > 0) {
          // name & dates
          doc
            .font("Helvetica-Bold")
            .fontSize(12)
            .text(name, 20, doc.y, { continued: true, align: "left" })
            .font("Helvetica")
            .text(`${startDate} - ${endDate}`, { align: "right" });
          // authority & license
          doc
            .text(authority, { continued: true, align: "left", oblique: true })
            .text(license, { align: "right" });
          doc.moveDown();
        }
      }
    );
  }
  // hobbies
  doc
    .fillColor("#000")
    .font("Helvetica-Bold")
    .fontSize(14)
    .text("HOBBIES", 10, doc.y, {
      // align: "left",
      fill: true,
    })
    .moveTo(10, doc.y)
    .lineTo(pageWidth - 10, doc.y)
    .stroke();
  doc.moveDown();
  hobbies.map((hobby: string, hIndex: number) => {
    const options = hIndex === hobbies.length - 1 ? {} : { continued: true };
    doc.font("Helvetica").fontSize(12).text(`${hobby}, `, 20, doc.y, options);
  });
}
