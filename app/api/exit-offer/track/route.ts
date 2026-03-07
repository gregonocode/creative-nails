import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type Body = {
  eventName?: "view" | "accept" | "decline" | "close";
};

export async function POST(req: NextRequest) {
  try {
    const { eventName } = (await req.json()) as Body;

    if (!eventName) {
      return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }

    const key = `exitOffer:${eventName}`;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        {
          error: "missing_env",
          detail: "NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY",
        },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceKey);

    const { error } = await supabase.rpc("quiz_increment", { p_key: key });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true, key });
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
}

export {};