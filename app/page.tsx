// import Profile from "@/components/Profile";
import ModeToggle from "@/components/ModeToggle";
import Link from "next/link";
// import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
    //  const session = await auth();
     // if(!session) redirect("/sign-in");
     return (
        <div className="min-h-screen  bg-gradient-to-br dark:bg-black bg-white">
            {/* Navigation */}
            <nav className="container mx-auto px-6 py-6 border-b border-slate-100">
                <div className="flex items-center justify-between">
                    <div className="text-xl dark:text-blue-100 font-bold text-blue-800" style={{ fontFamily: "'Michroma', 'Poppins', Arial, Helvetica, sans-serif" }}>
                        CLUBMATES
                    </div>
                    <div className="flex gap-10"> 
                    {/* <Profile/> */}
                    <ModeToggle/>
                    </div>
                </div>
            </nav>

            {/* Main Hero wala Section */}
            <section className="container mx-auto px-6 py-20 md:py-32" >
                <div className="max-w-4xl mx-auto text-center">
                    <h1
                        style={{ fontFamily: "Michroma" }}
                        className="text-xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight bg-gradient-to-br from-black via-blue-800 to-blue-500 dark:from-blue-100 dark:via-blue-400 dark:to-blue-700 bg-clip-text text-transparent"
                    >
                        Create Beautiful Templates & Monthly Reports
                    </h1>
                    <p
                        className="text-xl md:text-2xl dark:text-slate-400 text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                        Build professional templates and generate comprehensive end-of-month reports for anything. 
                        Simple, powerful, and designed for your workflow.
                    </p>
                    <div
                        className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/Select"
                            className="px-8 py-4 bg-white shadow-xl  border border-slate-200 text-blue-500 font-semibold rounded-lg hover:bg-neutral-100 transition-colors"
                        >
                            Start Creating
                        </Link>
                        <Link
                            href="/templates"
                            className="px-8 py-4 bg-white shadow-xl text-slate-900 font-semibold rounded-lg border border-slate-200 hover:bg-neutral-100 hover:text-blue-600 transition-colors"
                        >
                            Browse Templates
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="container mx-auto px-6 py-20 dark:bg-gray-800 bg-slate-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16 dark:text-slate-100 text-slate-900">
                        Everything You Need
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-slate-900">
                                Custom Templates
                            </h3>
                            <p className="text-slate-600">
                                Create and save reusable templates for any purpose. Design once, use forever.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-slate-900">
                                Monthly Reports
                            </h3>
                            <p className="text-slate-600">
                                Generate comprehensive end-of-month reports with just a few clicks. Track everything effortlessly.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-slate-100">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold mb-3 text-slate-900">
                                Easy Export
                            </h3>
                            <p className="text-slate-600">
                                Export your reports in multiple formats. Share with your team or clients instantly.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="container mx-auto px-6 py-20">
                <div className="max-w-4xl mx-auto bg-blue-50 rounded-2xl p-12 md:p-16 text-center border border-blue-100">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                        Ready to Get Started?
                    </h2>
                    <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
                        Join thousands of users creating beautiful reports and templates every day.
                    </p>
                    <Link
                        href="/signup"
                        className="inline-block px-8 py-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
                    >
                        Create Your First Report
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="container mx-auto px-6 py-12 border-t border-slate-100">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
                    <div className="text-slate-600 mb-4 md:mb-0">
                        © 2025 CLUBMATES. All rights reserved.
                    </div>
                    <div className="flex gap-6">
                        <Link href="/about" className="text-slate-600 hover:text-blue-600 transition-colors">
                            About
                        </Link>
                        <Link href="/features" className="text-slate-600 hover:text-blue-600 transition-colors">
                            Features
                        </Link>
                        <Link href="/contact" className="text-slate-600 hover:text-blue-600 transition-colors">
                            Contact
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
