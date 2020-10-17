import Messages from '../models/messages';
import {elements} from '../views/base';
import * as contactsView from '../views/contactsView'; 
import * as chatView from '../views/chatView';


export const controlContacts = async (state) => {
    // render Profile UI
    await state.messages.getMessages();
    //console.log(state.messages.chatData.data());

    contactsView.renderContacts(state.messages.chatData, state.user.uid);
};

export const controlChat = async (state,chatId) => {
    // render Profile UI
    await state.messages.getConversation(chatId);

    // find and render alumni profile
    let chatterUid;
    state.messages.chatData.forEach(doc => {     
        //console.log(state.user.uid);
        if (doc.data().chatter[0].uid == state.user.uid || doc.data().chatter[1].uid == state.user.uid){
            if (doc.data().chatter[0].uid == state.user.uid){               
                chatterUid = doc.data().chatter[1].uid;
            } else {
                chatterUid = doc.data().chatter[0].uid;
            }
        }
    });
    await state.messages.getAlumniProfile(chatterUid);
    chatView.renderProfile(state.messages.alumniProfile);
    
    // render Chat UI
    state.messages.chatData.forEach(doc => {
        if (doc.data().chatter[0].uid == state.user.uid || doc.data().chatter[1].uid == state.user.uid){
            if(doc.data().chatter[0].uid == state.user.uid){
                state.messages.selfPos = 0;
            }
            else{
                state.messages.selfPos = 1;
            }
        }
    });

    chatView.renderChats(state.messages.chatData,state.user.uid,state.messages.selfPos,state);
    //state.messages.selfPos = chatView.renderChats(state.messages.chatData,state.user.uid);
    //console.log(state.messages.selfPos)
    
};

export const messageScreen = async (state) => {
    const messageSetUp = `
        <div class="contacts">
            <div class="search-bar">
                <div class = "search-btn">
                    <ion-icon name="search-outline" class="small-icon"></ion-icon>
                </div>
                <input type="text" name="search" placeholder="Search names, chats, etc.">
            </div>
            <ul class="search-results invisible">
                <p> Search Results Below </p>
			</ul>
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

    const searchSetUp = `
        <li class="search-result-person">
            <div class="person-image"><img class="round-image" src="images/Bill.jpg"></div>
            <div class="person-name">
                <h3 class="name">Bill Ruochen Gu</h3>
            </div>
        </li>
    `;

    elements.container.insertAdjacentHTML('beforeend',messageSetUp);
    //console.log("Screen fully Setup");
    controlContacts(state);
    document.querySelector('.contact-list').addEventListener('click', e => {
        const btn = e.target.closest('.contact-person');
        state.messages.currentChatId = btn;
        if (btn) {
            chatView.clearChat();
            controlChat(state,btn.id);
            //searchView.clearResults();
            //searchView.renderResults(state.search.result, goToPage);
        }
    });
    
    
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

    const searchResUI = document.querySelector('.search-results');

    document.querySelector('.search-btn').addEventListener('click', async e =>  {
        e.preventDefault();
        const btn = e.target.closest('.search-btn');
        console.log(btn);
        if(btn){
            const searchContent = btn.parentNode.childNodes[3].value;
            await state.messages.getSearchResults(searchContent);
            contactsView.renderSearchResults(state.messages.searchRes);
            searchResUI.classList.remove("invisible");
        }

    })

};
