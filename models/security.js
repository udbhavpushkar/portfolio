import mongoose from "mongoose"

const securitySchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ticker: {
        type: String,
        required: true
    },
    price: {
        type: Number
    },
    quantity: {
        type: Number,
        min: 0,
        default: 0
    },
    trades: [{
        tradeType: {type: String, enum: ['buy', 'sell']},
        quantity: Number,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
})

export default mongoose.model('Security', securitySchema)