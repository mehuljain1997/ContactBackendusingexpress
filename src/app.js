const express = require('express')
const mongoose = require('mongoose')
const contactRoute = require('./routes/contacts')

const app = express()

app.use(express.json())

app.use('/contacts', contactRoute)

app.use((err, req, res, next) => {
    console.error(err)
    const status = err.statusCode || 500
    const msg = err.message
    const data = err.data
    return res.status(status).json({
        msg,
        data
    })
})



let mongourl = 'mongodb://localhost:27017/contact-data'

mongoose.connect(mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        });
    })
    .catch((err) => console.log('err found',err.message))

module.exports = app
