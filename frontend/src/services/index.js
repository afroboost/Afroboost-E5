// /services/index.js - Export centralisé des services Afroboost
// Compatible Vercel

export {
  getEmailJSConfig,
  saveEmailJSConfig,
  isEmailJSConfigured,
  initEmailJS,
  sendEmail,
  sendBulkEmails,
  testEmailJSConfig
} from './emailService';
