"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/layout",{

/***/ "(app-pages-browser)/./app/globals.css":
/*!*************************!*\
  !*** ./app/globals.css ***!
  \*************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"4c91c947a74e\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9nbG9iYWxzLmNzcyIsIm1hcHBpbmdzIjoiO0FBQUEsK0RBQWUsY0FBYztBQUM3QixJQUFJLElBQVUsSUFBSSxpQkFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2dsb2JhbHMuY3NzPzQzYmYiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCI0YzkxYzk0N2E3NGVcIlxuaWYgKG1vZHVsZS5ob3QpIHsgbW9kdWxlLmhvdC5hY2NlcHQoKSB9XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./components/navigation.tsx":
/*!***********************************!*\
  !*** ./components/navigation.tsx ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Navigation: function() { return /* binding */ Navigation; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var _barrel_optimize_names_BookOpen_ChevronDown_Github_MessageCircle_Twitter_Users_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=BookOpen,ChevronDown,Github,MessageCircle,Twitter,Users!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/twitter.js\");\n/* harmony import */ var _barrel_optimize_names_BookOpen_ChevronDown_Github_MessageCircle_Twitter_Users_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=BookOpen,ChevronDown,Github,MessageCircle,Twitter,Users!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/message-circle.js\");\n/* harmony import */ var _barrel_optimize_names_BookOpen_ChevronDown_Github_MessageCircle_Twitter_Users_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=BookOpen,ChevronDown,Github,MessageCircle,Twitter,Users!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/users.js\");\n/* harmony import */ var _barrel_optimize_names_BookOpen_ChevronDown_Github_MessageCircle_Twitter_Users_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=BookOpen,ChevronDown,Github,MessageCircle,Twitter,Users!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/github.js\");\n/* harmony import */ var _barrel_optimize_names_BookOpen_ChevronDown_Github_MessageCircle_Twitter_Users_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! __barrel_optimize__?names=BookOpen,ChevronDown,Github,MessageCircle,Twitter,Users!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/book-open.js\");\n/* harmony import */ var _barrel_optimize_names_BookOpen_ChevronDown_Github_MessageCircle_Twitter_Users_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! __barrel_optimize__?names=BookOpen,ChevronDown,Github,MessageCircle,Twitter,Users!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/chevron-down.js\");\n/* harmony import */ var _contexts_wallet_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/contexts/wallet-context */ \"(app-pages-browser)/./contexts/wallet-context.tsx\");\n/* __next_internal_client_entry_do_not_use__ Navigation auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction Navigation() {\n    _s();\n    const { isConnected, connectWallet } = (0,_contexts_wallet_context__WEBPACK_IMPORTED_MODULE_3__.useWallet)();\n    const [isDropdownOpen, setIsDropdownOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const communityLinks = [\n        {\n            name: \"Twitter\",\n            href: \"https://twitter.com/yourproject\",\n            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BookOpen_ChevronDown_Github_MessageCircle_Twitter_Users_lucide_react__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                className: \"h-4 w-4\"\n            }, void 0, false, {\n                fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n                lineNumber: 16,\n                columnNumber: 13\n            }, this)\n        },\n        {\n            name: \"Telegram\",\n            href: \"https://t.me/yourproject\",\n            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BookOpen_ChevronDown_Github_MessageCircle_Twitter_Users_lucide_react__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                className: \"h-4 w-4\"\n            }, void 0, false, {\n                fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n                lineNumber: 21,\n                columnNumber: 13\n            }, this)\n        },\n        {\n            name: \"Discord\",\n            href: \"https://discord.gg/yourproject\",\n            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BookOpen_ChevronDown_Github_MessageCircle_Twitter_Users_lucide_react__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                className: \"h-4 w-4\"\n            }, void 0, false, {\n                fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n                lineNumber: 26,\n                columnNumber: 13\n            }, this)\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n        className: \"py-6\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"flex items-center justify-between\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                    href: \"/\",\n                    className: \"text-xl font-bold text-white\",\n                    children: \"DeAI Platform\"\n                }, void 0, false, {\n                    fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n                    lineNumber: 34,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"flex items-center gap-6\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                            href: \"https://github.com/yourusername/your-repo\",\n                            target: \"_blank\",\n                            rel: \"noopener noreferrer\",\n                            className: \"flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BookOpen_ChevronDown_Github_MessageCircle_Twitter_Users_lucide_react__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                                    className: \"h-4 w-4\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n                                    lineNumber: 47,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    className: \"hidden sm:inline\",\n                                    children: \"GitHub\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n                                    lineNumber: 48,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n                            lineNumber: 41,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                            href: \"https://docs.yourproject.com\",\n                            target: \"_blank\",\n                            rel: \"noopener noreferrer\",\n                            className: \"flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BookOpen_ChevronDown_Github_MessageCircle_Twitter_Users_lucide_react__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                                    className: \"h-4 w-4\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n                                    lineNumber: 58,\n                                    columnNumber: 13\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    className: \"hidden sm:inline\",\n                                    children: \"Docs\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n                                    lineNumber: 59,\n                                    columnNumber: 13\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n                            lineNumber: 52,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"relative\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    onClick: ()=>setIsDropdownOpen(!isDropdownOpen),\n                                    className: \"flex items-center gap-1 text-sm text-gray-300 hover:text-white transition-colors\",\n                                    children: [\n                                        \"Community\",\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BookOpen_ChevronDown_Github_MessageCircle_Twitter_Users_lucide_react__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                                            className: \"h-4 w-4 transition-transform \".concat(isDropdownOpen ? \"rotate-180\" : \"\")\n                                        }, void 0, false, {\n                                            fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n                                            lineNumber: 69,\n                                            columnNumber: 15\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n                                    lineNumber: 64,\n                                    columnNumber: 13\n                                }, this),\n                                isDropdownOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"absolute right-0 mt-2 w-48 rounded-md bg-black/90 backdrop-blur-lg border border-white/10 shadow-lg py-1\",\n                                    children: communityLinks.map((link)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"a\", {\n                                            href: link.href,\n                                            target: \"_blank\",\n                                            rel: \"noopener noreferrer\",\n                                            className: \"flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors\",\n                                            children: [\n                                                link.icon,\n                                                link.name\n                                            ]\n                                        }, link.name, true, {\n                                            fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n                                            lineNumber: 76,\n                                            columnNumber: 19\n                                        }, this))\n                                }, void 0, false, {\n                                    fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n                                    lineNumber: 74,\n                                    columnNumber: 15\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n                            lineNumber: 63,\n                            columnNumber: 11\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            onClick: connectWallet,\n                            className: \"\\n              rounded-full px-4 py-2 text-sm font-medium transition-all\\n              \".concat(isConnected ? \"bg-success/10 text-success border border-success/20\" : \"bg-white text-black hover:bg-white/90\", \"\\n            \"),\n                            children: isConnected ? \"Connected\" : \"Connect Wallet\"\n                        }, void 0, false, {\n                            fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n                            lineNumber: 92,\n                            columnNumber: 11\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n                    lineNumber: 39,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n            lineNumber: 32,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/navigation.tsx\",\n        lineNumber: 31,\n        columnNumber: 5\n    }, this);\n}\n_s(Navigation, \"L75HjIY5Q9Uhy9nXlbO5YMOVJnk=\", false, function() {\n    return [\n        _contexts_wallet_context__WEBPACK_IMPORTED_MODULE_3__.useWallet\n    ];\n});\n_c = Navigation;\nvar _c;\n$RefreshReg$(_c, \"Navigation\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvbmF2aWdhdGlvbi50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZ0M7QUFDSjtBQUMrRDtBQUN0QztBQUU5QyxTQUFTUzs7SUFDZCxNQUFNLEVBQUVDLFdBQVcsRUFBRUMsYUFBYSxFQUFFLEdBQUdILG1FQUFTQTtJQUNoRCxNQUFNLENBQUNJLGdCQUFnQkMsa0JBQWtCLEdBQUdiLCtDQUFRQSxDQUFDO0lBRXJELE1BQU1jLGlCQUFpQjtRQUNyQjtZQUNFQyxNQUFNO1lBQ05DLE1BQU07WUFDTkMsb0JBQU0sOERBQUNkLG1JQUFPQTtnQkFBQ2UsV0FBVTs7Ozs7O1FBQzNCO1FBQ0E7WUFDRUgsTUFBTTtZQUNOQyxNQUFNO1lBQ05DLG9CQUFNLDhEQUFDYixtSUFBYUE7Z0JBQUNjLFdBQVU7Ozs7OztRQUNqQztRQUNBO1lBQ0VILE1BQU07WUFDTkMsTUFBTTtZQUNOQyxvQkFBTSw4REFBQ1osbUlBQUtBO2dCQUFDYSxXQUFVOzs7Ozs7UUFDekI7S0FDRDtJQUVELHFCQUNFLDhEQUFDQztRQUFJRCxXQUFVO2tCQUNiLDRFQUFDRTtZQUFJRixXQUFVOzs4QkFFYiw4REFBQ2pCLGlEQUFJQTtvQkFBQ2UsTUFBSztvQkFBSUUsV0FBVTs4QkFBK0I7Ozs7Ozs4QkFLeEQsOERBQUNFO29CQUFJRixXQUFVOztzQ0FFYiw4REFBQ0c7NEJBQ0NMLE1BQUs7NEJBQ0xNLFFBQU87NEJBQ1BDLEtBQUk7NEJBQ0pMLFdBQVU7OzhDQUVWLDhEQUFDWixtSUFBTUE7b0NBQUNZLFdBQVU7Ozs7Ozs4Q0FDbEIsOERBQUNNO29DQUFLTixXQUFVOzhDQUFtQjs7Ozs7Ozs7Ozs7O3NDQUlyQyw4REFBQ0c7NEJBQ0NMLE1BQUs7NEJBQ0xNLFFBQU87NEJBQ1BDLEtBQUk7NEJBQ0pMLFdBQVU7OzhDQUVWLDhEQUFDWCxtSUFBUUE7b0NBQUNXLFdBQVU7Ozs7Ozs4Q0FDcEIsOERBQUNNO29DQUFLTixXQUFVOzhDQUFtQjs7Ozs7Ozs7Ozs7O3NDQUlyQyw4REFBQ0U7NEJBQUlGLFdBQVU7OzhDQUNiLDhEQUFDTztvQ0FDQ0MsU0FBUyxJQUFNYixrQkFBa0IsQ0FBQ0Q7b0NBQ2xDTSxXQUFVOzt3Q0FDWDtzREFFQyw4REFBQ2hCLG1JQUFXQTs0Q0FBQ2dCLFdBQVcsZ0NBQW1FLE9BQW5DTixpQkFBaUIsZUFBZTs7Ozs7Ozs7Ozs7O2dDQUl6RkEsZ0NBQ0MsOERBQUNRO29DQUFJRixXQUFVOzhDQUNaSixlQUFlYSxHQUFHLENBQUMsQ0FBQ0MscUJBQ25CLDhEQUFDUDs0Q0FFQ0wsTUFBTVksS0FBS1osSUFBSTs0Q0FDZk0sUUFBTzs0Q0FDUEMsS0FBSTs0Q0FDSkwsV0FBVTs7Z0RBRVRVLEtBQUtYLElBQUk7Z0RBQ1RXLEtBQUtiLElBQUk7OzJDQVBMYSxLQUFLYixJQUFJOzs7Ozs7Ozs7Ozs7Ozs7O3NDQWV4Qiw4REFBQ1U7NEJBQ0NDLFNBQVNmOzRCQUNUTyxXQUFXLDRGQUtSLE9BSENSLGNBQ0Usd0RBQ0EseUNBQ0g7c0NBR0ZBLGNBQWMsY0FBYzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNekM7R0FwR2dCRDs7UUFDeUJELCtEQUFTQTs7O0tBRGxDQyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9jb21wb25lbnRzL25hdmlnYXRpb24udHN4P2VkZGEiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2UgY2xpZW50XCJcblxuaW1wb3J0IHsgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIlxuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiXG5pbXBvcnQgeyBDaGV2cm9uRG93biwgVHdpdHRlciwgTWVzc2FnZUNpcmNsZSwgVXNlcnMsIEdpdGh1YiwgQm9va09wZW4gfSBmcm9tIFwibHVjaWRlLXJlYWN0XCJcbmltcG9ydCB7IHVzZVdhbGxldCB9IGZyb20gXCJAL2NvbnRleHRzL3dhbGxldC1jb250ZXh0XCJcblxuZXhwb3J0IGZ1bmN0aW9uIE5hdmlnYXRpb24oKSB7XG4gIGNvbnN0IHsgaXNDb25uZWN0ZWQsIGNvbm5lY3RXYWxsZXQgfSA9IHVzZVdhbGxldCgpXG4gIGNvbnN0IFtpc0Ryb3Bkb3duT3Blbiwgc2V0SXNEcm9wZG93bk9wZW5dID0gdXNlU3RhdGUoZmFsc2UpXG5cbiAgY29uc3QgY29tbXVuaXR5TGlua3MgPSBbXG4gICAge1xuICAgICAgbmFtZTogXCJUd2l0dGVyXCIsXG4gICAgICBocmVmOiBcImh0dHBzOi8vdHdpdHRlci5jb20veW91cnByb2plY3RcIixcbiAgICAgIGljb246IDxUd2l0dGVyIGNsYXNzTmFtZT1cImgtNCB3LTRcIiAvPlxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogXCJUZWxlZ3JhbVwiLFxuICAgICAgaHJlZjogXCJodHRwczovL3QubWUveW91cnByb2plY3RcIixcbiAgICAgIGljb246IDxNZXNzYWdlQ2lyY2xlIGNsYXNzTmFtZT1cImgtNCB3LTRcIiAvPlxuICAgIH0sXG4gICAge1xuICAgICAgbmFtZTogXCJEaXNjb3JkXCIsXG4gICAgICBocmVmOiBcImh0dHBzOi8vZGlzY29yZC5nZy95b3VycHJvamVjdFwiLFxuICAgICAgaWNvbjogPFVzZXJzIGNsYXNzTmFtZT1cImgtNCB3LTRcIiAvPlxuICAgIH1cbiAgXVxuXG4gIHJldHVybiAoXG4gICAgPG5hdiBjbGFzc05hbWU9XCJweS02XCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktYmV0d2VlblwiPlxuICAgICAgICB7LyogTG9nby9CcmFuZCAqL31cbiAgICAgICAgPExpbmsgaHJlZj1cIi9cIiBjbGFzc05hbWU9XCJ0ZXh0LXhsIGZvbnQtYm9sZCB0ZXh0LXdoaXRlXCI+XG4gICAgICAgICAgRGVBSSBQbGF0Zm9ybVxuICAgICAgICA8L0xpbms+XG5cbiAgICAgICAgey8qIE5hdmlnYXRpb24gSXRlbXMgKi99XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTZcIj5cbiAgICAgICAgICB7LyogR2l0SHViIExpbmsgKi99XG4gICAgICAgICAgPGFcbiAgICAgICAgICAgIGhyZWY9XCJodHRwczovL2dpdGh1Yi5jb20veW91cnVzZXJuYW1lL3lvdXItcmVwb1wiXG4gICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiB0ZXh0LXNtIHRleHQtZ3JheS0zMDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPEdpdGh1YiBjbGFzc05hbWU9XCJoLTQgdy00XCIgLz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZGRlbiBzbTppbmxpbmVcIj5HaXRIdWI8L3NwYW4+XG4gICAgICAgICAgPC9hPlxuXG4gICAgICAgICAgey8qIERvY3MgTGluayAqL31cbiAgICAgICAgICA8YVxuICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZG9jcy55b3VycHJvamVjdC5jb21cIlxuICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgdGV4dC1zbSB0ZXh0LWdyYXktMzAwIGhvdmVyOnRleHQtd2hpdGUgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxCb29rT3BlbiBjbGFzc05hbWU9XCJoLTQgdy00XCIgLz5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImhpZGRlbiBzbTppbmxpbmVcIj5Eb2NzPC9zcGFuPlxuICAgICAgICAgIDwvYT5cblxuICAgICAgICAgIHsvKiBDb21tdW5pdHkgRHJvcGRvd24gKi99XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWxhdGl2ZVwiPlxuICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc0Ryb3Bkb3duT3BlbighaXNEcm9wZG93bk9wZW4pfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMSB0ZXh0LXNtIHRleHQtZ3JheS0zMDAgaG92ZXI6dGV4dC13aGl0ZSB0cmFuc2l0aW9uLWNvbG9yc1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIENvbW11bml0eVxuICAgICAgICAgICAgICA8Q2hldnJvbkRvd24gY2xhc3NOYW1lPXtgaC00IHctNCB0cmFuc2l0aW9uLXRyYW5zZm9ybSAke2lzRHJvcGRvd25PcGVuID8gJ3JvdGF0ZS0xODAnIDogJyd9YH0gLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuXG4gICAgICAgICAgICB7LyogRHJvcGRvd24gTWVudSAqL31cbiAgICAgICAgICAgIHtpc0Ryb3Bkb3duT3BlbiAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiYWJzb2x1dGUgcmlnaHQtMCBtdC0yIHctNDggcm91bmRlZC1tZCBiZy1ibGFjay85MCBiYWNrZHJvcC1ibHVyLWxnIGJvcmRlciBib3JkZXItd2hpdGUvMTAgc2hhZG93LWxnIHB5LTFcIj5cbiAgICAgICAgICAgICAgICB7Y29tbXVuaXR5TGlua3MubWFwKChsaW5rKSA9PiAoXG4gICAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2xpbmsubmFtZX1cbiAgICAgICAgICAgICAgICAgICAgaHJlZj17bGluay5ocmVmfVxuICAgICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgICAgICAgICByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiZmxleCBpdGVtcy1jZW50ZXIgZ2FwLTIgcHgtNCBweS0yIHRleHQtc20gdGV4dC1ncmF5LTMwMCBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXdoaXRlLzUgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7bGluay5pY29ufVxuICAgICAgICAgICAgICAgICAgICB7bGluay5uYW1lfVxuICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICB7LyogQ29ubmVjdCBXYWxsZXQgQnV0dG9uICovfVxuICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgIG9uQ2xpY2s9e2Nvbm5lY3RXYWxsZXR9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2BcbiAgICAgICAgICAgICAgcm91bmRlZC1mdWxsIHB4LTQgcHktMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRyYW5zaXRpb24tYWxsXG4gICAgICAgICAgICAgICR7aXNDb25uZWN0ZWQgXG4gICAgICAgICAgICAgICAgPyAnYmctc3VjY2Vzcy8xMCB0ZXh0LXN1Y2Nlc3MgYm9yZGVyIGJvcmRlci1zdWNjZXNzLzIwJyBcbiAgICAgICAgICAgICAgICA6ICdiZy13aGl0ZSB0ZXh0LWJsYWNrIGhvdmVyOmJnLXdoaXRlLzkwJ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICBgfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpc0Nvbm5lY3RlZCA/ICdDb25uZWN0ZWQnIDogJ0Nvbm5lY3QgV2FsbGV0J31cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L25hdj5cbiAgKVxufSAiXSwibmFtZXMiOlsidXNlU3RhdGUiLCJMaW5rIiwiQ2hldnJvbkRvd24iLCJUd2l0dGVyIiwiTWVzc2FnZUNpcmNsZSIsIlVzZXJzIiwiR2l0aHViIiwiQm9va09wZW4iLCJ1c2VXYWxsZXQiLCJOYXZpZ2F0aW9uIiwiaXNDb25uZWN0ZWQiLCJjb25uZWN0V2FsbGV0IiwiaXNEcm9wZG93bk9wZW4iLCJzZXRJc0Ryb3Bkb3duT3BlbiIsImNvbW11bml0eUxpbmtzIiwibmFtZSIsImhyZWYiLCJpY29uIiwiY2xhc3NOYW1lIiwibmF2IiwiZGl2IiwiYSIsInRhcmdldCIsInJlbCIsInNwYW4iLCJidXR0b24iLCJvbkNsaWNrIiwibWFwIiwibGluayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/navigation.tsx\n"));

/***/ })

});