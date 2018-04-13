(function () {
    var webSocket = null
    
    function send() {
        var userInput = document.getElementById('user-input')
        console.log('send :: userInput', userInput.value)
        var message = {
            author: 'Anonymous',
            data: userInput.value,
            type: 0
        }
        webSocket.send(JSON.stringify(message))
    }


    function init() {
        console.log('init ::')
        webSocket = new WebSocket('ws://127.0.0.1:8080')
        webSocket.onmessage = function(message) {
            console.log('ws :: got a message', message)
            
        }
    }

    window.send = send
    init()
})();
