
import axios from 'axios'
let base_url = 'http:localhost:5000/api/v1/'

class MovieDataService {
    getAll(page = 0) {
        return axios.get(base_url + `movies/?page=${page}`)
    }

    get(id) {
        return axios.get(base_url + `movies/id/${id}`)
    }

    find(query, by = "title", page = 0) {
        return axios.get(base_url + `movies?${by}=${query}&page=${page}`)
    }

    createReview(data) {
        return axios.post(base_url + `movies/review/`, data)
    }

    updateReview(data) {
        return axios.put(base_url + `movies/review/`, data)
    }

    deleteReview(id, userId) {
        return axios.put(base_url + `movies/review/`, {data:{review_id:id,user_id:userId}})
    }

    getRatings() {
        return axios.get(base_url + `movies/ratings`)
    }
}
export default MovieDataService