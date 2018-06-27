(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ACL"] = factory();
	else
		root["ACL"] = factory();
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/checkPermissions.js":
/*!*********************************!*\
  !*** ./src/checkPermissions.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createRole = __webpack_require__(/*! ./createRole */ \"./src/createRole.js\");\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction matchParams(permissionEndPoint, endPoint) {\n    var params = permissionEndPoint.split('/').filter(function (pt) {\n        return !!pt;\n    });\n    var values = endPoint.split('/').filter(function (pt) {\n        return !!pt;\n    });\n    var paramsObj = {};\n    for (var i = 0; i < params.length; i++) {\n        var param = params[i],\n            value = values[i];\n        if (param.charAt(0) === ':') {\n            Object.assign(paramsObj, _defineProperty({}, param.slice(1), value));\n        }\n    }\n    return paramsObj;\n}\n\nfunction checkIfParamsAccepted(params) {\n    var role = this.role,\n        permission = this.permission,\n        permissionParams = this.permissionParams,\n        verb = this.verb;\n\n    var testCondition = permission.getCondition(verb);\n    return testCondition(params, permissionParams);\n}\n\nfunction checkIfEndPointExits(endPoint) {\n    var role = this.role,\n        verb = this.verb;\n\n    var permission = role.getPermission(endPoint);\n    if (permission.error) return { error: 'endpoint \\'' + endPoint + '\\' doesn\\'t exist' };\n    var permissionParams = matchParams(permission.endPoint, endPoint);\n    var hasParams = Object.keys(permissionParams).length;\n    if (hasParams) {\n        return { role: role, permission: permission, permissionParams: permissionParams, verb: verb, when: checkIfParamsAccepted };\n    }\n    return permission.hasAccessMethodTo(verb, endPoint);\n}\n\nfunction checkIfHasAccessMethod(verb) {\n    var role = this.role;\n\n    return { role: role, verb: verb, to: checkIfEndPointExits, from: checkIfEndPointExits };\n}\n\nfunction checkIfRoleExists(roleName) {\n    var role = (0, _createRole.findRole)(roleName);\n    return !!role ? { role: role.role, can: checkIfHasAccessMethod } : false;\n}\n\nexports.default = {\n    if: checkIfRoleExists\n};\n\n//# sourceURL=webpack://ACL/./src/checkPermissions.js?");

/***/ }),

/***/ "./src/createRole.js":
/*!***************************!*\
  !*** ./src/createRole.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\nexports.AccessRole = exports.accessRoles = undefined;\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nexports.createRole = createRole;\nexports.findRole = findRole;\n\nvar _grantPermissions = __webpack_require__(/*! ./grantPermissions */ \"./src/grantPermissions.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n/**\n * store created access roles\n */\nvar accessRoles = exports.accessRoles = function () {\n\n    /**\n     * roles\n     * @private\n     */\n    var roles = {/** ACCESS ROLES REGISTER */};\n\n    return {\n\n        /**\n         * @param {AccessRole} role add new role\n         */\n        add: function add(role) {\n            Object.assign(roles, _defineProperty({}, role.roleName, role));\n        },\n\n        /**\n         * @param {AccessRole} role add new role\n         */\n        get: function get(roleName) {\n            return roles.hasOwnProperty(roleName) ? roles[roleName] : null;\n        }\n\n    };\n}();\n\n/**\n * Access Role Constructor Class\n */\n\nvar AccessRole = exports.AccessRole = function () {\n    function AccessRole(roleName) {\n        _classCallCheck(this, AccessRole);\n\n        this.roleName = roleName;\n        this.permissions = {/** USER PERMISSIONS */};\n    }\n\n    _createClass(AccessRole, [{\n        key: 'grantPermission',\n        value: function grantPermission(permission) {\n            return this.permissions[permission.endPoint] = permission;\n        }\n    }, {\n        key: 'getPermission',\n        value: function getPermission(endPoint) {\n\n            for (var key in this.permissions) {\n                var permission = this.permissions[key];\n                if (permission.hasEndPoint(endPoint)) return permission;\n            }\n\n            return { error: 'Couldn\\'t find permission \\'' + endPoint + '\\'' };\n        }\n    }]);\n\n    return AccessRole;\n}();\n\n/**\n * \n * @param {string} roleName creates access role instance\n */\n\n\nfunction createRole(roleName) {\n\n    var role = new AccessRole(roleName);\n\n    accessRoles.add(role);\n\n    return {\n        value: role,\n        message: 'Role \\'' + roleName + '\\' was created successfully'\n    };\n}\n\n/**\n * \n * @param {string} roleName find role by name\n */\nfunction findRole(roleName) {\n\n    var role = accessRoles.get(roleName);\n\n    return role ? { role: role, can: _grantPermissions.can } : { error: 'Couldn\\'t find role \\'' + roleName + '\\'' };\n}\n\n//# sourceURL=webpack://ACL/./src/createRole.js?");

/***/ }),

/***/ "./src/grantPermissions.js":
/*!*********************************!*\
  !*** ./src/grantPermissions.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n    value: true\n});\n\nvar _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();\n\nexports.can = can;\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction normalizeVerb(verb) {\n    return 'CAN_' + verb.toUpperCase();\n}\n\nvar accessMethods = {\n    \"CAN_GET\": Math.pow(2, 0), // 00000001\n    \"CAN_POST\": Math.pow(2, 1), // 00000010\n    \"CAN_DELETE\": Math.pow(2, 2), // 00000100\n    \"CAN_PATCH\": Math.pow(2, 3), // 00001000\n    \"CAN_PUT\": Math.pow(2, 4) // 00010000\n};\n\nfunction generateMatchExpression(endPoint) {\n    var regexStr = endPoint.split('/').map(function (pt) {\n        return pt.charAt(0) === ':' ? '[^\\/)]+' : pt;\n    }).join('/');\n    return new RegExp('^' + regexStr + '$', 'g');\n}\n\nvar Permission = function () {\n    /**\n     * \n     * @param {string} endPoint end\n     * @param {EndPoint} endPoint end point matcher\n     */\n    function Permission(endPoint) {\n        _classCallCheck(this, Permission);\n\n        this.grantedMethods = 0;\n        this.endPoint = endPoint;\n        this.conditions = {};\n        this.matchExpression = generateMatchExpression(endPoint);\n    }\n\n    _createClass(Permission, [{\n        key: \"grantAccessMethod\",\n        value: function grantAccessMethod(verb) {\n            var methodId = normalizeVerb(verb);\n            this.grantedMethods |= accessMethods[methodId];\n        }\n    }, {\n        key: \"hasEndPoint\",\n        value: function hasEndPoint(endPoint) {\n            return !!endPoint.match(this.matchExpression);\n        }\n    }, {\n        key: \"hasAccessMethodTo\",\n        value: function hasAccessMethodTo(verb, endPoint) {\n            var method = normalizeVerb(verb);\n            var methodGranted = this.grantedMethods & accessMethods[method];\n            var endpointExists = this.hasEndPoint(endPoint);\n            return methodGranted && endpointExists;\n        }\n    }, {\n        key: \"addCondition\",\n        value: function addCondition(condition, verb) {\n            return this.conditions[verb] = condition;\n        }\n    }, {\n        key: \"getCondition\",\n        value: function getCondition(verb) {\n            return this.conditions[verb];\n        }\n    }]);\n\n    return Permission;\n}();\n\nfunction when(condition) {\n    var role = this.role,\n        permission = this.permission,\n        verb = this.verb;\n\n    return permission.addCondition(condition, verb);\n}\n\nfunction to(endPoint) {\n    var role = this.role,\n        verb = this.verb;\n\n    var permission = new Permission(endPoint);\n    permission.grantAccessMethod(verb);\n    role.grantPermission(permission);\n    return { role: role, permission: permission, verb: verb, when: when };\n}\n\nfunction can(verb) {\n    var role = this.role;\n\n    return { role: role, verb: verb, to: to, from: to };\n}\n\n//# sourceURL=webpack://ACL/./src/grantPermissions.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.an = exports.a = exports.check = undefined;\n\nvar _createRole = __webpack_require__(/*! ./createRole */ \"./src/createRole.js\");\n\nvar _checkPermissions = __webpack_require__(/*! ./checkPermissions */ \"./src/checkPermissions.js\");\n\nvar _checkPermissions2 = _interopRequireDefault(_checkPermissions);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nexports.check = _checkPermissions2.default;\nvar a = exports.a = _createRole.findRole;\nvar an = exports.an = _createRole.findRole;\n\nexports.default = { createRole: _createRole.createRole };\n\n//# sourceURL=webpack://ACL/./src/index.js?");

/***/ })

/******/ });
});