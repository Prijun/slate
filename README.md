# Slate

Slate is a small weekly planning desk demo. It includes a responsive static frontend, local browser persistence for plans and notes, and a simple plans API ready to connect to Supabase.

## Run locally

Install dependencies, then serve the public directory:

```bash
npm install
npx http-server public -p 4173
```

Open `http://127.0.0.1:4173` in a browser. The frontend works without Supabase credentials by using local storage. The API expects `SUPABASE_URL` and `SUPABASE_ANON_KEY` only when Supabase-backed persistence is added.