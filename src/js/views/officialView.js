import * as signUpView from './signUpView'; 

export const setOfficialUI = function(){
  const officialContainer = document.querySelector(".official-container");
  const officialSignUpBtn = document.querySelector(".official-sign-up");
  const officialLogInBtn = document.querySelector(".official-log-in");
  const signUpContainer = document.querySelector(".signUp-container");
  const logInContainer = document.querySelector(".login-container");

  officialContainer.classList.remove("invisible");

  officialSignUpBtn.addEventListener('click',e => {
    e.preventDefault();
    officialContainer.classList.add("invisible");
    signUpContainer.classList.remove("invisible");
    signUpView.setSignUpUI();
  });

  officialLogInBtn.addEventListener('click',e => {
    e.preventDefault();
    officialContainer.classList.add("invisible");
    logInContainer.classList.remove("invisible");
  });
}






const LogInBtn = document.querySelector('#log-in-btn');
LogInBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  // get user info DOM
  const email = document.querySelector('#login-email');
  const password = document.querySelector('#login-password');
  

  // sign up the user & add firestore data
  auth.signInWithEmailAndPassword(email.value, password.value).then((cred) => {
  email.value = "";
  password.value = "";
  }).catch(err => {
  alert(err);
  });  
});
