export const clearOpps = () => {
  document.querySelector('.referral-box').innerHTML = '';
  counter = 0;
};

let counter = 0;

export const renderOpp = (opp,tag,oppId) => {
  const markup = `
    <li class="referral" id='${oppId}' value="${tag}">
      <h3 class='opp-category'>${opp.data().category}</h3>
      <div>
        <h2>${opp.data().title}</h2>
        <h3>${opp.data().company}</h3>
        <h3 class="opp-alumni">from ${opp.data().alumni}</h3>
      </div>
    </li>
  `;
  const temp = Math.floor(tag/3);
  
  document.getElementById(`row-${temp}`).insertAdjacentHTML('beforeend',markup);
  
};

export const renderOpps = (opps,isSenior) => {
  let counter = 0;
  let idCounter = 0;
  let idArray = [];
  opps.forEach(opp=>{
    idArray.push(opp.id);
  });
  
  for (let i=0; i<Math.ceil((idArray.length+1)/3); i++){
    const markup = `<ol class="referral-row" id="row-${i}"></ol>`;
    document.querySelector('.referral-box').insertAdjacentHTML('beforeend',markup);
  }
  
  opps.forEach(opp=>{
    renderOpp(opp,idCounter,idArray[idCounter]);
    idCounter++;
  })

  //render Senior Post New Opp Btn
  if(isSenior){
    const markup = `
      <li class="add-referral-template" id='senior-post-opp-btn' value="asdf">
        <div>
          <ion-icon name="add-outline"></ion-icon>
        </div>
        <h4>Post A New Opportunity</h4>
      </li>
    `;
    const temp = Math.floor(idCounter/3);
    document.getElementById(`row-${temp}`).insertAdjacentHTML('beforeend',markup);
  }
  
};

export const renderDetail = opp => {
  const markup = `
    <div class="referral-detail">
      <div class="back-top" id="opp-back-top">
        <div>
          <ion-icon name="arrow-back-outline" class="big-icon"></ion-icon>
        </div>
        <h2>Back</h2>
      </div>
      
      <hr class="good-line">
      
      <div class="detail-mid">
        <div class="ref-info">
          <h1>${opp.data().title}</h1>
          <h3>${opp.data().company}</h3>
          <h4>Posted by ${opp.data().alumni}</h4>
        </div>
        <div class="ref-request">
          <button type="button">Request a Referral</button>
        </div>
      </div>
      <ul class="ref-descriptions">
        <li class="ref-description">
          <h3>Info</h3>
          <h4>${opp.data().description}</h4>
        </li>
        <li class="ref-description">
          <h3>Info</h3>
          <h4>${opp.data().description}</h4>
        </li>
        <li class="ref-description">
          <h3>Info</h3>
          <h4>${opp.data().description}</h4>
        </li>
      </ul>
    </div>
  `;
  
  document.querySelector(`.right-container`).insertAdjacentHTML('beforeend',markup);
};
