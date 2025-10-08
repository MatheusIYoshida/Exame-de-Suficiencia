document.addEventListener('DOMContentLoaded', () => {
    tableList();
});

document.querySelector('#createUser').addEventListener('click', () => {
    let name = document.querySelector('#nameInput').value;
    let email = document.querySelector('#emailInput').value;
    const listUsers = JSON.parse(localStorage.getItem('listUsers')) || [];

    const emailExists = listUsers.some(user => user.email === email);

    if(emailExists){
        alert('This email already exists! Try another one!');
        return;
    }

    const newUser = {
        name: name,
        email: email
    }

    listUsers.push(newUser);
    localStorage.setItem('listUsers', JSON.stringify(listUsers));
    name = "";
    email = "";
    tableList();
});

document.querySelector('#clearInput').addEventListener('click', () => {
    document.querySelector('#nameInput').value = "";
    document.querySelector('#emailInput').value = "";
});

function tableList(){
    const table = document.querySelector('#table tbody');
    const listUsers = JSON.parse(localStorage.getItem('listUsers')) || null;

    table.innerHTML = '';
    if(listUsers){
        listUsers.forEach(user => {
            const row = document.createElement('tr');    
            
            const cellName = document.createElement('td');
            cellName.textContent = user.name;
            row.appendChild(cellName);

            const cellEmail = document.createElement('td');
            cellEmail.textContent = user.email;
            row.appendChild(cellEmail);

            const cellRemove = document.createElement('td');
            const removeIcon = document.createElement('img');
            removeIcon.src = 'src/images/trash.png';
            removeIcon.className = 'remove-icon';
            cellRemove.appendChild(removeIcon);
            row.appendChild(cellRemove);

            table.appendChild(row);
        }); 
    }
}