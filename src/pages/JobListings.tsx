import React, { useEffect, useState } from 'react';
import Navigation from '@/components/layout/Navigation';
import JobCard from '@/components/jobs/JobCard';
import { getJobListings } from '@/services/chatService';
import { Input } from '@/components/ui/input';
import { Search, Briefcase, MapPin, Filter, Clock, DollarSign, Award, ArrowUpDown, X } from 'lucide-react';
import { PageHeader, PageContent } from '@/components/layout/PageContainer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

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
  
  // Filter states
  const [locations, setLocations] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [salaryRange, setSalaryRange] = useState([0, 100]);
  const [jobType, setJobType] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("relevance");
  
  // Add state for mobile filter drawer
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobListings = await getJobListings();
        setJobs(jobListings);
        
        // Extract unique locations for filter
        const uniqueLocations = Array.from(
          new Set(jobListings.map(job => job.location))
        );
        setLocations(uniqueLocations);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchJobs();
  }, []);
  
  const filteredJobs = jobs.filter(job => {
    // Search filter
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Location filter
    const matchesLocation = 
      selectedLocations.length === 0 || 
      selectedLocations.includes(job.location);
    
    return matchesSearch && matchesLocation;
  });
  
  // Sort jobs based on user selection
  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch(sortBy) {
      case "company":
        return a.company.localeCompare(b.company);
      case "location":
        return a.location.localeCompare(b.location);
      default:
        return 0; // relevance - keep original order
    }
  });

  // Render filters function to avoid code duplication
  const renderFilters = () => (
    <div className="space-y-6">
      {/* Location Filter */}
      <div>
        <h3 className="font-medium flex items-center mb-3">
          <MapPin className="w-4 h-4 mr-2 text-career-secondary" />
          Location
        </h3>
        <div className="space-y-2">
          {locations.map(location => (
            <div className="flex items-center space-x-2" key={location}>
              <Checkbox 
                id={`location-${location}`}
                checked={selectedLocations.includes(location)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setSelectedLocations([...selectedLocations, location]);
                  } else {
                    setSelectedLocations(selectedLocations.filter(l => l !== location));
                  }
                }}
              />
              <label 
                htmlFor={`location-${location}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {location}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Job Type Filter */}
      <div>
        <h3 className="font-medium flex items-center mb-3">
          <Clock className="w-4 h-4 mr-2 text-career-secondary" />
          Job Type
        </h3>
        <div className="space-y-2">
          {['Full-time', 'Part-time', 'Contract', 'Remote'].map(type => (
            <div className="flex items-center space-x-2" key={type}>
              <Checkbox 
                id={`type-${type}`}
                checked={jobType.includes(type)}
                onCheckedChange={(checked) => {
                  if (checked) {
                    setJobType([...jobType, type]);
                  } else {
                    setJobType(jobType.filter(t => t !== type));
                  }
                }}
              />
              <label 
                htmlFor={`type-${type}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Salary Range */}
      <div>
        <h3 className="font-medium flex items-center mb-3">
          <DollarSign className="w-4 h-4 mr-2 text-career-secondary" />
          Salary Range
        </h3>
        <Slider 
          defaultValue={[0, 100]} 
          max={100} 
          step={5}
          value={salaryRange}
          onValueChange={setSalaryRange}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-career-neutralGray">
          <span>$0</span>
          <span>${salaryRange[0]}K - ${salaryRange[1]}K+</span>
          <span>$200K+</span>
        </div>
      </div>
      
      {/* Experience Level */}
      <div>
        <h3 className="font-medium flex items-center mb-3">
          <Award className="w-4 h-4 mr-2 text-career-secondary" />
          Experience Level
        </h3>
        <div className="space-y-2">
          {['Entry Level', 'Mid Level', 'Senior', 'Executive'].map(level => (
            <div className="flex items-center space-x-2" key={level}>
              <Checkbox id={`level-${level}`} />
              <label 
                htmlFor={`level-${level}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {level}
              </label>
            </div>
          ))}
        </div>
      </div>
      
      {/* Sort By */}
      <div>
        <h3 className="font-medium flex items-center mb-3">
          <ArrowUpDown className="w-4 h-4 mr-2 text-career-secondary" />
          Sort By
        </h3>
        <div className="flex flex-wrap gap-2">
          {['relevance', 'company', 'location'].map(option => (
            <Badge 
              key={option}
              variant={sortBy === option ? "default" : "outline"}
              className="cursor-pointer capitalize"
              onClick={() => setSortBy(option)}
            >
              {option}
            </Badge>
          ))}
        </div>
      </div>
      
      {/* Clear Filters Button */}
      <Button 
        variant="outline" 
        className="w-full mt-4"
        onClick={() => {
          setSearchTerm('');
          setSelectedLocations([]);
          setSalaryRange([0, 100]);
          setJobType([]);
          setSortBy("relevance");
        }}
      >
        Clear Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-career-softGray flex flex-col pb-16">
      {/* Header */}
      <PageHeader title="Job Listings" description="Find opportunities aligned with your career goals" />
      
      {/* Search Bar */}
      <div className="bg-white py-4 px-4 shadow-sm border-b border-career-soft sticky top-16 z-20">
        <div className="max-w-6xl mx-auto relative">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-career-neutralGray" />
              <Input 
                placeholder="Search job title, company, or keywords..."
                className="pl-10 border-career-soft focus:border-career-primary"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button 
              variant="outline" 
              className="md:hidden flex items-center gap-2 border-career-soft hover:border-career-primary"
              onClick={() => setShowMobileFilters(true)}
            >
              <Filter size={16} />
              <span>Filters</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Filter Drawer */}
      {showMobileFilters && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowMobileFilters(false)}
          />
          <div className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-xl p-4 shadow-lg max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-career-dark flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filters
              </h2>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowMobileFilters(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            {renderFilters()}
            <div className="pt-4 pb-4 sticky bottom-0 bg-white border-t mt-6">
              <Button 
                className="w-full"
                onClick={() => setShowMobileFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </>
      )}
      
      {/* Main Content with Sidebar */}
      <PageContent>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Sidebar - Hidden on mobile */}
          <div className="hidden md:block w-64 lg:w-72 flex-shrink-0 self-start sticky top-36">
            <Card className="shadow-sm bg-white border border-career-soft">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                {renderFilters()}
              </CardContent>
            </Card>
          </div>
          
          {/* Job Listings */}
          <div className="flex-1 self-start">
            {isLoading ? (
              <div className="grid grid-cols-1 gap-4">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white rounded-xl h-40 animate-pulse shadow-sm border border-career-soft" />
                ))}
              </div>
            ) : sortedJobs.length > 0 ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-3 bg-white p-3 rounded-lg shadow-sm border border-career-soft">
                  <p className="text-career-neutralGray text-sm">
                    Showing <span className="font-medium text-career-dark">{sortedJobs.length}</span> jobs
                  </p>
                  <div className="hidden md:flex items-center gap-2">
                    <p className="text-sm text-career-neutralGray">Sort by:</p>
                    <select 
                      className="text-sm border border-career-soft rounded-md p-1"
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="relevance">Relevance</option>
                      <option value="company">Company</option>
                      <option value="location">Location</option>
                    </select>
                  </div>
                </div>
                
                {sortedJobs.map((job) => (
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
              <div className="text-center py-10 bg-white rounded-xl shadow-sm p-8 border border-career-soft">
                <Briefcase className="w-10 h-10 text-career-soft mx-auto mb-2" />
                <p className="text-career-secondary font-medium mb-2">No job listings found</p>
                <p className="text-career-neutralGray text-sm mb-4">Try adjusting your search or filters to see more results.</p>
                {searchTerm && (
                  <Button 
                    variant="outline"
                    onClick={() => setSearchTerm('')}
                    className="mt-2"
                  >
                    Clear search
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </PageContent>
      
      {/* Navigation */}
      <Navigation />
    </div>
  );
};

export default JobListings;
