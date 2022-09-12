import axios from "axios";


// ADD THIS
let path_base = 'http://localhost:5000/api/v1/'
//let path_base = 'http://guarded-savannah-47368.herokuapp.com/api/v1/'

class MovieDataService {

    // class will contain functions which make the api calls and return the info from the api calls
    getAll(page = 0) { // default page 0
        return axios.get(path_base + `movies?page=${page}`)
    }

    get(id) {
        return axios.get(path_base + `movies/id/${id}`)
    }

    // query consist of the actual search title, or ratings e.g. rated=G
    find(query, by = "title", page = 0) {
        return axios.get(path_base + `movies?${by}=${query}&page=${page}`)
    }

    createReview(data) {
        return axios.post(path_base + "movies/review", data)
    }
    updateReview(data) {
        return axios.put(path_base + "movies/review", data)
    }
    deleteReview(id, userId) {
        return axios.delete(path_base + `movies/review`, { data: { review_id: id, user_id: userId } })
    }
    getRatings() {
        return axios.get(path_base + "movies/ratings")
    }
}

export default new MovieDataService()