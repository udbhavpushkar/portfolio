import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose"
import "dotenv/config.js"
import portfolioRoutes from "./routes/porfolio.js"
import Security from "./models/security.js"

const app = express();
const PORT = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/portfolio', portfolioRoutes)

app.get('/', async (req, res) => {
    try{
        const portfolio = await Security.find()
        res.json(portfolio)
    }catch (e) {
        res.json({message: e.message})
    }
})

app.post('/', async (req, res) => {
    const security = new Security({
        name: req.body.name,
        ticker: req.body.ticker.toUpperCase(),
        price: req.body.price,
        trades: []
    })

    try{
        const saved = await security.save()
        res.json(saved)
    }catch (e) {
        res.json({message: e})
    }
})


mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log("connected to DB")
} )



app.listen(PORT, ()=>{
    console.log(`Listening to ${PORT}`)
})
