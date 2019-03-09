const submitVote = document.getElementById('submitVote');
const checkboxesVote = document.getElementsByName('check');

const getPartyInput = () => {
  const { office } = localStorage;
  let candidate;
  checkboxesVote.forEach((item) => {
    if (item.checked) candidate = item.value;
  });
  return {
    office, candidate
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

submitVote.addEventListener('click', async (event) => {
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
    console.log(getPartyInput());
    const response = await fetch(`${baseUrl}votes`, fetchOptions);
    if (response.status === 201) {
      const jsonData = await response.json();
      console.log(jsonData);
      window.location.assign('adminAllParties.html');
    }
  }
});
