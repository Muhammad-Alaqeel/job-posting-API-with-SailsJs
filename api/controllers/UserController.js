/**
 * UserController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const Joi = require("joi");

module.exports = {
  

  /**
   * `UserController.login()`
   */
  signup: async function (req, res) {
    try{
    
    const schema = Joi.object().keys({

      email: Joi.string().required().email(),
      password:Joi.string().min(4).required()

    });
    
   schema.validate(req.allParams());
const params=req.allParams();
const hashedPassword=await UtilService.hashPassword(params.password);

    const newUser= await User.create({email:params.email, password:hashedPassword});

    return res.ok(newUser);
    
  }
    catch(err){

      if(err.name==='validationError'){
      return res.badRequest({err});
    }
    return res.serverError(err);
  }},

  /**
   * `UserController.signup()`
   */
  login: async function (req, res) {
  
    try{
    
      const schema = Joi.object().keys({
  
        email: Joi.string().required().email(),
        password:Joi.string().min(4).required()
  
      });
      
     schema.validate(req.allParams());
  const {email,password}=req.allParams();
  
      const user= await User.findOne({email});
  if(!user){
    return res.notFound({err:"user not found"});
  }

    const comparepassword= await UtilService.comparePassword(password,user.password);
    if(!comparepassword){
      return res.badRequest({err:"unauthorized"});
    }
    const token =JWTService.isuser({user:user.id},'1 day');
      return res.ok(token);
      
    }
      catch(err){
  
        if(err.name==='validationError'){
        return res.badRequest({err});
      }
      return res.serverError(err);
    }


  }

};

