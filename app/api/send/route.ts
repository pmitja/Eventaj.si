import ConfirmationEmail from "@/emails/confirmation";
import NotificationEmail from "@/emails/notification";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { formData, totalPrice } = await request.json();

    // Send confirmation email to user
    await resend.emails.send({
      from: "Eventaj.si <info@eventaj.si>",
      to: formData.email,
      subject: "Hvala za vaše povpraševanje - Eventaj.si",
      react: ConfirmationEmail({ formData }) as React.ReactElement,
    });

    // Send notification email to admin
    await resend.emails.send({
      from: "Eventaj.si <info@eventaj.si>",
      to: "info@eventaj.si",
      subject: "Novo povpraševanje - Eventaj.si",
      react: NotificationEmail({ formData, totalPrice }) as React.ReactElement,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error sending email:", error);
    return Response.json({ error: "Error sending email" }, { status: 500 });
  }
} 