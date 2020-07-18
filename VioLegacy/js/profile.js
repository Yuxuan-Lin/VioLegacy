var infoController = (function(){

	var Profile = function(name,school,major,gradDate,gpa,picture){
		this.name = name;
		this.school = school;
		this.major = major;
		this.gradDate = gradDate;
		this.gpa = gpa;
		this.picture = picture
	};


	var Event = function(title,subject,company,eventDescription,date,location,id){
		this.title = title;
		this.subject = subject;
		this.company = company;
		this.eventDescription = eventDescription;
		this.date = date;
		this.location = location;
		this.id = id;
	};

	var Company = function(name,sector,logo){
		this.name = name;
		this.sector = sector;
		this.logo = logo;
	}

	var eventList = [];
	var companyList = [];
	var profile;
	var description;

	var subProfileList = [];

	return {
		addProfile : function(name,school,major,gradDate,gpa,picture){
			profile = new Profile(name,school,major,gradDate,gpa,picture);
			return profile;
		},

		addSubProfile : function(name,school,major,gradDate,gpa,picture){
			profile1 = new Profile(name,school,major,gradDate,gpa,picture);
			subProfileList.push(profile1);
			return profile1;
		},

		addCompany : function(name,sector,logo){
			var company1 = new Company(name,sector,logo);
			companyList.push(company1);
			return company1;
		},

		addEvent : function(title,subject,company,eventDescription,date,location){
			var id;

			if (eventList.length==0) id=0;
			else{
				id = eventList[eventList.length-1].id + 1;
			}
			
			var event1 = new Event(title,subject,company,eventDescription,date,location,id);
			eventList.push(event1);
		},

		getEventList : function(){
			return eventList;
		},

		setDescription : function(text){
			description = text;
		},

		getProfile : function(){
			return profile;
		},

		getDescription : function(){
			return description;
		},

		editProfile : function(name,school,major,gradDate,gpa){
			profile.name = name;
			profile.school = school;
			profile.major = major;
			profile.gradDate = gradDate;
			profile.gpa = gpa;
		},

		storeData : function(newPro){
			profile = new Profile(newPro.name, newPro.school, newPro.major , newPro.gradDate , newPro.gpa);
		}


	};


})();

var UIController = (function(){

	var DOMstrings = {
		profilePic : "#flex-img",
		profileName : "#name",
		profileSchool : "#school",
		profileMajor : "#major",
		profileGDate : "#gradDate",
		profileGPA : "#gpa",
		button : "#edit-button",
		mainProfile : ".main-profile",
		finishButton : "#finish",
		inputName : "#input-name",
		inputSchool : "#input-school",
		inputMajor : "#input-major",
		inputGradD : "#input-gradDate",
		inputGPA : "#input-gpa",
		button2 : "#intro-button",
		selfIntro : ".self-intro",
		description : "#description",
		inputDescription : "#input-description",
		mid : "#mid",
		recentItem : ".recent-item",
		recentItemList : "#recent-item-list",
		right : "#right",
		specialContainer : "#special-container"
	};


	return {
		getDOMstrings: function(){
			return DOMstrings;
		},

		displayProfile: function(obj){
			document.querySelector(DOMstrings.profileName).textContent = obj.name;
            document.querySelector(DOMstrings.profileSchool).textContent = obj.school;
            document.querySelector(DOMstrings.profileMajor).textContent = obj.major;
            document.querySelector(DOMstrings.profileGDate).textContent = obj.gradDate;
        	document.querySelector(DOMstrings.profileGPA).textContent = obj.gpa;
		},

		getInput : function(){
			var name = document.querySelector(DOMstrings.inputName).value;
            var school = document.querySelector(DOMstrings.inputSchool).value;
            var major = document.querySelector(DOMstrings.inputMajor).value;
            var gradDate = document.querySelector(DOMstrings.inputGradD).value;
        	var gpa = document.querySelector(DOMstrings.inputGPA).value;	
        	return {name, school, major, gradDate, gpa};	
        },

        getInput2 : function(){
			return document.querySelector(DOMstrings.inputDescription).value;
        },

		switchToEditMode: function(profile){
			var parent = document.querySelector(DOMstrings.mainProfile);
			document.querySelector(DOMstrings.button).textContent = 'finish';


			var tmpObj1=document.createElement("input");
			tmpObj1.placeholder = "Name";
			tmpObj1.value = profile.name;
			tmpObj1.classList.add('edit-input-mode');
			tmpObj1.id = "input-name";
			//tmpObj.textContent = profile.name;
			var orginalChild1 = document.querySelector(DOMstrings.profileName);
			parent.replaceChild(tmpObj1,orginalChild1);						

			var tmpObj2=document.createElement("input");
			tmpObj2.placeholder = "School";
			tmpObj2.value = profile.school;
			tmpObj2.classList.add('edit-input-mode');
			tmpObj2.id = "input-school";
			var orginalChild2 = document.querySelector(DOMstrings.profileSchool);
			parent.replaceChild(tmpObj2,orginalChild2);

			var tmpObj3=document.createElement("input");
			tmpObj3.placeholder = "Major";
			tmpObj3.value = profile.major;
			tmpObj3.classList.add('edit-input-mode');
			tmpObj3.id = "input-major";
			var orginalChild3 = document.querySelector(DOMstrings.profileMajor);
			parent.replaceChild(tmpObj3,orginalChild3);

			var tmpObj4=document.createElement("input");
			tmpObj4.placeholder = "Graduation Date";
			tmpObj4.value = profile.gradDate;
			tmpObj4.classList.add('edit-input-mode');
			tmpObj4.id = "input-gradDate";
			var orginalChild4 = document.querySelector(DOMstrings.profileGDate);
			parent.replaceChild(tmpObj4,orginalChild4);

			var tmpObj5=document.createElement("input");
			tmpObj5.placeholder = "GPA";
			tmpObj5.value = profile.gpa;
			tmpObj5.classList.add('edit-input-mode');
			tmpObj5.id = "input-gpa";
			var orginalChild5 = document.querySelector(DOMstrings.profileGPA);
			parent.replaceChild(tmpObj5,orginalChild5);
			
		},

		endEditMode : function(profile){
			var parent = document.querySelector(DOMstrings.mainProfile);
			document.querySelector(DOMstrings.button).textContent = 'edit';

			var tmpObj1=document.createElement("H2");
			var text1 = document.createTextNode(profile.name);
			tmpObj1.appendChild(text1);
			tmpObj1.id = "name";
			var orginalChild1 = document.querySelector(DOMstrings.inputName);
			parent.replaceChild(tmpObj1,orginalChild1);

			var tmpObj2=document.createElement("H3");
			var text2 = document.createTextNode(profile.school);
			tmpObj2.appendChild(text2);
			tmpObj2.id = "school";
			var orginalChild2 = document.querySelector(DOMstrings.inputSchool);
			parent.replaceChild(tmpObj2,orginalChild2);

			var tmpObj3=document.createElement("H3");
			var text3 = document.createTextNode(profile.major);
			tmpObj3.appendChild(text3);
			tmpObj3.id = "major";
			var orginalChild3 = document.querySelector(DOMstrings.inputMajor);
			parent.replaceChild(tmpObj3,orginalChild3);

			var tmpObj4=document.createElement("H3");
			var text4 = document.createTextNode(profile.gradDate);
			tmpObj4.appendChild(text4);
			tmpObj4.id = "gradDate";
			var orginalChild4 = document.querySelector(DOMstrings.inputGradD);
			parent.replaceChild(tmpObj4,orginalChild4);

			var tmpObj5=document.createElement("H3");
			var text5 = document.createTextNode(profile.gpa);
			tmpObj5.appendChild(text5);
			tmpObj5.id = "gpa";
			var orginalChild5 = document.querySelector(DOMstrings.inputGPA);
			parent.replaceChild(tmpObj5,orginalChild5);

		},


		switchToEditMode2: function(description){
			var parent = document.querySelector(DOMstrings.selfIntro);
			document.querySelector(DOMstrings.button2).textContent = 'finish';

			var tmpObj1=document.createElement("textArea");
			tmpObj1.placeholder = description;
			tmpObj1.value = description;
			tmpObj1.classList.add('edit-input-mode');
			tmpObj1.id = "input-description";
			var orginalChild1 = document.querySelector(DOMstrings.description);
			parent.replaceChild(tmpObj1,orginalChild1);

			
		},

		endEditMode2 : function(description){
			var parent = document.querySelector(DOMstrings.selfIntro);
			document.querySelector(DOMstrings.button2).textContent = 'edit';

			var tmpObj1=document.createElement("p");
			var text1 = document.createTextNode(description);
			tmpObj1.appendChild(text1);
			tmpObj1.id = "description";
			var orginalChild1 = document.querySelector(DOMstrings.inputDescription);
			parent.replaceChild(tmpObj1,orginalChild1);

			
		},

		displayEvents : function(event){
			var html,newHTML,element;

			element = DOMstrings.recentItemList;
			html = '<li class="recent-item" id="%id%"> <div class="image-side"> <img src="../images/%Bill.jpg%", width="75%", class="text"> </div> <div class="recent-main"> <h2 class="text">%title%</h2> <h3 class="text">%subject%</h3> <h4 class="text">%date%</h4> <h4 class="text">%location%</h4> </div> <div class="item__delete"> <button class="item__delete--btn"> <i class="ion-ios-close-outline"></i> </button> </div> <div class="clr"></div> </li>'
			
			newHTML = html.replace('%id%', event.id);
			newHTML = newHTML.replace('%title%', event.title);
			newHTML = newHTML.replace('%date%', event.date);
			newHTML = newHTML.replace('%location%', event.location);

			if (!event.subject){
				newHTML = newHTML.replace('%subject%', event.company.name);
				newHTML = newHTML.replace('%Bill.jpg%', event.company.logo);
			}
			else{
				newHTML = newHTML.replace('%subject%', event.subject.name);
				newHTML = newHTML.replace('%Bill.jpg%', event.subject.picture);
			}

			document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);
		},

		displayDetail : function(event=null){
			var html, newHTML, element, toBeRemoved;

			element = DOMstrings.right;
			var parent = document.querySelector(element);
			parent.innerHTML = "";
			if (!event) {
				newHTML = '<div id="recommendation"><h1>Recommendations</h1></div>';

			}
			else {
				
				html = '<div class="main-block-header"><h1>%title%</h1><h2>%subject%</h2><div class="image-left"><img src="../images/%picture%", width=60%></div><div class="text-right"><h4>%school%</h4><h4>%major%</h4><h4>%gradDate%</h4></div><div class="clr"></div><div class="image-left"><img src="../images/%logo%", width=60%></div><div class="text-right"><h4>%companyName%</h4><h4>%sector%</h4></div><div class="clr"></div><div id="detail-description"><h3>Description</h3><p>%description%</p></div><h2>%date%</h2><h2>%location%</h2><button id = "cancel-button">Cancel</button></div>';
				newHTML = html.replace("%title%", event.title);				
				newHTML = newHTML.replace("%companyName%", event.company.name);
				newHTML = newHTML.replace("%sector%", event.company.sector);
				newHTML = newHTML.replace("%description%", event.eventDescription);
				newHTML = newHTML.replace("%date%", event.date);
				newHTML = newHTML.replace("%location%", event.location);
				newHTML = newHTML.replace('%logo%',event.company.logo);

				if (!event.subject){
					toBeRemoved = '<div class="image-left"><img src="../images/%picture%", width=60%></div><div class="text-right"><h4>%school%</h4><h4>%major%</h4><h4>%gradDate%</h4></div><div class="clr"></div>';
					newHTML = newHTML.replace(toBeRemoved,'');	
					newHTML = newHTML.replace('%subject%','Company Highlight: '+event.company.name);				
				}
				else{
					newHTML = newHTML.replace("%subject%", event.subject.name);
					newHTML = newHTML.replace("%school%", event.subject.school);
					newHTML = newHTML.replace("%major%", event.subject.major);
					newHTML = newHTML.replace("%gradDate%", event.subject.gradDate);
					newHTML = newHTML.replace('%picture%', event.subject.picture);
				}
				

			}
			document.querySelector(element).insertAdjacentHTML('beforeend', newHTML);

			
		},

		deleteRecentItemFunction : function(event){
			var el = document.getElementById(event.id);
			
			
			el.parentNode.removeChild(el);
		}
		
	}
})();

var controller = (function(infoCtrl,UICtrl){

	var setupEventListeners = function() {
        var DOM = UICtrl.getDOMstrings();
        var height = document.querySelector(DOM.specialContainer).offsetHeight;
        
        document.querySelector(DOM.button).addEventListener('click', editFunction);        
        document.querySelector(DOM.button2).addEventListener('click', editIntro);
        document.querySelector(DOM.mid).addEventListener('click', expandFunction);

        document.querySelector(DOM.mid).setAttribute("style","height : " + height + "px");
        
    };

    var isEditing = false;
    var isEditing2 = false;

    var expandFunction = function(event){
    	var item;
    	var DOM = UICtrl.getDOMstrings();

    	item = event.target;
    	//var fake = document.createElement("i");
    	if (item.parentNode.classList[0] == "item__delete--btn"){
    		while ((item.classList[0] != "recent-item") && (item.classList[0]!=null)){
    			item = item.parentNode;
    		}
    		UICtrl.deleteRecentItemFunction(item);
    	}
    	else{
    		while ((item.classList[0] != "recent-item") && (item.classList[0]!=null)){
    			item = item.parentNode;
    		}
    		UICtrl.displayDetail(infoCtrl.getEventList()[item.id]);

    	}
    	


	
    }


    var editFunction = function(){
    	if (!isEditing){
    		// 1. change UI to edit mode
    		UICtrl.switchToEditMode(infoCtrl.getProfile());
    		isEditing = true;
    	}
    	else{
    		// 2. get input and store the data
    		var newPro = UICtrl.getInput();
    		infoCtrl.storeData(newPro);    		
    		// 3. update UI
    		alert("Profile updated!");
    		UICtrl.endEditMode(infoCtrl.getProfile());
    		isEditing = false;

    	}
    };

    var editIntro = function(){
    	if (!isEditing2){
    		UICtrl.switchToEditMode2(infoCtrl.getDescription());
    		isEditing2 = true;
    	}
    	else{
    		infoCtrl.setDescription(UICtrl.getInput2());
    		alert("Profile updated!");
    		UICtrl.endEditMode2(infoCtrl.getDescription());
    		isEditing2 = false;

    	}
    };

    


	return {
        init: function() {
            var Kerwin = infoCtrl.addProfile("Kerwin Yuxuan Lin","New York University","Bechelors, Computer Science","Graudate: May 2022","GPA: 5.0","kerwin.jpg");
            var Bill = infoCtrl.addSubProfile("Bill Ruochen Gu","New York University","Bechelors, Finance/Computer Science","Graudate: May 2022","GPA: 4.0","Bill.jpg");

            infoCtrl.setDescription("Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo");
            
            //info controller set events detail
            var GS = infoCtrl.addCompany("Goldman Sachs","Investment Banking","gs_logo.png");
            var FB = infoCtrl.addCompany("Facebook","Social Media","fb_logo.png");
            //var GOO = infoCtrl.addCompany("Google","Search Engine");

            infoCtrl.addEvent("Coffee Chat",Bill,GS,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo","August 1, 2020","The Amberly Apartment, Room 13K");
            infoCtrl.addEvent("Info Session",null,GS,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo","August 2, 2021","The Amberly Apartment, Room 12K");
            infoCtrl.addEvent("Info Session",null,FB,"Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo","August 3, 2022","The Amberly Apartment, Room 14K");


            UICtrl.displayProfile(infoCtrl.getProfile());
            UICtrl.displayEvents(infoCtrl.getEventList()[0]);
            UICtrl.displayEvents(infoCtrl.getEventList()[1]);
            UICtrl.displayEvents(infoCtrl.getEventList()[2]);

            UICtrl.displayDetail();
            


            setupEventListeners();
        }
    };
})(infoController,UIController);

controller.init();