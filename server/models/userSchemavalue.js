const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator')
const jwt = require('jsonwebtoken')
const secret = "sanketsharmasanketsharmagoodboii"


const userSchemas = new mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("not valid email")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    cpassword: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
})
// ------------------------ hash pasword------------------------------------------>>>>>>>>>>
// mere hisab se ye nice ek middle ware h
userSchemas.pre("save", async function (next) {
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12)
        this.cpassword = await bcrypt.hash(this.cpassword, 12)
    }
    
    next();
})


// -----------------------token generate--------------------------------
userSchemas.methods.generateAuthtoken = async function () {
    try {
        let token23 = jwt.sign({ _id: this._id }, secret, {
            expiresIn: "1d"
        })
        this.tokens = this.tokens.concat({ token: token23 })
        await this.save();
        return token23;
    } catch (e) {
        console.log(e)
        resp.status(422).json(e)
    }
}





const Product = new mongoose.model('users', userSchemas)
module.exports = Product;