// Load the readline library 
const readline = require("readline"); 
// Setup readline to listen on the stdin stream 
const rl = readline.createInterface(process.stdin, process.stdout); 
// load library for fetch in node.js
const fetch = require('node-fetch');

function showMenu(){
	console.log("\n1 - Search Pokemon\n2 - Search Item\n3 - Search Move")
}

function prompt(cb){
	rl.question("\nEnter search term: ", (response) => { 
	cb(response)
	});
}

async function searchPoke(term){
	const URL = "https://pokeapi.co/api/v2/pokemon/" + term + "/"
	//console.log(URL)
	try{
		const response = await fetch(URL);
		const data = await response.json();
		printPoke(data);
	} catch(error){
		console.log(`We were unable to retrieve data for Pokemon ${term}`)
		console.log("Ensure Pokemon exists and you're connected to the internet")
		console.log("error", error);
		run()
	}
}

function printPoke(json){
	console.log(`\nDisplaying Pokemon information: ${json.name}`)
	console.log(`Weight: ${json.weight}`)
	console.log(`Height: ${json.height}`)
	console.log(`Base Experience: ${json.base_experience}`)
	console.log("Move List:")
	for (let i = 0; i < json.moves.length; i++) {
		console.log(`Move#${i+1}: ${json.moves[i].move.name}`)
	}
	run();
}

async function searchItem(term){
	const URL = "https://pokeapi.co/api/v2/item/" + term + "/"
	try{
		const response = await fetch(URL);
		const data = await response.json();
		printItem(data);
	} catch(error){
		console.log(`We were unable to retrieve data for Item ${term}`)
		console.log("Ensure item exists and you're connected to the internet")
		console.log("error", error);
		run()
	}
}

function printItem(json){
	console.log(`\nDisplaying Item information: ${json.name}`)
	console.log(`Cost: ${json.cost}`)
	console.log(`Effect: ${json.effect_entries[0].effect}`)
	console.log(`\nFlavor Text: ${json.flavor_text_entries[0].text}`)
	run();
}
async function searchMove(term){
	const URL = "https://pokeapi.co/api/v2/move/" + term + "/"
	try{
		const response = await fetch(URL);
		const data = await response.json();
		printMove(data);
	} catch(error){
		console.log(`We were unable to retrieve data for Move ${term}`)
		console.log("Ensure move exists and you're connected to the internet")
		console.log("error", error);
		run()
	}
}

function printMove(json){
	console.log(`\nDisplaying Move information: ${json.name}`)
	console.log(`Accuracy: ${json.accuracy}`)
	console.log(`Effect Chance: ${json.effect_chance}`)
	console.log(`PP: ${json.pp}`)
	console.log(`Priority: ${json.priority}`)
	console.log(`Power: ${json.power}`)
	console.log(`Damage Type: ${json.damage_class.name}`)
	console.log(`Effect: ${json.effect_entries[0].effect}`)
	run();
}

function run(){
	showMenu();
	rl.question("\nEnter 1, 2, or 3: ", (response) => { 
	if (response == "1"){
		prompt(searchPoke)
	} 
	else if (response == "2"){
		prompt(searchItem)
	}
	else if (response == "3"){
		prompt(searchMove)
	}
	else {
		console.log("Unrecognized input")
		run();
	}
	});
}

run();
