const mysql = require('mysql2');
const { DB_URL } = require('../../config');

// Set up the MySQL connection
const connection = mysql.createPool(DB_URL);

async function createTicket({ subject, description, customerId, executiveId = null }) {
  try {
    const query = `
      INSERT INTO tickets (subject, description, customer_id, executive_id)
      VALUES (?, ?, ?, ?)
    `;

    const [rows] = await connection.promise().query(query, [subject, description, customerId, executiveId]);

    return {
      ticketId: rows.insertId,
      subject,
      description,
      customerId,
      executiveId,
    };
  } catch (err) {
    console.error("Error creating ticket:", err);
    throw new Error("Unable to Create Ticket");
  }
}


async function getAllTickets() {
  try {
    const query = `
      SELECT t.id AS ticketId, t.subject, t.description, t.status, t.created_at, t.updated_at,
             c.name AS customerName, e.name AS executiveName
      FROM tickets t
      LEFT JOIN users c ON t.customer_id = c.id
      LEFT JOIN users e ON t.executive_id = e.id
    `;

    const [rows] = await connection.promise().query(query);

    return rows; // Returns an array of all tickets with details
  } catch (err) {
    console.error("Error fetching tickets:", err);
    throw new Error("Unable to Fetch Tickets");
  }
}


async function getTicketById(ticketId) {
  try {
    const query = `
      SELECT t.id AS ticketId, t.subject, t.description, t.status, t.created_at, t.updated_at,
             c.name AS customerName, e.name AS executiveName
      FROM tickets t
      LEFT JOIN users c ON t.customer_id = c.id
      LEFT JOIN users e ON t.executive_id = e.id
      WHERE t.id = ?
    `;

    const [rows] = await connection.promise().query(query, [ticketId]);

    if (rows.length === 0) {
      throw new Error("Ticket Not Found");
    }

    return rows[0]; // Returns the ticket details
  } catch (err) {
    console.error("Error fetching ticket:", err);
    throw new Error("Unable to Fetch Ticket");
  }
}

async function updateTicket(ticketId, { subject, description, status, executiveId }) {
  try {
    const query = `
      UPDATE tickets
      SET subject = ?, description = ?, status = ?, executive_id = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;

    const [result] = await connection.promise().query(query, [subject, description, status, executiveId, ticketId]);

    if (result.affectedRows === 0) {
      throw new Error("Ticket Not Found or No Changes Made");
    }

    return {
      ticketId,
      subject,
      description,
      status,
      executiveId,
    };
  } catch (err) {
    console.error("Error updating ticket:", err);
    throw new Error("Unable to Update Ticket");
  }
}

async function deleteTicket(ticketId) {
  try {
    const query = `
      DELETE FROM tickets
      WHERE id = ?
    `;

    const [result] = await connection.promise().query(query, [ticketId]);

    if (result.affectedRows === 0) {
      throw new Error("Ticket Not Found");
    }

    return { ticketId, message: "Ticket Deleted Successfully" };
  } catch (err) {
    console.error("Error deleting ticket:", err);
    throw new Error("Unable to Delete Ticket");
  }
}



module.exports = { createTicket, getAllTickets, getTicketById, updateTicket, deleteTicket };
