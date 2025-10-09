document.addEventListener('DOMContentLoaded', () => {
    tableList();
});

document.querySelector('#searchList').addEventListener('keyup', () => {
    const search = document.querySelector('#searchList').value.toLowerCase();
    const tableRows = document.querySelectorAll('table tr');

    tableRows.forEach((row, index) => {
        if(index == 0){
            return;
        }

        let found = false;
        const cells = row.querySelectorAll("td");

        cells.forEach(cell => {
            const text = cell.textContent.toLowerCase();
            if(text.includes(search)){
                found = true;
            }
        });

        row.style.display = found ? "" : "none";
    })
});

document.querySelector('#createUser').addEventListener('click', (event) => {
    event.preventDefault();

    let name = document.querySelector('#nameInput').value;
    let email = document.querySelector('#emailInput').value;
    const date = new Date().toLocaleDateString('pt-BR');
    const listUsers = JSON.parse(localStorage.getItem('listUsers')) || [];

    const emailExists = listUsers.some(user => user.email === email);

    if(emailExists){
        alert('This email already exists! Try another one!');
        return;
    }

    const newUser = {
        name: name,
        email: email,
        date: date
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

document.querySelector('#clearList').addEventListener('click', () => {
    localStorage.removeItem('listUsers');
    tableList();
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

            const cellDate = document.createElement('td');
            cellDate.textContent = user.date;
            row.appendChild(cellDate);

            const cellRemove = document.createElement('td');
            const removeIcon = document.createElement('img');
            removeIcon.src = 'src/images/trash.png';
            removeIcon.className = 'remove-icon';
            removeIcon.addEventListener('click', () => removeUser(user.email));
            cellRemove.appendChild(removeIcon);
            row.appendChild(cellRemove);

            table.appendChild(row);
        }); 
    }
}

function removeUser(email){
    const listUsers = JSON.parse(localStorage.getItem('listUsers'));
    const updatedList = listUsers.filter(user => user.email !== email);
    localStorage.setItem('listUsers', JSON.stringify(updatedList));
    tableList();
}