// app/actions/email.ts
"use server";

import { Html } from "next/document";
import * as nodemailer from "nodemailer";

export async function useSendEmail(
  fullname: string,
  email: string,
  message: string,
  phone?: string
) {
  const transporter = nodemailer.createTransport({
    host: "mail.bfiiq.org", // SMTP server
    port: 465, // SSL port
    secure: true,
    auth: {
      user: "contact@bfiiq.org", // استخدم متغير بيئة لو ممكن
      pass: "jdjiuwpchldxxlfd", // استخدم متغير بيئة لكلمة السر
    },
  });

  const finalSubject = `Message from "${fullname}"`;

  const mailOptions = {
    from: email,
    to: "contact@bfiiq.org",
    subject: finalSubject,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><b>Name:</b> ${fullname}</p>
      <p><b>Email:</b> ${email}</p>
      ${phone ? `<p><b>Phone:</b> ${phone}</p>` : ""}
      <p><b>Subject:</b> ${finalSubject}</p>
      <p><b>Message:</b><br>${message.replace(/\n/g, "<br>")}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Message sent successfully." };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send email." };
  }
}
