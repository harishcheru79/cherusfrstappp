const mongoose = require('mongoose');
const { result } = require('underscore');

mongoose.connect('mongodb://localhost/vidly')
  .then(() => console.log('connected to mongodb'))
  .catch((err) => console.error('Not connected to mongo db',err));

 
const movieSchema = new mongoose.Schema({
    id: Number,
    moviename: String,
    genre: String,
    platforms: [String]

});

const Movie = mongoose.model('movie',movieSchema);


async function createMovie() {

    const movie = new Movie({
        id: 3,
        moviename: 'orphan',
        genre: 'horror',
        platforms: ['prime']
    });
    const result = await movie.save();
    console.log(result);
}

createMovie();

async function getMovie() {
    const movies = await Movie
      .find()
      .sort({moviename: 1})
      .select({moviename: 1 , genre: 1});
    console.log(movies);
}

// getMovie();

async function updateMovie(id) {
   const result = await Movie.findByIdAndUpdate({_id:id} , {
    $set: {
        id: 3,
        platforms:['hbo']
       
        }
    }, {new: true});
    console.log(result);

}

// updateMovie('5f5891d8d2485441e8486562')

async function removeMovie(id) {
    const result = await Movie.deleteOne({_id:id});
    console.log(result);
} 

// removeMovie('5f5891d8d2485441e8486562')