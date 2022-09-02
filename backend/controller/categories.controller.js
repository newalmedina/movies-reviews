import CategoriesDAO from "../dao/categoriesDAO.js"


export default class CategoriesController {

    static async apiGetCategories(req, res, next) {
        try {
            const categories = await CategoriesDAO.get()
            res.json(categories)

        } catch (e) {
            res.status(500).json({ error: e.message })
        }


    }

    static async apiPostCategory(req, res, next) {
        try {
            const name = req.body.name
            const description = req.body.description

            const date = new Date()

            const CategoryResponse = await CategoriesDAO.store(
                name,
                description,
                date
            )
            console.log(CategoryResponse)
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })

        }
    }

    static async apiUpdateCategory(req, res, next) {
        try {
            const categoryId = req.body.category_id
            const name = req.body.name
            const description = req.body.description

            const date = new Date()

            const CategoryResponse = await CategoriesDAO.update(
                categoryId,
                name,
                description,
                date
            )

            var { error } = CategoryResponse

            if (error) {
                res.status.json({ error })
            }

            if (CategoryResponse.modifiedCount === 0) {
                throw new Error("unable to update category.")
            }
            console.log(CategoryResponse)
            res.json({ status: "success" })
        } catch (e) {
            res.status(500).json({ error: e.message })

        }
    }

    static async apiDeleteCategory(req, res, next) {
        try {
            const categoryId = req.body.category_id


            const CategoryResponse = await CategoriesDAO.delete(
                categoryId,
            )

            console.log(CategoryResponse)
            res.json({ status: CategoryResponse })
        } catch (e) {
            res.status(500).json({ error: e.message })

        }
    }


}