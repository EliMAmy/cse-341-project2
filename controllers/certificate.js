const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

// GET ALL
const getAll = async (req, res) => {
  //#swagger.tags=["Certificates"]
  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("certificates")
      .find();

    const certificates = await result.toArray();

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(certificates);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving certificates",
      error: error.message,
    });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  //#swagger.tags=["Certificates"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Invalid certificate ID");
    }

    const certificateId = new ObjectId(req.params.id);

    const result = await mongodb
      .getDatabase()
      .db()
      .collection("certificates")
      .findOne({ _id: certificateId });

    if (!result) {
      return res.status(404).json("Certificate not found");
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({
      message: "Error retrieving certificate",
      error: error.message,
    });
  }
};

const createCertificate = async (req, res) => {
  //#swagger.tags=["Certificates"]
  try {
    const certificate = {
      code: req.body.code,
      name: req.body.name,
      status: req.body.status,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("certificates") 
      .insertOne(certificate);

    if (response.acknowledged) {
      return res.status(201).json({
        message: "Certificate created successfully",
        id: response.insertedId,
      });
    }

    return res.status(500).json({
      message: "Failed to create certificate",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error creating certificate",
      error: error.message,
    });
  }
};

// UPDATE
const updateCertificate = async (req, res) => {
  //#swagger.tags=["Certificates"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Invalid certificate ID");
    }

    const certificateId = new ObjectId(req.params.id);

    const certificate = {
      code: req.body.code,
      name: req.body.name,
      status: req.body.status,
    };

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("certificates")
      .replaceOne({ _id: certificateId }, certificate);

    if (response.matchedCount === 0) {
      return res.status(404).json("Certificate not found");
    }

    if (response.modifiedCount > 0) {
      return res.status(204).send();
    }

    res.status(200).json("No changes made");
  } catch (error) {
    res.status(500).json({
      message: "Error updating certificate",
      error: error.message,
    });
  }
};

// DELETE
const deleteCertificate = async (req, res) => {
  //#swagger.tags=["Certificates"]
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json("Invalid certificate ID");
    }

    const certificateId = new ObjectId(req.params.id);

    const response = await mongodb
      .getDatabase()
      .db()
      .collection("courses")
      .deleteOne({ _id: certificateId });

    if (response.deletedCount === 0) {
      return res.status(404).json("Certificate not found");
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      message: "Error deleting certificate",
      error: error.message,
    });
  }
};

module.exports = {
  getAll,
  getSingle,createCertificate, updateCertificate, deleteCertificate
};