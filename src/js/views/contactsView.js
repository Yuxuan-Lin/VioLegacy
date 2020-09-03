import {elements} from './base';

const renderContact = contact => {
    const markup = `
        <li class="contact-person" id="${contact.id}">
            <div class="person-image">
                <img class="round-image" src="${contact.profile.image}" alt="${contact.profile.name}">
            </div>
            <div class="person-info">
                <div class="person-top">
                    <h3 class="name">${contact.profile.name}</h3>
                    <h3 class="time">${contact.chatHistory[contact.chatHistory.length-1].chatTime}</h3>
                </div>
                <h3>${contact.chatHistory[contact.chatHistory.length-1].chatContent}</h3>
            </div>
        </li>
    `;
   
   document.querySelector('.contact-list').insertAdjacentHTML('beforeend',markup);
};

export const renderContacts = contacts => {
    contacts.forEach(renderContact);
};

