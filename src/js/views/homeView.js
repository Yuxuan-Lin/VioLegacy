export const clearProfile = () => {
    document.querySelector('.home-top').innerHTML = '';
    document.querySelector('.about').innerHTML = '';
    document.querySelector('.experience').innerHTML = '';
    document.querySelector('.opp-column').innerHTML = '';
};

export const renderProfile = self => {
    const markup = `
        <div class = "profile-pic">
            <img class="round-image" src="${self.profile.image}" alt="${self.profile.name}">
        </div>
        <div class = "home-top-info">
            <h2>${self.profile.name}</h2>
            <h3>${self.profile.major}</h3>
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
        <h4>${self.profile.about}</h4>
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

export const renderOpp = opp => {
    let markup = `
        <li class = "opp-column-item">
            <div class="opp-item-left">
                <h2>${opp.position}</h2>
                <h4>${opp.company}</h4>
            </div>
    `;
    
    if (opp.status == "Pending") {
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
    else if(opp.status == "Accepted") {
        markup += `
            <div class="opp-item-right">
                <div class="opp-item-icon">
                    <ion-icon name="checkmark-circle-outline" class="big-icon green"></ion-icon>
                </div>
                <div class="opp-item-status">
                    <h4>Si Li has accepted your request. You may soon receive an email from [Company Name]. If not, you can message Si Li.</h4>
                </div>
            </div>
        </li>

        <hr>
    `;
    }
    else {
        markup += `
            <div class="opp-item-right">
                <div class="opp-item-icon">
                    <ion-icon name="close-circle-outline" class="big-icon red"></ion-icon>
                </div>
                <div class="opp-item-status">
                    <h4>Wu Zhao has declined your request.</h4>
                </div>
            </div>
        </li>

        <hr>
    `;
    }
     document.querySelector('.opp-column').insertAdjacentHTML('beforeend',markup);
};

export const renderOpps = opps => {
    opps.forEach(renderOpp);
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












