// Wetterapp.js
const express = require('express');
// const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

app.get('/temperature/:plz', async (req, res) => {
  const plz = req.params.plz;

  if (!/^\d{4}$/.test(plz)) {
    return res.status(400).json({ error: 'Ungültige Postleitzahl' });
  }

  const url = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${plz}00`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(response.status).json({ error: 'Fehler beim Abrufen der Daten' });
    }

    const data = await response.json();
    const temperature = data.currentWeather?.temperature;

    if (temperature === undefined) {
      return res.status(404).json({ error: 'Temperaturdaten nicht gefunden' });
    }

    res.json({ plz, temperature });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Serverfehler' });
  }
});

app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
