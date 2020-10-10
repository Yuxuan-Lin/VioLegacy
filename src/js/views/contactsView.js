import {elements} from './base';

const renderContact = (doc,i) => {
    console.log("triggered");
    const markup = `
        <li class="contact-person" id="${doc.id}">
            <div class="person-image">
                <img class="round-image" src="./images/Bill.jpg" alt="${doc.data().chatter[i].name}">
            </div>
            <div class="person-info">
                <div class="person-top">
                    <h3 class="name">${doc.data().chatter[i].name}</h3>
                    <h3 class="time">${doc.data().history[doc.data().history.length-1].time.toDate()}</h3>
                </div>
                <h3>${doc.data().history[doc.data().history.length-1].content}</h3>
            </div>
        </li>
    `;
   
   document.querySelector('.contact-list').insertAdjacentHTML('beforeend',markup);
};

export const renderContacts = (chatData,uid) => {
    chatData.forEach(doc => {
        if (doc.data().chatter[0].uid == uid || doc.data().chatter[1].uid == uid){
            renderContact(doc, (doc.data().chatter[0].uid == uid) ? 1 : 0);
        }
    });
};

