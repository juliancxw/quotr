const {ProjectModel} = require('../models/projects')
const {AuthenticateCreate} = require('../services/forge')
const {GetThumbnail} = require('../services/forge')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid')
const FORGE_CLIENT_ID = process.env.FORGE_CLIENT_ID;
const FORGE_CLIENT_SECRET = process.env.FORGE_CLIENT_SECRET;
let access_token = '';
const axios = require('axios');   
const querystring = require('querystring');
const scopes = 'data:read data:write data:create bucket:create bucket:read';
const timestampNow = moment().utc()
global.accessToken = ""

module.exports = {
    main: async (req, res) => {    
        
        // Retrieve projects from database
        let projects = []
        try {
            projects = await ProjectModel.find({ created_by: req.session.user }).sort({ created_at: -1 })
       
        } catch (err) {
            res.statusCode(500)
            return 'server error'
        }
        console.log("going to dashboard")
        console.log(req.session.user)
        res.render('dashboard/main', {
            projects: projects,
            user: req.session.user
        })
    }
}


