import Home from './models/home';
import Opp from './models/opportunities';
import Contacts from './models/contacts';
import Chat from './models/chat';
import {elements} from './views/base';
import * as contactsView from './views/contactsView'; 
import * as chatView from './views/chatView';
import * as homeView from './views/homeView';
import * as oppView from './views/oppView';


//experimental area


const state = {};
state.home = new Home("whatever");
state.opp = new Opp("Ishmael");
state.contacts = new Contacts("chat");
state.image = "../images/kerwin.jpg";
state.home.collapsed = false;
state.menuCollapsed = false;


const controlHome = async () => {
    //1) Get contact list(array)
    await state.home.getHomeData();
    
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
    oppView.clearOpps();

    //3) Render contacts on UI
    oppView.renderOpps(state.opp.result.opportunities);
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
    
    $(function(){
        $('#the-btn').click(function(e){
            //e.preventDefault();
            console.log('the button clicked.');
            
            const message = {};
            message.content = $('#type-box').val();
            //console.log($('#type-box'));
            //console.log(message.content);
            
            if (message.content){
                $.ajax({
                    type: 'POST',
                    data:  JSON.stringify(message),
                    contentType: 'application/json',
                    url: 'http://localhost:5000/',
                    success: function(){
                        console.log('successssssss');
                    },
                    error: function(){
                        console.log('failed');
                    }
                });
            }
            
            
        });  
    });
};





//Collapse Menu
elements.collapse.addEventListener('click', e => {
    e.preventDefault();
    const tab = e.target.closest('.collapse');
    if (!state.menuCollapsed){
        collapseMenu();
    } else if (state.menuCollapsed){
        expandMenu();
    }
});

const collapseMenu = function() {
    //console.log("success");
    state.menuCollapsed = true;
    const labelled = document.querySelectorAll('.collapse-label');
    labelled.forEach(labelCollapse);
    elements.navi.classList.add('collapsed-navigator');
    document.querySelector('.collapse-icon').innerHTML = `
        <ion-icon name="arrow-forward-outline" class="small-icon"></ion-icon>
    `;
};

const expandMenu = function(){
    //console.log("success");
    state.menuCollapsed = false;
    const labelled = document.querySelectorAll('.collapse-label');
    labelled.forEach(labelExpand);
    elements.navi.classList.remove('collapsed-navigator');
    document.querySelector('.collapse-icon').innerHTML = `
        <ion-icon name="arrow-back-outline" class="small-icon"></ion-icon>
    `;
};

const labelCollapse = function(el){
    el.classList.add('invisible');
};

const labelExpand = function(el){
    el.classList.remove('invisible');
};










//3 main function tabs
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


const screenSwitch = async function (tab){
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
                    </ul>
                    <div class="search-bar opp-search-bar">
                        <div>
                            <ion-icon name="search-outline" class="small-icon"></ion-icon>
                        </div>
                        <input type="text" name="search" placeholder="Search job title, companies, etc.">
                    </div>
                </div>
                <ul class = "opp-column">
                </ul>
            </div>
        </div>
    `;
    
    const oppSetUp = `
        <div class="opp-container">
            <div class="opp-top">
                <div class="search-bar opp-search-bar">
                    <div>
                        <ion-icon name="search-outline" class="small-icon"></ion-icon>
                    </div>
                    <input type="text" name="search" placeholder="Search job title, companies, etc.">
                </div>
                <div class="filter-bar">
                    <ul class="filters">
                        <li class="filter">
                            <h4>Filter 1</h4>
                            <ion-icon name="chevron-down-outline" class="small-icon"></ion-icon>
                        </li>
                        <li class="filter">
                            <h4>Filter 2</h4>
                            <ion-icon name="chevron-down-outline" class="small-icon"></ion-icon>
                        </li>
                        <li class="filter">
                            <h4>Filter 3</h4>
                            <ion-icon name="chevron-down-outline" class="small-icon"></ion-icon>
                        </li>
                    </ul>
                    <div class="clear-bar">
                        <ion-icon name="close-outline" class="small-icon"></ion-icon>
                        <h4>Clear Filter</h4>
                    </div>
                </div>
            </div>
            
            
            <div class="referral-box">
                <ul class="referral-row" id="row-0">
                    <li class="referral">
                        <h3 class='opp-category'>SUBJECT CATEGORY</h3>
                        <div>
                            <h2>Job Title</h2>
                            <h3>Company Name</h3>
                            <h3 class="opp-alumni">from Alumni Name</h3>
                        </div>
                    </li>
                    <li class="referral">
                        <h3 class='opp-category'>SUBJECT CATEGORY</h3>
                        <div>
                            <h2>Job Title</h2>
                            <h3>Company Name</h3>
                            <h3 class="opp-alumni">from Alumni Name</h3>
                        </div>
                    </li>
                    <li class="referral">
                        <h3 class='opp-category'>SUBJECT CATEGORY</h3>
                        <div>
                            <h2>Job Title</h2>
                            <h3>Company Name</h3>
                            <h3 class="opp-alumni">from Alumni Name</h3>
                        </div>
                    </li>
                </ul>
                <ul class="referral-row" id="row-1">
                    <li class="referral">
                        <h3 class='opp-category'>SUBJECT CATEGORY</h3>
                        <div>
                            <h2>Job Title</h2>
                            <h3>Company Name</h3>
                            <h3 class="opp-alumni">from Alumni Name</h3>
                        </div>
                    </li>
                    <li class="referral">
                        <h3 class='opp-category'>SUBJECT CATEGORY</h3>
                        <div>
                            <h2>Job Title</h2>
                            <h3>Company Name</h3>
                            <h3 class="opp-alumni">from Alumni Name</h3>
                        </div>
                    </li>
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
                        <input type="text" name="message-input-field" id="type-box">
                    </div>
                    <div class="button-bar">
                        <div>&nbsp;</div>
                        <input type="submit" name="send-button" class="send-btn" id="the-btn">
                    </div>
                </div>
            </div>
        </div>
    `;
    

    
    
    if (state.tab == '1'){
       elements.container.insertAdjacentHTML('beforeend',homeSetUp);
        await controlHome();
        state.home.pending = homeView.oppStatus[0];
        state.home.accepted = homeView.oppStatus[1];
        state.home.declined = homeView.oppStatus[2];
        
        
        const oppBarSetUp = `
            <li class = "opp-bar-button">
                <h4>All(${state.home.pending + state.home.accepted + state.home.declined})</h4>
            </li>
            <li class = "opp-bar-button">
                <h4>Pending(${state.home.pending})</h4>
            </li>
            <li class = "opp-bar-button">
                <h4>Accepted(${state.home.accepted})</h4>
            </li>
            <li class = "opp-bar-button">
                <h4>Declined(${state.home.declined})</h4>
            </li>
        `;
        document.querySelector('.opp-bar').insertAdjacentHTML('afterbegin',oppBarSetUp);
        
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
    else if (state.tab == '2'){
        billFunction(oppSetUp);
    }
    else if (state.tab == '3'){
        elements.container.insertAdjacentHTML('beforeend',messageSetUp);
        //console.log("Screen fully Setup");
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
    
};

const billFunction = function(oppSetUp){
    elements.container.insertAdjacentHTML('beforeend',oppSetUp);
    controlOpp();

    document.querySelector('.referral-box').addEventListener('click', e => {
        const btn = e.target.closest('.referral');

        if(btn) {
            // clear right screen
            clearScreen();
            // render temp 2
            oppView.renderDetail(state.opp.result.opportunities[btn.id]);

            document.querySelector('.back-top').addEventListener('click', e => {
                const btn2 = e.target.closest('.back-top');

                if(btn) {
                    // clear right screen
                    clearScreen();
                    // render temp 2
                    billFunction(oppSetUp);
                }
            });
            
            document.querySelector('.ref-request').addEventListener('click', e => {
                const btn3 = e.target.closest('.ref-request');

                if(btn3 && btn3.id == 0) {
                    // UI change
                    btn3.innerHTML = `
                        <div class="ref-request" id="1">
                            <button type="button">Request Sent!</button>
                        </div>
                    `;
                } else if(btn3 && btn3.id == 1) {
                    btn3.innerHTML = `
                        <div class="ref-request" id="0">
                            <button type="button">Request a Referral</button>
                        </div>
                    `;
                }
            });
        }
    });
};

const clearScreen = function(){
    const container = document.querySelector(".container").childNodes;
    let temp = 0;

    while(temp < container.length){
        if(container[temp].nodeName == "DIV" && !container[temp].classList.contains("navigator")) {
                elements.container.removeChild(container[temp]);
        }
        temp++;
    }

    console.log("screen clear success");
};



//????????????????????????????????????????????
tabSwitch(document.getElementById("default"));


















