import {elements} from './base';

export const clearChat = () => {
    document.querySelector('.chat-history').innerHTML = '';
    document.querySelector('.profile').innerHTML = '';
};

export const renderProfile = (profile) => {
        
    const markup = `
        <div class="profile-image">
            <img class="round-image" src="./images/Bill.jpg">
        </div>
        <div class="profile-info">
            <h3 class="profile-name">${profile.name}</h3>
            <h3 class="profile-major">${profile.major}</h3>
            <h3 class="profile-career">${profile.name} will refer you to the position at ${profile.company}.</h3>
        </div>
    `;
    
    document.querySelector('.profile').insertAdjacentHTML('beforeend',markup);
};

const renderChat = (message, isRight) => {
    let markup;
    if (isRight){
        markup = `
            <li class="message-received">
                <div class="message-avatar"><img class="round-image" src="./images/Bill.jpg"></div>
                <div class="message-text talk-bubble tri-right left-top">
                    <div class="talktext">
                        <p>${message.content}</p>
                    </div>
                </div>
                <div class="message-empty">&nbsp;</div>
            </li>
        `;
    } else {
        markup = `
            <li class="message-sent">
                <div class="message-avatar"><img class="round-image" src="./images/Bill.jpg"></div>
                <div class="message-text talk-bubble tri-right right-top">
                    <div class="talktext">
                        <p>${message.content}</p>
                    </div>
                </div>
                <div class="message-empty">&nbsp;</div>
            </li>
        `;
    }
    
    
    document.querySelector('.chat-history').insertAdjacentHTML('beforeend',markup);
};

export const renderChats = (chatData,uid) => {
    let counter = 0, selfPos;

    chatData.forEach(doc => {
        if (doc.data().chatter[0].uid == uid || doc.data().chatter[1].uid == uid){


            if(doc.data().chatter[0].uid == uid){
                selfPos = 0;
            }
            else{
                selfPos = 1;
            }

            doc.data().history.forEach( message => {
                
                renderChat(message, selfPos == message.senderID);
            });

            return selfPos;
        }
    });

    //messages.forEach(el => renderChat(imageLeft, imageRight, el));
};