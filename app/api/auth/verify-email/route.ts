import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"

function getIdentifier(email: string) {
  return `verify:${email.toLowerCase()}`
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")
    const token = searchParams.get("token")

    if (!email || !token) {
      return Response.redirect(new URL("/login?verified=0", request.url))
    }

    const identifier = getIdentifier(email)

    const verification = await prisma.verificationToken.findUnique({
      where: {
        identifier_token: { identifier, token },
      },
    })

    if (!verification || verification.expires < new Date()) {
      return Response.redirect(new URL("/login?verified=0", request.url))
    }

    await prisma.user.updateMany({
      where: { email: email.toLowerCase() },
      data: { emailVerified: new Date() },
    })

    await prisma.verificationToken.delete({
      where: {
        identifier_token: { identifier, token },
      },
    })

    return Response.redirect(new URL("/login?verified=1", request.url))
  } catch (error) {
    console.error("Email verification failed", error)
    return Response.redirect(new URL("/login?verified=0", request.url))
  }
}
