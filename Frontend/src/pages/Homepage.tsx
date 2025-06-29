import JobCard from "@/components/app/JobCard";
import JobForm from "@/components/app/JobForm";
import { useState } from "react";

const Home = () => {
    const [showForm, setShowForm] = useState(false);
    
    console.log("Rendering Home component...");
    console.log("Rendering JobCard");
    
    return (
        <div className="min-h-screen bg-gray-50 p-4">
            {/* Header with Add Job Button */}
            <div className="mb-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-800">Job Dashboard</h1>
                    <button 
                        onClick={() => setShowForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 shadow-sm"
                    >
                        Add Job
                    </button>
                </div>
            </div>

            {/* Job Cards Container */}
            <div className="grid gap-6">
                <JobCard />
            </div>

            {/* Modal Overlay */}
            {showForm && (
                <div className="fixed inset-0  bg-opacity-80 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-md max-h-[90vh] overflow-y-auto"> 
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-800">Create New Job</h2>
                            <button 
                                onClick={() => setShowForm(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                                aria-label="Close modal"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                        
                        {/* Modal Content */}
                        <div className="p-6">
                            <JobForm />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;