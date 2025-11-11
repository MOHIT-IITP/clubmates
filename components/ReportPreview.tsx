import { ReportData } from "./ReportEditor";

interface ReportPreviewProps {
    data: ReportData;
  }
  
  export const ReportPreview = ({ data }:ReportPreviewProps) => {
    return (
      <div
        id="document-preview"
        className="bg-white text-gray-900 p-12 min-h-[800px] shadow-lg"
        style={{ fontFamily: "Georgia, serif" }}
      >
        {/* Header */}
        <div className="border-b-2 border-gray-300 pb-6 mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{data.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{data.subtitle}</p>
          <div className="flex justify-between text-sm text-gray-500">
            <div className="flex flex-col gap-2">
            <span>By {data.author}</span>
            <p className="font-bold">from {data.clubName}</p>
            <div className="flex justify-center items-center gap-4"> 
              <label className="font-bold text-lg">Period Covered : </label>
              <div className="flex justify-center items-center gap-4">
            <p className="font-bold">{data.from}</p>
            <p className="font-bold"> - </p>
            <p className="font-bold">{data.to}</p>
              </div>
            </div>

            </div>
            <span>{data.date}</span>
          </div>
        </div>
  
        {/* Content Sections */}
        <div className="space-y-8">
          {data.sections.map((section, index) => (
            <div key={index}>
              <div className="flex justify-between gap-10 items-center ">
                <h2 className="text-2xl font-semibold text-gray-900 mb-3 border-l-4 border-blue-500 pl-4">
                  {section.heading}
                </h2>
                <p className="text-sm text-gray-500">{section.sectionDate}</p>
              </div>
              <p className="text-base leading-relaxed text-gray-700 whitespace-pre-wrap">
                {section.content}
              </p>
            </div>
          ))}
        </div>
  
        {/* Footer */}
        <div className="mt-16 pt-6 border-t-2 border-gray-300">
          <p className="text-sm text-gray-500 text-center">
           Report Template Made by WebWiser Team
          </p>
        </div>
      </div>
    );
  };
  