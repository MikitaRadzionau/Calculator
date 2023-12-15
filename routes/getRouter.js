const fs = require("fs");
const path = require("path");
const url = require("url");

const {
    contentTypes
} = require("../config/mimeTypes");


function getRouter(request, response,queryParams) {
    const parsedUrl = url.parse(request.url, true);
    console.log(parsedUrl);

    const op = queryParams;

    switch (parsedUrl.pathname) {
        case "/":
            response.writeHead(301, {
                Location: "/index.html",
            });
            response.end();
            break;

        case "/calc":
            console.log(`\nurl.parse(request.url, true).query: ${JSON.stringify(parsedUrl.query,null,4)}`);

            const a = parsedUrl.query.a;
            const b = parsedUrl.query.b;
            const op = parsedUrl.query.op;
            console.log(a, b, op);
            let result;

            switch (op) {
                case 'plus':
                    result = a+b;
                    break;
                case 'minus':
                    result = a-b;
                    break;
                case 'times':
                    result = a*b;
                    break;
                case '/':
                    result = a/b;
                    break;
                case 'sqrt':
                    result = Math.pow(a,1/b);
                    break;
                case 'degree':
                    result = Math.pow(a,b);
                    break;
                case 'persent':
                    result = (a * b) / 100;
                    break;
                
                default:
                    result = 'Invalid operation';
            }
            console.log(result);
            const data = JSON.stringify(result);

            //заголовок для JSON'а
            response.writeHead(200, {
                "Content-Type": "application/json; charset=utf-8",
            });
            response.end(data);
            break;

        default:
            const filePath = path.join("./public", parsedUrl.pathname.substring(1));
            console.log(filePath);

            fs.access(filePath, fs.constants.R_OK, (err) => {
                if (err) {
                    response.writeHead(404, {
                        "Content-Type": "text/html; charset=utf-8",
                    });

                    response.end("Not Found");
                } else {
                    const extname = path.extname(filePath);
                    const contentType =
                        contentTypes[extname] || "application/octet-stream";

                    response.writeHead(200, {
                        "Content-Type": contentType,
                    });
                    fs.createReadStream(filePath).pipe(response);
                }
            });
    }
}

module.exports = getRouter;