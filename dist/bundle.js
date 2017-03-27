/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _renfeClient = __webpack_require__(2);

var _renfeClient2 = _interopRequireDefault(_renfeClient);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App() {
    _classCallCheck(this, App);

    this._dateInput = document.querySelector('input[name="date"]');
    this._fromInput = document.querySelector('input[name="from"]');
    this._toInput = document.querySelector('input[name="to"]');
    this._searchButton = document.querySelector('input[name="search"]');
    this._table = document.querySelector('table');
    this._timetable = document.querySelector('tbody');
    this._spinner = document.querySelector('.spinner');
  }

  _createClass(App, [{
    key: 'init',
    value: function init() {
      var today = new Date();
      this._dateInput.value = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
      this._searchButton.addEventListener('click', this.onSearch.bind(this));
    }
  }, {
    key: 'onSearch',
    value: function onSearch() {
      var _dateInput$value$spli = this._dateInput.value.split('/'),
          _dateInput$value$spli2 = _slicedToArray(_dateInput$value$spli, 3),
          day = _dateInput$value$spli2[0],
          month = _dateInput$value$spli2[1],
          year = _dateInput$value$spli2[2];

      var from = document.querySelector('#stations option[value="' + this._fromInput.value + '"]').dataset.id;
      var to = document.querySelector('#stations option[value="' + this._toInput.value + '"]').dataset.id;
      this.sendRequest(from, to, day, month, year);
    }
  }, {
    key: 'sendRequest',
    value: function sendRequest(from, to, day, month, year) {
      var _this = this;

      this._table.style.display = 'none';
      this._spinner.style.display = 'block';

      (0, _renfeClient2.default)(from, to, day, month, year).then(function (travels) {
        _this._timetable.innerHTML = travels.map(_this.createRow).join('');
        _this._spinner.style.display = 'none';
        _this._table.style.display = 'table';
        _this._table.scrollIntoView({
          block: 'start',
          behavior: 'smooth'
        });
      }).catch(console.error);
    }
  }, {
    key: 'createRow',
    value: function createRow(travel) {
      return '<tr><td>' + travel.train + '</td><td>' + travel.departure + '</td><td>' + travel.arrival + '</td><td>' + travel.price + '</td></tr>';
    }
  }, {
    key: 'showSpinner',
    value: function showSpinner() {
      this._spinner.style.display = 'block';
    }
  }, {
    key: 'hideSpinner',
    value: function hideSpinner() {
      this._spinner.style.display = 'none';
    }
  }]);

  return App;
}();

exports.default = App;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(0);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
  new _app2.default().init();
};

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function getTravels(from, to, day, month, year) {
  return new Promise(function (resolve, reject) {
    var xhttp = new XMLHttpRequest();
    var uri = "https://renfeparser.herokuapp.com/" + from + "/" + to + "/" + year + "-" + month + "-" + day;
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        return resolve(JSON.parse(xhttp.responseText));
      }
      if (this.readyState == 4 && this.status !== 200) {
        return reject(this.status);
      }
    };
    xhttp.open("GET", uri, true);
    xhttp.send();
  });
}

exports.default = getTravels;

/***/ })
/******/ ]);