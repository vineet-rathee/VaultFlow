require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"World Bank Of India" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

async function sendRegistrationEmail(userEmail, name) {
    const subject = 'Welcome to World Bank Of India!';
    const text = `Hello ${name},\n\nThank you for registering at World Bank Of India. We're excited to have you on board!\n\nBest regards,\nThe World Bank Of India Team`;
    const html = `<p>Hello ${name},</p><p>Thank you for registering at World Bank Of India. We're excited to have you on board!</p><p>Best regards,<br>The World Bank Of India Team</p>`;

    await sendEmail(userEmail, subject, text, html);
}

async function sendLoginEmail(userEmail, name) {
    const subject = "Login Alert";

    const text = `Hello ${name},
                    Your World Bank Of India account was logged in successfully.
                    If this wasn't you, please change your password immediately.
                    - World Bank Of India`;
    const html = `
        <p>Hello ${name},</p>
        <p>Your <strong>World Bank Of India</strong> account was logged in successfully.</p>
        <p>If this wasn't you, please change your password immediately.</p>
        <p><strong>World Bank Of India</strong></p>`;

    await sendEmail(userEmail, subject, text, html);
}

async function sendDebitEmail(userEmail, name, amount) {
    const subject = "Debit Transaction Alert";

    const text = `Hello ${name},
Your World Bank Of India account has been debited.

Amount Debited: ₹${amount}

If you did not authorize this transaction, please contact customer support immediately.

- World Bank Of India`;

    const html = `
        <p>Hello ${name},</p>
        <p>Your <strong>World Bank Of India</strong> account has been <strong>debited</strong>.</p>

        <ul>
            <li><strong>Amount Debited:</strong> ₹${amount}</li>
        </ul>

        <p>If you did not authorize this transaction, please contact customer support immediately.</p>

        <p><strong>World Bank Of India</strong></p>
    `;

    await sendEmail(userEmail, subject, text, html);
}

async function sendCreditEmail(userEmail, name, amount) {
    const subject = "Credit Transaction Alert";

    const text = `Hello ${name},
Your World Bank Of India account has been credited.

Amount Credited: ₹${amount}

Thank you for banking with us.

- World Bank Of India`;

    const html = `
        <p>Hello ${name},</p>
        <p>Your <strong>World Bank Of India</strong> account has been <strong>credited</strong>.</p>

        <ul>
            <li><strong>Amount Credited:</strong> ₹${amount}</li>
        </ul>

        <p>Thank you for banking with us.</p>

        <p><strong>World Bank Of India</strong></p>
    `;

    await sendEmail(userEmail, subject, text, html);
}
module.exports = {sendRegistrationEmail,sendLoginEmail,sendCreditEmail,sendDebitEmail}