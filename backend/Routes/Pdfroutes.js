const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const {
  pdfUpload,
  getPdf,
  generateNewPdf,
} = require("../Controllers/Pdfcontrollers");
const { cookieValidation } = require("../Controllers/UserControllers");

router.post("/pdfupload", cookieValidation, upload.single("file"), pdfUpload);
router.get("/getpdf/:filename", cookieValidation, getPdf);
router.post("/generatepdf/:originalfile", cookieValidation, generateNewPdf);

module.exports = router;
