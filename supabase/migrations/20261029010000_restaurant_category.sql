-- Add Restaurant without changing existing ideas or their category values.
-- Cadeautips is the new display label for the existing Kleine gelukjes value.
-- Run once in the Supabase SQL Editor before accepting Restaurant submissions.
alter table public.ideas drop constraint if exists ideas_category_check;
alter table public.ideas add constraint ideas_category_check
  check (category in ('Koken', 'Met de kids', 'Eropuit', 'Kleine gelukjes', 'Campings', 'Restaurant'));
