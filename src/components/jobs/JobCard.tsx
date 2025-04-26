
import React from 'react';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  description: string;
  skills: string[];
  salary?: string;
}

const JobCard: React.FC<JobCardProps> = ({ 
  title, 
  company, 
  location, 
  description, 
  skills,
  salary 
}) => {
  return (
    <div className="bg-white rounded-xl border border-career-soft p-4 shadow-sm hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold text-career-dark">{title}</h3>
      <div className="flex items-center justify-between mt-1">
        <p className="text-career-secondary font-medium">{company}</p>
        <span className="text-xs bg-career-soft text-career-secondary px-3 py-1 rounded-full">{location}</span>
      </div>
      
      {salary && (
        <p className="text-sm text-career-primary font-medium mt-2">
          {salary}
        </p>
      )}
      
      <p className="text-sm text-career-neutralGray mt-3 line-clamp-2">{description}</p>
      
      <div className="flex flex-wrap gap-2 mt-3">
        {skills.map((skill, index) => (
          <span 
            key={index} 
            className="text-xs bg-career-softGray text-career-secondary px-2 py-1 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2 bg-career-primary text-white rounded-md hover:bg-career-secondary transition-colors">
        View Details
      </button>
    </div>
  );
};

export default JobCard;
