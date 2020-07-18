const warning = document.querySelector('#warning')
const myForm = document.querySelector('.my-form');
const name = document.querySelector('#name');
const age = document.querySelector('#age');
const major = document.querySelector('#major');
const schoolYear = document.querySelector('#schoolYear');
const careerTrack = document.querySelector('#careerTrack');
const email = document.querySelector('#email');
const message = document.querySelector('#message');



myForm.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  
  if(name.value === '' || age.value === '' || major.value === ''|| schoolYear.value === ''
    || careerTrack.value === ''|| email.value === ''|| message.value === '') {
    warning.textContent = 'Please enter all fields!';

    setTimeout(() => warning.remove(), 3000);
  }
  else{
    alert('success');
    
    console.log('name: ${name.value}');
    console.log('age: ${age.value}');
    console.log('major: ${major.value}');
    console.log('schoolYear: ${schoolYear.value}');
    console.log('careerTrack: ${careerTrack.value}');
    console.log('email: ${email.value}');
    console.log('message: ${message.value}');


    name.value='';
    age.value='';
    major.value='';
    schoolYear.value='';
    careerTrack.value='';
    email.value='';
    message.value='';
  }
}