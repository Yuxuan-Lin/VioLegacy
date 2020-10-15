import {elements} from './base';

const renderContact = (doc) => {
    const markup = `
        <li class="contact-person" id="${doc.id+';'+doc.chatterUid}">
            <div class="person-image">
                <img class="round-image" src=${"./images/Bill.jpg"} alt="${doc.chatterName}">
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

export const renderContacts = (chatData,uid) => {
    chatData.forEach(doc => {
        renderContact(doc);
    });
};

