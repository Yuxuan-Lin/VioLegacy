import Opp from '../models/opportunities';
import {elements} from '../views/base';
import * as oppView from '../views/oppView';


const clearScreen = function(){
    elements.container.innerHTML = "";
 };
 


export const controlOpp = async (state) => {
    //1) Get contact list(array)
    await state.opp.getOppData();
    
    //2) Prepare UI(optional)
    oppView.clearOpps();

    //3) Render contacts on UI
    oppView.renderOpps(state.opp.opps);
    //1) Get chatHistory(array) and profile

    //2) Prepare UI(clear field)

    //3) Render chatHistroy and profile on UI
    
};


export const oppScreen = async function(state){
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

                </ul>
            </div>
        </div>   
    `;

    const billFunction = (state) => {
        elements.container.insertAdjacentHTML('beforeend',oppSetUp);
        controlOpp(state);

        document.querySelector('.referral-box').addEventListener('click', e => {
            const btn = e.target.closest('.referral');
            if(btn) {
                // clear right screen
                clearScreen();
                // render temp 2
                oppView.renderDetail(state.opp.opps[btn.id]);

                document.querySelector('.back-top').addEventListener('click', e => {
                    const btn2 = e.target.closest('.back-top');

                    if(btn) {
                        // clear right screen
                        clearScreen();
                        // render temp 2
                        billFunction(state,oppSetUp);
                    }
                });

                //console.log("attention: " + state.user.uid);
                //console.log("attention: " + state.opp.opps[btn.id].data().registered[1].uid);
                let flag = false;
                for (let i=0; i<state.opp.opps[btn.id].data().registered.length; i++){
                    if (state.opp.opps[btn.id].data().registered[i].uid == state.user.uid){
                        flag = true;
                    }
                }
                if (flag){
                    document.querySelector('.ref-request').innerHTML = `
                    <div class="ref-request" id="1">
                        <button type="button">Request Sent!</button>
                    </div>
                    `;
                } else {
                    document.querySelector('.ref-request').innerHTML = `
                    <div class="ref-request" id="0">
                        <button type="button">Request a Referral</button>
                    </div>
                    `;
                }


                document.querySelector('.ref-request').addEventListener('click', e => {
                    const btn3 = e.target.closest('.ref-request');
                    console.log("attention: "+state.opp.opps[btn.id].id);

                    if(btn3 && btn3.id == 0) {

                        
                        // UI change
                        btn3.innerHTML = `
                            <div class="ref-request" id="1">
                                <button type="button">Request Sent!</button>
                            </div>
                        `;
                        let tempArr = state.opp.opps[btn.id].data().registered;
                        tempArr.push({
                            name: state.home.profile.name,
                            uid: state.user.uid
                        });
                        //console.log(tempArr);
                        //console.log(state.opp.opps[btn.id].data().registered);
                        db.collection('Opportunities').doc(state.opp.opps[btn.id].id).update({
                            registered: tempArr
                        });
                        
                        
                    } else if(btn3 && btn3.id == 1) {
                        btn3.innerHTML = `
                            <div class="ref-request" id="0">
                                <button type="button">Request a Referral</button>
                            </div>
                        `;

                        let tempArr = [];
                        for (let i=0; i<state.opp.opps[btn.id].data().registered.length; i++){
                            if (state.opp.opps[btn.id].data().registered[i].uid != state.user.uid){
                                tempArr.push(state.opp.opps[btn.id].data().registered[i]);
                            }
                        }

                        db.collection('Opportunities').doc(state.opp.opps[btn.id].id).update({
                            registered: tempArr
                        });
                        

                    }

                    state.opp.getOppData();

                });
            }
        });
    }


    billFunction(state);
};