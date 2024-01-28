import express from "express"
import db_connection from "./DB/connection.js";
import userRouter from "./src/modules/User/user.routes.js"
import taskRouter from './src/modules/Task/task.routes.js'
import { globalResponse } from "./src/middlewares/globalResponse.js";
import {config} from 'dotenv'
config()
const app = express()
app.use(express.json())

app.use('/user',userRouter)
app.use('/task',taskRouter)

app.use(globalResponse)
db_connection()

app.listen(process.env.PORT,()=>{
    console.log("server running.........");
})