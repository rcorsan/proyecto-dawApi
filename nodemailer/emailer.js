const nodemailer = require('nodemailer');


const transport = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port:465,
        secure:true,
        auth: {
          user: "gamevictoryraquel@gmail.com",
          pass: "fjkdbbsktvqyuvsk"
    }
});

transport.verify().then(() =>{
    console.log('listo para enviar correo');
});



const sendMail = async(correo) =>{
    const transporter = createTrans();
    const info = await transporter.sendMail({
        from:"gamevictoryraquel@gmail.com>",
        to:correo,
        subject: "Bienvenida!",
        html: "<p>Bienvenido a el juego!</p>"
    });
    console.log("mensaje enviado: ", info.messageId);
    return
};



