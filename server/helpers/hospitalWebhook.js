const { hospitalApi } = require("../3rdApi");
const { Hospital } = require("../models");

function hospitalWebhook(req, res) {
  hospitalApi({
    method: "GET",
    url: "/api/id/covid19/hospitals"
  })
    .then(async ({ data }) => {
      await Hospital.destroy({
        where: {},
        truncate: true
      });
      await Hospital.bulkCreate(data);

      res.status(200).json({
        code: 200,
        success: true,
        message: "success"
      });
    })
    .catch(error => {
      res.status(500).json({
        code: 500,
        success: false,
        message: error?.message
      });
    })
}

module.exports = {
  hospitalWebhook
}