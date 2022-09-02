import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId

let movies

export default class MoviesDAO {
    static async injectDB(conn) {
        if (movies) {
            return
        }
        try {
            movies = await conn.db(process.env.MOVIEREVIEWS_NS).collection("movies")
        } catch (e) {
            console.error(`unable to connect in MoviesDAO: ${e}`)
        }
    }

    static async getMovies({
        filters = null,
        page = 0,
        moviesPerPage = 20,
    } = {}) {
        let query
        if (filters) {
            if ("title" in filters) {
                query = { $text: { $search: filters["title"] } }
            } else if ("rated" in filters) {
                query = { rated: { $eq: filters["rated"] } }
            }
        }

        let cursor

        try {
            cursor = await movies
                .find(query)
                .limit(moviesPerPage)
                .skip(moviesPerPage * page)

            const moviesList = await cursor.toArray()
            const totalNumMovies = await movies.countDocuments(query)

            return { moviesList, totalNumMovies }
        } catch (error) {
            console.error(`Unable to issue find command, ${error}`)
            return { moviesList: [], totalNumMovies }
        }
    }

    static async getMovieById(id) {


        try {
            return await movies.aggregate([
                {
                    $match: {
                        _id: new ObjectId(id)
                    }
                },
                {
                    $lookup:
                    {
                        from: 'reviews',
                        localField: '_id',
                        foreignField: 'movie_id',
                        as: 'reviews'
                    }
                }
            ]).next()
        } catch (error) {
            console.error(`something went wrong in getMovieById, ${error}`)
            throw error
        }
    }

    static async getRatings() {
        let ratings = []

        try {
            ratings = await movies.distinct("rated")
            return ratings
        } catch (error) {
            console.error(`Unable to get ratings, ${error}`)
            return { moviesList: [], totalNumMovies }
        }
    }

}
