import React, { useEffect, useState, useMemo } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

const Jobs = () => {
    
  const { allJobs, searchedQuery } = useSelector((store) => store.job);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (allJobs) {
      setLoading(false);
    }
  }, [allJobs]);

  const filteredJobs = useMemo(() => {
    if (searchedQuery) {
      return allJobs.filter((job) => {
        const lowerCaseQuery = searchedQuery.toLowerCase();
        return (
          job.title.toLowerCase().includes(lowerCaseQuery) ||
          job.company.name.toLowerCase().includes(lowerCaseQuery) ||
          job.location.toLowerCase().includes(lowerCaseQuery)
        );
      });
    }
    return allJobs;
  }, [allJobs, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-1/5"> {/* Corrected the width class */}
            <FilterCard />
          </div>
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <span>Loading...</span> {/* Replace this with a spinner if needed */}
            </div>
          ) : filteredJobs.length <= 0 ? (
            <span>Job not found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredJobs.map((job) => (
                  <motion.div
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    key={job?._id}
                  >
                    <Job job={job} />
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
