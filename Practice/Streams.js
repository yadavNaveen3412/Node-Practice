const fs = require('fs')
const http = require('http')



// ==================================================
//              Without using Streams                         
// ==================================================

// const server = http.createServer((req, res) => {
//     fs.readFile('./Notes/large-file.txt', (err, data) => {
//         if(err) {
//             res.end(`${err}`)
//             return
//         }

//         res.end(data)
//     })
// })

// server.listen(8000, '127.0.0.1', () => {
//     console.log('Server started on http://127.0.0.1:8000');
// })



// ==================================================
//                   Using Streams                         
// ==================================================

// const server = http.createServer((req, res) => {
//     let rs = fs.createReadStream('./Notes/large-file.txt')

//     rs.on('data', (chunk) => {
//         res.write(chunk)
//     })

//     rs.on('end', ()=> {
//         res.end();
//     })

//     rs.on('error', (error) => {
//         res.end(`${error}`)
//     })
// })

// server.listen(8000, '127.0.0.1', () => {
//     console.log('Server started on http://127.0.0.1:8000');
// })



// ==================================================
//                 Using Pipe Method                         
// ==================================================

// const server = http.createServer((req, res) => {
//     let rs = fs.createReadStream('./Notes/largefile.txt')

//     rs.pipe(res)

//     rs.on('error', (err) => {
//         res.end(`${err}`)
//     })
// })

// server.listen(8000, '127.0.0.1', () => {
//     console.log('Server started on http://127.0.0.1:8000');
    
// })


// ==================================================
//               Write chunks with delay                         
// ==================================================


const server = http.createServer((req, res) => {
    let rs = fs.createReadStream('./Notes/large-file.txt')

    rs.on('data', (chunk) => {
        res.write(chunk)
        rs.pause()   
        
        setTimeout(()=>{
            rs.resume()
        }, 5000)
    })

    rs.on('end', ()=> {
        res.end();
    })

    rs.on('error', (error) => {
        res.end(`${error}`)
    })
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Server started on http://127.0.0.1:8000');
})