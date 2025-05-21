import connectToDb from "./db/connectToDb.js";
import app from "./index.js";
import http from 'http'

const PORT = process.env.PORT || 8000;
const server = http.createServer(app)


server.listen(PORT,async()=>{
    console.log(`server is running on PORT ${PORT}`)
    await connectToDb();
})