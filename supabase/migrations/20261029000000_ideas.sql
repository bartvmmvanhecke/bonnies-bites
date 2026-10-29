-- Bonnie's Bites: gedeelde ideeën + foto's.
-- Plak dit in Supabase → SQL Editor → Run. Mag meerdere keren gedraaid worden.

create table if not exists public.ideas (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  author_id uuid not null default auth.uid() references auth.users on delete cascade,
  author_name text not null check (char_length(author_name) between 1 and 40),
  category text not null check (category in ('Koken', 'Met de kids', 'Eropuit', 'Kleine gelukjes', 'Campings', 'Restaurant')),
  region text check (char_length(region) <= 40),
  title text not null check (char_length(title) between 1 and 90),
  description text check (char_length(description) <= 400),
  link text check (link ~* '^https?://' and char_length(link) <= 500),
  photos text[] not null default '{}' check (cardinality(photos) <= 4),
  -- pending → jij keurt goed → published (of rejected)
  status text not null default 'pending' check (status in ('pending', 'published', 'rejected')),
  -- wat de agent later aanvult (adres, tijd, tips, bronnen)
  enrichment jsonb
);

create index if not exists ideas_status_created_at on public.ideas (status, created_at desc);

alter table public.ideas enable row level security;

-- Iedereen ziet gepubliceerde ideeën; je eigen ideeën zie je altijd.
drop policy if exists "ideas: lezen" on public.ideas;
create policy "ideas: lezen" on public.ideas for select
  using (status = 'published' or author_id = auth.uid());

-- Alleen ingelogd (ook anoniem) en alleen als jezelf, altijd als 'pending'.
drop policy if exists "ideas: delen" on public.ideas;
create policy "ideas: delen" on public.ideas for insert to authenticated
  with check (author_id = auth.uid() and status = 'pending' and enrichment is null);

-- Eigen idee aanpassen zolang het nog niet gepubliceerd is.
drop policy if exists "ideas: eigen aanpassen" on public.ideas;
create policy "ideas: eigen aanpassen" on public.ideas for update to authenticated
  using (author_id = auth.uid() and status = 'pending')
  with check (author_id = auth.uid() and status = 'pending');

drop policy if exists "ideas: eigen verwijderen" on public.ideas;
create policy "ideas: eigen verwijderen" on public.ideas for delete to authenticated
  using (author_id = auth.uid());

-- Bezoekers mogen status en verrijking nooit zelf zetten.
revoke insert, update on public.ideas from anon, authenticated;
grant select on public.ideas to anon, authenticated;
grant insert (author_name, category, region, title, description, link, photos) on public.ideas to authenticated;
grant update (author_name, category, region, title, description, link, photos) on public.ideas to authenticated;
grant delete on public.ideas to authenticated;

-- Foto's: openbaar leesbaar, enkel in je eigen map (<user-id>/...) uploaden.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('idea-photos', 'idea-photos', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update set public = excluded.public, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "idea-photos: eigen uploaden" on storage.objects;
create policy "idea-photos: eigen uploaden" on storage.objects for insert to authenticated
  with check (bucket_id = 'idea-photos' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "idea-photos: eigen verwijderen" on storage.objects;
create policy "idea-photos: eigen verwijderen" on storage.objects for delete to authenticated
  using (bucket_id = 'idea-photos' and (storage.foldername(name))[1] = auth.uid()::text);
