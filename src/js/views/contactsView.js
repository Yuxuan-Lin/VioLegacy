export const renderContact = (doc,profilePic) => {
    if(profilePic == undefined){
        profilePic = "./images/default-avatar.png";
    }
    const markup = `
        <li class="contact-person" id="${doc.id+';'+doc.chatterUid}">
            <div class="person-image">
                <img class="round-image" src="${profilePic}" alt="${doc.chatterName}">
            </div>
            <div class="person-info">
                <div class="person-top">
                    <h3 class="name">${doc.chatterName}</h3>
                </div>
            </div>
        </li>
    `;
    // <h3 class="time">${doc.history[doc.history.length-1].time.toDate()}</h3>
    // <h3>${doc.history[doc.history.length-1].content}</h3>
   
   document.querySelector('.contact-list').insertAdjacentHTML('beforeend',markup);
};

export const renderContacts = (chatData) => {
    chatData.forEach(doc => {
        renderContact(doc);
    });
};

export const renderSearchRes = (profile) => {
    const markup = `
        <li class="search-result-person" id="${profile.id}">
            <div class="person-image"><img class="round-image" src="images/Bill.jpg"></div>
            <h3 class="person-name">${profile.data.name}</h3>
        </li>
    `;
    document.querySelector('.search-results').insertAdjacentHTML('beforeend',markup);
};

export const renderSearchResults = (profileArr) => {
    document.querySelector('.search-results').innerHTML = `<p> Search Results Below </p>`;
    profileArr.forEach(renderSearchRes);
};

export const removeSearchResults = () => {
    document.querySelector('.search-results').innerHTML = ``;
}
