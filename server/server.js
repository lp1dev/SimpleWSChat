/* 

   Protocole de communication client/serveur:


   Les clients vont échanger avec le serveur des messages de type
   Message, définis par cette spécification :

   Message {
    author: '${auteur du message}', //string
    data: '${la donnée dans le message}, //string
    type: '${le type de message}' //nombre
   }

   Il y a deux types de messages :
   
   0 : message texte
   1 : URL d'une image

*/

const WebSocket = require('ws')
const users = [] // Contient les websockets crées avec les utilisateurs
const wss = new WebSocket.Server({ port: 8080 })

function dispatchAll(message) {
    console.log('dispatchAll ::', message)
    users.forEach(function (ws) {
        ws.send(JSON.stringify(message))
    })
}

function onMessage(message) {
    const parsedMessage = JSON.parse(message)        
    console.log(`${parsedMessage.author}: ${parsedMessage.data}`)
    dispatchAll(parsedMessage)
    if (parsedMessage.type === 0) {
        var response = {
            author: 'Server',
            data: 'Coucou :)',
                type: 0
        }
        //ws.send(JSON.stringify(response))
    }    
}

wss.on('connection', function (ws) {
    users.push(ws)
    console.log('users', users.length)
    console.log('wss :: connection')
    ws.on('message', onMessage)
})

console.log('WebSocket Server :: listening on port 8080')
