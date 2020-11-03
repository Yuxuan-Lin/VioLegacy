import * as homeCtrl from '../controllers/homeController';
import {elements} from './base';

export const clearProfile = (isSenior) => {
    document.querySelector('.home-top-profile').innerHTML = '';
    document.querySelector('.about').innerHTML = '';
    document.querySelector('.experience').innerHTML = '';
    if (isSenior){
        document.querySelector('.referral-box').innerHTML = '';
    } else {
        document.querySelector('.opp-column').innerHTML = '';
    }
};

const clearScreen = function(){
    elements.container.innerHTML = "";
};

const clearDashboardDetailList = function(){
    document.querySelector('.dashboard-detail-list').innerHTML = '';
}

export const renderProfile = self => {
    const markup = `
        <div class = "profile-pic">
            <img class="round-image" src=${"./images/Bill.jpg"} alt="${self.name}">
        </div>
        <div class = "home-top-info">
            <h2>${self.name}</h2>
            <h3>${self.major}</h3>
        </div>
    `;
    document.querySelector('.home-top-profile').insertAdjacentHTML('beforeend',markup);
};


export const renderAbout = self => {
    const markup = `
        <h3>About</h3>
        <h4>${self.about}</h4>
    `;
    document.querySelector('.about').insertAdjacentHTML('beforeend',markup);
};

export const renderExp = experience => {
    const markup = `
        <li class="my-exp">
            <h2>${experience.title}</h2>
            <h4>${experience.company}</h4>
            <h4>${experience.startTime.toDate()}</h4>
            <h4>${experience.description}</h4>
        </li>
    `;
     document.querySelector('.experience').insertAdjacentHTML('beforeend',markup);
};

export const renderExps = experiences => {
    experiences.forEach(renderExp);
};

export let oppStatus = [0,0,0];
export const renderOpp = (myOpp,opp) => {

    let markup = `
        <li class = "opp-column-item">
            <div class="opp-item-left">
                <h2>${opp.title}</h2>
                <h4>${opp.company}</h4>
            </div>
    `;
    
    //let isAccepted = false;
    //let isDeclined = false;
    
    if (myOpp.status == "pending") {
        oppStatus[0]++;
        markup += `
            <div class="opp-item-right">
                <div class="opp-item-icon">
                    <ion-icon name="timer-outline" class="big-icon violet"></ion-icon>
                </div>
                <div class="opp-item-status">
                    <h4>You’ve submitted the referral request.</h4>
                </div>
            </div>
        </li>

        <hr>
    `;
    }
    else if (myOpp.status == "accepted") {
        oppStatus[1]++;
        markup += `
            <div class="opp-item-right">
                <div class="opp-item-icon">
                    <ion-icon name="checkmark-circle-outline" class="big-icon green"></ion-icon>
                </div>
                <div class="opp-item-status">
                    <h4>${opp.alumni.name} has accepted your request. You may soon receive an email from ${opp.company}.</h4>
                </div>
            </div>
        </li>

        <hr>
    `;
    }
    else {
        oppStatus[2]++;
        markup += `
            <div class="opp-item-right">
                <div class="opp-item-icon">
                    <ion-icon name="close-circle-outline" class="big-icon red"></ion-icon>
                </div>
                <div class="opp-item-status">
                    <h4>${opp.alumni.name} has declined your request.</h4>
                </div>
            </div>
        </li>

        <hr>
    `;
    }
    document.querySelector('.opp-column').insertAdjacentHTML('beforeend',markup);
};

export const renderOpps = async (myOpps,opps) => {
    oppStatus = [0,0,0];
    myOpps.forEach(myOpp => {
        opps.forEach(opp => {
            if(myOpp.data().oppId == opp.id) {
                renderOpp(myOpp.data(), opp.data());
            }
        })
    })
    
};


export const collapse = () => {
    document.querySelector('.about').classList.add("invisible");
    document.querySelector('.good-line').classList.add("invisible");
    document.querySelector('.exp-title').classList.add("invisible");
    document.querySelector('.experience').classList.add("invisible");
    document.querySelector('.up-down').name = "chevron-down-outline";
    document.querySelector('.more-less').textContent = "Show more profile information";
};

export const expand = () => {
    document.querySelector('.about').classList.remove("invisible");
    document.querySelector('.good-line').classList.remove("invisible");
    document.querySelector('.exp-title').classList.remove("invisible");
    document.querySelector('.experience').classList.remove("invisible");
    document.querySelector('.up-down').name = "chevron-up-outline";
    document.querySelector('.more-less').textContent = "Show less profile information";
};

export const setEditUI = (state) => {
    state.home.edit = document.querySelector("#home-edit");
    state.home.finishBtn = document.querySelector("#finish-btn");
    state.home.about = document.querySelector('#edit-about-area');
    state.home.major = document.querySelector('#edit-major');
    state.home.firstName = document.querySelector('#edit-first-name');
    state.home.lastName = document.querySelector('#edit-last-name');
    state.home.year = document.querySelector('#edit-year');

    state.home.edit.addEventListener('click',e => {
        e.preventDefault();
        const btn = e.target.closest('.signUp-small-container');
        if(btn == null){
            state.home.edit.classList.add("invisible");
        }
    });

    state.home.about.value = state.home.profile.about;
    state.home.major.value = state.home.profile.major;
    state.home.firstName.value = state.home.profile.name.split(" ")[0];
    state.home.lastName.value = state.home.profile.name.split(" ")[1];
    state.home.year.value = state.home.profile.year;
};

export const seniorOppAddEvents = async (state) => {
    //state.cleanseEvent('#senior-post-opp-btn');
    state.cleanseEvent("#senior-post-opp-back-btn");
    state.cleanseEvent('#senior-post-opp-post-btn');


    document.querySelector('.referral-box').addEventListener('click', async e => {
        const btn = e.target.closest('.referral');
        const markup = `
            <div class="dashboard-detail">
                <div class="senior-post-opp-back">
                    <div class="back-top" id="dashboard-back-btn">
                        <div>
                            <ion-icon name="arrow-back-outline" class="big-icon"></ion-icon>
                        </div>
                        <h2>Back</h2>
                    </div>
            
                    <hr>
                </div>
                <h3 class="dashboard-detail-text">Please make decisions on the following referral requests.</h3>
                <ul class="dashboard-detail-status-bar">
                    <li id="dashboard-detail-body-all">All(0)</li>
                    <li id="dashboard-detail-body-pending">Pending(0)</li>
                    <li id="dashboard-detail-body-accepted">Accepted(0)</li>
                    <li id="dashboard-detail-body-declined">Declined(0)</li>
                </ul>
                <ul class="dashboard-detail-list">
                </ul>
            </div>
        `;

        if(btn) {
            clearScreen();
            await state.opp.getSeniorOppRegistration(btn.id);
            let info = [];
            info.push(btn.childNodes[3].childNodes[1].textContent);
            info.push(btn.childNodes[3].childNodes[3].textContent);
            elements.container.insertAdjacentHTML('beforeend',markup);
            if (state.opp.docsLength != 0){
                renderSeniorOppDetails(state,state.opp.seniorOppRegistration,info,btn.id);
            }else{
                document.querySelector(".dashboard-detail").insertAdjacentHTML("beforeend", `<h1>No Student Has Signed Up Yet.</h1>`)
            }
            

            //return to senior dashboard, back-top
            document.querySelector('#dashboard-back-btn').addEventListener('click', async e => {
                const btn2 = e.target.closest('#dashboard-back-btn');

                if(btn2) {
                    // clear right screen
                    clearScreen();
                    // render temp 2
                    homeCtrl.homeScreen(state);
                }
            });
        }
    });

    document.querySelector('#senior-post-opp-btn').addEventListener('click', async e => {
        const btn = e.target.closest('.add-referral-template');
        if(btn) {
            document.querySelector("#senior-post-opp").classList.remove("invisible");

            document.querySelector("#senior-post-opp").addEventListener('click',e => {
                e.preventDefault();
                const btn2 = e.target.closest('.signUp-small-container');
                if(btn2 == null){
                    document.querySelector("#senior-post-opp").classList.add("invisible");
                }
            });
            document.querySelector("#senior-post-opp-back-btn").addEventListener('click',e => {
                e.preventDefault();
                document.querySelector("#senior-post-opp").classList.add("invisible");
            });
            document.querySelector('#senior-post-opp-post-btn').addEventListener('click', async e => {
                state.home.seniorPostCategory = document.querySelector("#senior-post-opp-category");
                state.home.seniorPostCompany = document.querySelector("#senior-post-opp-company");
                state.home.seniorPostTitle = document.querySelector("#senior-post-opp-title");
                state.home.seniorPostLimit = document.querySelector("#senior-post-opp-limit");
                state.home.seniorPostDeadline = document.querySelector("#senior-post-opp-deadline");
                state.home.seniorPostDescription = document.querySelector("#senior-post-opp-description");
            

                state.home.seniorPostNewOpp(state);
                document.querySelector("#senior-post-opp").classList.add("invisible");
                clearScreen();
                await homeCtrl.homeScreen(state);

                state.home.seniorPostCategory.value = "";
                state.home.seniorPostCompany.value = "";
                state.home.seniorPostTitle.value = "";
                state.home.seniorPostLimit.value = "";
                state.home.seniorPostDeadline.value = "";
                state.home.seniorPostDescription.value = "";

                console.log("Senior New Opp Posted");
            });
        }
    });
};

let seniorOppDetailCounter = [0,0,0,0];

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const updateSeniorOppDetails = function(state,list,info){
    list.forEach(async headcount => {
        await state.home.getJuniorInfo(headcount.data().uid);
        renderSeniorOppDetail(headcount.data().status, headcount.data().uid, info, state.home.juniorInfo);
        seniorOppDetailCounter[0]++;
        updateDashboardStatusBar();
    });
}  

const updateDashboardStatusBar = () => {
    document.querySelector("#dashboard-detail-body-all").textContent = `All (${seniorOppDetailCounter[0]})`;
    document.querySelector("#dashboard-detail-body-pending").textContent = `Pending (${seniorOppDetailCounter[1]})`;
    document.querySelector("#dashboard-detail-body-accepted").textContent = `Accepted (${seniorOppDetailCounter[2]})`;
    document.querySelector("#dashboard-detail-body-declined").textContent = `Declined (${seniorOppDetailCounter[3]})`;
};

const renderSeniorOppDetails = (state,list,info,oppId) => {
    seniorOppDetailCounter = [0,0,0,0];
    updateSeniorOppDetails(state,list,info);
                  

    //Expand/Collapse profile
    document.querySelector(".dashboard-detail-list").addEventListener("click", async e => {
        const profileRequest = e.target.closest('.expand-collapse');

        if(profileRequest){
            await state.home.getJuniorInfo(profileRequest.parentNode.id);
            const juniorExp = state.home.juniorInfo.data();
            if (profileRequest.classList[1] == "collapsed"){
                profileRequest.classList.remove("collapsed");
                profileRequest.parentNode.childNodes[3].classList.remove("invisible");
                profileRequest.parentNode.childNodes[5].classList.remove("invisible");
                profileRequest.parentNode.childNodes[7].classList.remove("invisible");
                profileRequest.parentNode.childNodes[9].classList.remove("invisible");
                profileRequest.innerHTML = `
                    <div>
                        <ion-icon name="chevron-up-outline" class="up-down big-icon"></ion-icon>
                    </div>
                    <h4 class="more-less">Show less profile information</h4>
                `;
                let markup = '';
                if ("experience" in juniorExp){
                    markup = `
                        <li class="my-exp">
                            <h2>${juniorExp.experience[0].title}</h2>
                            <h4>${juniorExp.experience[0].company}</h4>
                            <h4>${juniorExp.experience[0].startTime.toDate()}</h4>
                            <h4>${juniorExp.experience[0].description}</h4>
                        </li>
                    `;
                } else {
                    markup = `
                        <li class="my-exp">
                            <h2>This student didn't put any experience.</h2>
                        </li>
                    `;
                }
                profileRequest.parentNode.childNodes[9].innerHTML = markup;
            }
            else{
                profileRequest.classList.add("collapsed");
                profileRequest.parentNode.childNodes[3].classList.add("invisible");
                profileRequest.parentNode.childNodes[5].classList.add("invisible");
                profileRequest.parentNode.childNodes[7].classList.add("invisible");
                profileRequest.parentNode.childNodes[9].classList.add("invisible");
                profileRequest.innerHTML = `
                    <div>
                        <ion-icon name="chevron-down-outline" class="up-down big-icon"></ion-icon>
                    </div>
                    <h4 class="more-less">Show more profile information</h4>
                `;
                state.home.collapsed = true;
            }
        }
        
    })

    //Accept/Decline event
    document.querySelector(".dashboard-detail-list").addEventListener("click", async e => {
        const acceptBtn = e.target.closest('.dashboard-detail-accept-btn');
        const declineBtn = e.target.closest('.dashboard-detail-decline-btn');

        if (acceptBtn){
            await state.opp.updateJunior(oppId,acceptBtn.parentNode.parentNode.parentNode.id,"accepted");
            acceptBtn.parentNode.innerHTML = `
                <div class="green">
                    <ion-icon name="checkmark-outline" class="small-icon"></ion-icon>
                </div>
                <h3 class="green">Accepted</h3>
            `;
            seniorOppDetailCounter[2]++;
            seniorOppDetailCounter[1]--;
        }
        else if (declineBtn){
            await state.opp.updateJunior(oppId,declineBtn.parentNode.parentNode.parentNode.id,"declined");
            declineBtn.parentNode.innerHTML = `
                <div class="red">
                    <ion-icon name="close-outline" class="small-icon"></ion-icon>
                </div>
                <h3 class="red">Declined</h3>
            `;
            seniorOppDetailCounter[3]++;
            seniorOppDetailCounter[1]--;
        }
        

        updateDashboardStatusBar();
    });
};

const renderSeniorOppDetail = (status,juniorUid,oppInfo,juniorInfo) => {
    const pending = `
        <li class="dashboard-detail-list-element" id="${juniorUid}">
            <div class="dashboard-detail-list-element-profile">
                <div class="dashboard-detail-list-element-profile-image">
                    <img class="round-image" src="./images/kerwin.jpg" alt="avatar">
                </div>
                <div class="dashboard-detail-list-element-profile-info">
                    <h3>${juniorInfo.data().name} requested a referral to ${oppInfo[0]} at ${oppInfo[0]}.</h3>
                    <h4>${juniorInfo.data().major}</h4>
                </div>
                <div class="dashboard-detail-list-element-profile-btns">
                    <button class="dashboard-detail-decline-btn">Decline</button>
                    <button class="dashboard-detail-accept-btn">Accept</button>
                </div>
            </div>
            <hr class="invisible">
            
            <div class = 'about invisible'>
                <h3>About</h3>
                <h4>${juniorInfo.data().about}</h4>
            </div>
            
            <h3 class="exp-title invisible">Experience</h3>
            <ul class="experience invisible">    
            </ul>
            
            <hr>
            
            <div class = "expand-collapse collapsed">
                <div>
                    <ion-icon name="chevron-down-outline" class="up-down big-icon"></ion-icon>
                </div>
                <h4 class="more-less">Show more profile information</h4>
            </div>
        </li>
    `;

    const accepted = `
        <li class="dashboard-detail-list-element" id="${juniorUid}">
            <div class="dashboard-detail-list-element-profile">
                <div class="dashboard-detail-list-element-profile-image">
                    <img class="round-image" src="./images/kerwin.jpg" alt="avatar">
                </div>
                <div class="dashboard-detail-list-element-profile-info">
                    <h3>${juniorInfo.data().name} requested a referral to ${oppInfo[0]} at ${oppInfo[0]}.</h3>
                    <h4>${juniorInfo.data().major}</h4>
                </div>
                <div class="dashboard-detail-list-element-profile-btns">
                    <div class="green">
                        <ion-icon name="checkmark-outline" class="small-icon"></ion-icon>
                    </div>
                    <h3 class="green">Accepted</h3>
                </div>
            </div>
            <hr class="invisible">
            
            <div class = 'about invisible'>
                <h3>About</h3>
                <h4>${juniorInfo.data().about}</h4>
            </div>
            
            <h3 class="exp-title invisible">Experience</h3>
            <ul class="experience invisible">
            </ul>
            
            <hr>
            
            <div class = "expand-collapse collapsed">
                <div>
                    <ion-icon name="chevron-down-outline" class="up-down big-icon"></ion-icon>
                </div>
                <h4 class="more-less">Show more profile information</h4>
            </div>
        </li>
    `;

    const declined = `
        <li class="dashboard-detail-list-element" id="${juniorUid}">
            <div class="dashboard-detail-list-element-profile">
                <div class="dashboard-detail-list-element-profile-image">
                    <img class="round-image" src="./images/kerwin.jpg" alt="avatar">
                </div>
                <div class="dashboard-detail-list-element-profile-info">
                    <h3>${juniorInfo.data().name} requested a referral to ${oppInfo[0]} at ${oppInfo[0]}.</h3>
                    <h4>${juniorInfo.data().major}</h4>
                </div>
                <div class="dashboard-detail-list-element-profile-btns">
                    <div class="red">
                        <ion-icon name="close-outline" class="small-icon"></ion-icon>
                    </div>
                    <h3 class="red">Declined</h3>
                </div>
            </div>
            <hr class="invisible">
            
            <div class = 'about invisible'>
                <h3>About</h3>
                <h4>${juniorInfo.data().about}</h4>
            </div>
            
            <h3 class="exp-title invisible">Experience</h3>
            <ul class="experience invisible">
            </ul>
            
            <hr>
            
            <div class = "expand-collapse collapsed">
                <div>
                    <ion-icon name="chevron-down-outline" class="up-down big-icon"></ion-icon>
                </div>
                <h4 class="more-less">Show more profile information</h4>
            </div>
        </li>
    `;


    if (status == "pending"){
        document.querySelector('.dashboard-detail-list').insertAdjacentHTML('beforeend',pending);
        seniorOppDetailCounter[1]++;
    } else if (status == "accepted"){
        document.querySelector('.dashboard-detail-list').insertAdjacentHTML('beforeend',accepted);
        seniorOppDetailCounter[2]++;
    } else {
        document.querySelector('.dashboard-detail-list').insertAdjacentHTML('beforeend',declined);
        seniorOppDetailCounter[3]++;
    }
    
};
