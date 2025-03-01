import Link from "next/link";

const NavBar = () => {
  return (
    // @todo : navbar mobile design
    <div className="bg-gray-900 text-white flex flex-row justify-between p-4 items-center">
      {/* title */}
      <div className="font-medium text-2xl">
        <Link href="/">CV Builder</Link>
      </div>
      {/* @todo : menu here */}
    </div>
  );
};

export default NavBar;
