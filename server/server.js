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

const wss = new WebSocket.Server({ port: 8080 })



wss.on('connection', function (ws) {
    console.log('wss :: connection')
    ws.on('message', function (message) {
        const parsedMessage = JSON.parse(message)        
        console.log(`${parsedMessage.author}: ${parsedMessage.data}`)
        if (parsedMessage.type === 0) {
            var response = {
                author: 'Server',
                data: 'Coucou :)',
                type: 0
            }
            ws.send(JSON.stringify(response))
        }
    })
})

console.log('WebSocket Server :: listening on port 8080')
