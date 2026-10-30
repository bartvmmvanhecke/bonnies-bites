> Update 30 oktober 2026: de nieuwe private Inbox-flow en actuele validatie staan in [README.md](README.md). De onderstaande community-preview beschrijft de eerdere flow; nieuwe bijdragen gaan nu eerst naar de lokale Inbox.

# Bonnie’s Bites — community-preview

Branch: `ux/community-inspiratie` in de geïsoleerde werkkopie `work/bonnies-bites`.
De originele repository en de bestaande lokale wijzigingen zijn ongemoeid gelaten. De werkkopie bevat de bestaande lokale aanpassingen als uitgangspunt. Main liep bij inspectie twee commits achter op origin/main; vóór een uiteindelijke merge moet de branch met de actuele remote worden vergeleken en geïntegreerd.

## Structuur en UX

- Home: één heldere belofte, vier categorieën, zoeken en ideeënkaarten.
- Koken: alle zes bestaande recepten behouden, inclusief ingrediënten en stappen.
- Met de kids: activiteiten binnen en buiten.
- Eropuit: uitstappen én reizen onder één eenvoudige ingang.
- Kleine gelukjes: laagdrempelige inspiratie voor thuis en samen.
- Ontdekken: zoek op titel, omschrijving en trefwoorden; combineer met categorie en weinig tijd (maximaal ongeveer 30 minuten).
- Bewaard: lokale favorieten met teller. De bestaande favorietensleutel blijft behouden.
- Verras me: kiest een idee uit de huidige resultaten.
- Deel een idee: korte invoer → controle → lokaal bewaren → detail. Geen account of verplichte foto. Lokale ideeën kunnen weer verwijderd worden.
- Bestaande receptlinks blijven via `recipe.html?slug=…` en `#recept/…` bereikbaar.

## Branding

Kleurrijk geanimeerd logo, donkerblauw, roze, blauw en geel behouden. DynaPuff-koppen en Raleway sluiten aan op de bestaande richting. Rustige kaarten vervangen de onregelmatige mozaïek. Mobiel: categorieën in twee kolommen en ideeën in één kolom.

## Aanvullende rubrieken en features

Gebruik rubrieken eerst als filters of tijdelijke collecties; voorkom een drukke hoofdnavigatie:

1. Regenproof, gratis/onder €10 en klaar in 30 minuten.
2. Bonnie’s weekvondst: één redactioneel gekozen idee.
3. Dichtbij huis: regiofilter voor uitstappen; leeftijdsfilter bij kinderactiviteiten.
4. Samen met vrienden en seizoensvondsten als kleine collecties.
5. Later: ‘geprobeerd!’ en een korte ervaringsreactie. Vermijd een ingewikkeld beoordelingssysteem bij de start.

## Nog nodig voor een echte community

De preview is bewust geen gedeelde publicatieomgeving. Favorieten en bijdragen staan alleen in browseropslag. Er is geen verzending, database, upload, moderatie of account. De nieuwe niet-recepttips zijn expliciet als voorbeelden gelabeld; er zijn geen fictieve communityleden of beoordelingen toegevoegd. Voor publiek gebruik: gedeelde opslag, inzendwachtrij met beheergoedkeuring, optionele foto-upload en misbruikmelding implementeren. Zorg daarna voor echt aangeleverde tips en passende foto’s; bestaande externe receptfoto’s zijn gemarkeerde sfeerbeelden.

## Validatie

Productiebuild geslaagd. In de browser gecontroleerd: homepage, zoekterm ‘regen’ (twee resultaten), formulier invullen, controle, lokaal bewaren, detail en verwijderen van de testbijdrage. Mobiele homepage op 390 px visueel gecontroleerd; paginabreedte en inhoud beide 390 px. Geen volledige toegankelijkheidsaudit of controle op alle browsers uitgevoerd.

Niets gemerged, gepusht of gepubliceerd.
