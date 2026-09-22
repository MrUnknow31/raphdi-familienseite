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
| `firebase-config.js` | Firebase-Konfiguration (eigene Zugangsdaten) |

## Einrichtung

1. Projekt bei [Firebase](https://console.firebase.google.com) anlegen.
2. Unter **Authentication → Sign-in-Methode** die Anmeldung **E-Mail/Passwort** aktivieren.
3. Die eigene Konfiguration in `firebase-config.js` eintragen.
4. Änderungen mit `git push` veröffentlichen.

## Veröffentlichung

Die Seite wird über **GitHub Pages** bereitgestellt:

https://mrunknow31.github.io/raphdi-familienseite/

Jeder Push auf den `main`-Branch aktualisiert die Seite automatisch.

---

© 2026 Raphdi-LoGaKo. **Alle Rechte vorbehalten.**

Diese Website und alle ihre Inhalte sind ausschließlich für die Familie gedacht. Eine Verwendung, Vervielfältigung oder Veröffentlichung ohne ausdrückliche Genehmigung ist nicht gestattet. Es wird keine Open-Source-Lizenz erteilt.