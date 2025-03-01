import Link from "next/link";
import { TemplateGenerator, TemplatesPreview } from "./components";
import { TEMPLATES } from "./db/allTemplates";
import { sampleResume } from "./db/sampleResume";
import { dummyTemplate } from "./db/sampleTemplate";

export default function Home() {
  return (
    // need to design this page also check the commented components if they are needed or not
    <div className="min-h-screen p-2 flex flex-col gap-2" id="mainApp">
      {/* <Resume resumeType="create" /> */}
      {/* <TemplateGenerator templateInfo={dummyTemplate} userData={sampleResume} /> */}
      {/* <TemplatesPreview templates={TEMPLATES} /> */}
      <Link href="/create">Create</Link>
      <Link href="/edit">Edit</Link>
    </div>
  );
}
