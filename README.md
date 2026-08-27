# Bonnie's Bites — setup voor automatische updates

Dit is een simpele statische site. Nieuwe recepten toevoegen betekent
enkel een nieuw blokje in `data/recipes.json` — er hoeft niets
"gebouwd" te worden, de site leest dat bestand rechtstreeks in.

## Lokaal draaien (Vite dev server)

Om wijzigingen live te zien terwijl je bewerkt:

```
npm install
npm run dev
```

Dit start een lokale server (meestal op `http://localhost:5173`) die
automatisch herlaadt bij elke aanpassing aan de HTML/CSS/JS/JSON-bestanden.

Andere handige commando's:
- `npm run build` — bouwt een productieversie in `dist/` (optioneel, Netlify
  heeft dit niet nodig — zie hieronder).
- `npm run preview` — bekijkt die gebouwde `dist/`-versie lokaal.

## Eenmalige setup (±10 min)

1. **GitHub-repo aanmaken**
   Ga naar github.com → New repository → noem hem bv. `bonnies-bites` → Create.

2. **Deze map uploaden**
   - Makkelijkste manier: op de repo-pagina op "uploading an existing file"
     klikken en alle bestanden/mappen uit deze zip erin slepen.
   - Of via git op je computer:
     ```
     git init
     git remote add origin https://github.com/<jouw-gebruikersnaam>/bonnies-bites.git
     git add .
     git commit -m "Eerste versie van de site"
     git branch -M main
     git push -u origin main
     ```

3. **Netlify koppelen aan de repo (in plaats van slepen)**
   - In Netlify: **Add new site → Import an existing project → Deploy with GitHub**
   - Kies de `bonnies-bites`-repo.
   - Build command: laat leeg. Publish directory: `.` (de hoofdmap).
   - Klik Deploy. Netlify geeft de site een URL — je kan die eventueel
     nog koppelen aan je bestaande domeinnaam via Site settings → Domain management.
   - Je oude, handmatig gesleepte site kan je daarna gerust laten staan of verwijderen.

Vanaf nu: **elke push naar `main` op GitHub → Netlify bouwt automatisch opnieuw
→ live binnen ongeveer een minuut.** Geen slepen meer nodig.

## Nieuw recept toevoegen (het "TOP"-moment)

Zodra jij in ons gesprek een recept met "TOP" bevestigt, doe ik voortaan:

1. Recept toevoegen aan `Gerechtenboek.docx` (zoals altijd).
2. Hetzelfde recept als een nieuw object toevoegen aan `data/recipes.json`.
3. Als jij mij toegang geeft tot de GitHub-repo (bv. via een personal
   access token, of door zelf te pushen wat ik klaarzet), commit en
   push ik de wijziging naar `main`.
4. Netlify pikt die push automatisch op — de site is bijgewerkt zonder
   dat jij iets hoeft te doen.

Als je liever niet standaard toegang geeft: ik zet dan telkens het
bijgewerkte `recipes.json`-bestand voor je klaar om te downloaden, en
jij pusht het zelf (kan ook via "upload files" op github.com, zonder git).
