export const setSignUpUI = function(){
    let page = 0;
    let jobCount = 1;
    const basicInfo = document.querySelector(".basic-info");
    const signUpAbout = document.querySelector(".signUp-about");
    const signUpExperience = document.querySelector(".signUp-experience");
    const prevStepBtn = document.querySelector("#previous-step-btn");
    const nextStepBtn = document.querySelector("#next-step-btn");
    const signUpBtn = document.querySelector("#sign-up-btn");
    const addJobBtn = document.querySelector(".add-another-job");
    const checkbox = document.querySelector("#current-in-role");
    const endDateInput = document.querySelector("#end-date");
    const presentBox = document.querySelector("#present-box");




    
    
    const setUIwithPage = function(page){
        switch(page) {
            case 0:
                //basicInfo: visible       signUpAbout: invisible      signUpExperience: invisible
                basicInfo.classList.remove("invisible");
                signUpAbout.classList.add("invisible");
                signUpExperience.classList.add("invisible");
            
                //prevStepBtn: invisible       nextStepBtn: visible       signUpBtn: invisible
                prevStepBtn.classList.add("invisible");
                nextStepBtn.classList.remove("invisible");
                signUpBtn.classList.add("invisible");
                break;
            case 1:
                //basicInfo: visible       signUpAbout: visible      signUpExperience: invisible
                basicInfo.classList.add("invisible");
                signUpAbout.classList.remove("invisible");
                signUpExperience.classList.add("invisible");
            
                //prevStepBtn: visible       nextStepBtn: visible       signUpBtn: invisible
                prevStepBtn.classList.remove("invisible");
                nextStepBtn.classList.remove("invisible");
                signUpBtn.classList.add("invisible");
                break;
            case 2:
                //basicInfo: invisible       signUpAbout: invisible      signUpExperience: visible
                basicInfo.classList.add("invisible");
                signUpAbout.classList.add("invisible");
                signUpExperience.classList.remove("invisible");
            
                //prevStepBtn: visible       nextStepBtn: invisible       signUpBtn: visible
                prevStepBtn.classList.remove("invisible");
                nextStepBtn.classList.add("invisible");
                signUpBtn.classList.remove("invisible");
                break;
            default:
                //default
        }
    };


    setUIwithPage(page);

    nextStepBtn.addEventListener('click',e => {
        e.preventDefault();
        page++;
        setUIwithPage(page);
        console.log("next page");
    });

    prevStepBtn.addEventListener('click',e => {
        e.preventDefault();
        page--;
        setUIwithPage(page);
        console.log("previous page");
    });

    checkbox.addEventListener('change',e => {
        e.preventDefault();
        if (checkbox.checked == true){
            presentBox.classList.remove("invisible");
            endDateInput.classList.add("invisible");
          } else {
            presentBox.classList.add("invisible");
            endDateInput.classList.remove("invisible");
          }
    });

    addJobBtn.addEventListener('click',e => {
        e.preventDefault();
        jobCount++;
        const addJobMarkUp = `
            <li class="experience-template">
                <div class="job-header">
                    <hr>
                    <h3>Job ${jobCount}</h3>
                    <hr>
                </div>
                <div class="signUp-input-temp">
                    <h4>Job Title</h4>
                    <input type="text" id="job-title" required />
                </div>
                <div class="signUp-input-temp">
                    <h4>Company</h4>
                    <input type="text" id="company" required />
                </div>
                <div class="checkbox">
                    <input type="checkbox" id="current-in-role">
                    <h4>I am currently working on this role.</h4>
                </div>
                <div class="start-end">
                    <div class="start-date date-template signUp-input-temp">
                        <h4>Start Date</h4>
                        <input type="date" id="start-date" required />
                    </div>
                    <div class="end-date date-template signUp-input-temp">
                        <h4>End Date</h4>
                        <input type="date" id="start-date" required />
                        <h4 class="invisible">Present</h4>
                    </div>
                </div>
                <div class="description signUp-input-temp">
                    <h4>Description</h4>
                    <input type="textarea" id="description" required />
                </div>
            </li>
        `;
        document.querySelector(`.signUp-experiences`).insertAdjacentHTML('beforeend',addJobMarkUp);
    });

    console.log("Sign Up Page Set Up completed");
}