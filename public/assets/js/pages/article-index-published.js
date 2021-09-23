/******/
(function (modules) { // webpackBootstrap
    /******/ // The module cache
    /******/
    var installedModules = {};
    /******/
    /******/ // The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/
        if (installedModules[moduleId]) {
            /******/
            return installedModules[moduleId].exports;
            /******/
        }
        /******/ // Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/
            i: moduleId,
            /******/
            l: false,
            /******/
            exports: {}
            /******/
        };
        /******/
        /******/ // Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ // Flag the module as loaded
        /******/
        module.l = true;
        /******/
        /******/ // Return the exports of the module
        /******/
        return module.exports;
        /******/
    }
    /******/
    /******/
    /******/ // expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;
    /******/
    /******/ // expose the module cache
    /******/
    __webpack_require__.c = installedModules;
    /******/
    /******/ // define getter function for harmony exports
    /******/
    __webpack_require__.d = function (exports, name, getter) {
        /******/
        if (!__webpack_require__.o(exports, name)) {
            /******/
            Object.defineProperty(exports, name, { enumerable: true, get: getter });
            /******/
        }
        /******/
    };
    /******/
    /******/ // define __esModule on exports
    /******/
    __webpack_require__.r = function (exports) {
        /******/
        if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
            /******/
            Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
            /******/
        }
        /******/
        Object.defineProperty(exports, '__esModule', { value: true });
        /******/
    };
    /******/
    /******/ // create a fake namespace object
    /******/ // mode & 1: value is a module id, require it
    /******/ // mode & 2: merge all properties of value into the ns
    /******/ // mode & 4: return value when already ns object
    /******/ // mode & 8|1: behave like require
    /******/
    __webpack_require__.t = function (value, mode) {
        /******/
        if (mode & 1) value = __webpack_require__(value);
        /******/
        if (mode & 8) return value;
        /******/
        if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
        /******/
        var ns = Object.create(null);
        /******/
        __webpack_require__.r(ns);
        /******/
        Object.defineProperty(ns, 'default', { enumerable: true, value: value });
        /******/
        if (mode & 2 && typeof value != 'string')
            for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
        /******/
        return ns;
        /******/
    };
    /******/
    /******/ // getDefaultExport function for compatibility with non-harmony modules
    /******/
    __webpack_require__.n = function (module) {
        /******/
        var getter = module && module.__esModule ?
            /******/
            function getDefault() { return module['default']; } :
            /******/
            function getModuleExports() { return module; };
        /******/
        __webpack_require__.d(getter, 'a', getter);
        /******/
        return getter;
        /******/
    };
    /******/
    /******/ // Object.prototype.hasOwnProperty.call
    /******/
    __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
    /******/
    /******/ // __webpack_public_path__
    /******/
    __webpack_require__.p = "/";
    /******/
    /******/
    /******/ // Load entry module and return exports
    /******/
    return __webpack_require__(__webpack_require__.s = 2);
    /******/
})
    /************************************************************************/
    /******/
    ({

        /***/
        "./node_modules/axios/index.js":
            /*!*************************************!*\
              !*** ./node_modules/axios/index.js ***!
              \*************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                module.exports = __webpack_require__( /*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

                /***/
            }),

        /***/
        "./node_modules/axios/lib/adapters/xhr.js":
            /*!************************************************!*\
              !*** ./node_modules/axios/lib/adapters/xhr.js ***!
              \************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                var utils = __webpack_require__( /*! ./../utils */ "./node_modules/axios/lib/utils.js");
                var settle = __webpack_require__( /*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
                var buildURL = __webpack_require__( /*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
                var buildFullPath = __webpack_require__( /*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
                var parseHeaders = __webpack_require__( /*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
                var isURLSameOrigin = __webpack_require__( /*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
                var createError = __webpack_require__( /*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

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
                            var cookies = __webpack_require__( /*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");

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


                /***/
            }),

        /***/
        "./node_modules/axios/lib/axios.js":
            /*!*****************************************!*\
              !*** ./node_modules/axios/lib/axios.js ***!
              \*****************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                var utils = __webpack_require__( /*! ./utils */ "./node_modules/axios/lib/utils.js");
                var bind = __webpack_require__( /*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
                var Axios = __webpack_require__( /*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
                var mergeConfig = __webpack_require__( /*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
                var defaults = __webpack_require__( /*! ./defaults */ "./node_modules/axios/lib/defaults.js");

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
                axios.Cancel = __webpack_require__( /*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
                axios.CancelToken = __webpack_require__( /*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
                axios.isCancel = __webpack_require__( /*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

                // Expose all/spread
                axios.all = function all(promises) {
                    return Promise.all(promises);
                };
                axios.spread = __webpack_require__( /*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

                module.exports = axios;

                // Allow use of default import syntax in TypeScript
                module.exports.default = axios;


                /***/
            }),

        /***/
        "./node_modules/axios/lib/cancel/Cancel.js":
            /*!*************************************************!*\
              !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
              \*************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

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


                /***/
            }),

        /***/
        "./node_modules/axios/lib/cancel/CancelToken.js":
            /*!******************************************************!*\
              !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
              \******************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                var Cancel = __webpack_require__( /*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

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


                /***/
            }),

        /***/
        "./node_modules/axios/lib/cancel/isCancel.js":
            /*!***************************************************!*\
              !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
              \***************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                module.exports = function isCancel(value) {
                    return !!(value && value.__CANCEL__);
                };


                /***/
            }),

        /***/
        "./node_modules/axios/lib/core/Axios.js":
            /*!**********************************************!*\
              !*** ./node_modules/axios/lib/core/Axios.js ***!
              \**********************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                var utils = __webpack_require__( /*! ./../utils */ "./node_modules/axios/lib/utils.js");
                var buildURL = __webpack_require__( /*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
                var InterceptorManager = __webpack_require__( /*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
                var dispatchRequest = __webpack_require__( /*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
                var mergeConfig = __webpack_require__( /*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");

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
                    Axios.prototype[method] = function (url, config) {
                        return this.request(utils.merge(config || {}, {
                            method: method,
                            url: url
                        }));
                    };
                });

                utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
                    /*eslint func-names:0*/
                    Axios.prototype[method] = function (url, data, config) {
                        return this.request(utils.merge(config || {}, {
                            method: method,
                            url: url,
                            data: data
                        }));
                    };
                });

                module.exports = Axios;


                /***/
            }),

        /***/
        "./node_modules/axios/lib/core/InterceptorManager.js":
            /*!***********************************************************!*\
              !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
              \***********************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                var utils = __webpack_require__( /*! ./../utils */ "./node_modules/axios/lib/utils.js");

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


                /***/
            }),

        /***/
        "./node_modules/axios/lib/core/buildFullPath.js":
            /*!******************************************************!*\
              !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
              \******************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                var isAbsoluteURL = __webpack_require__( /*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
                var combineURLs = __webpack_require__( /*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

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


                /***/
            }),

        /***/
        "./node_modules/axios/lib/core/createError.js":
            /*!****************************************************!*\
              !*** ./node_modules/axios/lib/core/createError.js ***!
              \****************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                var enhanceError = __webpack_require__( /*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

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


                /***/
            }),

        /***/
        "./node_modules/axios/lib/core/dispatchRequest.js":
            /*!********************************************************!*\
              !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
              \********************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                var utils = __webpack_require__( /*! ./../utils */ "./node_modules/axios/lib/utils.js");
                var transformData = __webpack_require__( /*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
                var isCancel = __webpack_require__( /*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
                var defaults = __webpack_require__( /*! ../defaults */ "./node_modules/axios/lib/defaults.js");

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


                /***/
            }),

        /***/
        "./node_modules/axios/lib/core/enhanceError.js":
            /*!*****************************************************!*\
              !*** ./node_modules/axios/lib/core/enhanceError.js ***!
              \*****************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

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

                    error.toJSON = function () {
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


                /***/
            }),

        /***/
        "./node_modules/axios/lib/core/mergeConfig.js":
            /*!****************************************************!*\
              !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
              \****************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                var utils = __webpack_require__( /*! ../utils */ "./node_modules/axios/lib/utils.js");

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


                /***/
            }),

        /***/
        "./node_modules/axios/lib/core/settle.js":
            /*!***********************************************!*\
              !*** ./node_modules/axios/lib/core/settle.js ***!
              \***********************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                var createError = __webpack_require__( /*! ./createError */ "./node_modules/axios/lib/core/createError.js");

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


                /***/
            }),

        /***/
        "./node_modules/axios/lib/core/transformData.js":
            /*!******************************************************!*\
              !*** ./node_modules/axios/lib/core/transformData.js ***!
              \******************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                var utils = __webpack_require__( /*! ./../utils */ "./node_modules/axios/lib/utils.js");

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


                /***/
            }),

        /***/
        "./node_modules/axios/lib/defaults.js":
            /*!********************************************!*\
              !*** ./node_modules/axios/lib/defaults.js ***!
              \********************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";
                /* WEBPACK VAR INJECTION */
                (function (process) {

                    var utils = __webpack_require__( /*! ./utils */ "./node_modules/axios/lib/utils.js");
                    var normalizeHeaderName = __webpack_require__( /*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");

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
                            adapter = __webpack_require__( /*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
                        } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
                            // For node use HTTP adapter
                            adapter = __webpack_require__( /*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
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

                    /* WEBPACK VAR INJECTION */
                }.call(this, __webpack_require__( /*! ./../../process/browser.js */ "./node_modules/process/browser.js")))

                /***/
            }),

        /***/
        "./node_modules/axios/lib/helpers/bind.js":
            /*!************************************************!*\
              !*** ./node_modules/axios/lib/helpers/bind.js ***!
              \************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

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


                /***/
            }),

        /***/
        "./node_modules/axios/lib/helpers/buildURL.js":
            /*!****************************************************!*\
              !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
              \****************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                var utils = __webpack_require__( /*! ./../utils */ "./node_modules/axios/lib/utils.js");

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


                /***/
            }),

        /***/
        "./node_modules/axios/lib/helpers/combineURLs.js":
            /*!*******************************************************!*\
              !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
              \*******************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                /**
                 * Creates a new URL by combining the specified URLs
                 *
                 * @param {string} baseURL The base URL
                 * @param {string} relativeURL The relative URL
                 * @returns {string} The combined URL
                 */
                module.exports = function combineURLs(baseURL, relativeURL) {
                    return relativeURL ?
                        baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '') :
                        baseURL;
                };


                /***/
            }),

        /***/
        "./node_modules/axios/lib/helpers/cookies.js":
            /*!***************************************************!*\
              !*** ./node_modules/axios/lib/helpers/cookies.js ***!
              \***************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                var utils = __webpack_require__( /*! ./../utils */ "./node_modules/axios/lib/utils.js");

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
                                write: function write() { },
                                read: function read() { return null; },
                                remove: function remove() { }
                            };
                        })()
                );


                /***/
            }),

        /***/
        "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
            /*!*********************************************************!*\
              !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
              \*********************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

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


                /***/
            }),

        /***/
        "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
            /*!***********************************************************!*\
              !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
              \***********************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                var utils = __webpack_require__( /*! ./../utils */ "./node_modules/axios/lib/utils.js");

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
                                        urlParsingNode.pathname : '/' + urlParsingNode.pathname
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


                /***/
            }),

        /***/
        "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
            /*!***************************************************************!*\
              !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
              \***************************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                var utils = __webpack_require__( /*! ../utils */ "./node_modules/axios/lib/utils.js");

                module.exports = function normalizeHeaderName(headers, normalizedName) {
                    utils.forEach(headers, function processHeader(value, name) {
                        if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
                            headers[normalizedName] = value;
                            delete headers[name];
                        }
                    });
                };


                /***/
            }),

        /***/
        "./node_modules/axios/lib/helpers/parseHeaders.js":
            /*!********************************************************!*\
              !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
              \********************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                var utils = __webpack_require__( /*! ./../utils */ "./node_modules/axios/lib/utils.js");

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


                /***/
            }),

        /***/
        "./node_modules/axios/lib/helpers/spread.js":
            /*!**************************************************!*\
              !*** ./node_modules/axios/lib/helpers/spread.js ***!
              \**************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

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


                /***/
            }),

        /***/
        "./node_modules/axios/lib/utils.js":
            /*!*****************************************!*\
              !*** ./node_modules/axios/lib/utils.js ***!
              \*****************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                "use strict";


                var bind = __webpack_require__( /*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

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
                    return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor) &&
                        typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
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
                function merge( /* obj1, obj2, obj3, ... */) {
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
                function deepMerge( /* obj1, obj2, obj3, ... */) {
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


                /***/
            }),

        /***/
        "./node_modules/process/browser.js":
            /*!*****************************************!*\
              !*** ./node_modules/process/browser.js ***!
              \*****************************************/
            /*! no static exports found */
            /***/
            (function (module, exports) {

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

                function defaultClearTimeout() {
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
                }())

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
                    } catch (e) {
                        try {
                            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
                            return cachedSetTimeout.call(null, fun, 0);
                        } catch (e) {
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
                    } catch (e) {
                        try {
                            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
                            return cachedClearTimeout.call(null, marker);
                        } catch (e) {
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
                    while (len) {
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

                function noop() { }

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
                process.umask = function () { return 0; };


                /***/
            }),

        /***/
        "./platform/ttct/resources/assets/js/pages/article-index-published.js":
            /*!****************************************************************************!*\
              !*** ./platform/ttct/resources/assets/js/pages/article-index-published.js ***!
              \****************************************************************************/
            /*! no exports provided */
            /***/
            (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony import */
                var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! axios */ "./node_modules/axios/index.js");
                /* harmony import */
                var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
                /* harmony import */
                var _helper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! ./helper */ "./platform/ttct/resources/assets/js/pages/helper.js");

                function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

                function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

                function _defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        if ("value" in descriptor) descriptor.writable = true;
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }

                function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }



                /**
                 * @author        Giang Nguyen
                 * @description Class ArticleIndexPublished
                 */

                var ArticleIndexPublished =
                    /*#__PURE__*/
                    function () {
                        function ArticleIndexPublished() {
                            _classCallCheck(this, ArticleIndexPublished);

                            this.$userInfo = $('#user-info');
                            this.$articleTable = $('#article-published-table');
                            this.$searchKey = $('#search-key');
                            this.$searchFrom = $('#search-from');
                            this.$searchTo = $('#search-to');
                            this.$searchCategory = $('#search-category');
                            this.$searchTheme = $('#search-theme');
                            this.$searchToId = $('#search-to-id');
                            this.$searchCreator = $('#search-creator');
                            this.$searchAuthor = $('#search-author');
                            this.$searchBtn = $('#search');
                            this.$addNewThemeBtn = $('#add-new-theme-btn');
                            this.$saveThemeBtn = $('#save-theme');
                            this.$searchMultipleTheme = $('#search-multiple-theme');
                            this.$themeArticleTable = $('#theme-article-table');
                            this.$btnClose = $('.close');
                            this.datatable = null;
                            this.acl = null;
                            this.init();
                        }

                        _createClass(ArticleIndexPublished, [{
                            key: "init",
                            value: function init() {
                                var _this = this;
                                
                                this.initGetAcl();
                                this.initTakeDown();
                                this.selectTheme();
                                this.initSetPriority();
                                this.initSelect2();
                                this.initUpdateItemTheme();
                                this.removeTheme();
                                this.addNewTheme();
                                this.saveTheme();
                                this.initPickDate();
                                this.initEdit();
                                this.initRemoveProcessing();
                                this.initUpdateArticleCategoryPublished();
                                this.$btnClose.click(function(){
                                    $('.dd .dd-list').html('');
                                })
                                this.$searchBtn.click(function (event) {
                                    event.preventDefault();

                                    _this.datatable.search();
                                });
                            }
                        }, {
                            key: "initGetAcl",
                            value: function initGetAcl() {
                                var _this2 = this;

                                axios__WEBPACK_IMPORTED_MODULE_0___default.a.get($('body').data('acl')).then(function (res) {
                                    _this2.acl = res.data;

                                    _this2.initDatatable();
                                });
                            }
                        }, {
                            key: "initDatatable",
                            value: function initDatatable() {
                                var _this3 = this,
                                    _query;
                                this.datatable = this.$articleTable.KTDatatable({
                                    data: {
                                        type: 'remote',
                                        source: {
                                            read: {
                                                url: this.$articleTable.data('url'),
                                                headers: {
                                                    'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
                                                },
                                                params: {
                                                    query: (_query = {
                                                        status: function status() {
                                                            return 10;
                                                        }
                                                    }, _defineProperty(_query, 'search-key', function searchKey() {
                                                        return _this3.$searchKey.val();
                                                    }), _defineProperty(_query, "category", function category() {
                                                        return _this3.$searchCategory.select2('data').length > 0 ? _this3.$searchCategory.select2('data')[0].id : null;
                                                    }), _defineProperty(_query, "theme", function theme() {
                                                        return _this3.$searchTheme.select2('data').length > 0 ? _this3.$searchTheme.select2('data')[0].id : null;
                                                    }), _defineProperty(_query, "creator", function creator() {
                                                        return _this3.$searchCreator.select2('data').length > 0 ? _this3.$searchCreator.select2('data')[0].id : null;
                                                    }), _defineProperty(_query, "from", function from() {
                                                        return _this3.$searchFrom.val();
                                                    }), _defineProperty(_query, "to", function to() {
                                                        return _this3.$searchTo.val();
                                                    }), _defineProperty(_query, "author", function author() {
                                                        return _this3.$searchAuthor.val();
                                                    }), _defineProperty(_query, 'search-to-id', function searchToId() {
                                                        return _this3.$searchToId.val();
                                                    }), _query),
                                                    sort: {
                                                        field: 'published_at',
                                                        type: 'desc'
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
                                        footer: true
                                    },
                                    sortable: true,
                                    pagination: true,
                                    search: {
                                        input: this.$searchKey
                                    },
                                    rows: {
                                        autoHide: true
                                    },
                                    columns: [
                                        {
                                            field: 'slug',
                                            title: 'TIÊU ĐỀ',
                                            width: 330,
                                            type: 'string',
                                            selector: false,
                                            autoHide: false,
                                            textAlign: 'left',
                                            template: function template(row) {

                                                return "<strong>".concat(row.title, "</strong>");
                                            }
                                        }, {
                                            field: 'categories',
                                            title: 'CHUYÊN MỤC',
                                            sortable: false,
                                            width: 250,
                                            type: 'string',
                                            selector: false,
                                            textAlign: 'left',
                                            template: function template(row) {

                                                let elementCate = `<select data-id=${row.id} class = 'form-control select-categories'>`;
                                                let id = null;
                                                if (row.categories && row.categories[0] != undefined) {
                                                    id = row.categories[0].id;
                                                }
                                                elementCate += `<option  value ='124' ${(id == 124) ? 'selected' : 'undefined'}>TTCT - Văn hóa Giải trí</option> <option   value ='702'   ${(id == 702) ? 'selected' : 'undefined'}>TTCT - Vấn đề - Sự kiện</option> <option value= '705' data-id=${row.id}   ${(id == 705) ? 'selected' : 'undefined'}>TTCT - Cuộc sống muôn màu</option><option  ${(id == null) ? 'selected' : 'underfined'}>N/A</option>`;
                                                elementCate += "</select>";
                                                return elementCate;

                                            }
                                        },
                                        {
                                            field: 'themes',
                                            title: 'CHỦ ĐỀ ',
                                            sortable: false,
                                            width: 250,
                                            type: 'string',
                                            selector: false,
                                            textAlign: 'left',
                                            template: function template(row) {
                                                return `<select  disable='true' class=" form-control  update-themes-${row.id}"  multiple ="multiple"  name="tags"></select>`;
                                            }
                                        },

                                        {
                                            field: '',
                                            title: '',
                                            sortable: false,
                                            width: 0,
                                            type: 'string',
                                            selector: false,
                                            textAlign: 'left',
                                            template: function template(row) {
                                                let $updateTheme = $(`.update-themes-${row.id}`).select2({
                                                    allowClear: false,
                                                    disabled: true

                                                });
                                                let themes = row.themes;
                                                let valueTheme = themes.map(function (theme) {
                                                    let option = new Option(theme.name, theme.id);
                                                    $updateTheme.append(option);
                                                    return theme.id;
                                                });
                                                $updateTheme.val(valueTheme).trigger('change');
                                                //  start  style css
                                                $('.select2-container').css('width', '250px');
                                                // end  style css


                                            }
                                        },

                                        {
                                            field: 'creator',
                                            title: 'NGƯỜI TẠO',
                                            sortable: false,
                                            width: 100,
                                            type: 'string',
                                            selector: false,
                                            textAlign: 'left',
                                            template: function template(row) {
                                                return row.creator.username ? "<strong>".concat(row.creator.username, "</strong>") : 'N/A';
                                            }
                                        }, {
                                            field: 'priority',
                                            title: 'NỔI BẬT',
                                            sortable: true,
                                            width: 150,
                                            type: 'string',
                                            selector: false,
                                            textAlign: 'center',
                                            template: function template(row) {

                                                var permissions = Object(_helper__WEBPACK_IMPORTED_MODULE_1__["checkPermissions"])(['article-update', 'article-publish', 'article-restore', 'article-take-down', 'article-feature-update'], _this3.acl.permissions);
                                                var categories = row.categories;
                                                if (!row.not_time && categories != '') {
                                                    if (permissions['article-feature-update']) {
                                                        return "<select class=\"form-control priority-select\" data-id=\"".concat(row.id, "\">\n                                ").concat(row.priority === 0 ? "<option ".concat(parseInt(row.priority) === 0 ? 'selected' : '', " value=\"0\">N/A</option>") : '', "\n                                <option ").concat(parseInt(row.priority) === 1 ? 'selected' : '', " value=\"1\">N\u1ED5i b\u1EADt 1</option>\n                                <option ").concat(parseInt(row.priority) === 2 ? 'selected' : '', " value=\"2\">N\u1ED5i b\u1EADt 2</option>\n                                <option ").concat(parseInt(row.priority) === 3 ? 'selected' : '', " value=\"3\">N\u1ED5i b\u1EADt 3</option>\n                                <option ").concat(parseInt(row.priority) === 4 ? 'selected' : '', " value=\"4\">N\u1ED5i b\u1EADt 4</option>\n                            </select>");
                                                    } else {
                                                        return "<strong style=\"font-size: 15px\" class=\"".concat(parseInt(row.priority) > 0 ? 'kt-badge  kt-badge--primary kt-badge--inline kt-badge--pill' : '', "\">").concat(parseInt(row.priority) === 0 ? 'N/A' : row.priority, "</strong>");
                                                    }
                                                } else {
                                                    if (categories != '') {
                                                        return "<span>Tin chưa tới giờ xuất bản</span>";

                                                    } else {
                                                        return '<span>Bài bị 404</span>';
                                                    }

                                                }
                                            }
                                        },
                                        //  tam an sau khi co web push se mo lai cho phep gui tin den  ban doc 
                                        // {
                                        //     field: 'send-article',
                                        //     title: 'ĐÃ GỬI  BẠN ĐỌC ',
                                        //     sortable: true,
                                        //     width: 150,
                                        //     type: 'string',
                                        //     selector: false,
                                        //     textAlign: 'center',
                                        //     template: function template(row) {
                                        //         var html = '';
                                        //         var categories = row.categories;
                                        //         var id = row.id;
                                        //         var slugArticle = row.slug;
                                        //         if (categories != '') {
                                        //             var slugCate = categories[0]['slug'];
                                        //             var url = slugCate + '/' + slugArticle + '-' + id + '.html';
                                        //             html += "<select class='form-control select-status-send-article' url='" + url + "' id='" + id + "' title='" + row.title + "'>".concat(parseInt(row.send_article_status) > 0 ? "<option>Đã gửi</option>" : "<option>Chưa gửi</option><option value='1'>Gửi</option>") + "</select>";
                                        //         } else {
                                        //             html += "<strong>Bài bị 404</strong>";
                                        //         }
                                        //         return html;
                                        //     }
                                        // },
                                        {
                                            field: 'created_at',
                                            title: 'NGÀY TẠO',
                                            width: 100,
                                            type: 'string',
                                            sort: 'desc',
                                            selector: false,
                                            textAlign: 'center',
                                            template: function template(row) {
                                                return "<p style=\"color: black\">".concat(row.created_at ? row.created_at : 'N/A', "</p>");
                                            }
                                        }, {
                                            field: 'published_at',
                                            title: 'XUẤT BẢN',
                                            width: 100,
                                            type: 'string',
                                            sort: 'desc',
                                            sortable: true,
                                            selector: false,
                                            textAlign: 'center',
                                            template: function template(row) {
                                                return "<p style=\"color: black\">".concat(row.published_at ? row.published_at : 'N/A', "</p>");
                                            }
                                        }, {
                                            field: 'action',
                                            title: '!!!',
                                            sortable: false,
                                            width: 50,
                                            textAlign: 'center',
                                            overflow: 'visible',
                                            template: function template(row) {
                                                if (_this3.acl) {
                                                    var permissions = Object(_helper__WEBPACK_IMPORTED_MODULE_1__["checkPermissions"])(['article-update', 'article-publish', 'article-restore', 'article-take-down', 'article-feature-update'], _this3.acl.permissions);
                                                    var adminitrator = _this3.acl.role.name;
                                                    var editUrl = _this3.$articleTable.data('edit');
                                                    editUrl = editUrl.slice(0, editUrl.lastIndexOf('/') + 1) + row.id;
                                                    var tk = '';
                                                    var edit = '';
                                                    var editTheme = '';
                                                    var removeProcessing = '';
                                                    tk = permissions['article-take-down'] ? "<a class=\"dropdown-item take-down font-weight-bold\" href=\"#\" data-status=\"".concat(row.status_tk, "\" data-tk=\"").concat(row.url_tk, "\" data-id=\"").concat(row.id, "\"><i class=\"la la-close\"></i> G\u1EE1 b\xE0i vi\u1EBFt</a>") : '';
                                                    edit = permissions['article-update'] ? "<a class=\"dropdown-item edit font-weight-bold\" href=\"".concat(editUrl, "\" data-id=\"").concat(row.id, "\"><i class=\"la la-edit\"></i> C\u1EADp nh\u1EADt</a>") : '';
                                                    editTheme = permissions['article-update'] ? "<a data-toggle='modal' data-target='.bd-modal-theme' class=\"dropdown-item  update-item-theme font-weight-bold\" href=\"javascript:void(0)\" data-status=\"".concat('', "\" data-id=\"").concat(row.id, "\"><i class=\"la la-edit\"></i>Cập nhật chủ đề</a>") : '';
                                                    return (tk + edit + editTheme + removeProcessing).length > 0 ? "<div class=\"dropdown\">\n<a href=\"javascript:;\" class=\"btn btn-sm btn-clean btn-icon btn-icon-sm\" style=\"cursor: pointer\" data-toggle=\"dropdown\">\n <i class=\"flaticon2-console\"></i>\n</a>\n<div class=\"dropdown-menu dropdown-menu-right\">\n".concat(tk, "\n  ").concat(edit, "\n").concat(editTheme, "\n").concat(removeProcessing, "\n</div>\n</div>") : '';
                                                }

                                            }
                                        }
                                    ]
                                });
                            }
                        }, {
                            key: "selectTheme",
                            value: function selectTheme() {
                                let _this3 = this;

                                _this3.$searchMultipleTheme.select2({
                                    placeholder: 'Select one',
                                    tags: true,
                                    allowClear:  true,
                                    ajax: {
                                        url: '/tags/select-tag',
                                        dataType: 'json',
                                        delay: 250,
                                        method: 'POST',
                                        headers: {
                                            'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
                                        },
                                        data: function data(params) {
                                            return {
                                                term: params.term,
                                                page: params.page,
                                                type: 2
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

                                let styleCss = {
                                    'color': '#6c7293',
                                    'font-weight': 400
                                };
                                $('.select2-selection__choice').css(styleCss);
                                $('.select2-results__option').css(styleCss);
                            }
                        },
                        {
                            key: 'addNewTheme',
                            value: function addNewTheme() {
                                var _this4 = this;
                                var html = null;
                                _this4.$addNewThemeBtn.click(function () {
                                    var selectTheme = _this4.$searchMultipleTheme.select2('data');
                                    var isExistsTheme = false;
                                    if (selectTheme != undefined && selectTheme != null) {
                                        var idsTheme = $('.dd').nestable('serialize');
                                        if (idsTheme != undefined) {
                                            for (var i = 0; i < idsTheme.length; i++) {
                                                if (idsTheme[i].id == selectTheme[0].id) {
                                                    isExistsTheme = true;
                                                }
                                            }
                                            if (!isExistsTheme) {
                                                html = selectTheme.map(function (item, index) {
                                                    return `<li class='dd-item' data-id=${item.id}>
                                                            <div  class='dd-handle' style='color: red'>${item.text}</div>
                                                                <div class="btn btn-danger delete-item btn-icon" data-id=${item.id} style="cursor: pointer;margin-left:100%;position:absolute;margin-top:-50px">
                                                                <i class="la la-trash"></i>
                                                            </div>
                                                         </li>`;
                                                });
                                                $('.dd .dd-list').append(html);
                                                _this4.$searchMultipleTheme.val(null).trigger('change');
                                            } else {
                                                alert("Chủ đề đã được chọn");
                                            }

                                        }

                                    }
                                })
                            }
                        },

                        {
                            key: "initUpdateItemTheme",
                            value: function initUpdateItemTheme() {
                                var _this5 = this;
                                $(document).on('click', '.update-item-theme', function () {
                                    var article_id = $(this).attr('data-id');
                                    var dataThemeSelect2 = $(`.update-themes-${article_id}`).select2('data');
                                    var html = '';
                                    $('#modal-update-theme').show(); // show popup theme
                                    if (dataThemeSelect2 != undefined) {
                                        $('.dd').nestable({});
                                        $('.dd').attr('data-id', article_id);
                                        if (dataThemeSelect2 != null && dataThemeSelect2.length > 0) {
                                            dataThemeSelect2.map(function (item, key) {
                                                $('.dd .dd-list').append(`
                                                    <li class='dd-item' data-id=${item.id}>
                                                        <div  class='dd-handle' style='color: red'>${item.text}</div>
                                                        <div class="btn btn-danger delete-item btn-icon" data-id="${item.id}" style="cursor: pointer;margin-left:100%;position:absolute;margin-top:-50px">
                                                            <i class="la la-trash"></i>
                                                        </div>
                                                    </li>`);
                                            });

                                        }

                                    }

                                });
                            }
                        },
                        {
                            key: 'removeTheme',
                            value: function removeTheme() {

                                $(document).on('click', '.delete-item', function () {
                                    var _this9 = this;
                                    swal.fire({
                                        title: 'Xác nhận xóa chủ đề này ra khỏi bài tin ?',
                                        text: 'Xác nhận xóa !',
                                        type: 'warning',
                                        showCancelButton: true,
                                        confirmButtonText: 'OK',
                                        cancelButtonText: 'Hủy',
                                        reverseButtons: true

                                    }).then(function (result) {
                                        if (result.value) {
                                            $(_this9).parent().remove();
                                        }
                                    });
                                });

                            }
                        }, {
                            key: 'saveTheme',
                            value: function saveTheme() {
                                var _this10 = this;
                                _this10.$saveThemeBtn.click(function () {
                                    var dd = $('.dd');
                                    var postId = dd.attr('data-id');
                                    var ids = dd.nestable('serialize');
                                    if (postId != undefined && ids != undefined && postId.length != null && ids.length != 0) {
                                        var fd = new FormData();
                                        ids.map(function (item) {
                                            fd.append('themes[]', parseInt(`${item.id}`));
                                        });

                                        $.ajax({
                                            url: `/articles/update-article-theme-published/` + postId,
                                            method: 'POST',
                                            dataType: 'Json',
                                            contentType: false,
                                            headers: {
                                                'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
                                            },
                                            data: fd,
                                            processData: false,
                                            success: function name(res) {
                                                toastr.success(res.message);
                                               _this10.datatable.reload();
                                             
                                               $('.dd .dd-list').html('');

                                            },
                                            error: function (error) {
                                                console.log(error);
                                            }

                                        });
                                    }else {

                                        alert('Tin phải có  ít nhất  một chủ đề');
                                    }
                                })
                            }
                        },
                        {
                            key: "initTakeDown",
                            value: function initTakeDown() {
                                var _this4 = this;

                                $(document).on('click', '.take-down', function (event) {
                                    event.preventDefault();
                                    var url = $(event.currentTarget).data('tk');
                                    var status = $(event.currentTarget).data('status');
                                    var editor = $(event.currentTarget).data('editor');
                                    var id = $(event.currentTarget).data('id');
                                    var urlUpdateEditor = _this4.$articleTable.data('update-article-editor') + id;
                                    swal.fire({
                                        title: 'Xác nhận gỡ bài?',
                                        text: "Gỡ bài viết này!",
                                        type: 'warning',
                                        showCancelButton: true,
                                        confirmButtonText: 'OK',
                                        cancelButtonText: 'Hủy',
                                        reverseButtons: true
                                    }).then(function (result) {
                                        if (result.value) {
                                            if (editor !== undefined) {
                                                axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(urlUpdateEditor).then(function () {
                                                    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, {
                                                        status: status,
                                                        from_user: _this4.$userInfo.data('id'),
                                                        from_user_full_name: _this4.$userInfo.data('full-name'),
                                                        from_user_username: _this4.$userInfo.data('username')
                                                    }).then(function (value) {
                                                        toastr.success(value.data.message);

                                                        _this4.datatable.load();
                                                    }, function (err) {
                                                        var status = err.response.status;

                                                        if (status === 404 || status === 500) {
                                                            toastr.error(err.response.data.message);
                                                        }
                                                    });
                                                }, function (err) {
                                                    var status = err.response.status;

                                                    if (status === 404 || status === 500) {
                                                        toastr.error(err.response.data.message);
                                                    }
                                                });
                                            } else {
                                                axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, {
                                                    status: status,
                                                    from_user: _this4.$userInfo.data('id'),
                                                    from_user_full_name: _this4.$userInfo.data('full-name'),
                                                    from_user_username: _this4.$userInfo.data('username')
                                                }).then(function (_ref) {
                                                    var data = _ref.data;
                                                    toastr.success(data.message);

                                                    _this4.datatable.load();
                                                }, function (err) {
                                                    var status = err.response.status;

                                                    if (status === 404 || status === 500) {
                                                        toastr.error(err.response.data.message);
                                                    }
                                                });
                                            }
                                        }
                                    });
                                });
                            }
                        }, {
                            key: "initSetPriority",
                            value: function initSetPriority() {
                                var _this5 = this;

                                $(document).on('change', '.priority-select', function (event) {
                                    var value = $(event.target).val();
                                    var id = $(event.target).data('id');
                                    var url = _this5.$articleTable.data('update-priority') + id;

                                    if (parseInt(value) > 0) {
                                        Object(_helper__WEBPACK_IMPORTED_MODULE_1__["showBlock"])();
                                        axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, {
                                            priority: value
                                        }).then(function (res) {
                                            toastr.success(res.data.message);

                                            _this5.datatable.reload();

                                            Object(_helper__WEBPACK_IMPORTED_MODULE_1__["hideBlock"])();
                                        }, function (err) {
                                            toastr.error(err.response.data.message);
                                            Object(_helper__WEBPACK_IMPORTED_MODULE_1__["hideBlock"])();
                                        });
                                    }
                                });
                            }
                        }, {
                            key: "initUpdateArticleCategoryPublished",
                            value: function initUpdateArticleCategoryPublished() {
                                let _this12 = this;
                                $(document).on('change', '.select-categories', function () {

                                    let fd = new FormData();
                                    let cate_id = parseInt($(this).val());
                                    let article_id = parseInt($(this).attr('data-id'));
                                    let cate_list_id = [124, 702, 705];
                                    let is_in_cate = cate_list_id.includes(cate_id);
                                    fd.append('categories', cate_id);
                                    if (cate_id != undefined && article_id != undefined && is_in_cate) {
                                        swal.fire({
                                            title: 'Bạn có muốn cập nhật  mục cho bài này',
                                            text: "Thông báo",
                                            type: 'warning',
                                            showCancelButton: true,
                                            confirmButtonText: 'OK',
                                            cancelButtonText: 'Hủy',
                                            reverseButtons: true
                                        }).then(function (confirm) {
                                            if (confirm.value) {
                                                $.ajax({
                                                    url: `/articles/update-article-category/` + article_id,
                                                    method: 'POST',
                                                    dataType: 'Json',
                                                    contentType: false,
                                                    headers: {
                                                        'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
                                                    },
                                                    data: fd,
                                                    processData: false,
                                                    success: function name(res) {
                                                        toastr.success(res.message);
                                                        _this12.datatable.reload();
                                                    }

                                                });
                                            }
                                        });

                                    }
                                });

                            }
                        }, {
                            key: "initSelect2",
                            value: function initSelect2() {
                                this.$searchCategory.select2({
                                    allowClear: true,
                                    placeholder: 'Chọn chuyên mục',
                                    ajax: {
                                        url: this.$searchCategory.data('url'),
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
                                                page: params.page,
                                                type: 1
                                            };
                                        },
                                        processResults: function processResults(data) {
                                            Array.prototype.push.apply(data.data, [{ name: 'N/A', id: 10, slug: 'N/A' }]);
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
                                this.$searchTheme.select2({
                                    allowClear: true,
                                    placeholder: 'Chọn chủ đề',
                                    ajax: {
                                        url: this.$searchTheme.data('url'),
                                        dataType: 'json',
                                        delay: 250,
                                        method: 'POST',
                                        headers: {
                                            'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
                                        },
                                        data: function data(params) {
                                            return {
                                                term: params.term,
                                                page: params.page,
                                                type: 2
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
                                this.$searchCreator.select2({
                                    allowClear: true,
                                    placeholder: 'Chọn người tạo',
                                    ajax: {
                                        url: this.$searchCreator.data('url'),
                                        dataType: 'json',
                                        delay: 250,
                                        method: 'POST',
                                        headers: {
                                            'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
                                        },
                                        data: function data(params) {
                                            return {
                                                term: params.term,
                                                page: params.page,
                                                all: 1
                                            };
                                        },
                                        processResults: function processResults(data) {
                                            return {
                                                results: $.map(data.data, function (item) {
                                                    return {
                                                        text: "".concat(item.username, " | ").concat(item.first_name, " ").concat(item.last_name),
                                                        id: item.id,
                                                        title: "".concat(item.username)
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
                            }
                        }, {
                            key: "initPickDate",
                            value: function initPickDate() {
                                var _this6 = this;

                                this.$searchFrom.datepicker({
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
                                this.$searchTo.datepicker({
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
                                this.$searchFrom.change(function (event) {
                                    var val = $(event.target).val();

                                    _this6.$searchTo.datepicker('setStartDate', val.replace('/', '-'));
                                });
                                this.$searchTo.change(function (event) {
                                    var val = $(event.target).val();

                                    _this6.$searchFrom.datepicker('setEndDate', val.replace('/', '-'));
                                });
                            }
                        }, {
                            key: "initEdit",
                            value: function initEdit() {
                                var _this7 = this;

                                $(document).on('click', '.edit', function (event) {
                                    event.preventDefault();
                                    var url = $(event.currentTarget).attr('href');
                                    var id = $(event.currentTarget).data('id');
                                    var urlUpdateEditor = _this7.$articleTable.data('update-article-editor') + id;
                                    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(urlUpdateEditor, {
                                        user_id: _this7.$userInfo.data('id'),
                                        user_full_name: _this7.$userInfo.data('full-name'),
                                        username: _this7.$userInfo.data('username')
                                    }).then(function (res) {
                                        window.location.href = url;
                                    }, function (err) {
                                        window.location.href = url;
                                    });
                                });
                            }
                        }, {
                            key: "initRemoveProcessing",
                            value: function initRemoveProcessing() {
                                var _this8 = this;

                                $(document).on('click', '.remove-processing', function (event) {
                                    event.preventDefault();
                                    var id = $(event.currentTarget).data('id');
                                    var urlUpdateEditor = _this8.$articleTable.data('update-article-editor') + id;
                                    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(urlUpdateEditor).then(function (_ref2) {
                                        var data = _ref2.data;
                                        toastr.success(data.message);

                                        _this8.datatable.reload();
                                    }, function (err) {
                                        toastr.error(err.response.data.messgae);
                                    });
                                });
                            }
                        }]);

                        return ArticleIndexPublished;
                    }();

                $(function () {
                    new ArticleIndexPublished();
                });

                /***/
            }),

        /***/
        "./platform/ttct/resources/assets/js/pages/helper.js":
            /*!***********************************************************!*\
              !*** ./platform/ttct/resources/assets/js/pages/helper.js ***!
              \***********************************************************/
            /*! exports provided: showBlock, hideBlock, showError, removeError, checkPermissions */
            /***/
            (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */
                __webpack_require__.d(__webpack_exports__, "showBlock", function () { return showBlock; });
                /* harmony export (binding) */
                __webpack_require__.d(__webpack_exports__, "hideBlock", function () { return hideBlock; });
                /* harmony export (binding) */
                __webpack_require__.d(__webpack_exports__, "showError", function () { return showError; });
                /* harmony export (binding) */
                __webpack_require__.d(__webpack_exports__, "removeError", function () { return removeError; });
                /* harmony export (binding) */
                __webpack_require__.d(__webpack_exports__, "checkPermissions", function () { return checkPermissions; });
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

                /***/
            }),

        /***/
        2:
            /*!**********************************************************************************!*\
              !*** multi ./platform/ttct/resources/assets/js/pages/article-index-published.js ***!
              \**********************************************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                module.exports = __webpack_require__( /*! /var/www/html/ttct_cms/platform/ttct/resources/assets/js/pages/article-index-published.js */ "./platform/ttct/resources/assets/js/pages/article-index-published.js");


                /***/
            })

        /******/
    });

$(document).ready(function () {
    $(document).on('click', '.delete-permission-access', function () {
        var article_id = $(this).attr('data-id');
        article_id = Number(article_id);
        if (article_id != '' && typeof article_id === 'number') {
            swal.fire({
                title: 'Xác nhận hủy quyền giữ bài viết?',
                text: "Hủy quyền xử lý !",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(function (result) {
                if (result.value) {
                    $.ajax({
                        url: '/articles/delete-post-permission',
                        type: 'POST',
                        dataType: 'JSON',
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
                        },
                        data: { 'article_id': article_id },
                        success: function (response) {
                            if (response.success) {
                                Swal.fire(
                                    response.success,
                                    setTimeout(function () {
                                        location.reload();
                                    }, 1300),
                                )
                            }
                        },
                        statusCode: {
                            500: function (error) {
                                Swal.fire(
                                    'Có lỗi xảy ra vui lòng  thử lại'
                                )
                            }
                        }
                    })
                }
            });
        }
    })
});

$(document).on('change', '.select-status-send-article', function (e) {
    var count = 0;
    var api_base_url = $('body').attr('api-base-url');
    var data = {
        article_id: $(this).attr('id'),
        article_title: $(this).attr('title'),
        article_url: $(this).attr('url'),
        status: 1
    };

    $.ajax({
        url: api_base_url + '/be/articles/get-count-send-article-today',
        method: 'GET',
        dataType: 'json',
        success: function (res) {
            if (res.status == 200) {
                count = res.total;
                swal.fire({
                    title: 'Tổng số bài hôm nay  đã gửi cho bạn đọc là ' + count + ' bạn có chắc muốn gửi tiếp bài này',
                    text: "Thông báo",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Gửi',
                    cancelButtonText: 'Hủy',
                    reverseButtons: true
                }).then(function (result) {
                    if (result.value) {
                        $.ajax({
                            url: api_base_url + '/be/articles/send-article',
                            method: 'GET',
                            dataType: 'json',
                            data: data,
                            success: function (res) {
                                if (res.status == 200) {
                                    alert(res.message);
                                    window.location.reload();
                                } else {

                                    alert(res.message);
                                }
                            }
                        })
                    }
                });
            } else {
                alert("Có lỗi vui lòng thử laị !");
            }
        }
    })

});

