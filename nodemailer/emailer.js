const nodemailer = require('nodemailer');

const createTrans = () =>{
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "30becbfc61fc54",
          pass: "33a68c740e32d5"
        }
      });
    return transport;
};

const sendMail = async(correo) =>{
    const transporter = createTrans();
    const info = await transporter.sendMail({
        from: '"ejemplo" <prueba@ejemplo.com',
        to: correo,
        subject: "Bienvenida!",
        html: "<p>Bienvenido a el juego!</p>"
    });
    console.log("mensaje enviado: ", info.messageId);
    return
};

exports.sendMail = () => sendMail();