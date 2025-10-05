document.querySelector('#registerButton').addEventListener('click', () => {
    let nameValue = document.querySelector('#nameInput').value;
    let emailValue = document.querySelector('#emailInput').value;
    let passwordValue = document.querySelector('#passwordInput').value;
    let addressValue = document.querySelector('#addressInput').value;
    let phoneValue = document.querySelector('#phoneInput').value;
    const listProfiles = JSON.parse(localStorage.getItem('listProfiles')) || [];

    const emailExists = listProfiles.some(profile => profile.email === emailValue);
    
    if(emailExists){
        alert('This email already exists! Try another one!');
        return;
    }

    const newProfile = {
        name: nameValue,
        email: emailValue,
        password: passwordValue,
        address: addressValue,
        phone: phoneValue
    };

    listProfiles.push(newProfile);
    localStorage.setItem('listProfiles', JSON.stringify(listProfiles));
    window.location.href = 'index.html';
});