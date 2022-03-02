// create a reference to the model
let Movie = require('../models/movie');

// Gets all movies from the Database and renders the page to list all movies.
module.exports.movieList = function(req, res, next) {  
    Movie.find((err, movieList) => {
        // console.log(movieList);
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('movie/list', {
                title: 'Movie List', 
                movies: movieList
            })            
        }
    }).sort({'Title': 1, '_id': 1});;
}

// Gets a movie by id and renders the details page.
module.exports.details = (req, res, next) => {
    
    let id = req.params.id;

    Movie.findById(id, (err, movieToShow) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('movie/details', {
                title: 'Movie Details', 
                movie: movieToShow
            })
        }
    });
}

// Renders the Add form using the add_edit.ejs template
module.exports.displayAddPage = (req, res, next) => {
    // Empty movie
    let emptyMovie = {
        _id: "",
        Title: "",
        Synopsis: "",
        Year: "",
        Director: "",
        Genre: ""
    }
    //Render to Add view with empty movie
    res.render('movie/add_edit', {title: 'Add a New Movie', movie: emptyMovie});
}

// Processes the data submitted from the Add form to create a new movie
module.exports.processAddPage = (req, res, next) => {
    //Create a new movie with data from the page
    let newMovie = {
        Title: req.body.Title,
        Synopsis: req.body.Synopsis,
        Year: req.body.Year,
        Director: req.body.Director,
        Genre: req.body.Genre
    }
    //Create the movie in the database
    Movie.create(newMovie, (err, movieCreated) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //Redirect to the movie list
            console.log(movieCreated);
            res.redirect('/movie/list');
        }

    });
}

// Gets a movie by id and renders the Edit form using the add_edit.ejs template
module.exports.displayEditPage = (req, res, next) => {
    //Get the movie id
    let movieId = req.params.id;
    //Find the movie by ID
    Movie.findById(movieId, (err, movieToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //Render to edit page with the movie to edit
            res.render('movie/add_edit', {title: 'Edit Movie', movie: movieToEdit});
        }

    }); 

}

// Processes the data submitted from the Edit form to update a movie
module.exports.processEditPage = (req, res, next) => {
    //Get the movie id to edit
    let movieId = req.params.id;
    //Update the information from the form page
    let movieToUpdate = {
        _id: movieId,
        Title: req.body.Title,
        Synopsis: req.body.Synopsis,
        Year: req.body.Year,
        Director: req.body.Director,
        Genre: req.body.Genre
    }
    //Update the movie in database
    Movie.updateOne({'_id': movieId}, movieToUpdate, (err, movieUpdated) => {
        if(err)
        {
            console.log(err);
            res.end(err);            
        }
        else
        {
            //Redirect to movie list
            console.log(movieUpdated);
            res.redirect('/movie/list');
        }
    });
    
    
}

// Deletes a movie based on its id.
module.exports.performDelete = (req, res, next) => {
    //get the movie id to delete
    let movieId = req.params.id;
    //Delete the movie from database using the id as a parameter 
    Movie.remove({'_id': movieId}, (err, confirmation) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //Redirect to the movie list
            console.log(confirmation);
            res.redirect('/movie/list');
        }

    });
    

}