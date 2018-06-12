'use strict';
const BootBot = require('bootbot');
const config = require('config');

const bot = new BootBot({
    accessToken: config.get('accessToken'),
    verifyToken: config.get('verifyToken'),
    appSecret: config.get('appSecret')
});

bot.hear(['hello', 'hi', 'hey'], (payload, chat) => chat.say('Hello there!'));

bot.start();