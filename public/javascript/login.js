const loginForm = document.getElementById('loginForm');

const getUserInput = () => {
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  return {
    email, password
  };
};
const url = 'http://localhost:5000/api/v1/auth/login';

const validateCreateUser = (user) => {
  const {
    email, password
  } = user;

  document.querySelector('#passMsg').innerHTML = '';
  document.querySelector('#emailMsg').innerHTML = '';
  document.querySelector('#mainMsg').innerHTML = '';

  if (email === '' || password === '') {
    document.querySelector('#mainMsg').innerHTML = 'Please fill all required fields';
    return true;
  }
  return true;
};
loginForm.addEventListener('submit', async (event) => {
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
    if (response.status === 200) {
      const jsonData = await response.json();
      window.localStorage.token = jsonData.data[0].token;
      window.localStorage.userId = jsonData.data[0].user.id;
      window.localStorage.isadmin = jsonData.data[0].user.isadmin;
      console.log(window.localStorage.isadmin);
      if (window.localStorage.isadmin === 'true') {
        window.location.assign('adminDashboard.html');
      } else {
        window.location.assign('userProfile.html');
      }
      console.log(jsonData);
    }
  }
});
