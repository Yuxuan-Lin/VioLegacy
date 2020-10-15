import * as index from './index';
import * as signUpView from './views/signUpView'; 
const state = {};
/*
// add admin cloud function
const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const adminEmail = document.querySelector('#admin-email').value;
  const addAdminRole = functions.httpsCallable('addAdminRole');
  addAdminRole({ email: adminEmail }).then(result => {
    console.log(result);
  });
});
*/

// listen for auth status changes
auth.onAuthStateChanged(user => {
    console.log('auth changed. User: ' + user);
    //console.log(user.additionalUserInfo.isNewUser);
  if (user) {
    index.setUI(state, user);
    //index.setSignUpUI();
    
    document.querySelector(".container").classList.remove("invisible");
    document.querySelector(".signUp-container").classList.add("invisible");
    document.querySelector(".log-in").classList.add("invisible");
  }
  //revise to restrict data leakage 
  else {
    document.querySelector(".container").classList.add("invisible");
    document.querySelector(".signUp-container").classList.remove("invisible");
    document.querySelector(".log-in").classList.remove("invisible");
    signUpView.setSignUpUI();
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



  //add document profile to firestore
  
});



// logout
const logout = document.querySelector('#log-out-btn');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});



// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    loginForm.reset();
    loginForm.querySelector('.error').innerHTML = '';
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  });

});
