var fs = require("fs");
var command = process.argv[2];
var value = process.argv[3]

switch (command) {
case "my-tweets":
    tweets();
break;

case "spotify-this-song":
    spotify();
break;

case "movie-this":
    movie();
break;

case "do-what-it-says":
    doIt();
break;
}

function tweets(){

}

function movie(){
    var request = require("request")

    var keyword = ""

    for (var i=2; i<process.argv.length; i++){
    keyword += process.argv[i]+"+"
    }

    console.log(keyword)

    request("http://www.omdbapi.com/?t=" + keyword + "&y=&plot=short&apikey=trilogy", function(error, response, body) {
    if (!error && response.statusCode === 200) {
        console.log(body);
    }
    });

}

function doIt(){
    fs.readFile("random.txt", "utf8", function(error, data) {
 
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(", ");
        var keyword2 = "";
        var command2 = dataArr[0];

    for (var i=1; i<dataArr.length; i++){
    keyword += process.argv[i]+"+"
    }
    
        console.log(sum);
        });
}