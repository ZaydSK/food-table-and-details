// defining the APIs
const api_url = "http://127.0.0.1:8000/api/food/getAll.php/";
const sort_url = "http://127.0.0.1:8000/api/food/sorted.php/";
const search_url = "http://127.0.0.1:8000/api/food/search.php/";
const sortedSearch_url = "http://127.0.0.1:8000/api/food/sortedSearch.php/";

// Defining the sorting activation checker
let sortButton = document.getElementById("sort");

// Defining async function to get the food with no search or sorting
// then passing it to another function to view it
async function getApi(url) {
	console.log(url);
	// Storing response
	let response = await fetch(url);
	// Hiding the table and replacing it with not found
	if (response.status == 404) {
		document.getElementById("list").style.display = "none";
		let obj = `Not Found`;
		document.getElementById("name").innerText = obj;
	} else {
		// getting response in json format
		let result = await response.json();
		//console.log(result.length);
		console.log(result.length==0);
		if(result.length < 1){return false;}
		console.log(result.length);
		show(result);
		return true;
	}
}

// Function to view the data that was fetched
function show(data) {
	let table = document.getElementById("list");
	//remove the previous table
	removeAllChildNodes(table);
	
	//looping through the data to add the element
	data.forEach((element) => {
		// creating the table row, add the class to use it to hide element
		let tr = document.createElement("tr");
		tr.classList.add("hide");

		// create the first td and append the text to it then append it to the row
		let num = document.createElement("td");
		let numText = document.createTextNode(element.Code);
		num.appendChild(numText);
		tr.appendChild(num);

		// create the second td and append the text to it then append it to the row
		let desc = document.createElement("td");
		let numDesc = document.createTextNode(element.Description);
		desc.appendChild(numDesc);
		tr.appendChild(desc);

		//  creating the details button and append it to the second td
		// and adding its class and id names
		let button = document.createElement("button");
		let numButton = document.createTextNode("Details");
		button.appendChild(numButton);
		button.classList.add("details");
		// append each element id to its according button 
		button.setAttribute("id", element.Code);
		desc.appendChild(button);
		
		// add a listener for redirecting to the details page
		button.addEventListener("click", getDetails);
		
		// append the row to the table
		table.appendChild(tr);
	});
}

// adding listeners to table buttons
document.getElementById("list").addEventListener("click", getDetails);

// determine if the click is inside a button and whereas the button is "details" or "sort"
// and calling the according api
function getDetails(e) {
	if (e.target.classList.contains("details"))
		window.location.href = `http://127.0.0.1:8000/html/details.html?id=${e.target.id}`;
	else if (e.target.classList.contains("sort")) {
		sort();
	}
}

// determine whether to activate or deactivate the sort
function sort() {
	//console.log(sortButton.dataset.isSorted);
	// clearing the search text
	document.getElementById("search").value='';

	if (sortButton.dataset.isSorted == "true") {
		sortButton.dataset.isSorted = "false";
		document.getElementById("sort").style.backgroundColor = "transparent";
		document.getElementById("sort").style.borderColor = "whitesmoke";
		getApi(api_url+"1/");
	} else {
		sortButton.dataset.isSorted = "true";
		document.getElementById("sort").style.backgroundColor = "#809848";
		document.getElementById("sort").style.borderColor = "#809848";
		
		getApi(sort_url+"1/");
	}
	document.getElementById('next').dataset.number='2';
	document.getElementById('previous').dataset.number='0';
}

// adding a listener to search field
document.getElementById("search").addEventListener("keyup", search);

// hiding the previous table and replacing it with the data according to the search input
async function search(e) {
	let td = document.getElementsByClassName("hide");
	td = Array.from(td);
	td.forEach((e) => {
		e.style.display = "none";
	});
	if(sortButton.dataset.isSorted == "true"){
		getApi(sortedSearch_url+"1/"+e.target.value);
	} else {
	getApi(search_url +"1/"+ e.target.value);
	}
	document.getElementById('next').dataset.number='2';
	document.getElementById('previous').dataset.number='0';
}

// First page //
getApi(api_url+"1/");

// NAVIGATION BAR //

// add listeners to the bar's element
document.getElementById("food").addEventListener("click", food);
document.getElementById("category").addEventListener("click", category);

// redirecting to the according page
function food(e) {
	window.location.href = `http://127.0.0.1:8000/html/index.html`;
}
function category(e) {
	window.location.href = `http://127.0.0.1:8000/html/categories.html`;
}

// function to remove the table elements as part of replacing them with the new data
function removeAllChildNodes(parent) {
	// as long as there is element other than the header remove them
	while (parent.children.length>1) {
		console.log(parent.children.length);
		if (parent.lastChild.tagName == "TBODY") {
			break;
		}
		parent.removeChild(parent.lastChild);
	}
}


// Add event listeners on arrows to navigate between pages

document.getElementById("next").addEventListener("click", next);
document.getElementById("previous").addEventListener("click", previous);

async function next(){
	let search  =document.getElementById('search');
	let btn = document.getElementById("next");
	// look at the number value to figure the next page number
	pageNumber=btn.dataset.number;

	// if sorting is activated and there is a search call the according api
	//     else if it's just sorting call its api
	//		and if it's just searching call its api
	//		otherwise call the normal api
	//		noting that with each api the page number is being send
	//		and the same logic is applied to the "previous" function below
	if(sortButton.dataset.isSorted=="true"){
		if(search.value.length>=1){
			if(await getApi(sortedSearch_url+pageNumber+"/"+search.value)){
				document.getElementById("next").dataset.number= incrementBTN(document.getElementById("next").dataset.number);
				document.getElementById("previous").dataset.number =incrementBTN(document.getElementById("previous").dataset.number);
			} else {
				alert("Not Found");
			}
		} else{
			if(await getApi(sort_url+pageNumber)){
				document.getElementById("next").dataset.number= incrementBTN(document.getElementById("next").dataset.number);
				document.getElementById("previous").dataset.number =incrementBTN(document.getElementById("previous").dataset.number);
			} else {
				alert("Not Found");
			}
		}		

		
	} else{
		if(search.value.length>=1){
			if(await getApi(search_url+pageNumber+"/"+search.value)){
				document.getElementById("next").dataset.number= incrementBTN(document.getElementById("next").dataset.number);
				document.getElementById("previous").dataset.number =incrementBTN(document.getElementById("previous").dataset.number);
			} else {
				alert("Not Found");
			}
		} else {
		if(await getApi(api_url+pageNumber)){
			document.getElementById("next").dataset.number=incrementBTN(document.getElementById("next").dataset.number);
			document.getElementById("previous").dataset.number=incrementBTN(document.getElementById("previous").dataset.number);
		} else {
			alert("Not Found");
		}
	}

	}
}

function previous(){
	let search  =document.getElementById('search');
	let btn = document.getElementById("previous");
	pageNumber=btn.dataset.number;
	if(pageNumber=="0"){alert("NOT Found"); return;}
	if(sortButton.dataset.isSorted=="true"){
		if(search.value.length>=1){
			if(getApi(sortedSearch_url+pageNumber+"/"+search.value)){
				console.log('trueSortedSearch');
				document.getElementById("next").dataset.number= decrementBTN(document.getElementById("next").dataset.number);
				document.getElementById("previous").dataset.number =decrementBTN(document.getElementById("previous").dataset.number);
			} else {
				console.log("sortedSearch");
				alert("Not Found");
			}
		} else{
			if(getApi(sort_url+pageNumber)){
				document.getElementById("next").dataset.number= decrementBTN(document.getElementById("next").dataset.number);
				document.getElementById("previous").dataset.number =decrementBTN(document.getElementById("previous").dataset.number);
			} else {
				alert("Not Found");
			}
		}		

		
	} else{
		if(search.value.length>=1){
			if(getApi(search_url+pageNumber+"/"+search.value)){
				document.getElementById("next").dataset.number= decrementBTN(document.getElementById("next").dataset.number);
				document.getElementById("previous").dataset.number =decrementBTN(document.getElementById("previous").dataset.number);
			} else {
				alert("Not Found");
			}
		} else {
		if(getApi(api_url+pageNumber)){
			document.getElementById("next").dataset.number=decrementBTN(document.getElementById("next").dataset.number);
			document.getElementById("previous").dataset.number=decrementBTN(document.getElementById("previous").dataset.number);
		} else {
			alert("Not Found");
		}
	}

	}	
}


/* incrementing and decrementing the pages number each time an arrow is clicked */
function incrementBTN(str){
	return parseInt(str,10)+1;
}

function decrementBTN(str){
	return parseInt(str,10)-1;
}