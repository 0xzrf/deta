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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (\"ef4efd7ae032\");\nif (true) { module.hot.accept() }\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2FwcC9nbG9iYWxzLmNzcyIsIm1hcHBpbmdzIjoiO0FBQUEsK0RBQWUsY0FBYztBQUM3QixJQUFJLElBQVUsSUFBSSxpQkFBaUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vYXBwL2dsb2JhbHMuY3NzPzQzYmYiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgXCJlZjRlZmQ3YWUwMzJcIlxuaWYgKG1vZHVsZS5ob3QpIHsgbW9kdWxlLmhvdC5hY2NlcHQoKSB9XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./app/globals.css\n"));

/***/ }),

/***/ "(app-pages-browser)/./components/profile-dropdown.tsx":
/*!*****************************************!*\
  !*** ./components/profile-dropdown.tsx ***!
  \*****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ProfileDropdown: function() { return /* binding */ ProfileDropdown; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var _barrel_optimize_names_BarChart3_BookOpen_GraduationCap_MessageSquareText_TrendingUp_User_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! __barrel_optimize__?names=BarChart3,BookOpen,GraduationCap,MessageSquareText,TrendingUp,User,Wallet!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/message-square-text.js\");\n/* harmony import */ var _barrel_optimize_names_BarChart3_BookOpen_GraduationCap_MessageSquareText_TrendingUp_User_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=BarChart3,BookOpen,GraduationCap,MessageSquareText,TrendingUp,User,Wallet!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/trending-up.js\");\n/* harmony import */ var _barrel_optimize_names_BarChart3_BookOpen_GraduationCap_MessageSquareText_TrendingUp_User_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=BarChart3,BookOpen,GraduationCap,MessageSquareText,TrendingUp,User,Wallet!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/chart-column.js\");\n/* harmony import */ var _barrel_optimize_names_BarChart3_BookOpen_GraduationCap_MessageSquareText_TrendingUp_User_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=BarChart3,BookOpen,GraduationCap,MessageSquareText,TrendingUp,User,Wallet!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/graduation-cap.js\");\n/* harmony import */ var _barrel_optimize_names_BarChart3_BookOpen_GraduationCap_MessageSquareText_TrendingUp_User_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! __barrel_optimize__?names=BarChart3,BookOpen,GraduationCap,MessageSquareText,TrendingUp,User,Wallet!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/book-open.js\");\n/* harmony import */ var _barrel_optimize_names_BarChart3_BookOpen_GraduationCap_MessageSquareText_TrendingUp_User_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! __barrel_optimize__?names=BarChart3,BookOpen,GraduationCap,MessageSquareText,TrendingUp,User,Wallet!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/wallet.js\");\n/* harmony import */ var _barrel_optimize_names_BarChart3_BookOpen_GraduationCap_MessageSquareText_TrendingUp_User_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! __barrel_optimize__?names=BarChart3,BookOpen,GraduationCap,MessageSquareText,TrendingUp,User,Wallet!=!lucide-react */ \"(app-pages-browser)/./node_modules/lucide-react/dist/esm/icons/user.js\");\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs\");\n/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! framer-motion */ \"(app-pages-browser)/./node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs\");\n/* harmony import */ var _contexts_wallet_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/contexts/wallet-context */ \"(app-pages-browser)/./contexts/wallet-context.tsx\");\n/* __next_internal_client_entry_do_not_use__ ProfileDropdown auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nfunction ProfileDropdown() {\n    var _wallet_publicKey, _wallet_publicKey1;\n    _s();\n    const [isOpen, setIsOpen] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const { wallet } = (0,_contexts_wallet_context__WEBPACK_IMPORTED_MODULE_3__.useWallet)();\n    const menuItems = [\n        {\n            name: \"Contribute\",\n            href: \"/dashboard?tab=contribute\",\n            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BarChart3_BookOpen_GraduationCap_MessageSquareText_TrendingUp_User_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                className: \"h-4 w-4\"\n            }, void 0, false, {\n                fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/profile-dropdown.tsx\",\n                lineNumber: 17,\n                columnNumber: 13\n            }, this)\n        },\n        {\n            name: \"Your Performance\",\n            href: \"/dashboard?tab=performance\",\n            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BarChart3_BookOpen_GraduationCap_MessageSquareText_TrendingUp_User_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                className: \"h-4 w-4\"\n            }, void 0, false, {\n                fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/profile-dropdown.tsx\",\n                lineNumber: 22,\n                columnNumber: 13\n            }, this)\n        },\n        {\n            name: \"Analytics & Progress\",\n            href: \"/analytics\",\n            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BarChart3_BookOpen_GraduationCap_MessageSquareText_TrendingUp_User_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                className: \"h-4 w-4\"\n            }, void 0, false, {\n                fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/profile-dropdown.tsx\",\n                lineNumber: 27,\n                columnNumber: 13\n            }, this)\n        },\n        {\n            name: \"Tutorial\",\n            href: \"/tutorial\",\n            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BarChart3_BookOpen_GraduationCap_MessageSquareText_TrendingUp_User_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                className: \"h-4 w-4\"\n            }, void 0, false, {\n                fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/profile-dropdown.tsx\",\n                lineNumber: 32,\n                columnNumber: 13\n            }, this)\n        },\n        {\n            name: \"Docs\",\n            href: \"/docs\",\n            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BarChart3_BookOpen_GraduationCap_MessageSquareText_TrendingUp_User_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                className: \"h-4 w-4\"\n            }, void 0, false, {\n                fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/profile-dropdown.tsx\",\n                lineNumber: 37,\n                columnNumber: 13\n            }, this)\n        },\n        {\n            name: \"Buy $DeTA\",\n            href: \"/swap\",\n            icon: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BarChart3_BookOpen_GraduationCap_MessageSquareText_TrendingUp_User_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                className: \"h-4 w-4\"\n            }, void 0, false, {\n                fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/profile-dropdown.tsx\",\n                lineNumber: 42,\n                columnNumber: 13\n            }, this)\n        }\n    ];\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex items-center gap-4\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"text-sm text-gray-400\",\n                children: \"\".concat(wallet === null || wallet === void 0 ? void 0 : (_wallet_publicKey = wallet.publicKey) === null || _wallet_publicKey === void 0 ? void 0 : _wallet_publicKey.toString().slice(0, 4), \"...\").concat(wallet === null || wallet === void 0 ? void 0 : (_wallet_publicKey1 = wallet.publicKey) === null || _wallet_publicKey1 === void 0 ? void 0 : _wallet_publicKey1.toString().slice(-3))\n            }, void 0, false, {\n                fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/profile-dropdown.tsx\",\n                lineNumber: 49,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"relative\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: ()=>setIsOpen(!isOpen),\n                        className: \"text-gray-300 hover:text-white transition-colors\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"h-8 w-8 rounded-full bg-[#00FF95]/10 flex items-center justify-center border border-[#00FF95]/20\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_BarChart3_BookOpen_GraduationCap_MessageSquareText_TrendingUp_User_Wallet_lucide_react__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n                                className: \"h-4 w-4 text-[#00FF95]\"\n                            }, void 0, false, {\n                                fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/profile-dropdown.tsx\",\n                                lineNumber: 60,\n                                columnNumber: 13\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/profile-dropdown.tsx\",\n                            lineNumber: 59,\n                            columnNumber: 11\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/profile-dropdown.tsx\",\n                        lineNumber: 55,\n                        columnNumber: 9\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_11__.AnimatePresence, {\n                        children: isOpen && /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(framer_motion__WEBPACK_IMPORTED_MODULE_12__.motion.div, {\n                            initial: {\n                                opacity: 0,\n                                y: -10\n                            },\n                            animate: {\n                                opacity: 1,\n                                y: 0\n                            },\n                            exit: {\n                                opacity: 0,\n                                y: -10\n                            },\n                            className: \"absolute right-0 mt-2 w-48 rounded-lg bg-black/90 backdrop-blur-lg  border border-white/10 shadow-lg py-1 z-50\",\n                            children: menuItems.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                                    href: item.href,\n                                    className: \"flex items-center gap-2 px-4 py-2 text-sm text-gray-300  hover:text-white hover:bg-white/5 transition-colors\",\n                                    onClick: ()=>setIsOpen(false),\n                                    children: [\n                                        item.icon,\n                                        item.name\n                                    ]\n                                }, item.name, true, {\n                                    fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/profile-dropdown.tsx\",\n                                    lineNumber: 74,\n                                    columnNumber: 17\n                                }, this))\n                        }, void 0, false, {\n                            fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/profile-dropdown.tsx\",\n                            lineNumber: 66,\n                            columnNumber: 13\n                        }, this)\n                    }, void 0, false, {\n                        fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/profile-dropdown.tsx\",\n                        lineNumber: 64,\n                        columnNumber: 9\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/profile-dropdown.tsx\",\n                lineNumber: 54,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/khushmansancheti/Desktop/work in progress/Deta/deta-app/components/profile-dropdown.tsx\",\n        lineNumber: 47,\n        columnNumber: 5\n    }, this);\n}\n_s(ProfileDropdown, \"mLKlZz2cZLf7iyPSNYP7m6z+vXw=\", false, function() {\n    return [\n        _contexts_wallet_context__WEBPACK_IMPORTED_MODULE_3__.useWallet\n    ];\n});\n_c = ProfileDropdown;\nvar _c;\n$RefreshReg$(_c, \"ProfileDropdown\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL2NvbXBvbmVudHMvcHJvZmlsZS1kcm9wZG93bi50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFZ0M7QUFDSjtBQUMrRjtBQUNwRTtBQUNGO0FBRTlDLFNBQVNZO1FBeUNKQyxtQkFBK0NBOztJQXhDekQsTUFBTSxDQUFDQyxRQUFRQyxVQUFVLEdBQUdmLCtDQUFRQSxDQUFDO0lBQ3JDLE1BQU0sRUFBRWEsTUFBTSxFQUFFLEdBQUdGLG1FQUFTQTtJQUU1QixNQUFNSyxZQUFZO1FBQ2hCO1lBQ0VDLE1BQU07WUFDTkMsTUFBTTtZQUNOQyxvQkFBTSw4REFBQ2YscUpBQWlCQTtnQkFBQ2dCLFdBQVU7Ozs7OztRQUNyQztRQUNBO1lBQ0VILE1BQU07WUFDTkMsTUFBTTtZQUNOQyxvQkFBTSw4REFBQ2QscUpBQVVBO2dCQUFDZSxXQUFVOzs7Ozs7UUFDOUI7UUFDQTtZQUNFSCxNQUFNO1lBQ05DLE1BQU07WUFDTkMsb0JBQU0sOERBQUNiLHFKQUFTQTtnQkFBQ2MsV0FBVTs7Ozs7O1FBQzdCO1FBQ0E7WUFDRUgsTUFBTTtZQUNOQyxNQUFNO1lBQ05DLG9CQUFNLDhEQUFDaEIscUpBQWFBO2dCQUFDaUIsV0FBVTs7Ozs7O1FBQ2pDO1FBQ0E7WUFDRUgsTUFBTTtZQUNOQyxNQUFNO1lBQ05DLG9CQUFNLDhEQUFDakIscUpBQVFBO2dCQUFDa0IsV0FBVTs7Ozs7O1FBQzVCO1FBQ0E7WUFDRUgsTUFBTTtZQUNOQyxNQUFNO1lBQ05DLG9CQUFNLDhEQUFDWixxSkFBTUE7Z0JBQUNhLFdBQVU7Ozs7OztRQUMxQjtLQUNEO0lBRUQscUJBQ0UsOERBQUNDO1FBQUlELFdBQVU7OzBCQUViLDhEQUFDQztnQkFBSUQsV0FBVTswQkFDWixVQUFHUCxtQkFBQUEsOEJBQUFBLG9CQUFBQSxPQUFRUyxTQUFTLGNBQWpCVCx3Q0FBQUEsa0JBQW1CVSxRQUFRLEdBQUdDLEtBQUssQ0FBQyxHQUFHLElBQUcsT0FBNkMsT0FBeENYLG1CQUFBQSw4QkFBQUEscUJBQUFBLE9BQVFTLFNBQVMsY0FBakJULHlDQUFBQSxtQkFBbUJVLFFBQVEsR0FBR0MsS0FBSyxDQUFDLENBQUM7Ozs7OzswQkFJMUYsOERBQUNIO2dCQUFJRCxXQUFVOztrQ0FDYiw4REFBQ0s7d0JBQ0NDLFNBQVMsSUFBTVgsVUFBVSxDQUFDRDt3QkFDMUJNLFdBQVU7a0NBRVYsNEVBQUNDOzRCQUFJRCxXQUFVO3NDQUNiLDRFQUFDWixzSkFBSUE7Z0NBQUNZLFdBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7a0NBSXBCLDhEQUFDViwyREFBZUE7a0NBQ2JJLHdCQUNDLDhEQUFDTCxrREFBTUEsQ0FBQ1ksR0FBRzs0QkFDVE0sU0FBUztnQ0FBRUMsU0FBUztnQ0FBR0MsR0FBRyxDQUFDOzRCQUFHOzRCQUM5QkMsU0FBUztnQ0FBRUYsU0FBUztnQ0FBR0MsR0FBRzs0QkFBRTs0QkFDNUJFLE1BQU07Z0NBQUVILFNBQVM7Z0NBQUdDLEdBQUcsQ0FBQzs0QkFBRzs0QkFDM0JULFdBQVU7c0NBR1RKLFVBQVVnQixHQUFHLENBQUMsQ0FBQ0MscUJBQ2QsOERBQUNoQyxpREFBSUE7b0NBRUhpQixNQUFNZSxLQUFLZixJQUFJO29DQUNmRSxXQUFVO29DQUVWTSxTQUFTLElBQU1YLFVBQVU7O3dDQUV4QmtCLEtBQUtkLElBQUk7d0NBQ1RjLEtBQUtoQixJQUFJOzttQ0FQTGdCLEtBQUtoQixJQUFJOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQmhDO0dBbEZnQkw7O1FBRUtELCtEQUFTQTs7O0tBRmRDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL2NvbXBvbmVudHMvcHJvZmlsZS1kcm9wZG93bi50c3g/NDQ0ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBjbGllbnRcIlxuXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCJcbmltcG9ydCB7IENoZXZyb25Eb3duLCBCb29rT3BlbiwgR3JhZHVhdGlvbkNhcCwgTWVzc2FnZVNxdWFyZVRleHQsIFRyZW5kaW5nVXAsIEJhckNoYXJ0MywgV2FsbGV0LCBVc2VyIH0gZnJvbSBcImx1Y2lkZS1yZWFjdFwiXG5pbXBvcnQgeyBtb3Rpb24sIEFuaW1hdGVQcmVzZW5jZSB9IGZyb20gXCJmcmFtZXItbW90aW9uXCJcbmltcG9ydCB7IHVzZVdhbGxldCB9IGZyb20gXCJAL2NvbnRleHRzL3dhbGxldC1jb250ZXh0XCJcblxuZXhwb3J0IGZ1bmN0aW9uIFByb2ZpbGVEcm9wZG93bigpIHtcbiAgY29uc3QgW2lzT3Blbiwgc2V0SXNPcGVuXSA9IHVzZVN0YXRlKGZhbHNlKVxuICBjb25zdCB7IHdhbGxldCB9ID0gdXNlV2FsbGV0KClcblxuICBjb25zdCBtZW51SXRlbXMgPSBbXG4gICAge1xuICAgICAgbmFtZTogXCJDb250cmlidXRlXCIsXG4gICAgICBocmVmOiBcIi9kYXNoYm9hcmQ/dGFiPWNvbnRyaWJ1dGVcIixcbiAgICAgIGljb246IDxNZXNzYWdlU3F1YXJlVGV4dCBjbGFzc05hbWU9XCJoLTQgdy00XCIgLz5cbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IFwiWW91ciBQZXJmb3JtYW5jZVwiLFxuICAgICAgaHJlZjogXCIvZGFzaGJvYXJkP3RhYj1wZXJmb3JtYW5jZVwiLFxuICAgICAgaWNvbjogPFRyZW5kaW5nVXAgY2xhc3NOYW1lPVwiaC00IHctNFwiIC8+XG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBcIkFuYWx5dGljcyAmIFByb2dyZXNzXCIsXG4gICAgICBocmVmOiBcIi9hbmFseXRpY3NcIixcbiAgICAgIGljb246IDxCYXJDaGFydDMgY2xhc3NOYW1lPVwiaC00IHctNFwiIC8+XG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBcIlR1dG9yaWFsXCIsXG4gICAgICBocmVmOiBcIi90dXRvcmlhbFwiLFxuICAgICAgaWNvbjogPEdyYWR1YXRpb25DYXAgY2xhc3NOYW1lPVwiaC00IHctNFwiIC8+XG4gICAgfSxcbiAgICB7XG4gICAgICBuYW1lOiBcIkRvY3NcIixcbiAgICAgIGhyZWY6IFwiL2RvY3NcIixcbiAgICAgIGljb246IDxCb29rT3BlbiBjbGFzc05hbWU9XCJoLTQgdy00XCIgLz5cbiAgICB9LFxuICAgIHtcbiAgICAgIG5hbWU6IFwiQnV5ICREZVRBXCIsXG4gICAgICBocmVmOiBcIi9zd2FwXCIsXG4gICAgICBpY29uOiA8V2FsbGV0IGNsYXNzTmFtZT1cImgtNCB3LTRcIiAvPlxuICAgIH1cbiAgXVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtNFwiPlxuICAgICAgey8qIFdhbGxldCBBZGRyZXNzICovfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtZ3JheS00MDBcIj5cbiAgICAgICAge2Ake3dhbGxldD8ucHVibGljS2V5Py50b1N0cmluZygpLnNsaWNlKDAsIDQpfS4uLiR7d2FsbGV0Py5wdWJsaWNLZXk/LnRvU3RyaW5nKCkuc2xpY2UoLTMpfWB9XG4gICAgICA8L2Rpdj5cblxuICAgICAgey8qIFByb2ZpbGUgRHJvcGRvd24gKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlbGF0aXZlXCI+XG4gICAgICAgIDxidXR0b25cbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiBzZXRJc09wZW4oIWlzT3Blbil9XG4gICAgICAgICAgY2xhc3NOYW1lPVwidGV4dC1ncmF5LTMwMCBob3Zlcjp0ZXh0LXdoaXRlIHRyYW5zaXRpb24tY29sb3JzXCJcbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiaC04IHctOCByb3VuZGVkLWZ1bGwgYmctWyMwMEZGOTVdLzEwIGZsZXggaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyIGJvcmRlciBib3JkZXItWyMwMEZGOTVdLzIwXCI+XG4gICAgICAgICAgICA8VXNlciBjbGFzc05hbWU9XCJoLTQgdy00IHRleHQtWyMwMEZGOTVdXCIgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9idXR0b24+XG5cbiAgICAgICAgPEFuaW1hdGVQcmVzZW5jZT5cbiAgICAgICAgICB7aXNPcGVuICYmIChcbiAgICAgICAgICAgIDxtb3Rpb24uZGl2XG4gICAgICAgICAgICAgIGluaXRpYWw9e3sgb3BhY2l0eTogMCwgeTogLTEwIH19XG4gICAgICAgICAgICAgIGFuaW1hdGU9e3sgb3BhY2l0eTogMSwgeTogMCB9fVxuICAgICAgICAgICAgICBleGl0PXt7IG9wYWNpdHk6IDAsIHk6IC0xMCB9fVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJhYnNvbHV0ZSByaWdodC0wIG10LTIgdy00OCByb3VuZGVkLWxnIGJnLWJsYWNrLzkwIGJhY2tkcm9wLWJsdXItbGcgXG4gICAgICAgICAgICAgICAgYm9yZGVyIGJvcmRlci13aGl0ZS8xMCBzaGFkb3ctbGcgcHktMSB6LTUwXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge21lbnVJdGVtcy5tYXAoKGl0ZW0pID0+IChcbiAgICAgICAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLm5hbWV9XG4gICAgICAgICAgICAgICAgICBocmVmPXtpdGVtLmhyZWZ9XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJmbGV4IGl0ZW1zLWNlbnRlciBnYXAtMiBweC00IHB5LTIgdGV4dC1zbSB0ZXh0LWdyYXktMzAwIFxuICAgICAgICAgICAgICAgICAgICBob3Zlcjp0ZXh0LXdoaXRlIGhvdmVyOmJnLXdoaXRlLzUgdHJhbnNpdGlvbi1jb2xvcnNcIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4gc2V0SXNPcGVuKGZhbHNlKX1cbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aXRlbS5pY29ufVxuICAgICAgICAgICAgICAgICAge2l0ZW0ubmFtZX1cbiAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPC9tb3Rpb24uZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvQW5pbWF0ZVByZXNlbmNlPlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIClcbn0gIl0sIm5hbWVzIjpbInVzZVN0YXRlIiwiTGluayIsIkJvb2tPcGVuIiwiR3JhZHVhdGlvbkNhcCIsIk1lc3NhZ2VTcXVhcmVUZXh0IiwiVHJlbmRpbmdVcCIsIkJhckNoYXJ0MyIsIldhbGxldCIsIlVzZXIiLCJtb3Rpb24iLCJBbmltYXRlUHJlc2VuY2UiLCJ1c2VXYWxsZXQiLCJQcm9maWxlRHJvcGRvd24iLCJ3YWxsZXQiLCJpc09wZW4iLCJzZXRJc09wZW4iLCJtZW51SXRlbXMiLCJuYW1lIiwiaHJlZiIsImljb24iLCJjbGFzc05hbWUiLCJkaXYiLCJwdWJsaWNLZXkiLCJ0b1N0cmluZyIsInNsaWNlIiwiYnV0dG9uIiwib25DbGljayIsImluaXRpYWwiLCJvcGFjaXR5IiwieSIsImFuaW1hdGUiLCJleGl0IiwibWFwIiwiaXRlbSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./components/profile-dropdown.tsx\n"));

/***/ })

});