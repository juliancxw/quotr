# QUOTR APP


https://dsgnquotr.herokuapp.com/

## Overview

An app that allows designers to easily create a Schedule of Works (SOW) while referencing design plans and models in the same place. The SOW can then be sent to contractors who can provide quotes based on the SOW and drawings upoaded.

## Main Tech and Dependencies

* Autodesk Forge View and Model Derrivative

... Used to translate uploaded pdf plans or 3D models into a format compatible with 3D viewer
* Tabulator

... Used to create a dynamic table to input Schedule of Works
* Express
* MongoDB
* Mongoose
* Multer

... Used to handle file upload
* EJS
* Axios
* Bcrypt
* DotEnv
* Method Overide
* Moment
* Express Session
* Express Flash Message


## Thing to work on

* Site Styling
* Form Validation
* Use busboy to stream uploads instead
* Call back to check status of File translation before loading viewer
* Enable Designers to receive and accept quotes from Contractors
* Edit profile