const request = require('supertest')
const app = require('../src/app')

describe('Testing /contacts', () => {

  let contactId = ''

  it('should returns all list of contacts from database', async () => {
    const res = await request(app)
      .get('/contacts')
    expect(res.status).toEqual(200)
  })

  it('should save contact in database', async () => {
    const res = await request(app)
      .post('/contacts')
      .send({
        "name": {
          "first": "Harold"
        },
        "address": {
          "street": "8360 High Autumn Row",
          "city": "Cannon",
          "state": "Indore",
          "zip": "452201"
        },
        "phone": [
          {
            "number": "302-611-9148",
            "type": "home"
          },
          {
            "number": "302-532-9427",
            "type": "mobile"
          }
        ],
        "email": "harold.gilkey@yahoo.com"
      })
    contactId = res.body._id
    expect(res.status).toEqual(201)
  })

  it('should returns specific contact from database', async () => {
    const res = await request(app)
      .get('/contacts/' + contactId)
    expect(res.status).toEqual(200)
  })

  it('should update contact in the database', async () => {
    const res = await request(app)
      .put('/contacts/' + contactId)
      .send({
        "name": {
          "first": "Harold"
        },
        "address": {
          "street": "8360 High Autumn Row"
        }
      })
    expect(res.status).toEqual(200)
  })

  it('should delete contact from the database', async () => {
    const res = await request(app)
      .delete('/contacts/' + contactId)
    expect(res.status).toEqual(200)
  })

})
