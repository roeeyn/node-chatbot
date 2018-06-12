'use strict';
const BootBot = require('bootbot');
const config = require('config');

const bot = new BootBot({
    accessToken: config.get('accessToken'),
    verifyToken: config.get('verifyToken'),
    appSecret: config.get('appSecret')
});

bot.hear(['hello', 'hi', 'hey'], (payload, chat) => chat.say('Hello there!'));

// Regex Example
bot.hear([/echo (.*)/i], (payload, chat, data) => {

    const mensaje = data.match[1];
    chat.say(`Tu mensaje fue ${mensaje}`);

});

// Quick Replies Example
bot.hear(['comida'], (payload, chat) => {
    // Send a text message with quick replies
    chat.say({
        text: '¿Qué quieres comer hoy?',
        quickReplies: ['Pizza', 'Tacos', 'Chilaquiles']
    });

});

// Catch the Quick Replies Answers
bot.on('quick_reply', (payload, chat)=>{

    let answer = payload.message.text;
    chat.say(`Quick Reply -> ${answer}`);

});

// Catch attachments
bot.on('attachment', (payload, chat) => {

    // Send a GIF as an answer
    chat.say({
        attachment: 'image',
        url: 'https://media.giphy.com/media/lIxL9FLCPQPtu/giphy.gif'
    });

});

// Send a text message with buttons
bot.hear(['help'], (payload, chat) => {
    chat.say({
        text: 'What do you need help with?',
        buttons: [{
                type: 'postback',
                title: 'Settings',
                payload: 'HELP_SETTINGS'
            },
            {
                type: 'postback',
                title: 'FAQ',
                payload: 'HELP_FAQ'
            },
            {
                type: 'postback',
                title: 'Talk to a human',
                payload: 'HELP_HUMAN'
            }
        ]
    });
});

// Catch Postbacks of buttons
bot.on('postback:HELP_HUMAN', (payload, chat) => {

    chat.say("Te ayudaré").then(()=>{
        chat.say({
            attachment: 'image',
            url: 'https://media.giphy.com/media/phJ6eMRFYI6CQ/giphy.gif'
        },{
            typing:true
        });
    });

});

// Send Generic Templates
bot.hear(['botones'], (payload, chat) => {

    chat.say({
        elements: [{
                title: 'Articulo 1',
                image_url: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350',
                default_action: {
                    "type": "web_url",
                    "url": "https://www.google.com/"
                }
            },
            {
                title: 'Articulo 2',
                image_url: 'https://images.pexels.com/photos/104827/cat-pet-animal-domestic-104827.jpeg?auto=compress&cs=tinysrgb&h=350',
                default_action: {
                    "type": "web_url",
                    "url": "https://www.google.com/"
                }
            }
        ],
        buttons: [{
            type: 'postback',
            title: 'View More',
            payload: 'VIEW_MORE'
        }]
    });

});

// Bring your public info from Facebook
bot.hear(['stalker'], (payload, chat) => {

    chat.getUserProfile().then((user) => {

        console.log(user);
        chat.say(`Hola ${user.first_name}`);

    });

});

//Conversation Example
bot.hear('conversation', (payload, chat) => {

    const askName = (convo) => {
        convo.ask(`Cuál es tu nombre?`, (payload, convo) => {
            const text = payload.message.text;
            convo.set('name', text);
            convo.say(`Hola ${text}! :)`).then(() => askFavoriteFood(convo));
        });
    };

    const askFavoriteFood = (convo) => {
        convo.ask(`Cuál es tu comida favorita?`, (payload, convo) => {
            const text = payload.message.text;
            convo.set('food', text);
            convo.say(`${text} suena sabroso.`).then(() => sendSummary(convo));
        });
    };

    const sendSummary = (convo) => {
        convo.say(`Ok, entonces esto es lo que sé de ti:
	      - Nombre: ${convo.get('name')}
	      - Comida Favorita: ${convo.get('food')}`);
        convo.end();
    };

    chat.conversation((convo) => {
        askName(convo);
    });

});

bot.start();