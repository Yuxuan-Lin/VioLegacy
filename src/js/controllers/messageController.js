import Messages from '../models/messages';
import {elements} from '../views/base';
import * as contactsView from '../views/contactsView'; 
import * as chatView from '../views/chatView';


export const controlContacts = async (state) => {
    // render Profile UI
    await state.messages.getContacts(contactsView.renderContact);
    //contactsView.renderContacts(state.messages.contacts);
};

export const controlChat = async (state,chatId,chatterUid) => {

    // render Profile UI
    await state.messages.getAlumniProfile(chatterUid);
    chatView.renderProfile(state.messages.alumniProfile, state.messages.alumniProfilePic);
    
    // render Chat UI
    await state.messages.getMessages(chatId, chatView.renderChat,state.home.profilePic);
};

export const messageScreen = (state) => {
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
                <div class="type-field invisible">
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

    elements.container.insertAdjacentHTML('beforeend',messageSetUp);
    //console.log("Screen fully Setup");
    controlContacts(state);
    document.querySelector('.contact-list').addEventListener('click', e => {
        const btn = e.target.closest('.contact-person').id;
        state.messages.currentChatId = btn.split(";")[0];
        if (btn) {
            document.querySelector('.type-field').classList.remove('invisible');
            chatView.clearChat();
            controlChat(state, btn.split(";")[0], btn.split(";")[1]);
            //searchView.clearResults();
            //searchView.renderResults(state.search.result, goToPage);
        }
    });
    
    document.querySelector('.type-field').addEventListener('click', e => {
        e.preventDefault();
        const btn = e.target.closest('#the-btn');

        if (btn){
            const typeBox = btn.parentNode.parentNode.childNodes[3].childNodes[1];
            if (typeBox.value){
                const now = new firebase.firestore.Timestamp.now().toDate();
                const message = typeBox.value;
                state.messages.sendMessage(message, state.messages.currentChatId,now);
                typeBox.value = '';
                document.body.scrollTop = document.body.scrollHeight;
            }
        }        
    });

    const searchResUI = document.querySelector('.search-results');

    document.querySelector('.search-btn').addEventListener('click', async e =>  {
        e.preventDefault();
        const btn = e.target.closest('.search-btn');
        if(btn){
            const searchContent = btn.parentNode.childNodes[3].value;
            await state.messages.getSearchResults(searchContent);
            contactsView.renderSearchResults(state.messages.searchRes);
            searchResUI.classList.remove("invisible");
        }

    })

    searchResUI.addEventListener('click', async e=>{
        const btn = e.target.closest('.search-result-person');
        const chatter = btn.parentNode.parentNode.childNodes[1].childNodes[3];
        console.log(chatter);

        if (btn){
            state.messages.chatExists = false;
            await state.messages.doesChatExists(btn.id,state.user.uid);
            if (state.messages.chatExists){
                console.log("Conversation between you and search target already exists.");
                chatView.clearChat();
                controlChat(state,state.messages.searchChatId,btn.id);
            } else {
                await state.messages.createNewChat(btn.id,chatter.value,state.user.name);
            }
        }
        searchResUI.classList.add("invisible");
        contactsView.removeSearchResults();
        chatter.value = "";
    });
};