import * as index from './index';
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
    console.log('auth changed');
  if (user) {
    index.setUI(state, user);
    document.querySelector(".container").classList.remove("invisible");
    document.querySelector(".sign-up").classList.add("invisible");
    document.querySelector(".log-in").classList.add("invisible");
  }
  //revise to restrict data leakage 
  else {
    document.querySelector(".container").classList.add("invisible");
    document.querySelector(".sign-up").classList.remove("invisible");
    document.querySelector(".log-in").classList.remove("invisible");
  }
});

/*
// create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection('guides').add({
    title: createForm.title.value,
    content: createForm.content.value
  }).then(() => {
    // close the create modal & reset form
    const modal = document.querySelector('#modal-create');
    M.Modal.getInstance(modal).close();
    createForm.reset();
  }).catch(err => {
    console.log(err.message);
  });
});
*/


// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    U.userId = cred.user.uid;
    console.log(U.userId);
  })
  .catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
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
