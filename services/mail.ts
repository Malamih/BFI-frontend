// app/actions/email.ts
"use server";

import { Html } from "next/document";
import * as nodemailer from "nodemailer";

interface SendEmailParams {
  fullname: string;
  email: string;
  subject?: string;
  message: string;
}

export async function sendEmail({
  fullname,
  email,
  subject,
  message,
}: SendEmailParams) {
  if (!fullname || !email || !message) {
    return { success: false, message: "Please fill in all required fields" };
  }

  const finalSubject =
    subject && subject.trim() !== "" ? subject : `Message from "${fullname}"`;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 465,
      secure: true,
      auth: {
        user: "contact@bfiiq.org",
        pass: "jdjiuwpchldxxlfd",
      },
    });

    await transporter.sendMail({
      from: `"${fullname}" <contact@bfiiq.org>`,
      to: "contact@bfiiq.org",
      replyTo: email,
      subject: finalSubject,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${fullname}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Subject:</b> ${finalSubject}</p>
        <p><b>Message:</b><br>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    return { success: true, message: "Email sent successfully" };
  } catch (error) {
    console.error("Email sending error:", error);
    return { success: false, message: "Failed to send email" };
  }
}

export async function useSendEmail(
  fullname: string,
  email: string,
  message: string
) {
  const transporter = nodemailer.createTransport({
    host: "mail.bfiiq.org", // خادم الإرسال SMTP
    port: 465, // المنفذ SMTP الآمن SSL
    secure: true,
    auth: {
      user: "contact@bfiiq.org", // استخدم متغير بيئة هنا لو أمكن
      pass: "jdjiuwpchldxxlfd", // كلمة السر للتطبيق، استخدم متغير بيئة
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
