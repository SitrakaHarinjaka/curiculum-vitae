import nodemailer from 'nodemailer';
import { env } from '../config/env';
import { logger } from '../utils/logger';

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: env.SMTP_PORT,
  secure: false,
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  },
});

export async function sendContactNotification(contact: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  try {
    await transporter.sendMail({
      from: `"Portfolio Contact" <${env.SMTP_USER}>`,
      to: 'sitrakaharinjaka@gmail.com',
      subject: `[Portfolio] Nouveau message de ${contact.name}: ${contact.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0a0f1c; border-bottom: 2px solid #00d4aa; padding-bottom: 10px;">
            Nouveau message depuis votre portfolio
          </h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">Nom:</td>
              <td style="padding: 8px;">${contact.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">Email:</td>
              <td style="padding: 8px;"><a href="mailto:${contact.email}">${contact.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px; font-weight: bold; color: #555;">Sujet:</td>
              <td style="padding: 8px;">${contact.subject}</td>
            </tr>
          </table>
          <div style="margin-top: 20px; padding: 15px; background: #f5f5f5; border-left: 4px solid #00d4aa; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap;">${contact.message}</p>
          </div>
          <hr style="margin-top: 30px; border: none; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px;">
            Envoyé depuis le formulaire de contact de votre portfolio
          </p>
        </div>
      `,
      replyTo: contact.email,
    });
    logger.info('Contact email sent successfully');
  } catch (err) {
    logger.error('Failed to send contact email:', err);
  }
}
