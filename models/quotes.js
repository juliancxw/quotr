const mongoose = require('mongoose')

const quoteSchema = new mongoose.Schema({
    projectid: { type: String, required: true, max: 100 },
    address:{
        address1: {
            type: String, required: true
        },
        address2: {
            type: String
        },
        unit: {
            type: String
        },
        building: {
            type: String
        },
        country: {
            type: String, required: true
        },
        postal: {
            type: String, required: true
        }
    },
    prop_info:{
        prop_type: {
            type: String
        },
        sub_type: {
            type: String
        },
        total_floor_area: {
            type: String
        },
        ownership_status: {
            type: String
        },
    },
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
    forge_files: { type: String},
    created_at: { type: Date },
    updated_at: { type: Date },
})

const QuoteModel = mongoose.model('Quote', quoteSchema)

module.exports = {
    QuoteModel: QuoteModel
}
