// import database
const db = require("../config/database");

// membuat class Patient
class Patient {
  // Fungsi all() mengambil semua data yang ada didalam database
  static async all() {
    // Promise berisi logic mengambil semua data dari database
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients";

      db.query(query, (err, results) => {
        resolve(results);
      });
    });
  }

  // Fungsi find() mengambil data yang berada dalam database berdasarkan id
  static async find(id) {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM patients WHERE id = ?";

      db.query(query, id, (err, results) => {
        const [patient] = results;
        resolve(patient);
      });
    });
  }

  // Fungsi create memasukkan data baru kedalam database
  static async create(data) {
    // Promise berisi logic memasukkan data dan mengembalikan id data dalam parameter id
    const id = await new Promise((resolve, reject) => {
      const query = `INSERT INTO patients SET ?`;

      db.query(query, data, (err, results) => {
        resolve(results.insertId);
      });
    });

    // Promise berisi logic menampilkan satu data berdasarkan id pada saat memasukan data
    const patient = await this.find(id);
    return patient;
  }

  // Fungsi update() mengubah satu data berdasarkan id
  static async update(id, data) {
    // Promise berisi logic mengubah data berdasarkan id
    await new Promise((resolve, reject) => {
      const query = "UPDATE patients SET ? WHERE id = ?";

      db.query(query, [data, id], (err, results) => {
        resolve(results);
      });
    });

    // Mengembalikan data berdasarkan id yang telah dimasukan
    const patient = await this.find(id);
    return patient;
  }

  // Fungsi delete() menghapus data berdasarkan id
  static async delete(id) {
    // Promise berisi logic menghapus data berdasarkan id
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM patients WHERE id = ?";

      db.query(query, id, (err, results) => {
        resolve(results);
      });
    });
  }

  // Fungsi search() menampilkan satu data berdasarkan nama
  static async search(name) {
    // Promise berisi logic menampilkan satu data berdasarkan nama
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM patients WHERE name = ?`;

      db.query(query, name, (err, results) => {
        resolve(results);
      });
    });
  }

  // Fungsi finByStatus() menampilkan data berdasarkan status pasien
  static async findByStatus(status) {
    return new Promise((resolve, reject) => {
      const query = `SELECT * FROM patients WHERE status = ?`;

      db.query(query, status, (err, results) => {
        resolve(results);
      });
    });
  }
}

// export class Patient
module.exports = Patient;
