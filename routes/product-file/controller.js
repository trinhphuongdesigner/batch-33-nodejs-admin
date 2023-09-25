let data = require('../../data/products.json');
const { sendErr, generationID, writeFileSync } = require('../../utils');

module.exports = {
  getAllProduct: (req, res, next) => {
    try {
      return res.sendStatus(200).json(data);
    } catch (error) {
      console.log('««««« error »»»»»', error);
      return res.status(400).json({ message: "Không thành công" });
    }
  },

  getDetailProduct: (req, res, next) => {
    try {
      const { id } = req.params;
  
      const detail = data.find((item) => item.id.toString() === id);
  
      if (!detail) {
        return res.status(404).json(
          {
            message: "Không tìm thấy",
          },
        );
      }
  
      return res.sendStatus(202).json(
        {
          message: "Lấy thông tin thành công",
          payload: detail,
        },
      );
    } catch (error) {
      console.log('««««« error »»»»»', error);
      return sendErr(res);
    }
  },

  createProduct: (req, res, next) => {
    try {
      const { name, price } = req.body;
  
      const newP = { id: generationID(), name, price };
  
      data = [...data, newP];
  
      writeFileSync("data/products.json", data);
  
      return res.sendStatus(202).json(
        {
          message: "Tạo sản phẩm thành công",
          payload: newP,
        },
      );
    } catch (error) {
      console.log('««««« error »»»»»', error);
      sendErr(res);
    }
  },

  putProduct: (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, price } = req.body;
  
      const updateData = {
        id: +id,
        name,
        price,
      };
  
      data = data.map((item) => {
        if (item.id === +id) {
          return updateData;
        }
  
        return item;
      })
  
      writeFileSync("data/products.json", data);
  
      return res.sendStatus(202).json(
        {
          message: "Cập nhật sản phẩm thành công",
          payload: updateData,
        },
      );
    } catch (error) {
      console.log('««««« error »»»»»', error);
      return sendErr(res);
    }
  },

  patchProduct: (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, price } = req.body;
      let updateData = {};
  
      data = data.map((item) => {
        if (item.id === +id) {
          updateData = {
            ...item,
            name: name || item.name,
            price: price || item.price,
          };
  
          console.log('««««« updateData »»»»»', updateData);
  
          return updateData;
        }
  
        return item;
      });
  
      writeFileSync("data/products.json", data);
  
      if (updateData) {
        return res.sendStatus(200).json(
          202,
          {
            message: "Cập nhật sản phẩm thành công",
            payload: updateData,
          },
        );
      }
  
      return sendErr(res);
    } catch (error) {
      console.log('««««« error »»»»»', error);
      return sendErr(res);
    }
  },

  deleteProduct: (req, res, next) => {
    try {
      const { id } = req.params;
  
      data = data.filter((item) => item.id !== +id)
  
      writeFileSync("data/products.json", data);
  
      return res.sendStatus(202).json(
        {
          message: "Xóa sản phẩm thành công",
        },
      );
    } catch (error) {
      console.log('««««« error »»»»»', error);
      return sendErr(res);
    };
  },
}