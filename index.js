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

//Fetch all the securities and trades
app.get('/', async (req, res) => {
    try{
        const portfolio = await Security.find()
        res.json(portfolio)
    }catch (e) {
        res.json({message: e.message})
    }
})


//Inserting new security
app.post('/', async (req, res) => {
    //Take values to insert new security
    const security = new Security({
        name: req.body.name,
        ticker: req.body.ticker.toUpperCase(),
        price: req.body.price,
        trades: []
    })

    //Saving it into database using save() and getting getting the saved object as response
    try{
        const saved = await security.save()
        res.json(saved)
    }catch (e) {
        res.json({message: e})
    }
})

//Connection to MongoDB using mongoose.connect()
//To secure the DB, used .env to access the DB_URL
mongoose.connect("mongodb+srv://instashot:instashot2020@cluster0.cf8a1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {useNewUrlParser: true, useUnifiedTopology: true}, ()=>{
    console.log("connected to DB")
} )


app.listen(PORT, ()=>{
    console.log(`Listening to ${PORT}`)
})
