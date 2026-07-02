import { GoogleGenAI, Type } from "@google/genai";
import puppeteer from 'puppeteer';

// Plain object schema conforming exactly to Google Gen AI specifications
const interviewReportSchema = {
    type: Type.OBJECT,
    properties: {
        title: {
            type: Type.STRING,
            description: "The title of the job for which the interview report is generated"
        },
        matchScore: {
            type: Type.INTEGER,
            description: "A score between 0 and 100 indicating how well the candidate's profile matches the job description"
        },
        technicalQuestions: {
            type: Type.ARRAY,
            description: "Technical questions that can be asked in the interview along with their intention and how to answer them",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The technical question" },
                    intention: { type: Type.STRING, description: "The intention of interviewer behind asking this question" },
                    answer: { type: Type.STRING, description: "How to answer this question, what points to cover" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        behavioralQuestions: {
            type: Type.ARRAY,
            description: "Behavioral questions that can be asked in the interview along with their intention and how to answer them",
            items: {
                type: Type.OBJECT,
                properties: {
                    question: { type: Type.STRING, description: "The behavioral question" },
                    intention: { type: Type.STRING, description: "The intention of interviewer behind asking this question" },
                    answer: { type: Type.STRING, description: "How to answer this question, what points to cover" }
                },
                required: ["question", "intention", "answer"]
            }
        },
        skillGaps: {
            type: Type.ARRAY,
            description: "List of skill gaps in the candidate's profile along with their severity",
            items: {
                type: Type.OBJECT,
                properties: {
                    skill: { type: Type.STRING, description: "The skill which the candidate is lacking" },
                    severity: { 
                        type: Type.STRING, 
                        enum: ["low", "medium", "high"],
                        description: "The importance/impact of this skill gap" 
                    }
                },
                required: ["skill", "severity"]
            }
        },
        preparationPlan: {
            type: Type.ARRAY,
            description: "A day-wise preparation plan for the candidate to follow",
            items: {
                type: Type.OBJECT,
                properties: {
                    day: { type: Type.INTEGER, description: "The day number, starting from 1" },
                    focus: { type: Type.STRING, description: "The main focus of this day" },
                    tasks: { 
                        type: Type.ARRAY, 
                        items: { type: Type.STRING },
                        description: "List of tasks to be done on this day" 
                    }
                },
                required: ["day", "focus", "tasks"]
            }
        }
    },
    required: ["title", "matchScore", "technicalQuestions", "behavioralQuestions", "skillGaps", "preparationPlan"]
};

async function generateInterviewReport({ resume, selfDescription, jobDescription }) {
    const ai = new GoogleGenAI({
        apiKey: process.env.GOOGLE_GENAI_API_KEY
    });
    


    const prompt = `Generate an interview report for a candidate with the following details:
                    Resume: ${resume}
                    Self Description: ${selfDescription}
                    Job Description: ${jobDescription}`;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: interviewReportSchema, 
        }
    });

    console.log("Response BY Gemini : ");
    console.log(response.text);

    return JSON.parse(response.text);
}


// async function generatePdfFromHtml(htmlContent) {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
    
//     await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
//     // const pdfBuffer = await page.pdf({
//     //     format: 'A4',
//     //     printBackground: true,
//     //     margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
//     // });

//     const pdfBuffer = await page.pdf({
//         format: "A4",
//         printBackground: true,
//         preferCSSPageSize: true,
//         margin: {
//             top: "0.5cm",
//             right: "0.5cm",
//             bottom: "0.5cm",
//             left: "0.5cm"
//         }
//     });
    
//     await browser.close();
    
//     return pdfBuffer;
// }



async function generatePdfFromHtml(htmlContent) {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setViewport({
        width: 1240,
        height: 1754,
        deviceScaleFactor: 2
    });

    await page.setContent(htmlContent, {
        waitUntil: "networkidle0"
    });

    await page.emulateMediaType("screen");

    const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
        margin: {
            top: "0.5cm",
            right: "0.5cm",
            bottom: "0.5cm",
            left: "0.5cm"
        }
    });

    await browser.close();

    return pdfBuffer;
}
    
    
async function generateResumePdf({resume,jobDescription,selfDescription}) {
    const resumePDfSchema = {
        type: Type.OBJECT,
        properties: {
            html: {
                type: Type.STRING,
                description: "The Html content of resume which can be converted to Pdf Using puppeteer"
            }
        },
        required: ["html"]
    };

    const ai = new GoogleGenAI({
        apiKey: process.env.GOOGLE_GENAI_API_KEY
    });

//    const prompt = `Generate resume for a candidate with the following details:
//                         Resume: ${resume}
//                         Self Description: ${selfDescription}
//                         Job Description: ${jobDescription}

//                         the response should be a JSON object with a single field "html" which contains the HTML content of the resume which can be converted to PDF using any library like puppeteer.
//                         The resume should be tailored for the given job description and should highlight the candidate's strengths and relevant experience. The HTML content should be well-formatted and structured, making it easy to read and visually appealing.
//                         The content of resume should be not sound like it's generated by AI and should be as close as possible to a real human-written resume.
//                         you can highlight the content using some colors or different font styles but the overall design should be simple and professional.
//                         The content should be ATS friendly, i.e. it should be easily parsable by ATS systems without losing important information.
//                         The resume should not be so lengthy, it should ideally be 1-2 pages long when converted to PDF. Focus on quality rather than quantity and make sure to include all the relevant information that can increase the candidate's chances of getting an interview call for the given job description.
//                     `


        const prompt = `
You are a senior resume writer, ATS optimization expert, and professional HTML resume designer.

Your task is to generate a premium, ATS-friendly resume tailored specifically to the provided Job Description.

The output will be rendered directly by Puppeteer into an A4 PDF.

===========================
CANDIDATE INFORMATION
===========================

Resume:
${resume}

Self Description:
${selfDescription}

Target Job Description:
${jobDescription}

===========================
OUTPUT FORMAT
===========================

Return ONLY a JSON object.

The JSON must contain exactly one property:

{
   "html":"<!DOCTYPE html>...."
}

The html property must contain a COMPLETE standalone HTML document.

Do NOT return markdown.

Do NOT wrap HTML inside markdown.

Do NOT explain anything.

===========================
IMPORTANT CONTENT RULES
===========================

The generated resume must look like it was written by an experienced recruiter.

Rewrite content naturally.

Improve wording.

Improve readability.

Improve ATS compatibility.

Do NOT sound AI generated.

Use concise professional language.

Use strong action verbs.

Examples:

Developed

Designed

Built

Implemented

Optimized

Collaborated

Integrated

Improved

Evaluated

Created

Never use generic AI phrases.

===========================
VERY IMPORTANT
===========================

Never fabricate information.

Never invent:

• companies

• projects

• skills

• dates

• certifications

• degrees

• achievements

Only improve wording.

Do NOT create fake metrics.

Do NOT create fake percentages.

Do NOT create fake accomplishments.

===========================
SELF DESCRIPTION RULE
===========================

The Self Description is ONLY additional context.

DO NOT copy it.

DO NOT paraphrase it line-by-line.

Generate a completely NEW Professional Summary using:

• Resume

• Job Description

• Self Description

Maximum 50 words.

Maximum 3 lines.

===========================
ATS RULES
===========================

Tailor the resume toward the provided Job Description.

Prioritize relevant skills.

Prioritize relevant projects.

Prioritize relevant experience.

Rewrite bullet points using ATS keywords found in the Job Description.

Do not keyword stuff.

===========================
LENGTH RULES
===========================

The resume MUST fit on ONE A4 page whenever reasonably possible.

Compress content instead of creating a second page.

Maximum:

Summary
3 lines

Each Experience
3 bullet points

Each Project
3 bullet points

Skills
Compact grouped list

Certifications
One line each

Education
Very concise

Avoid repetition.

===========================
DESIGN RULES
===========================

Create a clean premium resume.

Minimal.

Professional.

Modern.

Inspired by Rezi.

Inspired by Novoresume.

Inspired by Enhancv.

No unnecessary decorations.

Very ATS friendly.

===========================
LAYOUT
===========================

Header

Professional Summary

Technical Skills

Projects

Experience

Education

Certifications

===========================
TYPOGRAPHY
===========================

Name
28px

Section Heading
13px

Body
10.5px

Metadata
9.5px

Line height
1.35

Compact spacing.

Minimal whitespace.

===========================
COLORS
===========================

Primary:
#1f2937

Accent:
#2563eb

Body:
#374151

Dividers:
#d1d5db

White background.

===========================
HTML REQUIREMENTS
===========================

Return a COMPLETE HTML document.

Include:

<!DOCTYPE html>

<html>

<head>

<style>

...

</style>

</head>

<body>

...

</body>

</html>

Do NOT use external CSS.

Embed ALL CSS.

===========================
CSS REQUIREMENTS
===========================

Include:

@page{
size:A4;
margin:0.5cm;
}

*{
box-sizing:border-box;
}

body{
font-family:Arial,sans-serif;
margin:0;
padding:28px;
color:#222;
}

section{
page-break-inside:avoid;
break-inside:avoid;
margin-top:18px;
}

p{
margin:4px 0;
}

li{
margin:3px 0;
}

Avoid oversized whitespace.

Avoid page breaks inside Experience.

Avoid page breaks inside Projects.

Avoid page breaks inside Education.

===========================
FINAL GOAL
===========================

Generate a resume that:

Looks professionally designed.

Passes ATS parsing.

Fits on one A4 page whenever possible.

Looks written by a human recruiter.

Does NOT copy the Self Description.

Does NOT fabricate information.

Returns ONLY the JSON object containing the html field.
`;




    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: resumePDfSchema, 
        }
    });

    console.log("Response BY Gemini : ");
    console.log(response.text);

    const jsonContent=JSON.parse(response.text);

    const pdfBuffer=await generatePdfFromHtml(jsonContent.html); 

    return pdfBuffer; 
}

export {generateInterviewReport,generateResumePdf};