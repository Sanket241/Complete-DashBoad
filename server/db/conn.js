
require('dotenv').config()
const mongoose = require('mongoose')
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.URL)
    console.log("Connect database")
    } catch (error) {
        console.log(error)
    }
}
connectDb()