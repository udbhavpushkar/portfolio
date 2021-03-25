import express from "express"
import Security from "../models/security.js"

const router = express.Router()

router.get('/', async (req, res) => {
    res.send("Please enter trade name after /portfolio")
})

router.get('/:name',async (req, res) => {
    //res.send("Display all trades of the"+req.params.name)
    try{
        let ticker = req.params.name.toUpperCase()
        const allTrades = await Security.findOne({"ticker": ticker})
        res.json(allTrades)
    }catch (e) {
        res.json({message: e.message})
    }
})

router.patch('/:name/:type', async (req, res) => {
    //res.send(req.params.type+" trades of the "+req.params.name)
    /*const trade = {
        type: req.params.type,
        quantity: req.body.quantity,
        currentPrice: 100
    }*/
    try{
        const data = await Security.findOne({"ticker":req.params.name.toUpperCase()})
        let quantity = req.body.quantity
        let price = req.body.price;
        let oldQty = data.quantity===0 ? 1 : data.quantity
        let newQty;
        let avgPrice = data.price;
        if(req.params.type==="buy"){
            newQty = quantity+oldQty;
            avgPrice = ((data.price*oldQty)+(price*quantity)/(newQty))
        }else{
            newQty = oldQty-quantity;
            if(newQty<0){
                throw new Error('Quantity of the share you want to sell is more than you have');
            }
        }
        const trade = {
            "type":req.params.type,
            "quantity": quantity,
            "price": price
        }
        const updatedData = await Security.updateOne({"ticker":req.params.name.toUpperCase()}, {$set:{"price": avgPrice, "quantity": newQty}, $push:{"trades": trade}})
        res.json(updatedData)
    }catch (e){
        res.json({message: e.message})
    }
})




export default router