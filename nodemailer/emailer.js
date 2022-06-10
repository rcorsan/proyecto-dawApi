const nodemailer = require('nodemailer');

const createTrans = () =>{
    const transport = nodemailer.createTransport({
        service:'gmail',
        auth: {
          user: "gamevictoryraquel@gmail.com",
          pass: "fjkdbbsktvqyuvsk"
        }
      });
    return transport;
};

const sendMail = async(correo) =>{
    const transporter = createTrans();
    const info = await transporter.sendMail({
        from:'"ejemplo"<gamevictoryraquel@gmail.com>',
        to:correo,
        subject: "Bienvenida!",
        html: "<p>Bienvenido a el juego!</p>"
    });
    console.log("mensaje enviado: ", info.messageId);
    return
};

exports.sendMail = () => sendMail();