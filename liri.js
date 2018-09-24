var request = require("request");
var twitter = require("twitter");
var spotifyReq = require("node-spotify-api");
var keys = require("./keys.js");
var fs = require("fs");
var args = process.argv.slice(2);
var command = args[0];
var userInput = args.slice(1).join(" ");

if (command === "my-tweets") {
	tweetTweet();
} else if (command === "spotify-this-song") {
	spotifyThis();
} else if (command === "movie-this") {
	movieThis();
} else if (command === "do-what-it-says") {
	fileSaysDo();
} else {
	console.log("I'm sorry, I don't understand. Please tell me a command: \nmy-tweets \nspotify-this-song \nmovie-this \ndo-what-it-says");
}

function tweetTweet() {
	var client = new twitter(keys.twitterKeys);
	client.get("statuses/user_timeline", "molva_roham", function(err, tweet, response) {
		if (err) {
			return console.log(err);
		} else {
			for (var i = 0; i < tweet.length; i++) {
				console.log(tweet[i].created_at);
				console.log(tweet[i].text);

				fs.appendFile("log.txt", "\n \n SOMEBODY'S TWEETS \n" + tweet[i].created_at + "\n" + tweet[i].text, function(err) {
					if (err) {
						console.log(err);
					}
				})
			}
		}
	})
}

function spotifyThis() {
	var isInputNull = userInput === "" ? userInput = "CSS Suxxx" : userInput = userInput;
	var spotify = new spotifyReq(keys.spotifyKeys);

	spotify.search({
		type: "track",
		query: userInput,
		limit: 1
	}, function(err, data) {
		if (err) {
			return console.log(err);
		} else {
			console.log("Artist: " + data.tracks.items[0].album.artists[0].name); // artist's name
			console.log("Song name: " + data.tracks.items[0].name) // song name
			console.log("External url: " + data.tracks.items[0].album.external_urls.spotify) // external link
			console.log("Album: " + data.tracks.items[0].album.name) // album name
		}

		fs.appendFile("log.txt", "\n \nSONG DATA: " + 
			"\n" + data.tracks.items[0].album.artists[0].name + 
			"\n" + data.tracks.items[0].name + 
			"\n" + data.tracks.items[0].album.external_urls.spotify + 
			"\n" + data.tracks.items[0].album.name, function(err) {
				if (err) {
					console.log(err);
				}
			})
	})
}

function movieThis() {
	var isInputNull = userInput === "" ? userInput = "Spaceballs" : userInput = userInput;
	var queryUrl = "http://www.omdbapi.com/?apikey=40e9cece&t=" + userInput

	request(queryUrl, function(err, response, body) {
		if (err) {
			return console.log(err);
		} else {
			var rottenExists = JSON.parse(body).Ratings[1] === undefined ? rottenExists = "N/A" : rottenExists = JSON.parse(body).Ratings[1].Value;
			console.log("Title: " + JSON.parse(body).Title);
			console.log("Year: " + JSON.parse(body).Year);
			console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
			console.log("Rotten Tomatoes Rating: " + rottenExists);
			console.log("Country: " + JSON.parse(body).Country);
			console.log("Language: " + JSON.parse(body).Language);
			console.log("Plot: " + JSON.parse(body).Plot);
			console.log("Actors: " + JSON.parse(body).Actors);	
		}

		fs.appendFile("log.txt", "\n \n" + "MOVIE DATA: " + 
			"\n" + JSON.parse(body).Title + "\n" + JSON.parse(body).Year + 
			"\n" + JSON.parse(body).imdbRating + "\n" + JSON.parse(body).rottenExists +
			"\n" + JSON.parse(body).Country + "\n" + JSON.parse(body).Language +
			"\n" + JSON.parse(body).Plot + "\n" + JSON.parse(body).Actors, function(err) {
				if (err) {
					console.log(err);
				}
			})
	})
}

function fileSaysDo() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error);
		} else {
			var dataArr = data.split(",");
			userInput = dataArr[1];
			command = dataArr[0];

			if (command === "my-tweets") {
				tweetTweet();
			} else if (command === "spotify-this-song") {
				spotifyThis();
			} else {
				movieThis();
			}
		}

		fs.appendFile("log.txt", "User engaged the random file.", function(err) {
			if (err) {
				console.log(err);
			}
		})
	});
}