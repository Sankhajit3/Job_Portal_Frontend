import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name:'company',
    initialState:{
        singleCompany:null,
        companies:[],
        searchCompanyByText:""
    },
    reducers:{
        setSingleCompany:(state,action) => {
            state.singleCompany = action.payload;
        },
        setCompanies:(state,action) => {
            state.companies = action.payload
        },
        setSearchCompanyByText:(state,action) => {
            state.searchCompanyByText = action.payload;
        },
        deleteCompany: (state, action) => {
            const companyId = action.payload;
            // Filter out the company with the given ID
            state.companies = state.companies.filter(company => company._id !== companyId);
        }
    }
});

export const {setSingleCompany,setCompanies,setSearchCompanyByText,deleteCompany} = companySlice.actions;
export default companySlice.reducer;