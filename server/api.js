const http = require('http');
const { DateTime } = require('luxon');
const locations = require('./locations.json');
const insights = require('./insights.json');

const api = http.createServer(function (req, res) {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'OPTIONS, POST, GET',
        'Access-Control-Max-Age': 2592000, // 30 days
        'Content-Type': 'application/json',
    };

    if (req.method === 'OPTIONS') {
        res.writeHead(204, headers);
        res.end();
        return;
    }

    if (req.url === '/locations') {
        res.writeHead(200, headers);
        res.write(JSON.stringify(locations));
        res.end();
        return;
    }

    if (req.url === "/insights") {
        res.writeHead(200, headers);
        res.write(JSON.stringify(insights));
        res.end();
        return;
    }

    if (req.url === "/events") {
        res.writeHead(200, headers);
        res.write(JSON.stringify(randomCombinations()));
        res.end();
        return;
    }

    res.writeHead(500, headers);
    res.end(JSON.stringify({ error: 'Invalid Request!' }));
});

function randomCombinations() {
    const now = DateTime.local().startOf('minute');

    return locations.flatMap(location => insights.map(insight => ({
        location: location.id,
        insight: insight.id,
        events: randomEvents(now),
    })));
}

function randomEvents(now) {
    const numberOfEvents = randomInt(0, 6);
    let end = now;

    return Array.from({ length: numberOfEvents }, () => {
        const randomDelayFromEnd = randomInt(0, 24) * 2;
        const randomDelay = randomInt(2, 12) * 2;

        const startTime = end.plus({ hours: randomDelayFromEnd });
        end = startTime.plus({ hours: randomDelay });

        return {
            startTime: startTime.toUTC(),
            endTime: end.toUTC(),
        }
    });
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

api.listen(5000);
