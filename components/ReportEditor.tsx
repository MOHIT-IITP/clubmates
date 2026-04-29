"use client";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Download, Plus, Trash2 } from "lucide-react";
import { Input } from "./ui/input";
import { ReportPreview } from "./ReportPreview";
import { Textarea } from "./ui/textarea";

export interface ReportData {
  title: string;
  subtitle: string;
  author: string;
  clubName: string;
  designation: string;
  reportDate: string;
  from: string;
  to: string;
  overview: string;
  highlights: string;
  futureWork: string;
  sections: {
    heading: string;
    content: string;
    sectionDate: string;
  }[];
}

const ReportEditor = () => {
  const [reportData, setReportData] = useState<ReportData>({
    title: "CodeRed Weekly Report",
    subtitle: "April weekly activity summary and event highlights",
    author: "Abhishek",
    designation: "Report Coordinator",
    clubName: "CodeRed",
    reportDate: new Date().toISOString().slice(0, 10),
    from: new Date().toISOString().slice(0, 10),
    to: new Date().toISOString().slice(0, 10),
    overview:
      "This week focused on community sessions, hands-on collaboration, and progress tracking across the club's ongoing technical initiatives.",
    highlights:
      "Conducted one focused learning session\nShared progress updates with the team\nCaptured outcomes and next steps for the coming week",
    futureWork:
      "Plan the next technical session\nPrepare follow-up material for members\nTrack outcomes from this week's activities",
    sections: [
      {
        heading: "Session on Git & GitHub",
        content:
          "Introduced members to version control fundamentals, repository workflows, branching, and collaborative contribution practices through a guided practical session.",
        sectionDate: new Date().toISOString().slice(0, 10),
      },
      {
        heading: "Session on Open Source Contribution",
        content:
          "Discussed how to identify beginner-friendly issues, contribute to public projects, and build a sustainable open source learning path for club members.",
        sectionDate: new Date().toISOString().slice(0, 10),
      },
    ],
  });
  const previewRef = useRef<HTMLDivElement>(null);

  const updateField = (field: keyof ReportData, value: string) => {
    setReportData((prev) => ({ ...prev, [field]: value }));
  };

  const updateSection = (
    index: number,
    field: "heading" | "content" | "sectionDate",
    value: string
  ) => {
    setReportData((prev) => ({
      ...prev,
      sections: prev.sections.map((section, i) =>
        i === index ? { ...section, [field]: value } : section
      ),
    }));
  };

  const addSection = () => {
    setReportData((prev) => ({
      ...prev,
      sections: [
        ...prev.sections,
        {
          heading: "New Section",
          content: "Add your short description here",
          sectionDate: "12/12/2025",
        },
      ],
    }));
  };

  const generatePDF = async () => {
    const element = previewRef.current;
    console.group("[Report PDF] Print export started");
    console.log("[Report PDF] Preview ref:", previewRef.current);
    console.log("[Report PDF] Report title:", reportData.title);

    if (!element) {
      console.error("[Report PDF] Preview element not found");
      console.groupEnd();
      toast.error("Preview is not ready yet");
      return;
    }

    try {
      console.log("[Report PDF] Element found:", {
        id: element.id,
        clientWidth: element.clientWidth,
        clientHeight: element.clientHeight,
        scrollWidth: element.scrollWidth,
        scrollHeight: element.scrollHeight,
      });
      console.log("[Report PDF] Collecting page styles");

      const styleMarkup = Array.from(
        document.querySelectorAll('style, link[rel="stylesheet"]')
      )
        .map((node) => node.outerHTML)
        .join("\n");

      console.log("[Report PDF] Creating print iframe");
      const iframe = document.createElement("iframe");
      iframe.style.position = "fixed";
      iframe.style.right = "0";
      iframe.style.bottom = "0";
      iframe.style.width = "0";
      iframe.style.height = "0";
      iframe.style.border = "0";
      iframe.setAttribute("aria-hidden", "true");
      document.body.appendChild(iframe);

      const printDocument = iframe.contentDocument;
      const printWindow = iframe.contentWindow;

      if (!printDocument || !printWindow) {
        throw new Error("Could not prepare print window");
      }

      const filename = `${reportData.title.replace(/\s+/g, "_")}.pdf`;
      console.log("[Report PDF] Writing preview HTML to print iframe", { filename });

      printDocument.open();
      printDocument.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${filename}</title>
            ${styleMarkup}
            <style>
              @page {
                size: A4;
                margin: 10mm;
              }

              html, body {
                background: white;
                margin: 0;
                padding: 0;
              }

              body {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }

              #print-root {
                width: 210mm;
                margin: 0 auto;
              }

              #print-root > div {
                box-shadow: none !important;
                width: 100% !important;
                max-width: 100% !important;
              }
            </style>
          </head>
          <body>
            <div id="print-root">${element.outerHTML}</div>
          </body>
        </html>
      `);
      printDocument.close();

      await toast.promise(
        new Promise<void>((resolve, reject) => {
          const cleanup = () => {
            window.setTimeout(() => {
              iframe.remove();
              console.log("[Report PDF] Print iframe removed");
            }, 1000);
          };

          iframe.onload = () => {
            try {
              console.log("[Report PDF] Print iframe loaded, opening print dialog");
              printWindow.focus();
              printWindow.print();
              resolve();
              cleanup();
            } catch (error) {
              cleanup();
              reject(error);
            }
          };

          window.setTimeout(() => {
            if (iframe.contentDocument?.readyState === "complete") {
              try {
                console.log("[Report PDF] Print iframe ready via timeout fallback");
                printWindow.focus();
                printWindow.print();
                resolve();
                cleanup();
              } catch (error) {
                cleanup();
                reject(error);
              }
            }
          }, 700);
        }),
        {
          loading: "Opening print dialog...",
          success: "Print dialog opened. Choose Save as PDF.",
          error: "Failed to open print dialog",
        }
      );

      console.log("[Report PDF] Print export finished successfully");
    } catch (error) {
      console.error("[Report PDF] Print export failed", error);
      const message = error instanceof Error ? error.message : "Unknown print error";
      toast.error(`Failed to open print dialog: ${message}`);
    } finally {
      console.groupEnd();
    }
  };

  const removeSection = (index: number) => {
    if (reportData.sections.length <= 1) {
      toast.error("Document must have at least one section");
      return;
    }
    setReportData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen w-full bg-white">
      <header className="sticky top-0 z-20 border-b border-black bg-white">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-black">Clubmates</p>
            <h1 className="text-2xl font-semibold text-black" style={{ fontFamily: "Michroma" }}>
              Weekly Report Builder
            </h1>
            <p className="mt-1 text-sm text-neutral-600">
              In the print dialog, turn off `Headers and footers` to hide date, time, and `localhost:3000`.
            </p>
          </div>
          <Button onClick={generatePDF} className="gap-2 bg-black text-white hover:bg-neutral-800">
            <Download className="h-4 w-4" />
            Print / Save PDF
          </Button>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-8 px-4 py-6 lg:grid-cols-[520px_minmax(0,1fr)]">
        <div className="space-y-6 rounded-[20px] border border-black bg-white p-6">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-black">Report Details</p>
            <h2 className="text-2xl font-semibold text-black">Simple report layout</h2>
            <p className="text-sm text-neutral-600">
              Update the text here, then use the live preview on the right to confirm the final PDF layout.
            </p>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-black bg-white p-5">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-black">Header</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title">Title</label>
                  <Input
                    id="title"
                    value={reportData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="mt-1 border-black"
                  />
                </div>
                <div>
                  <label htmlFor="subtitle">Subtitle</label>
                  <Input
                    id="subtitle"
                    value={reportData.subtitle}
                    onChange={(e) => updateField("subtitle", e.target.value)}
                    className="mt-1 border-black"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="author">Author</label>
                    <Input
                      id="author"
                      value={reportData.author}
                      onChange={(e) => updateField("author", e.target.value)}
                      className="mt-1 border-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="designation">Designation</label>
                    <Input
                      id="designation"
                      value={reportData.designation}
                      onChange={(e) => updateField("designation", e.target.value)}
                      className="mt-1 border-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="clubName">ClubName</label>
                    <Input
                      id="clubName"
                      value={reportData.clubName}
                      onChange={(e) => updateField("clubName", e.target.value)}
                      className="mt-1 border-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="reportDate">Report Date</label>
                    <Input
                      id="reportDate"
                      type="date"
                      value={reportData.reportDate}
                      onChange={(e) => updateField("reportDate", e.target.value)}
                      className="mt-1 border-black"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="from">From Date</label>
                    <Input
                      id="from"
                      type="date"
                      value={reportData.from}
                      onChange={(e) => updateField("from", e.target.value)}
                      className="mt-1 border-black"
                    />
                  </div>
                  <div>
                    <label htmlFor="to">To Date</label>
                    <Input
                      id="to"
                      type="date"
                      value={reportData.to}
                      onChange={(e) => updateField("to", e.target.value)}
                      className="mt-1 border-black"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-black bg-white p-5">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-black">Overview</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="overview">Summary</label>
                  <Textarea
                    id="overview"
                    value={reportData.overview}
                    onChange={(e) => updateField("overview", e.target.value)}
                    className="mt-1 min-h-28 border-black"
                  />
                </div>
                <div>
                  <label htmlFor="highlights">Highlights (one per line)</label>
                  <Textarea
                    id="highlights"
                    value={reportData.highlights}
                    onChange={(e) => updateField("highlights", e.target.value)}
                    className="mt-1 min-h-28 border-black"
                  />
                </div>
                <div>
                  <label htmlFor="futureWork">Future Work (one per line)</label>
                  <Textarea
                    id="futureWork"
                    value={reportData.futureWork}
                    onChange={(e) => updateField("futureWork", e.target.value)}
                    className="mt-1 min-h-28 border-black"
                  />
                </div>
              </div>
            </div>

            {reportData.sections.map((section, index) => (
              <div key={index} className="rounded-2xl border border-black bg-white p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-black">
                    Event {index + 1}
                  </h3>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeSection(index)}
                    className="border-black text-black hover:bg-neutral-100"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label htmlFor={`heading-${index}`}>Heading</label>
                    <Input
                      id={`heading-${index}`}
                      value={section.heading}
                      onChange={(e) =>
                        updateSection(index, "heading", e.target.value)
                      }
                      className="mt-1 border-black"
                    />
                  </div>
                  <div>
                    <label htmlFor={`sectionDate-${index}`}>Date</label>
                    <Input
                      id={`sectionDate-${index}`}
                      value={section.sectionDate}
                      onChange={(e) =>
                        updateSection(index, "sectionDate", e.target.value)
                      }
                      type="date"
                      className="border-black"
                    />
                  </div>
                  <div>
                    <label htmlFor={`content-${index}`}>Content</label>
                    <Textarea
                      id={`content-${index}`}
                      value={section.content}
                      onChange={(e) =>
                        updateSection(index, "content", e.target.value)
                      }
                      className="mt-1 min-h-[140px] border-black"
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button
              onClick={addSection}
              className="w-full rounded-2xl bg-black text-white hover:bg-neutral-800"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <div className="rounded-[20px] border border-black bg-white p-4">
            <div className="mb-3 flex items-center justify-between px-2">
              <div>
                <p className="text-xs uppercase tracking-[0.26em] text-black">Preview</p>
                <h2 className="text-xl font-semibold text-black">PDF output</h2>
              </div>
              <p className="text-sm text-neutral-600">A4 portrait</p>
            </div>
            <div className="overflow-auto rounded-[20px] border border-black bg-neutral-100 p-3">
              <ReportPreview ref={previewRef} data={reportData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportEditor;
