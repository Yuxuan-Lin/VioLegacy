import { homeScreen } from "../controllers/homeController";

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
                //console.log(opp);
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
    console.log(state);
    document.querySelector('.referral-box').addEventListener('click', async e => {
        const btn = e.target.closest('.referral');
        if(btn) {
            await state.opp.getSeniorOppRegistration(btn.id);
            state.home.seniorOppDetail = document.querySelector('.senior-myOpp-detail').parentNode;
            renderSeniorOppDetails(state.opp.seniorOppRegistration);
            state.home.seniorOppDetail.classList.remove('invisible');
            state.home.seniorOppDetail.addEventListener('click',e => {
                e.preventDefault();
                const btn2 = e.target.closest('.senior-myOpp-detail');
                if(btn2 == null){
                    state.home.seniorOppDetail.classList.add("invisible");
                }
            });
        }
    });
};

let seniorOppDetailCounter = [0,0,0,0];

const renderSeniorOppDetails = (list) => {
    clearSeniorOppDetail();
    seniorOppDetailCounter = [0,0,0,0];
    list.forEach(headcount=>{
        renderSeniorOppDetail(headcount.data().status, headcount.data().name);
        seniorOppDetailCounter[0]++;
    });
    document.querySelector("#senior-myOpp-detail-body-all").textContent = `All (${seniorOppDetailCounter[0]})`;
    document.querySelector("#senior-myOpp-detail-body-pending").textContent = `Pending (${seniorOppDetailCounter[1]})`;
    document.querySelector("#senior-myOpp-detail-body-accepted").textContent = `Accepted (${seniorOppDetailCounter[2]})`;
    document.querySelector("#senior-myOpp-detail-body-declined").textContent = `Declined (${seniorOppDetailCounter[3]})`;
};

const renderSeniorOppDetail = (status,name) => {
    const pending = `
        <li class = "opp-column-item">
            <div class="opp-item-left">
                <h2>${name}</h2>
            </div>
            <div class="opp-item-right">
                <div class="opp-item-icon">
                    <ion-icon name="timer-outline" class="big-icon violet"></ion-icon>
                </div>
                <div class="opp-item-status">
                    <h4>You haven't made a decison.</h4>
                </div>
            </div>
        </li>
        <hr>
    `;

    const accepted = `
        <li class = "opp-column-item">
            <div class="opp-item-left">
                <h2>${name}</h2>
            </div>
            <div class="opp-item-right">
                <div class="opp-item-icon">
                    <ion-icon name="checkmark-circle-outline" class="big-icon green"></ion-icon>
                </div>
                <div class="opp-item-status">
                    <h4>You have accepted ${name}’s request. You can now message ${name}.</h4>
                </div>
            </div>
        </li>
        <hr>
    `;

    const declined = `
        <li class = "opp-column-item">
            <div class="opp-item-left">
                <h2>${name}</h2>
            </div>
            <div class="opp-item-right">
                <div class="opp-item-icon">
                    <ion-icon name="close-circle-outline" class="big-icon red"></ion-icon>
                </div>
                <div class="opp-item-status">
                    <h4>You have declined ${name}’s request. </h4>
                </div>
            </div>
        </li>				
        <hr>
    `;

    if (status == "pending"){
        document.querySelector('.senior-myOpp-detail-body-list').insertAdjacentHTML('beforeend',pending);
        seniorOppDetailCounter[1]++;
    } else if (status == "accepted"){
        document.querySelector('.senior-myOpp-detail-body-list').insertAdjacentHTML('beforeend',accepted);
        seniorOppDetailCounter[2]++;
    } else {
        document.querySelector('.senior-myOpp-detail-body-list').insertAdjacentHTML('beforeend',declined);
        seniorOppDetailCounter[3]++;
    }
 }

 const clearSeniorOppDetail = () => {
     document.querySelector(".senior-myOpp-detail-body-list").innerHTML="";
 }