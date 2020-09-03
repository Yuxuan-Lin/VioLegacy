const fs = require("fs");
const http = require("http");
const url = require("url");

const json = fs.readFileSync(`${__dirname}/data/message.json`,'utf-8');
const chatData = JSON.parse(json);

const server = http.createServer((req,res) => {

	console.log("Server Accessed.")

	const pathName = url.parse(req.url,true).pathname;
	const query = url.parse(req.url, true).query;

	if(pathName === "/" || pathName === "/chat"){
		res.writeHead(200, {'Content-type': 'text/html'});

		fs.readFile(`${__dirname}/data/message.json`,'utf-8',(err,data) => {
			res.end(data);
		})
	}
	else{
		res.writeHead(404, {'Content-type': 'text/html'});
		res.end("URL was not found on the server.");
	}

});

server.listen(3000, '127.0.0.1', () => {
	console.log("Listening for requests now.");
});

