const axios = require("axios");
const FormData = require("form-data");
const sendMail = require("../utils/sendMail");

const { ACCESS_TOKEN, PHONE_NUMBER_ID } = require("../config/config");

exports.sendPdf = async (req, res) => {
  try {
    const { base64pdf, email, name, phoneNumber, subject } = req.body;

    if (!base64pdf) return res.status(400).json({ error: "Missing PDF data" });

    // Convert base64 → Buffer
    const pdfBuffer = Buffer.from(base64pdf, "base64");

    /**
     * 1️⃣ Send Email via Brevo
     */
    const htmlContent = `
      <h2>Hello ${name || "User"},</h2>
      <p>Thank you for using <b>Apna OPD</b>.</p>
      <p>Please find your attached invoice below.</p>
      <p>Regards,<br>Apna OPD Team</p>
    `;
    console.log(email)
    if (email) {
      await sendMail(
        email,
        name,
        subject || "Your Apna OPD Invoice",
        htmlContent
      );
    }

    /**
     * 2️⃣ Send WhatsApp Document using Meta API
     */
    console.log(phoneNumber)
    if (phoneNumber) {
      // Upload file first
      const form = new FormData();
      form.append("file", pdfBuffer, { filename: "invoice.pdf" });
      form.append("type", "application/pdf");
      form.append("messaging_product", "whatsapp");

      // Upload media
      const uploadResponse = await axios.post(
        `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/media`,
        form,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            ...form.getHeaders(),
          },
        }
      );

      const mediaId = uploadResponse.data.id;

      // Send document message
      await axios.post(
        `https://graph.facebook.com/v21.0/${PHONE_NUMBER_ID}/messages`,
        {
          messaging_product: "whatsapp",
          to: phoneNumber,
          type: "document",
          document: {
            id: mediaId,
            caption: "Your Apna OPD Invoice",
          },
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
            "Content-Type": "application/json",
          },
        }
      );
    }

    res.json({ success: true, message: "Invoice sent via Email & WhatsApp!" });
  } catch (error) {
    console.error("Invoice send error:", error.response?.data || error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
