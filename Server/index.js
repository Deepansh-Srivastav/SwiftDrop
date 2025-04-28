import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import helmet from 'helmet'
import connectDB from './Config/connectDB.js'
import userRouter from './Routes/users.route.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

const frontEndDevUrl = process.env.FRONTEND_DEV_URL;

const frondEndProdUrl = process.env.FRONTEND_PROD_URL;

console.log(frondEndProdUrl, frontEndDevUrl);

app.use(cors({
    credentials: true,
    origin: true
    // origin: [frondEndProdUrl, frontEndDevUrl]
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan('combined'))
app.use(helmet({
    crossOriginResourcePolicy: false
}))

const PORT = process.env.PORT_2 || process.env.PORT_1

app.use('/api/user', userRouter)

app.get('/', (req, res) => {
    res.send("This is the home page")
})

async function startServer() {
    await connectDB()
        .then(() => {
            app.listen(PORT, (req, res) => {
                console.log('SERVER is running at PORT- ', PORT);
            })
        })
        .catch((error) => {
            console.log("A problem occurred while starting the server -", error);
        })
}

startServer();