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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/auth.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/auth.js":
/*!************************!*\
  !*** ./src/js/auth.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*\r\n// add admin cloud function\r\nconst adminForm = document.querySelector('.admin-actions');\r\nadminForm.addEventListener('submit', (e) => {\r\n  e.preventDefault();\r\n\r\n  const adminEmail = document.querySelector('#admin-email').value;\r\n  const addAdminRole = functions.httpsCallable('addAdminRole');\r\n  addAdminRole({ email: adminEmail }).then(result => {\r\n    console.log(result);\r\n  });\r\n});\r\n*/\r\n\r\n// listen for auth status changes\r\nauth.onAuthStateChanged(user => {\r\n    console.log('nmsl')\r\n  if (user) {\r\n    document.querySelector(\".container\").classList.remove(\"invisible\");\r\n  } else {\r\n    setupUI();\r\n    setupGuides([]);\r\n  }\r\n});\r\n\r\n/*\r\n// create new guide\r\nconst createForm = document.querySelector('#create-form');\r\ncreateForm.addEventListener('submit', (e) => {\r\n  e.preventDefault();\r\n  db.collection('guides').add({\r\n    title: createForm.title.value,\r\n    content: createForm.content.value\r\n  }).then(() => {\r\n    // close the create modal & reset form\r\n    const modal = document.querySelector('#modal-create');\r\n    M.Modal.getInstance(modal).close();\r\n    createForm.reset();\r\n  }).catch(err => {\r\n    console.log(err.message);\r\n  });\r\n});\r\n*/\r\n\r\n\r\n// signup\r\nconst signupForm = document.querySelector('#signup-form');\r\nsignupForm.addEventListener('submit', (e) => {\r\n  e.preventDefault();\r\n  \r\n  // get user info\r\n  const email = signupForm['signup-email'].value;\r\n  const password = signupForm['signup-password'].value;\r\n\r\n  // sign up the user & add firestore data\r\n  auth.createUserWithEmailAndPassword(email, password).then(cred => console.log(cred.user))\r\n  .catch(err => {\r\n    signupForm.querySelector('.error').innerHTML = err.message;\r\n  });\r\n});\r\n\r\n// logout\r\nconst logout = document.querySelector('#logout');\r\nlogout.addEventListener('click', (e) => {\r\n  e.preventDefault();\r\n  auth.signOut();\r\n});\r\n\r\n\r\n/*\r\n// login\r\nconst loginForm = document.querySelector('#login-form');\r\nloginForm.addEventListener('submit', (e) => {\r\n  e.preventDefault();\r\n  \r\n  // get user info\r\n  const email = loginForm['login-email'].value;\r\n  const password = loginForm['login-password'].value;\r\n\r\n  // log the user in\r\n  auth.signInWithEmailAndPassword(email, password).then((cred) => {\r\n    // close the signup modal & reset form\r\n    const modal = document.querySelector('#modal-login');\r\n    M.Modal.getInstance(modal).close();\r\n    loginForm.reset();\r\n    loginForm.querySelector('.error').innerHTML = '';\r\n  }).catch(err => {\r\n    loginForm.querySelector('.error').innerHTML = err.message;\r\n  });\r\n\r\n});\r\n*/\n\n//# sourceURL=webpack:///./src/js/auth.js?");

/***/ })

/******/ });