const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const postRoutes = require("./routes/post-routes") // new

dotenv.config()

mongoose
    .connect(process.env.MONGOOSE_DB_URI, { useNewUrlParser: true })
    .then(() => {
        const port = process.env.PORT
        const app = express()
        app.use(express.json())

        app.use("/api/v1/posts", postRoutes) // new

        app.use("*", (req, res) => {
            res.status(404).json({ error: "not found 404" })
        })

        app.listen(port, () => {
            console.log("Server has started!: " + port)
        })
        console.log("conectando a base de datos mediante mongoose")
    })