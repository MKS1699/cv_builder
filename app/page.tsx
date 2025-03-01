// import Link from "next/link";
import Main from "./templates/Main";
export default function Home() {
  return (
    <div className="min-h-screen p-2 flex flex-col gap-2" id="mainApp">
      {/* <Link href={"/templates"}>Templates</Link> */}
      <Main />
    </div>
  );
}
