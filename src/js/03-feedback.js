import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const formData = {};

onFormUpdate();

form.addEventListener('input', throttle(onFormInput, 500));
form.addEventListener('submit', onFormSubmit);

function onFormInput(e) {
  formData[e.target.name] = e.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function onFormSubmit(e) {
  e.preventDefault();
  const {
    elements: { email, message },
  } = e.target;

  if (email.value === '' || message.value === '') {
    return window.alert('input fields not filled!');
  }
  console.log({ email: email.value, message: message.value });
  e.target.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onFormUpdate() {
    const getSavedFormOFieldsValue = localStorage.getItem(STORAGE_KEY); 
  if (!getSavedFormOFieldsValue) {
    return;
  }
  const getFormObject = JSON.parse(getSavedFormOFieldsValue);

  Object.entries(getFormObject).forEach(([name, value]) => {
    formData[name] = value;
    form.elements[name].value = value;
  });
}

