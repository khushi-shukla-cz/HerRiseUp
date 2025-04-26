
import React, { useEffect, useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import JobCard from '@/components/jobs/JobCard';
import { getJobListings } from '@/services/chatService';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  skills: string[];
  salary?: string;
}

const JobListings = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobListings = await getJobListings();
        setJobs(jobListings);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobs();
  }, []);
  
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-career-softGray flex flex-col pb-16">
      {/* Header */}
      <header className="bg-white border-b border-career-soft py-4 px-4 shadow-sm">
        <div className="container max-w-md mx-auto">
          <h1 className="text-xl font-semibold text-career-primary">Job Listings</h1>
        </div>
      </header>
      
      {/* Search Bar */}
      <div className="bg-white p-4 shadow-sm border-b border-career-soft">
        <div className="container max-w-md mx-auto relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-career-neutralGray" />
          <Input 
            placeholder="Search jobs..."
            className="pl-10 border-career-soft"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      {/* Job Listings */}
      <div className="flex-1 p-4">
        <div className="container max-w-md mx-auto">
          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-xl h-40 animate-pulse" />
              ))}
            </div>
          ) : filteredJobs.length > 0 ? (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  title={job.title}
                  company={job.company}
                  location={job.location}
                  description={job.description}
                  skills={job.skills}
                  salary={job.salary}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-career-secondary">No job listings found</p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="mt-2 text-career-primary underline"
                >
                  Clear search
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default JobListings;
