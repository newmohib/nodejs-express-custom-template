const { createCustomer, findCustomerByEmail } = require('../models/userModel'); // Import the function

const {
  APIError,
  BadRequestError,
  STATUS_CODES,
} = require("../../utils/app-errors");

//Dealing with data base operations
class CustomerRepository {
  async CreateCustomer({ email, password, phone, salt }) {
    try {
      // Call the createCustomer function from the model
      const customer = await createCustomer({ email, password, phone, salt });
      // You can add additional logic, like sending a confirmation email, etc.
      return customer;
    } catch (err) {
      console.error("Registration Error:", err);
      throw new Error("Unable to Register Customer");
    }
  }


  async FindCustomer({ email }) {
    try {
      // Call the findCustomerByEmail function from the model
      const customer = await findCustomerByEmail({ email });
      
      if (!customer) {
        throw new Error("Customer not found");
      }
      
      return customer;
    } catch (err) {
      console.error("Error getting customer:", err);
      throw new Error("Unable to Retrieve Customer");
    }
  }

  async FindCustomerById({ id }) {
    try {
      // Call the findCustomerById function from the model
      const customer = await findCustomerById({ id });
      
      if (!customer) {
        throw new Error("Customer not found");
      }
      
      return customer;
    } catch (err) {
      console.error("Error getting customer by ID:", err);
      throw new Error("Unable to Retrieve Customer");
    }
  }

}

module.exports = CustomerRepository;
