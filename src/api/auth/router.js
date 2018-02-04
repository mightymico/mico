const express = require('express');
const router = express.Router();
const Joi = require('joi');

const {validateBody} = require('../util/check');
const authUtil = require('./authUtil');

var debug = require('debug')('mico:auth');

// const qs = require('qs')
// const {google:{client_id, client_secret, redirect_uri}} = require('./../config');

const responseUtil = require('./../util/responseUtil');

const getToken = (req, res, next)=> {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(403).send({success: false, error: 'no authorization Header'});
  }
  const token = authHeader.split(' ')[1];
  authUtil.decode(token, (err, payload)=> {
    if (err) {
      // console.log('isError', err);
      return res.status(401).send(err);
    }
    authUtil.getUser({_id: payload.sub}, (err, user)=> {
      if (err) {
        // console.log('isError', err);
        return res.status(401).send(err);
      }
      req.user = user;
      req.authorization = payload;
      next();
    })
  });
};

const isAuthorized = (req, res, next)=> {
  if (!req.authorization) {
    res.status(403).send({success: false, error: 'no authorization token'})
  }
  if (req.authorization.type === 'login') {
    next()
  } else {
    res.status(403).send({success: false, error: 'no authorization token'})
  }
}

router.get('/me', getToken, isAuthorized, (req, res, next)=> {
  authUtil.getUser({_id:req.user._id}, (err, data) =>{
    res.send({success: true, user: req.user, team: data });
  })
  
});

router.post('/user', getToken, isAuthorized, (req, res, next)=> {
  const option = req.body;
  authUtil.getUser(option, responseUtil(res, {withData: true}));
})

router.post('/allUser', getToken, isAuthorized, (req, res, next)=> {
  const option = req.body;
  authUtil.getMultipleUser(option, responseUtil(res, {withData: true}));
})

/* GET home page. */
router.post('/signUp',
  validateBody({
    email: Joi.string().required(),
    password: Joi.string().required(),
    website: Joi.string().optional(),
    firstname: Joi.string().optional(),
    lastname: Joi.string().optional()
  }),
  (req, res) => {
    const {firstname, lastname, password, website, email}=req.body;
    authUtil.register({firstname, lastname, password, website, email}, responseUtil(res, {withData: true}))
  })

router.post('/login', (req, res, next)=> {
  const {email, password}=req.body;
  authUtil.login({email, password}, responseUtil(res, {withData: true}));
});

router.post('/updateUser',getToken,isAuthorized,(req,res,next)=>{
  const _id = req.user._id;
  const info = req.body;
  authUtil.updateUser(_id,info,responseUtil(res))
})

router.post('/passToken', (req, res, next)=> {
  const {email}=req.body;
  authUtil.getPChgToken(email, (err, token)=> {
    if (err) res.status(500).send(err);
    // console.log(token);
    res.send({success: true});
  })

});
router.post('/changePassword', getToken, (req, res, next)=> {
  const {password}=req.body;
  if (req.authorization.type == 'changePassword') {
    authUtil.changePassword(req.authorization, password, (err, result)=> {
      if (err) res.status(500).send(err);
      res.send({success: true});
    });
  } else {
    return res.status(401).send('wrong token');
  }
});

// router.post('/googleSignin', (req, res, next)=> {
//   const {id_token:{code}} = req.body;
//   debug('got code', code);
//   axios({
//     method: 'post',
//     url: 'https://www.googleapis.com/oauth2/v4/token',
//     headers: {
//       'Content-type': 'application/x-www-form-urlencoded'
//     },
//     data: qs.stringify({code, client_id, client_secret, redirect_uri, grant_type: 'authorization_code'})
//   }).then((response)=> {
//     console.log(response.body);
//   }).catch((error)=> {
//     console.log(error)
//   })
//   res.send('a');
//
// })

module.exports = router;
module.exports.getToken = getToken;
module.exports.isAuthorized = isAuthorized;
