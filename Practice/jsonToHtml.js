// Core Modules
const fs = require("fs");
const http = require("http");
const url = require("url");

// Custom Modules
const replaceHTML = require("../Modules/replaceHTML");

// ==================================================
//           Transforming JSON data to HTML
// ==================================================

// const index_html = fs.readFileSync('./Templates/index2.html', 'utf-8')
// const prod_list = fs.readFileSync('./Templates/product-list.html', 'utf-8')
// const products = JSON.parse(fs.readFileSync('./JSON/products.json', 'utf-8'))

// const prod_list_html = products.map((prod) => {
//     let output = prod_list.replace('{{%PROD_IMG%}}', prod.productImage)

//     output = output.replace('{{%PROD_NAME%}}', prod.name)
//     output = output.replace('{{%MODEL_NAME%}}', prod.nodeName)
//     output = output.replace('{{%MODEL_NO%}}', prod.modelNumber)
//     output = output.replace('{{%SIZE%}}', prod.size)
//     output = output.replace('{{%CAMERA%}}', prod.camera)
//     output = output.replace('{{%PRICE%}}', prod.price)
//     output = output.replace('{{%COLOR%}}', prod.color)

//     return output
// })

// const server = http.createServer((request, response) => {
//     let path = request.url

//     if(path === '/' || path.toLocaleLowerCase() === '/home') {
//         response.writeHead(200, {'Content-Type' : 'text/html'})
//         response.end(index_html.replace('{{%CONTENT%}}', '<h1>You are on Home Page</h1>'))
//     } else if(path.toLocaleLowerCase() === '/about') {
//         response.writeHead(200, {'Content-Type' : 'text/html'})
//         response.end(index_html.replace('{{%CONTENT%}}', '<h1>You are on About Page</h1>'))
//     } else if(path.toLocaleLowerCase() === '/products') {
//         response.writeHead(200, {'Content-Type' : 'text/html'})
//         response.end(index_html.replace('{{%CONTENT%}}', prod_list_html.join(',')))
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
//          Query String Parsing using url
// ==================================================

// const index_html = fs.readFileSync('./Templates/index2.html', 'utf-8')
// const prod_list = fs.readFileSync('./Templates/product-list.html', 'utf-8')
// const products = JSON.parse(fs.readFileSync('./JSON/products.json', 'utf-8'))

// const prod_list_html = products.map((prod) => {
//     let output = prod_list.replace('{{%PROD_IMG%}}', prod.productImage)

//     output = output.replace('{{%PROD_NAME%}}', prod.name)
//     output = output.replace('{{%MODEL_NAME%}}', prod.nodeName)
//     output = output.replace('{{%MODEL_NO%}}', prod.modelNumber)
//     output = output.replace('{{%SIZE%}}', prod.size)
//     output = output.replace('{{%CAMERA%}}', prod.camera)
//     output = output.replace('{{%PRICE%}}', prod.price)
//     output = output.replace('{{%COLOR%}}', prod.color)
//     output = output.replace('{{%ID%}}', `?id=${prod.id}`)

//     return output
// })

// const server = http.createServer((request, response) => {
//     let {query, pathname : path} = url.parse(request.url, true)

//     if(path === '/' || path.toLocaleLowerCase() === '/home') {
//         response.writeHead(200, {'Content-Type' : 'text/html'})
//         response.end(index_html.replace('{{%CONTENT%}}', '<h1>You are on Home Page</h1>'))
//     } else if(path.toLocaleLowerCase() === '/about') {
//         response.writeHead(200, {'Content-Type' : 'text/html'})
//         response.end(index_html.replace('{{%CONTENT%}}', '<h1>You are on About Page</h1>'))
//     } else if(path.toLocaleLowerCase() === '/products') {
//         if(!query.id) {
//             response.writeHead(200, {'Content-Type' : 'text/html'})
//             response.end(index_html.replace('{{%CONTENT%}}', prod_list_html.join(',')))
//         } else {
//             response.end(`This is Product with id: ${query.id}`)
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
//                 Reusable Function
// ==================================================

// const index_html = fs.readFileSync('./Templates/index2.html', 'utf-8')
// const products = JSON.parse(fs.readFileSync('./JSON/products.json', 'utf-8'))
// const prod_list = fs.readFileSync('./Templates/product-list.html', 'utf-8')
// const prod_details = fs.readFileSync('./Templates/product-details.html', 'utf-8')

// function replaceHTML(template, product){
//     let output = template.replace('{{%PROD_IMG%}}', product.productImage)

//     output = output.replace('{{%PROD_NAME%}}', product.name)
//     output = output.replace('{{%MODEL_NAME%}}', product.nodeName)
//     output = output.replace('{{%MODEL_NO%}}', product.modelNumber)
//     output = output.replace('{{%SIZE%}}', product.size)
//     output = output.replace('{{%CAMERA%}}', product.camera)
//     output = output.replace('{{%PRICE%}}', product.price)
//     output = output.replace('{{%COLOR%}}', product.color)
//     output = output.replace('{{%ID%}}', `?id=${product.id}`)
//     output = output.replace('{{%ROM%}}', product.ROM)
//     output = output.replace('{{%DESC%}}', product.Description)

//     return output
// }

// const server = http.createServer((request, response) => {
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
//             Importing Custom Modules
// ==================================================

const index_html = fs.readFileSync("./Templates/index2.html", "utf-8");
const products = JSON.parse(fs.readFileSync("./JSON/products.json", "utf-8"));
const prod_list = fs.readFileSync("./Templates/product-list.html", "utf-8");
const prod_details = fs.readFileSync(
  "./Templates/product-details.html",
  "utf-8"
);

const server = http.createServer((request, response) => {
  let { query, pathname: path } = url.parse(request.url, true);

  if (path === "/" || path.toLocaleLowerCase() === "/home") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(
      index_html.replace("{{%CONTENT%}}", "<h1>You are on Home Page</h1>")
    );
  } else if (path.toLocaleLowerCase() === "/about") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(
      index_html.replace("{{%CONTENT%}}", "<h1>You are on About Page</h1>")
    );
  } else if (path.toLocaleLowerCase() === "/products") {
    if (!query.id) {
      const prod_list_html = products.map((prod) => {
        return replaceHTML(prod_list, prod);
      });
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(
        index_html.replace("{{%CONTENT%}}", prod_list_html.join(","))
      );
    } else {
      const prod_details_html = replaceHTML(prod_details, products[query.id]);
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(index_html.replace("{{%CONTENT%}}", prod_details_html));
    }
  } else if (path.toLocaleLowerCase() === "/contact") {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(
      index_html.replace("{{%CONTENT%}}", "<h1>You are on Contact Page</h1>")
    );
  } else {
    response.writeHead(404, { "Content-Type": "text/html" });
    response.end(
      index_html.replace("{{%CONTENT%}}", "<h1>Error 404: Page Not Found</h1>")
    );
  }
});

server.listen(8000, "127.0.0.1", () => {
  console.log("Server has started on http://127.0.0.1:8000");
});
