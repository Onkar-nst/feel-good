# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Online payments (Razorpay)

Booking a session takes payment through Razorpay Checkout before handing over to Cal.com (cal.com/thefeelgoodcenter) to pick a time. Booking links live in `app/utils/booking.ts`.

1. In the Razorpay dashboard go to **Settings → API Keys** and generate keys (test keys first).
2. Copy `.env.example` to `.env` and fill in the key id and secret. The secret never reaches the browser.
3. Prices live in one place: `shared/utils/sessionCatalogue.ts`. The server prices every order from that file, so the amount cannot be changed from the browser.
4. Form emails and booking notices are sent through Gmail with an App Password (`NUXT_GMAIL_USER`, `NUXT_GMAIL_APP_PASSWORD`). `NUXT_NOTIFY_EMAIL` overrides where notifications land.
5. Test with card `4111 1111 1111 1111`, any future expiry, any CVV. Without keys in `.env` the booking modal shows "Online payment is not configured yet."
6. To go live: complete KYC in the dashboard, swap the `rzp_test_` keys for `rzp_live_` keys in the host's environment variables, and redeploy.

The site must be deployed as a server (Vercel, Netlify, Cloudflare, Node) rather than with `nuxt generate`, because the order and verify routes under `server/api/razorpay/` run on the server.
