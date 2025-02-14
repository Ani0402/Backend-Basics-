import constants from "../constansts.js";

const errorHandler = (err,req,res,next)=>{
  const statusCode=res.statusCode ? res.statusCode : 500;

  switch(statusCode){
    case constants.VALIDATION_ERROR:
        res.json({title:"Validation failed",message:err.message, stackTrace:err.stack});
        break;
    case constants.NOT_FOUND:
        res.json({title:"Not found",message:err.message, stackTrace:err.stack});
        break;
    case constants.UNAUTHORIZED:
        res.json({title:"Unauthorized",message:err.message, stackTrace:err.stack});
        break;
    case constants.FORBIDDEN:
        res.json({title:"Forbidden",message:err.message, stackTrace:err.stack});  
        break;
    case constants.SERVER_ERROR:
        res.json({title:"SERVER ERROR",message:err.message, stackTrace:err.stack});      
        break;  
    default:
        break;     
  }
  next();
}

export default errorHandler;