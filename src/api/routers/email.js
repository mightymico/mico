const express = require('express');
const router = express.Router();
const multer = require('multer');
const nodemailer = require('nodemailer');
const Joi = require('joi');
const {validateBody} =require('./../util/check');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'd2khadkatest@gmail.com',
    pass: ''
  }
});

router.post('/email',
  // validateBody({
  //     to: Joi.string().required(),
  // }),
  multer({}).array('file'),
  (req, res, next) => {
    const {to, cc, bcc, subject, text} =req.body;

    const attachments = req.files.map((file, index)=> {
      return {
        filename: file.originalname,
        content: file.buffer
      }
    })

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"dhiraj" <d2khadkatest@gmail.com>', // sender address
      to,
      cc,
      bcc,
      subject, // Subject line
      text: text, // plain text body
      attachments,
      // html: '<b>Hello world?</b>' // html body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send({success: false, error: error});
      }
      console.log('Message sent: %s', info.messageId);
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.send({success: true});
    })

  }
)


module.exports = router;