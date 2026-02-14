import { NextResponse } from "next/server";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  slug: string;
}

interface OrderForm {
  ime: string;
  prezime: string;
  telefon: string;
  email: string;
  adresa: string;
  napomena: string;
  nacinDostave: "dostava" | "licno";
}

interface OrderPayload {
  form: OrderForm;
  items: OrderItem[];
  total: number;
}

function buildEmailHtml(payload: OrderPayload): string {
  const { form, items, total } = payload;
  const orderNumber = `CD-${Date.now()}`;

  const itemRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #f2c4ce;font-family:Georgia,serif;color:#2c1a1e;">${item.name}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f2c4ce;text-align:center;color:#8a7a7e;">${item.quantity}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #f2c4ce;text-align:right;color:#c8506a;font-weight:500;">${(item.price * item.quantity).toLocaleString("sr-RS")} RSD</td>
      </tr>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="sr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#fdf8f4;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#fdf8f4;padding:30px 0;">
<tr><td>
<table width="600" align="center" cellpadding="0" cellspacing="0" style="background:white;border-radius:4px;overflow:hidden;border:1px solid #f2c4ce;max-width:600px;width:100%;">
  <tr><td style="background:#c8506a;padding:32px 40px;text-align:center;">
    <p style="font-family:Georgia,serif;font-size:28px;font-weight:300;color:white;margin:0;letter-spacing:0.05em;">Cvećara Dekor</p>
    <p style="font-family:Georgia,serif;font-style:italic;color:rgba(255,255,255,0.8);margin:4px 0 0;font-size:14px;">Nova narudžbina</p>
  </td></tr>
  <tr><td style="padding:24px 40px 0;text-align:center;">
    <p style="font-size:12px;letter-spacing:0.1em;text-transform:uppercase;color:#8a7a7e;margin:0 0 4px;">Broj narudžbine</p>
    <p style="font-family:Georgia,serif;font-size:1.4rem;color:#c8506a;margin:0;font-weight:400;">${orderNumber}</p>
  </td></tr>
  <tr><td style="padding:24px 40px;">
    <h2 style="font-family:Georgia,serif;font-size:18px;font-weight:400;color:#2c1a1e;margin:0 0 16px;padding-bottom:8px;border-bottom:1px solid #f2c4ce;">Podaci kupca</h2>
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr><td width="50%" style="padding:4px 0;font-size:14px;color:#8a7a7e;">Ime i prezime:</td><td width="50%" style="padding:4px 0;font-size:14px;color:#2c1a1e;font-weight:500;">${form.ime} ${form.prezime}</td></tr>
      <tr><td style="padding:4px 0;font-size:14px;color:#8a7a7e;">Telefon:</td><td style="padding:4px 0;font-size:14px;color:#2c1a1e;font-weight:500;">${form.telefon}</td></tr>
      <tr><td style="padding:4px 0;font-size:14px;color:#8a7a7e;">Email:</td><td style="padding:4px 0;font-size:14px;color:#2c1a1e;font-weight:500;">${form.email}</td></tr>
      <tr><td style="padding:4px 0;font-size:14px;color:#8a7a7e;">Preuzimanje:</td><td style="padding:4px 0;font-size:14px;color:#2c1a1e;font-weight:500;">${form.nacinDostave === "dostava" ? "🚚 Dostava" : "🏪 Lično preuzimanje"}</td></tr>
      ${form.nacinDostave === "dostava" && form.adresa ? `<tr><td style="padding:4px 0;font-size:14px;color:#8a7a7e;">Adresa:</td><td style="padding:4px 0;font-size:14px;color:#2c1a1e;font-weight:500;">${form.adresa}</td></tr>` : ""}
      ${form.napomena ? `<tr><td style="padding:8px 0 4px;font-size:14px;color:#8a7a7e;vertical-align:top;">Napomena:</td><td style="padding:8px 0 4px;font-size:14px;color:#2c1a1e;font-style:italic;">${form.napomena}</td></tr>` : ""}
    </table>
  </td></tr>
  <tr><td style="padding:0 40px 24px;">
    <h2 style="font-family:Georgia,serif;font-size:18px;font-weight:400;color:#2c1a1e;margin:0 0 16px;padding-bottom:8px;border-bottom:1px solid #f2c4ce;">Poručeni proizvodi</h2>
    <table width="100%" cellpadding="0" cellspacing="0">
      <thead><tr style="background:#fdf0f3;">
        <th style="padding:8px 12px;text-align:left;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#8a7a7e;font-weight:400;">Proizvod</th>
        <th style="padding:8px 12px;text-align:center;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#8a7a7e;font-weight:400;">Kol.</th>
        <th style="padding:8px 12px;text-align:right;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;color:#8a7a7e;font-weight:400;">Iznos</th>
      </tr></thead>
      <tbody>${itemRows}</tbody>
      <tfoot><tr>
        <td colspan="2" style="padding:14px 12px;font-family:Georgia,serif;font-size:16px;font-weight:400;color:#2c1a1e;text-align:right;">Ukupno:</td>
        <td style="padding:14px 12px;font-family:Georgia,serif;font-size:18px;font-weight:500;color:#c8506a;text-align:right;">${total.toLocaleString("sr-RS")} RSD</td>
      </tr></tfoot>
    </table>
  </td></tr>
  <tr><td style="background:#fdf0f3;padding:20px 40px;text-align:center;border-top:1px solid #f2c4ce;">
    <p style="font-size:13px;color:#8a7a7e;margin:0 0 4px;">Cvećara Dekor · Potporucnika Govedarice 15, Kragujevac</p>
    <p style="font-size:13px;color:#8a7a7e;margin:0;">📞 065 626 8801 · @cvecara_dekor_kg</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

async function sendMailjet({
  to,
  toName,
  subject,
  html,
  replyTo,
}: {
  to: string;
  toName?: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.MAILJET_API_KEY!;
  const secretKey = process.env.MAILJET_SECRET_KEY!;
  const senderEmail = process.env.SITE_MAIL_SENDER!;
  const credentials = Buffer.from(`${apiKey}:${secretKey}`).toString("base64");

  const body: Record<string, unknown> = {
    Messages: [
      {
        From: { Email: senderEmail, Name: "Cvećara Dekor" },
        To: [{ Email: to, ...(toName ? { Name: toName } : {}) }],
        Subject: subject,
        HTMLPart: html,
        ...(replyTo ? { ReplyTo: { Email: replyTo } } : {}),
      },
    ],
  };

  const res = await fetch("https://api.mailjet.com/v3.1/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Mailjet greška: ${err}`);
  }

  return res.json();
}

export async function POST(request: Request) {
  try {
    const payload: OrderPayload = await request.json();
    const { form, items, total } = payload;

    if (!form.ime || !form.telefon || !form.email || items.length === 0) {
      return NextResponse.json({ error: "Nedostaju obavezna polja" }, { status: 400 });
    }

    const shopEmail = process.env.SITE_MAIL_RECEIVER;
    const mailjetKey = process.env.MAILJET_API_KEY;

    if (!shopEmail || !mailjetKey) {
      // Dev fallback – logujemo narudžbinu
      console.log("📦 Nova narudžbina (email nije konfigurisan):", JSON.stringify(payload, null, 2));
      return NextResponse.json({ ok: true });
    }

    const orderNumber = `CD-${Date.now()}`;
    const subject = `🌸 Nova narudžbina #${orderNumber} – ${form.ime} ${form.prezime}`;
    const emailHtml = buildEmailHtml(payload);

    // Email cvećari
    await sendMailjet({
      to: shopEmail,
      toName: "Cvećara Dekor",
      subject,
      html: emailHtml,
      replyTo: form.email,
    });

    // Potvrda kupcu
    await sendMailjet({
      to: form.email,
      toName: `${form.ime} ${form.prezime}`,
      subject: "Potvrda narudžbine – Cvećara Dekor",
      html: `
        <div style="font-family:Arial,sans-serif;max-width:500px;margin:0 auto;padding:30px;background:#fdf8f4;">
          <div style="text-align:center;margin-bottom:24px;">
            <p style="font-family:Georgia,serif;font-size:24px;font-weight:300;color:#c8506a;margin:0;">Cvećara Dekor</p>
          </div>
          <h2 style="font-family:Georgia,serif;font-weight:300;color:#2c1a1e;">Hvala, ${form.ime}! 🌸</h2>
          <p style="color:#8a7a7e;line-height:1.7;">
            Primili smo vašu narudžbinu u iznosu od <strong style="color:#c8506a;">${total.toLocaleString("sr-RS")} RSD</strong>.
            Kontaktiraćemo vas uskoro na broj <strong>${form.telefon}</strong> radi potvrde i dogovora.
          </p>
          <p style="color:#8a7a7e;line-height:1.7;margin-top:16px;">
            Za hitne upite: <a href="tel:0656268801" style="color:#c8506a;">065 626 8801</a>
          </p>
          <p style="color:#8a7a7e;font-size:13px;margin-top:24px;border-top:1px solid #f2c4ce;padding-top:16px;">
            Cvećara Dekor · Potporucnika Govedarice 15, Kragujevac
          </p>
        </div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Order error:", err);
    return NextResponse.json(
      { error: "Greška pri obradi narudžbine. Pokušajte ponovo ili pozovite 065 626 8801." },
      { status: 500 }
    );
  }
}
