import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

type Body = {
  eventName?: "view" | "accept" | "decline" | "close";
  pagePath?: string;
  source?: string;
  sessionId?: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as Body;

    if (!body.eventName) {
      return NextResponse.json(
        { ok: false, error: "eventName é obrigatório" },
        { status: 400 }
      );
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
      return NextResponse.json(
        { ok: false, error: "Variáveis do Supabase ausentes" },
        { status: 500 }
      );
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);

    const payload = {
      event_name: body.eventName,
      page_path: body.pagePath ?? null,
      source: body.source ?? null,
      user_agent: req.headers.get("user-agent") ?? null,
      session_id: body.sessionId ?? null,
    };

    const { error } = await supabase.from("exit_offer_events").insert(payload);

    if (error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Erro interno ao rastrear evento";

    return NextResponse.json(
      { ok: false, error: message },
      { status: 500 }
    );
  }
}

export {};