require('../models')

const request = require("supertest")
const app = require("../app")

const genre = {
    name: "Rock"
}
const BASE_URL = '/genres'
let genreId
//POST
test("POST 'BASE_URL', should return status code 201, and res.body toBeDefined and res.body.name = newBody.name", async () => {
    const res = await request(app)
        .post(BASE_URL)
        .send(genre)
    genreId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})
//GET
test("Get -> 'BASE_URL', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
    const res = await request(app)
      .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
  })
//GETONE
test("GET -> 'BASE_URL', should return status code 200, and res.body toBeDefined and res.body.name = newBody.name", async () => {
    const res = await request(app)
        .get(`${BASE_URL}/${genreId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(genre.name)
})
test("PUT -> 'BASE_URL', should return status code 200, res.body toBeDefined,", async () => {
    const res = await request(app)
        .put(`${BASE_URL}/${genreId}`)
        .send({name:"Pop"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("Pop")
})

test("Delete -> 'BASE_URL', should return status code 204", async () => {
    const res = await request(app)
        .delete(`${BASE_URL}/${genreId}`)
        

    expect(res.status).toBe(204)

})