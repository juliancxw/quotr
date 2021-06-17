const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    projectid: { type: String, required: true, max: 100 },
    quoted_by: { type: String, required: true, max: 100 },
    quote: [
        {
            order:{
                type: String
            },
            area:{
                type: String
            },
            work_category:{
                type: String
            },
            work_description:{
                type: String
            },
            work_unit:{
                type: String
            },
            work_rate:{
                type: String
            },
            work_quantity:{
                type: String
            },
            work_amount:{
                type: String
            },
        }
    ],
    status: { type: String, required: true },
    created_at: { type: Date },
    updated_at: { type: Date },
})

const QuoteModel = mongoose.model('Quote', quoteSchema)

module.exports = {
    QuoteModel: QuoteModel
}
