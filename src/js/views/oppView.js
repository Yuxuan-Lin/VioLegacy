export const clearOpps = () => {
    document.querySelector('.referral-box').innerHTML = '';
    counter = 0;
};

let counter = 0;

export const renderOpp = (opp) => {
    const markup = `
        <li class="referral" id='${opp.id}'>
            <h3 class='opp-category'>${opp.category}</h3>
            <div>
                <h2>${opp.title}</h2>
                <h3>${opp.company}</h3>
                <h3 class="opp-alumni">from ${opp.alumni}</h3>
            </div>
        </li>
    `;
    const temp = Math.floor(counter/3);
    
    document.getElementById(`row-${temp}`).insertAdjacentHTML('beforeend',markup);
    
    counter++;
};

export const renderOpps = opps => {
    for (let i=0; i<Math.ceil(opps.length/3); i++){
        const markup = `<ul class="referral-row" id="row-${i}"></ul>`;
        document.querySelector('.referral-box').insertAdjacentHTML('beforeend',markup);
    }
    
    opps.forEach(renderOpp);
};

export const renderDetail = opp => {
    const markup = `
        <div class="referral-detail">
            <div class="back-top">
                <div>
                    <ion-icon name="arrow-back-outline" class="big-icon"></ion-icon>
                </div>
                <h2>Back</h2>
            </div>
            
            <hr class="good-line">
            
            <div class="detail-mid">
                <div class="ref-info">
                    <h1>${opp.title}</h1>
                    <h3>${opp.company}</h3>
                    <h4>Posted by ${opp.alumni}</h4>
                </div>
                <div class="ref-request">
                    <button type="button">Request a Referral</button>
                </div>
            </div>
            <ul class="ref-descriptions">
                <li class="ref-description">
                    <h3>Info</h3>
                    <h4>${opp.description}</h4>
                </li>
                <li class="ref-description">
                    <h3>Info</h3>
                    <h4>${opp.description}</h4>
                </li>
                <li class="ref-description">
                    <h3>Info</h3>
                    <h4>${opp.description}</h4>
                </li>
            </ul>
        </div>
    `;
    
    document.querySelector(`.container`).insertAdjacentHTML('beforeend',markup);
};