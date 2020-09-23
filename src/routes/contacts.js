const express = require('express')
const {
    getContact,
    getContacts,
    deleteContact,
    updateContact,
    saveContact
} = require('../controllers/contacts')

const router = express.Router()

router.get('/', getContacts)

router.get('/:id', getContact)

router.post('/', saveContact)

router.put('/:id', updateContact)

router.delete('/:id', deleteContact)

module.exports = router
