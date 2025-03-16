// pdfkit only supports .jpeg & .png only

// image paths
const phoneImagePath = "/img/phone.png";
const mailImagePath = "/img/mail.png";
const linkedInImagePath = "/img/linkedin.png";
const githubImagePath = "/img/github.png";
const linkImagePath = "/img/link.png";

// getting the image buffer based on image path
const getImageBuffer = async (imgPath: string) => {
  const imgBuff = await fetch(imgPath)
    .then((res) => res.arrayBuffer())
    .catch((err) => console.log(err));
  return imgBuff;
};

// all image buffers
const phoneImageBuffer = await getImageBuffer(phoneImagePath);
const mailImageBuffer = await getImageBuffer(mailImagePath);
const linkedInImageBuffer = await getImageBuffer(linkedInImagePath);
const githubImageBuffer = await getImageBuffer(githubImagePath);
const linkImageBuffer = await getImageBuffer(linkImagePath);

export {
  phoneImageBuffer,
  mailImageBuffer,
  linkedInImageBuffer,
  githubImageBuffer,
  linkImageBuffer,
};
