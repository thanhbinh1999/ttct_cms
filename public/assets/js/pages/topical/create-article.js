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
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 24);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./platform/ttct/resources/assets/js/pages/article-create-upload-resource.js":
/*!***********************************************************************************!*\
  !*** ./platform/ttct/resources/assets/js/pages/article-create-upload-resource.js ***!
  \***********************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ArticleCreateUploadResource; });
/* harmony import */ var uuid_v1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! uuid/v1 */ "./node_modules/uuid/v1.js");
/* harmony import */ var uuid_v1__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(uuid_v1__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helper */ "./platform/ttct/resources/assets/js/pages/helper.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }




/**
 * @author        Giang Nguyen
 * @description Class ArticleCreateUploadResource
 */

var ArticleCreateUploadResource =
/*#__PURE__*/
function () {
  function ArticleCreateUploadResource(createArticleInstant) {
    _classCallCheck(this, ArticleCreateUploadResource);

    this.createArticleInstant = createArticleInstant;
    this.mode = 'upload';
    this.$modalUploadTabUpload = $('a[href="#modal-upload-tab-upload"]');
    this.$modalUploadTabSelectResource = $('a[href="#modal-upload-tab-select-resource"]');
    this.$modalUploadFilePreview = $('#modal-upload-file-preview'); // tab upload

    this.$modalSelectResource = this.createArticleInstant.$modalSelectResource;
    this.$modalUploadResourceBtnSelect = $('#modal-upload-resource-btn-select');
    this.$modalUploadResourceBtnUpload = $('#modal-upload-resource-btn-upload');
    this.$modalUploadResourceInput = $('#modal-upload-resource-input');
    this.$modalUploadResourceRreviewContainer = $('#modal-upload-resource-preview-container');
    this.$modalUploadCompleteBtn = $('#modal-upload-complete-btn');
    this.files = [];
    this.resourceAfterUpload = null; // tab select

    this.$modalUploadTableSelectResource = $('#modal-upload-table-select-resource');
    this.$modalUploadDatatableInputFileName = $('#modal-upload-datatable-input-file-name');
    this.$modalUploadDatatableInputFrom = $('#modal-upload-datatable-input-from');
    this.$modalUploadDatatableInputTo = $('#modal-upload-datatable-input-to');
    this.$modalUploadDatatableInputUploadBy = $('#modal-upload-datatable-input-upload-by');
    this.$modalUploadDatatableInputBtnSearch = $('#modal-upload-datatable-input-btn-search');
    this.$modalUploadDatatableInputFileType = $('#modal-upload-datatable-input-file-type');
    this.datatable = null;
    this.selecttedResource = [];
    this.init();
  }

  _createClass(ArticleCreateUploadResource, [{
    key: "init",
    value: function init() {
      this.initTab();
      this.initModal();
      this.initUpload();
      this.initPickDate();
    }
  }, {
    key: "initUpload",
    value: function initUpload() {
      var _this = this;

      // on click btn upload => trigger input file for select file
      this.$modalUploadResourceBtnSelect.click(function (event) {
        event.preventDefault();

        _this.$modalUploadResourceInput.click();
      }); //when select file is done => render html for preview all file

      this.$modalUploadResourceInput.change(function (event) {
        if ($(event.target)[0].files) {
          var tmpFiles = _this.toArray($(event.target)[0].files);

          for (var i = 0; i < tmpFiles.length; i++) {
            _this.files.push({
              file: tmpFiles[i],
              id: uuid_v1__WEBPACK_IMPORTED_MODULE_0___default()()
            });
          }

          _this.renderImagePreview();

          _this.$modalUploadResourceInput.val(null);

          _this.$modalUploadResourceBtnUpload.show();
        }
      }); // event for remove one file from selected file

      $(document).on('click', '.modal-upload-resource-btn-remove-image', function (event) {
        event.preventDefault();
        var id = $(event.currentTarget).data('id');

        if (id) {
          _this.files = _this.files.filter(function (file) {
            return file.id !== id;
          });

          if (_this.files.length === 0) {
            _this.$modalUploadResourceBtnUpload.hide();
          }

          _this.renderImagePreview();
        }
      }); // init event for upload file to server

      this.$modalUploadResourceBtnUpload.click(function (event) {
        event.preventDefault();

        if (_this.files.length > 0) {
          if (_this.files.length > 5) {
            toastr.info('Chỉ được phép tải lên tối đa 5 file');
            return false;
          }

          Object(_helper__WEBPACK_IMPORTED_MODULE_2__["showBlock"])();
          var fd = new FormData();

          _this.files.forEach(function (file) {
            fd.append('files[]', file.file);
            fd.append('descriptions[]', $("textarea[id=".concat(file.id, "]")).val());
            fd.append('names[]', $("input[id=".concat(file.id, "]")).val());
          });

          fd.append('creator_id', _this.$modalUploadResourceBtnUpload.data('creator-id'));
          fd.append('creator_full_name', _this.$modalUploadResourceBtnUpload.data('creator-full-name'));
          fd.append('creator_username', _this.$modalUploadResourceBtnUpload.data('creator-username'));
          axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(_this.$modalUploadResourceBtnUpload.data('url-upload-multi'), fd, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(function (_ref) {
            var data = _ref.data;

            if (data.message) {
              toastr.success(data.message);
              _this.files = [];

              _this.$modalUploadResourceRreviewContainer.html('');

              _this.$modalUploadResourceBtnUpload.hide();

              _this.$modalUploadResourceInput.val(null);

              _this.resourceAfterUpload = data.resources;

              _this.renderResourceAfterUpload(data.resources);

              Object(_helper__WEBPACK_IMPORTED_MODULE_2__["hideBlock"])();
            }
          }, function (err) {
            Object(_helper__WEBPACK_IMPORTED_MODULE_2__["hideBlock"])();
            var status = err.response.status;

            if (status === 500) {
              toastr.error(err.response.data.message);
            }
          });
        } else {
          toastr.error('Không thể upload, không có file');
        }
      }); //on upload is done or resource is selected then inject it as html to editor

      this.$modalUploadCompleteBtn.click(function (event) {
        event.preventDefault();

        if (_this.mode === 'upload') {
          _this.processForModeUpload();
        } else {
          _this.processForModeSelect();
        }

        _this.$modalSelectResource.modal('hide');
      });
    }
  }, {
    key: "initModal",
    value: function initModal() {
      var _this2 = this;

      this.$modalSelectResource.on('hide.bs.modal', function (event) {
        if (event.namespace === 'bs.modal') {
          _this2.files = [];

          _this2.$modalUploadResourceRreviewContainer.html('');

          _this2.$modalUploadResourceBtnUpload.hide();

          _this2.$modalUploadResourceInput.val(null);

          _this2.mode = 'upload';

          _this2.$modalUploadTabUpload.click();

          _this2.resourceAfterUpload = null;
          _this2.selecttedResource = [];

          _this2.$modalUploadFilePreview.html('');
        }
      }).on('show.bs.modal', function (event) {
        if (event.namespace === 'bs.modal') {
          _this2.createArticleInstant.processFileMode();

          if (_this2.datatable) {
            _this2.datatable.reload();
          }
        }
      });
    }
  }, {
    key: "initTab",
    value: function initTab() {
      var _this3 = this;

      this.$modalUploadTabUpload.click(function () {
        _this3.mode = 'upload';
      });
      this.$modalUploadTabSelectResource.click(function () {
        _this3.mode = 'select';

        if (_this3.datatable) {
          _this3.datatable.reload();
        } else {
          _this3.initDatable();
        }

        _this3.$modalUploadFilePreview.html('').hide();
      });
    }
  }, {
    key: "initPickDate",
    value: function initPickDate() {
      this.$modalUploadDatatableInputFrom.datepicker({
        todayHighlight: true,
        orientation: "bottom left",
        autoclose: true,
        format: 'dd/mm/yyyy',
        endDate: new Date(),
        templates: {
          leftArrow: '<i class="la la-angle-left"></i>',
          rightArrow: '<i class="la la-angle-right"></i>'
        }
      });
      this.$modalUploadDatatableInputTo.datepicker({
        todayHighlight: true,
        orientation: "bottom left",
        autoclose: true,
        format: 'dd/mm/yyyy',
        endDate: new Date(),
        templates: {
          leftArrow: '<i class="la la-angle-left"></i>',
          rightArrow: '<i class="la la-angle-right"></i>'
        }
      });
    }
  }, {
    key: "renderImagePreview",
    value: function renderImagePreview() {
      var _this4 = this;

      this.$modalUploadResourceRreviewContainer.html('');

      var _loop = function _loop(i) {
        var type = _this4.files[i].file.type;
        var name = _this4.files[i].file.name;
        name = name.slice(0, name.lastIndexOf('.'));
        type = type.split('/');

        if (type[0] === 'image') {
          var reader = new FileReader();

          reader.onload = function (e) {
            _this4.$modalUploadResourceRreviewContainer.append("\n                        <div class=\"col-md-6 mt-2 mb-2 one-file\" style=\"display: flex;justify-content: center;align-items: center\" >\n                            <div class=\"row\" style=\"width: 100%;\">\n                                <div class=\"col-md-3\">\n                                    <img src=\"".concat(e.target.result, "\" class=\"img-thumbnail\" style=\"width:100%\">\n                                </div>\n                                <div class=\"col-md-7\">\n                                    <div class=\"form-group\">\n                                        <input class=\"form-control\" placeholder=\"T\xEAn\" id=\"").concat(_this4.files[i].id, "\" value=\"").concat(name, "\">\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <textarea rows=\"2\" class=\"form-control\" placeholder=\"M\xF4 t\u1EA3\" id=\"").concat(_this4.files[i].id, "\" ></textarea>\n                                    </div>\n                                </div>\n                                <div class=\"col-md-2\" style=\"display: flex;justify-content: center;align-items: center\">\n                                    <div data-id=\"").concat(_this4.files[i].id, "\" class=\"btn btn-danger btn-icon modal-upload-resource-btn-remove-image\"><i class=\"la la-trash\"></i></div>\n                                </div>\n                            </div>\n                        </div>\n                "));
          };

          reader.readAsDataURL(_this4.files[i].file);
        } else {
          _this4.$modalUploadResourceRreviewContainer.append("\n                        <div class=\"col-md-6 mt-2 mb-2 one-file\" style=\"display: flex;justify-content: center;align-items: center\" >\n                            <div class=\"row\" style=\"width: 100%;\">\n                                <div class=\"col-md-3\">\n                                    ".concat(_this4.generatePreviewHtmlForFile({
            type: _this4.textToNumber(type[0])
          }), "\n                                </div>\n                                <div class=\"col-md-7\">\n                                    <div class=\"form-group\">\n                                        <input class=\"form-control\" placeholder=\"T\xEAn\" id=\"").concat(_this4.files[i].id, "\" value=\"").concat(name, "\">\n                                    </div>\n                                    <div class=\"form-group\">\n                                        <textarea rows=\"2\" class=\"form-control\" placeholder=\"M\xF4 t\u1EA3\" id=\"").concat(_this4.files[i].id, "\" ></textarea>\n                                    </div>\n                                </div>\n                                <div class=\"col-md-2\" style=\"display: flex;justify-content: center;align-items: center\">\n                                    <div data-id=\"").concat(_this4.files[i].id, "\" class=\"btn btn-danger btn-icon modal-upload-resource-btn-remove-image\"><i class=\"la la-trash\"></i></div>\n                                </div>\n                            </div>\n                        </div>\n                "));
        }
      };

      for (var i = 0; i < this.files.length; i++) {
        _loop(i);
      }
    }
  }, {
    key: "renderResourceAfterUpload",
    value: function renderResourceAfterUpload(resources) {
      var _this5 = this;

      resources.forEach(function (res) {
        _this5.$modalUploadResourceRreviewContainer.append("\n                        <div class=\"col-md-6 mt-2 mb-2 modal-upload-one-file\" style=\"display: flex;justify-content: center;align-items: center\" >\n                            <div class=\"row\">\n                                <div class=\"col-md-1\" style=\"display: flex;align-items: center;\">\n                                    <label class=\"kt-checkbox kt-checkbox--bold kt-checkbox--brand\" style=\"margin-left: 0;margin-right: 0;padding-left: 0;padding-right: 0;display:flex;justify-content: center;align-items: center\">\n                                        <input type=\"checkbox\" data-id=\"".concat(res.id, "\" checked value=\"").concat(res.base_url, "/").concat(res.absolute_url, "\">\n                                        <span></span>\n                                    </label>\n                                </div>\n                                <div class=\"col-md-4\">\n                                    ").concat(_this5.generatePreviewHtmlForFile(res), "\n                                </div>\n                                <div class=\"col-md-7\">\n                                    <div class=\"form-group\">\n                                        <input class=\"form-control\" data-id=\"").concat(res.id, "\" value=\"").concat(res.base_url, "/").concat(res.absolute_url, "\">\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                "));
      });
    }
  }, {
    key: "toArray",
    value: function toArray(data) {
      var result = [];
      Object.keys(data).forEach(function (key) {
        result.push(data[key]);
      });
      return result;
    }
  }, {
    key: "initDatable",
    value: function initDatable() {
      var _this6 = this;

      this.datatable = this.$modalUploadTableSelectResource.KTDatatable({
        data: {
          type: 'remote',
          source: {
            read: {
              url: this.$modalUploadTableSelectResource.data('url'),
              headers: {
                'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
              },
              params: {
                query: {
                  name: function name() {
                    return _this6.$modalUploadDatatableInputFileName.val();
                  },
                  from: function from() {
                    return _this6.$modalUploadDatatableInputFrom.val();
                  },
                  to: function to() {
                    return _this6.$modalUploadDatatableInputTo.val();
                  },
                  type: function type() {
                    return _this6.$modalUploadDatatableInputFileType.val();
                  },
                  upload_by: function upload_by() {
                    return _this6.$modalUploadDatatableInputUploadBy.val();
                  }
                }
              },
              map: function map(raw) {
                var dataSet = raw;

                if (typeof raw.data !== 'undefined') {
                  dataSet = raw.data;
                }

                return dataSet;
              }
            }
          },
          pageSize: 10,
          serverPaging: true,
          serverFiltering: true,
          serverSorting: true
        },
        layout: {
          scroll: true,
          height: 580,
          footer: false
        },
        sortable: true,
        pagination: true,
        search: {
          input: this.$searchKey
        },
        rows: {
          autoHide: true
        },
        columns: [{
          field: 'id',
          title: 'ID',
          width: 10,
          type: 'string',
          sortable: false,
          selector: {
            "class": 'kt-checkbox--solid'
          },
          autoHide: false,
          textAlign: 'left'
        }, {
          field: 'content',
          title: 'NỘI DUNG',
          width: 200,
          type: 'string',
          sortable: false,
          selector: false,
          autoHide: false,
          textAlign: 'center',
          template: function template(row) {
            return _this6.generatePreviewHtmlForFile(row);
          }
        }, {
          field: 'name',
          title: 'TÊN',
          width: 200,
          type: 'string',
          selector: false,
          autoHide: false,
          textAlign: 'center',
          template: function template(row) {
            return "<strong style=\"cursor:pointer\" class=\"file-name\" data-id=\"".concat(row.id, "\">").concat(row.name, "</strong>");
          }
        }, {
          field: 'link',
          title: 'LINK',
          width: 500,
          type: 'string',
          selector: false,
          sortable: false,
          autoHide: false,
          textAlign: 'center',
          template: function template(row) {
            return "<input type=\"text\" data-type=\"".concat(row.type, "\" data-id=\"").concat(row.id, "\"  data-base-url=\"").concat(row.base_url, "\" data-absolute-url=\"").concat(row.absolute_url, "\" class=\"form-control\" value=\"").concat(row.base_url, "/").concat(row.absolute_url, "\" style=\"width:100%\">");
          }
        }, {
          field: 'created_at',
          title: 'CREATED AT',
          width: 100,
          type: 'string',
          selector: false,
          autoHide: false,
          textAlign: 'center',
          template: function template(row) {
            return "<strong>".concat(row.created_at, "</strong>");
          }
        }]
      });
      this.datatable.on("kt-datatable--on-check kt-datatable--on-uncheck", function () {
        _this6.selecttedResource = _this6.datatable.rows(".kt-datatable__row--active").nodes().find('[data-field="link"]').map(function (index, cell) {
          var formControl = $(cell).find('.form-control');
          return {
            id: formControl.data('id'),
            type: formControl.data('type'),
            base_url: formControl.data('base-url'),
            absolute_url: formControl.data('absolute-url')
          };
        }).toArray();
      });
      this.$modalUploadDatatableInputBtnSearch.click(function (event) {
        event.preventDefault();

        _this6.datatable.search();
      });
      $(document).on('click', '.file-name', function (event) {
        event.preventDefault();
        var id = $(event.target).data('id');
        axios__WEBPACK_IMPORTED_MODULE_1___default.a.get(_this6.$modalUploadResourceBtnUpload.data('url-get-resource-detail') + id).then(function (_ref2) {
          var data = _ref2.data;
          var review = parseInt(data.type) === 1 ? "<img class=\"img-thumbnail\" src=\"".concat(data.base_url, "/").concat(data.absolute_url, "\" style=\"width:70%\">") : "<video controls style=\"width:100%\">\n                          <source src=\"".concat(data.base_url, "/").concat(data.absolute_url, "\">\n                        </video>");

          _this6.$modalUploadFilePreview.show().html("\n                        <div class=\"row\" style=\"display: flex;justify-content: center\">\n                        <div class=\"col-12 text-center\">".concat(review, "</div>\n                        </div>\n                        <div class=\"mt-5 text-right\" style=\"padding: 36px\">\n                            <h4 style=\"display:block\">").concat(data.name, "</h4>\n                            <h5 style=\"color:#292626;display:block\"><strong>Ng\xE0y t\u1EA1o: </strong>").concat(data.created_at, " - <strong>Upload b\u1EDFi</strong>: ").concat(data.creator_full_name, "</h5>\n                            <div class=\"form-group\">\n                                <input type=\"text\" value=\"").concat(data.base_url, "/").concat(data.absolute_url, "\" class=\"form-control mt-5\">\n                            </div>\n                        </div>\n                    "));
        }, function (err) {});
      });
    }
  }, {
    key: "processForModeUpload",
    value: function processForModeUpload() {
      var _this7 = this;

      if (this.resourceAfterUpload && this.resourceAfterUpload.length > 0) {
        var ids = [];
        $('.modal-upload-one-file').toArray().forEach(function (item) {
          var checkBox = $(item).find('input[type=checkbox]');

          if (checkBox.prop('checked')) {
            ids.push(parseInt(checkBox.data('id')));
          }
        });

        if (ids.length > 0) {
          var resources = this.resourceAfterUpload.filter(function (res) {
            return ids.includes(parseInt(res.id));
          });
          var type = this.createArticleInstant.selectResourceIsCurrentUseFor; //check if resource select is trigger from thumbnail

          if (type === 'thumbnail' || type === 'cover-pc' || type === 'cover-mobile') {
            this.createArticleInstant.setImageDropify(resources[0], type);
            this.createArticleInstant.selectResourceIsCurrentUseFor = null;
            this.resourceAfterUpload = null;
          } else if (type === 'resources') {// this.createArticleInstant.setResources(resources);
            // this.selecttedResource = []
            //check if resource select is trigger from froala
          } else if (type === 'froala') {
            //check if current replace an file
            if (this.createArticleInstant.currentEditFile) {
              var file = this.createArticleInstant.currentEditFile;
              var url = resources[0].base_url + '/' + resources[0].absolute_url;

              if (file.type === 'img') {
                var currentFile = $(this.createArticleInstant.currentEditFile.img);
                var parent = currentFile.parent();

                if (parent.attr('data-fancybox') !== undefined) {
                  parent.attr('href', url);
                }

                $(this.createArticleInstant.currentEditFile.img).attr('src', url);
              } else {
                var video = $(this.createArticleInstant.currentEditFile.video).find('video');
                $(this.createArticleInstant.currentEditFile.video).attr('src', url);
                $(this.createArticleInstant.currentEditFile.video).find('source').attr('src', url);
                $(video)[0].load();
              }

              this.createArticleInstant.currentEditFile = null;
              this.resourceAfterUpload = null;
            } else {
              //else add all generated html to editor content
              var html = '';
              resources.forEach(function (res) {
                html += _this7.generateHtmlForFile(res);
              });
              this.createArticleInstant.initEditor(html);
              this.resourceAfterUpload = null;
            }
          } else if (type === 'froala-quick-insert') {
            //else add all generated html to editor content
            var _html = '';
            resources.forEach(function (res) {
              _html += _this7.generateHtmlForFile(res);
            });
            var positionMark = document.getElementById('position_mark');
            $(_html).insertAfter(positionMark);
            $(positionMark).remove(); // this.createArticleInstant.quickInsertSetHtmlFunc(html);

            this.resourceAfterUpload = null;
          }
        }
      }
    }
  }, {
    key: "generateHtmlForFile",
    value: function generateHtmlForFile(res) {
      var file = '';

      switch (parseInt(res.type)) {
        case 1:
          {
            file = "<img src=\"".concat(res.base_url, "/").concat(res.absolute_url, "\" class=\"img-thumbnail\">");
            file = "<figure>\n                            <div class=\"grid-img\">\n                                <div href=\"".concat(res.base_url, "/").concat(res.absolute_url, "\" data-fancybox=\"gallery\" data-caption=\"\">\n                                    <img src=\"").concat(res.base_url, "/").concat(res.absolute_url, "\" alt=\"\" style=\"width: 100%\">\n                                </div>\n                            </div>\n                        </figure>");
            break;
          }

        case 2:
          {
            file = "<span class=\"fr-video fr-deletable fr-fvc fr-dvi fr-draggable\" contenteditable=\"false\" style=\"\">\n                            <video controls=\"\" style=\"width: 100%;\" class=\"fr-fvc fr-dvi fr-draggable\">\n                            <source src=\"".concat(res.base_url, "/").concat(res.absolute_url, "\"></video>\n                        </span>");
            break;
          }

        case 3:
          {
            file = "<img src=\"".concat($('body').data('base-url'), "/file-audio-icon.png\" class=\"img-thumbnail\" style=\"width:100%\">");
            break;
          }

        default:
          {}
      }

      return file;
    }
  }, {
    key: "generatePreviewHtmlForFile",
    value: function generatePreviewHtmlForFile(res) {
      var file = '';

      switch (parseInt(res.type)) {
        case 1:
          {
            file = "<img src=\"".concat(res.base_url, "/").concat(res.absolute_url, "\" class=\"img-thumbnail\" style=\"width:100%\">");
            break;
          }

        case 2:
          {
            file = "<img src=\"".concat($('body').data('base-url'), "/assets/img/icon/file-video-icon.png\" class=\"img-thumbnail\" style=\"width:100%\">");
            break;
          }

        case 3:
          {
            file = "<img src=\"".concat($('body').data('base-url'), "/assets/img/icon/file-audio-icon.png\" class=\"img-thumbnail\" style=\"width:100%\">");
            break;
          }

        default:
          {
            file = "<img src=\"".concat($('body').data('base-url'), "/assets/img/icon/file-icon.png\" class=\"img-thumbnail\" style=\"width:100%\">");
          }
      }

      return file;
    }
  }, {
    key: "processForModeSelect",
    value: function processForModeSelect() {
      var _this8 = this;

      if (this.selecttedResource.length > 0) {
        //check if resource select is trigger from thumbnail
        var type = this.createArticleInstant.selectResourceIsCurrentUseFor;

        if (type === 'thumbnail' || type === 'cover-pc' || type === 'cover-mobile') {
          this.createArticleInstant.setImageDropify(this.selecttedResource[0], type);
          this.createArticleInstant.selectResourceIsCurrentUseFor = null;
          this.selecttedResource = []; //check if resource select is trigger from resources
        } else if (this.createArticleInstant.selectResourceIsCurrentUseFor === 'resources') {
          this.createArticleInstant.setResources(this.selecttedResource);
          this.selecttedResource = []; //check if resource select is trigger from froala
        } else if (this.createArticleInstant.selectResourceIsCurrentUseFor === 'froala') {
          //check if current replace an file
          if (this.createArticleInstant.currentEditFile) {
            var file = this.createArticleInstant.currentEditFile;
            var url = this.selecttedResource[0].base_url + '/' + this.selecttedResource[0].absolute_url;

            if (file.type === 'img') {
              var currentFile = $(this.createArticleInstant.currentEditFile.img);
              var parent = currentFile.parent();

              if (parent.attr('data-fancybox') !== undefined) {
                parent.attr('href', url);
              }

              $(this.createArticleInstant.currentEditFile.img).attr('src', url);
            } else {
              var video = $(this.createArticleInstant.currentEditFile.video).find('video');
              $(this.createArticleInstant.currentEditFile.video).attr('src', url);
              $(this.createArticleInstant.currentEditFile.video).find('source').attr('src', url);
              $(video)[0].load();
            }

            this.createArticleInstant.currentEditFile = null;
            this.selecttedResource = [];
          } else {
            //else add all generated html to editor content
            var html = '';
            this.selecttedResource.forEach(function (res) {
              html += _this8.generateHtmlForFile(res);
            });
            this.createArticleInstant.initEditor(html);
            this.selecttedResource = [];
          }
        } else if (this.createArticleInstant.selectResourceIsCurrentUseFor === 'froala-quick-insert') {
          //else add all generated html to editor content
          var _html2 = '';
          this.selecttedResource.forEach(function (res) {
            _html2 += _this8.generateHtmlForFile(res);
          }); // this.createArticleInstant.quickInsertSetHtmlFunc(html, true);

          var positionMark = document.getElementById('position_mark');
          $(_html2).insertAfter(positionMark);
          $(positionMark).remove(); // this.createArticleInstant.quickInsertSetHtmlFunc.bind(this.createArticleInstant.editor)(html);

          this.selecttedResource = [];
        }
      }
    }
  }, {
    key: "textToNumber",
    value: function textToNumber(text) {
      switch (text) {
        case 'image':
          {
            return 1;
          }

        case 'video':
          {
            return 2;
          }

        case 'audio':
          {
            return 3;
          }

        default:
          {
            return 0;
          }
      }
    }
  }]);

  return ArticleCreateUploadResource;
}();



/***/ }),

/***/ "./platform/ttct/resources/assets/js/pages/helper.js":
/*!***********************************************************!*\
  !*** ./platform/ttct/resources/assets/js/pages/helper.js ***!
  \***********************************************************/
/*! exports provided: showBlock, hideBlock, showError, removeError, checkPermissions */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showBlock", function() { return showBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hideBlock", function() { return hideBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "showError", function() { return showError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeError", function() { return removeError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "checkPermissions", function() { return checkPermissions; });
/**
 * @author        Giang Nguyen
 */
var showBlock = function showBlock($el) {
  var themeBlock = $el ? $el : $('body');
  themeBlock.css({
    'overflow-y': 'hidden'
  });
  themeBlock.block({
    overlayCSS: {
      backgroundColor: '#1b2024',
      opacity: 0.8,
      zIndex: 9999999,
      cursor: 'wait',
      overflow: 'hidden'
    },
    css: {
      border: 0,
      color: '#fff',
      padding: 0,
      zIndex: 9999999,
      backgroundColor: 'transparent',
      overflow: 'hidden'
    },
    message: null
  });
};
var hideBlock = function hideBlock($el) {
  var themeBlock = $el ? $el : $('body');
  themeBlock.removeAttr('style');
  themeBlock.unblock();
};
var showError = function showError(prefix, errors) {
  Object.keys(errors).forEach(function (key) {
    if (key === 'tags.0') {
      var input = $("#".concat(prefix, "tags"));
      var formGroup = input.parent();
      formGroup.find('.invalid-feedback').remove();
      input.addClass('is-invalid');
      formGroup.append("<div class=\"invalid-feedback\">".concat(errors[key], "</div>"));
      input.focus(function (event) {
        formGroup.find('.invalid-feedback').remove();
        input.removeClass('is-invalid');
      });
    } else {
      var _input = $("#".concat(prefix).concat(key));

      var _formGroup = _input.parent();

      _formGroup.find('.invalid-feedback').remove();

      _input.addClass('is-invalid');

      _formGroup.append("<div class=\"invalid-feedback\">".concat(errors[key], "</div>"));

      _input.focus(function (event) {
        _formGroup.find('.invalid-feedback').remove();

        _input.removeClass('is-invalid');
      });
    }
  });
};
var removeError = function removeError(inputs) {
  if (Array.isArray(inputs)) {
    inputs.forEach(function (input) {
      var formGroup = $(input).parent();
      formGroup.find('.invalid-feedback').remove();
      $(input).removeClass('is-invalid');
    });
  } else {
    var formGroup = $(inputs).parent();
    formGroup.find('.invalid-feedback').remove();
    $(inputs).removeClass('is-invalid');
  }
};
var checkPermissions = function checkPermissions(needed, permissions) {
  if (Array.isArray(needed)) {
    var checks = [];

    for (var i = 0; i < needed.length; i++) {
      var check = false;

      for (var j = 0; j < permissions.length; j++) {
        if (permissions[j].name == needed[i]) {
          check = true;
          break;
        }
      }

      checks[needed[i]] = check;
    }

    return checks;
  } else {
    var _check = false;

    for (var _i = 0; _i < permissions.length; _i++) {
      if (permissions[_i] == needed) {
        _check = true;
        break;
      }
    }

    return _check;
  }
};

/***/ }),

/***/ "./platform/ttct/resources/assets/js/pages/topical/create-article.js":
/*!***************************************************************************!*\
  !*** ./platform/ttct/resources/assets/js/pages/topical/create-article.js ***!
  \***************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../helper */ "./platform/ttct/resources/assets/js/pages/helper.js");
/* harmony import */ var _article_create_upload_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../article-create-upload-resource */ "./platform/ttct/resources/assets/js/pages/article-create-upload-resource.js");
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }





var CreateArticle =
/*#__PURE__*/
function () {
  function CreateArticle() {
    _classCallCheck(this, CreateArticle);

    this.$thumbnail = $('#create-thumbnail');
    this.$categories = $('#create-categories');
    this.$tags = $('#create-tags');
    this.$title = $('#create-title');
    this.$excerpt = $('#create-excerpt');
    this.$content = $('#create-content');
    this.$author = $('#create-author');
    this.$createGoogleDescription = $('#create-google-description');
    this.$createGoogleKey = $('#create-google-key');
    this.$createFbDescription = $('#create-fb-description');
    this.$createFbTitle = $('#create-fb-title');
    this.$selectThumbnail = $('#select-thumbnail');
    this.$selectResources = $('#select-resources');
    this.$articlePreviewBtn = $('#article-preview'); //

    this.$modalSelectTemplate = $('#modal-select-template');
    this.$modalSelectResource = $('#modal-select-resource');
    this.$btnSubmit = $('#btn-submit');
    this.$modalUploadResourceBtnUpload = $('#modal-upload-resource-btn-upload');
    this.selectResourceIsCurrentUseFor = null;
    this.fileMode = null;
    this.editor = null;
    this.html = '';
    this.files = [];
    this.currentEditFile = null;
    this.dropify = null;
    this.thumb = null;
    this.quickInsertSetHtmlFunc = null;
    this.init();
  }

  _createClass(CreateArticle, [{
    key: "init",
    value: function init() {
      var _this = this;

      this.initFroalaEditor();
      this.initDropify();
      this.initSelect2();
      this.initSubmit();
      this.initEditor();
      this.$selectThumbnail.click(function (event) {
        event.preventDefault();
        _this.fileMode = 'image';
        _this.selectResourceIsCurrentUseFor = 'thumbnail';
      });
      this.$selectResources.click(function (event) {
        event.preventDefault();
        _this.fileMode = 'image';
        _this.selectResourceIsCurrentUseFor = 'resources';
      });
      this.$articlePreviewBtn.click(function (event) {
        event.preventDefault();
        var url = $(event.currentTarget).data('preview');

        _this.setLocalStorageData();

        if (_this.window) {
          _this.window.location.reload();
        } else {
          _this.window = window.open(url, '_blank', "location=yes,height=1000,width=1000,scrollbars=yes,status=yes");

          _this.window.onbeforeunload = function () {
            _this.window = null;
            localStorage.removeItem('data_preview');
          };
        }
      });
    }
  }, {
    key: "initFroalaEditor",
    value: function initFroalaEditor() {
      var _this2 = this;

      var setCurrentEditFile = this.setCurrentEditFile.bind(this);
      var setFileMode = this.setFileMode.bind(this);
      var processFileType = this.processFileMode.bind(this);
      var setSelectResourceIsCurrentUseFor = this.setSelectResourceIsCurrentUseFor.bind(this);
      var setQuickInsertSetHtmlFunc = this.setQuickInsertSetHtmlFunc.bind(this); // define icon template

      FroalaEditor.DefineIconTemplate('svg-icon', '[SVG]');
      FroalaEditor.DefineIconTemplate('fontawesome-icon', '<i class="[ICON]"></i>');
      FroalaEditor.DefineIconTemplate('lineawesome-icon', '<i class="[ICON]"></i>');
      FroalaEditor.DefineIconTemplate('flat-icon', '<i class="[ICON]"></i>');
      FroalaEditor.DefineIconTemplate('soc-icon', '<i class="[ICON]"></i>'); // define icon

      FroalaEditor.DefineIcon('browseImage', {
        ICON: 'flaticon2-image-file',
        template: 'flat-icon'
      });
      FroalaEditor.DefineIcon('browseVideo', {
        ICON: 'socicon-filmweb',
        template: 'soc-icon'
      });
      FroalaEditor.DefineIcon('selectTemplate', {
        ICON: 'flaticon2-download-2',
        template: 'flat-icon'
      }); //register command

      FroalaEditor.RegisterCommand('modalBrowseImage', {
        title: 'Chèn hình ảnh',
        icon: 'browseImage',
        focus: true,
        undo: true,
        refreshAfterCallback: false,
        callback: function callback() {
          _this2.selectResourceIsCurrentUseFor = 'froala';
          _this2.fileMode = 'image';

          _this2.$modalSelectResource.modal('show');
        }
      });
      FroalaEditor.RegisterCommand('modalBrowseVideo', {
        title: 'Chèn video',
        icon: 'browseVideo',
        focus: true,
        undo: true,
        refreshAfterCallback: false,
        callback: function callback() {
          _this2.selectResourceIsCurrentUseFor = 'froala';
          _this2.fileMode = 'video';

          _this2.$modalSelectResource.modal('show');
        }
      });
      FroalaEditor.RegisterCommand('modalSelectBlockHtml', {
        title: 'Chọn template',
        icon: 'selectTemplate',
        focus: true,
        undo: true,
        refreshAfterCallback: false,
        callback: function callback() {
          _this2.$modalSelectTemplate.modal('show');
        }
      });
      FroalaEditor.RegisterCommand('imageReplace', {
        title: 'Thay thế',
        focus: true,
        undo: true,
        refreshAfterCallback: false,
        callback: function callback() {
          setSelectResourceIsCurrentUseFor('froala');
          var img = this.image.get()[0];
          var model = setCurrentEditFile({
            type: 'img',
            img: img
          });
          setFileMode('image');
          processFileType();
          $(model).modal('show');
        }
      });
      FroalaEditor.RegisterCommand('videoReplace', {
        title: 'Thay thế',
        focus: true,
        undo: true,
        refreshAfterCallback: false,
        callback: function callback() {
          setSelectResourceIsCurrentUseFor('froala');
          var video = this.video.get()[0];
          var model = setCurrentEditFile({
            type: 'video',
            video: video
          });
          setFileMode('video');
          processFileType();
          $(model).modal('show');
        }
      }); // Define a button.

      FroalaEditor.RegisterQuickInsertButton('quickInsertButtonImage', {
        icon: 'browseImage',
        title: 'Chèn hình asdas',
        callback: function callback() {
          setQuickInsertSetHtmlFunc(_this2.editor.html.insert.bind(_this2.editor));
          setSelectResourceIsCurrentUseFor('froala-quick-insert');
          var model = setCurrentEditFile(null);
          setFileMode('image');
          processFileType();
          $(model).modal('show');
        },
        undo: true
      });
      FroalaEditor.RegisterQuickInsertButton('quickInsertButtonVideo', {
        icon: 'browseVideo',
        title: 'Chèn video',
        callback: function callback() {
          setQuickInsertSetHtmlFunc(this.html.insert.bind(this));
          setSelectResourceIsCurrentUseFor('froala-quick-insert');
          var model = setCurrentEditFile(null);
          setFileMode('video');
          processFileType();
          $(model).modal('show');
        },
        undo: true
      });
    }
  }, {
    key: "initEditor",
    value: function initEditor() {
      var newContent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      var oldContent = '';

      if (newContent) {
        oldContent = $('.fr-element.fr-view').html();
        this.editor.destroy();
        this.editor = null;
      }

      var content = (oldContent ? oldContent : '') + (newContent ? newContent : '');
      this.editor = new FroalaEditor('#example', {
        language: 'vi',
        toolbarInline: false,
        height: 700,
        colorsButtons: ["colorsBack"],
        toolbarButtons: ["bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "fontFamily", "fontSize", 'textColor', 'backgroundColor', "specialCharacters", "paragraphFormat", "align", "formatOL", "formatUL", "outdent", "indent", "insertLink", "popupBrowseImage", "popupBrowseVideo", "insertTable", "quote", "insertHR", "undo", "redo", "clearFormatting", "selectAll", "html", "popupInsertRelatedObject", "embedly", 'modalBrowseImage', 'modalBrowseVideo', 'modalSelectTemplate'],
        quickInsertButtons: ['quickInsertButtonImage', 'quickInsertButtonVideo'],
        imageEditButtons: ["imageDisplay", "imageAlign", "imageSize", "-", "imageRemove", 'imageReplace', 'imageCaption'],
        videoEditButtons: ["videoDisplay", "videoAlign", "videoSize", "-", "videoRemove", "videoReplace"],
        events: {
          initialized: function initialized() {
            this.html.set("<div class=\"fr-view\">".concat(content, "</div>"));
          }
        }
      });
    }
  }, {
    key: "setCurrentEditFile",
    value: function setCurrentEditFile(file) {
      this.currentEditFile = file;
      return this.$modalSelectResource;
    }
  }, {
    key: "initSubmit",
    value: function initSubmit() {
      var _this3 = this;

      this.$btnSubmit.click(function (event) {
        event.preventDefault();
        var url = $(event.currentTarget).data('url');
        var fd = new FormData();

        var categories = _this3.$categories.select2('data');

        var tags = _this3.$tags.select2('data');

        _this3.$createGoogleKey = $('#create-google-key');
        _this3.$createFbDescription = $('#create-fb-description');
        _this3.$createFbTitle = $('#create-fb-title');
        fd.append('title', _this3.$title.val());
        fd.append('author', _this3.$author.val());
        fd.append('excerpt', _this3.$excerpt.val());
        fd.append('google-description', _this3.$createGoogleDescription.val());
        fd.append('google-key', _this3.$createGoogleKey.val());
        fd.append('fb-description', _this3.$createFbDescription.val());
        fd.append('fb-title', _this3.$createFbTitle.val());
        fd.append('content', $('.fr-element.fr-view').html());
        fd.append('creator_id', _this3.$modalUploadResourceBtnUpload.data('creator-id'));
        fd.append('creator_full_name', _this3.$modalUploadResourceBtnUpload.data('creator-full-name'));
        fd.append('creator_username', _this3.$modalUploadResourceBtnUpload.data('creator-username'));
        fd.append('type', 2);
        tags.map(function (tag) {
          fd.append('tags[]', tag.id);
        });
        categories.map(function (category) {
          fd.append('categories[]', category.id);
        });

        if (_this3.thumb) {
          fd.append('thumb', _this3.thumb.id);
        } else if (_this3.$thumbnail[0].files[0]) {
          fd.append('thumbnail', _this3.$thumbnail[0].files[0]);
        }

        axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, fd).then(function (res) {
          if (res.data && res.data.message) {
            toastr.success(res.data.message);
            setTimeout(function () {// window.location.reload();
            }, 1000);
          } else {
            toastr.error('Có lỗi xảy ra, thử lại sau');
          }
        }, function (err) {
          var status = err.response.status;

          if (status === 422) {
            Object(_helper__WEBPACK_IMPORTED_MODULE_1__["showError"])('create-', err.response.data.errors);
          } else {
            toastr.error(err.response.data.message);
          }
        });
      });
    }
  }, {
    key: "initDropify",
    value: function initDropify() {
      var _this4 = this;

      this.dropify = this.$thumbnail.dropify({
        messages: {
          'default': 'Kéo và thả tệp vào đây hoặc click',
          'replace': 'Kéo và thả hoặc click để thay thế',
          'remove': 'Xóa',
          'error': 'Ooops, có lỗi bất ngờ xảy ra.'
        }
      });
      this.$thumbnail.change(function () {
        $('.dropify-clear').show();
        _this4.thumb = null;
      });
    }
  }, {
    key: "setImageDropify",
    value: function setImageDropify(img) {
      var dropify = this.dropify.data('dropify');
      dropify.settings.defaultFile = img.base_url + '/' + img.absolute_url;
      dropify.destroy();
      dropify.init();
      this.thumb = img;
      $('.dropify-clear').hide();
    }
  }, {
    key: "initSelect2",
    value: function initSelect2() {
      var _this5 = this;

      var urlGetTopical = this.$categories.data('url');
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(urlGetTopical).then(function (_ref) {
        var data = _ref.data;

        _this5.$categories.append("<option value=\"".concat(data.id, "\">").concat(data.name, "</option>"));

        _this5.$categories.select2();

        _this5.$categories.prop('disabled', true);
      }, function (err) {});
      this.$tags.select2({
        placeholder: 'Select one',
        multiple: true,
        ajax: {
          url: this.$tags.data('url'),
          dataType: 'json',
          delay: 250,
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
          },
          data: function data(params) {
            console.log(params.term);
            return {
              term: params.term,
              page: params.page
            };
          },
          processResults: function processResults(data) {
            return {
              results: $.map(data.data, function (item) {
                return {
                  text: "".concat(item.name),
                  id: item.id,
                  title: "".concat(item.name)
                };
              }),
              pagination: {
                more: data.current_page < data.total_pages
              }
            };
          },
          cache: true
        },
        escapeMarkup: function escapeMarkup(markup) {
          return markup;
        }
      });
      this.$categories.on('select2:select', function () {
        var formGroup = _this5.$categories.parent();

        formGroup.find('.invalid-feedback').remove();

        _this5.$categories.removeClass('is-invalid');
      });
      this.$tags.on('select2:select', function () {
        var formGroup = _this5.$tags.parent();

        formGroup.find('.invalid-feedback').remove();

        _this5.$tags.removeClass('is-invalid');
      });
    }
  }, {
    key: "processFileMode",
    value: function processFileMode() {
      switch (this.fileMode) {
        case 'image':
          {
            $('#modal-upload-datatable-input-file-type').find('option').toArray().forEach(function (option) {
              if (parseInt($(option).attr('value')) !== 1) {
                $(option).prop('disabled', true);
              } else {
                $(option).prop('disabled', false);
                $(option).prop('selected', true);
              }
            });
            break;
          }

        case 'video':
          {
            $('#modal-upload-datatable-input-file-type').find('option').toArray().forEach(function (option) {
              if (parseInt($(option).attr('value')) !== 2) {
                $(option).prop('disabled', true);
              } else {
                $(option).prop('disabled', false);
                $(option).prop('selected', true);
              }
            });
            break;
          }

        default:
          {
            break;
          }
      }
    }
  }, {
    key: "setFileMode",
    value: function setFileMode(value) {
      this.fileMode = value;
    }
  }, {
    key: "setSelectResourceIsCurrentUseFor",
    value: function setSelectResourceIsCurrentUseFor(target) {
      this.selectResourceIsCurrentUseFor = target;
    }
  }, {
    key: "setQuickInsertSetHtmlFunc",
    value: function setQuickInsertSetHtmlFunc(func) {
      this.quickInsertSetHtmlFunc = func;
    }
  }, {
    key: "setLocalStorageData",
    value: function setLocalStorageData() {
      var categories = this.$categories.select2('data');
      var tags = this.$tags.select2('data');
      var data = {
        title: this.$title.val(),
        author: this.$author.val(),
        excerpt: this.$excerpt.val(),
        google_description: this.$createGoogleDescription.val(),
        google_key: this.$createGoogleKey.val(),
        fb_description: this.$createFbDescription.val(),
        fb_title: this.$createFbTitle.val(),
        content: $('.fr-element.fr-view').html(),
        tags: tags.map(function (tag) {
          return tag.text;
        }),
        categories: categories.map(function (category) {
          return category.text;
        })
      };
      localStorage.setItem('data_preview', JSON.stringify(data));
    }
  }, {
    key: "getWindow",
    value: function getWindow() {
      return this.window;
    }
  }]);

  return CreateArticle;
}();

$(function () {
  var createArticle = new CreateArticle();
  new _article_create_upload_resource__WEBPACK_IMPORTED_MODULE_2__["default"](createArticle);
});

/***/ }),

/***/ 24:
/*!*********************************************************************************!*\
  !*** multi ./platform/ttct/resources/assets/js/pages/topical/create-article.js ***!
  \*********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/html/ttct_cms/platform/ttct/resources/assets/js/pages/topical/create-article.js */"./platform/ttct/resources/assets/js/pages/topical/create-article.js");


/***/ })

/******/ });