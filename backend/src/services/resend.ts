import "dotenv/config";

const RESEND_API_KEY = process.env.RESEND_API_KEY!;

interface EmailPayload {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: EmailPayload) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: "VYAA <orders@vyaa.com>",
      to,
      subject,
      html,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("Resend error:", err);
    throw new Error("Failed to send email");
  }

  return res.json();
}

export function orderConfirmationEmail(
  name: string,
  orderNumber: string,
  items: { name: string; size: string; quantity: number; price: number }[],
  total: number
): string {
  const itemsHtml = items
    .map(
      (item) =>
        `<tr><td>${item.name} (${item.size})</td><td>${item.quantity}</td><td>₹${item.price}</td></tr>`
    )
    .join("");

  return `
    <h1>Thank you for your order, ${name}!</h1>
    <p>Order #${orderNumber}</p>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse:collapse;width:100%">
      <thead><tr><th>Item</th><th>Qty</th><th>Price</th></tr></thead>
      <tbody>${itemsHtml}</tbody>
    </table>
    <p><strong>Total: ₹${total}</strong></p>
  `;
}
