const http = require('http')
const fs = require('fs')

// const server = http.createServer((request, response) => {
//     console.log("New request received")
//     console.log(request.method);
    
//     response.end("This is a response from the server !!")    
// })

// server.listen(8000, '127.0.0.5', () => {
//     console.log("Server has started on http://192.168.0.1:8000");
// })


const html_file = fs.readFileSync('./Templates/Index.html', 'utf-8')

console.log(html_file);

const server2 = http.createServer((request, response) => {
    response.end(html_file)
    console.log('New request received');
})

server2.listen(8000, '127.0.0.1', () => {
    console.log('Server has started on http://127.0.0.1:8000');  
})