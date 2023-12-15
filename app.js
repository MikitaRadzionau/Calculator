const http = require("http");
const router = require("./routes/index");
const port = 2000;
const server = http.createServer(router);

server.listen(port,()=>{
    console.log(`Стартуем на порту ${port}`)
});
