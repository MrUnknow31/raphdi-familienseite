const admin = require('firebase-admin');

let app = null;

function getApp() {
  if (!app) {
    const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
    app = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  return app;
}

const ERLAUBTE_ORIGINE = [
  'https://mrunknow31.github.io',
  'http://localhost:3000',
  'http://localhost:8888'
  // 'https://DEIN-PROJEKT.netlify.app' hier eintragen, falls du die Seite dort öffnest
];

exports.handler = async (event) => {
  const origin = event.headers.origin || '';
  const erlaubt = ERLAUBTE_ORIGINE.some((o) => origin.startsWith(o));
  const headers = {
    'Access-Control-Allow-Origin': erlaubt ? origin : 'https://mrunknow31.github.io',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ ok: false, error: 'Nur POST erlaubt.' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ ok: false, error: 'Ungültige Anfrage.' }) };
  }

  if (!process.env.ADMIN_SECRET || body.adminKey !== process.env.ADMIN_SECRET) {
    return { statusCode: 401, headers, body: JSON.stringify({ ok: false, error: 'Unbefugt.' }) };
  }

  if (!process.env.FIREBASE_SERVICE_ACCOUNT) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: 'Firebase-Service-Account fehlt.' }) };
  }

  try {
    const ergebnis = await bearbeite(getApp().auth(), body);
    return { statusCode: 200, headers, body: JSON.stringify(ergebnis) };
  } catch (fehler) {
    return { statusCode: 500, headers, body: JSON.stringify({ ok: false, error: fehler.message }) };
  }
};

async function bearbeite(auth, body) {
  switch (body.action) {
    case 'list': {
      const ergebnis = await auth.listUsers(500, body.pageToken || undefined);
      return {
        ok: true,
        users: ergebnis.users.map(zuFrontend),
        nextPageToken: ergebnis.pageToken || null
      };
    }

    case 'update': {
      if (!body.uid) throw new Error('Es fehlt die uid.');
      const daten = {};
      if (typeof body.disabled === 'boolean') daten.disabled = body.disabled;
      if (typeof body.email === 'string' && body.email.trim()) daten.email = body.email.trim();
      if (typeof body.displayName === 'string' && body.displayName.trim()) daten.displayName = body.displayName.trim();
      if (typeof body.password === 'string' && body.password) {
        if (body.password.length < 6) throw new Error('Das Passwort braucht mindestens 6 Zeichen.');
        daten.password = body.password;
      }
      if (Object.keys(daten).length === 0) throw new Error('Es wurden keine Änderungen übergeben.');
      const nutzer = await auth.updateUser(body.uid, daten);
      return { ok: true, user: zuFrontend(nutzer) };
    }

    case 'delete': {
      if (!body.uid) throw new Error('Es fehlt die uid.');
      if (body.uid === body.eigeneUid) throw new Error('Du kannst dein eigenes Admin-Konto nicht löschen.');
      await auth.deleteUser(body.uid);
      return { ok: true };
    }

    default:
      throw new Error('Unbekannte Aktion.');
  }
}

function zuFrontend(nutzer) {
  return {
    uid: nutzer.uid,
    email: nutzer.email || null,
    displayName: nutzer.displayName || null,
    disabled: nutzer.disabled,
    emailVerified: nutzer.emailVerified,
    erstellt: nutzer.metadata?.creationTime || null,
    zuletzt: nutzer.metadata?.lastSignInTime || null
  };
}