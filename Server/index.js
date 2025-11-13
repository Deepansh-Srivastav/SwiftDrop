import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import connectDB from './Config/connectDB.js';
import dotenv from 'dotenv';

import userRouter from './Routes/users.route.js';
import categoryRouter from './Routes/category.route.js';
import uploadImageRouter from './Routes/uploadImage.route.js';
import subCategoryRouter from './Routes/subCategory.route.js';
import productRouter from './Routes/product.route.js';

dotenv.config();

const app = express();

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

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadImageRouter);
app.use("/api/sub-category", subCategoryRouter);
app.use("/api/product", productRouter);

app.get('/', (req, res) => {
    res.send("This is the home page");
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