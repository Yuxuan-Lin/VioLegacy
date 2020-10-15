import Messages from '../models/messages';
import {elements} from '../views/base';
import * as contactsView from '../views/contactsView'; 
import * as chatView from '../views/chatView';


export const controlContacts = async (state) => {
    // render Profile UI
    await state.messages.getContacts();
    contactsView.renderContacts(state.messages.contacts, state.user.uid);
};

export const controlChat = async (state,chatId, chatterUid) => {
    // render Profile UI
    await state.messages.getAlumniProfile(chatterUid);
    chatView.renderProfile(state.messages.alumniProfile);
    
    // render Chat UI
    await state.messages.getMessages(chatId);
    chatView.renderChats(state.messages.history,state.user.uid,state.messages.selfPos);
};

export const messageScreen = (state) => {
    const messageSetUp = `
        <div class="contacts">
            <div class="search-bar">
                <div>
                    <ion-icon name="search-outline" class="small-icon"></ion-icon>
                </div>
                <input type="text" name="search" placeholder="Search names, chats, etc.">
            </div>
            <ul class="contact-list"></ul>
        </div>   
        <div class="chat-block">
            <div class="profile"></div>
            <div class="chat-box">
                <div class="chat-field">
                    <ul class="chat-history"></ul>
                </div>
                <div class="type-field">
                    <ul class="tool-bar">
                        <li class="tool-icon">
                            <ion-icon name="happy-outline" class="small-icon"></ion-icon>
                        </li>
                        <li class="tool-icon">
                            <ion-icon name="image-outline" class="small-icon"></ion-icon>
                        </li>
                        <li class="tool-icon">
                            <ion-icon name="mic-outline" class="small-icon"></ion-icon>
                        </li>
                        <li class="tool-icon">
                            <ion-icon name="folder-outline" class="small-icon"></ion-icon>
                        </li>
                        <li class="tool-icon">
                            <ion-icon name="link-outline" class="small-icon"></ion-icon>
                        </li>
                        <li class="tool-icon-special">
                            &nbsp;
                        </li>
                    </ul>
                    <div class="input-field">
                        <input type="textarea" name="message-input-field" id="type-box">
                    </div>
                    <div class="button-bar">
                        <div>&nbsp;</div>
                        <input type="submit" name="send-button" class="send-btn" id="the-btn">
                    </div>
                </div>
            </div>
        </div>
    `;

    //console.log(now)
    elements.container.insertAdjacentHTML('beforeend',messageSetUp);
    //console.log("Screen fully Setup");
    controlContacts(state);
    document.querySelector('.contact-list').addEventListener('click', e => {
        const btn = e.target.closest('.contact-person').id;
        state.messages.currentChatId = btn;
        if (btn) {
            chatView.clearChat();
            controlChat(state, btn.split(";")[0], btn.split(";")[1]);
            //searchView.clearResults();
            //searchView.renderResults(state.search.result, goToPage);
        }
    });

    console.log("submit: ");
    console.log(document.querySelector('#type-box'));
    
    
    document.querySelector('.type-field').addEventListener('click', e => {
        e.preventDefault();
        const btn = e.target.closest('#the-btn');
        console.log(btn);

        if (btn){
            const now = new firebase.firestore.Timestamp.now().toDate();
            const message = btn.parentNode.parentNode.childNodes[3].childNodes[1].value;
            //console.log(message);
            //console.log(state.messages.selfPos);
            state.messages.sendMessage(message, state.messages.currentChatId, state.messages.selfPos,now);
        }
        
    });
};
