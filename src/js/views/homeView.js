export const clearProfile = () => {
    document.querySelector('.home-top').innerHTML = '';
    document.querySelector('.about').innerHTML = '';
    document.querySelector('.experience').innerHTML = '';
    document.querySelector('.opp-column').innerHTML = '';
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
        <div class="home-top-icon">
            <ion-icon name="pencil-outline" class="big-icon"></ion-icon>
        </div>
    `;
    
    document.querySelector('.home-top').insertAdjacentHTML('beforeend',markup);
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
            <h4>${experience.time} and ${experience.location}</h4>
            <h4>${experience.description}
            </h4>
        </li>
    `;
     document.querySelector('.experience').insertAdjacentHTML('beforeend',markup);
};

export const renderExps = experiences => {
    experiences.forEach(renderExp);
};

export let oppStatus = [0,0,0];
export const renderOpp = (profile,opp,i) => {

    let markup = `
        <li class = "opp-column-item">
            <div class="opp-item-left">
                <h2>${opp.title}</h2>
                <h4>${opp.company}</h4>
            </div>
    `;
    
    let isAccepted = false;
    let isDeclined = false;
    
    if (profile.myOpps[i].status == "pending") {
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
    else if (profile.myOpps[i].status == "accepted") {
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

export const renderOpps = async (profile,opps) => {
    //console.log(await db.collection('Opportunities').doc('6WWXIkveZkOEUYoEyRdG').get().data());
    for (let i=0; i<profile.myOpps.length; i++){
        opps.forEach(opp => {
            if (opp.id == profile.myOpps[i].uid){
                renderOpp(profile,opp.data(),i);
            }
        })
        
    }
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












