// email.js
export const emailTemplate = (appointmentDetails) => {
    return `<!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="UTF-8">
      <title>Appointment Confirmation</title>
      <style>
        body {
          background-color: #ffffff;
          font-family: Arial, sans-serif;
          font-size: 16px;
          line-height: 1.4;
          color: #333333;
          margin: 0;
          padding: 0;
        }

        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
        }

        .message {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 20px;
        }

        .body {
          font-size: 16px;
          margin-bottom: 20px;
        }

        .cta {
          display: inline-block;
          padding: 10px 20px;
          background-color: #FFD60A;
          color: #000000;
          text-decoration: none;
          border-radius: 5px;
          font-size: 16px;
          font-weight: bold;
          margin-top: 20px;
        }

        .support {
          font-size: 14px;
          color: #999999;
          margin-top: 20px;
        }

        .highlight {
          font-weight: bold;
        }
      </style>

    </head>

    <body>
      <div class="container">
        <div class="message">Appointment Confirmation</div>
        <div class="body">
          <p>Dear ${appointmentDetails.name},</p>
          <p>Thank you for booking an appointment with Telehealth. Here are the details of your appointment:</p>
          <p><strong>Date:</strong> ${appointmentDetails.date}</p>
          <p><strong>Time:</strong> ${appointmentDetails.time}</p>
          <p><strong>Doctor:</strong> ${appointmentDetails.doctorName}</p>
          <p>Please make sure to be on time for your appointment. If you need to reschedule or cancel, please contact us at least 24 hours in advance.</p>
        </div>
        <div>
          <p>To join your video chat session, please click the link below:</p>
          <a href="${appointmentDetails.link}" class="cta">Join Video Chat</a>
        </div>
        <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
            href="mailto:support@telehealth.com">support@telehealth.com</a>. We are here to help!</div>
      </div>
    </body>

    </html>`;
};
