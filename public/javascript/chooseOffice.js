const candidateForm = document.getElementById('candidateForm');


const getPartyInput = () => {
  const office = document.getElementById('makechange').value.trim();
  return office;
};
// const baseUrl = 'http://localhost:5000/api/v1/';

const validateCreateUser = (officeChoice) => {
  document.querySelector('#mainMsg').innerHTML = '';

  if (officeChoice === '0') {
    document.querySelector('#mainMsg').innerHTML = 'Please fill all required fields';
    return false;
  }
  return true;
};

candidateForm.addEventListener('submit', async (event) => {
  const office = await getPartyInput();
  event.preventDefault();
  const headers = new Headers();
  headers.set('Accept', 'application/json');
  if (validateCreateUser(office)) {
    window.localStorage.office = office;
    console.log(localStorage.office);
    if (localStorage.office === '1') {
      window.location.assign('presidential.html');
    } else {
      window.location.assign('state.html');
    }
  }
});
