import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",
  initialState: {
    allJobs: [],
    allRecruiterJobs: [],
    singleJob: null,
    searchJobByText: "",
    allAppliedJobs:[],
    searchedQuery:"",
    savedJobs:[]
  },
  reducers: {
    //actions
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    setAllRecruiterJobs: (state, action) => {
      state.allRecruiterJobs = action.payload;
    },
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload;
    },
    removeSavedJob(state, action) {
      state.savedJobs = state.savedJobs.filter(job => job._id !== action.payload);
    },
    removeJob: (state, action) => {
      state.allRecruiterJobs = state.allRecruiterJobs.filter(job => job._id !== action.payload);
      state.allJobs = state.allJobs.filter(job => job._id !== action.payload);
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllRecruiterJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  removeJob,
  setSavedJobs,
  removeSavedJob
} = jobSlice.actions;
export default jobSlice.reducer;
