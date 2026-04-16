import nodemailer from "nodemailer"
import { z } from "zod"

export const runtime = "nodejs"

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("A valid email is required"),
  phone: z.string().trim().optional(),
  message: z.string().trim().optional(),
})

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

export async function POST(request: Request) {
  try {
    const json = await request.json()
    const validatedFields = contactSchema.safeParse(json)

    if (!validatedFields.success) {
      return Response.json(
        {
          error:
            validatedFields.error.flatten().fieldErrors.name?.[0] ??
            validatedFields.error.flatten().fieldErrors.email?.[0] ??
            "Invalid form submission",
        },
        { status: 400 }
      )
    }

    const contactEmail = process.env.CONTACT_EMAIL
    const gmailUser = process.env.GMAIL_USER

    if (!contactEmail || !gmailUser) {
      return Response.json(
        { error: "Email delivery is not configured on the server" },
        { status: 500 }
      )
    }

    const { name, email, phone, message } = validatedFields.data

    const transporter = getTransporter()

    await transporter.sendMail({
      from: `"SmartBlinds Contact" <${gmailUser}>`,
      to: contactEmail,
      replyTo: email,
      subject: `New inquiry from ${name}`,
      text: [
        "A new SmartBlinds contact request was submitted.",
        "",
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || "N/A"}`,
        "",
        "Message:",
        message || "N/A",
      ].join("\n"),
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error("Contact form email failed", error)

    return Response.json(
      { error: "We couldn't send your message right now. Please try again." },
      { status: 500 }
    )
  }
}
