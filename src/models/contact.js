const mongoose = require("mongoose")
const { isEmail, isPhoneValid } = require('../utils/utils')
const validator = require("validator")

"name", "address", "phone", "email";
const contactSchema = mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true
        },
        middle: {
            type: String
        },
        last: {
            type: String
        }
    },
    address: {
        street: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zip: {
            type: String,
            required: true
        }
    },
    phone: [
        {
            number: {
                type: String,
                required: true,
                validate: [isPhoneValid, 'Please provide valid phone number']
            },
            type: {
                type: String,
                required: true,
                enum: ['home', 'work', 'mobile']
            }
        }
    ],
    email: {
        type: String,
        required: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("enter correct email");
            }
        },
    }
});

const Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;