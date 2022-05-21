
const jwt = require('jsonwebtoken');
const SECRET="123123";
module.exports={



     isuser(payload, expiresIn){
        return jwt.sign(payload,SECRET,{
            expiresIn
        });
    },

     verify(token){
         return jwt.verify(token,SECRET);
     }
}