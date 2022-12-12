const http = require('http')


http.createServer((request, response) => {



  response.end(JSON.stringify({
    data: 'Hello World!'
  }))
}).listen(7000, () => console.log('Listening on port 7000'))