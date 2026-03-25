# Admin Dashboard - Dokumentation

## Übersicht

Das Admin Dashboard ermöglicht es, alle Inhalte der Landing Pages visuell zu bearbeiten – ohne Code anzufassen. Texte, Farben und Bilder können direkt im Browser geändert werden.

## Schnellstart

### 1. Passwort setzen

In der `.env` Datei im Projektordner:

```env
ADMIN_PASSWORD=dein-sicheres-passwort
```

> Standard-Passwort ist `admin`. Bitte vor dem Deployment ändern!

### 2. Dev-Server starten

```bash
npm run dev
```

### 3. Dashboard öffnen

```
http://localhost:3000/admin
```

Passwort eingeben → Dashboard öffnet sich.

---

## Dashboard-Bereiche

### Firmendaten (`/admin/dashboard` → Tab "Firmendaten")

Hier werden alle Unternehmensinformationen verwaltet, die auf der gesamten Website verwendet werden:

| Feld | Verwendet in |
|------|-------------|
| Firmenname | Header, Impressum, Datenschutz |
| Logo | Header (Upload oder URL) |
| Adresse | Impressum, Datenschutz |
| Telefon | Header, Impressum |
| E-Mail | Impressum, Datenschutz |
| Website | Impressum, Datenschutz |
| Geschäftsführer | Impressum |
| Handelsregister | Impressum |
| USt-ID | Impressum |
| Datenschutz-Verantwortlicher | Datenschutz |
| Hosting-Anbieter | Datenschutz |

### Farben (`/admin/dashboard` → Tab "Farben")

Das Farbschema der Landing Pages:

| Farbe | Verwendung |
|-------|-----------|
| **Primärfarbe** | Buttons, Links, Badges, Akzente |
| **Primärfarbe (dunkel)** | Button-Hover, dunkle Variante |
| **Primärfarbe (hell)** | Helle Badges, Icons |
| **Akzentfarbe** | Dunkle Kontrastfarbe |

> Nach dem Speichern der Farben wird automatisch die CSS-Datei (`globals.css`) aktualisiert. Der Dev-Server lädt die Seite automatisch neu (HMR).

### Tracking & Analytics (`/admin/dashboard` → Tab "Tracking")

Alle Tracking-Tools können hier aktiviert/deaktiviert und konfiguriert werden. **Alle Tools sind DSGVO-konform** – sie werden erst nach Einwilligung des Nutzers geladen.

| Tool | Consent-Typ | Benötigte Angaben |
|------|-------------|-------------------|
| **Meta Pixel** | Marketing | Pixel ID, optional: CAPI Token + CAPI Pixel ID |
| **Google Analytics 4** | Analyse | Measurement ID (G-XXXXXXXXXX) |
| **Google Tag Manager** | Marketing | Container ID (GTM-XXXXXXX) |
| **PostHog** | Analyse | API Key, API Host |
| **Matomo** | Analyse | Matomo URL, Site ID |

**DSGVO-Automatisierung:**
- Der **Cookie-Banner** zeigt automatisch nur die aktivierten Tool-Kategorien an
- Die **Datenschutzerklärung** listet automatisch nur die aktivierten Tools auf
- **Marketing-Tools** (Meta Pixel, GTM) erfordern Marketing-Consent
- **Analyse-Tools** (GA4, PostHog, Matomo) erfordern Analyse-Consent
- Kein Tool wird ohne Einwilligung geladen

**Meta Conversions API (CAPI):**
Die serverseitige Conversions API sendet Lead-Events an Meta, wenn ein Kontaktformular abgeschickt wird. Daten werden vor der Übermittlung mit SHA-256 gehasht. CAPI-Token und Pixel-ID werden im Tracking-Tab konfiguriert.

### Seite: Verkauf (`/admin/dashboard` → Tab "Seite: Verkauf")

Landing Page für Eigentümer, die ihre Immobilie verkaufen möchten.

**Bearbeitbare Sektionen:**
- SEO / Meta-Daten (Titel, Beschreibung)
- Hero-Bereich (Headline, Subheadline, CTA-Button, Trust-Badges, Bild)
- Problem-Bereich (4 Pain Points mit Icon, Titel, Beschreibung)
- Prozess / 3 Schritte
- Vorteile (6 Benefits mit Icon, Titel, Beschreibung)
- Kundenstimmen (Testimonials mit Name, Rolle, Text, Foto)
- FAQ (Fragen & Antworten)
- Call-to-Action (CTA-Block)
- Kontaktformular (Labels, Erfolgsmeldung)
- Footer

### Seite: Akquise (`/admin/dashboard` → Tab "Seite: Akquise")

Landing Page für Eigentümer-Akquise (Wertermittlung). Gleiche Struktur wie Verkauf, andere Inhalte.

---

## Bilder hochladen

Bilder können an folgenden Stellen hochgeladen werden:

- **Logo** (Firmendaten)
- **Hero-Bild** (jede Landing Page)
- **Testimonial-Fotos** (Kundenstimmen)

### So funktioniert es:

1. "Bild auswählen" klicken
2. Datei auswählen (JPG, PNG, WebP, SVG, GIF – max. 5MB)
3. Bild wird nach `/public/uploads/` gespeichert
4. URL wird automatisch eingetragen

Alternativ kann auch eine URL manuell eingegeben werden (z.B. für externe Bilder).

---

## Technische Details

### Datenspeicherung

Alle Inhalte werden als JSON-Dateien im `/data/` Ordner gespeichert:

```
data/
├── site.json      → Firmendaten
├── theme.json     → Farbschema
├── verkauf.json   → Verkauf-Seite Content
└── akquise.json   → Akquise-Seite Content
```

Die TypeScript-Config-Dateien (`config/site.ts`, `config/theme.ts`, `content/verkauf.ts`, `content/akquise.ts`) lesen automatisch aus diesen JSON-Dateien. Beim Build werden die JSON-Daten in die Seiten eingebettet.

### API-Endpunkte

| Endpunkt | Methode | Beschreibung |
|----------|---------|-------------|
| `/api/admin/auth` | POST | Login/Logout |
| `/api/admin/site` | GET/POST | Firmendaten lesen/speichern |
| `/api/admin/theme` | GET/POST | Farben lesen/speichern |
| `/api/admin/content?page=verkauf` | GET | Content lesen |
| `/api/admin/content` | POST | Content speichern |
| `/api/admin/upload` | POST | Bild hochladen |

### Authentifizierung

- Passwort wird in `.env` als `ADMIN_PASSWORD` gesetzt
- Login setzt ein httpOnly-Cookie (24h gültig)
- Alle API-Endpunkte prüfen das Cookie
- Dashboard-Seite leitet nicht-authentifizierte User zur Login-Seite um

### Icons

Für Icons werden [Lucide React](https://lucide.dev/icons/) Icon-Namen als Text verwendet. Beispiele:

- `Clock`, `TrendingDown`, `UserX`, `ShieldAlert`
- `Search`, `Camera`, `Handshake`, `Home`
- `BadgeEuro`, `Users`, `Heart`, `ShieldCheck`
- `Star`, `MapPin`, `FileText`, `ClipboardList`

Alle verfügbaren Icons: https://lucide.dev/icons/

---

## Workflow für Leads

### Ersteinrichtung

1. Projekt klonen / herunterladen
2. `npm install` ausführen
3. `.env` Datei anlegen mit eigenem Passwort
4. `npm run dev` starten
5. `localhost:3000/admin` öffnen
6. Alle Daten anpassen:
   - Firmendaten eingeben
   - Farben anpassen
   - Texte für Verkauf-Seite anpassen
   - Texte für Akquise-Seite anpassen
   - Logo und Bilder hochladen
7. Ergebnis prüfen auf `localhost:3000`
8. Deployen (z.B. auf Vercel)

### Änderungen nach dem Deployment

1. Projekt lokal starten (`npm run dev`)
2. Im Admin Dashboard Änderungen vornehmen
3. Neu deployen

> **Wichtig:** Das Admin Dashboard funktioniert nur im lokalen Development-Modus (`npm run dev`), da es direkt in die Projektdateien schreibt. Auf Vercel (Production) sind die Dateien read-only.

---

## Projekt-Struktur

```
immo-makler/
├── app/
│   ├── admin/              ← Admin Dashboard
│   │   ├── page.tsx        ← Login-Seite
│   │   └── dashboard/
│   │       └── page.tsx    ← Dashboard (auth-geschützt)
│   ├── api/admin/          ← API Routes
│   │   ├── auth/route.ts
│   │   ├── content/route.ts
│   │   ├── site/route.ts
│   │   ├── theme/route.ts
│   │   └── upload/route.ts
│   ├── verkauf/page.tsx    ← Verkauf Landing Page
│   ├── akquise/page.tsx    ← Akquise Landing Page
│   └── page.tsx            ← Homepage (Auswahl)
├── components/
│   ├── admin/              ← Admin UI Komponenten
│   │   ├── AdminDashboard.tsx
│   │   ├── ContentEditor.tsx
│   │   ├── SiteEditor.tsx
│   │   ├── ThemeEditor.tsx
│   │   ├── SaveButton.tsx
│   │   └── ImageUpload.tsx
│   ├── sections/           ← Landing Page Sektionen
│   └── ui/                 ← Shared UI Komponenten
├── config/                 ← TS-Wrapper (liest aus data/)
├── content/                ← TS-Wrapper (liest aus data/)
├── data/                   ← JSON-Dateien (vom Admin geschrieben)
│   ├── site.json
│   ├── theme.json
│   ├── verkauf.json
│   └── akquise.json
├── lib/
│   └── admin-auth.ts       ← Auth-Logik
├── public/
│   └── uploads/            ← Hochgeladene Bilder
├── docs/
│   └── ADMIN-DASHBOARD.md  ← Diese Datei
├── .env                    ← Lokale Umgebungsvariablen
└── .env.example            ← Vorlage
```
