import {elements} from './base';

export const clearChat = () => {
    document.querySelector('.chat-history').innerHTML = '';
    document.querySelector('.profile').innerHTML = '';
};

export const renderProfile = contact => {
    const markup = `
        <div class="profile-image">
            <img class="round-image" src="${contact.profile.image}">
        </div>
        <div class="profile-info">
            <h3 class="profile-name">${contact.profile.name}</h3>
            <h3 class="profile-major">${contact.profile.major}</h3>
            <h3 class="profile-career">${contact.profile.name} will refer you to the position at ${contact.profile.company}.</h3>
        </div>
    `;
    
    document.querySelector('.profile').insertAdjacentHTML('beforeend',markup);
};

const renderChat = (imageLeft,imageRight,message) => {
    let markup;
    if (message.chatSender === "other"){
        markup = `
            <li class="message-received">
                <div class="message-avatar"><img class="round-image" src="${imageLeft}"></div>
                <div class="message-text talk-bubble tri-right left-top">
                    <div class="talktext">
                        <p>${message.chatContent}</p>
                    </div>
                </div>
                <div class="message-empty">&nbsp;</div>
            </li>
        `;
    } else {
        markup = `
            <li class="message-sent">
                <div class="message-avatar"><img class="round-image" src="${imageRight}"></div>
                <div class="message-text talk-bubble tri-right right-top">
                    <div class="talktext">
                        <p>${message.chatContent}</p>
                    </div>
                </div>
                <div class="message-empty">&nbsp;</div>
            </li>
        `;
    }
    
    
    document.querySelector('.chat-history').insertAdjacentHTML('beforeend',markup);
};

export const renderChats = (imageLeft,imageRight,messages) => {
    let counter = 0;
    while (counter < messages.length){
        renderChat(imageLeft,imageRight,messages[counter]);
        counter++;
    }
    //messages.forEach(el => renderChat(imageLeft, imageRight, el));
};