# Idee delen — voorstel

Branch: `add-idea`. Wat er nu gebouwd is, staat onder **Gebouwd**. Wat nog een backend nodig heeft, staat onder **Volgende stap**.

## Gebouwd (werkt lokaal, zonder server)

- **Context gaat mee.** Wie in een categorie zit, deelt meteen in die categorie. Bij Campings gaat ook de gekozen bestemming mee (bv. `Campings · Spanje`). Vanaf de homepage zonder filter kies je eerst een categorie, met één tik op een gekleurd bolletje. ‘wijzig’ opent de keuze alsnog.
- **Een ‘+’-kaart in elke gefilterde lijst.** Eerste kaart in het rooster, bv. ‘Jouw camping in Spanje?’. Eén tik, en het formulier staat klaar.
- **De campingpagina** linkt naar `/?deel=Campings&regio=Spanje`, dus ook daar staat alles al ingevuld.
- **Het formulier is kort:** titel (verplicht), ‘Wat vond je er zo leuk aan?’ (optioneel), foto’s (maximaal 4, verkleind op het toestel zelf) en een optionele link.
- **Inspreken.** De knop ‘Vertel het gewoon’ gebruikt de spraakherkenning van de browser (`nl-BE`). De eerste zin wordt de titel, de rest het ‘waarom’. Zonder ondersteuning verdwijnt de knop gewoon.
- **Naam maar één keer.** Daarna staat er ‘Gedeeld als Bart · niet jij?’. Elk toestel krijgt een anoniem id (`bb-me`), zodat ideeën later aan een account gekoppeld kunnen worden.
- **Na het delen:** ‘Bekijk mijn camping’ of ‘Nog eentje’. Die tweede keuze opent hetzelfde formulier, met dezelfde context.

Alles wordt nog alleen in de browser bewaard (`bb-community-drafts`).

## Spraak naar tekst: zo goedkoop mogelijk

1. **Gratis eerst: de browser.** Chrome, Edge en Safari (ook op iPhone) hebben spraakherkenning ingebouwd. Dat kost ons niets en is al gebouwd. Nadeel: Chrome stuurt de audio naar Google, en Firefox kan het niet.
2. **Back-up op de server: Whisper.** Voor browsers zonder spraakherkenning nemen we een kort audiofragment op (`MediaRecorder`) en sturen dat naar een goedkope Whisper-dienst, zoals Groq (`whisper-large-v3-turbo`) of OpenAI `gpt-4o-mini-transcribe`. Beide kosten een fractie van een cent per minuut; een idee inspreken duurt ±20 seconden. Kijk de actuele prijzen na voor je kiest.
3. **Het agentje ordent.** Na het transcript vult een klein taalmodel (Claude Haiku) de velden netjes in: titel, waarom, categorie, plaats. De ‘eerste zin = titel’-regel van nu is dan enkel nog de reserve.

## De agent die ‘de rest’ ophaalt

Na het delen gaat het idee naar een wachtrij. Een achtergrondfunctie (bv. een Netlify Background Function) roept Claude Haiku aan met websearch en vult aan:

| Soort | Wat de agent erbij zoekt |
|---|---|
| Camping | officiële website, adres, coördinaten → kaart, type, voorzieningen, seizoen, prijsindicatie |
| Recept | ingrediënten en stappen uit de link, of een voorstel op basis van de titel; bereidingstijd |
| Uitstap / met de kids | adres, openingsuren, prijs, leeftijd, binnen/buiten, regenproof |
| Kleine gelukjes | tijd, budget, benodigdheden |

Alles wat de agent toevoegt, wordt gemarkeerd als ‘aangevuld door Bonnie’, met de bron erbij. De deler krijgt een melding en kan het aanpassen. Publicatie gebeurt pas na goedkeuring, door jou of door een eenvoudige moderatiestap.

## Account zonder drempel

Voorstel: **Supabase** (database, foto-opslag en login in één, met een gratis instapniveau).

1. **Eerst anoniem.** Bij het eerste idee maakt de site stil een anoniem account aan (Supabase anonymous sign-in). De naam is de enige vraag. Dit sluit aan op het toestel-id dat nu al bestaat.
2. **Later bewaren.** Na het delen vragen we: ‘Wil je je ideeën terugvinden op je gsm en laptop? Laat je e-mail achter.’ Er volgt een magic link, zonder wachtwoord. Daarmee wordt het anonieme account een echt account, met alle eerdere ideeën erbij.
3. **Daarna:** passkeys (Face ID / vingerafdruk) of ‘Log in met Google/Apple’ als extra snelle optie.

Zo weten jullie wie wat deelde, maar hoeft niemand vooraf een account aan te maken.

## Nog sneller

- **Delen vanuit andere apps (PWA share target).** Vanuit Google Maps, Instagram of een receptensite op ‘Delen → Bonnie’s Bites’ tikken. De link en de foto staan dan al in het formulier.
- **Plakken = klaar.** Plak je een link als titel, dan haalt de agent de naam en een foto zelf op.
- **Foto-locatie.** De GPS-gegevens uit een vakantiefoto vullen de plek en het land voor campings en uitstappen in. Hou dat privé: alleen gebruiken voor de stad of regio, nooit tonen.
- **Foto eerst.** Een knop ‘Begin met een foto’ op gsm: het model herkent het gerecht of de plek en stelt een titel voor.
- **Concept bewaren.** Halfvolle formulieren blijven staan als je het venster per ongeluk sluit.

## Wat nog kan ingegeven worden (optioneel, als snelle tikjes)

- Algemeen: **Gratis / < €10**, **Regenproof**, **Klaar in 30 min**, **Met vrienden**, seizoen.
- Met de kids: **leeftijd** (0–3, 4–7, 8–12, tieners).
- Campings: **wanneer geweest**, **met tent / camper / bungalow**, **kindvriendelijk**, **honden welkom**, één ding dat tegenviel.
- Koken: **vegetarisch**, **kids eten het ook**, **aantal personen**.

Hou het formulier zelf kort. De tikjes kunnen ook pas verschijnen op het bedankscherm: ‘Wil je nog 2 tikjes geven?’.

## Volgende stap (nodig om echt te publiceren)

1. Supabase-project met de tabellen `ideas` en `photos` en anonieme login, met regels zodat iedereen alleen zijn eigen concepten kan aanpassen.
2. Een functie `POST /api/ideas` die het idee opslaat, de foto’s uploadt en de agent in de wachtrij zet.
3. De agentfunctie (Claude Haiku met websearch) en een eenvoudige goedkeuringslijst voor jou.
4. Foto’s comprimeren gebeurt al in de browser. Op de server komt er nog een check op ongepaste beelden bij.
