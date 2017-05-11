'use strict';

const express = require('express');
const http = require('http');
const socket = require('socket.io');
const $ = require("jquery");

// Constants
const PORT = 80;

// App
const app = express();

// app.listen(PORT);

// Server
const server = http.Server(app);


// Socket
const io = socket.listen(server);





app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// set the view engine to ejs
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index.ejs', {web_app_name: "Cyborg"});
});

app.get('/init', function(req, res) {
    console.log('ex function');
    var childProcess = require('child_process'),
       ls, run;


   ls = childProcess.exec('ls -l', function (error, stdout, stderr) {    if (error) {
       console.log(error.stack);
       console.log('Error code: '+error.code);
       console.log('Signal received: '+error.signal);    }    console.log('Child Process STDOUT: '+stdout);    console.log('Child Process STDERR: '+stderr);  });

   run = childProcess.exec('PORT=81 node game/jeuSV/server.js', function (error, stdout, stderr) {    if (error) {
  //  ls = childProcess.exec('ls -l', function (error, stdout, stderr) {    if (error) {
       console.log(error.stack);
       console.log('Error code: '+error.code);
       console.log('Signal received: '+error.signal);    }    console.log('Child Process STDOUT: '+stdout);    console.log('Child Process STDERR: '+stderr);  });

  //  ls.on('exit', function (code) {    console.log('Child process exited with exit code '+code);  });
    res.render('example.ejs', {web_app_name: "Cyborg"});
});

app.get('/game', function(req, res) {
    res.redirect('http://172.17.0.2:81');
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});

io.sockets.on('connection', function (socket, pseudo) {
    // Quand un client se connecte, on lui envoie un message
    socket.emit('message', 'Vous êtes bien connecté !');
    // On signale aux autres clients qu'il y a un nouveau venu
    socket.broadcast.emit('message', 'Un autre client vient de se connecter ! ');

    // Dès qu'on nous donne un pseudo, on le stocke en variable de session
    socket.on('pseudo', function(pseudo) {
        socket.pseudo = pseudo;
    });

    // Dès qu'on reçoit un "message" (clic sur le bouton), on le note dans la console
    socket.on('message', function (message) {
        // On récupère le pseudo de celui qui a cliqué dans les variables de session
        console.log(socket.pseudo + ' me parle ! Il me dit : ' + message);
    });
});

server.listen(PORT)


console.log('Running on http://localhost:' + PORT);
