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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
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

var _renfeClient = __webpack_require__(3);

var _renfeClient2 = _interopRequireDefault(_renfeClient);

var _autocomplete = __webpack_require__(1);

var _autocomplete2 = _interopRequireDefault(_autocomplete);

var _stations = __webpack_require__(4);

var _stations2 = _interopRequireDefault(_stations);

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
      this._populateSelects(_stations2.default);
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

      var from = _stations2.default[this._fromInput.value];
      var to = _stations2.default[this._toInput.value];
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
  }, {
    key: '_populateSelects',
    value: function _populateSelects(stations) {
      var stationsData = {};
      var stationsArray = [];

      for (var station in stations) {
        stationsArray.push(station);
        stationsData[station] = stations[station];
      }

      this._newAutocomplete('input[name="from"]', stationsArray);
      this._newAutocomplete('input[name="to"]', stationsArray);
    }
  }, {
    key: '_newAutocomplete',
    value: function _newAutocomplete(selector, stationsArray) {
      return new _autocomplete2.default({
        selector: selector,
        minChars: 1,
        source: function source(term, suggest) {
          var suggestions = [];
          for (var i = 0; i < stationsArray.length; i++) {
            if (stationsArray[i].toLowerCase().includes(term.toLowerCase())) {
              suggestions.push(stationsArray[i]);
            }
          }
          suggest(suggestions);
        }
      });
    }
  }]);

  return App;
}();

exports.default = App;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*
    JavaScript autoComplete v1.0.4
    Copyright (c) 2014 Simon Steinberger / Pixabay
    GitHub: https://github.com/Pixabay/JavaScript-autoComplete
    License: http://www.opensource.org/licenses/mit-license.php
*/
var autoComplete = function () {
	'use strict';

	function autoComplete(options) {
		if (!document.querySelector) return;

		// helpers
		function hasClass(el, className) {
			return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
		}

		function addEvent(el, type, handler) {
			if (el.attachEvent) el.attachEvent('on' + type, handler);else el.addEventListener(type, handler);
		}

		function removeEvent(el, type, handler) {
			// if (el.removeEventListener) not working in IE11
			if (el.detachEvent) el.detachEvent('on' + type, handler);else el.removeEventListener(type, handler);
		}

		function live(elClass, event, cb, context) {
			addEvent(context || document, event, function (e) {
				var found,
				    el = e.target || e.srcElement;
				while (el && !(found = hasClass(el, elClass))) {
					el = el.parentElement;
				}if (found) cb.call(el, e);
			});
		}

		var o = {
			selector: 0,
			source: 0,
			minChars: 3,
			delay: 150,
			offsetLeft: 0,
			offsetTop: 1,
			cache: 1,
			menuClass: '',
			renderItem: function renderItem(item, search) {
				// escape special characters
				search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
				var re = new RegExp('(' + search.split(' ').join('|') + ')', 'gi');
				return '<div class="autocomplete-suggestion" data-val="' + item + '">' + item.replace(re, '<b>$1</b>') + '</div>';
			},
			onSelect: function onSelect() {}
		};
		for (var k in options) {
			if (options.hasOwnProperty(k)) o[k] = options[k];
		}

		// init
		var elems = _typeof(o.selector) == 'object' ? [o.selector] : document.querySelectorAll(o.selector);
		for (var i = 0; i < elems.length; i++) {
			var that = elems[i];

			// create suggestions container "sc"
			that.sc = document.createElement('div');
			that.sc.className = 'autocomplete-suggestions ' + o.menuClass;

			that.autocompleteAttr = that.getAttribute('autocomplete');
			that.setAttribute('autocomplete', 'off');
			that.cache = {};
			that.last_val = '';

			that.updateSC = function (resize, next) {
				var rect = that.getBoundingClientRect();
				that.sc.style.left = Math.round(rect.left + (window.pageXOffset || document.documentElement.scrollLeft) + o.offsetLeft) + 'px';
				that.sc.style.top = Math.round(rect.bottom + (window.pageYOffset || document.documentElement.scrollTop) + o.offsetTop) + 'px';
				that.sc.style.width = Math.round(rect.right - rect.left) + 'px'; // outerWidth
				if (!resize) {
					that.sc.style.display = 'block';
					if (!that.sc.maxHeight) {
						that.sc.maxHeight = parseInt((window.getComputedStyle ? getComputedStyle(that.sc, null) : that.sc.currentStyle).maxHeight);
					}
					if (!that.sc.suggestionHeight) that.sc.suggestionHeight = that.sc.querySelector('.autocomplete-suggestion').offsetHeight;
					if (that.sc.suggestionHeight) if (!next) that.sc.scrollTop = 0;else {
						var scrTop = that.sc.scrollTop,
						    selTop = next.getBoundingClientRect().top - that.sc.getBoundingClientRect().top;
						if (selTop + that.sc.suggestionHeight - that.sc.maxHeight > 0) that.sc.scrollTop = selTop + that.sc.suggestionHeight + scrTop - that.sc.maxHeight;else if (selTop < 0) that.sc.scrollTop = selTop + scrTop;
					}
				}
			};
			addEvent(window, 'resize', that.updateSC);
			document.body.appendChild(that.sc);

			live('autocomplete-suggestion', 'mouseleave', function () {
				var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
				if (sel) setTimeout(function () {
					sel.className = sel.className.replace('selected', '');
				}, 20);
			}, that.sc);

			live('autocomplete-suggestion', 'mouseover', function () {
				var sel = that.sc.querySelector('.autocomplete-suggestion.selected');
				if (sel) sel.className = sel.className.replace('selected', '');
				this.className += ' selected';
			}, that.sc);

			live('autocomplete-suggestion', 'mousedown', function (e) {
				if (hasClass(this, 'autocomplete-suggestion')) {
					// else outside click
					var v = this.getAttribute('data-val');
					that.value = v;
					o.onSelect(e, v, this);
					that.sc.style.display = 'none';
				}
			}, that.sc);

			that.blurHandler = function () {
				var over_sb;
				try {
					over_sb = document.querySelector('.autocomplete-suggestions:hover');
				} catch (e) {
					over_sb = 0;
				}
				if (!over_sb) {
					that.last_val = that.value;
					that.sc.style.display = 'none';
					setTimeout(function () {
						that.sc.style.display = 'none';
					}, 350); // hide suggestions on fast input
				} else if (that !== document.activeElement) setTimeout(function () {
					that.focus();
				}, 20);
			};
			addEvent(that, 'blur', that.blurHandler);

			var suggest = function suggest(data) {
				var val = that.value;
				that.cache[val] = data;
				if (data.length && val.length >= o.minChars) {
					var s = '';
					for (var i = 0; i < data.length; i++) {
						s += o.renderItem(data[i], val);
					}that.sc.innerHTML = s;
					that.updateSC(0);
				} else that.sc.style.display = 'none';
			};

			that.keydownHandler = function (e) {
				var key = window.event ? e.keyCode : e.which;
				if ((key == 40 || key == 38) && that.sc.innerHTML) {
					var next,
					    sel = that.sc.querySelector('.autocomplete-suggestion.selected');
					if (!sel) {
						next = key == 40 ? that.sc.querySelector('.autocomplete-suggestion') : that.sc.childNodes[that.sc.childNodes.length - 1]; // first : last
						next.className += ' selected';
						that.value = next.getAttribute('data-val');
					} else {
						next = key == 40 ? sel.nextSibling : sel.previousSibling;
						if (next) {
							sel.className = sel.className.replace('selected', '');
							next.className += ' selected';
							that.value = next.getAttribute('data-val');
						} else {
							sel.className = sel.className.replace('selected', '');
							that.value = that.last_val;
							next = 0;
						}
					}
					that.updateSC(0, next);
					return false;
				}
				// esc
				else if (key == 27) {
						that.value = that.last_val;
						that.sc.style.display = 'none';
					}
					// enter
					else if (key == 13 || key == 9) {
							sel = that.sc.querySelector('.autocomplete-suggestion.selected');
							if (sel && that.sc.style.display != 'none') {
								o.onSelect(e, sel.getAttribute('data-val'), sel);
								setTimeout(function () {
									that.sc.style.display = 'none';
								}, 20);
							}
						}
			};
			addEvent(that, 'keydown', that.keydownHandler);

			that.keyupHandler = function (e) {
				var key = window.event ? e.keyCode : e.which;
				if (!key || (key < 35 || key > 40) && key != 13 && key != 27) {
					var val = that.value;
					if (val.length >= o.minChars) {
						if (val != that.last_val) {
							that.last_val = val;
							clearTimeout(that.timer);
							if (o.cache) {
								if (val in that.cache) {
									suggest(that.cache[val]);
									return;
								}
								// no requests if previous suggestions were empty
								for (var i = 1; i < val.length - o.minChars; i++) {
									var part = val.slice(0, val.length - i);
									if (part in that.cache && !that.cache[part].length) {
										suggest([]);
										return;
									}
								}
							}
							that.timer = setTimeout(function () {
								o.source(val, suggest);
							}, o.delay);
						}
					} else {
						that.last_val = val;
						that.sc.style.display = 'none';
					}
				}
			};
			addEvent(that, 'keyup', that.keyupHandler);

			that.focusHandler = function (e) {
				that.last_val = '\n';
				that.keyupHandler(e);
			};
			if (!o.minChars) addEvent(that, 'focus', that.focusHandler);
		}

		// public destroy method
		this.destroy = function () {
			for (var i = 0; i < elems.length; i++) {
				var that = elems[i];
				removeEvent(window, 'resize', that.updateSC);
				removeEvent(that, 'blur', that.blurHandler);
				removeEvent(that, 'focus', that.focusHandler);
				removeEvent(that, 'keydown', that.keydownHandler);
				removeEvent(that, 'keyup', that.keyupHandler);
				if (that.autocompleteAttr) that.setAttribute('autocomplete', that.autocompleteAttr);else that.removeAttribute('autocomplete');
				document.body.removeChild(that.sc);
				that = null;
			}
		};
	}
	return autoComplete;
}();

exports.default = autoComplete;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(0);

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.onload = function () {
  new _app2.default().init();
};

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
function getTravels(from, to, day, month, year) {
  var uri = "https://renfeparser.herokuapp.com/" + from + "/" + to + "/" + year + "-" + month + "-" + day;
  return fetch(uri).then(function (response) {
    return response.json();
  });
}

exports.default = getTravels;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    "A Coruña": "31412",
    "Albacete-Los Llanos": "60600",
    "Alcazar De San Juan": "60400",
    "Algeciras": "55020",
    "Alicante/Alacant": "60911",
    "Almansa": "60800",
    "Almeria": "56312",
    "Antequera (Todas)": "ANTEQ",
    "Antequera-Santa Ana": "02003",
    "Avila": "10400",
    "Balsicas-Mar Menor": "61303",
    "Barcelona (Todas)": "BARCE",
    "Barcelona-Estacio De França": "79400",
    "Barcelona-Sants": "71801",
    "Benicarlo-Peñiscola": "65311",
    "Bilbao (Todas)": "BILBA",
    "Bilbao-Abando Indalecio Prieto": "13200",
    "Burgos-Rosa De Lima": "11014",
    "Caceres": "35400",
    "Cadiz": "51405",
    "Calahorra": "81108",
    "Calatayud": "70600",
    "Camp Tarragona": "04104",
    "Cartagena": "61307",
    "Castello De La Plana/Castellon De La Pl.": "65300",
    "Ciudad Real": "37200",
    "Cordoba": "50500",
    "Cuenca (Todas)": "CUENC",
    "Cuenca Fernando Zobel": "03208",
    "Elche Parque/Elx Parc": "62103",
    "Elda-Petrer": "60905",
    "Ferrol": "21010",
    "Figueres Vilafant": "04307",
    "Gijon": "15410",
    "Gijon (Todas)": "GIJON",
    "Girona": "79300",
    "Granada": "05000",
    "Guadalajara (Todas)": "GUADA",
    "Guadalajara - Yebes": "04007",
    "Huelva": "43019",
    "Huesca": "74200",
    "Irun": "11600",
    "Irun-Hendaya (Todas)": "IRUN-",
    "Jaen": "03100",
    "Jerez De La Frontera": "51300",
    "Koln Hbf": "50500",
    "L'Aldea-Amposta-Tortosa": "65402",
    "Lebrija": "51203",
    "Leon": "15100",
    "Linares-Baeza": "50300",
    "Lisboa (Todas)": "LISBO",
    "Lisboa-Estacion Oriente": "94404",
    "Lleida": "78400",
    "Logroño": "81100",
    "Madrid (Todas)": "MADRI",
    "Madrid - Atocha Cercanias": "18000",
    "Madrid-Barajas T4": "98305",
    "Madrid-Chamartin": "17000",
    "Madrid-Puerta De Atocha": "60000",
    "Malaga Maria Zambrano": "54413",
    "Manzanares": "50100",
    "Medina Del Campo (Todas)": "MEDIN",
    "Miranda De Ebro": "11200",
    "Monforte De Lemos": "20300",
    "Murcia": "61200",
    "Navalmoral De La Mata": "35206",
    "Osuna": "01007",
    "Ourense": "22100",
    "Oviedo": "15211",
    "Palencia": "14100",
    "Pamplona/Iruña": "80100",
    "Plasencia": "30002",
    "Ponferrada": "20200",
    "Pontevedra": "23004",
    "Puente Genil (Todas)": "PTE G",
    "Puente Genil-Herrera": "02002",
    "Puerto De Santa Maria": "51400",
    "Puertollano": "37300",
    "Redondela (Todas)": "REDON",
    "Ronda": "55007",
    "Sagunt/Sagunto": "65200",
    "Salamanca": "30100",
    "San Fernando-Bahia Sur": "51406",
    "San Roque-La Linea": "55018",
    "San Sebastian/Donostia": "11511",
    "Santander": "14223",
    "Santander (Todas)": "SANTA",
    "Santiago De Compostela": "31400",
    "Segovia (Todas)": "SEGOV",
    "Segovia Av": "08004",
    "Sevilla-San Bernardo": "51100",
    "Sevilla-Santa Justa": "51003",
    "Tafalla": "80108",
    "Tarragona": "71500",
    "Tarragona (Todas)": "TARRA",
    "Toledo": "92102",
    "Torrelavega": "14213",
    "Tudela De Navarra": "81202",
    "Valdepeñas": "50102",
    "Valencia (Todas)": "VALEN",
    "Valencia Joaquin Sorolla": "03216",
    "Valencia-Estacio Del Nord": "65000",
    "Valladolid": "10600",
    "Vigo (Todas)": "VIGO-",
    "Vigo Guixar": "22308",
    "Vigo Urzaiz": "08223",
    "Vilagarcia De Arousa": "23008",
    "Villanueva De Cordoba-Los Pedroches": "37704",
    "Villarrobledo": "60500",
    "Villena": "60902",
    "Villena Av": "03309",
    "Vinaros": "65312",
    "Vitoria/Gasteiz": "11208",
    "Xativa": "64100",
    "Zamora": "30200",
    "Zaragoza (Todas)": "ZARAG",
    "Zaragoza-Delicias": "04040",
    "Zumarraga": "11400"
};

/***/ })
/******/ ]);