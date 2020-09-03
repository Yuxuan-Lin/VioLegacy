/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_home__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./models/home */ \"./src/js/models/home.js\");\n/* harmony import */ var _models_opportunities__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./models/opportunities */ \"./src/js/models/opportunities.js\");\n/* harmony import */ var _models_contacts__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./models/contacts */ \"./src/js/models/contacts.js\");\n/* harmony import */ var _models_chat__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/chat */ \"./src/js/models/chat.js\");\n/* harmony import */ var _models_chat__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_models_chat__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _views_base__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/base */ \"./src/js/views/base.js\");\n/* harmony import */ var _views_contactsView__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/contactsView */ \"./src/js/views/contactsView.js\");\n/* harmony import */ var _views_chatView__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/chatView */ \"./src/js/views/chatView.js\");\n\r\n\r\n\r\n\r\n\r\n \r\n\r\n\r\n\r\n//experimental area\r\n\r\n\r\nconst state = {};\r\nstate.home = new _models_home__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\"whatever\");\r\nstate.opp = new _models_opportunities__WEBPACK_IMPORTED_MODULE_1__[\"default\"](\"Ishmael\");\r\nstate.contacts = new _models_contacts__WEBPACK_IMPORTED_MODULE_2__[\"default\"](\"chat\");\r\nstate.image = \"../images/kerwin.jpg\";\r\n\r\nconst controlHome = async () => {\r\n    //1) Get contact list(array)\r\n    \r\n    await state.home.getHomeData();\r\n    \r\n    //2) Prepare UI(optional)\r\n\r\n    //3) Render contacts on UI\r\n\r\n    //1) Get chatHistory(array) and profile\r\n\r\n    //2) Prepare UI(clear field)\r\n\r\n    //3) Render chatHistroy and profile on UI\r\n    \r\n    \r\n    \r\n};\r\n\r\nconst controlOpp = async () => {\r\n    //1) Get contact list(array)\r\n    \r\n    await state.opp.getOppData();\r\n    \r\n    //2) Prepare UI(optional)\r\n\r\n    //3) Render contacts on UI\r\n\r\n    //1) Get chatHistory(array) and profile\r\n\r\n    //2) Prepare UI(clear field)\r\n\r\n    //3) Render chatHistroy and profile on UI\r\n    \r\n    \r\n    \r\n};\r\n\r\nconst controlContacts = async () => {\r\n    //1) Get contact list(array)\r\n    \r\n    await state.contacts.getContacts();\r\n    \r\n    //2) Prepare UI(optional)\r\n\r\n    //3) Render contacts on UI\r\n    _views_contactsView__WEBPACK_IMPORTED_MODULE_5__[\"renderContacts\"](state.contacts.result);\r\n\r\n\r\n    //1) Get chatHistory(array) and profile\r\n\r\n    //2) Prepare UI(clear field)\r\n\r\n    //3) Render chatHistroy and profile on UI\r\n    \r\n    \r\n    \r\n};\r\n\r\nconst controlChat = async (id=0) => {\r\n    // render Profile UI\r\n    await state.contacts.getContacts();\r\n    _views_chatView__WEBPACK_IMPORTED_MODULE_6__[\"renderProfile\"](state.contacts.result[id]);\r\n    \r\n    // render Chat UI\r\n    _views_chatView__WEBPACK_IMPORTED_MODULE_6__[\"renderChats\"](state.contacts.result[id].profile.image, state.image, state.contacts.result[id].chatHistory);\r\n};\r\n\r\n\r\n\r\ncontrolHome();\r\ncontrolOpp();\r\n\r\n\r\n_views_base__WEBPACK_IMPORTED_MODULE_4__[\"elements\"].tools.addEventListener('click', e => {\r\n    e.preventDefault();\r\n    const tab = e.target.closest('.tab');\r\n    console.log(tab);\r\n    tabSwitch(tab);\r\n});\r\n\r\nconst tabSwitch = function (tab){\r\n    \r\n    const id = parseInt(tab.parentNode.id);\r\n    console.log(id);\r\n    if (id != 0 && id != 4){\r\n        screenSwitch(tab);\r\n\r\n        //clear\r\n        let markup = tab.parentNode.parentNode.childNodes;\r\n        console.log(markup);\r\n        for (let i=1; i<11; i=i+2){\r\n            markup[i].classList = [];\r\n            markup[i].childNodes[1].classList = ['tab'];\r\n        }\r\n\r\n        //above selected change\r\n        markup[1 + (parseInt(tab.parentNode.id) - 1) * 2].classList.add('above-selected');\r\n        markup[1 + (parseInt(tab.parentNode.id) - 1) * 2].childNodes[1].classList.add('special-tab-1');\r\n\r\n        //selected tab change\r\n        tab.parentNode.classList.add('selected-tab');\r\n\r\n        //below selected change\r\n        markup[1 + (parseInt(tab.parentNode.id) + 1) * 2].classList.add('below-selected');\r\n        markup[1 + (parseInt(tab.parentNode.id) + 1) * 2].childNodes[1].classList.add('special-tab-2');\r\n        console.log(\"tab highlighed\");\r\n    }\r\n};\r\n\r\n\r\nconst screenSwitch = function (tab){\r\n    state.tab = 'messages';\r\n    //clearScreen();\r\n    \r\n    const screenSetUp = `\r\n        <div class=\"contacts\">\r\n            <div class=\"search-bar\">\r\n                <div>\r\n                    <ion-icon name=\"search-outline\" class=\"small-icon\"></ion-icon>\r\n                </div>\r\n                <input type=\"text\" name=\"search\" placeholder=\"Search names, chats, etc.\">\r\n            </div>\r\n            <ul class=\"contact-list\"></ul>\r\n        </div>   \r\n        <div class=\"chat-block\">\r\n            <div class=\"profile\"></div>\r\n            <div class=\"chat-box\">\r\n                <div class=\"chat-field\">\r\n                    <ul class=\"chat-history\"></ul>\r\n                </div>\r\n                <div class=\"type-field\">\r\n                    <ul class=\"tool-bar\">\r\n                        <li class=\"tool-icon\">\r\n                            <ion-icon name=\"happy-outline\" class=\"small-icon\"></ion-icon>\r\n                        </li>\r\n                        <li class=\"tool-icon\">\r\n                            <ion-icon name=\"image-outline\" class=\"small-icon\"></ion-icon>\r\n                        </li>\r\n                        <li class=\"tool-icon\">\r\n                            <ion-icon name=\"mic-outline\" class=\"small-icon\"></ion-icon>\r\n                        </li>\r\n                        <li class=\"tool-icon\">\r\n                            <ion-icon name=\"folder-outline\" class=\"small-icon\"></ion-icon>\r\n                        </li>\r\n                        <li class=\"tool-icon\">\r\n                            <ion-icon name=\"link-outline\" class=\"small-icon\"></ion-icon>\r\n                        </li>\r\n                        <li class=\"tool-icon-special\">\r\n                            &nbsp;\r\n                        </li>\r\n                    </ul>\r\n                    <div class=\"input-field\">\r\n                        <input type=\"text\" name=\"message-input-field\">\r\n                    </div>\r\n                    <div class=\"button-bar\">\r\n                        <div>&nbsp;</div>\r\n                        <input type=\"submit\" name=\"send-button\" class=\"send-btn\">\r\n                    </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    `;\r\n    \r\n    _views_base__WEBPACK_IMPORTED_MODULE_4__[\"elements\"].container.insertAdjacentHTML('beforeend',screenSetUp);\r\n    console.log(\"Screen Setup\");\r\n    \r\n    controlContacts();\r\n    controlChat();\r\n    \r\n    if (state.tab == 'messages'){\r\n        document.querySelector('.contact-list').addEventListener('click', e => {\r\n            const btn = e.target.closest('.contact-person').id;\r\n            if (btn) {\r\n                _views_chatView__WEBPACK_IMPORTED_MODULE_6__[\"clearChat\"]();\r\n                controlChat(btn);\r\n                //searchView.clearResults();\r\n                //searchView.renderResults(state.search.result, goToPage);\r\n            }\r\n        });\r\n    }\r\n    \r\n    console.log(document.querySelector(\".container\").childNodes[1]);\r\n};\r\n\r\nconst clearScreen = function(){\r\n    console.log(_views_base__WEBPACK_IMPORTED_MODULE_4__[\"elements\"].container.childNodes);\r\n    const container = document.querySelector(\".container\").childNodes;\r\n    let temp = 0;\r\n    \r\n    while(temp < container.length){\r\n        if(container[temp].nodeName == \"<div>\" && container[temp].className == \".navigator\") {\r\n                _views_base__WEBPACK_IMPORTED_MODULE_4__[\"elements\"].container.removeChild(container[temp]);\r\n        }\r\n        temp++;\r\n    }\r\n    console.log(\"screen clear success\");\r\n};\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ "./src/js/models/chat.js":
/*!*******************************!*\
  !*** ./src/js/models/chat.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\n\n//# sourceURL=webpack:///./src/js/models/chat.js?");

/***/ }),

/***/ "./src/js/models/contacts.js":
/*!***********************************!*\
  !*** ./src/js/models/contacts.js ***!
  \***********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Contacts; });\n//import axios from 'axios';\r\n\r\nclass Contacts{\r\n\tconstructor(query){\r\n\t\tthis.query = query;\r\n\t}\r\n\r\n\tasync getContacts(){\r\n\t\t// const proxy = 'https://cors-anywhere.herokuapp.com/';\r\n\t\ttry{\r\n\t\t\tconst res = await fetch('http://localhost:5000/message').then((res) => res.json());\r\n\t\t\tthis.result = res.data;\r\n\t\t} catch (error){\r\n\t\t\talert(error);\r\n\t\t}\r\n\t}\r\n}\n\n//# sourceURL=webpack:///./src/js/models/contacts.js?");

/***/ }),

/***/ "./src/js/models/home.js":
/*!*******************************!*\
  !*** ./src/js/models/home.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Home; });\nclass Home{\r\n\tconstructor(query){\r\n\t\tthis.query = query;\r\n\t}\r\n\r\n\tasync getHomeData(){\r\n\t\t// const proxy = 'https://cors-anywhere.herokuapp.com/';\r\n\t\ttry{\r\n\t\t\tconst res = await fetch('http://localhost:5000/home').then((res) => res.json());\r\n\t\t\tthis.result = res;\r\n            console.log(this.result);\r\n\t\t} catch (error){\r\n\t\t\talert(error);\r\n\t\t}\r\n\t}\r\n}\n\n//# sourceURL=webpack:///./src/js/models/home.js?");

/***/ }),

/***/ "./src/js/models/opportunities.js":
/*!****************************************!*\
  !*** ./src/js/models/opportunities.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Opportunities; });\nclass Opportunities{\r\n\tconstructor(query){\r\n\t\tthis.query = query;\r\n\t}\r\n\r\n\tasync getOppData(){\r\n\t\t// const proxy = 'https://cors-anywhere.herokuapp.com/';\r\n\t\ttry{\r\n\t\t\tconst res = await fetch('http://localhost:5000/opportunities').then((res) => res.json());\r\n\t\t\tthis.result = res;\r\n            console.log(this.result);\r\n\t\t} catch (error){\r\n\t\t\talert(error);\r\n\t\t}\r\n\t}\r\n}\n\n//# sourceURL=webpack:///./src/js/models/opportunities.js?");

/***/ }),

/***/ "./src/js/views/base.js":
/*!******************************!*\
  !*** ./src/js/views/base.js ***!
  \******************************/
/*! exports provided: elements */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"elements\", function() { return elements; });\nconst elements = {\r\n    contactList: document.querySelector('.contact-list'),\r\n    chatHistory: document.querySelector('.chat-history'),\r\n    profile: document.querySelector('.profile'),\r\n    tools: document.querySelector('.tools'),\r\n    container: document.querySelector('.container')\r\n};\n\n//# sourceURL=webpack:///./src/js/views/base.js?");

/***/ }),

/***/ "./src/js/views/chatView.js":
/*!**********************************!*\
  !*** ./src/js/views/chatView.js ***!
  \**********************************/
/*! exports provided: clearChat, renderProfile, renderChats */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"clearChat\", function() { return clearChat; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderProfile\", function() { return renderProfile; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderChats\", function() { return renderChats; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./src/js/views/base.js\");\n\r\n\r\nconst clearChat = () => {\r\n    document.querySelector('.chat-history').innerHTML = '';\r\n    document.querySelector('.profile').innerHTML = '';\r\n};\r\n\r\nconst renderProfile = contact => {\r\n    const markup = `\r\n        <div class=\"profile-image\">\r\n            <img class=\"round-image\" src=\"${contact.profile.image}\">\r\n        </div>\r\n        <div class=\"profile-info\">\r\n            <h3 class=\"profile-name\">${contact.profile.name}</h3>\r\n            <h3 class=\"profile-major\">${contact.profile.major}</h3>\r\n            <h3 class=\"profile-career\">${contact.profile.name} will refer you to the position at ${contact.profile.company}.</h3>\r\n        </div>\r\n    `;\r\n    \r\n    document.querySelector('.profile').insertAdjacentHTML('beforeend',markup);\r\n};\r\n\r\nconst renderChat = (imageLeft,imageRight,message) => {\r\n    let markup;\r\n    if (message.chatSender === \"other\"){\r\n        markup = `\r\n            <li class=\"message-received\">\r\n                <div class=\"message-avatar\"><img class=\"round-image\" src=\"${imageLeft}\"></div>\r\n                <div class=\"message-text talk-bubble tri-right left-top\">\r\n                    <div class=\"talktext\">\r\n                        <p>${message.chatContent}</p>\r\n                    </div>\r\n                </div>\r\n                <div class=\"message-empty\">&nbsp;</div>\r\n            </li>\r\n        `;\r\n    } else {\r\n        markup = `\r\n            <li class=\"message-sent\">\r\n                <div class=\"message-avatar\"><img class=\"round-image\" src=\"${imageRight}\"></div>\r\n                <div class=\"message-text talk-bubble tri-right right-top\">\r\n                    <div class=\"talktext\">\r\n                        <p>${message.chatContent}</p>\r\n                    </div>\r\n                </div>\r\n                <div class=\"message-empty\">&nbsp;</div>\r\n            </li>\r\n        `;\r\n    }\r\n    \r\n    \r\n    document.querySelector('.chat-history').insertAdjacentHTML('beforeend',markup);\r\n};\r\n\r\nconst renderChats = (imageLeft,imageRight,messages) => {\r\n    let counter = 0;\r\n    while (counter < messages.length){\r\n        renderChat(imageLeft,imageRight,messages[counter]);\r\n        counter++;\r\n    }\r\n    //messages.forEach(el => renderChat(imageLeft, imageRight, el));\r\n};\n\n//# sourceURL=webpack:///./src/js/views/chatView.js?");

/***/ }),

/***/ "./src/js/views/contactsView.js":
/*!**************************************!*\
  !*** ./src/js/views/contactsView.js ***!
  \**************************************/
/*! exports provided: renderContacts */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"renderContacts\", function() { return renderContacts; });\n/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ \"./src/js/views/base.js\");\n\r\n\r\nconst renderContact = contact => {\r\n    const markup = `\r\n        <li class=\"contact-person\" id=\"${contact.id}\">\r\n            <div class=\"person-image\">\r\n                <img class=\"round-image\" src=\"${contact.profile.image}\" alt=\"${contact.profile.name}\">\r\n            </div>\r\n            <div class=\"person-info\">\r\n                <div class=\"person-top\">\r\n                    <h3 class=\"name\">${contact.profile.name}</h3>\r\n                    <h3 class=\"time\">${contact.chatHistory[contact.chatHistory.length-1].chatTime}</h3>\r\n                </div>\r\n                <h3>${contact.chatHistory[contact.chatHistory.length-1].chatContent}</h3>\r\n            </div>\r\n        </li>\r\n    `;\r\n   \r\n   document.querySelector('.contact-list').insertAdjacentHTML('beforeend',markup);\r\n};\r\n\r\nconst renderContacts = contacts => {\r\n    contacts.forEach(renderContact);\r\n};\r\n\r\n\n\n//# sourceURL=webpack:///./src/js/views/contactsView.js?");

/***/ })

/******/ });