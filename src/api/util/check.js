// var _=require('lodash');
var Joi = require('joi');

var validateFunction = function  (content,schema,callback) {
  Joi.validate(content,schema,callback);
}

var validateBody = function (schema){
  return function(req,res,next){
    validateFunction(req.body , schema ,function(err,value){
      if(err){
        next(err);
      }else{
        req.body = value ;
        next();
      }
    })
  }
}

var validateQuery = function(schema){
  return function(req,res,next){
    validateFunction(req.query , schema ,function(err,value){
      if(err){
        next(err);
      }else{
        next();
      }
    })
  }
}

var validateParams = function(schema){
  return function(req,res,next){
    validateFunction(req.params , schema ,function(err,value){
      if(err){
        next(err);
      }else{
        next();
      }
    })
  }
}

module.exports = {
  validateBody : validateBody ,
  validateQuery : validateQuery,
  validateParams : validateParams
}