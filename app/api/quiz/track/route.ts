import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const { questionId, value } = (await req.json()) as {
      questionId?: string;
      value?: string;
    };

    if (!questionId || !value) {
      return NextResponse.json({ error: "invalid_body" }, { status: 400 });
    }

    const key = `${questionId}:${value}`;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      return NextResponse.json(
        { error: "missing_env", detail: "NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY" },
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