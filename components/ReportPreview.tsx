import { forwardRef } from "react";
import { ReportData } from "./ReportEditor";

interface ReportPreviewProps {
  data: ReportData;
}

const formatDate = (value: string) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const ReportPreview = forwardRef<HTMLDivElement, ReportPreviewProps>(({ data }, ref) => {
  const highlights = data.highlights
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
  const futureWorkItems = data.futureWork
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

  return (
    <div
      ref={ref}
      id="report-preview"
      className="mx-auto w-[210mm] max-w-full bg-white text-black shadow-xl"
      style={{ fontFamily: '"Times New Roman", Georgia, serif' }}
    >
      <div className="min-h-[297mm] bg-white">
        <div className="border-b-2 border-black px-10 py-8 text-black">
          <div className="flex items-start justify-between gap-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-neutral-700">{data.clubName}</p>
              <h1 className="mt-3 text-[34px] font-bold leading-tight">{data.title}</h1>
              <p className="mt-3 max-w-2xl text-lg leading-7 text-neutral-700">{data.subtitle}</p>
            </div>
            <div className="min-w-52 border border-black px-5 py-4 text-base">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-neutral-700">Prepared By</p>
              <p className="mt-2 text-xl font-semibold">{data.author}</p>
              <p className="text-base text-neutral-700">{data.designation}</p>
            </div>
          </div>
        </div>

        <div className="px-10 py-8">
          <div className="grid grid-cols-[1.2fr_0.8fr] gap-5">
            <div className="border border-black bg-white px-6 py-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-700">Reporting Window</p>
              <p className="mt-3 text-xl font-semibold text-black">
                {formatDate(data.from)} to {formatDate(data.to)}
              </p>
              <p className="mt-3 text-[17px] leading-8 text-neutral-800">{data.overview}</p>
            </div>

            <div className="border border-black bg-white px-6 py-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-700">Report Date</p>
              <p className="mt-3 text-xl font-semibold text-black">{formatDate(data.reportDate)}</p>
              <div className="mt-4 h-px bg-black" />
              <p className="mt-4 text-sm font-semibold uppercase tracking-[0.14em] text-neutral-700">Club</p>
              <p className="mt-2 text-xl font-semibold text-black">{data.clubName}</p>
            </div>
          </div>

          <div className="mt-6 border border-black bg-white px-7 py-6">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-700">Key Highlights</p>
            <h2 className="mt-2 text-[28px] font-bold text-black">Weekly Snapshot</h2>
            <p className="mt-2 text-base text-neutral-700">{data.sections.length} events covered</p>
            <div className="mt-5 grid gap-3">
              {highlights.map((highlight, index) => (
                <div
                  key={`${highlight}-${index}`}
                  className="flex items-start gap-3 border border-black px-4 py-3 text-[16px] leading-7 text-black"
                >
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-black" />
                  <p>{highlight}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-5">
            {data.sections.map((section, index) => (
              <section
                key={`${section.heading}-${index}`}
                className="overflow-hidden border border-black bg-white"
              >
                <div className="flex items-center justify-between gap-4 border-b border-black px-7 py-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    <div>
                      <h3 className="text-[24px] font-bold text-black">{section.heading}</h3>
                      <p className="text-base text-neutral-600">Event summary</p>
                    </div>
                  </div>
                  <p className="text-base font-semibold text-neutral-700">{formatDate(section.sectionDate)}</p>
                </div>
                <div className="px-7 py-5">
                  <p className="whitespace-pre-wrap text-[17px] leading-8 text-black">{section.content}</p>
                </div>
              </section>
            ))}
          </div>

          <div className="mt-6 border border-black bg-white px-7 py-6">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-700">Future Work</p>
            <div className="mt-4 grid gap-3">
              {futureWorkItems.map((item, index) => (
                <div
                  key={`${item}-${index}`}
                  className="flex items-start gap-3 border border-black px-4 py-3 text-[16px] leading-7 text-black"
                >
                  <div className="mt-1 h-2.5 w-2.5 rounded-full bg-black" />
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 border border-black px-6 py-5 text-base text-black">
            <div className="flex items-center justify-between gap-4">
              <p>Prepared in Clubmates report builder</p>
              <p>{data.clubName} Weekly Documentation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ReportPreview.displayName = "ReportPreview";
