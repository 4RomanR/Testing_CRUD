const request = require("supertest")
const app = require("../app")
const Album = require("../models/Album")
const Artist = require("../models/Artist")
const Genre = require("../models/Genre")
require("../models")

let song 
let album
let songId
const BASE_URL = "/songs"
beforeAll(async()=>{
    album = await Album.create({
        name:"XYZ ROCK",
        image:"https://miro.medium.com/v2/resize:fit:1200/1*Y50-Ut4Bry8xIaC5YRlbrA.jpeg",
        releaseYear:2010
    })
    song = {
        name:"Para Elisa",
        albumId:album.id
    }
})



test("POST -> 'BASE_URL', should return status 201, toBeDefined, res.body.name = song.name", async () => {
    const res = await request(app)
    .post(BASE_URL)
    .send(song)
    songId= res.body.id
    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(song.name)
})

test("GET -> 'BASE_URL', should return status 200, toBeDefined, res.body.length", async () => {
    const res = await request(app)
    .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    expect(res.body[0].artists).toBeDefined()
    expect(res.body[0].artists).toHaveLength(0)
    expect(res.body[0].genres).toBeDefined()
    expect(res.body[0].genres).toHaveLength(0)
})

test("GET -> 'BASE_URL/:id',  should return status code 200, and res.body toBeDefined and res.body.name = newBody.name", async () => {
    const res = await request(app)
    .get(`${BASE_URL}/${songId}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(song.name)
})



test("PUT -> 'BASE_URL', should return status code 200, res.body toBeDefined,", async () => {
    const res = await request(app)
    .put(`${BASE_URL}/${songId}`)
    .send({name:"ABCD"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("ABCD")
})
test("POST -> 'BASE_URL/:id/artists', should return status 200, res.body toBeDefined and res.body.length = 1", async () => {
    const result = await Artist.create({
        name: "The Beattles",
        country: "England",
        formationYear: 1966,
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuViPHZsis4_A-LlKe_OkB7Np5_DV85gsVmStxVgM&usqp=CAE&s"
      })
    
    const res = await request(app)
        .post(`${BASE_URL}/${songId}/artists`)
        .send([result.id])

    //console.log(res.body)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    await result.destroy()
  
})
test("POST -> 'BASE_URL/:id/genres', should return status 200, res.body toBeDefined and res.body.length = 1", async () => {
    const result = await Genre.create({name: "Balada" })
    
    const res = await request(app)
    .post(`${BASE_URL}/${songId}/genres`)
    .send([result.id])
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)
    await result.destroy()

})
test("DELETE -> 'BASE_URL', should return status 204", async () => {
    const res = await request(app)
    .delete(`${BASE_URL}/${songId}`)
    
    expect(res.status).toBe(204)
    await album.destroy()
})