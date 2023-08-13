const http = require("http");
const { buffer } = require("stream/consumers");
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.url;
  if (url == "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html><head><title>mess</title></head>");
    res.write("<body><h1>Bittu welcomes you!</h1>");
    res.write(
      '<form action="/user-input" method="POST"><input type="text" name="mes"></input ><button type="submit">Send</button></form>'
    );
    res.write("</body></html>");
    return res.end();
  }
  if (url == "/users") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html><head><title>users</title></head>");
    res.write(
      "<body><ul><li>bits</li><li>devs</li><li>ravi</li></ul></body></html>"
    );
    return res.end();
  }
  if (url == "/user-input") {
    const block = [];
    req.on("data", (chunk) => {
      block.push(chunk);
    });
    return req.on("end", () => {
      const parsedMessage = Buffer.concat(block).toString();
      const message = parsedMessage.split("=")[1];
      console.log(message);

      res.statusCode = 302;
      res.setHeader("Location", "/users");
      return res.end();
    });
  }
});
server.listen(5000);
// app.use((req, res, next) => {
//   console.log("In the middleware");
//   next(); //sends response to another middleware
// });
// const server = http.createServer(app);
// server.listen(3000);
