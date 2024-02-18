const catchError = require('../utils/catchError');
const Song = require('../models/Song');
const Album = require('../models/Album');
const Artist = require('../models/Artist');
const Genre = require('../models/Genre');

const getAll = catchError(async (req, res) => {
  const results = await Song.findAll({ include: [Album, Artist, Genre] });
  return res.json(results);
});

const create = catchError(async (req, res) => {
  const result = await Song.create(req.body);
  return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Song.findByPk(id, { include: [Album, Artist, Genre] });
  if (!result) return res.sendStatus(404);
  return res.json(result);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  await Song.destroy({ where: { id } });
  return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
  const { id } = req.params;
  const result = await Song.update(
    req.body,
    { where: { id }, returning: true }
  );
  if (result[0] === 0) return res.sendStatus(404);
  return res.json(result[1][0]);
});


const setArtist = catchError(async (req, res) => {
  //buscar cancion
  const { id } = req.params
  const song = await Song.findByPk(id)
  if (!song) return res.sendStatus(404)

  //setear los artistas a las canciones
  await song.setArtists(req.body)

  //leo los artistas que setee en las canciones
  const artists = await song.getArtists()

  return res.json(artists)

})

const setGenre = catchError(async (req, res) => {
  //buscar cancion
  const { id } = req.params
  const song = await Song.findByPk(id)
  if (!song) return res.sendStatus(404)

  //seteamos generos
  await song.setGenres(req.body)

  //leemos los generos
  const genres = await song.getGenres()

  return res.json(genres)

})

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
  setArtist,
  setGenre
}