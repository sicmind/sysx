/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/*!*********************!*\
  !*** ./src/sysg.js ***!
  \*********************/
eval("\nconst functionTags = {\n    toggle: function(element){\n    \t\telement.onclick = function(){\n    \t\t\tlet d = document.querySelector(this.getAttribute('dest'))\n    \t\t\tif(d.classList.contains(element.getAttribute('value'))){\n    \t\t\t\td.classList.remove(element.getAttribute('value'));\n    \t\t\t}else{\n    \t\t\t\td.classList.add(element.getAttribute('value'));\n    \t\t\t}\n    \t\t}\n    },\n\n    midiconsole: function(element){\n        element.receive_message = function(msg){\n            //console.log(msg);\n            this.innerHTML += `<div class=\"${msg.message.type} ${msg.detail.status}\" device=\"${msg.device}\" type=\"${msg.detail.status}\">${msg.message.data}</div>`;\n            element.scrollTop = element.scrollHeight;\n        }\n        \n        window.GLOBAL_MIDI_LISTENERS.push(element);\n    }\n}\n\nvar tags = [\n    'midiconsole',\n    'toggle',\n];\n\nfor(t of tags){\n    for(e of document.querySelectorAll(t)){\n        functionTags[t](e);\n    }\n}\n\n\n//# sourceURL=webpack://sysx/./src/sysg.js?");
/******/ })()
;