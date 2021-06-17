const {ProjectModel} = require('../models/projects')
const {AuthenticateCreate, AuthenticateViewer, CreateForgeBucket, TranslateFile, MakeThumbnail} = require('../services/forge')
const moment = require('moment')
const { v4: uuidv4 } = require('uuid')
const FORGE_CLIENT_ID = process.env.FORGE_CLIENT_ID;
const FORGE_CLIENT_SECRET = process.env.FORGE_CLIENT_SECRET;
let access_token = '';
const axios = require('axios');   
const querystring = require('querystring');
const scopes = 'data:read data:write data:create bucket:create bucket:read';
const timestampNow = moment().utc()
// const Busboy = require('busboy')
const fs = require('fs') ;
const path = require('path')


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
                    type: req.body.property_type,
                    total_floor_area: req.body.gfa,
                },
                project_category: req.body.project_category,
                start_date: req.body.project_start,
                created_by: res.locals.user._id,
                created_at: timestampNow,
                updated_at: timestampNow,
            }, (err, doc) => {
                    if (doc) {
                        projectId = doc._id
                        console.log(projectId)
                        res.redirect('/project/upload?id=' + projectId)
                    }
                    if (err) {
                        console.log(err)
                        res.redirect('/project/new')
                    }
                }
            )
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

        let projectId = req.query.id
        let fileType
        let urn
        
        // Get token key for forge
        let accessToken = await AuthenticateCreate()

        // Create bucket for project
        let bucketKey = await CreateForgeBucket(req.query.id, accessToken)

        // handle file upload
        // let busboy = new Busboy({ headers: req.headers })
        // busboy.on('file', function(fieldname, file, filename, encoding, mimetype){
        //     Axios({
        //         method: 'PUT',
        //         url: 'https://developer.api.autodesk.com/oss/v2/buckets/' + encodeURIComponent(bucketKey) + '/objects/' + encodeURIComponent(filename),
        //         headers: {
        //             Authorization: 'Bearer ' + accessToken,
        //             'Content-Disposition': filename,
        //             'Content-Length': file.length
        //         },
        //         data: file
        //     })
                
        // })
        // busboy.on('finish', function() {
        //     res.writeHead(200, { 'Connection': 'close' })
        //     res.end("That's all folks!")
        // })
        // return req.pipe(busboy);   

        await fs.readFile(req.file.path, function(err, filecontent) {
            fileType = path.extname(req.file.originalname)
            axios({
                method: 'PUT',
                url: 'https://developer.api.autodesk.com/oss/v2/buckets/' + encodeURIComponent(bucketKey) + '/objects/' + encodeURIComponent(req.file.originalname),
                headers: {
                    Authorization: 'Bearer ' + accessToken,
                    'Content-Disposition': req.file.originalname,
                    'Content-Length': filecontent.length
                },
                data: filecontent
            })
            .then(function (response) {
                // Success
                urn = response.data.objectId.toBase64()
                // save forge file urn to mongoDB
                ProjectModel.findByIdAndUpdate(projectId,{
                    "forge_files" : urn
                }, function(err, result){
                    if(err) {
                        console.log("unable to save urn to mongodb")
                        return
                    } else {
                        TranslateFile(accessToken, urn)
                        res.redirect('/project/quotr?id=' + projectId); 
                    }
                })
                
            })
            .catch(function (error) {
                // Failed
                // console.log(error);
                res.send('Failed to create a new object in the bucket');
            });  
             
        })
       
      
        
    },

    quotr: async (req, res) => {
        let projectId = req.query.id
        let project

        // Get token key for forge to view only
        let accessToken = await AuthenticateViewer()
        console.log(accessToken)
        try {
            project = await ProjectModel.findById(projectId)
            // console.log(project.boq)
            // console.log(accessToken)
            // console.log("forge" +project.forge_files)
            res.render('project/quotr', {
                boq: project.boq,
                accessToken: accessToken,
                urn: project.forge_files,
                projectId: projectId
            })
        } catch (err) {
            // res.statusCode(500)
            return 'server error'
       
        }
    },

    updateBOQ: async (req, res) => {
        let projectId = req.query.id
        let project
        let newBoq = req.body
        // newBoq= JSON.stringify(newBoq).slice(3,-6)
        // newBoq = JSON.parse(newBoq)
        console.log(newBoq)
        // Find project and update entire BOQ
        try {
            await ProjectModel.findByIdAndUpdate(projectId,{
                "boq" : newBoq
            })
            console.log("database updated")
        }
       catch (err){
            console.log(err)
            return
       }

    },

    delete: (req, res) => {
        console.log("deleting")
        ProjectModel.findByIdAndDelete(req.params.id)
            .then(deleteResp => {
                res.redirect('/dashboard')
            })
            .catch(err => {
                console.log(err)
                res.redirect('/dashboard')
            })
    },
}


