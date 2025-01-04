const { CustomerRepository } = require("../database");
const { FormateData, GeneratePassword, GenerateSalt, GenerateSignature, ValidatePassword } = require('../utils');
const { APIError, BadRequestError } = require('../utils/app-errors')


// All Business logic will be here
class CustomerService {

    constructor(){
        this.repository = new CustomerRepository();
    }

    async SignIn(userInputs){

        const { email, password } = userInputs;
        
        try {
            
            const existingCustomer = await this.repository.FindCustomer({ email});

            if(existingCustomer){
            
                const validPassword = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);
                console.log({existingCustomer});
                
                
                if(validPassword){
                    const token = await GenerateSignature({ email: existingCustomer.email, id: existingCustomer.id, role: existingCustomer.role});
                    return FormateData({id: existingCustomer.id, token });
                } 
            }
    
            return FormateData(null);

        } catch (err) {
            throw new APIError('Data Not found', err)
        }

       
    }

    async SignUp(userInputs){
        
        const { email, password, phone, name, role } = userInputs;

        if (!role) role = 0
        
        try{
            // create salt
            let salt = await GenerateSalt();
            
            let userPassword = await GeneratePassword(password, salt);
            
            const existingCustomer = await this.repository.CreateCustomer({ email, password: userPassword, phone, name, role, salt});
            
            const token = await GenerateSignature({ email: email, _id: existingCustomer._id});

            return FormateData({id: existingCustomer._id, token });

        }catch(err){
            throw new APIError('Data Not found', err)
        }

    }

    async GetProfile(userInof){
        const { id } = userInof;

        try {
            const existingCustomer = await this.repository.FindCustomerById(id);
            return FormateData(existingCustomer);
            
        } catch (err) {
            throw new APIError('Data Not found', err)
        }
    }

}

module.exports = CustomerService;