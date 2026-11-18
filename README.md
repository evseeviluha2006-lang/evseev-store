This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Деплой на Vercel

Сайт собирается на Vercel (Next.js определяется автоматически). Два способа:

### 1. Через GitHub (рекомендуется)

1. Запушить изменения в `main`:

```bash
git add .
git commit -m "update"
git push
```

2. В [Vercel Dashboard](https://vercel.com/new) импортировать репозиторий
   `evseeviluha2006-lang/evseev-store` — после этого каждый пуш в `main`
   автоматически собирается и публикуется.

### 2. Через VS Code / CLI

`Ctrl+Shift+P` → **Tasks: Run Task** → по очереди:

- `Vercel: login` — вход в аккаунт (откроется браузер);
- `Vercel: link project` — привязать папку к проекту;
- `Vercel: deploy production` — сборка и публикация.

Команды также лежат в `.vscode/tasks.json`.

### Переменные окружения

Секреты не хранятся в репозитории. На Vercel их нужно добавить в
**Project → Settings → Environment Variables** (или взять локально командой
`Vercel: pull env to .env.local`). Список переменных — в `.env.example`:
ЮKassa, Telegram-бот и `NEXT_PUBLIC_SITE_URL`.

### Домен

В Vercel: **Project → Settings → Domains → Add** — указать `evseev.store`
и при необходимости `www.evseev.store`, затем прописать DNS-записи,
которые покажет Vercel.

Проверить сборку локально перед деплоем: `npm run build`.

