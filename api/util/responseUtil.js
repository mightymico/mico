var debug = require('debug')('bab:api');

const responseUtil = (res, opt)=>(err, r)=> {
  let option = opt != undefined ? opt : {};
  const errStatusCode = option.errStatusCode || 500;

  if (err) {
    debug(err);
    if (err instanceof Error) {
      err = err.message;
    }
    return res.status(errStatusCode).send({success: false, error: err})
  } else {
    const op = {success: true};
    if (option.withData) op.data = r;
    res.send(op);
  }
};


module.exports = responseUtil;