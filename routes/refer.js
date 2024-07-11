const express = require("express");
const router = express.Router();

const { pushData } = require("../controllers/Refer");

router.post("/pushData", pushData);

module.exports = router;
