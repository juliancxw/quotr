const {ProjectModel} = require('../models/projects')
const {AuthenticateCreate} = require('../services/forge')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid')
const FORGE_CLIENT_ID = process.env.FORGE_CLIENT_ID;
const FORGE_CLIENT_SECRET = process.env.FORGE_CLIENT_SECRET;
let access_token = '';
const axios = require('axios');   
const querystring = require('querystring');
const scopes = 'data:read data:write data:create bucket:create bucket:read';
const timestampNow = moment().utc()

module.exports = {
       new: (req, res) => {
        res.render('project/new', {
        })
    },

    newProject: async (req, res) => {
        let projectId
        try {
            await ProjectModel.create({
                owner_first_name: req.body.owner_first_name,
                owner_last_name: req.body.owner_last_name,
                owner_email: req.body.owner_email,
                owner_contact: req.body.owner_contact,
                address: {
                    address1: req.body.address1,
                    address2: req.body.address1,
                    unit: req.body.unit,
                    building: req.body.building,
                    country: "singapore",
                    postal: req.body.postal,
                },
                property_info:{
                    type: req.body.type,
                    total_floor_area: req.body.gfa,
                },
                created_by: res.locals.user._id,
                created_at: timestampNow,
                updated_at: timestampNow,
            }, (err, doc) => {
                projectId = doc._id
                console.log(projectId)
                res.redirect('/project/upload?id=' + projectId)
            })
        } catch(err) {
            console.log(err)
            res.redirect('/project/new')
            return
        }
      
    },

    uploadForm: async (req, res) => {
        res.render('project/upload', {
        projectId: req.query.id
        })
    },

    uploadFiles: async (req, res) => {
        
        // Get token key for forge
        AuthenticateCreate()

        // Create bucket for project
        createForgeBucket(req)
    },
}


