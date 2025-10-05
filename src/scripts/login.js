document.querySelector('.create-account-button').addEventListener('click', () => {
    window.location.href = 'cadastro.html';
});

document.querySelector('#loginButton').addEventListener('click', () => {
    const emailValue = document.querySelector('#emailInput').value;
    const passwordValue = document.querySelector('#passwordInput').value;
    const listProfiles = JSON.parse(localStorage.getItem('listProfiles')) || null;
    let credentialsIsValid = false;
    
    if(listProfiles){
        listProfiles.forEach(profile => {
            if(emailValue === profile.email && passwordValue === profile.password){
                window.location.href = 'principal.html';
                credentialsIsValid = true;
                return;
            } 
        });
    }

    if(!credentialsIsValid){
        alert('Incorrect email or password!');
    }
})