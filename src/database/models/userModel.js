const mysql = require('mysql2');
const { DB_URL } = require('../../config');

// Set up the MySQL connection
const connection = mysql.createPool(DB_URL);
// const connection = require('../connection');

// const { databaseConnection } = require('../../database');
// const connection = databaseConnection.getConnection();

async function createCustomer({ email, password, phone, salt }) {
  try {
    const query = `
      INSERT INTO users (email, password, salt, phone)
      VALUES (?, ?, ?, ?)
    `;

    // Use query params to prevent SQL injection
    const [rows, fields] = await connection.promise().query(query, [email, password, salt, phone]);

    // Return the inserted customer details, including the customer ID
    return {
      customerId: rows.insertId,
      email,
      phone,
    };
  } catch (err) {
    console.error("Error creating customer:", err);
    throw new Error("Unable to Create Customer");
  }
}

async function findCustomerByEmail({ email }) {
  try {
    const query = `
      SELECT * FROM users WHERE email = ?
    `;

    // Use query params to prevent SQL injection
    const [rows, fields] = await connection.promise().query(query, [email]);

    // If no customer is found, return null
    if (rows.length === 0) {
      return null;
    }

    // Returning the first customer (assuming rows is an array of results)
    return rows[0];
  } catch (err) {
    console.error("Error finding customer:", err);
    throw new Error("Unable to Find Customer");
  }
}

async function findCustomerById({ id }) {
  try {
    const query = `
      SELECT * FROM users WHERE id = ?
    `;

    // Use query params to prevent SQL injection
    const [rows, fields] = await connection.promise().query(query, [id]);

    // If no customer is found, return null
    if (rows.length === 0) {
      return null;
    }

    // Returning the first customer (assuming rows is an array of results)
    return rows[0];
  } catch (err) {
    console.error("Error finding customer by ID:", err);
    throw new Error("Unable to Find Customer");
  }
}

module.exports = { createCustomer, findCustomerByEmail, findCustomerById };
