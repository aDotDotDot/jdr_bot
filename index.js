const express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    bodyParser = require('body-parser');
const path= require('path');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const Discord = require('discord.js');

const auth = require('./auth.json');
const bot = new Discord.Client();
const channelId = "<ICI l'IDENTIFIANT DU CHANNEL OÙ ÉCRIRE>";

bot.on('ready', (evt) => {
    console.info('Connected');
    console.info('Logged in as: ');
    console.info(bot.user.username + ' - (' + bot.user.id + ')');
    app.route('/')
        .get((req,res) => {
            res.sendFile(path.join(__dirname + '/index.html'))
            
        });
    app.route('/sendmsg')
        .post((req,res) => {
            let msg = req.body.message;
            bot.channels.get(channelId).send(msg)
            .then(message => {
                res.send("ok");
            })
            .catch(err=>{
                res.send("error");
            });
        });
    app.listen(port);
});


bot.login(auth.token);
