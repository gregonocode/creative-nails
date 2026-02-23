import { NextResponse } from "next/server";
import crypto from "crypto";

function sign(value: string) {
  const secret = process.env.GRAFICO_COOKIE_SECRET!;
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export async function POST(req: Request) {
  const { password } = (await req.json()) as { password?: string };

  if (!password || password !== process.env.GRAFICO_PASSWORD) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const payload = `ok:${Date.now()}`;
  const token = `${payload}.${sign(payload)}`;

  const res = NextResponse.json({ ok: true });
  res.cookies.set("grafico_auth", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 dias
  });
  return res;
}