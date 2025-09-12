// Core Modules
const fs = require("fs");
const http = require("http");
const url = require("url");
const events = require("events");

// Custom Modules
const replaceHTML = require("../Modules/replaceHTML");
const user = require("../Modules/user");

// ==================================================
//            Event Driven Architecture
// ==================================================

// const index_html = fs.readFileSync('./Templates/index2.html', 'utf-8')
// const products = JSON.parse(fs.readFileSync('./JSON/products.json', 'utf-8'))
// const prod_list = fs.readFileSync('./Templates/product-list.html', 'utf-8')
// const prod_details = fs.readFileSync('./Templates/product-details.html', 'utf-8')

// const server = http.createServer()

// server.on('request', (request, response) => {
//     let {query, pathname : path} = url.parse(request.url, true)

//     if(path === '/' || path.toLocaleLowerCase() === '/home') {
//         response.writeHead(200, {'Content-Type' : 'text/html'})
//         response.end(index_html.replace('{{%CONTENT%}}', '<h1>You are on Home Page</h1>'))
//     } else if(path.toLocaleLowerCase() === '/about') {
//         response.writeHead(200, {'Content-Type' : 'text/html'})
//         response.end(index_html.replace('{{%CONTENT%}}', '<h1>You are on About Page</h1>'))
//     } else if(path.toLocaleLowerCase() === '/products') {
//         if(!query.id) {
//             const prod_list_html = products.map((prod) => {
//                 return replaceHTML(prod_list, prod)
//             })
//             response.writeHead(200, {'Content-Type' : 'text/html'})
//             response.end(index_html.replace('{{%CONTENT%}}', prod_list_html.join(',')))
//         } else {
//             const prod_details_html = replaceHTML(prod_details, products[query.id])
//             response.writeHead(200, {'Content-Type' : 'text/html'})
//             response.end(index_html.replace('{{%CONTENT%}}', prod_details_html))
//         }
//     } else if(path.toLocaleLowerCase() === '/contact') {
//         response.writeHead(200, {'Content-Type' : 'text/html'})
//         response.end(index_html.replace('{{%CONTENT%}}', '<h1>You are on Contact Page</h1>'))
//     } else {
//         response.writeHead(404, {'Content-Type' : 'text/html'})
//         response.end(index_html.replace('{{%CONTENT%}}', '<h1>Error 404: Page Not Found</h1>'))
//     }
// })

// server.listen(8000, '127.0.0.1', () => {
//     console.log('Server has started on http://127.0.0.1:8000');
// })

// ==================================================
//                 Custom events
// ==================================================

// let customEventEmitter = new events.EventEmitter()

// customEventEmitter.on('userCreated', (name, id) => {
//     console.log(`New user ${name} with id ${id} is created`)
// })

// customEventEmitter.emit('userCreated', 'Naveen', 'A731')

// ==================================================
//          Custom events using custom modules
// ==================================================

let customEventEmitter = new user();

customEventEmitter.on("userCreated", (name, id) => {
  console.log(`New user ${name} with id ${id} is created`);
});

customEventEmitter.emit("userCreated", "Naveen", "A731");
