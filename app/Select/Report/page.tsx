import Link from "next/link";
import ReportEditor from "@/components/ReportEditor";

const page = () => {
  return (
    <div className="w-full h-full relative">
      <nav className="w-full flex items-center  bg-neutral-200 justify-around  left-0 h-20   ">
        <h1 className=" text-2xl font-semibold " style={{ fontFamily: "michroma" }}>
          Report Generator 
        </h1>
      </nav>
      <div className="flex justify-center items-center">
        {/* left section */}
        <div className=" bg-neutral-100 flex justify-center items-center rounded-xl m-2 w-full h-full border border-neutra-200 ">
        <ReportEditor/>
        </div>
      </div>
    </div>
  );
};

export default page;
