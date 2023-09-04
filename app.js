const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();




app.use(express.static(path.join(__dirname, '')));

app.use('/', express.static(path.join(__dirname,'/index.html')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('contact');

  
});

app.post('/send', (req, res) => {
  const output = `
        <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'gudipatiabhilashreddy@gmail.com', // generated ethereal user
        pass: 'abhilash877'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'gudipatiabhilashreddy@gmail.com', // sender address
      to: 'shelfenroll@equinordic.zendesk.com', // list of receivers
      subject: 'EquiNordic Website', // Subject line
      text: 'Hello world?', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contactus.html', {msg:'Email has been sent'});
  });
  });

app.listen(4000, () => console.log('Server started with port 4000...'));
