import express from "express"
import Security from "../models/security.js"

const router = express.Router()

//Cumulative returns
router.get('/', async (req, res) => {
    try{
        const portfolio = await Security.find()
        const currentPrice = 100 //Assuming current price = 100.00 (given in the task)
        const returns = portfolio.reduce((ans, value)=>ans+((currentPrice-value.price)*value.quantity), 0)
        res.send({returns: returns})
    }catch (err){
        res.json({message: err.message})
    }
})

//Fetch specific security and its trades
router.get('/:name',async (req, res) => {
    try{
        let ticker = req.params.name.toUpperCase()
        const oneSecurity = await Security.findOne({"ticker": ticker})
        res.json(oneSecurity)
    }catch (err) {
        res.json({message: err.message})
    }
})

//Adding trade to specific security
router.patch('/:name/:type', async (req, res) => {
    try{
        const data = await Security.findOne({"ticker":req.params.name.toUpperCase()}) // Getting security data
        let quantity = req.body.quantity
        let oldQty = data.quantity===0 ? 1 : data.quantity
        let newQty;
        let avgPrice = data.price;
        if(req.params.type==="buy"){
            newQty = quantity+oldQty;
            avgPrice = ((data.price*oldQty)+(req.body.price*quantity)/(newQty)) //Calculating avg price in case of buying
        }else{
            newQty = oldQty-quantity;
            //Validation: Throws error in case of unexpected quantity of share.
            if(newQty<0){
                throw new Error('Quantity of the share you want to sell is more than you have');
            }
        }
        //Trade object to push it into the given security
        const trade = {
            "tradeType":req.params.type,
            "quantity": quantity,
            "price": req.body.price
        }
        //Updating
        const updatedData = await Security.updateOne({"ticker":req.params.name.toUpperCase()}, {$set:{"price": avgPrice, "quantity": newQty}, $push:{"trades": trade}})
        res.json(updatedData)
    }catch (e){
        res.json({message: e.message})
    }
})


export default router