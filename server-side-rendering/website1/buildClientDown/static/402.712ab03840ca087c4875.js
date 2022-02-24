"use strict";
(self["__LOADABLE_LOADED_CHUNKS__"] = self["__LOADABLE_LOADED_CHUNKS__"] || []).push([[402,963],{

/***/ 2777:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1887);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(259);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7209);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3409);
/* harmony import */ var _components_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("webpack/container/remote/website1/App");





var root = document.getElementById("root");
react_dom__WEBPACK_IMPORTED_MODULE_1___default().hydrate( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_hot_loader__WEBPACK_IMPORTED_MODULE_3__/* .AppContainer */ .zj, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_4__/* .BrowserRouter */ .VK, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_App__WEBPACK_IMPORTED_MODULE_2__["default"], null))), root);

/***/ }),

/***/ "webpack/container/remote/website1/App":
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1887);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _loadable_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6911);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1740);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3409);


 // eslint-disable-next-line

var Website2App = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)({
  resolved: {},
  chunkName: function chunkName() {
    return "website2-App";
  },
  isReady: function isReady(props) {
    var key = this.resolve(props);

    if (this.resolved[key] !== true) {
      return false;
    }

    if (true) {
      return !!__webpack_require__.m[key];
    }

    return false;
  },
  importAsync: function importAsync() {
    return __webpack_require__.e(/* import() | website2-App */ 588).then(__webpack_require__.t.bind(__webpack_require__, 7256, 23));
  },
  requireAsync: function requireAsync(props) {
    var _this = this;

    var key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(function (resolved) {
      _this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync: function requireSync(props) {
    var id = this.resolve(props);

    if (true) {
      return __webpack_require__(id);
    }

    return eval('module.require')(id);
  },
  resolve: function resolve() {
    if (true) {
      return /*require.resolve*/(7256);
    }

    return eval('require.resolve')("website2/App");
  }
}, {
  ssr: false
});
var Button = (0,_loadable_component__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .ZP)({
  resolved: {},
  chunkName: function chunkName() {
    return "storybook-Button";
  },
  isReady: function isReady(props) {
    var key = this.resolve(props);

    if (this.resolved[key] !== true) {
      return false;
    }

    if (true) {
      return !!__webpack_require__.m[key];
    }

    return false;
  },
  importAsync: function importAsync() {
    return __webpack_require__.e(/* import() | storybook-Button */ 109).then(__webpack_require__.t.bind(__webpack_require__, 1965, 23));
  },
  requireAsync: function requireAsync(props) {
    var _this = this;

    var key = this.resolve(props);
    this.resolved[key] = false;
    return this.importAsync(props).then(function (resolved) {
      _this.resolved[key] = true;
      return resolved;
    });
  },
  requireSync: function requireSync(props) {
    var id = this.resolve(props);

    if (true) {
      return __webpack_require__(id);
    }

    return eval('module.require')(id);
  },
  resolve: function resolve() {
    if (true) {
      return /*require.resolve*/(1965);
    }

    return eval('require.resolve')("storybook/Button");
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__/* .Routes */ .Z5, null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__/* .Route */ .AW, {
    path: "/",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Home, null)
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_2__/* .Route */ .AW, {
    path: "website2",
    element: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Website2App, null)
  })));
}); // App.js

function Home() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("main", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("h1", {
    onClick: function onClick() {
      return alert("website1 is interactive");
    }
  }, "This is website 1"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(Button, {
    name: "Hi Bin"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("nav", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__/* .Link */ .rU, {
    to: "/website2"
  }, "website2")));
}

/***/ })

}]);
//# sourceMappingURL=402.712ab03840ca087c4875.js.map