const mongoose = require('mongoose')
const Contact = require('../models/contact')
const { isEmpty } = require('../utils/utils')
const { contactErrors } = require('../utils/const')


exports.getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find({}, { __v: 0 })
        return res.status(200).json(contacts)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.getContact = async (req, res, next) => {
    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            })
        }
        return res.status(200).json(contact)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 404
        }
        err.message = 'Not found'
        next(err)
    }
}

exports.saveContact = async (req, res, next) => {
    try {
        const contact = new Contact(req.body)
        await contact.save()
        return res.status(201).json(contact)
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

exports.updateContact = async (req, res, next) => {
    try {
        let contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            })
        }
        contact = contact.toObject()
        if (req.body.name) {
            contact.name = { ...contact.name, ...req.body.name }
        }

        if (req.body.address) {
            contact.address = { ...contact.address, ...req.body.address }
        }

        if (req.body.phone) {
            contact.phone = { ...contact.phone, ...req.body.phone }
        }

        if (req.body.email) {
            contact.email = req.body.email
        }
        console.log(contact.address)
        contact = await Contact.findByIdAndUpdate(req.params.id, contact, { runValidators: true, new: true })
        console.log(contact)
        return res.status(200).json(contact)
    } 
    catch (err) {
        if (err instanceof mongoose.Error.ValidationError) {
            err.statusCode = 403
        } else if (!err.statusCode) {
            err.statusCode = 404
            err.message = 'Not found'
        }
        next(err)
    }
}

exports.deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id, { __v: 0 })
        if (!contact) {
            return res.status(404).json({
                message: 'Contact not found'
            })
        }
        return res.status(200).json({
            message: 'Contact Deleted Successfully'
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}
