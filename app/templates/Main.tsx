"use client";

import Link from "next/link";

const Main = () => {
  return (
    <div className="w-full min-h-screen flex flex-col gap-2 p-2">
      Pick templates below
      <Link href="/templates/faangSimple" className="text-blue-600">
        FAANG Simple
      </Link>
    </div>
  );
};

export default Main;
