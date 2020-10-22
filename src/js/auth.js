import * as index from './index';
import * as officialView from './views/officialView'; 
import {elements} from './views/base';


const state = {};


// listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    //index.cleanUp(state);
    index.setUI(state, user);
    document.querySelector(".container").classList.remove("invisible");
    document.querySelector(".signUp-container").classList.add("invisible");
    document.querySelector(".login-container").classList.add("invisible");
  }
  //revise to restrict data leakage 
  else {
    document.querySelector(".container").classList.add("invisible");
    document.querySelector(".signUp-container").classList.add("invisible");
    document.querySelector(".login-container").classList.add("invisible");
    officialView.setOfficialUI();
  }
});


// signup
const signUpBtn = document.querySelector('#sign-up-btn');
signUpBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  // get user info
  const email = document.querySelector('#signUp-email');
  const password = document.querySelector('#signUp-password');
  const about = document.querySelector('#about-area');
  const major = document.querySelector('#major');
  const firstName = document.querySelector('#first-name');
  const lastName = document.querySelector('#last-name');
  const year = document.querySelector('#year');

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email.value, password.value).then(cred => {
    state.userId = cred.user.uid;
    //console.log(cred.additionalUserInfo.isNewUser);
    db.collection("Profiles").doc(state.userId).set({
      about: about.value,
      major: major.value,
      name: firstName.value + " " + lastName.value,
      year: year.value,
      myOpps: []
    })
    email.value = "";
    password.value = "";
    about.value = "";
    major.value = "";
    firstName.value = "";
    lastName.value = "";
    year.value = "";
  })
  .catch(err => {
    alert(err);
  });

});


// logout
const logout = document.querySelector('#log-out-btn');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});


// login
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
