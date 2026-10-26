import nodemailer from "nodemailer";

interface ContactEmail {
  name: string;
  email: string;
  message: string;
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}

export async function sendContactNotifications(contact: ContactEmail) {
  const user = process.env.SMTP_USER;
  const password = process.env.SMTP_PASSWORD;
  if (!user || !password) {
    throw new Error(
      "Email is not configured. Set SMTP_USER and SMTP_PASSWORD in .env.",
    );
  }

  const port = Number(process.env.SMTP_PORT || 587);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("SMTP_PORT must be a valid port number.");
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass: password },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 30_000,
  });
  const sender = process.env.SMTP_FROM || `Cafe Courtyard <${user}>`;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL || user;
  const safeName = escapeHtml(contact.name);
  const safeEmail = escapeHtml(contact.email);
  const safeMessage = escapeHtml(contact.message).replace(/\r?\n/g, "<br>");
  const siteUrl = (process.env.SITE_URL || "http://localhost:3000").replace(
    /\/+$/,
    "",
  );

  const results = await Promise.allSettled([
    transporter.sendMail({
      from: sender,
      to: adminEmail,
      replyTo: contact.email,
      subject: "New Cafe Courtyard contact submission",
      text: `A new contact form message was received.\n\nName: ${contact.name}\nEmail: ${contact.email}\n\nMessage:\n${contact.message}`,
      html: `<div style="max-width:600px;margin:24px auto;padding:32px;background:#f8f6f0;border-radius:16px;font-family:Georgia,serif;color:#2f4136"><p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#58745f">Cafe Courtyard</p><h1 style="font-size:26px">A new message has arrived</h1><p><strong>From:</strong> ${safeName}</p><p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p><div style="margin-top:24px;padding:20px;background:#fff;border-radius:12px;line-height:1.7">${safeMessage}</div><p style="margin-top:24px;font-size:13px;color:#68736a">Reply directly to this email to contact the sender.</p></div>`,
    }),
    transporter.sendMail({
      from: sender,
      to: contact.email,
      replyTo: adminEmail,
      subject: "Thank you for reaching out to Cafe Courtyard",
      text: `Hello ${contact.name},\n\nThank you for taking the time to write to Cafe Courtyard. We have received your message and a member of our team will get back to you soon.\n\nYour message:\n${contact.message}\n\nWarm regards,\nCafe Courtyard\n${siteUrl}`,
      html: `<div style="max-width:600px;margin:24px auto;padding:36px;background:#f8f6f0;border-radius:18px;font-family:Georgia,serif;color:#2f4136"><p style="font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#58745f">A note from the Courtyard</p><h1 style="font-size:30px;line-height:1.25">Thank you, ${safeName}.</h1><p style="font-size:17px;line-height:1.7">Your message has found its way to us. We’re grateful you reached out, and someone from our team will be in touch soon.</p><div style="margin:26px 0;padding:20px;background:#fff;border-left:3px solid #8b765e;border-radius:8px;line-height:1.7"><strong>Your message</strong><br><br>${safeMessage}</div><p style="font-size:16px;line-height:1.7">Until then, we hope you find a little time for good food and good conversation.</p><p style="margin-top:28px;color:#58745f">Warmly,<br><strong>The Cafe Courtyard Team</strong></p><a href="${escapeHtml(siteUrl)}" style="display:inline-block;margin-top:12px;padding:12px 20px;background:#365b47;border-radius:24px;color:#fff;text-decoration:none">Visit the Courtyard</a></div>`,
    }),
  ]);

  const failures = results.filter(
    (result): result is PromiseRejectedResult => result.status === "rejected",
  );
  if (failures.length > 0) {
    await transporter.close();
    throw new Error(
      `Contact message was saved, but ${failures.length === 2 ? "neither email" : "one email"} could be sent.`,
      { cause: failures.map((failure) => failure.reason) },
    );
  }
  await transporter.close();
}
