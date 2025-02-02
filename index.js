import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index.js';
import rateLimit from 'express-rate-limit';

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

//rate limiting , how much time here 10 minute , how many req in 10 mins -> 5
const limiter = rateLimit({
    windowMs: 10 *60 * 1000,
    max: 100
})
app.use(limiter);
app.set('trust proxy', 1);

app.use(express.static('public'))

//routes
app.use('/api', router);

//enable cors
app.use(cors());

app.listen(PORT, ()=>{
    console.log(`App is listening at port ${PORT}`);
})