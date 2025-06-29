import axios from "axios";
import type React from "react";
import { useEffect, useState } from "react";
import { MapPin, DollarSign, ExternalLink, Clock, Building2, Briefcase, AlertCircle, Loader2, Calendar, GripVertical } from "lucide-react";

interface Job {
    id: string;
    jobTitle: string;
    company: string;
    jobURL: string;
    status: string;
    salary: string;
    location: string;
    description: string;
    createdAt: string;
}

const JobCard: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [draggedJob, setDraggedJob] = useState<Job | null>(null);

    const statusColumns = [
        { id: 'applied', title: 'Applied', color: 'bg-blue-50 border-blue-200' },
        { id: 'interview', title: 'Interview', color: 'bg-amber-50 border-amber-200' },
        { id: 'offer', title: 'Offer', color: 'bg-green-50 border-green-200' },
        { id: 'rejected', title: 'Rejected', color: 'bg-red-50 border-red-200' }
    ];

    const fetchJobs = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('User not authenticated');
            console.log('no token');
            setLoading(false);
            return;
        }
        
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:3000/apiv1/jobs', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log('jobs received ', response);
            setJobs(response.data);
            setError('');
        } catch (error) {
            console.error("error fetching the jobs ", error);
            setError('Failed to fetch jobs');
        } finally {
            setLoading(false);
        }
    };

    const updateJobStatus = async (jobId: string, newStatus: string) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('User not authenticated');
            return;
        }

        try {
            await axios.put(`http://localhost:3000/apiv1/jobs/${jobId}`, 
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            
            // Update local state
            setJobs(prevJobs => 
                prevJobs.map(job => 
                    job.id === jobId ? { ...job, status: newStatus } : job
                )
            );
        } catch (error) {
            console.error("Error updating job status:", error);
            setError('Failed to update job status');
            // Revert the UI change by refetching
            fetchJobs();
        }
    };

    useEffect(() => {
        fetchJobs();
        console.log("JobCard mounted");
    }, []);

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'applied': return 'bg-blue-50 text-blue-700 border-blue-200';
            case 'interview': return 'bg-amber-50 text-amber-700 border-amber-200';
            case 'offer': return 'bg-green-50 text-green-700 border-green-200';
            case 'rejected': return 'bg-red-50 text-red-700 border-red-200';
            default: return 'bg-gray-50 text-gray-700 border-gray-200';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const handleDragStart = (e: React.DragEvent, job: Job) => {
        setDraggedJob(job);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (e: React.DragEvent, newStatus: string) => {
        e.preventDefault();
        if (draggedJob && draggedJob.status.toLowerCase() !== newStatus.toLowerCase()) {
            updateJobStatus(draggedJob.id, newStatus);
        }
        setDraggedJob(null);
    };

    const getJobsByStatus = (status: string) => {
        return jobs.filter(job => job.status.toLowerCase() === status.toLowerCase());
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 p-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center h-64">
                        <div className="flex items-center space-x-3 text-gray-600">
                            <Loader2 className="h-6 w-6 animate-spin" />
                            <span className="text-lg">Loading your applications...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-white rounded-lg shadow-sm border border-gray-200">
                            <Briefcase className="h-6 w-6 text-gray-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Job Application Tracker
                        </h1>
                    </div>
                    <p className="text-gray-600 text-lg">
                        Drag and drop applications between status columns to track your progress
                    </p>
                </div>

                {/* Error State */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                            <AlertCircle className="h-5 w-5 text-red-600" />
                            <p className="text-red-800 font-medium">{error}</p>
                            <button
                                onClick={() => setError('')}
                                className="ml-auto text-red-600 hover:text-red-800"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

                {/* Stats Summary */}
                {jobs.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        {statusColumns.map((column) => {
                            const count = getJobsByStatus(column.id).length;
                            return (
                                <div key={column.id} className={`p-4 rounded-lg border shadow-sm ${column.color}`}>
                                    <div className="text-2xl font-bold text-gray-900">{count}</div>
                                    <div className="text-sm text-gray-600">{column.title}</div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Kanban Board */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {statusColumns.map((column) => (
                        <div
                            key={column.id}
                            className={`rounded-lg border-2 border-dashed p-4 min-h-96 ${column.color} transition-colors duration-200`}
                            onDragOver={handleDragOver}
                            onDrop={(e) => handleDrop(e, column.id)}
                        >
                            {/* Column Header */}
                            <div className="mb-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                                    {column.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {getJobsByStatus(column.id).length} applications
                                </p>
                            </div>

                            {/* Job Cards */}
                            <div className="space-y-3">
                                {getJobsByStatus(column.id).map((job) => (
                                    <div
                                        key={job.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, job)}
                                        className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-move group"
                                    >
                                        {/* Drag Handle */}
                                        <div className="flex items-start space-x-3">
                                            <GripVertical className="h-4 w-4 text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <div className="flex-1 min-w-0">
                                                {/* Job Title & Company */}
                                                <h4 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                                                    {job.jobTitle}
                                                </h4>
                                                <div className="flex items-center space-x-1 text-gray-600 mb-2">
                                                    <Building2 className="h-3 w-3 flex-shrink-0" />
                                                    <span className="text-xs font-medium truncate">{job.company}</span>
                                                </div>

                                                {/* Location */}
                                                <div className="flex items-center space-x-1 text-gray-500 mb-2">
                                                    <MapPin className="h-3 w-3 flex-shrink-0" />
                                                    <span className="text-xs truncate">{job.location}</span>
                                                </div>

                                                {/* Salary */}
                                              

                                                {/* Applied Date */}
                                                <div className="flex items-center space-x-1 text-gray-400 mb-3">
                                                    <Calendar className="h-3 w-3 flex-shrink-0" />
                                                    <span className="text-xs">{formatDate(job.createdAt)}</span>
                                                </div>

                                                {/* Action Button */}
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        window.open(job.jobURL, '_blank');
                                                    }}
                                                    className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-1.5 px-3 rounded text-xs transition-colors duration-200 flex items-center justify-center space-x-1"
                                                >
                                                    <span>View</span>
                                                    <ExternalLink className="h-3 w-3" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Empty Column State */}
                                {getJobsByStatus(column.id).length === 0 && (
                                    <div className="text-center py-8 text-gray-400">
                                        <Briefcase className="h-8 w-8 mx-auto mb-2 opacity-40" />
                                        <p className="text-sm">No applications</p>
                                        <p className="text-xs">Drag jobs here</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {jobs.length === 0 && !error && !loading && (
                    <div className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                            <Briefcase className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No applications yet</h3>
                        <p className="text-gray-600 mb-6">Start tracking your job applications to see them here.</p>
                        <button
                            onClick={fetchJobs}
                            className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                        >
                            Refresh
                        </button>
                    </div>
                )}

                {/* Refresh Button */}
                {jobs.length > 0 && (
                    <div className="text-center mt-8">
                        <button
                            onClick={fetchJobs}
                            disabled={loading}
                            className="inline-flex items-center space-x-2 bg-white hover:bg-gray-50 border border-gray-200 hover:border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        >
                            <Loader2 className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                            <span>{loading ? 'Refreshing...' : 'Refresh Applications'}</span>
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobCard;