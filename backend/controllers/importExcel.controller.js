const xlsx = require("xlsx");
const importExcelModel = require("../models/importExcel");

// Handle Excel Import
exports.importExcel = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    // Read and parse Excel
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

    // Insert into MongoDB
    await importExcelModel.insertMany(sheetData);

    res.json({ msg: "Data Imported Successfully", total: sheetData.length });
  } catch (err) {
    res.status(500).json({ msg: "Error importing data", error: err.message });
  }
};
