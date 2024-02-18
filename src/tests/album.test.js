require("../models")

const request = require("supertest")
const app = require("../app")
const Artist = require("../models/Artist")

const BASE_URL = "/albums"

let artist
let album
let albumId

beforeAll(async () => {
    artist = await Artist.create({
        name: "Yasunori Mitsuda",
        country: "Japon",
        formationYear:1995,
        image:"lorem"
    })

   album ={
        name:"Chrono Cross",
        image:"lorem3",
        releaseYear:1995,
        artistId: artist.id
    }
    
})

test("POST -> 'BASE_URL', should return status 201, res.body.ToBeDefined and res.body.name = album.name", async () => { 
    const res = await request(app)
    .post(BASE_URL)
    .send(album)
    albumId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(album.name)
})

test("GET -> 'BASE_URL', should return status 200, res.body, ToBeDefined and res.body.length = 1", async () => { 
    const res = await request(app)
    .get(BASE_URL)
    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body).toHaveLength(1)

    expect(res.body[0].artist).toBeDefined()
    expect(res.body[0].artist.id).toBe(artist.id)
})
test("GET -> 'BASE_URL/:id', should return status 200, res.body, ToBeDefined and res.body.length = 1", async () => { 
    const res = await request(app)
    .get(`${BASE_URL}/${albumId}`)
    

    
    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe(album.name)
})

test("PUT -> 'BASE_URL/:id', should return status 200, res.body, toBeDefined and res.body.name = 'newName'", async() => {
    const res = await request(app)
    .put(`${BASE_URL}/${albumId}`)
    .send({name:"newName"})

    expect(res.status).toBe(200)
    expect(res.body).toBeDefined()
    expect(res.body.name).toBe("newName")

    
})
test("DELETE -> 'BASE_URL/:id', should return status 204", async () => {
    const res = await request(app)
    .delete(`${BASE_URL}/${albumId}`)

    expect(res.status).toBe(204)
    await artist.destroy()
  })