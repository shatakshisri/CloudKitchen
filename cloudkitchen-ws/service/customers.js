var customerModel = require('../model/customers');
const passwordUtils = require('../utilities/passwordUtils');

const customerService = {};

// service to connect to customer db model
customerService.testFunction = () => {
    return customerModel.testFunction().then((data) => {
        if (data) {
            return true;
        }
        else return false;
    })
}


customerService.register_user = (cust) => { 

    return passwordUtils.genPassword(cust.password).then((hashed_pass)=>{
        cust.password = hashed_pass
        return customerModel.register_user(cust).then((user)=>{
            if(user){
                return user
            }else{
                let err = new Error('Unable to register user.')
                err.status = 500
                throw err
            }
        })
    })

}


customerService.login_user = (contact,pass) =>{
    return customerModel.login_user(contact).then((cust)=>{
        if(cust){
            // matching password refer passwordUtils.js
            return passwordUtils.validPassword(pass, cust.password).then((matched)=>{
                if (matched){
                    // issuing token after successful login :: refer passwordUtils.js
                    const tokenObj = passwordUtils.issueJWT(cust)
                    return {success: true, user: cust, token: tokenObj.token, expiresIn: tokenObj.expires}
                }else{
                    err = new Error('Password Mismatched')
                    err.status = 404
                    throw err
                }
            })

        }else{
            err = new Error('Customer not found')
            err.status = 404
            throw err
        }
    })
}

module.exports = customerService;