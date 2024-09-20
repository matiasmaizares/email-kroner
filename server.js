const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3000;

app.use(cors());

app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { to, subject, text } = req.body;

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Correo enviado: %s", info.messageId);
    res.status(200).send({ message: "Correo enviado con éxito" });
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    res.status(500).send({ message: "Error al enviar el correo" });
  }
});

app.listen(port, () => {
  console.log(
    `Servidor de envío de correos escuchando en http://localhost:${port}`
  );
});
