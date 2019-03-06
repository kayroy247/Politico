const partyForm = document.getElementById('partyForm');

const getPartyInput = () => {
  const name = document.getElementById('partyName').value.trim();
  const hqAddress = document.getElementById('hqAddress').value.trim();
  const logoURL = document.getElementById('partyLogo').value.trim();
  return {
    name, hqAddress, logoURL
  };
};
const baseUrl = 'http://localhost:5000/api/v1/';

const validateCreateUser = (user) => {
  const {
    name, hqAddress, logoURL
  } = user;
  document.querySelector('#mainMsg').innerHTML = '';

  if (name === '' || hqAddress === '' || logoURL === '') {
    document.querySelector('#mainMsg').innerHTML = 'Please fill all required fields';
    return true;
  }
  return true;
};

partyForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const headers = new Headers();
  headers.set('Accept', 'application/json');
  const user = await getPartyInput();
  const fetchOptions = {
    method: 'POST',
    mode: 'cors',
    body: JSON.stringify(user),
    headers: { 'Content-Type': 'Application/json', Authorization: `Bearer ${window.localStorage.token}` }
  };
  if (validateCreateUser(user)) {
    const response = await fetch(`${baseUrl}parties`, fetchOptions);
    if (response.status === 201) {
      const jsonData = await response.json();
      console.log(jsonData);
      window.location.assign('adminAllParties.html');
    }
  }
});
