const FORGE_CLIENT_ID = process.env.FORGE_CLIENT_ID;
const FORGE_CLIENT_SECRET = process.env.FORGE_CLIENT_SECRET;
const axios = require('axios');   
const querystring = require('querystring');
const multer = require('multer');     
const upload = multer({ dest: 'tmp/' }); // Save file into local /tmp folder  
const fs = require('fs'); // Node.js File system for reading files
const Buffer = require('buffer').Buffer;
String.prototype.toBase64 = function () {
    return new Buffer(this).toString('base64')
}


module.exports = {
    // function to authenticate for users to upload and delete model
    AuthenticateCreate: async () => {
        const scopes = 'data:read data:write data:create bucket:create bucket:read';
        try {
            response = await axios({
                method: 'POST',
                url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                },
                data: querystring.stringify({
                    client_id: FORGE_CLIENT_ID,
                    client_secret: FORGE_CLIENT_SECRET,
                    grant_type: 'client_credentials',
                    scope: scopes
                })
            })
            // console.log(response.data)
            return response.data.access_token
        } catch(err) {
            console.log(err)
            await req.flash('error', 'Unable to connect to Forge')
            res.redirect('/users/dashboard')
            return
        }

        
        
    },

  // function to authenticate for users to view models only
  AuthenticateViewer: async () => {
        const scopes = 'viewables:read';
        try {
            response = await axios({
                method: 'POST',
                url: 'https://developer.api.autodesk.com/authentication/v1/authenticate',
                headers: {
                    'content-type': 'application/x-www-form-urlencoded',
                },
                data: querystring.stringify({
                    client_id: FORGE_CLIENT_ID,
                    client_secret: FORGE_CLIENT_SECRET,
                    grant_type: 'client_credentials',
                    scope: scopes
                })
            })
            return response.data.access_token
        } catch(err) {
            console.log(err)
            await req.flash('error', 'Unable to connect to Forge')
            res.redirect('/users/dashboard')
            return
        }
    }, 

    // function to create new bucket for every new project
    CreateForgeBucket: async (projectId, accessToken) => {
        const bucketKey = FORGE_CLIENT_ID.toLowerCase() + "_" + projectId; // Bucket key must be unique
        const policyKey = 'persistent'; 
        try {
            await axios({
                method: 'POST',
                url: 'https://developer.api.autodesk.com/oss/v2/buckets',
                headers: {
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + accessToken
                },
                data: JSON.stringify({
                    'bucketKey': bucketKey,
                    'policyKey': policyKey
                })
            })
            console.log("bucket created " + bucketKey)
            return bucketKey
        }
        catch(err) {
            if (err.response && err.response.status == 409) {
                console.log('Bucket already exists, skip creation.');
                return bucketKey
            }
            // console.log(err);
        }
    },

   

    // Translate uploaded file to model derivative for forge viewer
    TranslateFile: async (accessToken, urn) => {
        const format_type = 'svf';
        const format_views = ['2d', '3d'];
        try {
            let response = await axios({
                method: 'POST',
                url: 'https://developer.api.autodesk.com/modelderivative/v2/designdata/job',
                headers: {
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + accessToken
                },
                data: JSON.stringify({
                    'input': {
                        'urn': urn
                    },
                    'output': {
                        'formats': [
                            {
                                'type': format_type,
                                'views': format_views
                            }
                        ]
                    }
                })
            })
            return response
        }
        catch(err) {
            console.log("translation error " + err);
            return err
        }   
    },
    // MakeThumbnail: async (accessToken, urn) => {
    //     const format_type = 'thumbnail';
    //     const width = 200;
    //     const height = 200;
    //     try {
    //         let response = await axios({
    //             method: 'POST',
    //             url: 'https://developer.api.autodesk.com/modelderivative/v2/designdata/job',
    //             headers: {
    //                 'content-type': 'application/json',
    //                 Authorization: 'Bearer ' + accessToken
    //             },
    //             data: JSON.stringify({
    //                 'input': {
    //                     'urn': urn
    //                 },
    //                 'output': {
    //                     'formats': [
    //                         {
    //                             'type': format_type,
    //                             'advanced': {
    //                                 'width': width,
    //                                 'height': height
    //                             }
    //                         }
    //                     ]
    //                 }
    //             })
    //         })
    //         return response
    //     }
    //     catch(err) {
    //         console.log("translation error " + err);
    //         return err
    //     }   
    // },
    // GetThumbnail: async (accessToken, urn) => {
    //     const format_type = 'thumbnail';
    //     const width = 200;
    //     const height = 200;
    //     try {
    //         let response = await axios({
    //             method: 'GET',
    //             url: 'https://developer.api.autodesk.com/modelderivative/v2/designdata/' + urn + '/thumbnail',
    //             headers: {
    //                 Authorization: 'Bearer ' + accessToken
    //             }
    //         })
    //         return response
    //     }
    //     catch(err) {
    //         console.log("translation error " + err);
    //         return err
    //     }   
    // },
}