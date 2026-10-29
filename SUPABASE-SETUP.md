# Supabase opzetten (gratis plan)

Duurt ongeveer 10 minuten. De code is al klaar: zodra de twee sleutels in `.env.local` staan, gaan gedeelde ideeën en foto’s naar Supabase in plaats van naar de browser.

## 1. Account en project
1. Ga naar [supabase.com](https://supabase.com) → **Start your project** → log in met GitHub.
2. **New project**:
   - Name: `bonnies-bites`
   - Database password: laat Supabase er een maken en bewaar het in je wachtwoordbeheerder.
   - Region: **Central EU (Frankfurt)**. Dan blijven de gegevens in de EU.
   - Plan: **Free**.
3. Wacht een minuutje tot het project klaar is.

## 2. Tabellen en fotomap aanmaken
1. Links: **SQL Editor** → **New query**.
2. Plak de volledige inhoud van `supabase/migrations/20261029000000_ideas.sql` → **Run**.
3. Je ziet ‘Success. No rows returned’. Onder **Table Editor** staat nu de tabel `ideas`, onder **Storage** de map `idea-photos`.

## 3. Anoniem inloggen aanzetten
**Authentication → Sign In / Providers → Allow anonymous sign-ins** → aan → Save.

Daardoor krijgt iemand die een idee deelt stil een account, zonder e-mail of wachtwoord.

## 4. Sleutels in de site zetten
1. **Project Settings → API** (of de knop **Connect** bovenaan).
2. Kopieer de **Project URL** en de **publishable key**. Die heet bij oudere projecten ‘anon public’.
3. Maak in je projectmap op je Mac een bestand `.env.local`:

   ```
   VITE_SUPABASE_URL=https://xxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=sb_publishable_...
   ```

4. Herstart `npm run dev`.

De publishable key mag in de browser staan: wat bezoekers mogen doen, wordt bepaald door de regels in stap 2. Gebruik **nooit** de `service_role`- of secret key in de site.

`.env.local` wordt niet mee naar GitHub gepusht. Zet je de builds op Netlify later terug aan, voeg dan dezelfde twee waarden toe onder **Project configuration → Environment variables**.

## 5. Ideeën goedkeuren
Nieuwe ideeën komen binnen als `pending`. Alleen wie het deelde, ziet ze dan al.

**Table Editor → ideas** → zet `status` op `published` → het idee staat voor iedereen online. Wil je het niet tonen, kies dan `rejected`.

## Gratis plan: goed om te weten
- Een week geen verkeer naar de database → Supabase pauzeert het project. Je krijgt een mail en heractiveert met één klik.
- Ruim voldoende om te starten: 500 MB database en ± 1 GB foto’s. Foto’s worden op het toestel al verkleind tot ± 60–100 KB.
- Kijk de actuele limieten na op [supabase.com/pricing](https://supabase.com/pricing).

## Categorie Restaurant toevoegen

Voer `supabase/migrations/20261029010000_restaurant_category.sql` uit in de Supabase SQL Editor. Deze verruimt alleen de toegestane categorieën; bestaande ideeën blijven behouden. ‘Cadeautips’ is de nieuwe schermnaam van ‘Kleine gelukjes’: de bestaande databasewaarde blijft ondersteund.
