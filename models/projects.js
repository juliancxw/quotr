const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    owner_first_name: { type: String, required: true, max: 100 },
    owner_last_name: { type: String, required: true, max: 100 },
    owner_email: { type: String, required: true,  max: 100 },
    owner_contact: { type: String, required: true,  max: 100 },
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
    property_info:{
        type: {
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
    boq:[
        {
            order:{
                type: Number
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
                type: Number
            },
            work_quantity:{
                type: Number
            },
            work_amount:{
                type: Number
            },
        }
    ],
    project_category: {type: String},
    start_date: {type: Date},
    forge_files: { type: String},
    project_total: { type: Number},
    created_by: { type: String, required: true},
    status: { type: String},
    created_at: { type: Date },
    updated_at: { type: Date },
})

const ProjectModel = mongoose.model('Project', projectSchema)

module.exports = {
    ProjectModel: ProjectModel
}
