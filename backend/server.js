import express from 'express'
import cors from 'cors'
import movies from './api/movies.route.js'
import categories from './api/categories.route.js'

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/movies", movies)
app.use("/api/v1/categories", categories)

app.use("*", (req, res) => {
    res.status(404).json({ error: "not found" })
})

export default app