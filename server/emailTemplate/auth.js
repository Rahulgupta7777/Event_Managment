import {
  sendWelcomeEmail,
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendEventInvitationEmail,
  sendEmail,
} from '../utils/nodemailer.js';

export const sendWelcome = async (user) => {
  try {
    await sendWelcomeEmail(user);
    return { success: true };
  } catch (error) {
    console.error('Failed to send welcome email:', error);
    return { success: false, error: error.message };
  }
};

export const sendVerification = async (user, verificationToken) => {
  try {
    await sendVerificationEmail(user, verificationToken);
    return { success: true };
  } catch (error) {
    console.error('Failed to send verification email:', error);
    return { success: false, error: error.message };
  }
};

export const sendPasswordReset = async (user, resetToken) => {
  try {
    await sendPasswordResetEmail(user, resetToken);
    return { success: true };
  } catch (error) {
    console.error('Failed to send password reset email:', error);
    return { success: false, error: error.message };
  }
};


export const sendEventInvitation = async (user, event, inviteUrl) => {
  try {
    await sendEventInvitationEmail(user, event, inviteUrl);
    return { success: true };
  } catch (error) {
    console.error('Failed to send event invitation email:', error);
    return { success: false, error: error.message };
  }
};

export const sendCustom = async (options) => {
  try {
    await sendEmail(options);
    return { success: true };
  } catch (error) {
    console.error('Failed to send custom email:', error);
    return { success: false, error: error.message };
  }
};


export const sendBatch = async (recipients, emailConfig) => {
  const results = [];
  
  for (const recipient of recipients) {
    try {
      await sendEmail({
        to: recipient.email,
        subject: emailConfig.subject,
        template: emailConfig.template,
        data: {
          ...emailConfig.data,
          name: recipient.name,
        },
      });
      results.push({ email: recipient.email, success: true });
    } catch (error) {
      console.error(`Failed to send email to ${recipient.email}:`, error);
      results.push({ email: recipient.email, success: false, error: error.message });
    }
  }

  return results;
};

export const sendBatchParallel = async (recipients, emailConfig) => {
  const promises = recipients.map(async (recipient) => {
    try {
      await sendEmail({
        to: recipient.email,
        subject: emailConfig.subject,
        template: emailConfig.template,
        data: {
          ...emailConfig.data,
          name: recipient.name,
        },
      });
      return { email: recipient.email, success: true };
    } catch (error) {
      console.error(`Failed to send email to ${recipient.email}:`, error);
      return { email: recipient.email, success: false, error: error.message };
    }
  });

  return await Promise.all(promises);
};

export default {
  sendWelcome,
  sendVerification,
  sendPasswordReset,
  sendEventInvitation,
  sendCustom,
  sendBatch,
  sendBatchParallel,
};
