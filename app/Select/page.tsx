"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const router = useRouter();

  const handleNext = () => {
    if (!selected) return;
    if (selected === "template") router.push("/template");
    else router.push("/report");
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center w-screen min-h-screen p-6">
      <div className="max-w-4xl w-full md:w-3/4 lg:w-2/3 min-h-[48vh] relative rounded-3xl border-2 border-slate-200 bg-white shadow-sm">
        <div className="w-full h-full relative flex flex-col">
          <div className="flex flex-1 gap-6 px-10 py-8">
            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelected((s) => (s === "template" ? null : "template"))}
              onKeyDown={(e) => e.key === "Enter" && setSelected((s) => (s === "template" ? null : "template"))}
              className={`flex-1 flex flex-col justify-center items-start rounded-2xl border p-6 transition-transform duration-150 ease-in-out cursor-pointer ${
                selected === "template"
                  ? "shadow-lg bg-gray-100 text-black border-transparent"
                  : "bg-white hover:shadow-md border-slate-200"
              }`}
            >
              {/* Left card content */}
                <h1 className={`text-lg font-semibold -ml-1 ${selected === "template" ? "text-slate-900" : "text-slate-900"}`}>Create New Template</h1>
              <ul className={`mt-2 list-disc pl-5 space-y-1 text-sm ${selected === "template" ? "text-slate-600" : "text-slate-500"}`}>
                <li>Blank starter layout with sections and reusable placeholders.</li>
                <li>Prebuilt examples you can clone and edit.</li>
                <li>Edit metadata: name, tags, description, visibility.</li>
                <li>Drag-and-drop sections and live preview while editing.</li>
                <li>Save versions and import/export templates (JSON).</li>
              </ul>
            </div>

            <div
              role="button"
              tabIndex={0}
              onClick={() => setSelected((s) => (s === "report" ? null : "report"))}
              onKeyDown={(e) => e.key === "Enter" && setSelected((s) => (s === "report" ? null : "report"))}
              className={`flex-1 flex flex-col justify-center items-start rounded-2xl border p-6 transition-transform duration-150 ease-in-out cursor-pointer ${
                selected === "report"
                  ? "shadow-lg bg-gray-100 text-white border-transparent"
                  : "bg-white hover:shadow-md border-slate-200"
              }`}
            >
              {/* Right card content */}
                <h1 className={`text-lg font-semibold -ml-1 ${selected === "report" ? "text-black" : "text-slate-900"}`}>Make Monthly Report</h1>
              <ul className={`mt-2 list-disc pl-5 space-y-1 text-sm ${selected === "report" ? "text-slate-600" : "text-slate-500"}`}>
                <li>Choose a month or custom range; auto-fill club data.</li>
                <li>Summary metrics: events, attendance, active members.</li>
                <li>Charts and visuals for trends and highlights.</li>
                <li>Export to PDF/Excel/CSV and share by email.</li>
                <li>Schedule recurring reports and save versions.</li>
                <li>Compare to previous months and apply filters.</li>
              </ul>
            </div>
          </div>

          <div className="flex justify-end px-8 pb-6">
            <button
              disabled={!selected}
              aria-disabled={!selected}
              onClick={handleNext}
              className={`rounded-xl px-6 py-2 transition-colors font-medium ${
                !selected
                  ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 cursor-pointer text-white hover:bg-indigo-700"
              }`}
            >
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
