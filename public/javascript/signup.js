window.onload = () => {
  const form = document.getElementById('form');
  const firstname = document.getElementById('firstname');
  const lastname = document.getElementById('lastname');
  const email = document.getElementById('email');
  const phoneNumber = document.getElementById('phoneNumber');
  const password = document.getElementById('password');

  const url = 'http://127.0.0.1:5500/api-docs';

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const headers = new Headers();
    headers.set('Accept', 'application/json');
    const user = {};
    user.firstname = firstname.value;
    user.lastname = lastname.value;
    user.email = email.value;
    user.phoneNumber = phoneNumber.value;
    user.password = password.value;

    const fetchOptions = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: { 'Content-Type': 'Application/json' }
    };
    const response = await fetch(url, fetchOptions);
    if (response.status === 201) {
      const jsonData = await response.json();
      console.log(jsonData);
    }
  });
};
