# Bonnie’s Bites

Bestaande Bonnie-preview met een persoonlijke Inbox en een lokale WhatsApp-demo.

## Lokaal previewen

Gebruik Node.js dat Vite 8 ondersteunt (20.19+ of 22.12+).

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5175
```

Open http://127.0.0.1:5175/. Zonder expliciete poort gebruikt de bestaande configuratie 5174. De demo vereist geen `.env.local`, account of credentials. `npm run build` maakt `dist`; `npm run preview -- --port 5175` toont die build. `npm test` test opslag en statusovergangen.

## Nieuwe flow

- **Vertel het Bonnie**: een korte tekst volstaat, zonder URL, naam, categorie of foto te verplichten. Inspreken blijft optioneel beschikbaar als de browser dit ondersteunt; de interface vermeldt dat de browser een online spraakdienst kan gebruiken.
- Het bericht wordt een lokaal, privéconcept. De originele woorden blijven bewaard; deze demo verzint geen opgezochte locatie of praktische gegevens.
- **Inbox**: Concept, Nog aanvullen, Te bevestigen, Voor later en Bevestigd, met filters, tellers en lege toestanden.
- **Aanvullen / bewerken**: titel, categorie, regio, omschrijving, optionele HTTP(S)-link en maximaal vier verkleinde foto’s.
- **Ja, dit klopt** vereist een titel en categorie. Bevestigen houdt de tip privé in de Inbox. Bewerken van een bevestigde tip vraagt opnieuw na te kijken.
- **Voor later** blijft bewaard na herladen. Verwijderen vraagt eerst een extra klik.
- **WhatsApp-demo** simuleert ontvangst vanuit een eigen tekst. Elke tip uit deze flow draagt het label ‘WhatsApp · gesimuleerd’. Er is geen telefoonnummer, Meta API, WhatsApp-verzending, AI-opzoekwerk of e-mailmelding.

De Inbox gebruikt uitsluitend `bb-private-inbox-v1` in browseropslag. Er is geen synchronisatie, versleuteling of accountafscherming: iemand met toegang tot dezelfde browser kan de tips zien. Browsergegevens wissen verwijdert de Inbox. Bij geblokkeerde of volle opslag blijft de ingevoerde tekst zichtbaar met een foutmelding.

Bestaande recepten, campings, filters, favorieten, detailpagina’s en oude bijdragen blijven behouden. Oude opslag (`bb-community-drafts`, `bb-favorites`) wordt niet gemigreerd of overschreven. De bestaande optionele Supabase-code blijft voor bestaande community-inhoud aanwezig; de nieuwe Inbox roept geen inzend-API aan, ook niet als Supabase geconfigureerd wordt. Zet voor deze lokale demo geen credentials over uit het originele project.

## Werkkopie en validatie

Branch: `feature/bonnie-inbox-whatsapp-ux`, lokale aparte clone van `/Users/bartvanhecke/bonnies-bites` in `/Users/bartvanhecke/Documents/ChatGPT/bonniesbites`. De geteste featurebranch wordt lokaal samengevoegd met main in beide werkkopieën; niets naar GitHub gepusht of gepubliceerd.

Gecontroleerd: productiebuild; drie geautomatiseerde tests voor tekst zonder URL, statusovergangen, behoud van oorspronkelijke tekst, gescheiden opslag en foutbestendige opslag. Handmatig in de browser: lege Inbox, teksttip, aanvullen verplicht vóór bevestiging, bewerken, te bevestigen-filter, later bewaren, herladen, bevestigen en WhatsApp-simulatie. Mobiel op 390 px: pagina en inhoud beide 390 px, dialoog binnen het scherm. Bestaande categorie Koken, favorieten en recept met ingrediënten/stappen gecontroleerd. Microfoon, foto-invoer, alle browsers en volledige toegankelijkheid zijn niet afzonderlijk getest.

## Homepage-indeling — één mozaïek

Volgorde: hero → categorieën → één mozaïek met alle tips → kringactiviteiten en WhatsApp-uitnodiging → geel toevoegblok en afsluitende tekst. De aparte vriendenpreview is verwijderd. Vriendentips staan bovenaan in dezelfde lijst en hebben een herkenbaar label; de dropdown biedt ‘Enkel van vrienden’. In deze lokale preview is alleen Armalygal expliciet gemarkeerd als vriendentip van Anke & Bart (`fromFriends`); er is geen live vriendenrelatie gekoppeld. Andere bestaande tips blijven zichtbaar onder de vriendentips en worden niet als echte vriendentips voorgesteld.

De WhatsApp-kaart staat na de eerste twee tips in hetzelfde mozaïek (na de eerste bij één resultaat). Favorieten en reisresultaten tonen alleen tips. Beide WhatsApp-ingangen gebruiken hetzelfde felle groen (#25d366); toevoegen gebruikt geel (#ffc247). Desktop en 390 px mobiel gecontroleerd, inclusief dropdownfilter, sectievolgorde, één grid, WhatsApp-demo, gelijke kleuren en geen afgesneden kaartinhoud.

## Formulier voor idee toevoegen

Het oorspronkelijke uitgebreide formulier is terug: categoriepillen, optioneel inspreken, titel, omschrijving, foto’s, link en voornaam. Alleen de titel is verplicht; ook een korte titel zonder URL blijft mogelijk. Opslaan gaat eerst naar de privé-Inbox. De WhatsApp-demo behoudt de korte berichtinvoer. Het websiteformulier en bewaren van categorie/omschrijving zijn in de browser gecontroleerd.

## Vernieuwde detailpagina’s

Fotohero met dezelfde tags als de overzichtskaart, gedeelde bewaaractie, delen via gekopieerde link en lokale ervaringen. Armalygal heeft een voorbeeldavatar (AI, geen echte foto van Anke en Bart), praktische info boven de kaart en een horizontale fotogalerij met lightbox. De reacties zijn een eenvoudige lokale chat: bij typen verschijnt voor gasten een verplicht naamveld en een profiel-link die voorlopig alleen een melding toont. Bestaande lokale reacties blijven behouden.

Productiebuild en Inbox-tests slagen; galerie/lichtbox en gastchat met bewaren na herladen zijn in de browser gecontroleerd. Review-screenshots blijven lokale bestanden en zijn uitgesloten van Git.
