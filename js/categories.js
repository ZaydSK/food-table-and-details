const category_url = "http://127.0.0.1:8000/api/category/getAll.php"
const add_url = "http://127.0.0.1:8000/api/category/add.php"
const delete_url = "http://127.0.0.1:8000/api/category/delete.php"

// sending delete request with the id of the button that was clicked
async function deleteCategory(e){
    let id =e.target.id;
    let response;

    // alerting the user and confirm the deletion
    if(confirm("are you sure")){
        response = await fetch(delete_url,{method:"DELETE",body: JSON.stringify({
            id: `${id}`,})
        });
    
    // if anything goes wrong alert the error message from the api
    if(response.status>=400){
        response = await response.json();
        alert(response['message']);
    } else {
        //otherwise alert the success and reload the page to a new table without the deleted row
        response = await response.json();
        alert(response['message'])
        window.location.href=`http://127.0.0.1:8000/html/categories.html`;
    }
}
}

// getting all records
// if anything goes wrong print the error
// else display the records 
async function getAll(){
    const response = await fetch(category_url);
    if(response.status==404){
        document.getElementById('details_list').style.display = 'none';
        let obj = `Element Not Found`;
        document.getElementById('name').innerText =obj;
        document.getElementById('name').style="margin-top:50px";
    }
    else{
        console.log(response);
        let result = await response.json();
        let table = document.getElementById('list');
    
        result.forEach(element => {
            // new row 
            let tr = document.createElement('tr');

            // new columns and appending the info to them accordingly
            let num =document.createElement('td');
            let numText = document.createTextNode(element.id);
            num.appendChild(numText);

            let desc = document.createElement('td');
            let numDesc = document.createTextNode(element.Name);
            desc.appendChild(numDesc);

            // adding a delete button to each row and appending the id of each record 
            // to the according button 
            let button = document.createElement('button');
            let numButton = document.createTextNode('Delete');
            button.appendChild(numButton);
            button.classList.add('delete');
            button.setAttribute('id',element.id);
            desc.appendChild(button);
            // listen for clicking the delete button
            button.addEventListener('click', deleteCategory);
            

            // appending columns to the row
            tr.appendChild(num);
            tr.appendChild(desc);
            
            // appending the row to the table
            table.appendChild(tr);
        });

    }

}

// listen for submitting 
document.getElementById('submit').addEventListener('click',add);
async function add(e){
    // stop the form from doing anything 
    e.preventDefault();

    // getting the entered value
    let name =(document.getElementById('name').value);

    // sending a post request 
    let response = await fetch(add_url,{method:"POST",body: JSON.stringify({
		name: `${name}`,
	})});

    // if anything goes wrong alert the error message
    if(response.status>=400){
        response = await response.json();
        alert(response['message']);
    } else {
        // otherwise alert that adding was successful and reloading the page with the new record
        response = await response.json();
        alert(response['message'])
        window.location.href=`http://127.0.0.1:8000/html/categories.html`;
    }
}

// First page
getAll();





// NAV BAR //

document.getElementById('food').addEventListener('click',food);
document.getElementById('category').addEventListener('click',category);

function food(e){
	window.location.href= `http://127.0.0.1:8000/html/index.html`;
}
function category(e){
	window.location.href= `http://127.0.0.1:8000/html/categories.html`;
}



