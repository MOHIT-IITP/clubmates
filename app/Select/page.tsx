import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="bg-white flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="w-[60vw] h-[50vh] relative rounded-3xl border-2 border-slate-200 bg-slate-100">
        <div className="w-full h-full relative flex flex-col">
          <div className="flex flex-1 gap-8 px-8 py-8">
            <div className="flex-1 flex flex-col justify-center items-center bg-white rounded-3xl border border-slate-200 mr-2">
              {/* Left card content */}
              <h2 className="text-xl font-bold mb-4 text-black">
                Create New Template
              </h2>
            </div>
            <div className="flex-1 flex flex-col justify-center items-center bg-white rounded-3xl border border-slate-200 ml-2">
              {/* Right card content */}
              <h2 className="text-xl font-bold mb-4 text-black">
                Make Monthly Report
              </h2>
            </div>
          </div>
          <div className="flex justify-end px-8 pb-6">
            <Link
              href="/template"
              className="rounded-xl text-black bg-white shadow-md border hover:shadow-sm hover:bg-neutral-100 border-slate-200 px-6 py-2"
            >
              NEXT
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
