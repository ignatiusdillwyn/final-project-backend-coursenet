const { Product } = require("../models");
const { Op } = require("sequelize");

class ProductController {
    static async getAllProduct(req, res) {
        try {
            console.log('get all product')
            let userId = req.userData.id;
            const data = await Product.findAll({
                where: { UserId: userId }
            });
            res.status(201).json({
                message: "Product created successfully",
                data: data
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async createProduct(req, res) {
        try {
            console.log('create product ', req.body)
            let userId = req.userData.id;

            const data = await Product.create({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                qty: req.body.qty,
                UserId: userId,
                image: ""
            });
            res.status(201).json({
                message: "Product created successfully",
                data: data
            });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async getProductById(req, res) {
        try {
            let userId = req.userData.id;
            // const data = await Employee.findByPk(req.params.id);
            // if (!data) return res.status(404).json({ message: "Employee not found" });
            // res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async updateProduct(req, res) {
        try {
            let userId = req.userData.id;
            const data = await Product.findByPk(req.params.id);
            if (!data) return res.status(404).json({ message: "Product not found" });
            await data.update(req.body);
            res.json(data);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    static async deleteProduct(req, res) {
        try {
            let userId = req.userData.id;
            const data = await Product.findByPk(req.params.id);
            if (!data) return res.status(404).json({ message: "Product not found" });
            await data.destroy();
            res.json({ message: "Product deleted" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    static async searchProduct(req, res) {
        try {
            let userId = req.userData.id;
            const { name } = req.params;
            console.log('search product ', name)
            console.log('userId ', userId)
            const data = await Product.findAll({
                where: {
                    UserId: userId,
                    [Op.or]: [
                        { name: { [Op.iLike]: `%${name}%` } },
                        // { email: { [Op.iLike]: `%${name}%` } },
                    ],
                },
            });
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

module.exports = ProductController