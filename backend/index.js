import app from "./server.js"
import mongodb from "mongodb"
import dotenv from "dotenv"
import MoviesDAO from "./dao/moviesDAO.js"
import ReviewsDAO from "./dao/reviewsDAO.js"
import CategoryDAO from "./dao/categoriesDAO.js"

async function main() {
  dotenv.config()

  const client = new mongodb.MongoClient(process.env.MOVIEREVIEWS_DB_URI)
  const port = process.env.PORT || 8000

  try {
    //connect to the mongoDB Cluster
    await client.connect()

    //calling DAO
    await MoviesDAO.injectDB(client)
    await ReviewsDAO.injectDB(client)
    await CategoryDAO.injectDB(client)


    app.listen(port, () => {
      console.log("server is runing on port: " + port)
    })
  } catch (e) {
    console.log(e)
    process.exit(1)
  }
}
main().catch(console.error)
