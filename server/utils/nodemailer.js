import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createTransporter = () => {

  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  if (isDevelopment && !process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      streamTransport: true,
      newline: 'unix',
      buffer: true
    });
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const transporter = createTransporter();


let cssCache = {};
const loadCSS = async (cssFileName) => {
  if (cssCache[cssFileName]) {
    return cssCache[cssFileName];
  }
  
  const cssPath = path.join(__dirname, '../emailTemplate/styles', cssFileName);
  const css = await fs.readFile(cssPath, 'utf-8');
  cssCache[cssFileName] = css;
  return css;
};


export const sendEmail = async ({ to, subject, template, data, from }) => {
  try {
    const css = await loadCSS('email-base.css');
    
    const templatePath = path.join(__dirname, '../emailTemplate', `${template}.ejs`);
    const html = await ejs.renderFile(templatePath, { ...data, emailStyles: css });

    const mailOptions = {
      from: from || process.env.SMTP_FROM || '"Event Manager" <noreply@eventmanager.com>',
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);

    if (process.env.NODE_ENV !== 'production') {
      console.log('Email sent:', {
        to,
        subject,
        messageId: info.messageId,
        preview: nodemailer.getTestMessageUrl(info) || 'N/A'
      });
    }

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

export const sendWelcomeEmail = async (user) => {
  return sendEmail({
    to: user.email,
    subject: 'Welcome to Event Manager! 🎉',
    template: 'welcome',
    data: {
      name: user.name,
      email: user.email,
      loginUrl: process.env.FRONTEND_URL || 'http://localhost:3000/login',
      year: new Date().getFullYear(),
    },
  });
};

export const sendVerificationEmail = async (user, verificationToken) => {
  const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/verify-email?token=${verificationToken}`;
  
  return sendEmail({
    to: user.email,
    subject: 'Verify Your Email Address',
    template: 'verification',
    data: {
      name: user.name,
      verificationUrl,
      year: new Date().getFullYear(),
    },
  });
};


export const sendPasswordResetEmail = async (user, resetToken) => {
  const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${resetToken}`;
  
  return sendEmail({
    to: user.email,
    subject: 'Reset Your Password',
    template: 'passwordReset',
    data: {
      name: user.name,
      resetUrl,
      year: new Date().getFullYear(),
    },
  });
};


export const sendEventInvitationEmail = async (user, event, inviteUrl) => {
  return sendEmail({
    to: user.email,
    subject: `You're Invited to ${event.name}! 🎊`,
    template: 'eventInvitation',
    data: {
      name: user.name,
      eventName: event.name,
      eventDate: event.eventDate,
      eventVenue: event.venue,
      inviteUrl,
      year: new Date().getFullYear(),
    },
  });
};

export default {
  sendEmail,
  sendWelcomeEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendEventInvitationEmail,
};
