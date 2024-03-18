const fs = require("fs");
const path = require("path");
const { PDFDocument } = require("pdf-lib");

const pdfUpload = async (req, res, next) => {
  const file = req.file;
  const filepath = path.join(__dirname, "uploads", file.originalname);
  const uploadFolderPath = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadFolderPath)) {
    try {
      await fs.promises.mkdir(uploadFolderPath);
    } catch (error) {
      console.error(error);
      return res.json({ message: "cannot create folder" });
    }
  }
  try {
    await fs.promises.writeFile(filepath, file.buffer);
    return res.json({ nessage: "uploaded" });
  } catch (err) {
    console.log(err);
    return res.json({ nessage: "can not save" });
  }
};

const getPdf = async (req, res, next) => {
  const file_name = decodeURIComponent(req.params.filename);
  // console.log(file_name);
  const filepath = path.resolve(__dirname, "uploads", file_name);
  console.log("file path ", filepath);
  if (fs.existsSync(filepath)) {
    console.log("exists");
  } else {
    console.log("no");
  }
  console.log("file pathe : ", filepath);
  res.setHeader("Content-Type", "application/pdf");
  return res.sendFile(filepath);
};

const generateNewPdf = async (req, res, next) => {
  const { originalfile } = req.params;
  const { pagenumber } = req.body;
  console.log(pagenumber);
  const fullpath = path.join(__dirname, "uploads", originalfile);
  const uploadFolderPath = path.join(__dirname, "uploads", "NewPdfs");
  if (!fs.existsSync(uploadFolderPath)) {
    try {
      await fs.promises.mkdir(uploadFolderPath);
    } catch (error) {
      console.error(error);
      return res.json({ message: "cannot create folder" });
    }
  }
  try {
    const pdfchunk = await fs.promises.readFile(fullpath);
    const originalPdf = await PDFDocument.load(pdfchunk);
    const newPdf = await PDFDocument.create();
    for (const page of pagenumber) {
      const [copyPage] = await newPdf.copyPages(originalPdf, [page - 1]);
      newPdf.addPage(copyPage);
    }

    const newPDFBytes = await newPdf.save();
    const newpdfpath = path.join(
      __dirname,
      "uploads",
      "NewPdfs",
      `${Math.random().toString(36).substring(2, 7)}.pdf`
    );
    await fs.promises.writeFile(newpdfpath, newPDFBytes);
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=pdf.pdf");
    res.sendFile(newpdfpath, {}, async (err) => {
      if (err) {
        console.log("File not being send!");
      } else {
        await fs.promises.unlink(newpdfpath);
      }
    });
    // await fs.promises.unlink(newpdfpath)
  } catch (err) {
    console.log("Error : ", err);
    return res.json({ message: "Error..." });
  }
};

module.exports = {
  pdfUpload,
  getPdf,
  generateNewPdf,
};
