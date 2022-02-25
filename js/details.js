const details_url = "http://127.0.0.1:8000/api/food/getDetails.php"

// fetching the id of the element
let id = (new URL(document.location)).searchParams.get('id');


async function getDetails(id){
    // appending the id to the url as query parameter
    let id_url = `?id=${id}`;
    const response = await fetch(details_url+id_url);

    // if the provided id is invalid hide everything and display a sentence 
    if(response.status==404){
        document.getElementById('details_list').style.display = 'none';
        let obj = `Element Not Found`;
        document.getElementById('filter').innerText =obj;
        document.getElementById('filter').style="margin-top:50px";
    }
    // otherwise display the components
    else{
        console.log(response);
    let result = await response.json();
    let table = document.getElementById('details_list');

    // fetching the name of the product which has been sent as the first column of each product 
    document.getElementById('filter').innerText=`Details of ${result[0].Name}`;
    
    result.forEach(element => {
        // new row
        let tr = document.createElement('tr');

        // new columns and their text
        let num =document.createElement('td');
        let numText = document.createTextNode(element.Amount);
        num.appendChild(numText);

        let desc = document.createElement('td');
        let numDesc = document.createTextNode(element.Component);
        desc.appendChild(numDesc);

        // appending the columns to the row
        tr.appendChild(desc);
        tr.appendChild(num);

        // append the row to the table
        table.appendChild(tr);
    });

    }

}

// First page
getDetails(id);


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
