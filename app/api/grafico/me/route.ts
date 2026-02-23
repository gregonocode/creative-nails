import { NextResponse } from "next/server";
import crypto from "crypto";

function verify(token: string) {
  const secret = process.env.GRAFICO_COOKIE_SECRET!;
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const expected = crypto.createHmac("sha256", secret).update(payload).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export async function GET(req: Request) {
  const cookie = req.headers.get("cookie") ?? "";
  const match = cookie.match(/grafico_auth=([^;]+)/);
  const token = match?.[1];
  const ok = token ? verify(decodeURIComponent(token)) : false;
  return NextResponse.json({ ok });
}