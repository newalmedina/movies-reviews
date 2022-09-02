import mongodb from "mongodb"
const objectId = mongodb.ObjectId

let categories;

export default class CategoriesDAO {
    static async injectDB(conn) {
        if (categories) {
            return;
        }
        try {
            categories = await conn
                .db(process.env.MOVIEREVIEWS_NS)
                .collection("categories");
        } catch (e) {
            console.error(`unable to connect in CategoriesDAO: ${e}`);
        }
    }

    static async get() {
        let query
        let cursor
        let categoriesList
        try {
            cursor = await categories
                .find(query)

            const catregoriesList = await cursor.toArray()
            const totalNumMovies = await categories.countDocuments(query)

            return { catregoriesList, totalNumMovies }
        } catch (error) {
            console.error(`Unable to issue find command, ${error}`)
            return { categoriesList: [] }
        }
    }

    static async store(name, description, date) {

        try {
            const newCategory = {
                name: name,
                description: description,
                date: date,
            };
            console.log(newCategory)
            return await categories.insertOne(newCategory);
        } catch (e) {
            console.error(`Unable to insert category: ${e}`);
            return { error: e };
        }
    }

    static async update(categoryId, name, description, date) {
        try {
            const updateResponse = await categories.updateOne(
                { _id: objectId(categoryId) },
                { $set: { name: name, description: description, date: date } }
            )
            return updateResponse;
        } catch (e) {
            console.error(`Unable to update category: ${e}`);
            return { error: e };
        }
    }

    static async delete(categoryId) {
        try {
            const deleteResponse = await categories.deleteOne(
                { _id: objectId(categoryId) }
            )
            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete review: ${e}`);
            return { error: e };
        }
    }
}
