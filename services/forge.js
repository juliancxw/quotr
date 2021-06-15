const FORGE_CLIENT_ID = process.env.FORGE_CLIENT_ID;
const FORGE_CLIENT_SECRET = process.env.FORGE_CLIENT_SECRET;
let access_token = '';
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
            console.log(response.data)
        } catch(err) {
            console.log(err)
            await req.flash('error', 'Unable to connect to Forge')
            res.redirect('/users/dashboard')
            return
        }
        access_token = response.data.access_token
        
    },

  // function to authenticate for users to view models only
  AuthenticateCreate2: async () => {
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
        } catch(err) {
            console.log(err)
            await req.flash('error', 'Unable to connect to Forge')
            res.redirect('/users/dashboard')
            return
        }
        access_token = response.data.access_token
    }, 

    // function to create new bucket for every new project
    createForgeBucket: async (projectId) => {
        const bucketKey = FORGE_CLIENT_ID.toLowerCase() + "_" + projectId; // Bucket key must be unique
        const policyKey = 'persistent'; 
        try {
            await Axios({
                method: 'POST',
                url: 'https://developer.api.autodesk.com/oss/v2/buckets',
                headers: {
                    'content-type': 'application/json',
                    Authorization: 'Bearer ' + access_token
                },
                data: JSON.stringify({
                    'bucketKey': bucketKey,
                    'policyKey': policyKey
                })
            })
        }
        catch(err) {
            if (error.response && error.response.status == 409) {
                console.log('Bucket already exists, skip creation.');
                res.redirect('/api/forge/datamanagement/bucket/detail');
            }
            console.log(error);
            res.send('Failed to create a new bucket');
        }
    },

    uploadToForge: (req, res) => {
        fs.readFile(req.file.path, function (err, filecontent) {
            Axios({
                method: 'PUT',
                url: 'https://developer.api.autodesk.com/oss/v2/buckets/' + encodeURIComponent(bucketKey) + '/objects/' + encodeURIComponent(req.file.originalname),
                headers: {
                    Authorization: 'Bearer ' + access_token,
                    'Content-Disposition': req.file.originalname,
                    'Content-Length': filecontent.length
                },
                data: filecontent
            })
            .then(function (response) {
                // Success
                console.log(response);
                const urn = response.data.objectId.toBase64();
                res.redirect('/api/forge/modelderivative/' + urn);
            })
            .catch(function (error) {
                // Failed
                console.log(error);
                res.send('Failed to create a new object in the bucket');
            })
        })
    }

}