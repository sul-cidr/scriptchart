webpackHotUpdate("main",{

/***/ "./js/components/App.js":
/*!******************************!*\
  !*** ./js/components/App.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var bulma_css_bulma_min_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bulma/css/bulma.min.css */ \"./node_modules/bulma/css/bulma.min.css\");\n/* harmony import */ var bulma_css_bulma_min_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bulma_css_bulma_min_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var font_awesome_css_font_awesome_min_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! font-awesome/css/font-awesome.min.css */ \"./node_modules/font-awesome/css/font-awesome.min.css\");\n/* harmony import */ var font_awesome_css_font_awesome_min_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(font_awesome_css_font_awesome_min_css__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _DashTabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./DashTabs */ \"./js/components/DashTabs.js\");\n/* harmony import */ var react_dnd_html5_backend__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-dnd-html5-backend */ \"./node_modules/react-dnd-html5-backend/lib/index.js\");\n/* harmony import */ var react_dnd_html5_backend__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_dnd_html5_backend__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var react_dnd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react-dnd */ \"./node_modules/react-dnd/lib/index.js\");\n/* harmony import */ var react_dnd__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_dnd__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _ManuscriptForm__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ManuscriptForm */ \"./js/components/ManuscriptForm.js\");\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n //import Header from \"./Header\";\n//import Footer from \"./Footer\";\n\n\n\n\n\n\nvar App =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(App, _Component);\n\n  function App() {\n    _classCallCheck(this, App);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(App).apply(this, arguments));\n  }\n\n  _createClass(App, [{\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"App\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"columns main-content\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"column is-one-quarter\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"box\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"h4\", {\n        className: \"title is-4\"\n      }, \"Scriptchart options\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_ManuscriptForm__WEBPACK_IMPORTED_MODULE_6__[\"default\"], null))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        className: \"column\"\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DashTabs__WEBPACK_IMPORTED_MODULE_3__[\"default\"], null))));\n    }\n  }]);\n\n  return App;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Object(react_dnd__WEBPACK_IMPORTED_MODULE_5__[\"DragDropContext\"])(react_dnd_html5_backend__WEBPACK_IMPORTED_MODULE_4___default.a)(App));\n\n//# sourceURL=webpack:///./js/components/App.js?");

/***/ }),

/***/ "./js/components/DragAndDropTable.js":
/*!*******************************************!*\
  !*** ./js/components/DragAndDropTable.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/cloneDeep */ \"./node_modules/lodash/cloneDeep.js\");\n/* harmony import */ var lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var reactabular_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactabular-table */ \"./node_modules/reactabular-table/dist/index.js\");\n/* harmony import */ var reactabular_table__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(reactabular_table__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var reactabular_dnd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reactabular-dnd */ \"./node_modules/reactabular-dnd/dist/index.js\");\n/* harmony import */ var reactabular_dnd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(reactabular_dnd__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var table_resolver__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! table-resolver */ \"./node_modules/table-resolver/dist/index.js\");\n/* harmony import */ var table_resolver__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(table_resolver__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _images_Syriac_Eastern_alap_png__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images/Syriac_Eastern_alap.png */ \"./js/components/images/Syriac_Eastern_alap.png\");\n/* harmony import */ var _images_Syriac_Eastern_alap_png__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Eastern_alap_png__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _images_Syriac_Eastern_bet_png__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/Syriac_Eastern_bet.png */ \"./js/components/images/Syriac_Eastern_bet.png\");\n/* harmony import */ var _images_Syriac_Eastern_bet_png__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Eastern_bet_png__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var _images_Syriac_Eastern_gamal_png__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/Syriac_Eastern_gamal.png */ \"./js/components/images/Syriac_Eastern_gamal.png\");\n/* harmony import */ var _images_Syriac_Eastern_gamal_png__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Eastern_gamal_png__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var _images_Syriac_Eastern_dalat_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./images/Syriac_Eastern_dalat.png */ \"./js/components/images/Syriac_Eastern_dalat.png\");\n/* harmony import */ var _images_Syriac_Eastern_dalat_png__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Eastern_dalat_png__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _images_Syriac_Eastern_he_png__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./images/Syriac_Eastern_he.png */ \"./js/components/images/Syriac_Eastern_he.png\");\n/* harmony import */ var _images_Syriac_Eastern_he_png__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Eastern_he_png__WEBPACK_IMPORTED_MODULE_9__);\n/* harmony import */ var _images_Syriac_Eastern_waw_png__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./images/Syriac_Eastern_waw.png */ \"./js/components/images/Syriac_Eastern_waw.png\");\n/* harmony import */ var _images_Syriac_Eastern_waw_png__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Eastern_waw_png__WEBPACK_IMPORTED_MODULE_10__);\n/* harmony import */ var _images_Syriac_Estrangela_alap_png__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./images/Syriac_Estrangela_alap.png */ \"./js/components/images/Syriac_Estrangela_alap.png\");\n/* harmony import */ var _images_Syriac_Estrangela_alap_png__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Estrangela_alap_png__WEBPACK_IMPORTED_MODULE_11__);\n/* harmony import */ var _images_Syriac_Estrangela_bet_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./images/Syriac_Estrangela_bet.png */ \"./js/components/images/Syriac_Estrangela_bet.png\");\n/* harmony import */ var _images_Syriac_Estrangela_bet_png__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Estrangela_bet_png__WEBPACK_IMPORTED_MODULE_12__);\n/* harmony import */ var _images_Syriac_Estrangela_gamal_png__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./images/Syriac_Estrangela_gamal.png */ \"./js/components/images/Syriac_Estrangela_gamal.png\");\n/* harmony import */ var _images_Syriac_Estrangela_gamal_png__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Estrangela_gamal_png__WEBPACK_IMPORTED_MODULE_13__);\n/* harmony import */ var _images_Syriac_Estrangela_dalat_png__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./images/Syriac_Estrangela_dalat.png */ \"./js/components/images/Syriac_Estrangela_dalat.png\");\n/* harmony import */ var _images_Syriac_Estrangela_dalat_png__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Estrangela_dalat_png__WEBPACK_IMPORTED_MODULE_14__);\n/* harmony import */ var _images_Syriac_Estrangela_he_png__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./images/Syriac_Estrangela_he.png */ \"./js/components/images/Syriac_Estrangela_he.png\");\n/* harmony import */ var _images_Syriac_Estrangela_he_png__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Estrangela_he_png__WEBPACK_IMPORTED_MODULE_15__);\n/* harmony import */ var _images_Syriac_Estrangela_waw_png__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./images/Syriac_Estrangela_waw.png */ \"./js/components/images/Syriac_Estrangela_waw.png\");\n/* harmony import */ var _images_Syriac_Estrangela_waw_png__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Estrangela_waw_png__WEBPACK_IMPORTED_MODULE_16__);\n/* harmony import */ var _images_Syriac_Serta_alap_png__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./images/Syriac_Serta_alap.png */ \"./js/components/images/Syriac_Serta_alap.png\");\n/* harmony import */ var _images_Syriac_Serta_alap_png__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Serta_alap_png__WEBPACK_IMPORTED_MODULE_17__);\n/* harmony import */ var _images_Syriac_Serta_bet_png__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./images/Syriac_Serta_bet.png */ \"./js/components/images/Syriac_Serta_bet.png\");\n/* harmony import */ var _images_Syriac_Serta_bet_png__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Serta_bet_png__WEBPACK_IMPORTED_MODULE_18__);\n/* harmony import */ var _images_Syriac_Serta_gamal_png__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./images/Syriac_Serta_gamal.png */ \"./js/components/images/Syriac_Serta_gamal.png\");\n/* harmony import */ var _images_Syriac_Serta_gamal_png__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Serta_gamal_png__WEBPACK_IMPORTED_MODULE_19__);\n/* harmony import */ var _images_Syriac_Serta_dalat_png__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./images/Syriac_Serta_dalat.png */ \"./js/components/images/Syriac_Serta_dalat.png\");\n/* harmony import */ var _images_Syriac_Serta_dalat_png__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Serta_dalat_png__WEBPACK_IMPORTED_MODULE_20__);\n/* harmony import */ var _images_Syriac_Serta_he_png__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./images/Syriac_Serta_he.png */ \"./js/components/images/Syriac_Serta_he.png\");\n/* harmony import */ var _images_Syriac_Serta_he_png__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Serta_he_png__WEBPACK_IMPORTED_MODULE_21__);\n/* harmony import */ var _images_Syriac_Serta_waw_png__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./images/Syriac_Serta_waw.png */ \"./js/components/images/Syriac_Serta_waw.png\");\n/* harmony import */ var _images_Syriac_Serta_waw_png__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_images_Syriac_Serta_waw_png__WEBPACK_IMPORTED_MODULE_22__);\n/* harmony import */ var _DragAndDropTable_css__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./DragAndDropTable.css */ \"./js/components/DragAndDropTable.css\");\n/* harmony import */ var _DragAndDropTable_css__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_DragAndDropTable_css__WEBPACK_IMPORTED_MODULE_23__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nvar sampleLetters = [_images_Syriac_Eastern_alap_png__WEBPACK_IMPORTED_MODULE_5___default.a, _images_Syriac_Eastern_bet_png__WEBPACK_IMPORTED_MODULE_6___default.a, _images_Syriac_Eastern_gamal_png__WEBPACK_IMPORTED_MODULE_7___default.a, _images_Syriac_Eastern_dalat_png__WEBPACK_IMPORTED_MODULE_8___default.a, _images_Syriac_Eastern_he_png__WEBPACK_IMPORTED_MODULE_9___default.a, _images_Syriac_Eastern_waw_png__WEBPACK_IMPORTED_MODULE_10___default.a, _images_Syriac_Estrangela_alap_png__WEBPACK_IMPORTED_MODULE_11___default.a, _images_Syriac_Estrangela_bet_png__WEBPACK_IMPORTED_MODULE_12___default.a, _images_Syriac_Estrangela_gamal_png__WEBPACK_IMPORTED_MODULE_13___default.a, _images_Syriac_Estrangela_dalat_png__WEBPACK_IMPORTED_MODULE_14___default.a, _images_Syriac_Estrangela_he_png__WEBPACK_IMPORTED_MODULE_15___default.a, _images_Syriac_Estrangela_waw_png__WEBPACK_IMPORTED_MODULE_16___default.a, _images_Syriac_Serta_alap_png__WEBPACK_IMPORTED_MODULE_17___default.a, _images_Syriac_Serta_bet_png__WEBPACK_IMPORTED_MODULE_18___default.a, _images_Syriac_Serta_gamal_png__WEBPACK_IMPORTED_MODULE_19___default.a, _images_Syriac_Serta_dalat_png__WEBPACK_IMPORTED_MODULE_20___default.a, _images_Syriac_Serta_he_png__WEBPACK_IMPORTED_MODULE_21___default.a, _images_Syriac_Serta_waw_png__WEBPACK_IMPORTED_MODULE_22___default.a];\nvar letters = [\"ʾĀlep̄\", \"Bēṯ\", \"Gāmal\", \"Dālaṯ\", \"Hē\", \"Waw\"];\nvar manuscripts = [\"A\", \"B\", \"C\", \"D\", \"E\", \"F\"];\nvar rows = [];\nvar sampleLetterCount = 0;\n/* PMB These should come in handy when the content is pulled in dynamically\nconst schema = {\n  type: \"object\",\n  properties: {\n    id: {\n      type: \"integer\"\n    },\n    letter: {\n      type: \"string\"\n    },\n    required: [\"id\", \"letter\"]\n  }\n};\nfor (let i = 0; i < manuscripts.length; i++) {\n  let colId = \"manuscript\" + (i + 1);\n  schema[\"properties\"][colId] = { type: \"string\" };\n  schema[\"required\"].push(colId);\n}\n*/\n\n/* Load the sample letter images into the rows array */\n\nfor (var i = 0; i < letters.length; i++) {\n  var row = {\n    id: i + 1,\n    letter: letters[i]\n  };\n\n  for (var j = 0; j < manuscripts.length; j++) {\n    sampleLetterCount++;\n    var sampleLetterIndex = sampleLetterCount % sampleLetters.length;\n    row[\"manuscript\" + (j + 1)] = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"img\", {\n      src: sampleLetters[sampleLetterIndex],\n      alt: \"letter \" + sampleLetterIndex\n    });\n  }\n\n  rows.push(row);\n}\n\nvar DragAndDropTable =\n/*#__PURE__*/\nfunction (_React$Component) {\n  _inherits(DragAndDropTable, _React$Component);\n\n  function DragAndDropTable(props) {\n    var _this;\n\n    _classCallCheck(this, DragAndDropTable);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(DragAndDropTable).call(this, props));\n    _this.state = {\n      columns: [{\n        property: \"letter\",\n        props: {\n          label: \"Letter\",\n          style: {\n            fontWeight: \"bold\"\n          }\n        },\n        header: {\n          label: \"Scriptchart\",\n          props: {\n            onMove: function onMove(o) {\n              return _this.onMoveColumn(o);\n            }\n          }\n        }\n      }],\n      rows: rows\n    };\n    /* Iteratively populate the columns */\n\n    for (var _i = 0; _i < manuscripts.length; _i++) {\n      var column = {\n        property: \"manuscript\" + (_i + 1),\n        header: {\n          label: \"Manuscript \" + manuscripts[_i],\n          props: {\n            onMove: function onMove(o) {\n              return _this.onMoveColumn(o);\n            }\n          }\n        },\n        props: {\n          label: \"Manuscript \" + manuscripts[_i]\n        }\n      };\n\n      _this.state.columns.push(column);\n    }\n\n    _this.onRow = _this.onRow.bind(_assertThisInitialized(_this));\n    _this.onMoveRow = _this.onMoveRow.bind(_assertThisInitialized(_this));\n    _this.onMoveColumn = _this.onMoveColumn.bind(_assertThisInitialized(_this));\n    _this.onMoveChildColumn = _this.onMoveChildColumn.bind(_assertThisInitialized(_this));\n    return _this;\n  }\n\n  _createClass(DragAndDropTable, [{\n    key: \"render\",\n    value: function render() {\n      var renderers = {\n        header: {\n          cell: reactabular_dnd__WEBPACK_IMPORTED_MODULE_3__[\"Header\"]\n        },\n        body: {\n          row: reactabular_dnd__WEBPACK_IMPORTED_MODULE_3__[\"Row\"]\n        }\n      };\n      var _this$state = this.state,\n          columns = _this$state.columns,\n          rows = _this$state.rows;\n      var resolvedColumns = table_resolver__WEBPACK_IMPORTED_MODULE_4__[\"columnChildren\"]({\n        columns: columns\n      });\n      var resolvedRows = table_resolver__WEBPACK_IMPORTED_MODULE_4__[\"resolve\"]({\n        columns: resolvedColumns,\n        method: table_resolver__WEBPACK_IMPORTED_MODULE_4__[\"nested\"]\n      })(rows);\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactabular_table__WEBPACK_IMPORTED_MODULE_2__[\"Provider\"], {\n        renderers: renderers,\n        columns: resolvedColumns\n      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactabular_table__WEBPACK_IMPORTED_MODULE_2__[\"Header\"], {\n        headerRows: table_resolver__WEBPACK_IMPORTED_MODULE_4__[\"headerRows\"]({\n          columns: columns\n        })\n      }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactabular_table__WEBPACK_IMPORTED_MODULE_2__[\"Body\"], {\n        rows: resolvedRows,\n        rowKey: \"id\",\n        onRow: this.onRow\n      }));\n    }\n  }, {\n    key: \"onRow\",\n    value: function onRow(row) {\n      return {\n        rowId: row.id,\n        onMove: this.onMoveRow\n      };\n    }\n  }, {\n    key: \"onMoveRow\",\n    value: function onMoveRow(_ref) {\n      var sourceRowId = _ref.sourceRowId,\n          targetRowId = _ref.targetRowId;\n      var rows = reactabular_dnd__WEBPACK_IMPORTED_MODULE_3__[\"moveRows\"]({\n        sourceRowId: sourceRowId,\n        targetRowId: targetRowId\n      })(this.state.rows);\n\n      if (rows) {\n        this.setState({\n          rows: rows\n        });\n      }\n    }\n  }, {\n    key: \"onMoveColumn\",\n    value: function onMoveColumn(labels) {\n      var movedColumns = reactabular_dnd__WEBPACK_IMPORTED_MODULE_3__[\"moveLabels\"](this.state.columns, labels);\n\n      if (movedColumns) {\n        // Retain widths to avoid flashing while drag and dropping.\n        var source = movedColumns.source;\n        var target = movedColumns.target;\n        var sourceWidth = source.props.style && source.props.style.width;\n        var targetWidth = target.props.style && target.props.style.width;\n        source.props.style = _objectSpread({}, source.props.style, {\n          width: targetWidth\n        });\n        target.props.style = _objectSpread({}, target.props.style, {\n          width: sourceWidth\n        });\n        this.setState({\n          columns: movedColumns.columns\n        });\n      }\n    }\n  }, {\n    key: \"onMoveChildColumn\",\n    value: function onMoveChildColumn(labels) {\n      var movedChildren = reactabular_dnd__WEBPACK_IMPORTED_MODULE_3__[\"moveChildrenLabels\"](this.state.columns, labels);\n\n      if (movedChildren) {\n        var columns = lodash_cloneDeep__WEBPACK_IMPORTED_MODULE_1___default()(this.state.columns);\n        columns[movedChildren.target].children = movedChildren.columns; // Here we assume children have the same width.\n\n        this.setState({\n          columns: columns\n        });\n      }\n    }\n  }]);\n\n  return DragAndDropTable;\n}(react__WEBPACK_IMPORTED_MODULE_0___default.a.Component);\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (DragAndDropTable);\n\n//# sourceURL=webpack:///./js/components/DragAndDropTable.js?");

/***/ }),

/***/ "./js/components/LetterButton.js":
false,

/***/ "./js/components/ManuscriptForm.js":
/*!*****************************************!*\
  !*** ./js/components/ManuscriptForm.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n // In this component, we would actually pass a list of\n// manuscripts, and have a toggle to sort by date or name\n// The list could come from a json object with name and date\n\nvar ManuscriptForm = function ManuscriptForm() {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"form\", {\n    className: \"manuscript-form\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"field\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n    className: \"control\"\n  }, \"Select Manuscripts:\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"control\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"select is-multiple\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"select\", {\n    multiple: true\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"Manuscript A\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"Manuscript B\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"Manuscript C\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"Manuscript D\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"Manuscript E\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"Manuscript F\")))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"control sort-option\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"p\", null, \"Order manuscripts by:\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n    className: \"radio\"\n  }, \"Shelfmark:\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    type: \"radio\",\n    name: \"Shelfmark\",\n    defaultChecked: true\n  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n    className: \"radio\"\n  }, \"Date:\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    type: \"radio\",\n    name: \"Date\"\n  })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"field\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n    className: \"control\"\n  }, \"Select Letters:\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"control\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"select is-multiple\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"select\", {\n    multiple: true\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"\\u02BE\\u0100lep\\u0304\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"B\\u0113\\u1E6F\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"G\\u0101mal\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"D\\u0101la\\u1E6F\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"H\\u0113\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"Waw\"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"field\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n    className: \"control\"\n  }, \"Select number of letter examples:\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"control\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"select\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"select\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"1\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"2\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"3\"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"field\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n    className: \"checkbox\"\n  }, \"Show binarized images?\", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"input\", {\n    type: \"checkbox\"\n  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"field\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"label\", {\n    className: \"control\"\n  }, \"Select image size:\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"control\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"select\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"select\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"Small\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"Medium\"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"option\", null, \"Large\"))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"field\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"control\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"button\", {\n    className: \"button is-link\"\n  }, \"Submit\"))));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ManuscriptForm);\n\n//# sourceURL=webpack:///./js/components/ManuscriptForm.js?");

/***/ }),

/***/ "./js/components/MiradorContainer.js":
/*!*******************************************!*\
  !*** ./js/components/MiradorContainer.js ***!
  \*******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _MiradorViewer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MiradorViewer */ \"./js/components/MiradorViewer.jsx\");\n\n\n\nvar MiradorContainer = function MiradorContainer() {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_MiradorViewer__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null);\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (MiradorContainer);\n\n//# sourceURL=webpack:///./js/components/MiradorContainer.js?");

/***/ }),

/***/ "./js/components/MiradorViewer.jsx":
/*!*****************************************!*\
  !*** ./js/components/MiradorViewer.jsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return MiradorViewer; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _MiradorViewer_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MiradorViewer.css */ \"./js/components/MiradorViewer.css\");\n/* harmony import */ var _MiradorViewer_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_MiradorViewer_css__WEBPACK_IMPORTED_MODULE_1__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n //import PropTypes from 'prop-types';\n\n\n\nvar MiradorViewer =\n/*#__PURE__*/\nfunction (_Component) {\n  _inherits(MiradorViewer, _Component);\n\n  function MiradorViewer() {\n    _classCallCheck(this, MiradorViewer);\n\n    return _possibleConstructorReturn(this, _getPrototypeOf(MiradorViewer).apply(this, arguments));\n  }\n\n  _createClass(MiradorViewer, [{\n    key: \"componentDidMount\",\n    // constructor(props) {\n    //   super(props);\n    // }\n    value: function componentDidMount() {\n      Mirador({\n        id: \"mirador\",\n        layout: \"1x1\",\n        buildPath: \"mirador/\",\n        data: [{\n          manifestUri: \"https://iiif.harvardartmuseums.org/manifests/object/299843\",\n          \"location\": \"Harvard University\"\n        }, {\n          manifestUri: \"https://iiif.harvardartmuseums.org/manifests/object/304136\",\n          \"location\": \"Harvard University\"\n        }, {\n          manifestUri: \"https://iiif.harvardartmuseums.org/manifests/object/198021\",\n          \"location\": \"Harvard University\"\n        }, {\n          manifestUri: \"https://iiif.harvardartmuseums.org/manifests/object/320567\",\n          \"location\": \"Harvard University\"\n        }, {\n          manifestUri: \"https://media.nga.gov/public/manifests/nga_highlights.json\",\n          \"location\": \"National Gallery of Art\"\n        }, {\n          manifestUri: \"https://media.nga.gov/public/manifests/multispectral_demo.json\",\n          \"location\": \"National Gallery of Art\"\n        }],\n        windowObjects: [{\n          loadedManifest: \"https://iiif.harvardartmuseums.org/manifests/object/299843\",\n          viewType: \"ImageView\" //slotAddress: \"row1.column1\"\n\n          /*,{\n           loadedManifest: \"https://media.nga.gov/public/manifests/nga_highlights.json\",\n           slotAddress: \"row1.column2\",\n           viewType: \"ImageView\"\n          }*/\n\n        }],\n        annotationEndpoint: {\n          name: \"Local Storage\",\n          module: \"LocalStorageEndpoint\"\n        },\n        windowSettings: {\n          canvasControls: {\n            imageManipulation: {\n              manipulationLayer: true,\n              controls: {\n                mirror: true\n              }\n            }\n          }\n        }\n      });\n    }\n  }, {\n    key: \"render\",\n    value: function render() {\n      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n        id: \"mirador\"\n      });\n    }\n  }]);\n\n  return MiradorViewer;\n}(react__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]); // MiradorViewer.propTypes = {\n// };\n// MiradorViewer.defaultProps = {\n// }\n\n\n\n\n//# sourceURL=webpack:///./js/components/MiradorViewer.jsx?");

/***/ }),

/***/ "./js/components/ScriptChart.js":
/*!**************************************!*\
  !*** ./js/components/ScriptChart.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _DragAndDropTable__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DragAndDropTable */ \"./js/components/DragAndDropTable.js\");\n\n\n\nvar ScriptChart = function ScriptChart() {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", null, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_DragAndDropTable__WEBPACK_IMPORTED_MODULE_1__[\"default\"], null));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ScriptChart);\n\n//# sourceURL=webpack:///./js/components/ScriptChart.js?");

/***/ }),

/***/ "./node_modules/lodash/_arrayEach.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_arrayEach.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * A specialized version of `_.forEach` for arrays without support for\n * iteratee shorthands.\n *\n * @private\n * @param {Array} [array] The array to iterate over.\n * @param {Function} iteratee The function invoked per iteration.\n * @returns {Array} Returns `array`.\n */\nfunction arrayEach(array, iteratee) {\n  var index = -1,\n      length = array == null ? 0 : array.length;\n\n  while (++index < length) {\n    if (iteratee(array[index], index, array) === false) {\n      break;\n    }\n  }\n  return array;\n}\n\nmodule.exports = arrayEach;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_arrayEach.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseAssign.js":
/*!********************************************!*\
  !*** ./node_modules/lodash/_baseAssign.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/**\n * The base implementation of `_.assign` without support for multiple sources\n * or `customizer` functions.\n *\n * @private\n * @param {Object} object The destination object.\n * @param {Object} source The source object.\n * @returns {Object} Returns `object`.\n */\nfunction baseAssign(object, source) {\n  return object && copyObject(source, keys(source), object);\n}\n\nmodule.exports = baseAssign;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseAssign.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseAssignIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseAssignIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    keysIn = __webpack_require__(/*! ./keysIn */ \"./node_modules/lodash/keysIn.js\");\n\n/**\n * The base implementation of `_.assignIn` without support for multiple sources\n * or `customizer` functions.\n *\n * @private\n * @param {Object} object The destination object.\n * @param {Object} source The source object.\n * @returns {Object} Returns `object`.\n */\nfunction baseAssignIn(object, source) {\n  return object && copyObject(source, keysIn(source), object);\n}\n\nmodule.exports = baseAssignIn;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseAssignIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseClone.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseClone.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Stack = __webpack_require__(/*! ./_Stack */ \"./node_modules/lodash/_Stack.js\"),\n    arrayEach = __webpack_require__(/*! ./_arrayEach */ \"./node_modules/lodash/_arrayEach.js\"),\n    assignValue = __webpack_require__(/*! ./_assignValue */ \"./node_modules/lodash/_assignValue.js\"),\n    baseAssign = __webpack_require__(/*! ./_baseAssign */ \"./node_modules/lodash/_baseAssign.js\"),\n    baseAssignIn = __webpack_require__(/*! ./_baseAssignIn */ \"./node_modules/lodash/_baseAssignIn.js\"),\n    cloneBuffer = __webpack_require__(/*! ./_cloneBuffer */ \"./node_modules/lodash/_cloneBuffer.js\"),\n    copyArray = __webpack_require__(/*! ./_copyArray */ \"./node_modules/lodash/_copyArray.js\"),\n    copySymbols = __webpack_require__(/*! ./_copySymbols */ \"./node_modules/lodash/_copySymbols.js\"),\n    copySymbolsIn = __webpack_require__(/*! ./_copySymbolsIn */ \"./node_modules/lodash/_copySymbolsIn.js\"),\n    getAllKeys = __webpack_require__(/*! ./_getAllKeys */ \"./node_modules/lodash/_getAllKeys.js\"),\n    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ \"./node_modules/lodash/_getAllKeysIn.js\"),\n    getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    initCloneArray = __webpack_require__(/*! ./_initCloneArray */ \"./node_modules/lodash/_initCloneArray.js\"),\n    initCloneByTag = __webpack_require__(/*! ./_initCloneByTag */ \"./node_modules/lodash/_initCloneByTag.js\"),\n    initCloneObject = __webpack_require__(/*! ./_initCloneObject */ \"./node_modules/lodash/_initCloneObject.js\"),\n    isArray = __webpack_require__(/*! ./isArray */ \"./node_modules/lodash/isArray.js\"),\n    isBuffer = __webpack_require__(/*! ./isBuffer */ \"./node_modules/lodash/isBuffer.js\"),\n    isMap = __webpack_require__(/*! ./isMap */ \"./node_modules/lodash/isMap.js\"),\n    isObject = __webpack_require__(/*! ./isObject */ \"./node_modules/lodash/isObject.js\"),\n    isSet = __webpack_require__(/*! ./isSet */ \"./node_modules/lodash/isSet.js\"),\n    keys = __webpack_require__(/*! ./keys */ \"./node_modules/lodash/keys.js\");\n\n/** Used to compose bitmasks for cloning. */\nvar CLONE_DEEP_FLAG = 1,\n    CLONE_FLAT_FLAG = 2,\n    CLONE_SYMBOLS_FLAG = 4;\n\n/** `Object#toString` result references. */\nvar argsTag = '[object Arguments]',\n    arrayTag = '[object Array]',\n    boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    errorTag = '[object Error]',\n    funcTag = '[object Function]',\n    genTag = '[object GeneratorFunction]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    objectTag = '[object Object]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    symbolTag = '[object Symbol]',\n    weakMapTag = '[object WeakMap]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]',\n    float32Tag = '[object Float32Array]',\n    float64Tag = '[object Float64Array]',\n    int8Tag = '[object Int8Array]',\n    int16Tag = '[object Int16Array]',\n    int32Tag = '[object Int32Array]',\n    uint8Tag = '[object Uint8Array]',\n    uint8ClampedTag = '[object Uint8ClampedArray]',\n    uint16Tag = '[object Uint16Array]',\n    uint32Tag = '[object Uint32Array]';\n\n/** Used to identify `toStringTag` values supported by `_.clone`. */\nvar cloneableTags = {};\ncloneableTags[argsTag] = cloneableTags[arrayTag] =\ncloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =\ncloneableTags[boolTag] = cloneableTags[dateTag] =\ncloneableTags[float32Tag] = cloneableTags[float64Tag] =\ncloneableTags[int8Tag] = cloneableTags[int16Tag] =\ncloneableTags[int32Tag] = cloneableTags[mapTag] =\ncloneableTags[numberTag] = cloneableTags[objectTag] =\ncloneableTags[regexpTag] = cloneableTags[setTag] =\ncloneableTags[stringTag] = cloneableTags[symbolTag] =\ncloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =\ncloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;\ncloneableTags[errorTag] = cloneableTags[funcTag] =\ncloneableTags[weakMapTag] = false;\n\n/**\n * The base implementation of `_.clone` and `_.cloneDeep` which tracks\n * traversed objects.\n *\n * @private\n * @param {*} value The value to clone.\n * @param {boolean} bitmask The bitmask flags.\n *  1 - Deep clone\n *  2 - Flatten inherited properties\n *  4 - Clone symbols\n * @param {Function} [customizer] The function to customize cloning.\n * @param {string} [key] The key of `value`.\n * @param {Object} [object] The parent object of `value`.\n * @param {Object} [stack] Tracks traversed objects and their clone counterparts.\n * @returns {*} Returns the cloned value.\n */\nfunction baseClone(value, bitmask, customizer, key, object, stack) {\n  var result,\n      isDeep = bitmask & CLONE_DEEP_FLAG,\n      isFlat = bitmask & CLONE_FLAT_FLAG,\n      isFull = bitmask & CLONE_SYMBOLS_FLAG;\n\n  if (customizer) {\n    result = object ? customizer(value, key, object, stack) : customizer(value);\n  }\n  if (result !== undefined) {\n    return result;\n  }\n  if (!isObject(value)) {\n    return value;\n  }\n  var isArr = isArray(value);\n  if (isArr) {\n    result = initCloneArray(value);\n    if (!isDeep) {\n      return copyArray(value, result);\n    }\n  } else {\n    var tag = getTag(value),\n        isFunc = tag == funcTag || tag == genTag;\n\n    if (isBuffer(value)) {\n      return cloneBuffer(value, isDeep);\n    }\n    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {\n      result = (isFlat || isFunc) ? {} : initCloneObject(value);\n      if (!isDeep) {\n        return isFlat\n          ? copySymbolsIn(value, baseAssignIn(result, value))\n          : copySymbols(value, baseAssign(result, value));\n      }\n    } else {\n      if (!cloneableTags[tag]) {\n        return object ? value : {};\n      }\n      result = initCloneByTag(value, tag, isDeep);\n    }\n  }\n  // Check for circular references and return its corresponding clone.\n  stack || (stack = new Stack);\n  var stacked = stack.get(value);\n  if (stacked) {\n    return stacked;\n  }\n  stack.set(value, result);\n\n  if (isSet(value)) {\n    value.forEach(function(subValue) {\n      result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));\n    });\n\n    return result;\n  }\n\n  if (isMap(value)) {\n    value.forEach(function(subValue, key) {\n      result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));\n    });\n\n    return result;\n  }\n\n  var keysFunc = isFull\n    ? (isFlat ? getAllKeysIn : getAllKeys)\n    : (isFlat ? keysIn : keys);\n\n  var props = isArr ? undefined : keysFunc(value);\n  arrayEach(props || value, function(subValue, key) {\n    if (props) {\n      key = subValue;\n      subValue = value[key];\n    }\n    // Recursively populate clone (susceptible to call stack limits).\n    assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));\n  });\n  return result;\n}\n\nmodule.exports = baseClone;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseClone.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseHas.js":
/*!*****************************************!*\
  !*** ./node_modules/lodash/_baseHas.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * The base implementation of `_.has` without support for deep paths.\n *\n * @private\n * @param {Object} [object] The object to query.\n * @param {Array|string} key The key to check.\n * @returns {boolean} Returns `true` if `key` exists, else `false`.\n */\nfunction baseHas(object, key) {\n  return object != null && hasOwnProperty.call(object, key);\n}\n\nmodule.exports = baseHas;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseHas.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsMap.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsMap.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar mapTag = '[object Map]';\n\n/**\n * The base implementation of `_.isMap` without Node.js optimizations.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a map, else `false`.\n */\nfunction baseIsMap(value) {\n  return isObjectLike(value) && getTag(value) == mapTag;\n}\n\nmodule.exports = baseIsMap;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseIsMap.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseIsSet.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseIsSet.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var getTag = __webpack_require__(/*! ./_getTag */ \"./node_modules/lodash/_getTag.js\"),\n    isObjectLike = __webpack_require__(/*! ./isObjectLike */ \"./node_modules/lodash/isObjectLike.js\");\n\n/** `Object#toString` result references. */\nvar setTag = '[object Set]';\n\n/**\n * The base implementation of `_.isSet` without Node.js optimizations.\n *\n * @private\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a set, else `false`.\n */\nfunction baseIsSet(value) {\n  return isObjectLike(value) && getTag(value) == setTag;\n}\n\nmodule.exports = baseIsSet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseIsSet.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseSlice.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseSlice.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.slice` without an iteratee call guard.\n *\n * @private\n * @param {Array} array The array to slice.\n * @param {number} [start=0] The start position.\n * @param {number} [end=array.length] The end position.\n * @returns {Array} Returns the slice of `array`.\n */\nfunction baseSlice(array, start, end) {\n  var index = -1,\n      length = array.length;\n\n  if (start < 0) {\n    start = -start > length ? 0 : (length + start);\n  }\n  end = end > length ? length : end;\n  if (end < 0) {\n    end += length;\n  }\n  length = start > end ? 0 : ((end - start) >>> 0);\n  start >>>= 0;\n\n  var result = Array(length);\n  while (++index < length) {\n    result[index] = array[index + start];\n  }\n  return result;\n}\n\nmodule.exports = baseSlice;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseSlice.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseUnset.js":
/*!*******************************************!*\
  !*** ./node_modules/lodash/_baseUnset.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var castPath = __webpack_require__(/*! ./_castPath */ \"./node_modules/lodash/_castPath.js\"),\n    last = __webpack_require__(/*! ./last */ \"./node_modules/lodash/last.js\"),\n    parent = __webpack_require__(/*! ./_parent */ \"./node_modules/lodash/_parent.js\"),\n    toKey = __webpack_require__(/*! ./_toKey */ \"./node_modules/lodash/_toKey.js\");\n\n/**\n * The base implementation of `_.unset`.\n *\n * @private\n * @param {Object} object The object to modify.\n * @param {Array|string} path The property path to unset.\n * @returns {boolean} Returns `true` if the property is deleted, else `false`.\n */\nfunction baseUnset(object, path) {\n  path = castPath(path, object);\n  object = parent(object, path);\n  return object == null || delete object[toKey(last(path))];\n}\n\nmodule.exports = baseUnset;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_baseUnset.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneDataView.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_cloneDataView.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ \"./node_modules/lodash/_cloneArrayBuffer.js\");\n\n/**\n * Creates a clone of `dataView`.\n *\n * @private\n * @param {Object} dataView The data view to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Object} Returns the cloned data view.\n */\nfunction cloneDataView(dataView, isDeep) {\n  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;\n  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);\n}\n\nmodule.exports = cloneDataView;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_cloneDataView.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneRegExp.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneRegExp.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used to match `RegExp` flags from their coerced string values. */\nvar reFlags = /\\w*$/;\n\n/**\n * Creates a clone of `regexp`.\n *\n * @private\n * @param {Object} regexp The regexp to clone.\n * @returns {Object} Returns the cloned regexp.\n */\nfunction cloneRegExp(regexp) {\n  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));\n  result.lastIndex = regexp.lastIndex;\n  return result;\n}\n\nmodule.exports = cloneRegExp;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_cloneRegExp.js?");

/***/ }),

/***/ "./node_modules/lodash/_cloneSymbol.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_cloneSymbol.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Symbol = __webpack_require__(/*! ./_Symbol */ \"./node_modules/lodash/_Symbol.js\");\n\n/** Used to convert symbols to primitives and strings. */\nvar symbolProto = Symbol ? Symbol.prototype : undefined,\n    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;\n\n/**\n * Creates a clone of the `symbol` object.\n *\n * @private\n * @param {Object} symbol The symbol object to clone.\n * @returns {Object} Returns the cloned symbol object.\n */\nfunction cloneSymbol(symbol) {\n  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};\n}\n\nmodule.exports = cloneSymbol;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_cloneSymbol.js?");

/***/ }),

/***/ "./node_modules/lodash/_copySymbols.js":
/*!*********************************************!*\
  !*** ./node_modules/lodash/_copySymbols.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    getSymbols = __webpack_require__(/*! ./_getSymbols */ \"./node_modules/lodash/_getSymbols.js\");\n\n/**\n * Copies own symbols of `source` to `object`.\n *\n * @private\n * @param {Object} source The object to copy symbols from.\n * @param {Object} [object={}] The object to copy symbols to.\n * @returns {Object} Returns `object`.\n */\nfunction copySymbols(source, object) {\n  return copyObject(source, getSymbols(source), object);\n}\n\nmodule.exports = copySymbols;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_copySymbols.js?");

/***/ }),

/***/ "./node_modules/lodash/_copySymbolsIn.js":
/*!***********************************************!*\
  !*** ./node_modules/lodash/_copySymbolsIn.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ \"./node_modules/lodash/_getSymbolsIn.js\");\n\n/**\n * Copies own and inherited symbols of `source` to `object`.\n *\n * @private\n * @param {Object} source The object to copy symbols from.\n * @param {Object} [object={}] The object to copy symbols to.\n * @returns {Object} Returns `object`.\n */\nfunction copySymbolsIn(source, object) {\n  return copyObject(source, getSymbolsIn(source), object);\n}\n\nmodule.exports = copySymbolsIn;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_copySymbolsIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_customOmitClone.js":
/*!*************************************************!*\
  !*** ./node_modules/lodash/_customOmitClone.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isPlainObject = __webpack_require__(/*! ./isPlainObject */ \"./node_modules/lodash/isPlainObject.js\");\n\n/**\n * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain\n * objects.\n *\n * @private\n * @param {*} value The value to inspect.\n * @param {string} key The key of the property to inspect.\n * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.\n */\nfunction customOmitClone(value) {\n  return isPlainObject(value) ? undefined : value;\n}\n\nmodule.exports = customOmitClone;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_customOmitClone.js?");

/***/ }),

/***/ "./node_modules/lodash/_flatRest.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/_flatRest.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var flatten = __webpack_require__(/*! ./flatten */ \"./node_modules/lodash/flatten.js\"),\n    overRest = __webpack_require__(/*! ./_overRest */ \"./node_modules/lodash/_overRest.js\"),\n    setToString = __webpack_require__(/*! ./_setToString */ \"./node_modules/lodash/_setToString.js\");\n\n/**\n * A specialized version of `baseRest` which flattens the rest array.\n *\n * @private\n * @param {Function} func The function to apply a rest parameter to.\n * @returns {Function} Returns the new function.\n */\nfunction flatRest(func) {\n  return setToString(overRest(func, undefined, flatten), func + '');\n}\n\nmodule.exports = flatRest;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_flatRest.js?");

/***/ }),

/***/ "./node_modules/lodash/_getAllKeysIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getAllKeysIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGetAllKeys = __webpack_require__(/*! ./_baseGetAllKeys */ \"./node_modules/lodash/_baseGetAllKeys.js\"),\n    getSymbolsIn = __webpack_require__(/*! ./_getSymbolsIn */ \"./node_modules/lodash/_getSymbolsIn.js\"),\n    keysIn = __webpack_require__(/*! ./keysIn */ \"./node_modules/lodash/keysIn.js\");\n\n/**\n * Creates an array of own and inherited enumerable property names and\n * symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of property names and symbols.\n */\nfunction getAllKeysIn(object) {\n  return baseGetAllKeys(object, keysIn, getSymbolsIn);\n}\n\nmodule.exports = getAllKeysIn;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getAllKeysIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_getSymbolsIn.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_getSymbolsIn.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayPush = __webpack_require__(/*! ./_arrayPush */ \"./node_modules/lodash/_arrayPush.js\"),\n    getPrototype = __webpack_require__(/*! ./_getPrototype */ \"./node_modules/lodash/_getPrototype.js\"),\n    getSymbols = __webpack_require__(/*! ./_getSymbols */ \"./node_modules/lodash/_getSymbols.js\"),\n    stubArray = __webpack_require__(/*! ./stubArray */ \"./node_modules/lodash/stubArray.js\");\n\n/* Built-in method references for those with the same name as other `lodash` methods. */\nvar nativeGetSymbols = Object.getOwnPropertySymbols;\n\n/**\n * Creates an array of the own and inherited enumerable symbols of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @returns {Array} Returns the array of symbols.\n */\nvar getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {\n  var result = [];\n  while (object) {\n    arrayPush(result, getSymbols(object));\n    object = getPrototype(object);\n  }\n  return result;\n};\n\nmodule.exports = getSymbolsIn;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_getSymbolsIn.js?");

/***/ }),

/***/ "./node_modules/lodash/_initCloneArray.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneArray.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/** Used for built-in method references. */\nvar objectProto = Object.prototype;\n\n/** Used to check objects for own properties. */\nvar hasOwnProperty = objectProto.hasOwnProperty;\n\n/**\n * Initializes an array clone.\n *\n * @private\n * @param {Array} array The array to clone.\n * @returns {Array} Returns the initialized clone.\n */\nfunction initCloneArray(array) {\n  var length = array.length,\n      result = new array.constructor(length);\n\n  // Add properties assigned by `RegExp#exec`.\n  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {\n    result.index = array.index;\n    result.input = array.input;\n  }\n  return result;\n}\n\nmodule.exports = initCloneArray;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_initCloneArray.js?");

/***/ }),

/***/ "./node_modules/lodash/_initCloneByTag.js":
/*!************************************************!*\
  !*** ./node_modules/lodash/_initCloneByTag.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var cloneArrayBuffer = __webpack_require__(/*! ./_cloneArrayBuffer */ \"./node_modules/lodash/_cloneArrayBuffer.js\"),\n    cloneDataView = __webpack_require__(/*! ./_cloneDataView */ \"./node_modules/lodash/_cloneDataView.js\"),\n    cloneRegExp = __webpack_require__(/*! ./_cloneRegExp */ \"./node_modules/lodash/_cloneRegExp.js\"),\n    cloneSymbol = __webpack_require__(/*! ./_cloneSymbol */ \"./node_modules/lodash/_cloneSymbol.js\"),\n    cloneTypedArray = __webpack_require__(/*! ./_cloneTypedArray */ \"./node_modules/lodash/_cloneTypedArray.js\");\n\n/** `Object#toString` result references. */\nvar boolTag = '[object Boolean]',\n    dateTag = '[object Date]',\n    mapTag = '[object Map]',\n    numberTag = '[object Number]',\n    regexpTag = '[object RegExp]',\n    setTag = '[object Set]',\n    stringTag = '[object String]',\n    symbolTag = '[object Symbol]';\n\nvar arrayBufferTag = '[object ArrayBuffer]',\n    dataViewTag = '[object DataView]',\n    float32Tag = '[object Float32Array]',\n    float64Tag = '[object Float64Array]',\n    int8Tag = '[object Int8Array]',\n    int16Tag = '[object Int16Array]',\n    int32Tag = '[object Int32Array]',\n    uint8Tag = '[object Uint8Array]',\n    uint8ClampedTag = '[object Uint8ClampedArray]',\n    uint16Tag = '[object Uint16Array]',\n    uint32Tag = '[object Uint32Array]';\n\n/**\n * Initializes an object clone based on its `toStringTag`.\n *\n * **Note:** This function only supports cloning values with tags of\n * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.\n *\n * @private\n * @param {Object} object The object to clone.\n * @param {string} tag The `toStringTag` of the object to clone.\n * @param {boolean} [isDeep] Specify a deep clone.\n * @returns {Object} Returns the initialized clone.\n */\nfunction initCloneByTag(object, tag, isDeep) {\n  var Ctor = object.constructor;\n  switch (tag) {\n    case arrayBufferTag:\n      return cloneArrayBuffer(object);\n\n    case boolTag:\n    case dateTag:\n      return new Ctor(+object);\n\n    case dataViewTag:\n      return cloneDataView(object, isDeep);\n\n    case float32Tag: case float64Tag:\n    case int8Tag: case int16Tag: case int32Tag:\n    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:\n      return cloneTypedArray(object, isDeep);\n\n    case mapTag:\n      return new Ctor;\n\n    case numberTag:\n    case stringTag:\n      return new Ctor(object);\n\n    case regexpTag:\n      return cloneRegExp(object);\n\n    case setTag:\n      return new Ctor;\n\n    case symbolTag:\n      return cloneSymbol(object);\n  }\n}\n\nmodule.exports = initCloneByTag;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_initCloneByTag.js?");

/***/ }),

/***/ "./node_modules/lodash/_parent.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_parent.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseGet = __webpack_require__(/*! ./_baseGet */ \"./node_modules/lodash/_baseGet.js\"),\n    baseSlice = __webpack_require__(/*! ./_baseSlice */ \"./node_modules/lodash/_baseSlice.js\");\n\n/**\n * Gets the parent value at `path` of `object`.\n *\n * @private\n * @param {Object} object The object to query.\n * @param {Array} path The path to get the parent value of.\n * @returns {*} Returns the parent value.\n */\nfunction parent(object, path) {\n  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));\n}\n\nmodule.exports = parent;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/_parent.js?");

/***/ }),

/***/ "./node_modules/lodash/cloneDeep.js":
/*!******************************************!*\
  !*** ./node_modules/lodash/cloneDeep.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseClone = __webpack_require__(/*! ./_baseClone */ \"./node_modules/lodash/_baseClone.js\");\n\n/** Used to compose bitmasks for cloning. */\nvar CLONE_DEEP_FLAG = 1,\n    CLONE_SYMBOLS_FLAG = 4;\n\n/**\n * This method is like `_.clone` except that it recursively clones `value`.\n *\n * @static\n * @memberOf _\n * @since 1.0.0\n * @category Lang\n * @param {*} value The value to recursively clone.\n * @returns {*} Returns the deep cloned value.\n * @see _.clone\n * @example\n *\n * var objects = [{ 'a': 1 }, { 'b': 2 }];\n *\n * var deep = _.cloneDeep(objects);\n * console.log(deep[0] === objects[0]);\n * // => false\n */\nfunction cloneDeep(value) {\n  return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);\n}\n\nmodule.exports = cloneDeep;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/cloneDeep.js?");

/***/ }),

/***/ "./node_modules/lodash/flatten.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/flatten.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseFlatten = __webpack_require__(/*! ./_baseFlatten */ \"./node_modules/lodash/_baseFlatten.js\");\n\n/**\n * Flattens `array` a single level deep.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Array\n * @param {Array} array The array to flatten.\n * @returns {Array} Returns the new flattened array.\n * @example\n *\n * _.flatten([1, [2, [3, [4]], 5]]);\n * // => [1, 2, [3, [4]], 5]\n */\nfunction flatten(array) {\n  var length = array == null ? 0 : array.length;\n  return length ? baseFlatten(array, 1) : [];\n}\n\nmodule.exports = flatten;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/flatten.js?");

/***/ }),

/***/ "./node_modules/lodash/has.js":
/*!************************************!*\
  !*** ./node_modules/lodash/has.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseHas = __webpack_require__(/*! ./_baseHas */ \"./node_modules/lodash/_baseHas.js\"),\n    hasPath = __webpack_require__(/*! ./_hasPath */ \"./node_modules/lodash/_hasPath.js\");\n\n/**\n * Checks if `path` is a direct property of `object`.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Object\n * @param {Object} object The object to query.\n * @param {Array|string} path The path to check.\n * @returns {boolean} Returns `true` if `path` exists, else `false`.\n * @example\n *\n * var object = { 'a': { 'b': 2 } };\n * var other = _.create({ 'a': _.create({ 'b': 2 }) });\n *\n * _.has(object, 'a');\n * // => true\n *\n * _.has(object, 'a.b');\n * // => true\n *\n * _.has(object, ['a', 'b']);\n * // => true\n *\n * _.has(other, 'a');\n * // => false\n */\nfunction has(object, path) {\n  return object != null && hasPath(object, path, baseHas);\n}\n\nmodule.exports = has;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/has.js?");

/***/ }),

/***/ "./node_modules/lodash/isMap.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/isMap.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsMap = __webpack_require__(/*! ./_baseIsMap */ \"./node_modules/lodash/_baseIsMap.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ \"./node_modules/lodash/_nodeUtil.js\");\n\n/* Node.js helper references. */\nvar nodeIsMap = nodeUtil && nodeUtil.isMap;\n\n/**\n * Checks if `value` is classified as a `Map` object.\n *\n * @static\n * @memberOf _\n * @since 4.3.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a map, else `false`.\n * @example\n *\n * _.isMap(new Map);\n * // => true\n *\n * _.isMap(new WeakMap);\n * // => false\n */\nvar isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;\n\nmodule.exports = isMap;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isMap.js?");

/***/ }),

/***/ "./node_modules/lodash/isSet.js":
/*!**************************************!*\
  !*** ./node_modules/lodash/isSet.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseIsSet = __webpack_require__(/*! ./_baseIsSet */ \"./node_modules/lodash/_baseIsSet.js\"),\n    baseUnary = __webpack_require__(/*! ./_baseUnary */ \"./node_modules/lodash/_baseUnary.js\"),\n    nodeUtil = __webpack_require__(/*! ./_nodeUtil */ \"./node_modules/lodash/_nodeUtil.js\");\n\n/* Node.js helper references. */\nvar nodeIsSet = nodeUtil && nodeUtil.isSet;\n\n/**\n * Checks if `value` is classified as a `Set` object.\n *\n * @static\n * @memberOf _\n * @since 4.3.0\n * @category Lang\n * @param {*} value The value to check.\n * @returns {boolean} Returns `true` if `value` is a set, else `false`.\n * @example\n *\n * _.isSet(new Set);\n * // => true\n *\n * _.isSet(new WeakSet);\n * // => false\n */\nvar isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;\n\nmodule.exports = isSet;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/isSet.js?");

/***/ }),

/***/ "./node_modules/lodash/last.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/last.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * Gets the last element of `array`.\n *\n * @static\n * @memberOf _\n * @since 0.1.0\n * @category Array\n * @param {Array} array The array to query.\n * @returns {*} Returns the last element of `array`.\n * @example\n *\n * _.last([1, 2, 3]);\n * // => 3\n */\nfunction last(array) {\n  var length = array == null ? 0 : array.length;\n  return length ? array[length - 1] : undefined;\n}\n\nmodule.exports = last;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/last.js?");

/***/ }),

/***/ "./node_modules/lodash/lodash.js":
false,

/***/ "./node_modules/lodash/omit.js":
/*!*************************************!*\
  !*** ./node_modules/lodash/omit.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var arrayMap = __webpack_require__(/*! ./_arrayMap */ \"./node_modules/lodash/_arrayMap.js\"),\n    baseClone = __webpack_require__(/*! ./_baseClone */ \"./node_modules/lodash/_baseClone.js\"),\n    baseUnset = __webpack_require__(/*! ./_baseUnset */ \"./node_modules/lodash/_baseUnset.js\"),\n    castPath = __webpack_require__(/*! ./_castPath */ \"./node_modules/lodash/_castPath.js\"),\n    copyObject = __webpack_require__(/*! ./_copyObject */ \"./node_modules/lodash/_copyObject.js\"),\n    customOmitClone = __webpack_require__(/*! ./_customOmitClone */ \"./node_modules/lodash/_customOmitClone.js\"),\n    flatRest = __webpack_require__(/*! ./_flatRest */ \"./node_modules/lodash/_flatRest.js\"),\n    getAllKeysIn = __webpack_require__(/*! ./_getAllKeysIn */ \"./node_modules/lodash/_getAllKeysIn.js\");\n\n/** Used to compose bitmasks for cloning. */\nvar CLONE_DEEP_FLAG = 1,\n    CLONE_FLAT_FLAG = 2,\n    CLONE_SYMBOLS_FLAG = 4;\n\n/**\n * The opposite of `_.pick`; this method creates an object composed of the\n * own and inherited enumerable property paths of `object` that are not omitted.\n *\n * **Note:** This method is considerably slower than `_.pick`.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Object\n * @param {Object} object The source object.\n * @param {...(string|string[])} [paths] The property paths to omit.\n * @returns {Object} Returns the new object.\n * @example\n *\n * var object = { 'a': 1, 'b': '2', 'c': 3 };\n *\n * _.omit(object, ['a', 'c']);\n * // => { 'b': '2' }\n */\nvar omit = flatRest(function(object, paths) {\n  var result = {};\n  if (object == null) {\n    return result;\n  }\n  var isDeep = false;\n  paths = arrayMap(paths, function(path) {\n    path = castPath(path, object);\n    isDeep || (isDeep = path.length > 1);\n    return path;\n  });\n  copyObject(object, getAllKeysIn(object), result);\n  if (isDeep) {\n    result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);\n  }\n  var length = paths.length;\n  while (length--) {\n    baseUnset(result, paths[length]);\n  }\n  return result;\n});\n\nmodule.exports = omit;\n\n\n//# sourceURL=webpack:///./node_modules/lodash/omit.js?");

/***/ }),

/***/ "./node_modules/table-resolver/dist/by-function.js":
/*!*********************************************************!*\
  !*** ./node_modules/table-resolver/dist/by-function.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _get2 = __webpack_require__(/*! lodash/get */ \"./node_modules/lodash/get.js\");\n\nvar _get3 = _interopRequireDefault(_get2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction byFunction(path) {\n  /* eslint no-param-reassign: \"off\" */\n\n  return function (_ref) {\n    var _ref$column = _ref.column,\n        column = _ref$column === undefined ? {} : _ref$column;\n    return function (rowData) {\n      var property = column.property;\n\n      var resolver = (0, _get3.default)(column, path);\n\n      if (!property || !resolver) {\n        return rowData;\n      }\n\n      var value = rowData[property];\n\n      rowData['_' + property] = resolver(value, {\n        property: property,\n        rowData: rowData\n      });\n\n      return rowData;\n    };\n  };\n}\n\nexports.default = byFunction;\n\n//# sourceURL=webpack:///./node_modules/table-resolver/dist/by-function.js?");

/***/ }),

/***/ "./node_modules/table-resolver/dist/column-children.js":
/*!*************************************************************!*\
  !*** ./node_modules/table-resolver/dist/column-children.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nfunction columnChildren(_ref) {\n  var columns = _ref.columns,\n      _ref$childrenField = _ref.childrenField,\n      childrenField = _ref$childrenField === undefined ? 'children' : _ref$childrenField;\n\n  if (!columns) {\n    throw new Error('resolve.columnChildren - Missing columns!');\n  }\n\n  var ret = [];\n\n  columns.forEach(function (column) {\n    // If a column has children, skip cell specific configuration\n    if (column[childrenField] && column[childrenField].length) {\n      ret = ret.concat(columnChildren({\n        columns: column[childrenField],\n        childrenField: childrenField\n      }));\n    } else {\n      ret.push(column);\n    }\n  });\n\n  return ret;\n}\n\nexports.default = columnChildren;\n\n//# sourceURL=webpack:///./node_modules/table-resolver/dist/column-children.js?");

/***/ }),

/***/ "./node_modules/table-resolver/dist/count-col-span.js":
/*!************************************************************!*\
  !*** ./node_modules/table-resolver/dist/count-col-span.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nfunction countColSpan(columns, returnCount) {\n  var count = returnCount;\n  if (columns && columns.length > 0) {\n    columns.forEach(function (column) {\n      if (column.children && column.children.length > 0) {\n        count = countColSpan(column.children, count);\n      } else {\n        count += 1;\n      }\n    });\n  }\n  return count;\n}\n\nexports.default = countColSpan;\n\n//# sourceURL=webpack:///./node_modules/table-resolver/dist/count-col-span.js?");

/***/ }),

/***/ "./node_modules/table-resolver/dist/count-row-span.js":
/*!************************************************************!*\
  !*** ./node_modules/table-resolver/dist/count-row-span.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nfunction countRowSpan(columns) {\n  var maximumCount = 0;\n\n  columns.forEach(function (column) {\n    if (column.children && column.children.length) {\n      maximumCount = Math.max(maximumCount, countRowSpan(column.children));\n    }\n  });\n\n  return maximumCount + 1;\n}\n\nexports.default = countRowSpan;\n\n//# sourceURL=webpack:///./node_modules/table-resolver/dist/count-row-span.js?");

/***/ }),

/***/ "./node_modules/table-resolver/dist/header-rows.js":
/*!*********************************************************!*\
  !*** ./node_modules/table-resolver/dist/header-rows.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _omit2 = __webpack_require__(/*! lodash/omit */ \"./node_modules/lodash/omit.js\");\n\nvar _omit3 = _interopRequireDefault(_omit2);\n\nvar _countRowSpan = __webpack_require__(/*! ./count-row-span */ \"./node_modules/table-resolver/dist/count-row-span.js\");\n\nvar _countRowSpan2 = _interopRequireDefault(_countRowSpan);\n\nvar _countColSpan = __webpack_require__(/*! ./count-col-span */ \"./node_modules/table-resolver/dist/count-col-span.js\");\n\nvar _countColSpan2 = _interopRequireDefault(_countColSpan);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nfunction _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }\n\nfunction resolveHeaderRows(_ref) {\n  var columns = _ref.columns,\n      _ref$childrenField = _ref.childrenField,\n      childrenField = _ref$childrenField === undefined ? 'children' : _ref$childrenField;\n\n  var resolvedChildren = [];\n\n  var ret = columns.map(function (column) {\n    var children = column[childrenField];\n    var col = (0, _omit3.default)(column, [childrenField]);\n\n    if (children && children.length) {\n      resolveHeaderRows({ columns: children, childrenField: childrenField }).forEach(function (cells, depth) {\n        resolvedChildren[depth] = [].concat(_toConsumableArray(resolvedChildren[depth] || []), _toConsumableArray(cells));\n      });\n\n      return Object.assign({}, col, {\n        props: Object.assign({\n          colSpan: (0, _countColSpan2.default)(children, 0)\n        }, col.props)\n      });\n    }\n\n    return Object.assign({}, col, {\n      props: Object.assign({\n        rowSpan: (0, _countRowSpan2.default)(columns)\n      }, col.props)\n    });\n  });\n\n  return resolvedChildren.length ? [ret].concat(resolvedChildren) : [ret];\n}\n\nexports.default = resolveHeaderRows;\n\n//# sourceURL=webpack:///./node_modules/table-resolver/dist/header-rows.js?");

/***/ }),

/***/ "./node_modules/table-resolver/dist/index.js":
/*!***************************************************!*\
  !*** ./node_modules/table-resolver/dist/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _resolve = __webpack_require__(/*! ./resolve */ \"./node_modules/table-resolver/dist/resolve.js\");\n\nObject.defineProperty(exports, 'resolve', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_resolve).default;\n  }\n});\n\nvar _nested = __webpack_require__(/*! ./nested */ \"./node_modules/table-resolver/dist/nested.js\");\n\nObject.defineProperty(exports, 'nested', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_nested).default;\n  }\n});\n\nvar _byFunction = __webpack_require__(/*! ./by-function */ \"./node_modules/table-resolver/dist/by-function.js\");\n\nObject.defineProperty(exports, 'byFunction', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_byFunction).default;\n  }\n});\n\nvar _countRowSpan = __webpack_require__(/*! ./count-row-span */ \"./node_modules/table-resolver/dist/count-row-span.js\");\n\nObject.defineProperty(exports, 'countRowSpan', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_countRowSpan).default;\n  }\n});\n\nvar _columnChildren = __webpack_require__(/*! ./column-children */ \"./node_modules/table-resolver/dist/column-children.js\");\n\nObject.defineProperty(exports, 'columnChildren', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_columnChildren).default;\n  }\n});\n\nvar _headerRows = __webpack_require__(/*! ./header-rows */ \"./node_modules/table-resolver/dist/header-rows.js\");\n\nObject.defineProperty(exports, 'headerRows', {\n  enumerable: true,\n  get: function get() {\n    return _interopRequireDefault(_headerRows).default;\n  }\n});\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//# sourceURL=webpack:///./node_modules/table-resolver/dist/index.js?");

/***/ }),

/***/ "./node_modules/table-resolver/dist/nested.js":
/*!****************************************************!*\
  !*** ./node_modules/table-resolver/dist/nested.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _isFunction2 = __webpack_require__(/*! lodash/isFunction */ \"./node_modules/lodash/isFunction.js\");\n\nvar _isFunction3 = _interopRequireDefault(_isFunction2);\n\nvar _has2 = __webpack_require__(/*! lodash/has */ \"./node_modules/lodash/has.js\");\n\nvar _has3 = _interopRequireDefault(_has2);\n\nvar _get2 = __webpack_require__(/*! lodash/get */ \"./node_modules/lodash/get.js\");\n\nvar _get3 = _interopRequireDefault(_get2);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar reIsPlainProp = /^\\w*$/;\n\nfunction nested(_ref) {\n  var column = _ref.column;\n\n  /* eslint no-param-reassign: \"off\" */\n\n  var property = column.property;\n\n\n  if (!property) {\n    return function (rowData) {\n      return rowData;\n    };\n  }\n\n  // if users provide a custom getter instead of a\n  // path for _.get, use that getter ...\n  if ((0, _isFunction3.default)(property)) {\n    // TODO: Function as key can't be right?\n    return function (rowData) {\n      rowData[property] = property(rowData);\n      return rowData;\n    };\n  }\n\n  // Make things simple if the property is simple.  No copy needed.\n  if (typeof property === 'string' && reIsPlainProp.test(property)) {\n    return function (rowData) {\n      return rowData;\n    };\n  }\n\n  return function (rowData) {\n    // ... otherwise, make sure property exists, then _.get it\n    if (!(0, _has3.default)(rowData, property)) {\n      return rowData;\n    }\n\n    rowData[property] = (0, _get3.default)(rowData, property);\n    return rowData;\n  };\n}\n\nexports.default = nested;\n\n//# sourceURL=webpack:///./node_modules/table-resolver/dist/nested.js?");

/***/ }),

/***/ "./node_modules/table-resolver/dist/resolve.js":
/*!*****************************************************!*\
  !*** ./node_modules/table-resolver/dist/resolve.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction resolve(_ref) {\n  var columns = _ref.columns,\n      _ref$method = _ref.method,\n      method = _ref$method === undefined ? function () {\n    return function (rowData) {\n      return rowData;\n    };\n  } : _ref$method,\n      _ref$indexKey = _ref.indexKey,\n      indexKey = _ref$indexKey === undefined ? '_index' : _ref$indexKey;\n\n  if (!columns) {\n    throw new Error('resolve - Missing columns!');\n  }\n\n  return function () {\n    var rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];\n\n    var methodsByColumn = columns.map(function (column) {\n      return method({ column: column });\n    });\n\n    return rows.map(function (rowData, rowIndex) {\n      var ret = _extends(_defineProperty({}, indexKey, rowIndex), rowData);\n\n      methodsByColumn.forEach(function (boundMethod) {\n        ret = boundMethod(ret);\n      });\n\n      return ret;\n    });\n  };\n}\n\nexports.default = resolve;\n\n//# sourceURL=webpack:///./node_modules/table-resolver/dist/resolve.js?");

/***/ })

})