const candidateForm = document.getElementById('candidateForm');

const getPartyInput = () => {
  const office = document.getElementById('makechange').value.trim();
  const party = document.getElementById('party').value.trim();
  return {
    office, party
  };
};
const baseUrl = 'http://localhost:5000/api/v1/';

const validateCreateUser = (user) => {
  const {
    office, party
  } = user;
  document.querySelector('#mainMsg').innerHTML = '';

  if (office === '' || party === '') {
    document.querySelector('#mainMsg').innerHTML = 'Please fill all required fields';
    return true;
  }
  return true;
};

candidateForm.addEventListener('submit', async (event) => {
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
    const response = await fetch(`${baseUrl}office/${localStorage.userId}/register`, fetchOptions);
    if (response.status === 201) {
      const jsonData = await response.json();
      console.log(jsonData);
      window.location.assign('adminAllParties.html');
    }
  }
});
