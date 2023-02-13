// import Model patient
const Patient = require("../models/patient");

// Menjadikan Class PatientController menjadi child dari Class Controller
class PatientController {
  // Fungsi index menampilakan semua data menggunakan model fungsi all()
  async index(req, res) {
    const patient = await Patient.all();

    if (patient) {
      const data = {
        message: "Get All Resources",
        data: patient,
      };

      return res.status(200).json(data);
    } else {
      const data = {
        message: "Data is Empty",
      };

      return res.status(200).json(data);
    }
  }

  // Fungsi store menambahkan data menggunakan model fungsi create()
  async store(req, res) {
    const { name, phone, address, status } = req.body;

    if (!name || !phone || !address || !status) {
      const data = {
        message: `All fields must be filled correctly`,
      };

      return res.status(442).json(data);
    }

    const value = {
      name: name,
      phone: phone,
      address: address,
      status: status,
    };

    const patient = await Patient.create(value);

    const data = {
      message: `Menambahkan patients ${patient}`,
      data: patient,
    };

    res.status(201).json(data);
  }

  // Fungsi show menggunakan model find untuk menampilkan satu data berdasarkan id
  async show(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      const data = {
        message: `Get Detail Resource`,
        data: patient,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Resource Not Found`,
      };
      res.status(404).json(data);
    }
  }

  // Fungsi update merngunakan model fungsi find() untuk mencari data berdasarkan id dan fungsi update() untuk mengubah data yg telah didapatkan
  async update(req, res) {
    const { id } = req.params;
    const patient = Patient.find(id);

    if (patient) {
      const patient = await Patient.update(id, req.body);
      const data = {
        message: `Resorce is update Successfully`,
        data: patient,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Resource not found`,
      };

      res.status(404).json(data);
    }
  }

  // Fungsi menggunakan model fungsi find() untuk mencari data berdasarkan id dan fungsi destroy() untuk menghapus data
  async destroy(req, res) {
    const { id } = req.params;
    const patient = await Patient.find(id);

    if (patient) {
      await Patient.delete(id);
      const data = {
        message: `Resource is delete successfully`,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Resource not found`,
      };

      res.status(404).json(data);
    }
  }

  // Fungsi index menampilakan satu data berdasarkan nama menggunakan model fungsi all()
  async search(req, res) {
    const { name } = req.params;
    const patient = await Patient.search(name);

    if (patient) {
      const data = {
        message: `Get searched resource`,
        data: patient,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Resource not found`,
      };

      res.status(404).json(data);
    }
  }

  // Fungsi positive menampilakan data pasien berdasarkan status positive
  async positive(req, res) {
    const patient = await Patient.findByStatus("positive");

    if (patient) {
      const data = {
        message: `Get positive source`,
        data: patient,
        total: patient.length,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Resource not found`,
      };

      res.status(200).json(data);
    }
  }

  // Fungsi recovered menampilakan data pasien berdasarkan status negative
  async recovered(req, res) {
    const patient = await Patient.findByStatus("negative");

    if (patient) {
      const data = {
        message: `Get recovered resource`,
        data: patient,
        total: patient.length,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Resource not found`,
      };

      res.status(200).json(data);
    }
  }

  // Fungsi dead menampilakan data pasien berdasarkan status dead
  async dead(req, res) {

    const patient = await Patient.findByStatus("dead");

    if (patient) {
      const data = {
        message: `Get dead resource`,
        data: patient,
        total: patient.length,
      };

      res.status(200).json(data);
    } else {
      const data = {
        message: `Resource not found`,
      };

      res.status(200).json(data);
    }
  }
}

// membuat object patientController
const object = new PatientController();

// export object patientController
module.exports = object;
