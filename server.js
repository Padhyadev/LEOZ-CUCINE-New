import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static frontend files from 'dist' in production
const DIST_PATH = path.join(__dirname, 'dist');
app.use(express.static(DIST_PATH));

// In-memory fallback if MySQL is down
const memoryEnquiries = [];

// MySQL Connection Pool
let dbPool = null;

const initDb = async () => {
  try {
    const host = process.env.DB_HOST || 'localhost';
    const user = process.env.DB_USER || 'u783742493_leoz_user';
    const password = process.env.DB_PASSWORD || 'Leoz@$1234';
    const database = process.env.DB_NAME || 'u783742493_leoz_db';

    dbPool = mysql.createPool({
      host,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      connectTimeout: 8000,
    });

    // Auto-create enquiries table if it doesn't exist
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS enquiries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        reference_id VARCHAR(50) NOT NULL,
        form_type VARCHAR(50) NOT NULL,
        full_name VARCHAR(100),
        phone VARCHAR(30),
        email VARCHAR(100),
        city VARCHAR(100),
        project_type VARCHAR(100),
        consultation_mode VARCHAR(100),
        investment_budget VARCHAR(100),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
    `;

    await dbPool.query(createTableQuery);
    console.log('[DB] MySQL Database Connected & "enquiries" table ready.');
  } catch (err) {
    console.warn('[DB] MySQL Connection Warning (queries will use fallback):', err.message);
    dbPool = null;
  }
};

initDb();

// Email Transporter (Gmail SMTP)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || 'vmgami333@gmail.com',
    pass: process.env.SMTP_PASS || 'xexmprzznmkblcxt',
  },
});

// Helper function to send elegant, corporate-formatted emails without emojis
const sendEnquiryEmails = async (data) => {
  const rawAdminEmails = process.env.ADMIN_EMAIL || process.env.SMTP_USER || 'vmgami333@gmail.com';
  const adminEmailList = rawAdminEmails.split(',').map((e) => e.trim()).filter(Boolean);
  const senderEmail = data.email ? data.email.trim() : '';
  const displayName = process.env.SMTP_FROM_NAME || 'Leoz Cucine';
  const formattedDate = new Date().toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // 1. Send Corporate Email to Admin(s)
  const adminMailOptions = {
    from: `"${displayName}" <${process.env.SMTP_USER}>`,
    to: adminEmailList.join(', '),
    subject: `New Project Enquiry [${data.form_type.toUpperCase()}] - ${data.full_name || 'Website Visitor'}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { margin: 0; padding: 0; background-color: #f4f5f7; font-family: 'Segoe UI', Arial, sans-serif; color: #333333; }
          .container { max-width: 620px; margin: 30px auto; background-color: #ffffff; border: 1px solid #e2e5e9; border-radius: 4px; overflow: hidden; }
          .header { background-color: #1a1a1a; padding: 25px 30px; border-bottom: 2px solid #b89b72; text-align: left; }
          .header h1 { margin: 0; font-size: 20px; letter-spacing: 2px; color: #d4af37; font-weight: 600; text-transform: uppercase; }
          .header p { margin: 5px 0 0 0; font-size: 12px; color: #a0a0a0; letter-spacing: 0.5px; }
          .content { padding: 30px; }
          .title { font-size: 16px; font-weight: 600; margin-bottom: 20px; color: #111111; border-bottom: 1px solid #ebebeb; padding-bottom: 10px; }
          .details-table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .details-table td { padding: 10px 12px; font-size: 13.5px; border-bottom: 1px solid #f0f0f0; }
          .details-table td.label { width: 35%; font-weight: 600; color: #555555; background-color: #fafbfc; }
          .details-table td.value { color: #222222; }
          .footer { background-color: #fafbfc; padding: 18px 30px; font-size: 12px; color: #777777; border-top: 1px solid #ebebeb; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>LEOZ CUCINE</h1>
            <p>Customer Relationship Management Notification</p>
          </div>
          <div class="content">
            <div class="title">New Website Enquiry Details</div>
            <table class="details-table">
              <tr>
                <td class="label">Reference Number</td>
                <td class="value"><strong>${data.reference_id}</strong></td>
              </tr>
              <tr>
                <td class="label">Form Category</td>
                <td class="value" style="text-transform: capitalize;">${data.form_type}</td>
              </tr>
              <tr>
                <td class="label">Client Name</td>
                <td class="value"><strong>${data.full_name || 'Not Provided'}</strong></td>
              </tr>
              <tr>
                <td class="label">Contact Phone</td>
                <td class="value">${data.phone ? `<a href="tel:${data.phone}" style="color: #1a56db; text-decoration: none;">${data.phone}</a>` : 'Not Provided'}</td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="value">${data.email ? `<a href="mailto:${data.email}" style="color: #1a56db; text-decoration: none;">${data.email}</a>` : 'Not Provided'}</td>
              </tr>
              ${data.city ? `
              <tr>
                <td class="label">Location / City</td>
                <td class="value">${data.city}</td>
              </tr>` : ''}
              ${data.project_type ? `
              <tr>
                <td class="label">Project Type</td>
                <td class="value">${data.project_type}</td>
              </tr>` : ''}
              ${data.consultation_mode ? `
              <tr>
                <td class="label">Consultation Mode</td>
                <td class="value">${data.consultation_mode}</td>
              </tr>` : ''}
              ${data.investment_budget ? `
              <tr>
                <td class="label">Investment Budget</td>
                <td class="value">${data.investment_budget}</td>
              </tr>` : ''}
              ${data.message ? `
              <tr>
                <td class="label">Client Message</td>
                <td class="value" style="white-space: pre-wrap; line-height: 1.5;">${data.message}</td>
              </tr>` : ''}
              <tr>
                <td class="label">Submission Date</td>
                <td class="value">${formattedDate}</td>
              </tr>
            </table>
          </div>
          <div class="footer">
            Automated internal notification from the Leoz Cucine web platform.
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    await transporter.sendMail(adminMailOptions);
    console.log(`[Email] Admin notification sent to: ${adminEmailList.join(', ')}`);
  } catch (err) {
    console.error('[Email] Failed to send admin email:', err.message);
  }

  // 2. Send Elegant Professional Confirmation Email to the Client / Sender
  if (senderEmail && senderEmail.includes('@')) {
    const senderMailOptions = {
      from: `"${displayName}" <${process.env.SMTP_USER}>`,
      to: senderEmail,
      subject: `Enquiry Confirmation: Leoz Cucine [Reference: ${data.reference_id}]`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { margin: 0; padding: 0; background-color: #f7f7f7; font-family: 'Segoe UI', Arial, sans-serif; color: #2e2e2e; }
            .container { max-width: 620px; margin: 30px auto; background-color: #ffffff; border: 1px solid #e6e6e6; border-radius: 4px; overflow: hidden; }
            .header { background-color: #121212; padding: 32px 30px; text-align: center; border-bottom: 2px solid #b89b72; }
            .header h1 { margin: 0; font-size: 22px; letter-spacing: 4px; color: #cbb085; font-weight: 500; text-transform: uppercase; }
            .header p { margin: 8px 0 0 0; font-size: 11px; letter-spacing: 2px; color: #888888; text-transform: uppercase; }
            .content { padding: 35px 35px 25px 35px; }
            .salutation { font-size: 16px; font-weight: 600; margin-bottom: 18px; color: #111111; }
            .paragraph { font-size: 14px; line-height: 1.65; color: #4a4a4a; margin-bottom: 18px; }
            .summary-box { background-color: #fbf9f6; border-left: 3px solid #b89b72; padding: 18px 20px; margin: 25px 0; }
            .summary-title { font-size: 12.5px; font-weight: 700; color: #111111; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 12px; }
            .summary-row { font-size: 13.5px; margin-bottom: 6px; color: #555555; }
            .summary-row strong { color: #222222; }
            .closing { font-size: 14px; line-height: 1.6; color: #4a4a4a; margin-top: 25px; }
            .footer { background-color: #fafafa; padding: 22px 35px; font-size: 12px; color: #888888; border-top: 1px solid #eeeeee; text-align: center; line-height: 1.5; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>LEOZ CUCINE</h1>
              <p>Luxury Italian Kitchens & Living</p>
            </div>
            <div class="content">
              <div class="salutation">Dear ${data.full_name || 'Valued Client'},</div>
              
              <div class="paragraph">
                Thank you for contacting Leoz Cucine. We have received your consultation request and assigned reference number <strong>${data.reference_id}</strong> to your enquiry.
              </div>

              <div class="paragraph">
                Our design and architectural team is reviewing your requirements. A specialist will connect with you shortly to discuss tailored concepts and assist with your project planning.
              </div>

              <div class="summary-box">
                <div class="summary-title">Submission Summary</div>
                <div class="summary-row"><strong>Reference ID:</strong> ${data.reference_id}</div>
                <div class="summary-row"><strong>Name:</strong> ${data.full_name || 'N/A'}</div>
                <div class="summary-row"><strong>Contact Number:</strong> ${data.phone || 'N/A'}</div>
                ${data.project_type ? `<div class="summary-row"><strong>Project Type:</strong> ${data.project_type}</div>` : ''}
                ${data.consultation_mode ? `<div class="summary-row"><strong>Consultation Preference:</strong> ${data.consultation_mode}</div>` : ''}
              </div>

              <div class="closing">
                Warm regards,<br>
                <strong>Client Experience Team</strong><br>
                Leoz Cucine
              </div>
            </div>
            <div class="footer">
              This is an automated confirmation sent regarding your request on leozcucine.com.<br>
              &copy; ${new Date().getFullYear()} Leoz Cucine. All rights reserved.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    try {
      await transporter.sendMail(senderMailOptions);
      console.log(`[Email] Client confirmation sent to: ${senderEmail}`);
    } catch (err) {
      console.error('[Email] Failed to send client email:', err.message);
    }
  }
};

// API Endpoint to submit form
app.post('/api/enquiry', async (req, res) => {
  try {
    const { formType, ...data } = req.body;
    const refId = 'LEOZ-' + Date.now();

    const fullName = String(data.fullName || data.name || '').slice(0, 100);
    const phone = String(data.phone || data.mobile || '').slice(0, 30);
    const email = String(data.email || '').slice(0, 100);
    const city = String(data.city || '').slice(0, 100);
    const projectType = String(data.projectType || '').slice(0, 100);
    const consultationMode = String(data.consultationMode || '').slice(0, 100);
    const investmentBudget = String(data.investmentBudget || '').slice(0, 100);
    const message = String(data.message || '').slice(0, 1000);

    const enquiryRecord = {
      reference_id: refId,
      form_type: formType || 'general',
      full_name: fullName,
      phone,
      email,
      city,
      project_type: projectType,
      consultation_mode: consultationMode,
      investment_budget: investmentBudget,
      message,
      created_at: new Date(),
    };

    let savedToDb = false;

    if (dbPool) {
      try {
        const insertQuery = `
          INSERT INTO enquiries 
          (reference_id, form_type, full_name, phone, email, city, project_type, consultation_mode, investment_budget, message)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        await dbPool.query(insertQuery, [
          refId,
          formType || 'general',
          fullName,
          phone,
          email,
          city,
          projectType,
          consultationMode,
          investmentBudget,
          message,
        ]);
        savedToDb = true;
        console.log(`[DB] New Enquiry Saved to MySQL [${formType}]: ${fullName} (${phone})`);
      } catch (dbErr) {
        console.error('[DB] Insert failed, falling back to storage:', dbErr.message);
      }
    }

    if (!savedToDb) {
      memoryEnquiries.push(enquiryRecord);
      console.log(`[DB] New Enquiry Logged in memory [${formType}]: ${fullName} (${phone})`);
    }

    // Trigger emails asynchronously (to Admin & Sender)
    sendEnquiryEmails(enquiryRecord).catch((mailErr) => {
      console.error('[Email] Unexpected error in mail handler:', mailErr);
    });

    return res.status(200).json({
      success: true,
      message: 'Enquiry submitted successfully!',
      id: refId,
    });
  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({
      success: false,
      message: 'Failed to process enquiry: ' + (error.message || 'Server error'),
    });
  }
});

// API Endpoint to view all enquiries
app.get('/api/enquiries', async (req, res) => {
  try {
    if (!dbPool) {
      return res.status(500).json({ error: 'Database not connected' });
    }
    const [rows] = await dbPool.query('SELECT * FROM enquiries ORDER BY id DESC');
    res.json({ count: rows.length, data: rows });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// For any other route, send back frontend index.html (SPA support)
app.use((req, res) => {
  res.sendFile(path.join(DIST_PATH, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`========================================`);
  console.log(`LEOZ Cucine Production Server Running`);
  console.log(`URL: http://localhost:${PORT}`);
  console.log(`MySQL DB: ${process.env.DB_NAME || 'u783742493_leoz_db'}`);
  console.log(`Email Notifications: ENABLED`);
  console.log(`========================================`);
});
