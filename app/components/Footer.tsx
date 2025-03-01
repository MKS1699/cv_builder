import Link from "next/link";

const Footer = () => {
  return (
    // todo: add footer content
    // todo: footer mobile design
    <div className="bg-gray-900 text-white flex flex-row justify-between p-4 items-center">
      {/* title */}
      <div className="font-medium text-2xl">
        <Link href="/">CV Builder</Link>
      </div>
      {/* copyright */}
      <div className="">&copy;2025</div>
    </div>
  );
};

export default Footer;
