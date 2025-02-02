import express from 'express';
import needle from 'needle';
import dotenv from 'dotenv';
import url from 'url';
import apicache from 'apicache';

dotenv.config();

const router = express.Router();

const API_BASE_URL = process.env.API_BASE_URL;
const API_KEY_NAME = process.env.API_KEY_NAME;
const API_KEY_VALUE = process.env.API_KEY_VALUE;

//cache init
let cache = apicache.middleware

router.get('/', cache('1 minutes'), async (req, res)=>{
    try {
        
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url, true).query
        })
        const apiResponse = await needle('get', `${API_BASE_URL}?${params}`)
        const data = apiResponse.body

        //log the request to public api
        if(process.env.NODE_ENV !== 'production'){
            console.log(`REQUEST: ${API_BASE_URL}?${params}`)
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({error})
    }
})

export default router