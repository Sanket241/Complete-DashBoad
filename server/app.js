require('dotenv').config()
const express = require('express')
const app = express()
require('./db/conn')
const router = require('./routes/router')
const cors = require('cors')
const cookiparser = require('cookie-parser');
// const connectDb = require('./db/conn')
require('./db/conn')
const port = process.env.PORT || 5000


app.use(cors());
app.use(express.json())
app.use(cookiparser());
app.use(router)


const start = async() => {
    try {
        // await connectDb(process.env.URL)
        app.listen(port, () => {
            console.log(`port is ready ${port}`)
        })
    } catch (error) {
        console.log(error)
    }
}
start()