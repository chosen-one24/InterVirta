import dotenv from "dotenv"
dotenv.config();

import app from "./src/app.js"
import connectToDB from "./src/config/database.js"


connectToDB();


const PORT = process.env.PORT || 3000;

app.listen(3000,()=>{
    console.log(`✅ Server running on port ${PORT}`);
})