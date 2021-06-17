require('dotenv').config()
const mongoose = require('mongoose')
const { ProjectModel } = require('./models/projects')

const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/${process.env.DB_NAME}`

let data =[
    {
        owner_first_name: "John",
        owner_last_name: "Doe",
        owner_email: "blablabla@gmail.com",
        owner_contact: "+65 97865124",
        address:
            {
                address1: "123 Sesame Street",
                unit: "#11-11",
                country: "Singapore",
                postal: "123456"
            }
        ,
        boq:[
            {
                order:1,
                area:"house",
                work_category: "Carpentry",
                work_description: "Do this and that",
                work_unit:"sqm",
                work_rate:100,
                work_quantity:20,
                work_amount:2000,
            },
            {
                order:2,
                area:"room",
                work_category: "Glass",
                work_description: "Do this and that",
                work_unit:"sqm",
                work_rate:100,
                work_quantity:20,
                work_amount:2000,
            },
            {
                order:3,
                area:"toilet",
                work_category: "Carpentry",
                work_description: "Do this and that",
                work_unit:"sqm",
                work_rate:100,
                work_quantity:20,
                work_amount:2000,
            }
        ],
        project_total: 2000,
        created_by: "60bc3c079e0595a63ca13593",
    },
    {
        owner_first_name: "Mary",
        owner_last_name: "Doe",
        owner_email: "blablablsa@gmail.com",
        owner_contact: "+65 97865124",
        address:
            {
                address1: "123 Sesame Street",
                unit: "#11-11",
                country: "Singapore",
                postal: "123456"
            }
        ,
        boq:[
            {
                order:1,
                area:"house",
                work_category: "Carpentry",
                work_description: "Do this and that",
                work_unit:"sqm",
                work_rate:100,
                work_quantity:20,
                work_amount:2000,
            },
            {
                order:2,
                area:"room",
                work_category: "Glass",
                work_description: "Do this and that",
                work_unit:"sqm",
                work_rate:100,
                work_quantity:20,
                work_amount:2000,
            },
            {
                order:3,
                area:"toilet",
                work_category: "Carpentry",
                work_description: "Do this and that",
                work_unit:"sqm",
                work_rate:100,
                work_quantity:20,
                work_amount:2000,
            }
        ],
        project_total: 2000,
        created_by: "60bc3c079e0595a63ca13593",
    },
    {
        owner_first_name: "John",
        owner_last_name: "Doe",
        owner_email: "blablabla@gmail.com",
        owner_contact: "+65 97865124",
        address:
            {
                address1: "123 Sesame Street",
                unit: "#11-11",
                country: "Singapore",
                postal: "123456"
            }
        ,
        boq:[
            {
                order:1,
                area:"house",
                work_category: "Carpentry",
                work_description: "Do this and that",
                work_unit:"sqm",
                work_rate:100,
                work_quantity:20,
                work_amount:2000,
            },
            {
                order:2,
                area:"room",
                work_category: "Glass",
                work_description: "Do this and that",
                work_unit:"sqm",
                work_rate:100,
                work_quantity:20,
                work_amount:2000,
            },
            {
                order:3,
                area:"toilet",
                work_category: "Carpentry",
                work_description: "Do this and that",
                work_unit:"sqm",
                work_rate:100,
                work_quantity:20,
                work_amount:2000,
            }
        ],
        project_total: 2000,
        created_by: "60bc3c079e0595a63ca13593",
    }
]


mongoose.connect( mongoURI, { useNewUrlParser: true, useUnifiedTopology: true } )
.then(connResp => {
  connection = connResp
  return ProjectModel.insertMany(data)
})
.then(insertResp => {
    console.log('successful data insertion')
})
.catch(err => {
  console.log(err)
})
.finally(() => {
    if (connection !== null) {
        connection.disconnect()
    }
})