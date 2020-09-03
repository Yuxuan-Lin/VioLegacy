import Home from './models/home';
import Opp from './models/opportunities';
import Contacts from './models/contacts';
import Chat from './models/chat';
import {elements} from './views/base';
import * as contactsView from './views/contactsView'; 
import * as chatView from './views/chatView';
import * as homeView from './views/homeView';


//experimental area


const state = {};
state.home = new Home("whatever");
state.opp = new Opp("Ishmael");
state.contacts = new Contacts("chat");
state.image = "../images/kerwin.jpg";
state.home.collapsed = false;

const controlHome = async () => {
    //1) Get contact list(array)
    await state.home.getHomeData();
    console.log(state.home.result.profile.image);
    //2) Prepare UI(optional)
    homeView.clearProfile();
    
    //3) Render UI
    homeView.renderProfile(state.home.result);
    homeView.renderAbout(state.home.result);
    homeView.renderExps(state.home.result.profile.experience);
    homeView.renderOpps(state.home.result.opportunities);
    console.log('home fully rendered');
    
    //1) Get chatHistory(array) and profile

    //2) Prepare UI(clear field)

    //3) Render chatHistroy and profile on UI    
};

const controlOpp = async () => {
    //1) Get contact list(array)
    
    await state.opp.getOppData();
    
    //2) Prepare UI(optional)

    //3) Render contacts on UI

    //1) Get chatHistory(array) and profile

    //2) Prepare UI(clear field)

    //3) Render chatHistroy and profile on UI
    
    
    
};

const controlContacts = async () => {
    //1) Get contact list(array)
    
    await state.contacts.getContacts();
    
    //2) Prepare UI(optional)

    //3) Render contacts on UI
    contactsView.renderContacts(state.contacts.result);


    //1) Get chatHistory(array) and profile

    //2) Prepare UI(clear field)

    //3) Render chatHistroy and profile on UI
    
    
    
};

const controlChat = async (id=0) => {
    // render Profile UI
    await state.contacts.getContacts();
    chatView.renderProfile(state.contacts.result[id]);
    
    // render Chat UI
    chatView.renderChats(state.contacts.result[id].profile.image, state.image, state.contacts.result[id].chatHistory);
};



controlOpp();


elements.tools.addEventListener('click', e => {
    e.preventDefault();
    const tab = e.target.closest('.tab');
    console.log(tab);
    tabSwitch(tab);
});

const tabSwitch = function (tab){
    
    const id = parseInt(tab.parentNode.id);
    console.log(id);
    if (id != 0 && id != 4){
        screenSwitch(tab);

        //clear
        let markup = tab.parentNode.parentNode.childNodes;
        //console.log(markup);
        for (let i=1; i<11; i=i+2){
            markup[i].classList = [];
            markup[i].childNodes[1].classList = ['tab'];
        }

        //above selected change
        markup[1 + (parseInt(tab.parentNode.id) - 1) * 2].classList.add('above-selected');
        markup[1 + (parseInt(tab.parentNode.id) - 1) * 2].childNodes[1].classList.add('special-tab-1');

        //selected tab change
        tab.parentNode.classList.add('selected-tab');

        //below selected change
        markup[1 + (parseInt(tab.parentNode.id) + 1) * 2].classList.add('below-selected');
        markup[1 + (parseInt(tab.parentNode.id) + 1) * 2].childNodes[1].classList.add('special-tab-2');
        console.log("tab highlighed");
    }
};


const screenSwitch = function (tab){
    state.tab = tab.parentNode.id;

    clearScreen();
    const homeSetUp = `
        <div class = "home-main">
            <div class = "home-profile">
                <div class = "home-top">
                </div>
                
                <hr class="good-line">
                
                <div class = 'about'>
                    <h3>About</h3>
                </div>
                
                <h3 class="exp-title">Experience</h3>
                <ul class="experience">
                </ul>
                
                <hr class="good-line">
                
                <div class = "expand-collapse">
                    <div>
                        <ion-icon name="chevron-up-outline" class="up-down big-icon"></ion-icon>
                    </div>
                    <h4 class="more-less">Show less profile information</h4>
                </div>
                
            </div>
            
            
            <!-- ----------------------------------------- -->
            <div class = "home-opp">
                <h2 class="opp-title">My Opportunity Updates</h2>
                <div class = "opp-bar">
                    <ul class = "opp-bar-list">
                        <li class = "opp-bar-button">
                            <h4>All(?)</h4>
                        </li>
                        <li class = "opp-bar-button">
                            <h4>Pending(?)</h4>
                        </li>
                        <li class = "opp-bar-button">
                            <h4>Accepted(?)</h4>
                        </li>
                        <li class = "opp-bar-button">
                            <h4>Declined(?)</h4>
                        </li>
                    </ul>
                    <input type="text" name="search" placeholder="Search key words of applied opportunities.">
                </div>
                <ul class = "opp-column">
                </ul>
            </div>
        </div>
    `;
    
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
                        <input type="text" name="message-input-field">
                    </div>
                    <div class="button-bar">
                        <div>&nbsp;</div>
                        <input type="submit" name="send-button" class="send-btn">
                    </div>
                </div>
            </div>
        </div>
    `;
    
    
    if (state.tab == '1'){
        elements.container.insertAdjacentHTML('beforeend',homeSetUp);
        controlHome();
        console.log('the end');
        
        document.querySelector('.expand-collapse').addEventListener('click', e => {
            const btn = e.target.closest('.expand-collapse');
            if(btn) {
                if (state.home.collapsed){
                    homeView.expand();
                    state.home.collapsed = false;
                }
                else{
                    homeView.collapse();
                    state.home.collapsed = true;
                }
            }
        });
        
    }
    else if (state.tab == '3'){
        elements.container.insertAdjacentHTML('beforeend',messageSetUp);
        console.log("Screen fully Setup");
        controlContacts();
        controlChat();
        
        document.querySelector('.contact-list').addEventListener('click', e => {
            const btn = e.target.closest('.contact-person').id;
            if (btn) {
                chatView.clearChat();
                controlChat(btn);
                //searchView.clearResults();
                //searchView.renderResults(state.search.result, goToPage);
            }
        });
    }
    
    console.log(document.querySelector(".container").childNodes);
};

const clearScreen = function(){
    console.log(elements.container.childNodes);
    const container = document.querySelector(".container").childNodes;
    let temp = 0;
    console.log(container[1].nodeName);
    while(temp < container.length){
        if(container[temp].nodeName == "DIV" && container[temp].className != "navigator") {
                elements.container.removeChild(container[temp]);
        }
        temp++;
    }

    console.log("screen clear success");
    console.log('testing webpack');
    console.log(elements.container.childNodes);
};





















