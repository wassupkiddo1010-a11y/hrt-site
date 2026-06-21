# HRT.org Website

A modern recreation of the [PanAesthetics](https://www.panaesthetics.at/) design system adapted for [HRT.org](https://hrt.org/) — personalized hormone health for men and women.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Chatbot

The site includes a floating **HRT.org Assistant** on every page (bottom-right). It calls your n8n workflow via `/api/chat`.

Create `.env.local`:

```env
N8N_CHAT_WEBHOOK_URL=https://vmi3206755.contaboserver.net/webhook/hrt-chatbot
```

For production (Vercel, etc.), set the same variable in your hosting environment settings.

## Pages

- **/** — Full homepage with hero, gender cards, symptoms, treatments, how-it-works, testimonials, and PanAesthetics-style partner/features, treatment range, and news sections
- **/treatments** — Product listing with sidebar navigation (PanAesthetics layout)
- **/treatments/[id]** — Individual treatment detail pages

## Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Lucide React icons

## Design

- **Homepage**: Custom HRT.org landing page (navy, men blue, women rose palette)
- **Inner sections**: PanAesthetics-inspired layouts for partners, product range, news, and treatments catalog
