import MoviesDAO from "../dao/moviesDAO.js"


export default class MoviesController {

    static async apiGetMovies(req, res, next) {
        const moviesPerPage = req.query.moviesPerPage ? parseInt(req.query.moviesPerPage) : 20
        const page = req.query.page ? parseInt(requ.query.page) : 0

        let filters = {}
        if (req.query.rated) {
            filters.rated = req.query.rated
        } else if (req.query.title) {
            filters.title = req.query.title
        }

        const { moviesList, totalNumMovies } = await MoviesDAO.getMovies({ filters, page, moviesPerPage })

        let response = {
            movies: moviesList,
            page: page,
            filters: filters,
            entries_per_page: moviesPerPage,
            total_results: totalNumMovies,
        }

        res.json(response)
    }

    static async apiGetMovieById(req, res, next) {
        try {
            let id = req.params.id || {}
            console.log("hola")
            let movie = await MoviesDAO.getMovieById(id)

            if (!movie) {
                res.status(404).json({ error: "not found" })
            }
            res.json(movie)
        } catch (e) {
            console.log(`apiGetMovieById: , ${e}`)
        }
    }

    static async apiGetRatings(req, res, next) {
        try {
            let propertyTypes = await MoviesDAO.getRatings()
            res.json(propertyTypes)
        } catch (e) {
            console.log(`apiGetRatings: , ${e}`)
        }
    }
}