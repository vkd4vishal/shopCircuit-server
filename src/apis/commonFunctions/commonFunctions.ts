import nodemailer from "nodemailer";

export const sendEmail = async (
  email: string,
  subject: string,
  text: string
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.MAIL_SERVICE ?? "demo",
      port: Number(process.env.MAIL_PORT),
      secure: true,
      name: process.env.MAIL_NAME ?? "demo",
      host: process.env.MAIL_HOST ?? "demo",
      auth: {
        user: process.env.MAIL_USER ?? "demo",
        pass: process.env.MAIL_PASSWORD ?? "demo",
      },
    });
    console.log({
      from: process.env.MAIL_USER,
      to: email,
      subject,
      text,
    })
    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject,
      text,
    });
  } catch (error) {
    console.log(error, "email not sent");
  }
};
