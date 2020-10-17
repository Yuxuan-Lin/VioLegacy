import * as signUpView from './signUpView'; 

export const setOfficialUI = function(){
    const officialContainer = document.querySelector(".official-container");
    const officialSignUpBtn = document.querySelector(".official-sign-up");
    const officialLogInBtn = document.querySelector(".official-log-in");
    const signUpContainer = document.querySelector(".signUp-container");
    const logInContainer = document.querySelector(".log-in");

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