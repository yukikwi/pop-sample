const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: ["http://localhost:8080", "https://pop-sample.vercel.app"],
        methods: ["GET", "POST"],
        credentials: true
    }
});

let score_data = []

io.on('connection', (socket) => {
    socket.on('pop_data', (data) => {
        /*
        data: [
            {
                flag: country,
                score: score of this sec
            }
        ]
        */

        let item = score_data.find(x => x.country == data.country);
        if (item) {
            item.score = item.score + data["score"];
        }
        else{
            score_data.push({
                country: data.country,
                score: data["score"]
            })
        }

        io.emit('pop_leaderboard', score_data);
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});