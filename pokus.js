var sys = require("sys"),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs");
    
http.createServer(function(request, response) {
    var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd(), uri);
    path.exists(filename, function(exists) {
    	if(!exists) {
    		response.sendHeader(404, {"Content-Type": "text/plain"});
    		response.write("404 Not Found\n");
    		response.close();
    		return;
    	}
    	
    	fs.readFile(filename, "binary", function(err, file) {
    		if(err) {
    			response.setHeader("Content-Type", "text/plain");
            	response.statusCode = 500;
    			response.write(err + "\n");
    			response.close();
    			return;
    		}
    		
    		response.statusCode = 200;
    		response.write(file, "binary");
    		response.close();
    	});
    });
}).listen(process.env.PORT || 5000);

sys.puts("Server running at http://localhost:8080/");