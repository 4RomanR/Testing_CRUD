require('../models')

const request = require("supertest")
const app = require("../app")
const Genre = require('../models/Genre')

const BASE_URL = '/artists'

const artist = {
  name: "The Beattles",
  country: "England",
  formationYear: 1966,
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuViPHZsis4_A-LlKe_OkB7Np5_DV85gsVmStxVgM&usqp=CAE&s"
}

let artistId

test("Post ->'BASE_URL', should return 201, res.body to be defined and res.body.name = artist.name", async () => {
  const res = await request(app)
    .post(BASE_URL)
    .send(artist)

  artistId = res.body.id

  expect(res.statusCode).toBe(201)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(artist.name)
})

test("Get -> 'BASE_URL', should return status code 200, res.body to be defined and res.body.length = 1", async () => {
  const res = await request(app)
    .get(BASE_URL)


  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].genres).toBeDefined()
  expect(res.body[0].genres).toHaveLength(0)
  

})

test("Get -> 'BASE_URL/:id', should return status code 200, res.body to be defined and res.body.name= artist.name", async () => {
  const res = await request(app)
    .get(`${BASE_URL}/${artistId}`)

  // console.log(res);
  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe(artist.name)

})

test("PUT -> 'BASE_URL/:id', should return status code 200, res.body to be defined and res.body.name = 'Marylin mason'", async () => {

  const res = await request(app)
    .put(`${BASE_URL}/${artistId}`)
    .send({ name: 'Marylin mason' })

  expect(res.statusCode).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body.name).toBe('Marylin mason')
})

test("POST -> ''BASE_URL:id/genres', should return status 200, toBeDefined ", async () => {
  const genre = await Genre.create({
    name:"pop"
  })
  const res = await request(app)
  .post(`${BASE_URL}/${artistId}/genres`)
  .send([genre.id])
  
  expect(res.status).toBe(200)
  expect(res.body).toBeDefined()
  expect(res.body).toHaveLength(1)
  expect(res.body[0].id).toBe(genre.id)


  await genre.destroy()
})

test("Delete -> 'BASE_URL:id', should return status code 204", async () => {
  const res = await request(app)
    .delete(`${BASE_URL}/${artistId}`)

  expect(res.status).toBe(204)

  
})