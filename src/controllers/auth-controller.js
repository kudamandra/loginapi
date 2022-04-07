const service = require("../services/auth-service");

module.exports = {
  login: function (req, res) {
    return service
      .checkAuth(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (error) {
        res.status(500).send(error);
      });
  },

  register: function (req, res) {
    return service
      .registerNewUser(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (error) {
        res.status(500).send(error);
      });
  },

  refresh: function (req, res) {
    return service
      .refreshToken(req.body)
      .then(function (data) {
        res.json(data);
      })
      .catch(function (error) {
        res.status(500).send(error);
      });
  },
};
