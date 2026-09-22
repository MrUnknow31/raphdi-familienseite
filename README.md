# Raphdi-LoGaKo – Familienseite

Willkommen auf der Familienseite von Raphdi-LoGaKo. Eine private Website für unsere Familie – mit Anmeldung und einem geschützten Bereich für Familienmitglieder.

## Funktionen

- **Willkommensseite** mit Link zum Login
- **Benutzeranmeldung** per E-Mail und Passwort über Firebase Authentication
- **Registrierung** direkt auf der Login-Seite
- **Passwort zurücksetzen** per E-Mail
- **Geschützte Startseite**: nur angemeldete Mitglieder haben Zugriff
- Platzhalter für Familien-Kalender, Galerie, Kontakte und Nachrichten

## Technik

- Reines HTML, CSS und JavaScript (kein Framework)
- [Firebase Authentication](https://firebase.google.com/docs/auth) für das Login
- Gehostet über **GitHub Pages**

## Projektstruktur

| Datei | Zweck |
| --- | --- |
| `index.html` | Willkommensseite mit "Weiter zum Login" |
| `login.html` | Anmeldung, Registrierung und Passwort-Reset |
| `Startseite.html` | Geschützte Familien-Startseite |
| `admin.html` | Admin-Bereich für die Account-Verwaltung |
| `firebase-config.js` | Firebase-Konfiguration (eigene Zugangsdaten) |
| `netlify/functions/admin.js` | Admin-Backend (Netlify Function, Firebase Admin SDK) |

## Einrichtung

1. Projekt bei [Firebase](https://console.firebase.google.com) anlegen.
2. Unter **Authentication → Sign-in-Methode** die Anmeldung **E-Mail/Passwort** aktivieren.
3. Die eigene Konfiguration in `firebase-config.js` eintragen.
4. Änderungen mit `git push` veröffentlichen.

## Veröffentlichung

Die Seite wird über **GitHub Pages** bereitgestellt:

https://mrunknow31.github.io/raphdi-familienseite/

Jeder Push auf den `main`-Branch aktualisiert die Seite automatisch.

## Admin-Bereich (Account-Verwaltung)

Nutzerkonten werden über einen kleinen Admin-Bereich verwaltet. Er besteht aus einer Oberfläche (`admin.html`) und einem Mini-Backend (Netlify Function), das mit dem Firebase Admin SDK auf die Benutzer zugreift.

**Funktionen:** Nutzer auflisten, löschen, · E-Mail · Passwort · Namen ändern, Konten deaktivieren.

### Einmalige Einrichtung

1. **Service-Account-Schlüssel erstellen**
   - Firebase-Konsole → ⚙️ Projekteinstellungen → Registerkarte **Dienstkonten**
   - **"Neuen privaten Schlüssel generieren"** → lädt eine JSON-Datei herunter
   - Diese Datei ist **geheim** – niemals in den Code/Repo einfügen!

2. **Netlify-Konto & Deployment**
   - Konto auf https://app.netlify.com anlegen (kostenlos, ohne Kreditkarte)
   - **"Add new site" → "Import an existing project"** → dieses GitHub-Repository auswählen
   - Netlify erkennt `netlify/functions` automatisch und baut die Admin-Funktion
   - Danach Deploy auslösen

3. **Umgebungsvariablen setzen** (in Netlify: *Site configuration → Environment variables*)
   - `FIREBASE_SERVICE_ACCOUNT` = den kompletten Inhalt der JSON-Datei aus Schritt 1
   - `ADMIN_SECRET` = dein Admin-Passwort (frei wählbar)
   - Danach ein neues Deployment auslösen (Deploy → Clear cache and deploy)

4. **API-URL eintragen**
   - In `admin.html` den Wert von `API_URL` oben im Script ersetzen:
     `https://DEIN-PROJEKT.netlify.app/.netlify/functions/admin`

5. **Zugriff**
   - https://mrunknow31.github.io/raphdi-familienseite/admin.html
   - Mit dem `ADMIN_SECRET` freischalten

> Hinweis: Das Admin-Backend ist mit einem einfachen Passwort geschützt – für eine private Familienseite angemessen. Das Service-Account-JSON ist der eigentliche Schlüssel und darf nie in den Repository-Dateien landen (ist über `.gitignore`/Netlify-Env-Variablen abgesichert).

---

© 2026 Raphdi-LoGaKo. **Alle Rechte vorbehalten.**

Diese Website und alle ihre Inhalte sind ausschließlich für die Familie gedacht. Eine Verwendung, Vervielfältigung oder Veröffentlichung ohne ausdrückliche Genehmigung ist nicht gestattet. Es wird keine Open-Source-Lizenz erteilt.