const fs = require('fs');

const requestHandler = (req, res) => {
  const url = req.url;
  const method = req.method;
  if(url === '/'){
    res.setHeader('Contet-type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title></head>');
    res.write('<body><form action="/message" method="POST"><input type="text" name="message"/><button type="submit">Send</button></form></body>');
    res.write('</html>');
    return res.end(); 
  }
  if(url === '/message' && method === 'POST'){
    const bodyChuncks = [];
    req.on('data', (chunck) => {
      console.log(chunck); 
      bodyChuncks.push(chunck);
    });
    return req.on('end', () => {
      const parsedBody = Buffer.concat(bodyChuncks).toString();
      const message = parsedBody.split('=')[1];
      fs.writeFile('message.txt', message, (err) => {
        res.statusCode = 302;
        res.setHeader('Location', '/');
        return res.end();
      });
    });
  }
  
  // console.log(url);
  res.setHeader('Contet-type', 'text/html');
  res.write('<html>');
  res.write('<head><title>My First Page</title></head>');
  res.write('<body><h1>Hi, from node server....</h1></body>');
  res.write('</html>');
  res.end(); 
};

// module.exports = requestHandler;

// module.exports = {
//   handler: requestHandler,
//   text: 'hard coded text'
// };
 
// module.exports.handler = requestHandler;
// module.exports.text = 'hard codede text ...';
exports.handler = requestHandler;
exports.text = 'hard codede text ...';