import { NextResponse } from "next/server";

// ВРЕМЕННЫЙ диагностический роут: показывает, какие env-переменные реально
// доходят до рантайма. Секреты не раскрываются — только флаги "задано/пусто".
export const dynamic = "force-dynamic";

function state(value: string | undefined) {
  if (value === undefined) return "missing";
  if (value.trim() === "") return "empty";
  return "set";
}

export async function GET() {
  return NextResponse.json({
    project: process.env.VERCEL_PROJECT_ID ?? null,
    deploymentUrl: process.env.VERCEL_URL ?? null,
    env: process.env.VERCEL_ENV ?? null,
    region: process.env.VERCEL_REGION ?? null,
    gitCommit: process.env.VERCEL_GIT_COMMIT_SHA ?? null,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? null,
    yookassa: {
      shopId: state(process.env.YOOKASSA_SHOP_ID),
      secretKey: state(process.env.YOOKASSA_SECRET_KEY),
      sendReceipt: process.env.YOOKASSA_SEND_RECEIPT ?? null,
      vatCode: process.env.YOOKASSA_VAT_CODE ?? null,
    },
    telegram: {
      botToken: state(process.env.TELEGRAM_BOT_TOKEN),
      chatId: state(process.env.TELEGRAM_CHAT_ID),
    },
  });
}
