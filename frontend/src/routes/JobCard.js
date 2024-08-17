import React from 'react';
import '../CSS/JobCard.css';

const JobCard = ({ job }) => {
  return (
    <div className="job-card border bg-light">
      <div className="job-date">{job.date}</div>
      <h3>{job.title}</h3>
      <p className="job-company">{job.company}</p>
      <p className="job-rate">{job.rate}</p>
      <p className="job-location">{job.location}</p>
      <p className="job-type">{job.type}</p>
      <button className="btn btn-primary">Details</button>
    </div>
  );
}

export default JobCard;
