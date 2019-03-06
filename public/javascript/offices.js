const officeForm = document.getElementById('officeForm');

const getPartyInput = () => {
  const type = document.getElementById('officeType').value.trim();
  const name = document.getElementById('officeName').value.trim();
  return {
    type, name
  };
};
const baseUrl = 'http://localhost:5000/api/v1/';

const validateCreateUser = (user) => {
  const {
    type, name
  } = user;
  document.querySelector('#mainMsg').innerHTML = '';

  if (name === '' || type === '') {
    document.querySelector('#mainMsg').innerHTML = 'Please fill all required fields';
    return true;
  }
  return true;
};

officeForm.addEventListener('submit', async (event) => {
  console.log(localStorage.token);
  event.preventDefault();
  const headers = new Headers();
  headers.set('Accept', 'application/json');
  const user = await getPartyInput();
  const fetchOptions = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'Application/json', Authorization: `Bearer ${localStorage.token}` }
  };
  if (validateCreateUser(user)) {
    const response = await fetch(`${baseUrl}offices`, fetchOptions);
    if (response.status === 201) {
      const jsonData = await response.json();
      console.log(jsonData);
      window.location.assign('adminAllParties.html');
    }
  }
});
