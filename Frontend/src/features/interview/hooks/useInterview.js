import {generateInterviewReport,getAllInterviewReports,getInterviewReportById,generateResumePdf} from "../services/interview.api.js";

import {InterviewContext} from "../Interview.context.jsx"
import { useContext, useEffect } from "react";
import { useParams } from "react-router";


export const useInterview=()=>{

    const context=useContext(InterviewContext)
    if(!context){
        throw new Error("useInterview must be used within an InterviewProvider");
    }
    

    const {loading,setLoading,report,setReport,reports,setReports}=context;
    
    
    
   


    const generateReport= async ({jobDescription,selfDescription,resumeFile})=>{
        setLoading(true)

        let response=null;
        try{
            response= await generateInterviewReport({jobDescription,selfDescription,resumeFile});
            setReport(response.interviewReport);
        }catch(error){
            console.log(error);
            
        }finally{
            setLoading(false);
        }

        return response?.interviewReport;
    }

    const getReportById=async(interviewId)=>{
        setLoading(true);
        let response=null;
        try{
            response= await getInterviewReportById(interviewId);
            setReport(response.interviewReport);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }
        return response?.interviewReport;
    }


    const getReports=async ()=>{
        setLoading(true);
        let response=null;
        try{
             response= await getAllInterviewReports();
            setReports(response.interviewReports);
        }catch(error){
            console.log(error);
        }finally{
            setLoading(false);
        }


        return response?.interviewReports;
    }




    const {interviewId}=useParams();
    useEffect(() => {
        if(interviewId){

            getReportById(interviewId);
        }
    }, [interviewId]);

    const downloadResumePdf = async (interviewId) => {
        try {
            const blob = await generateResumePdf(interviewId);
            const url = window.URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
            const link = document.createElement("a");
            link.href = url;
            const fileName = report?.title ? `Resume_${report.title}.pdf` : `Resume_${interviewId}.pdf`;
            link.setAttribute("download", fileName);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.log("Failed to download PDF:", error);
            throw error;
        }
    };

    return {loading,report,reports,generateReport,getReportById,getReports,downloadResumePdf};
}