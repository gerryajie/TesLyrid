const { user, product } = require("../models");

const pagination = (page, size) => {
  const limit = size ? +size : 6;
  const offset = ((page - 1) * limit) | 0;

  return { limit, offset };
};

const paging = (data, page, limit) => {
  const { count: totalItems, rows: recipe } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, recipe, totalPages, currentPage };
};

class Product {
  async createProduct(req, res, next) {
    try {
      const { kode_produk, nama_produk, qty, image_produk } = req.body;

      const data = await product.create({
        kode_produk,
        nama_produk,
        qty,
        image_produk,
      });

      res.status(201).json({
        success: true,
        data: data,
        message: ["Create Product Success!!"],
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, errors: ["Internal Server Error"] });
    }
  }

  async getAllProduct(req, res, next) {
    try {
      const { page, size } = req.query;
      const { limit, offset } = pagination(page, size);

      const data = await product.findAndCountAll({
        attributes: {
          exclude: ["createdAt", "deletedAt", "updatedAt"],
        },

        order: [["createdAt", "DESC"]],
        limit,
        offset,
      });

      if (data == null) {
        return res
          .status(404)
          .json({ success: false, errors: ["Product not found"] });
      }

      res.status(200).json(paging(data, page, limit));
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, errors: ["Internal Server Error"] });
    }
  }

  async getDetailProduct(req, res, next) {
    try {
      const id = req.params;
      const data = await product.findOne({
        where: id,
        attributes: {
          exclude: ["createdAt", "deletedAt", "updatedAt"],
        },
      });

      if (data == null) {
        return res
          .status(404)
          .json({ success: false, errors: ["Product not found"] });
      }

      res.status(200).json({
        success: true,
        data: data,
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ success: false, errors: ["Internal Server Error"] });
    }
  }

  async updateProduct(req, res, next) {
    try {
      const id = req.params;

      const updatedData = await product.update(req.body, {
        where: id,
      });

      if (updatedData[0] === 0) {
        return res
          .status(404)
          .json({ success: false, errors: ["Product not found"] });
      }

      const data = await product.findOne({
        where: id,
        attributes: {
          exclude: ["cretedAt", "updatedAt", "deletedAt"],
        },
      });

      res.status(201).json({
        success: true,
        message: ["Success update your Product"],
        data: data,
      });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, errors: ["Internal Server Error"] });
    }
  }

  async deleteProduct(req, res, next) {
    try {
      let data = await product.destroy({
        where: {
          id: req.params.id,
        },
      });

      if (!data) {
        return res
          .status(404)
          .json({ success: false, errors: ["Product not found"] });
      }

      res
        .status(201)
        .json({ success: true, message: ["Success delete your Product"] });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, errors: ["Internal Server Error"] });
    }
  }
}

module.exports = new Product();
