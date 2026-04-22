import nodemailer from "nodemailer"

function getTransporter() {
  const gmailUser = process.env.GMAIL_USER
  const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

  if (!gmailUser || !gmailAppPassword) {
    throw new Error("Missing Gmail SMTP environment variables")
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPassword,
    },
  })
}

export async function sendAuthEmail(params: { to: string; subject: string; text: string }) {
  const gmailUser = process.env.GMAIL_USER
  if (!gmailUser) {
    throw new Error("Missing Gmail SMTP sender environment variable")
  }

  const transporter = getTransporter()
  await transporter.sendMail({
    from: `"SmartBlinds Auth" <${gmailUser}>`,
    to: params.to,
    subject: params.subject,
    text: params.text,
  })
}

export function getBaseUrl() {
  return process.env.AUTH_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000"
}
