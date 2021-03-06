const form = document.getElementById('form');

const getUserInput = () => {
  const firstname = document.getElementById('firstname').value.trim();
  const lastname = document.getElementById('lastname').value.trim();
  const email = document.getElementById('email').value.trim();
  const phoneNumber = document.getElementById('phoneNumber').value.trim();
  const password = document.getElementById('password').value.trim();
  return {
    firstname, lastname, email, phoneNumber, password
  };
};
const url = 'http://localhost:5000/api/v1/auth/signup';

const validateCreateUser = (user) => {
  const {
    firstname, lastname, email, phoneNumber, password
  } = user;

  document.querySelector('#passMsg').innerHTML = '';
  document.querySelector('#fnameMsg').innerHTML = '';
  document.querySelector('#lnameMsg').innerHTML = '';
  document.querySelector('#emailMsg').innerHTML = '';
  document.querySelector('#phoneMsg').innerHTML = '';
  document.querySelector('#mainMsg').innerHTML = '';

  if (firstname === '' || lastname === '' || email === '' || phoneNumber === '' || password === '') {
    document.querySelector('#mainMsg').innerHTML = 'Please fill all required fields';
    return true;
  }
  return true;
};

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const headers = new Headers();
  headers.set('Accept', 'application/json');
  const user = await getUserInput();
  const fetchOptions = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'Application/json' }
  };
  if (validateCreateUser(user)) {
    const response = await fetch(url, fetchOptions);
    if (response.status === 201) {
      const jsonData = await response.json();
      window.localStorage.token = await jsonData.data[0].token;
      window.location.replace('login.html');
    }
  }
});
