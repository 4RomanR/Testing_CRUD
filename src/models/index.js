const Album = require("./Album");
const Artist = require("./Artist");
const Genre = require("./Genre");
const Song = require("./Song");

//table pivot: genreArtist 
Genre.belongsToMany(Artist, { through: 'genreArtist' })
Artist.belongsToMany(Genre, { through: 'genreArtist' })

//Album-> artistId
Album.belongsTo(Artist)
Artist.hasMany(Album)

//Song -> albumId
Song.belongsTo(Album) //albumId
Album.hasMany(Song)

//table pivot: songArtist
Song.belongsToMany(Artist, { through: 'songArtist' })
Artist.belongsToMany(Song, { through: 'songArtist' })

//table pivot: songGenre
Song.belongsToMany(Genre, { through: 'songGenre' })
Genre.belongsToMany(Song, { through: 'songGenre' })