const fs = require('fs')

const express = require('express')
let server = express()

server.use(express.json())

let movies = JSON.parse(fs.readFileSync('../JSON/movies.json', 'utf-8'))


// ==================================================
//             Handling GET Request in API                         
// ==================================================

// server.get('/api/movies',(req, res) => {
//     res.status(200).json({
//         status: "success",
//         count: movies.length,
//         data: movies
//     })
// })



// ==================================================
//            Handling POST Request in API                         
// ==================================================

// server.post('/api/movies', (req, res) => {
//     // console.log(req.body)

//     if(req.body) {
//         let newID = movies.length + 1
//         let newMovie = Object.assign({id: newID}, req.body)
        
//         movies.push(newMovie)
        
//         fs.writeFile('../JSON/movies.json', JSON.stringify(movies), (err) => {
//             res.status(201).json({
//                 status: "success",
//                 message: "Movie added successfully",
//                 data: newMovie
//             })
//         })
//     } else {
//         return res.status(400).json({
//             status: "fail",
//             message: "404: Bad Request! Please send some data"
//         })
//     }
// })



// ==================================================
//          Handling Route Parameters in API                         
// ==================================================

// server.get('/api/movies/:id', (req, res) => {
//     // console.log(req.params);

//     let id = +req.params.id  //Changing to numeric
//     let movie = movies.find(movie => movie.id === id)
//     if(!movie) {
//         return res.status(404).json({
//             status: "fail",
//             message: `404: Movie with id: ${id} not found`
//         })
//     }
//     res.status(200).json({
//         status: "success",
//         data: movie
//     })
// })



// ==================================================
//          Handling PATCH Request in API                         
// ==================================================

// server.patch('/api/movies/:id', (req, res) => {
//     let id = +req.params.id
//     let movie = movies.find(movie => movie.id === id)
//     let index = movies.indexOf(movie)

//     if(!movie) {
//         return res.status(404).json({
//             status: "fail",
//             message: `404: Movie with id: ${id} not found`
//         })
//     } else if (req.body.id) {
//         return res.status(403).json({
//             status: "fail",
//             message: `403: Forbidden!! Cannot change the id of the movie`
//         })
//     } else {
//         Object.assign(movie, req.body)
//         movies[index] = movie

//         // console.log(movies);
        

//         fs.writeFile('../JSON/movies.json', JSON.stringify(movies), (err) => {
//             res.status(200).json ({
//                 status: "success",
//                 data: movie
//             })
//         })
//     }
// })




// ==================================================
//           Handlling DELETE Request in API                          
// ==================================================

// server.delete('/api/movies/:id', (req, res) => {
//     let id = +req.params.id
//     let movie = movies.find(movie => movie.id === id)
//     let index = movies.indexOf(movie)

//     if(!movie) {
//         res.status(404).json({
//             status: "fail",
//             message: `404: Movie with id: ${id} not found`
//         })
//     } else {
//         movies.splice(index, 1)

//         fs.writeFile('../JSON/movies.json', JSON.stringify(movies), (err) => {
//             res.status(204).json({
//                 status: "success",
//                 data: null
//             })
//         })
//     }
// })





// =======================================================================================================
//                                 Creating Route Handler Functions                         
// =======================================================================================================

const getAllMovies = (req, res) => {
    res.status(200).json({
        status: "success",
        count: movies.length,
        data: movies
    })
}

const getMovieByID = (req, res) => {
    // console.log(req.params);
    
    let id = +req.params.id  //Changing to numeric
    let movie = movies.find(movie => movie.id === id)
    if(!movie) {
        return res.status(404).json({
            status: "fail",
            message: `404: Movie with id: ${id} not found`
        })
    }
    res.status(200).json({
        status: "success",
        data: movie
    })
}

const AddMovie = (req, res) => {
    // console.log(req.body)
    
    if(req.body) {
        let newID = movies.length + 1
        let newMovie = Object.assign({id: newID}, req.body)
        
        movies.push(newMovie)
        
        fs.writeFile('../JSON/movies.json', JSON.stringify(movies), (err) => {
            res.status(201).json({
                status: "success",
                message: "Movie added successfully",
                data: newMovie
            })
        })
    } else {
        return res.status(400).json({
            status: "fail",
            message: "404: Bad Request! Please send some data"
        })
    }
}

const UpdateMovie = (req, res) => {
    let id = +req.params.id
    let movie = movies.find(movie => movie.id === id)
    let index = movies.indexOf(movie)
    
    if(!movie) {
        return res.status(404).json({
            status: "fail",
            message: `404: Movie with id: ${id} not found`
        })
    } else if (req.body.id) {
        return res.status(403).json({
            status: "fail",
            message: `403: Forbidden!! Cannot change the id of the movie`
        })
    } else {
        Object.assign(movie, req.body)
        movies[index] = movie

        
        fs.writeFile('../JSON/movies.json', JSON.stringify(movies), (err) => {
            res.status(200).json ({
                status: "success",
                data: movie
            })
        })
    }
}

const DeleteMovie = (req, res) => {
    let id = +req.params.id
    let movie = movies.find(movie => movie.id === id)
    let index = movies.indexOf(movie)
    
    if(!movie) {
        res.status(404).json({
            status: "fail",
            message: `404: Movie with id: ${id} not found`
        })
    } else {
        movies.splice(index, 1)
        
        fs.writeFile('../JSON/movies.json', JSON.stringify(movies), (err) => {
            res.status(204).json({
                status: "success",
                data: null
            })
        })
    }
}


// server.route('/api/movies')
//     .get(getAllMovies)
//     .post(AddMovie)

// server.route('/api/movies/:id')
//     .get(getMovieByID)
//     .patch(UpdateMovie)
//     .delete(DeleteMovie)


//           OR


const moviesRouter = express.Router()  //Middleware
server.use('/api/movies', moviesRouter)

moviesRouter.route('/')
    .get(getAllMovies)
    .post(AddMovie)

moviesRouter.route('/:id')
    .get(getMovieByID)
    .patch(UpdateMovie)
    .delete(DeleteMovie)

server.listen(8000, () => {
    console.log("Server started");
})