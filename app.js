// app.js

const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurações da autenticação
const auth = new google.auth.GoogleAuth({
    keyFile: 'credentials.json',
    scopes: ['https://www.googleapis.com/auth/calendar'],
});

const calendar = google.calendar({ version: 'v3', auth });

// Rota para criar uma nova reunião
app.post('/create-meeting', async (req, res) => {
    try {
        const { summary, startTime, endTime } = req.body;

        const event = {
            summary: summary,
            start: { dateTime: startTime },
            end: { dateTime: endTime },
            attendees: [],
        };

        const result = await calendar.events.insert({
            calendarId: 'primary',
            resource: event,
        });

        res.status(200).json({ message: 'Reunião criada com sucesso', data: result.data });
    } catch (error) {
        console.error('Erro ao criar reunião:', error);
        res.status(500).json({ error: 'Erro ao criar reunião' });
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
