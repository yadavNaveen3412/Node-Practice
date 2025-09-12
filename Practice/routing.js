const http = require('http')
const fs = require('fs')



// ==================================================
//                        Routing                         
// ==================================================

// const server = http.createServer((request, response) => {
//     let path = request.url

//     if(path === '/' || path.toLocaleLowerCase() === '/home'){
//         response.end('Home page is being displayed')
//     } else if (path.toLocaleLowerCase() === '/about') {
//         response.end('About page is being displayed')
//     } else if (path.toLocaleLowerCase() === '/contact') {
//         response.end('Contact page is being displayed')
//     } else {
//         response.end('404! Page not found');   //Fallback route
//     }
// })

// server.listen(8000, '127.0.0.1', () => {
//     console.log('Server has started on http://127.0.0.1:8000')
// })



// ==================================================
//           Routing with multiple Templates                         
// ==================================================

// const server = http.createServer((request, response) => {
//     let path = request.url

//     if(path === '/' || path.toLocaleLowerCase() === '/home'){
//         response.end(fs.readFileSync('./Templates/home.html', 'utf-8'))
//     } else if (path.toLocaleLowerCase() === '/about') {
//         response.end(fs.readFileSync('./Templates/about.html', 'utf-8'))
//     } else if (path.toLocaleLowerCase() === '/contact') {
//         response.end(fs.readFileSync('./Templates/contact.html', 'utf-8'))
//     } else {
//         response.end('404! Page not found');   //Fallback route
//     }
// })

// server.listen(8000, '127.0.0.1', () => {
//     console.log('Server has started on http://127.0.0.1:8000')
// })



// ==================================================
//            Routing with single template                         
// ==================================================

// const html_file = fs.readFileSync('./Templates/index2.html', 'utf-8')
// const server = http.createServer((request, response) => {
//     let path = request.url

//     if(path === '/' || path.toLocaleLowerCase() === '/home'){
//         response.end(html_file.replace('{{%CONTENT%}}', '<h1>This is Home Page</h1>'))
//     } else if (path.toLocaleLowerCase() === '/about') {
//         response.end(html_file.replace('{{%CONTENT%}}', '<h1>This is About Page</h1>'))
//     } else if (path.toLocaleLowerCase() === '/contact') {
//         response.end(html_file.replace('{{%CONTENT%}}', '<h1>This is Contact Page</h1>'))
//     } else {
//         response.end(html_file.replace('{{%CONTENT%}}', '<h1>Error 404: Page not found</h1>'));   //Fallback route
//     }
// })

// server.listen(8000, '127.0.0.1', () => {
//     console.log('Server has started on http://127.0.0.1:8000')
// })



// ==================================================
//              Adding Response Headers                         
// ==================================================

// const html_file = fs.readFileSync('./Templates/index2.html', 'utf-8')
// const server = http.createServer((request, response) => {
//     let path = request.url

//     if(path === '/' || path.toLocaleLowerCase() === '/home'){
//         response.writeHead(200, {
//             'Content-Type' : 'text/html',
//             'custom-header' : 'Hello'
//         })
//         response.end(html_file.replace('{{%CONTENT%}}', '<h1>This is Home Page</h1>'))
//     } else if (path.toLocaleLowerCase() === '/about') {
//         response.writeHead(200, {
//             'Content-Type' : 'text/html',
//             'custom-header' : 'Hello'
//         })
//         response.end(html_file.replace('{{%CONTENT%}}', '<h1>This is About Page</h1>'))
//     } else if (path.toLocaleLowerCase() === '/contact') {
//         response.writeHead(200, {
//             'Content-Type' : 'text/html',
//             'custom-header' : 'Hello'
//         })
//         response.end(html_file.replace('{{%CONTENT%}}', '<h1>This is Contact Page</h1>'))
//     } else {
//         response.writeHead(404, {
//             'Content-Type' : 'text/html',
//             'custom-header' : 'Hello'
//         })
//         response.end(html_file.replace('{{%CONTENT%}}', '<h1>Error 404: Page not found</h1>'));   //Fallback route
//     }
// })



// server.listen(8000, '127.0.0.1', () => {
//     console.log('Server has started on http://127.0.0.1:8000')
// })