"use client";
import { useState } from "react";
import html2pdf from "html2pdf.js";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { Input } from "./ui/input";
import { ReportPreview } from "./ReportPreview";

export interface ReportData {
  title: string;
  subtitle: string;
  author: string;
  clubName: string;
  date: string;
  from: string;
  to: string;
  sections: {
    heading: string;
    content: string;
    sectionDate: string;
  }[];
}

const ReportEditor = () => {
  const [reportData, setReportData] = useState<ReportData>({
    title: "Monthly Report",
    subtitle: "a monthly report of month November",
    author: "Your Name",
    clubName: "WebWiser",
    date: new Date().toLocaleDateString(),
    from: new Date().toLocaleDateString(),
    to: new Date().toLocaleDateString(),
    sections: [
      {
        heading: "Session on Git & Github",
        content: "Write about this event in 20 - 30 words",
        sectionDate: "12/12/2025",
      },
      {
        heading: "Session on OpenSource Contribution",
        content: "Write about this event in 20 - 30 words",
        sectionDate: "12/12/2025",
      },
    ],
  });

  const updateField = (field: keyof ReportData, value: string) => {
    setReportData((prev) => ({ ...prev, [field]: value }));
  };

  const updateSection = (
    index: number,
    field: "heading" | "content",
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

  const generatePDF = () => {
    const element = document.getElementById("report-preview");
    if (!element) return;

    const opt = {
      margin: 1,
      filename: `${reportData.title.replace(/\s+/g, "_")}.pdf`,
      image: { type: "jpeg" as const, quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" as const },
    };
    toast.promise(html2pdf().set(opt).from(element).save(), {
      loading: "Generating PDF...",
      success: "PDF downloaded successfully!",
      error: "Failed to generate PDF",
    });
  };

  const removeSection = (index: number) => {
    if (reportData.sections.length <= 1) {
      toast.error("Document must have at least one section");
    }
    setReportData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Button onClick={generatePDF} className="gap-2 font-bold">
            <Download className="h-4 w-4" />
            <p style={{fontFamily: "michroma"}}>
            Download PDF
            </p>

          </Button>
        </div>
      </header>
      <div className="w-full flex justify-center items-center">
        <div>
          {/* Editor Panel */}
          <div className="space-y-6">
            <div className="p-6">
              <h2
                style={{ fontFamily: "michroma" }}
                className="text-xl font-semibold mb-4 text-black"
              >
                Report Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title">Title</label>
                  <Input
                    id="title"
                    value={reportData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="mt-1 border-2 border-dashed border-gray-300"
                  />
                </div>
                <div>
                  <label htmlFor="subtitle">Subtitle</label>
                  <Input
                    id="subtitle"
                    value={reportData.subtitle}
                    onChange={(e) => updateField("subtitle", e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="grid  grid-cols-2 gap-x-4 gap-y-4">
                  <div>
                    <label htmlFor="author">Author</label>
                    <Input
                      id="author"
                      value={reportData.author}
                      onChange={(e) => updateField("author", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="clubName">ClubName</label>
                    <Input
                      id="clubName"
                      value={reportData.clubName}
                      onChange={(e) => updateField("clubName", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label htmlFor="date">Report Date</label>
                    <Input
                      id="date"
                      type="date"
                      value={reportData.date}
                      onChange={(e) => updateField("date", e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div className="flex justify-center items-center gap-4 flex-col">
                    <label htmlFor="from" className="text-xl ">Period Covered</label>
                    <div className="flex gap-4 justify-center items-center">
                      <div>
                        <label htmlFor="from">From Date</label>
                        <Input
                          id="from"
                          type="date"
                          value={reportData.from}
                          onChange={(e) => updateField("from", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <label htmlFor="from">to Date</label>
                        <Input
                          id="to"
                          type="date"
                          value={reportData.to}
                          onChange={(e) => updateField("to", e.target.value)}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Section */}
          <div className="space-y-4">
            {reportData.sections.map((section, index) => (
              <div key={index} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-black">
                    Section {index + 1}
                  </h3>
                  <Button onClick={() => removeSection(index)}>Remove</Button>
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
                      className="mt-1"
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
                    />
                  </div>
                  <div className=" flex flex-col justify-start items-start pl-2">
                    <label htmlFor={`content-${index}`}>Content </label>
                    <textarea
                      id={`content-${index}`}
                      value={section.content}
                      onChange={(e) =>
                        updateSection(index, "content", e.target.value)
                      }
                      className="mt-1 w-full border-2 border-dashed border-neutral-300 min-h-[120px]"
                    />
                  </div>
                </div>
              </div>
            ))}
            <Button onClick={addSection} className="w-full">
              Add Section
            </Button>
          </div>
        </div>
        <div className="lg:sticky lg:top-8 h-fit">
          <div className="p-6">
            <h2
              style={{ fontFamily: "michroma" }}
              className="text-xl font-semibold mb-4 text-black"
            >
              Preview
            </h2>
            <div className="bg-gray-100 border-2 rounded-lg overflow-hidden">
              <ReportPreview data={reportData} />
            </div>
          </div>
        </div>
      </div>
      {/* preview panel */}
    </div>
  );
};

export default ReportEditor;
