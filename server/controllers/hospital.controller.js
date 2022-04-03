const { Hospital } = require('../models');
const { hospitalWebhook } = require('../helpers/hospitalWebhook');
const { Op } = require("sequelize");

class HospitalController {
  static async updateListHospitals(req, res) {
    await hospitalWebhook(req, res);
  }

  static async detailHospital(req, res) {
    const { hospitalId } = req.params;
    const filter = {
      where: {
        id: hospitalId
      }
    };

    try {
      const hospital = await Hospital.findOne(filter);

      if (!hospital) {
        throw new Error('Hospital not found');
      } else {
        res.status(200).json({
          code: 200,
          success: true,
          data: { hospital }
        });
      }
    } catch (error) {
      res.status(500).json({
        code: 500,
        success: false,
        message: error?.message
      });
    }
  }

  static async listHospital(req, res) {
    const { pageSize, sort } = req.query;
    const page = req.query.page ? +req.query.page : 1;
    const limit = pageSize ? +pageSize : 10;
    const sortObj = sort ? JSON.parse(sort)[0] : "";
    const sortKey = sortObj ? Object.keys(sortObj)[0] : "";
    const sortVal = sortKey ? JSON.parse(sort)[0][sortKey].toUpperCase() : "";

    let totalRows = 0;
    let options = {
      attributes: ["id", "name", "address", "phone", "region", "province"],
      limit,
      "order": sortKey && sortVal ? [[sortKey, sortVal]] : [],
      "offset": page === 1 ? 0 : (page - 1) * limit,
    };

    try {
      const allData = await Hospital.findAll();
      totalRows = allData.length;
    } catch (err) {
      res.status(500).json({
        code: 500,
        success: false,
        message: err.message
      });
    }

    Hospital.findAll(options)
      .then(data => {
        const totalPage = Math.ceil(totalRows / limit);
        const currentPage = page;
        const nextPage = getNextPage(currentPage, limit, totalRows);
        const prevPage = getPreviousPage(currentPage);

        if (data.length) {
          res.status(200).json({
            success: true,
            code: 200,
            message: "success get list hospitals",
            totalRows,
            totalPage,
            prevPage,
            currentPage,
            nextPage,
            data: { hospitals: data }
          });
        } else {
          throw new Error('Hospital list not found');
        }
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).json({
          code: 500,
          success: false,
          message: err.message
        });
      })
  };

  static async searchHospital(req, res) {
    const { filter } = req.query;

    let totalRows = 0;
    let options = {
      where: {
        name: {
          [Op.like]: `%${filter}%`
        }
      },
      attributes: ["id", "name", "address", "phone", "region", "province"],
    };

    try {
      const allData = await Hospital.findAll(options);
      totalRows = allData.length;
    } catch (err) {
      res.status(500).json({
        code: 500,
        success: false,
        message: err.message
      });
    }

    Hospital.findAll(options)
      .then(data => {
        const totalPage = 1;
        const currentPage = 1;
        const nextPage = null;
        const prevPage = null;

        if (data.length) {
          res.status(200).json({
            success: true,
            code: 200,
            totalRows,
            totalPage,
            prevPage,
            currentPage,
            nextPage,
            message: "success search list hospitals",
            data: { hospitals: data }
          });
        } else {
          throw new Error('Hospital list not found');
        }
      })
      .catch(err => {
        console.log(err.message)
        res.status(500).json({
          code: 500,
          success: false,
          message: err.message
        });
      })
  }
}

const getNextPage = (page, limit, total) => {
  if ((total / limit) > page) {
    return page + 1;
  }

  return null
}

const getPreviousPage = (page) => {
  if (page <= 1) {
    return null
  }
  return page - 1;
}

module.exports = HospitalController;