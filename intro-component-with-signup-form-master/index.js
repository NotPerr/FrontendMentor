const form = document.getElementById('form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const password = document.getElementById('password');
console.log("hi");
console.log(form);


const setError = (element,message) => {
    const inputControl = element.parentNode;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.className = 'input-control error';
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const fnameValue = fname.value.trim();
    const lnameValue = lname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    if(fnameValue ==='') {
        setError(fname,'First Name cannot be empty');
    }else {
        setSuccess(fname);
    }

    if(lnameValue == '') {
        setError(lname,'Last Name cannot be empty');
    }else {
        setSuccess(lname);
    }

    if(emailValue == '') {
        setError(email,'Email cannot be empty');
    }else if(!isValidEmail(emailValue)) {
        setError(email,'Looks like this is not an email');
    }else {
        setSuccess(email)
    }

    if(passwordValue == '') {
        setError(password,'Password cannot be empty');
    }else {
        setSuccess(password);
    }
}

form.addEventListener('invalid',e => {
    e.preventDefault();
    validateInputs();
    
},true);

form.addEventListener('submit',e => {
    console.log('submit')
},true)





