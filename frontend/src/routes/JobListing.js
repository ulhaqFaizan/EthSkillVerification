import React from 'react';
import JobCard from './JobCard';
import '../CSS/JobListing.css';

const jobs = [
  { id: 1, company: 'Amazon', title: 'Senior UI/UX Designer', date: '20 May, 2023', rate: '$50/hr', location: 'San Francisco, CA', type: 'Part time, Senior level, Distant' },
  { id: 2, company: 'Google', title: 'Junior UI/UX Designer', date: '4 Feb, 2023', rate: '$25/hr', location: 'California, CA', type: 'Full time, Junior level, Distant' },
  { id: 3, company: 'Dribbble', title: 'Senior Motion Designer', date: '29 Jan, 2023', rate: '$60/hr', location: 'New York, NY', type: 'Part time, Senior level, Full Day' },
  { id: 4, company: 'Twitter', title: 'UX Designer', date: '11 Apr, 2023', rate: '$30/hr', location: 'California, CA', type: 'Full time, Middle level, Distant' },
  { id: 5, company: 'Airbnb', title: 'Graphic Designer', date: '2 Apr, 2023', rate: '$30/hr', location: 'California, CA', type: 'Part time, Senior level, Distant' },
  { id: 6, company: 'Apple', title: 'Graphic Designer', date: '18 Jan, 2023', rate: '$40/hr', location: 'San Francisco, CA', type: 'Part time, Distant' },
];

const JobListing = () => {
  return (
    <div className="job-listing">
      <h2>Recommended jobs</h2>
      <div className="jobs">
        {jobs.map(job => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}

export default JobListing;
