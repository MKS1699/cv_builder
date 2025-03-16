import { ResumeSliceTypes } from "../types/resumeSliceTypes";
import {
  // checkTextToTruncate,
  cleanURL,
} from "./helpers";
import {
  githubImageBuffer,
  linkedInImageBuffer,
  linkImageBuffer,
  mailImageBuffer,
  phoneImageBuffer,
} from "./imgTool";

export async function experienceIntensive(resume: ResumeSliceTypes, doc: any) {
  const {
    address,
    certifications,
    educations,
    email,
    experiences,
    github,
    // hobbies,
    languages,
    linkedIn,
    name,
    // objective,
    phone,
    projects,
    skills,
  } = resume;

  const pageWidth = doc.page.width;

  const [linkedInImage, githubImage, mailImage, phoneImage, linkImage] =
    await Promise.all([
      linkedInImageBuffer(),
      githubImageBuffer(),
      mailImageBuffer(),
      phoneImageBuffer(),
      linkImageBuffer(),
    ]);

  // name
  const names: string[] = name.split(" ");
  const nameWidth = doc.widthOfString(name);

  const startY = doc.y; // starting position
  const firstLetterSize: number = 28;
  const restLetterSize: number = 22;
  const lineAdjustment: number = (firstLetterSize - restLetterSize) * 0.75; // y offset for letters among the name since they are not in same height
  if (names.length > 1) {
    // name is madeup of first name, middle name (may / may not) and last name
    names.map((name: string, index: number) => {
      if (index === 0) {
        // first name positioning it in center of the page
        doc
          .font("Helvetica")
          .fontSize(firstLetterSize)
          .text(name[0].toUpperCase(), pageWidth / 2 - nameWidth, doc.y, {
            continued: true,
          }) // first letter of first name bigger size than rest letters
          .fontSize(restLetterSize)
          .text(name.slice(1).toUpperCase(), doc.x, startY + lineAdjustment, {
            continued: true,
          }) // rest letters in smaller size than the first letter of first name
          .text(" ", { continued: true }); // space in between names
      } else if (index !== names.length - 1) {
        // middle name(s) positioning them after first name
        doc
          .font("Helvetica")
          .fontSize(firstLetterSize)
          .text(name[0].toUpperCase(), doc.x, startY, {
            continued: true,
          }) // first letter of middle name(s) in bigger size
          .fontSize(restLetterSize)
          .text(name.slice(1).toUpperCase(), doc.x, startY + lineAdjustment, {
            continued: true,
          }) // rest letters in smaller size than first letter of middle name(s)
          .text(" ", { continued: true }); // space between middle name(s) or last name
      } else {
        // last name positioning after middle name(s)
        doc
          .font("Helvetica")
          .fontSize(firstLetterSize)
          .text(name[0].toUpperCase(), doc.x, startY, {
            continued: true,
          }) // first letter of last name in bigger size than rest
          .fontSize(restLetterSize)
          .text(name.slice(1).toUpperCase(), doc.x, startY + lineAdjustment); // rest letters in smaller size than first letter of last name
      }
    });
  }
  // only first name is in name
  else {
    // first name positioning it in center of the page
    doc
      .font("Helvetica")
      .fontSize(firstLetterSize)
      .text(name[0].toUpperCase(), pageWidth / 2 - nameWidth, doc.y, {
        continued: true,
      }) // first letter of name bigger size than rest letters
      .fontSize(restLetterSize)
      .text(name.slice(1).toUpperCase(), doc.x, doc.y + lineAdjustment, {
        // baseline: "middle",
      }); // rest letters in smaller size than the first letter of name
  }

  doc.moveDown(0.5);

  // phone , email, linkedIn, github
  doc.fontSize(12);
  // const maxphoneWidth = 90;
  // const maxELGWidth = 130;

  const phoneWidth = doc.widthOfString(phone);
  const emailWidth = doc.widthOfString(email);
  const linkedInWidth = doc.widthOfString(cleanURL(linkedIn));
  const githubWidth = doc.widthOfString(cleanURL(github));
  const gapWidth = doc.widthOfString(" ");
  const underlineOffset = 4;
  const imageWidth = 13;
  const imageHeight = 13;
  const PELGWidthHalf =
    (phoneWidth +
      emailWidth +
      linkedInWidth +
      githubWidth +
      gapWidth * 6 +
      imageWidth * 4) /
    2;
  const PELGHeight = doc.currentLineHeight();

  // phone
  doc
    .image(phoneImage, pageWidth / 2 - PELGWidthHalf - 15, doc.y - 5, {
      width: imageWidth,
      height: imageHeight,
    })
    .text(phone, pageWidth / 2 - PELGWidthHalf, doc.y, {
      continued: true,
      link: `tel:${phone}`,
    })
    .text(" ", { continued: true })
    .text(" ", { continued: true })
    .image(mailImage, doc.x + phoneWidth + gapWidth * 2, doc.y - 3, {
      width: imageWidth + 2,
      height: imageHeight + 2,
    })
    .underline(
      doc.x + phoneWidth + gapWidth * 3 + imageWidth, // x pos
      doc.y, // y pos
      emailWidth, // width
      PELGHeight + underlineOffset, // height
      {
        color: "black",
      }
    )
    .text(email, doc.x + gapWidth + imageWidth, doc.y, {
      link: `mailto:${email}`,
      continued: true,
    })
    .text(" ", { continued: true })
    .text(" ", { continued: true })
    .image(
      linkedInImage,
      doc.x + phoneWidth + emailWidth + gapWidth * 4,
      doc.y - 3,
      {
        width: imageWidth + 2,
        height: imageHeight + 2,
      }
    )
    .underline(
      doc.x + phoneWidth + emailWidth + gapWidth * 5 + imageWidth,
      doc.y,
      linkedInWidth,
      PELGHeight + underlineOffset,
      {
        color: "black",
      }
    )
    .text(cleanURL(linkedIn), doc.x + gapWidth + imageWidth, doc.y, {
      link: linkedIn,
      continued: true,
    })
    .text(" ", { continued: true })
    .text(" ", { continued: true })
    .image(
      githubImage,
      doc.x + phoneWidth + emailWidth + linkedInWidth + gapWidth * 6,
      doc.y - 3,
      {
        width: imageWidth + 2,
        height: imageHeight + 2,
      }
    )
    .underline(
      doc.x +
        phoneWidth +
        emailWidth +
        linkedInWidth +
        gapWidth * 7 +
        imageWidth,
      doc.y,
      githubWidth,
      PELGHeight + underlineOffset,
      {
        color: "black",
      }
    )
    .text(cleanURL(github), doc.x + gapWidth + imageWidth, doc.y, {
      link: github,
    });

  doc.moveDown(1);
  // address
  const addressWidth = doc.widthOfString(address);
  doc.text(address, (pageWidth - addressWidth) / 2, doc.y, {});
  doc.moveDown(1);

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
          align: "right",
        });
      // major
      doc.fontSize(12).text(major, 20, doc.y, {});
      // description
      doc.text(description, 20, doc.y, { align: "right" }); // description
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
        doc.moveDown(0.5);
        doc
          .text(company, { oblique: true, continued: true, align: "left" })
          .text(location, { align: "right" });
        doc.moveDown(0.5);

        // description
        doc.text(description);
        doc.moveDown();
      }
    });
  }
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
    projects.map((project: ResumeSliceTypes["projects"][0]) => {
      const { demo, description, github, name, technologies } = project;

      if (name.length > 0) {
        doc.fontSize(12).font("Helvetica");
        const lineHeight = doc.currentLineHeight();
        const demoWidth = doc.widthOfString("Website");
        const githubWidth = doc.widthOfString("Github");

        // name
        doc
          .font("Helvetica-Bold")
          .text(name, 20, doc.y, { continued: true, align: "left" });

        doc.font("Helvetica");
        // demo / link / website
        doc
          .image(linkImage, (pageWidth * 60) / 100, doc.y, {
            width: imageWidth,
            height: imageHeight,
          })
          .text("Website", (pageWidth * 46) / 100, doc.y, {
            link: demo,
            continued: true,
          })
          .underline(
            (pageWidth * 63) / 100 - 2, // x pos
            doc.y, // y pos
            demoWidth, // width
            lineHeight + underlineOffset - 1, // height
            {
              color: "black",
            }
          );
        // github
        doc
          .image(githubImage, (pageWidth * 80) / 100, doc.y - 3, {
            width: imageWidth,
            height: imageHeight,
          })
          .underline(
            (pageWidth * 83) / 100 - 2, // x pos
            doc.y, // y pos
            githubWidth, // width
            lineHeight + underlineOffset - 1, // height
            {
              color: "black",
            }
          )
          .text("Github", (pageWidth * 59) / 100, doc.y, {
            link: github,
          });

        doc.moveDown(0.6);
        // description
        doc
          .fill("#000")
          .text(description, 30, doc.y + 2, { oblique: true, align: "center" });
        doc.moveDown(0.6);
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
          doc.moveDown(0.5);
          // authority & license
          doc
            .text(authority, { continued: true, align: "left", oblique: true })
            .text(license, { align: "right" });
          doc.moveDown();
        }
      }
    );
  }
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
}
