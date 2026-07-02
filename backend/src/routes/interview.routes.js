import Router from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { interviewController } from "../controllers/interview.controller.js";
import upload from "../middlewares/file.middleware.js";

const interviewRouter = Router();



/**
 * @route POST /api/interview
 * description generate the interview report on basis of the JD,Self Description,Resume 
 * @access Private
 */
interviewRouter.post("/",authMiddleware.authUser , upload.single("resume")  , interviewController.generateInterviewReportController)



/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get("/report/:interviewId", authMiddleware.authUser, interviewController.getInterviewReportByIdController)


/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get("/", authMiddleware.authUser, interviewController.getAllInterviewReportsController)


/**
 * @route POST /api/interview/resume/pdf/:interviewReportId
 * @description generate resume pdf for a candidate 
 * @access private
 */
interviewRouter.post("/resume/pdf/:interviewId", authMiddleware.authUser, interviewController.generatePdfController);



export default interviewRouter;