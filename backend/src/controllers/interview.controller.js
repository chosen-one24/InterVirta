import { PDFParse } from "pdf-parse";
import { generateInterviewReport, generateResumePdf } from "../services/ai.service.js";
import interviewReportModel from "../models/interviewReport.model.js";



async function generateInterviewReportController(req, res) {

    const resumeContent = await (
        new PDFParse(Uint8Array.from(req.file.buffer))
    ).getText();

    const { selfDescription, jobDescription } = req.body;

    const interviewReportByAi = await generateInterviewReport({ resume: resumeContent.text, selfDescription, jobDescription });

    // title is to be :D

    const interViewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,

        ...interviewReportByAi
    })


    res.status(201).json({
        message: "Interview Report successfully generated",
        interviewReport: interViewReport
    });
}



/**
 * @description Controller to get interview report by interviewId.
 */
async function getInterviewReportByIdController(req, res) {

    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    return res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })


}



/** 
 * @description Controller to get all interview reports of logged in user.
 */
async function getAllInterviewReportsController(req, res) {
    const interviewReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 }).select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")
    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}


/**
 * @description Controller to generate resume pdf for a candidate  
 */

function sanitizeFilename(name = "resume") {
    return name
        .replace(/\r|\n/g, " ")
        .replace(/"/g, "")
        .replace(/[\\/\?%\*:|<>]/g, "")
        .trim()
        .replace(/\s+/g, "_")
        .substring(0, 100) || "resume";
}

async function generatePdfController(req, res) {
    const { interviewId } = req.params;

    const interViewReport = await interviewReportModel.findById(interviewId);

    if (!interViewReport) {
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    const reportOwnerId = interViewReport.user?._id?.toString() || interViewReport.user?.toString();
    if (reportOwnerId !== req.user.id.toString()) {
        return res.status(401).json({
            message: "Unauthorized"
        })
    }

    const resume = interViewReport.resume;
    const jobDescription = interViewReport.jobDescription;
    const selfDescription = interViewReport.selfDescription;

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription });
    const filename = `${sanitizeFilename(interViewReport.title)}.pdf`;

    res.type("application/pdf");
    res.attachment(filename);
    res.send(pdfBuffer);
}



export const interviewController = { generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController, generatePdfController };