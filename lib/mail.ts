import nodemailer from "nodemailer";
import { passwordResetTemplate } from "./templates/password-reset";
import handlebars from "handlebars/dist/handlebars";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function sendEmail({
  to,
  subject,
  body
}: {
  to: string;
  subject: string;
  body: string;
}) {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_EMAIL, //
      to: to, 
      subject: subject, 
      html: body, 
    });
  } catch (error) {
    console.log(error);
  }
}

export function complitePasswordResetTemplate(name: string, resetLink: string) {
  const template = handlebars.compile(passwordResetTemplate);
  const htmlBody = template({
    name: name,
    resetLink: resetLink,
  });
  return htmlBody;
}
