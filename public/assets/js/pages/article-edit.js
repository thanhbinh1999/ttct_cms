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
    return __webpack_require__(__webpack_require__.s = 10);
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
        "./node_modules/uuid/lib/bytesToUuid.js":
            /*!**********************************************!*\
              !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
              \**********************************************/
            /*! no static exports found */
            /***/
            (function (module, exports) {

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


                /***/
            }),

        /***/
        "./node_modules/uuid/lib/rng-browser.js":
            /*!**********************************************!*\
              !*** ./node_modules/uuid/lib/rng-browser.js ***!
              \**********************************************/
            /*! no static exports found */
            /***/
            (function (module, exports) {

                // Unique ID creation requires a high quality random # generator.  In the
                // browser this is a little complicated due to unknown quality of Math.random()
                // and inconsistent support for the `crypto` API.  We do the best we can via
                // feature-detection

                // getRandomValues needs to be invoked in a context where "this" is a Crypto
                // implementation. Also, find the complete implementation of crypto on IE11.
                var getRandomValues = (typeof (crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                    (typeof (msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

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


                /***/
            }),

        /***/
        "./node_modules/uuid/v1.js":
            /*!*********************************!*\
              !*** ./node_modules/uuid/v1.js ***!
              \*********************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                var rng = __webpack_require__( /*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
                var bytesToUuid = __webpack_require__( /*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

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
                    var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs) / 10000;

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


                /***/
            }),

        /***/
        "./platform/ttct/resources/assets/js/pages/article-create-update-create-tag.js":
            /*!*************************************************************************************!*\
              !*** ./platform/ttct/resources/assets/js/pages/article-create-update-create-tag.js ***!
              \*************************************************************************************/
            /*! exports provided: default */
            /***/
            (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony import */
                var _helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! ./helper */ "./platform/ttct/resources/assets/js/pages/helper.js");
                /* harmony import */
                var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! axios */ "./node_modules/axios/index.js");
                /* harmony import */
                var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);

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
                 * @description Class ArticleCreateUpdateCreateTag
                 */

                var ArticleCreateUpdateCreateTag =
                    /*#__PURE__*/
                    function () {
                        function ArticleCreateUpdateCreateTag(tagSelect2) {
                            _classCallCheck(this, ArticleCreateUpdateCreateTag);

                            this.$tagSelect2 = tagSelect2;
                            this.$modalCreateTag = $('#modal-create-tag');
                            this.$formCreateTag = $('#form-create-tag');
                            this.$createName = $('#create-name');
                            this.$createDescription = $('#create-description');
                            this.init();
                        }

                        _createClass(ArticleCreateUpdateCreateTag, [{
                            key: "init",
                            value: function init() {
                                this.initModal();
                                this.initSubmit();
                            }
                        }, {
                            key: "initModal",
                            value: function initModal() {
                                var _this = this;

                                this.$modalCreateTag.on('hide.bs.modal', function () {
                                    _this.$formCreateTag.trigger('reset');

                                    Object(_helper__WEBPACK_IMPORTED_MODULE_0__["removeError"])(_this.$createName);
                                });
                            }
                        }, {
                            key: "initSubmit",
                            value: function initSubmit() {
                                var _this2 = this;

                                this.$formCreateTag.submit(function (event) {
                                    event.preventDefault();
                                    var url = $(event.target).attr('action');
                                    axios__WEBPACK_IMPORTED_MODULE_1___default.a.post(url, new FormData(event.target)).then(function (_ref) {
                                        var data = _ref.data;
                                        var tag = data.tag;
                                        var option = new Option(tag.name, tag.id, true);

                                        _this2.$tagSelect2.append(option);

                                        if (_this2.$tagSelect2.select2('data').length > 0) {
                                            var newValue = _this2.$tagSelect2.select2('data').map(function (item) {
                                                return item.id;
                                            });

                                            newValue.push(tag.id);

                                            _this2.$tagSelect2.val(newValue);
                                        } else {
                                            _this2.$tagSelect2.val(tag.id);
                                        }

                                        _this2.$tagSelect2.trigger('change');

                                        _this2.$modalCreateTag.modal('hide');
                                    }, function (err) {
                                        var status = err.response.status;

                                        if (status === 422) {
                                            Object(_helper__WEBPACK_IMPORTED_MODULE_0__["showError"])('create-', err.response.data.errors);
                                        }
                                    });
                                });
                            }
                        }]);

                        return ArticleCreateUpdateCreateTag;
                    }();

                /* harmony default export */
                __webpack_exports__["default"] = (ArticleCreateUpdateCreateTag);

                /***/
            }),

        /***/
        "./platform/ttct/resources/assets/js/pages/article-create-update-create-theme.js":
            /*!***************************************************************************************!*\
              !*** ./platform/ttct/resources/assets/js/pages/article-create-update-create-theme.js ***!
              \***************************************************************************************/
            /*! exports provided: default */
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
                 * @description Class ArticleCreateUpdateCreateTheme
                 */

                var ArticleCreateUpdateCreateTheme =
                    /*#__PURE__*/
                    function () {
                        function ArticleCreateUpdateCreateTheme(selectTheme) {
                            _classCallCheck(this, ArticleCreateUpdateCreateTheme);

                            this.$selectTheme = selectTheme;
                            this.$modalCreateTheme = $('#modal-create-theme');
                            this.$formCreateTheme = $('#form-create-theme');
                            this.$createName = $('#create-theme-name');
                            this.$createDescription = $('#create-theme-description');
                            this.$createThumbnail = $('#create-theme-thumbnail');
                            this.init();


                        }

                        _createClass(ArticleCreateUpdateCreateTheme, [{
                            key: "init",
                            value: function init() {
                                this.initCreate();
                                this.initModal();
                            }
                        }, {
                            key: "initModal",
                            value: function initModal() {
                                var _this = this;

                                this.$modalCreateTheme.on('hide.bs.modal', function () {
                                    Object(_helper__WEBPACK_IMPORTED_MODULE_1__["removeError"])([_this.$createName, _this.$createThumbnail]);

                                    _this.$formCreateTheme.trigger('reset');

                                    _this.$formCreateTheme.find('.dropify-clear').click();
                                });
                            }
                        }, {
                            key: "initCreate",
                            value: function initCreate() {
                                var _this2 = this;

                                this.$createThumbnail.dropify({
                                    messages: {
                                        'default': 'Kéo và thả tệp vào đây hoặc click',
                                        'replace': 'Kéo và thả hoặc click để thay thế',
                                        'remove': 'Xóa',
                                        'error': 'Ooops, có lỗi bất ngờ xảy ra.'
                                    }
                                });
                                this.$formCreateTheme.submit(function (event) {
                                    event.preventDefault();
                                    var url = $(event.target).attr('action');
                                    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, new FormData(event.target)).then(function (_ref) {
                                        var data = _ref.data;

                                        if (data.message) {
                                            var theme = data.theme;
                                            var option = new Option(theme.name, theme.id, true);

                                            _this2.$selectTheme.append(option);

                                            _this2.$selectTheme.val(theme.id); // if (this.$selectTheme.select2('data').length > 0) {
                                            //     let newValue = this.$selectTheme.select2('data').map(item => item.id);
                                            //     newValue.push(theme.id);
                                            //     this.$selectTheme.val(newValue);
                                            // } else {
                                            //     this.$selectTheme.val(theme.id);
                                            // }


                                            _this2.$selectTheme.trigger('change');

                                            _this2.$modalCreateTheme.modal('hide');
                                        }
                                    }, function (err) {
                                        var status = err.response.status;

                                        if (status === 422) {
                                            Object(_helper__WEBPACK_IMPORTED_MODULE_1__["showError"])('create-theme-', err.response.data.errors);
                                        } else {
                                            toastr.error(err.response.data.message);
                                        }
                                    });
                                });
                            }
                        }]);

                        return ArticleCreateUpdateCreateTheme;
                    }();

                /* harmony default export */
                __webpack_exports__["default"] = (ArticleCreateUpdateCreateTheme);

                /***/
            }),

        /***/
        "./platform/ttct/resources/assets/js/pages/article-create-upload-resource.js":
            /*!***********************************************************************************!*\
              !*** ./platform/ttct/resources/assets/js/pages/article-create-upload-resource.js ***!
              \***********************************************************************************/
            /*! exports provided: default */
            /***/
            (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */
                __webpack_require__.d(__webpack_exports__, "default", function () { return ArticleCreateUploadResource; });
                /* harmony import */
                var uuid_v1__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__( /*! uuid/v1 */ "./node_modules/uuid/v1.js");
                /* harmony import */
                var uuid_v1__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/ __webpack_require__.n(uuid_v1__WEBPACK_IMPORTED_MODULE_0__);
                /* harmony import */
                var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__( /*! axios */ "./node_modules/axios/index.js");
                /* harmony import */
                var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/ __webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);
                /* harmony import */
                var _helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ./helper */ "./platform/ttct/resources/assets/js/pages/helper.js");

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
                 * @author        binh le
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
                            this.$modalUploadTabSelectResourceRepo = $('a[href="#modal-upload-tab-select-resource-repo"]');
                            this.$modalSelectResource = this.createArticleInstant.$modalSelectResource;
                            this.$modalUploadResourceBtnSelect = $('#modal-upload-resource-btn-select');
                            this.$modalUploadResourceBtnUpload = $('#modal-upload-resource-btn-upload');
                            this.$modalUploadResourceInput = $('#modal-upload-resource-input');
                            this.$modalUploadResourceRreviewContainer = $('#modal-upload-resource-preview-container');
                            this.$modalUploadCompleteBtn = $('#modal-upload-complete-btn');
                            this.$modalAddResourceBtn = $('#modal-add-resource-btn');
                            this.$modalReplaceArticleImg = $('.replaceArticleImg');
                            this.$modalInsertResourceFroala = $('.insert-resource-froala');
                            this.files = [];
                            this.$tableResource = $('#table-resource');
                            this.dataResourceUpload = [];
                            this.resourceAfterUpload = null; // tab select

                            // start path
                            this.$baseUrl = $('#kt_content').attr('resource_base_url');
                            this.updateArticleResourceUrl = $('#update-content').attr('update-article-resource');
                            this.deleteArticleResource = $('#update-content').attr('delete-article-resource');
                            this.updateDescriptionResourceUrl = $('#update-content').attr('update-description-resource-url');
                            // end path


                            this.$modalUploadTableSelectResource = $('#modal-upload-table-select-resource');
                            this.$modalUploadTableSelectResourceFormRepo = $('#modal-upload-table-select-resource-form-repo');
                            this.$modalUploadDatatableInputFileName = $('#modal-upload-datatable-input-file-name');
                            this.$modalUploadDatatableInputFrom = $('#modal-upload-datatable-input-from');
                            this.$modalUploadDatatableInputTo = $('#modal-upload-datatable-input-to');
                            this.$modalUploadDatatableInputUploadBy = $('#modal-upload-datatable-input-upload-by');
                            this.$modalUploadDatatableInputBtnSearch = $('#modal-upload-datatable-input-btn-search');
                            this.$modalUploadDatatableInputFileType = $('#modal-upload-datatable-input-file-type');
                            this.datatable = null;
                            this.datatableFormRepo = null;
                            this.selecttedResource = [];
                            this.init();
                        }

                        _createClass(ArticleCreateUploadResource, [{
                            key: "init",
                            value: function init() {

                                this.initTab();
                                this.initModal();
                                this.initUpload();
                                this.resourceRepo();
                                this.actionResource();
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
                                                _this.dataResourceUpload = []
                                                _this.dataResourceUpload.push(data.resources);

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
                        },
                        {
                            key: "initHtmlResourceRepo",
                            value: function initHtmlResourceRepo(data) {
                                var _this15 = this;
                                var resourceFolder = (data.base_url != null) ? data.base_url + "/" : _this15.$baseUrl + '/ttct/';
                                var col = "<div  class = 'row'>";
                                col += "<div class='col'>\
                              <div class='collapse multi-collapse show' id='multiCollapseExample1 show'>\
                                <div class='card card-body'>\
                                  <div class='file-thumb'>\
                                    <img class='thumb-base' style='height:200px'\
                                    src='" + resourceFolder + data.absolute_url + "'\
                                    alt=''>\
                                  </div>\
                                </div>\
                              </div>\
                            </div>";
                                col += "    <div class='col'>\
                            <div class='collapse multi-collapse show' id='multiCollapseExample2'>\
                              <div class='card card-body' style='height:20%'>\
                                <div class='actions'>\
                                  <i><input type='radio' name='thumb' value='" + data.id + "'   thumb = '" + resourceFolder + data.absolute_url + "'  >\
                                    <label style='font-weight: 800;' for=''>Ảnh đại diện</label></i>\
                                  <i class='fas fa-plus-square insert-resource-froala' base_url = '" + resourceFolder + "' absolute_url = '" + data.absolute_url + "'  description='" + data.description + "'><span> &nbsp Chèn ảnh</span></i>\
                                  <i class='fas fa-exchange-alt replaceArticleImg' data-id='" + data.id + "'><span>&nbsp Thay thế</span></i>\
                                  <i class='fa fa-save save-description-btn' data-id='" + data.id + "'><span> &nbsp Lưu chú thích</span></i>\
                                  <i class='far fa-trash-alt deleteThumb' data-id= '" + data.id + "'><span>&nbsp Xóa hình</span></i>\
                                </div>\
                              </div>\
                              <div class='card card-body' style='margin:0% 0% 0% 0%'>\
                                <textarea  class ='" + data.id + "' cols='20' value='" + data.description + "' rows='4' placeholder='Chú thích cho ảnh'>" + data.description + "</textarea>\
                              </div>\
                            </div>\
                          </div>";
                                col += "</div>"
                                return col;
                            }
                        },
                        {
                            key: "unique",
                            value: function unique(arr) {
                                return Array.from(new Set(arr));
                            }
                        },
                        {
                            key: 'actionResource',
                            value: function actionResource() {
                                var this1 = this;
                                var dataResourceSelect = [];

                                $(document).on('click', '.replaceArticleImg', function () {

                                    var globalData = {
                                        _old_resource_id: $(this).attr('data-id')
                                    }
                                    this1.$modalSelectResource.modal('show');
                                    $(document).on('click', "a[href='#modal-upload-tab-select-resource']", function () {
                                        $(document).on('click', "input[type='checkbox']", function () {
                                            if (this.checked) {
                                                dataResourceSelect = dataResourceSelect.concat($(this).val());
                                            }
                                        })
                                    });


                                    $(document).on('click', '#modal-upload-complete-btn', function () {
                                        if (this1.dataResourceUpload != '' && this1.dataResourceUpload != null) {
                                            dataResourceSelect = this1.dataResourceUpload;
                                            this1.dataResourceUpload = null;
                                        }
                                        if (dataResourceSelect != '' && dataResourceSelect.length > 0) {
                                            var object = [];
                                            var id = $('#update-content').attr('article_id');
                                            // dataResourceSelect.forEach(function (item) {
                                            object = [{ old_post_id: id, old_resource_id: globalData._old_resource_id, article_id: id, resource_id: dataResourceSelect[0] }];
                                            // });

                                            var request = {
                                                data: {
                                                    "action": "update",
                                                    "data": object
                                                }
                                            }
                                            $.ajax({
                                                url: this1.updateArticleResourceUrl,
                                                data: request,
                                                method: 'POST',
                                                dataType: 'json',
                                                headers: {
                                                    'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
                                                },
                                                success: function (response) {

                                                    if (response.status == 200) {
                                                        var resourcesObject = response.data.resources;
                                                        var thumbnail = response.data.thumbnail_id;

                                                        if (thumbnail != '' && thumbnail != undefined) {
                                                            var is = true;
                                                            for (var i = 0; i < resourcesObject.length; i++) {
                                                                if (resourcesObject[i].id == thumbnail) {
                                                                    is = false;
                                                                }

                                                            }
                                                            if (is) {
                                                                resourcesObject = resourcesObject.concat(thumbnail);
                                                            }

                                                        }
                                                        if (resourcesObject.length > 0) {
                                                            var _html = '';
                                                            resourcesObject.forEach(function (resource) {
                                                                if (resource != null)
                                                                    _html += this1.initHtmlResourceRepo(resource);
                                                            });
                                                            this1.$tableResource.html(_html);
                                                            $(document).ready(function () {
                                                                $("input[name='thumb']").each(function () {
                                                                    if ($(this).val() == thumbnail) {
                                                                        this.checked = [];
                                                                    }
                                                                });
                                                            });

                                                        }
                                                        dataResourceSelect = [];
                                                        object = [];

                                                    } else {
                                                        dataResourceSelect = [];
                                                        object = null;
                                                        alert('Có lỗi vui  lòng  thử lại sau');
                                                    }
                                                }
                                            })

                                        }

                                    });
                                    return;
                                });

                                $(document).on('click', '.insert-resource-froala', function () {
                                    var res = {
                                        absolute_url: $(this).attr('absolute_url'),
                                        base_url: $(this).attr('base_url'),
                                        description: $(this).attr('description'),
                                        type: 1,
                                    };

                                    this1.selecttedResource = res;
                                    this1.processForModeSelect();
                                }) //  insert img

                                $(document).on('click', '.deleteThumb', function () {
                                    var thumbId = $("input[name='thumb']:checked").val();
                                    var thumbDeleteId = $(this).attr('data-id');
                                    if (!thumbDeleteId == '') {
                                        if (thumbId == thumbDeleteId) {
                                            alert('Không thể xóa ảnh đang được chọn là  đại diện');

                                        } else {
                                            var object = {
                                                article_id: $('#update-content').attr('article_id'),
                                                resource_id: thumbDeleteId
                                            };
                                            var request = {
                                                data: object
                                            }
                                            $.ajax({
                                                url: this1.deleteArticleResource,
                                                data: request,
                                                method: 'POST',
                                                dataType: 'json',
                                                headers: {
                                                    'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
                                                },
                                                success: function (response) {
                                                    if (response.status == 200) {
                                                        var resourcesObject = (response.data.resources != '') ? response.data.resources : [];
                                                        var thumbnail = response.data.thumbnail_id;

                                                        var is = true;

                                                        if (resourcesObject.length > 0) {
                                                            for (var i = 0; i < resourcesObject.length; i++) {
                                                                if (resourcesObject[i].id == thumbnail) {
                                                                    is = false;
                                                                }
                                                            }
                                                            if (is) {
                                                                resourcesObject = resourcesObject.concat(thumbnail);
                                                            }
                                                        } else {

                                                            resourcesObject = resourcesObject.concat(thumbnail);

                                                        }
                                                        var _html = '';
                                                        resourcesObject.forEach(function (resource) {
                                                            if (resource != null)
                                                                _html += this1.initHtmlResourceRepo(resource);
                                                        });
                                                        this1.$tableResource.html(_html);
                                                        $(document).ready(function () {
                                                            $("input[name='thumb']").each(function () {
                                                                if ($(this).val() == thumbId) {
                                                                    this.checked = true;
                                                                }
                                                            });
                                                        });

                                                    } else {

                                                        var error = response.message;
                                                        if (error != '') {
                                                            alert(error);
                                                        } else {
                                                            alert('Hệ thống bận vui lòng thử lại');
                                                        }

                                                    }
                                                }
                                            })

                                        }

                                    } else {

                                        alert('Có lỗi vui lòng tải lại trang ');
                                    }

                                });

                                $(document).on('click', '.save-description-btn', function () {
                                    try {
                                        var _resource_id = $(this).attr('data-id');
                                        var _article_id = $('#update-content').attr('article_id');
                                        var _content = $('.' + _resource_id).val();


                                        if (_resource_id && _article_id != '' && _article_id && _resource_id != undefined) {
                                            var object = {
                                                article_id: _article_id,
                                                resource_id: _resource_id,
                                                content: _content
                                            };
                                            var request = {
                                                data: object
                                            }
                                            $.ajax({
                                                url: this1.updateDescriptionResourceUrl,
                                                data: request,
                                                method: 'POST',
                                                dataType: 'json',
                                                headers: {
                                                    'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
                                                },
                                                success: function (response) {

                                                    if (response.status == 200) {
                                                        var resourceObjects = response.data.resources;
                                                        var thumbnail = response.data.thumbnail_id;

                                                        if (thumbnail != '' && thumbnail != undefined) {

                                                            var is = true;
                                                            for (var i = 0; i < resourceObjects.length; i++) {
                                                                if (resourceObjects[i].id == thumbnail.id) {
                                                                    is = false;
                                                                }
                                                            }
                                                            if (is) {
                                                                resourceObjects = resourceObjects.concat(thumbnail);
                                                            }

                                                        }

                                                        if (resourceObjects.length > 0) {
                                                            var _html = '';
                                                            resourceObjects.forEach(function (resource) {
                                                                if (resource != null)
                                                                    _html += this1.initHtmlResourceRepo(resource);
                                                            });
                                                            this1.$tableResource.html(_html);
                                                        }
                                                        $(document).ready(function () {
                                                            $("input[name='thumb']").each(function () {
                                                                if ($(this).val() == thumbnail) {
                                                                    this.checked = true;
                                                                }
                                                            });
                                                        });
                                                        alert(response.message);

                                                    } else {
                                                        var error = response.message;
                                                        if (error != '') {
                                                            alert(error);
                                                        } else {
                                                            alert('Hệ thống bận vui lòng thử lại');
                                                        }

                                                    }
                                                }
                                            })
                                        }
                                    } catch (exception) {
                                        console.log(exception);
                                    }
                                });
                            }
                        },
                        {
                            key: "resourceRepo",
                            value: function resourceRepo() {
                                let this1 = this;
                                this1.$modalAddResourceBtn.on('click', function () {
                                    this1.$modalSelectResource.modal('show');
                                    var dataResourceSelect = [];

                                    $(document).on('click', "a[href='#modal-upload-tab-select-resource']", function () {
                                        $(document).on('click', "input[type='checkbox']", function () {
                                            if (this.checked) {
                                                dataResourceSelect = dataResourceSelect.concat($(this).val());
                                            }
                                        });
                                    })

                                    $(document).on("click", "a[href='#modal-upload-tab-upload']", function () { })
                                    $(document).on('click', '#modal-upload-complete-btn', function () {

                                        if (this1.dataResourceUpload != '' && this1.dataResourceUpload != null) {
                                            dataResourceSelect = this1.dataResourceUpload;
                                            this1.dataResourceUpload = null;
                                        }

                                        if (dataResourceSelect != '' && dataResourceSelect.length > 0) {
                                            var object = [];
                                            var id = $('#update-content').attr('article_id');
                                            this1.unique(dataResourceSelect).forEach(function (item) {
                                                object = object.concat([{ article_id: id, resource_id: item }]);

                                            });
                                            var request = {
                                                data: {
                                                    "action": "insert",
                                                    "data": object
                                                }
                                            }
                                            $.ajax({
                                                url: this1.updateArticleResourceUrl,
                                                data: request,
                                                method: 'POST',
                                                dataType: 'json',
                                                headers: {
                                                    'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
                                                },
                                                success: function (response) {

                                                    if (response.status == 200) {
                                                        var resourcesObject = response.data.resources;
                                                        var getThumbObject = response.data.thumbnail;
                                                        if (resourcesObject.length > 0) {
                                                            var _html = '';
                                                            var is = true;
                                                            for (var i = 0; i < resourcesObject.length; i++) {
                                                                if (resourcesObject[i].id == getThumbObject) {
                                                                    is = false;
                                                                }

                                                            }

                                                            if (is) {
                                                                resourcesObject = resourcesObject.concat(getThumbObject);
                                                            }

                                                            resourcesObject.forEach(function (resource) {
                                                                if (resource != null) {
                                                                    _html += this1.initHtmlResourceRepo(resource);
                                                                }

                                                            });
                                                            this1.$tableResource.html(_html);
                                                            $("input[name='thumb']").each(function () {
                                                                if ($(this).val() == response.data.thumbnail_id) {
                                                                    this.checked = true;
                                                                }
                                                            });
                                                            dataResourceSelect = [];
                                                            object = null;
                                                        }

                                                    } else {
                                                        dataResourceSelect = [];
                                                        object = null;
                                                    }
                                                }
                                            })

                                        }

                                    })
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
                                        _this3.datatable.load();
                                    } else {
                                        _this3.initDatable();
                                    }
                                    $("#modal-upload-table-select-resource").show();
                                    $("#modal-select-img").hide();
                                    $(".align-items-center").show();
                                    _this3.$modalUploadFilePreview.html('').hide();
                                });
                                this.$modalUploadTabSelectResourceRepo.click(function () {
                                    _this3.mode = 'select';
                                    _this3.initDataResourceFormRepo();
                                    $("#modal-select-img").show();
                                    $(".align-items-center").hide();
                                    $("#modal-upload-table-select-resource").hide();
                                })
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
                                            const defaultFolder = 'tto';
                                            const listUrlComponnet = row.base_url.split('/');
                                            let baseUrlImg = 'https://static.tuoitre.vn/';
                                            baseUrlImg += (listUrlComponnet != null && listUrlComponnet[3] == defaultFolder) ?  `690/0/tto/r/` :  `/ttct`; 
                                            return "<input type=\"text\" data-type=\"".concat(row.type, "\" data-id=\"").concat(row.id, "\"  data-base-url=\"").concat(baseUrlImg, "\" data-absolute-url=\"").concat(row.absolute_url, "\" class=\"form-control\" value=\"").concat(_this6.resizeThumb(800, 690, 0, 690 , 0, row.base_url, row.absolute_url), "\" style=\"width:100%\">");
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
                                    }, function (err) { });
                                });
                            }
                        },
                        {
                            key: 'resizeThumb',
                            value: function resizeThumb(size = 0, widthPC = 0, heightPC = 0, widthMobile = 0, heightMobile = 0, base_url = 0, thumb_name) {
                                const domain = 'https://static.tuoitre.vn' + '/';
                                const ttct = 'ttct';
                                const tto = 'tto';
                                const SizePC = 767;
                                const SizeMobile = 766;
                                const index = 3;
                                let staticRepo = null;
                                let regex = null;
                                let full_url = null;
                                let width = 0;
                                let height = 0;

                                if (size > 0 && widthPC && widthMobile != 0 && base_url && thumb_name != null) {
                                    try {
                                        regex = base_url.split('/');

                                        regex = (regex != null && regex[index]) ? regex[index] : ttct;

                                        if (size >= SizePC) {
                                            width = widthPC;
                                            height = heightPC;
                                        } else if (size <= SizeMobile) {
                                            width = widthMobile;
                                            height = heightMobile;
                                        }
                                        if (regex != null) {
                                            switch (regex) {
                                                case ttct:
                                                    staticRepo = ttct;
                                                    break;
                                                case tto:
                                                    staticRepo = tto;
                                                    break;
                                                default:
                                                    staticRepo = null;
                                            }
                                        }
                                        if (staticRepo != ttct) {
                                            full_url = domain + width + '/' + height + '/' + staticRepo + '/' + 'r/' + thumb_name;
                                        } else {

                                            full_url = domain + width + '/' + height + '/' + staticRepo + '/' + thumb_name;
                                        }
                                        return full_url;

                                    } catch (Exception) {
                                        return;
                                    }
                                }
                            }

                        }, {
                            key: "initDataResourceFormRepo",
                            value: function initDataResourceFormRepo() {

                                var _this7 = this;
                                $.ajax({
                                    url: $('#kt_content ').attr('data-edit'),
                                    dataType: 'json',
                                    method: 'get',
                                    success: function (res) {
                                        console.log(res);
                                        if (res != null && res.resources != null || res.thumbnail != null) {
                                            var html = null;
                                            var resources = res.resources;
                                            var default_base_url = $('#kt_content').attr('resource_base_url');
                                            resources.forEach(function (item) {
                                                var base_url = (item.base_url != null) ? item.base_url + '/' : default_base_url + '/ttct/';
                                                html += "<tr>";
                                                html += "<th scope='row'><input  style = 'margin-left:10px;  margin-top:30px'class='form-check-input'  type='radio' style='transform: scale(1)' name='select-img' id ='" + item.id + "' type = '1'  base_url='" + base_url + "' absolute_url= '" + item.absolute_url + "'></th>";
                                                html += "<td>";
                                                html += "<span>";
                                                html += "<image  style='width:200px' src='" + base_url + item.absolute_url + "'>";
                                                html += "</span>";
                                                html += "</td>";
                                                html += "<td>";
                                                html += "<span>" + item.name + "</span>";
                                                html += "</td>";
                                                html += "<td>";
                                                html += "<input  class='form-control' type='text' value='" + base_url + item.absolute_url + "'>";
                                                html += "</td>";
                                                html += "<td><span>" + item.created_at + "</span></td></td>";
                                                html += "</tr>";
                                            });

                                            if (res.thumbnail != null) {
                                                var thumbnail = res.thumbnail;
                                                html += "<tr>";
                                                html += "<th scope='row'><input  style = 'margin-left:10px;  margin-top:40px'class='form-check-input'  type='radio' style='transform: scale(1)' name='select-img' id ='" + thumbnail.id + "' type = '1'  base_url='" + thumbnail.base_url + "' absolute_url= '" + thumbnail.absolute_url + "'></th>";
                                                html += "<td>";
                                                html += "<span>";
                                                html += "<image  style='width:200px' src='" + thumbnail.base_url + "/" + thumbnail.absolute_url + "'>";
                                                html += "</span>";
                                                html += "</td>";
                                                html += "<td>";
                                                html += "<span>" + thumbnail.name + "</span>";
                                                html += "</td>";
                                                html += "<td>";
                                                html += "<input  class='form-control' type='text' value='" + thumbnail.base_url + thumbnail.absolute_url + "'>";
                                                html += "</td>";
                                                html += "<td><span>" + thumbnail.created_at + "</span></td></td>";
                                                html += "</tr>";
                                            }



                                            if (html != null) {
                                                $('#select-img-form-resource').html(html);
                                            } else {
                                                $('#select-img-form-resource').html('<h2>Ko tìm thấy  ảnh nào !</h2>');
                                            }

                                            $(document).on("click", "input[name  = 'select-img']", function () {
                                                var selectData = $("input[name='select-img']:checked");
                                                _this7.selecttedResource = [{
                                                    id: selectData.attr('id'),
                                                    type: 1,
                                                    base_url: selectData.attr('base_url'),
                                                    absolute_url: selectData.attr('absolute_url'),
                                                }];
                                                return;
                                            });
                                        } else {
                                            $('#select-img-form-resource').html('<h2>Ko tìm thấy  ảnh nào !</h2>');
                                        }
                                    }

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
                                        _this7.dataResourceUpload = ids;
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
                                        } else if (type === 'resources') { // this.createArticleInstant.setResources(resources);
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

                                                var html = '';
                                                resources.forEach(function (res) {
                                                    html += _this7.generateHtmlForFile(res);
                                                });

                                                this.createArticleInstant.initEditor(html);
                                                this.resourceAfterUpload = null;

                                                $('table  tbody tr td   figure .grid-img br').remove();
                                                $('table tbody  tr td figure .grid-img').css('background', '#eee');
                                                $('table tbody  tr td  .block-quote-style figure .grid-img').css('background', '#fff');
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

                                            $('table  tbody tr td   figure .grid-img br').remove();

                                            $('table tbody  tr td figure .grid-img').css('background', '#eee');
                                            $('table tbody  tr td  .block-quote-style figure .grid-img').css('background', '#fff');

                                        }
                                    }
                                }
                            }
                        }, {
                            key: "generateHtmlForFile",
                            value: function generateHtmlForFile(res) {
                                var file = '';
                                var description = res.description;

                                switch (parseInt(res.type)) {
                                    case 1:
                                        {
                                            file = "<img src=\"".concat(res.base_url, "/").concat(res.absolute_url, "\" class=\"img-thumbnail\">");
                                            file = "<figure>\n<div class=\"grid-img\">\n <div href=\"".concat(res.base_url, "/").concat(res.absolute_url, "\" data-fancybox=\"gallery\" data-caption=\"\">\n   <div class=\"fr-img-space-wrap\">\n  <span class=\"fr-img-caption fr-draggable \"  contenteditable=\"false\" style=\"width:100%\" draggable=\"false\"><span class=\"fr-img-wrap\"><img src=\"").concat(res.base_url, "/").concat(res.absolute_url, "\" alt=\"\" style=\"width: 100%\" class=\"fr-draggable\"></span></span></span></div></div>\n</div>\n<figcaption  style=\"font-size:13px;color:#555;text-align:center;height:25px;margin-top :20px\" class=\"fr-inner\" contenteditable=\"true\"> " + description + "\</figcaption></figure>\<p>&nbsp;</p>");
                                            break;
                                        }

                                    case 2:
                                        {
                                            file = "<video id='my-video' class='video-js vjs-16-9 custom-video' controls preload='auto' poster='http://static.tuoitre.vn/ttct/2021/02/25/16142226119370-video.jpg' data-setup='{}'><source src='" + res.base_url + "/" + res.absolute_url + " ' type='video/mp4'/><p class='vjs-no-js'>To view this video please enable JavaScript, and consider upgrading to aweb browser that<a href='https://videojs.com/html5-video-support/' target='_blank'>supports HTML5video</a></p></video>";
                                            // file = "<span class=\"fr-video fr-deletable fr-fvc fr-dvi fr-draggable\" contenteditable=\"false\" style=\"\">\n                            <video controls=\"\" style=\"width: 100%;\" class=\"fr-fvc fr-dvi fr-draggable\">\n                            <source src=\"".concat(res.base_url, "/").concat(res.absolute_url, "\"></video>\n                        </span>");
                                            break;
                                        }
                                    case 3:
                                        {
                                            file = "<img src=\"".concat($('body').data('base-url'), "/file-audio-icon.png\" class=\"img-thumbnail\" style=\"width:100%\">");
                                            break;
                                        }

                                    default:
                                        { }
                                }

                                return file;
                            }
                        }, {
                            key: "generatePreviewHtmlForFile",
                            value: function generatePreviewHtmlForFile(res) {
                                var file = '';
                                var _this1 = this;

                                switch (parseInt(res.type)) {
                                    case 1:
                                        {
                                            var thumbLink = _this1.resizeThumb(800, 690, 0,690, 0, res.base_url, res.absolute_url);
                                            file = "<img src=\"".concat(thumbLink, "\" class=\"img-thumbnail\" style=\"width:100%\">");
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
                                            //  $('table  tbody tr td   figure .grid-img br').remove();
                                            $('table tbody  tr td  .block-quote-style figure .grid-img').css('background', '#fff');
                                            $('table tbody  tr td figure .grid-img').css('background', '#eee');

                                        }
                                    } else if (this.createArticleInstant.selectResourceIsCurrentUseFor === 'froala-quick-insert') {
                                        //else add all generated html to editor content
                                        var _html2 = '';
                                        this.selecttedResource.forEach(function (res) {
                                            _html2 += _this8.generateHtmlForFile(res);
                                        });
                                        //   console.log(this.createArticleInstant.selectResourceIsCurrentUseFor);
                                        var positionMark = document.getElementById('position_mark');
                                        $(_html2).insertAfter(positionMark);
                                        $(positionMark).remove();
                                        this.selecttedResource = [];

                                        // $('table  tbody tr td   figure .grid-img br').remove();

                                        $('table tbody  tr td figure .grid-img').css('background', '#eee');
                                        $('table tbody  tr td  .block-quote-style figure .grid-img').css('background', '#fff');
                                    }
                                } else {
                                    if (this.selecttedResource.type == 1) {
                                        var _html3 = '';
                                        _html3 += _this8.generateHtmlForFile(this.selecttedResource);
                                        var positionMark = document.getElementById('position_mark');
                                        $(_html3).insertAfter(positionMark);
                                        this.selecttedResource = [];
                                        $('#position_mark').remove();
                                        $('p').each(function (index) {
                                            if ($(this).text().length == 0) {
                                                $(this).remove();
                                            }
                                        });

                                        $("p br").remove();
                                        //$('p').eq(0).remove();

                                        // $('table tbody  tr td  .block-quote-style figure .grid-img').css('background' , '#fff');
                                        $('table tbody  tr td figure .grid-img').css('background', '#eee');
                                        $('.dbox .inner  figure .grid-img').css('background', '#eee');
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
                        }
                        ]);

                        return ArticleCreateUploadResource;
                    }();



                /***/
            }),

        /***/
        "./platform/ttct/resources/assets/js/pages/article-edit.js":
            /*!*****************************************************************!*\
              !*** ./platform/ttct/resources/assets/js/pages/article-edit.js ***!
              \*****************************************************************/
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
                /* harmony import */
                var _article_create_upload_resource__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__( /*! ./article-create-upload-resource */ "./platform/ttct/resources/assets/js/pages/article-create-upload-resource.js");
                /* harmony import */
                var _article_create_update_create_tag__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__( /*! ./article-create-update-create-tag */ "./platform/ttct/resources/assets/js/pages/article-create-update-create-tag.js");
                /* harmony import */
                var _article_create_update_create_theme__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__( /*! ./article-create-update-create-theme */ "./platform/ttct/resources/assets/js/pages/article-create-update-create-theme.js");
                /* harmony import */
                var _block__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__( /*! ./block */ "./platform/ttct/resources/assets/js/pages/block.js");

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
                 * @description Class ArticleEdit
                 */

                var ArticleEdit =
                    /*#__PURE__*/
                    function () {
                        function ArticleEdit() {
                            _classCallCheck(this, ArticleEdit);

                            this.data = null;
                            this.$thumbnail = $('#update-thumbnail');
                            this.$updateCoverPc = $('#update-cover-pc');
                            this.$updateCoverMoblie = $('#update-cover-mobile');
                            this.$categories = $('#update-categories');
                            this.$tags = $('#update-tags');
                            this.$title = $('#update-title');
                            this.$sub_title = $("#update_sub_title");
                            this.$excerpt = $('#update-excerpt');
                            this.$content = $('#update-content');
                            this.$editor = $('#user-info').attr('data-username');
                            this.$author = $('#update-author');
                            this.$relatedArticle = $(".list-article");
                            this.$articleCategory = $('#list-article-categories');
                            this.$display = $('#display-article');
                            this.$updateGoogleDescription = $('#update-google-description');
                            this.$uploadGoogleKey = $('#update-google-key');
                            this.$uploadFbDescription = $('#update-fb-description');
                            this.$uploadFbTitle = $('#update-fb-title');
                            this.$themes = $('#update-themes');
                            this.$updateTopical = $('#update-topical');
                            this.$updatePublishedAt = $('#update-published_at');
                            this.$offTitle = $('#off_title');
                            this.$offThumbPc = $('#off_thumb_pc');
                            this.$offThumbMobile = $('#off_thumb_mobile');
                            this.$offDescription = $('#off_description');
                            this.$modalSelectBlock = $('#modal-select-block');
                            this.$selectBlock = $('#select-block');
                            this.$selectThumbnail = $('#select-thumbnail');
                            this.$selectCoverPc = $('#select-cover-pc');
                            this.$selectCoverMobile = $('#select-cover-mobile');
                            this.$modalUploadResourceBtnUpload = $('#modal-upload-resource-btn-upload');
                            this.$setTopicalArticle = $('#set-highlights'); //

                            this.$modalSelectTemplate = $('#modal-select-template');
                            this.$modalSelectResource = $('#modal-select-resource');
                            this.$btnSubmit = $('#btn-submit'); //
                            this.$tableResource = $('#table-resource');

                            this.$articlePreviewBtn = $('#article-preview'); //

                            this.$btnSaveAndPublishNow = $('#btn-save-and-publish-now');
                            this.$btnSaveAndGoToPending = $('#btn-save-and-go-to-pending');
                            this.$saveContainer = $('#save-container');
                            this.$publicContainer = $('#public-container');
                            this.$articleTransferBtn = $('#article-transfer-btn'); //transfer

                            this.$baseUrl = $('#kt_content').attr('resource_base_url');

                            this.$userInfo = $('#user-info');
                            this.$modalTransferArticle = $('#modal-transfer-article');
                            this.$transferType = $('input[name=transfer-type]');
                            this.$roleSelect = $('#role-select');
                            this.$userSelect = $('#user-select');
                            this.$note = $('#note');
                            this.$formTransferCategory = $('#form-transfer-category');
                            this.transferType = 'role';
                            this.currentTrasnferArticle = null; //send back

                            this.$btnSendBackArticle = $('#btn-send-back-article');
                            this.$modalSendBack = $('#modal-send-back');
                            this.$formSendBack = $('#form-send-back');
                            this.$sendBackUserSelect = $('#send-back-user-select');
                            this.$sendBackNote = $('#send-back-note');
                            this.currnenSendback = null;
                            this.selectResourceIsCurrentUseFor = null;
                            this.fileMode = null;
                            this.editor = null;
                            this.html = '';
                            this.files = [];
                            this.currentEditFile = null;
                            this.dropifyThumbail = null;
                            this.dropifyCoverPC = null;
                            this.dropifyCoverMobile = null;
                            this.thumb = null;
                            this.coverPC = null;
                            this.coverMobile = null;
                            this.quickInsertSetHtmlFunc = null;
                            this.window = null;
                            this.timeOut = null;
                            this.acl = null;
                            this.thumbnailId = null;
                            this.init();
                        }

                        _createClass(ArticleEdit, [{
                            key: "init",
                            value: function init() {
                                $(document).on('click', '.fr-video', function () {
                                    $(this).addClass('fr-active');
                                });
                                this.initFroalaEditor();
                                this.initSelect2();
                                this.initThumbnail();
                                this.initCover();
                                this.initGetAcl();
                                this.initSubmit();
                                this.initSelectBlock();
                                this.initPreview();
                                this.initPreventReload();
                                this.initSaveAndPublishNow();
                                this.initRoleSelect();
                                this.initTransfer();
                                this.initSendBack();
                                this.selectThumb();
                            }
                        }, {
                            key: "initGetAcl",
                            value: function initGetAcl() {
                                var _this = this;

                                Object(_helper__WEBPACK_IMPORTED_MODULE_1__["showBlock"])();
                                axios__WEBPACK_IMPORTED_MODULE_0___default.a.get($('body').data('acl')).then(function (res) {
                                    _this.acl = res.data;

                                    _this.initGetData();
                                });
                            }
                        }, {
                            key: "initSaveAndPublishNow",
                            value: function initSaveAndPublishNow() {
                                var _this2 = this;

                                this.$btnSaveAndPublishNow.click(function (event) {
                                    event.preventDefault();

                                    var published = _this2.$updatePublishedAt.val();

                                    if (published === '') {
                                        Object(_helper__WEBPACK_IMPORTED_MODULE_1__["showBlock"])();

                                        var fd = _this2.generateFormData();

                                        fd["delete"]('published_at');
                                        var url = $(event.target).data('url');
                                        var urlUpdateArticleTransferStatus = $(event.target).data('update-article-transfer-status');
                                        var status = 10;
                                        var permissions = Object(_helper__WEBPACK_IMPORTED_MODULE_1__["checkPermissions"])(['article-publish'], _this2.acl.permissions);
                                        axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, fd).then(function (res) {
                                            if (res.data && res.data.message) {
                                                if (parseInt(_this2.data.creator_id) === parseInt(_this2.$userInfo.data('id')) && permissions['article-publish']) {
                                                    window.onbeforeunload = null;
                                                    toastr.success(res.data.message);
                                                    setTimeout(function () {
                                                        window.location.href = $(event.target).data('redirect');
                                                    }, 1000);
                                                    Object(_helper__WEBPACK_IMPORTED_MODULE_1__["hideBlock"])();
                                                } else {
                                                    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(urlUpdateArticleTransferStatus, {
                                                        status: status
                                                    }).then(function () {
                                                        window.onbeforeunload = null;
                                                        toastr.success(res.data.message);
                                                        setTimeout(function () {
                                                            Object(_helper__WEBPACK_IMPORTED_MODULE_1__["hideBlock"])();
                                                            window.location.href = $(event.target).data('redirect');
                                                        }, 1000);
                                                    });
                                                }
                                            } else {
                                                toastr.error('Có lỗi xảy ra, thử lại sau');
                                            }
                                        }, function (err) {
                                            setTimeout(function () {
                                                Object(_helper__WEBPACK_IMPORTED_MODULE_1__["hideBlock"])();
                                            }, 500);
                                            var status = err.response.status;

                                            if (status === 422) {
                                                Object(_helper__WEBPACK_IMPORTED_MODULE_1__["showError"])('update-', err.response.data.errors);
                                            } else {
                                                toastr.error(err.response.data.message);
                                            }
                                        });
                                    } else {
                                        axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(_this2.$btnSaveAndPublishNow.data('check-time'), {
                                            time: published
                                        }).then(function (res) {
                                            /// if (!res.data) {
                                            //   toastr.info('Thời gian xuất bản phải lớn hơn thời gian hiện tại');
                                            //   return false;
                                            // } else {
                                            Object(_helper__WEBPACK_IMPORTED_MODULE_1__["showBlock"])();

                                            var _fd = _this2.generateFormData();

                                            var _url = $(event.currentTarget).data('url');

                                            var _urlUpdateArticleTransferStatus = $(event.target).data('update-article-transfer-status');

                                            var _status = 10;

                                            var _permissions = Object(_helper__WEBPACK_IMPORTED_MODULE_1__["checkPermissions"])(['article-publish'], _this2.acl.permissions);

                                            axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(_url, _fd).then(function (res) {
                                                if (res.data && res.data.message) {
                                                    if (parseInt(_this2.data.creator_id) === parseInt(_this2.$userInfo.data('id')) && _permissions['article-publish']) {
                                                        window.onbeforeunload = null;
                                                        toastr.success(res.data.message);
                                                        setTimeout(function () {
                                                            window.location.href = $(event.target).data('redirect');
                                                            Object(_helper__WEBPACK_IMPORTED_MODULE_1__["hideBlock"])();
                                                        }, 1000);
                                                    } else {
                                                        axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(_urlUpdateArticleTransferStatus, {
                                                            status: _status
                                                        }).then(function () {
                                                            window.onbeforeunload = null;
                                                            toastr.success(res.data.message);
                                                            setTimeout(function () {
                                                                window.location.href = $(event.target).data('redirect');
                                                            }, 1000);
                                                            Object(_helper__WEBPACK_IMPORTED_MODULE_1__["hideBlock"])();
                                                        });
                                                    }
                                                } else {
                                                    toastr.error('Có lỗi xảy ra, thử lại sau');
                                                }
                                            }, function (err) {
                                                setTimeout(function () {
                                                    Object(_helper__WEBPACK_IMPORTED_MODULE_1__["hideBlock"])();
                                                }, 500);
                                                var status = err.response.status;

                                                if (status === 422) {
                                                    Object(_helper__WEBPACK_IMPORTED_MODULE_1__["showError"])('update-', err.response.data.errors);
                                                } else {
                                                    toastr.error(err.response.data.message);
                                                }
                                            });
                                            // }
                                        });
                                    }
                                });
                            } //send back

                        }, {
                            key: "initSendBack",
                            value: function initSendBack() {
                                var _this3 = this;

                                this.$btnSendBackArticle.click(function (event) {
                                    event.preventDefault();
                                });
                                this.$formSendBack.submit(function (event) {
                                    event.preventDefault();

                                    if (_this3.$sendBackUserSelect.select2('data').length === 0) {
                                        toastr.info('Chưa chọn người cần chuyển');
                                        return false;
                                    }

                                    Object(_helper__WEBPACK_IMPORTED_MODULE_1__["showBlock"])();
                                    var urlMaskProcessed = _this3.currnenSendback.url_mask_processed;
                                    var status = _this3.currnenSendback.mask_processed_status;
                                    var url = $(event.target).attr('action');
                                    var fd = new FormData(event.target);
                                    fd.append('type', 'role');
                                    fd.append('article_id', _this3.currnenSendback.article.id);
                                    fd.append('from_user', _this3.$userInfo.data('role-id'));
                                    fd.append('from_user_full_name', _this3.$userInfo.data('role-name'));
                                    fd.append('from_user_username', _this3.$userInfo.data('role-name'));
                                    fd.append('status', 9);
                                    fd.append('note', _this3.$sendBackNote.val());
                                    fd.append('sb_or_fw', 2);
                                    fd.append('to_user', _this3.$sendBackUserSelect.select2('data')[0].id);
                                    fd.append('to_user_full_name', $(_this3.$sendBackUserSelect.select2('data')[0].element).data('full_name'));
                                    fd.append('to_user_username', $(_this3.$sendBackUserSelect.select2('data')[0].element).data('username'));
                                    var listUser = [{
                                        id: _this3.$userInfo.data('id'),
                                        full_name: _this3.$userInfo.data('full-name'),
                                        username: _this3.$userInfo.data('username')
                                    }];
                                    fd.append('list_user', JSON.stringify(listUser));
                                    var arr = [axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, fd), axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(urlMaskProcessed, {
                                        status: status
                                    })];
                                    Promise.all(arr).then(function (value) {
                                        if (value[1].data.message) {
                                            toastr.success(value[1].data.message);
                                            setTimeout(function () {
                                                Object(_helper__WEBPACK_IMPORTED_MODULE_1__["hideBlock"])();
                                                window.location.href = _this3.$btnSendBackArticle.data('redirect');
                                            }, 1000);
                                        }
                                    }, function (err) {
                                        toastr.error(err.response.data.message);
                                    });
                                });
                                this.$modalSendBack.on('show.bs.modal', function (event) {
                                    var url = $(event.relatedTarget).data('get-transfer');
                                    axios__WEBPACK_IMPORTED_MODULE_0___default.a.get(url).then(function (_ref) {
                                        var data = _ref.data;
                                        _this3.currnenSendback = data;

                                        _this3.initSendBackSelectUser();
                                    }, function (err) {
                                        toastr.error(err.response.data.message);
                                    });
                                }).on('hide.bs.modal', function () {
                                    if (_this3.$sendBackUserSelect.hasClass("select2-hidden-accessible")) {
                                        _this3.$sendBackUserSelect.select2('destroy');
                                    }

                                    _this3.$sendBackUserSelect.html('');

                                    _this3.$sendBackNote.val('');

                                    _this3.currnenSendback = null;
                                });
                            }
                        }, {
                            key: "initSendBackSelectUser",
                            value: function initSendBackSelectUser() {
                                var _this4 = this;

                                var listUser = this.currnenSendback.list_user.filter(function (item) {
                                    return parseInt(item.id) !== parseInt(_this4.$userInfo.data('id'));
                                });
                                var html = listUser.reduce(function (c, n) {
                                    return c + "<option value=\"".concat(n.id, "\" data-username=\"").concat(n.username, "\" data-full_name=\"").concat(n.full_name, "\">").concat(n.username, "</option>");
                                }, '');
                                this.$sendBackUserSelect.html(html);
                                this.$sendBackUserSelect.select2();
                            } //send back
                            //transfer

                        }, {
                            key: "initTransfer",
                            value: function initTransfer() {
                                var _this5 = this;

                                this.$modalTransferArticle.on('show.bs.modal', function (event) {
                                    _this5.currentTrasnferArticle = $(event.relatedTarget).data('id');
                                }).on('hide.bs.modal', function () {
                                    $('input[value=role]').prop('checked', true);
                                    $('input[value=user]').prop('checked', false);

                                    _this5.$note.val('');

                                    if (_this5.$userSelect.hasClass("select2-hidden-accessible")) {
                                        _this5.$userSelect.select2('destroy');
                                    }

                                    _this5.$roleSelect.parents('.form-group').hide();

                                    _this5.$roleSelect.html('');

                                    _this5.$userSelect.parents('.form-group').hide();

                                    _this5.$userSelect.html('');

                                    _this5.initRoleSelect();
                                });
                                this.$articleTransferBtn.click(function (event) {
                                    event.preventDefault();
                                });
                                this.$transferType.change(function (event) {
                                    if ($(event.target).val() === 'role') {
                                        _this5.transferType = 'role';

                                        _this5.$userSelect.parents('.form-group').hide();

                                        _this5.initRoleSelect();
                                    } else {
                                        _this5.transferType = 'user';

                                        _this5.$roleSelect.parents('.form-group').hide();

                                        _this5.initSelectUser();
                                    }
                                });
                                this.$formTransferCategory.submit(function (event) {
                                    event.preventDefault();

                                    if (_this5.transferType === 'role') {
                                        if (_this5.$roleSelect.select2('data').length === 0) {
                                            toastr.error('Chưa chọn vai trò');
                                            return false;
                                        }
                                    } else {
                                        if (_this5.$userSelect.select2('data').length === 0) {
                                            toastr.error('Chưa chọn người dùng');
                                            return false;
                                        }
                                    }

                                    Object(_helper__WEBPACK_IMPORTED_MODULE_1__["showBlock"])();
                                    var url = $(event.target).attr('action');
                                    var fd = new FormData(event.target);
                                    fd.append('type', _this5.transferType);
                                    fd.append('article_id', _this5.currentTrasnferArticle);
                                    fd.append('from_user', _this5.$userInfo.data('id'));
                                    fd.append('from_user_full_name', _this5.$userInfo.data('full-name'));
                                    fd.append('from_user_username', _this5.$userInfo.data('username'));
                                    fd.append('note', _this5.$note.val());
                                    fd.append('sb_or_fw', 1);
                                    var listUser = [{
                                        id: _this5.$userInfo.data('id'),
                                        full_name: _this5.$userInfo.data('full-name'),
                                        username: _this5.$userInfo.data('username')
                                    }];

                                    if (_this5.transferType === 'role') {
                                        fd.append('to_user', _this5.$roleSelect.select2('data')[0].id);
                                        fd.append('to_user_full_name', _this5.$roleSelect.select2('data')[0].title);
                                        fd.append('to_user_username', _this5.$roleSelect.select2('data')[0].title);
                                    } else {
                                        fd.append('to_user', _this5.$userSelect.select2('data')[0].id);
                                        fd.append('to_user_full_name', _this5.$userSelect.select2('data')[0].full_name);
                                        fd.append('to_user_username', _this5.$userSelect.select2('data')[0].username);
                                        listUser.push({
                                            id: _this5.$userSelect.select2('data')[0].id,
                                            full_name: _this5.$userSelect.select2('data')[0].full_name,
                                            username: _this5.$userSelect.select2('data')[0].username
                                        });
                                    }

                                    fd.append('list_user', JSON.stringify(listUser));
                                    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, fd).then(function (_ref2) {
                                        var data = _ref2.data;

                                        if (data.message) {
                                            toastr.success(data.message);
                                            setTimeout(function () {
                                                Object(_helper__WEBPACK_IMPORTED_MODULE_1__["hideBlock"])();
                                                window.location.href = _this5.$articleTransferBtn.data('redirect');
                                            }, 1000);
                                        }
                                    }, function (err) {
                                        Object(_helper__WEBPACK_IMPORTED_MODULE_1__["hideBlock"])();
                                        toastr.error(err.response.data.message);
                                    });
                                });
                            }
                        }, {
                            key: "initRoleSelect",
                            value: function initRoleSelect() {
                                var _this6 = this;

                                if (this.$roleSelect.hasClass("select2-hidden-accessible")) {
                                    this.$roleSelect.select2('destroy');
                                }

                                this.$roleSelect.html('');
                                this.$roleSelect.parents('.form-group').show();
                                this.$roleSelect.select2({
                                    placeholder: 'Chọn vai trò',
                                    ajax: {
                                        url: this.$roleSelect.data('url'),
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
                                                except: function except() {
                                                    if (_this6.$userInfo.data('role-name') === 'btv') return "[1,".concat(_this6.$userInfo.data('role-id'), ",2]");
                                                    else return "[1,".concat(_this6.$userInfo.data('role-id'), "]");
                                                }
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
                            }
                        }, {
                            key: "initSelectUser",
                            value: function initSelectUser() {
                                var _this7 = this;

                                if (this.$userSelect.hasClass("select2-hidden-accessible")) {
                                    this.$userSelect.select2('destroy');
                                }

                                this.$userSelect.html('');
                                this.$userSelect.parents('.form-group').show();
                                this.$userSelect.select2({
                                    placeholder: 'Chọn người dùng',
                                    ajax: {
                                        url: this.$userSelect.data('url'),
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
                                                roles: function roles() {
                                                    if (_this7.$userInfo.data('role-name') === 'btv') return "[1,".concat(_this7.$userInfo.data('role-id'), ",2]");
                                                    else return "[1,".concat(_this7.$userInfo.data('role-id'), "]");
                                                }
                                            };
                                        },
                                        processResults: function processResults(data) {
                                            return {
                                                results: $.map(data.data, function (item) {
                                                    return {
                                                        text: "".concat(item.username, " | ").concat(item.roles[0].name),
                                                        id: item.id,
                                                        title: "".concat(item.username),
                                                        full_name: "".concat(item.first_name, " ").concat(item.last_name),
                                                        username: item.username
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
                            } //transfer

                        }, {
                            key: "initPickDate",
                            value: function initPickDate() {
                                this.$updatePublishedAt.datetimepicker({
                                    todayHighlight: true,
                                    autoSize: true,
                                    orientation: "bottom left",
                                    autoclose: true,
                                    format: 'dd/mm/yyyy hh:ii',
                                    templates: {
                                        leftArrow: '<i class="la la-angle-left"></i>',
                                        rightArrow: '<i class="la la-angle-right"></i>'
                                    }
                                });

                                // this.$updatePublishedAt.datetimepicker({
                                //   todayHighlight:  true,
                                //   autoSize: true,
                                //   orientation: "bottom left",
                                //   autoclose: true,
                                //   format: 'dd/mm/yyyy hh:ii',
                                //   startDate: new Date(),
                                //   templates: {
                                //     leftArrow: '<i class="la la-angle-left"></i>',
                                //     rightArrow: '<i class="la la-angle-right"></i>'
                                //   }
                                // });
                            }
                        }, {
                            key: "initPreventReload",
                            value: function initPreventReload() {
                                this.$title.on('keyup change', function () {
                                    if (!window.onbeforeunload) window.onbeforeunload = function () {
                                        return '';
                                    };
                                });
                                this.$excerpt.on('keyup change', function () {
                                    if (!window.onbeforeunload) window.onbeforeunload = function () {
                                        return '';
                                    };
                                });
                                this.$uploadGoogleKey.on('keyup change', function () {
                                    if (!window.onbeforeunload) window.onbeforeunload = function () {
                                        return '';
                                    };
                                });
                                this.$updateGoogleDescription.on('keyup change', function () {
                                    if (!window.onbeforeunload) window.onbeforeunload = function () {
                                        return '';
                                    };
                                });
                                this.$uploadFbTitle.on('keyup change', function () {
                                    if (!window.onbeforeunload) window.onbeforeunload = function () {
                                        return '';
                                    };
                                });
                                this.$uploadFbDescription.on('keyup change', function () {
                                    if (!window.onbeforeunload) window.onbeforeunload = function () {
                                        return '';
                                    };
                                });
                                this.$author.on('keyup change', function () {
                                    if (!window.onbeforeunload) window.onbeforeunload = function () {
                                        return '';
                                    };
                                });
                            }
                        }, {
                            key: "initThumbnail",
                            value: function initThumbnail() {
                                var _this8 = this;

                                this.dropifyThumbail = this.$thumbnail.dropify({
                                    height: 150,
                                    messages: {
                                        'default': 'Chọn hình đại diện',
                                        'replace': 'Click để thay thế',
                                        'remove': 'Xóa',
                                        'error': 'Ooops, có lỗi bất ngờ xảy ra.'
                                    }
                                });
                                this.$selectThumbnail.click(function (event) {
                                    event.preventDefault();
                                    _this8.fileMode = 'image';
                                    _this8.selectResourceIsCurrentUseFor = 'thumbnail';
                                });
                                this.$thumbnail.click(function (event) {
                                    event.preventDefault();

                                    _this8.$selectThumbnail.click();
                                });
                            }
                        }, {
                            key: "initCover",
                            value: function initCover() {
                                var _this9 = this;

                                this.dropifyCoverPC = this.$updateCoverPc.dropify({
                                    height: 300,
                                    messages: {
                                        'default': 'Chọn hình cover cho PC',
                                        'replace': 'Click để thay thế',
                                        'remove': 'Xóa',
                                        'error': 'Ooops, có lỗi bất ngờ xảy ra.'
                                    }
                                });
                                this.$selectCoverPc.click(function (event) {
                                    event.preventDefault();
                                    _this9.fileMode = 'image';
                                    _this9.selectResourceIsCurrentUseFor = 'cover-pc';
                                });
                                this.$updateCoverPc.click(function (event) {
                                    event.preventDefault();

                                    _this9.$selectCoverPc.click();
                                });
                                this.dropifyCoverMobile = this.$updateCoverMoblie.dropify({
                                    height: 300,
                                    messages: {
                                        'default': 'Chọn hình cover cho mobile',
                                        'replace': 'Click để thay thế',
                                        'remove': 'Xóa',
                                        'error': 'Ooops, có lỗi bất ngờ xảy ra.'
                                    }
                                });
                                this.$selectCoverMobile.click(function (event) {
                                    event.preventDefault();
                                    _this9.fileMode = 'image';
                                    _this9.selectResourceIsCurrentUseFor = 'cover-mobile';
                                });
                                this.$updateCoverMoblie.click(function (event) {
                                    event.preventDefault();

                                    _this9.$selectCoverMobile.click();
                                });
                            }
                        }, {
                            key: "initPreview",
                            value: function initPreview() {
                                var _this10 = this;

                                this.$articlePreviewBtn.click(function (event) {
                                    event.preventDefault();
                                    var url = $(event.currentTarget).data('preview');

                                    _this10.setLocalStorageData();

                                    if (_this10.window) {
                                        // _this10.window.location.reload();
                                    } else {
                                        _this10.window = window.open(url, '_blank');

                                        _this10.window.onbeforeunload = function () {
                                            _this10.window = null;
                                            localStorage.removeItem('data_preview');
                                        };
                                        //_but = $('review').all(0);
                                    }
                                });
                            }
                        }, {
                            key: "initSelectBlock",
                            value: function initSelectBlock() {
                                this.$modalSelectBlock.on('show.bs.modal', function (event) {
                                    var html = Object.keys(_block__WEBPACK_IMPORTED_MODULE_5__["block"]).reduce(function (c, n) {
                                        return c + "<dic class=\"row mt-2 mb-2\">\n                                <div class=\"col-6\">\n                                    <label class=\"kt-radio kt-radio--bold kt-radio--brand\"><input type=\"radio\" value=\"".concat(n, "\" name=\"select-block-html\"><strong>").concat(_block__WEBPACK_IMPORTED_MODULE_5__["block"][n].name, "</strong><span></span></label>\n                                </div>\n                                <div class=\"col-6\">\n                                    <burron class=\"btn btn-info preview-block\" data-key=\"").concat(n, "\" style=\"cursor: pointer\">Xem</burron>\n                                </div>\n                            </dic>");
                                    }, '');
                                    $('#checkbox').html(html);
                                }).on('hide.bs.modal', function (event) {
                                    $('#checkbox').html('');
                                    $('#preview-block').html('');
                                });
                                $(document).on('click', '.preview-block', function (event) {
                                    event.preventDefault();
                                    var key = $(event.currentTarget).data('key');
                                    $('#preview-block').html(_block__WEBPACK_IMPORTED_MODULE_5__["block"][key].html);
                                    if (key === 'block_11') $('#preview-block').find('p').css({
                                        'margin-left': '-100px'
                                    });
                                });

                                this.$selectBlock.click(function () {
                                    var html = '';
                                    var blockType = '';

                                    var storeBlock = '#store-select-block';
                                    $('input[name=select-block-html]').toArray().forEach(function (check) {
                                        if ($(check).prop('checked')) {
                                            html += _block__WEBPACK_IMPORTED_MODULE_5__["block"][$(check).val()].html;
                                            blockType = $("#select-block-type option:selected").val();
                                            $(storeBlock).html(html);

                                            switch (blockType) {
                                                case 'left-block':
                                                    $(storeBlock + '> table').attr('align', 'left');
                                                    $(storeBlock + '> table').addClass('left-block');
                                                    $(storeBlock + '> table').css({ 'width': '40%', 'margin-top': '-25px', 'margin-right': '10px' });
                                                    break;
                                                case 'right-block':
                                                    $(storeBlock + '> table').attr('align', 'right');
                                                    $(storeBlock + '> table').addClass('right-block');
                                                    $(storeBlock + '> table').css({ 'width': '40%', 'margin-top': '-25px', 'margin-left': '10px' });
                                                    break;

                                            }

                                            $(storeBlock + '> table > tbody > tr td').eq(1).remove();

                                            html = '';
                                            html += $(storeBlock).html();

                                        }
                                    });

                                    var positionMark = document.getElementById('position_mark');
                                    $(html).insertAfter(positionMark);

                                    $(positionMark).remove();


                                });
                                $(document).on('change', 'input[name=select-block-html]', function (event) {
                                    var val = $('input[name=select-block-html]:checked').val();
                                    $('#preview-block').html(_block__WEBPACK_IMPORTED_MODULE_5__["block"][val].html);
                                    if (val === 'block_11') $('#preview-block').find('p').css({
                                        'margin-left': '-100px'
                                    });
                                    if (val == 'block_1') {
                                        $('#preview-block').append("<select  class = 'browser-default custom-select custom-select-lg mb-3' id='select-block-type'><option selected value='center-block'>Block 1 giữa</option><option value='left-block' > Block 1 bên trái</option ><option value='right-block'>Block 1 bên phải</option></select >");
                                    }
                                });
                            }
                        }, {
                            key: "setImageDropify",
                            value: function setImageDropify(img, type) {
                                switch (type) {
                                    case 'thumbnail':
                                        {
                                            var thumb = this.dropifyThumbail.data('dropify');
                                            thumb.settings.defaultFile = img.base_url + '/' + img.absolute_url;
                                            thumb.destroy();
                                            thumb.init();
                                            this.thumb = img;
                                            break;
                                        }

                                    case 'cover-pc':
                                        {
                                            var cover = this.dropifyCoverPC.data('dropify');
                                            cover.settings.defaultFile = img.base_url + '/' + img.absolute_url;
                                            cover.destroy();
                                            cover.init();
                                            this.coverPC = img;
                                            break;
                                        }

                                    case 'cover-mobile':
                                        {
                                            var _cover = this.dropifyCoverMobile.data('dropify');

                                            _cover.settings.defaultFile = img.base_url + '/' + img.absolute_url;

                                            _cover.destroy();

                                            _cover.init();

                                            this.coverMobile = img;
                                            break;
                                        }
                                }

                                $('.dropify-clear').hide();
                            }
                        }, {
                            key: "initFroalaEditor",
                            value: function initFroalaEditor() {
                                var _this11 = this;

                                var setCurrentEditFile = this.setCurrentEditFile.bind(this);
                                var setFileMode = this.setFileMode.bind(this);
                                var processFileType = this.processFileMode.bind(this);
                                var setSelectResourceIsCurrentUseFor = this.setSelectResourceIsCurrentUseFor.bind(this);
                                var setQuickInsertSetHtmlFunc = this.setQuickInsertSetHtmlFunc.bind(this);
                                var getWindow = this.getWindow.bind(this);
                                var setLocalStorageData = this.setLocalStorageData.bind(this); // define icon template

                                FroalaEditor.DefineIconTemplate('svg-icon', '[SVG]');
                                FroalaEditor.DefineIconTemplate('fontawesome-icon', '<i class="[ICON]"></i>');
                                FroalaEditor.DefineIconTemplate('lineawesome-icon', '<i class="[ICON]"></i>');
                                FroalaEditor.DefineIconTemplate('flat-icon', '<i class="[ICON]"></i>');
                                FroalaEditor.DefineIconTemplate('soc-icon', '<i class="[ICON]"></i>'); // define icon
                                FroalaEditor.DefineIconTemplate('material_design', "<button class='btn btn-primary' type='button' data-toggle='collapse' data-target='.multi-collapse' aria-expanded='false' aria-controls='multiCollapseExample1 multiCollapseExample2>Tài nguyên bài viết</button>");

                                FroalaEditor.DefineIcon('browseImage', {
                                    ICON: 'flaticon2-image-file',
                                    template: 'flat-icon'
                                });
                                FroalaEditor.DefineIcon('browseVideo', {
                                    ICON: 'socicon-filmweb',
                                    template: 'soc-icon'
                                });
                                FroalaEditor.DefineIcon('selectBlockHtml', {
                                    ICON: 'flaticon2-download-2',
                                    template: 'flat-icon'
                                }); //register command

                                // FroalaEditor.DefineIcon('smartphoneIcon',{
                                //   ICON : '',
                                //   template : 'material_design'
                                // });



                                FroalaEditor.RegisterCommand('modalBrowseImage', {
                                    icon: 'browseImage',
                                    title: 'Chèn hình',
                                    callback: function callback() {
                                        this.html.insert('<div id="position_mark"></div>');
                                        setQuickInsertSetHtmlFunc(this.html.insert.bind(this));
                                        setSelectResourceIsCurrentUseFor('froala-quick-insert');
                                        var model = setCurrentEditFile(null);
                                        setFileMode('image');
                                        processFileType();
                                        //   $('a[href="#modal-upload-tab-select-resource"]').trigger('click');
                                        $(model).modal('show');


                                    },
                                    undo: true
                                });




                                FroalaEditor.RegisterCommand('modalBrowseVideo', {
                                    icon: 'browseVideo',
                                    title: 'Chèn video',
                                    callback: function callback() {
                                        this.html.insert('<div id="position_mark"></div>');
                                        setQuickInsertSetHtmlFunc(this.html.insert.bind(this));
                                        setSelectResourceIsCurrentUseFor('froala-quick-insert');
                                        var model = setCurrentEditFile(null);
                                        setFileMode('video');
                                        processFileType();
                                        $(model).modal('show');
                                    },
                                    undo: true
                                });


                                FroalaEditor.RegisterCommand('modalSelectBlockHtml', {
                                    title: 'Chọn block',
                                    icon: 'selectBlockHtml',
                                    type: 'button',
                                    focus: true,
                                    undo: true,
                                    refreshAfterCallback: false,
                                    callback: function callback() {
                                        _this11.editor.html.insert('<div id="position_mark"></div>');
                                        _this11.$modalSelectBlock.modal('show');
                                    }
                                });

                                FroalaEditor.RegisterCommand('modalSelectResource', {
                                    title: 'Chọn Tai nguyen',
                                    template: 'material_design',
                                    focus: true,
                                    undo: true,
                                    refreshAfterCallback: false,
                                    callback: function callback() {
                                        _this11.editor.html.insert('<div id="position_mark"></div>');

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
                                });
                                FroalaEditor.RegisterCommand('videoCaption', {
                                    title: 'Chú thích',
                                    icon: 'imageCaption',
                                    focus: true,
                                    undo: true,
                                    refreshAfterCallback: false,
                                    callback: function () {
                                        setSelectResourceIsCurrentUseFor('froala');
                                        let video = this.video.get()[0];
                                        let model = setCurrentEditFile({
                                            type: 'video',
                                            video
                                        });
                                        setFileMode('video');
                                        processFileType();

                                        let spanClassFr_video = $('.fr-video span');
                                        if (spanClassFr_video.length > 0) {
                                            $('.fr-video span').remove();
                                        }

                                        $('.fr-video').append('<span  class= "fr-inner" contenteditable="true" ></span>');
                                        $('#videoCaption-1').click(function () {
                                            $('.fr-video').addClass('fr-active');
                                            $('.fr-inner').text('caption');
                                        });

                                    }
                                });

                                FroalaEditor.RegisterCommand('reloadPreview', {
                                    refreshAfterCallback: false,
                                    callback: function callback() {
                                        if (getWindow()) {
                                            setLocalStorageData();
                                            getWindow().location.reload();
                                        }
                                    }
                                }); // Define a button.



                                FroalaEditor.RegisterQuickInsertButton('quickInsertButtonImage', {
                                    icon: 'browseImage',
                                    title: 'Chèn hình',
                                    callback: function callback() {
                                        this.html.insert('<div id="position_mark"></div>');
                                        setQuickInsertSetHtmlFunc(this.html.insert.bind(this));
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
                                        this.html.insert('<div id="position_mark"></div>');
                                        setQuickInsertSetHtmlFunc(this.html.insert.bind(this));
                                        setSelectResourceIsCurrentUseFor('froala-quick-insert');
                                        var model = setCurrentEditFile(null);
                                        setFileMode('video');
                                        processFileType();
                                        $(model).modal('show');
                                    },
                                    undo: true
                                });

                                FroalaEditor.RegisterShortcut(83, 'reloadPreview', 'H1', 'H', false);
                            }
                        }, {
                            key: "initEditor",
                            value: function initEditor() {
                                let this11 = this;
                                var newContent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
                                var oldContent = '';

                                if (newContent) {
                                    oldContent = $('.fr-element').html();

                                    if (this.editor) {
                                        this.editor.destroy();
                                        this.editor = null;
                                    }
                                }

                                var content = (oldContent ? oldContent : '') + (newContent ? newContent : '');
                                this.editor = new FroalaEditor(this.$content[0], {
                                    language: 'vi',
                                    toolbarInline: false,
                                    height: 600,
                                    colorsButtons: ["colorsBack"],
                                    toolbarButtons: ["bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "fontFamily", "fontSize", 'textColor', 'backgroundColor', "specialCharacters", "paragraphFormat", "align", "formatOL", "formatUL", "outdent", "indent", "insertLink", "popupBrowseImage", "popupBrowseVideo", "insertTable", "quote", "insertHR", "undo", "redo", "clearFormatting", "selectAll", "html", "popupInsertRelatedObject", "embedly", 'modalBrowseImage', 'modalBrowseVideo', 'modalSelectBlockHtml'],
                                    quickInsertButtons: ['quickInsertButtonImage', 'quickInsertButtonVideo'],
                                    imageEditButtons: ["imageDisplay", "imageAlign", "imageSize", "-", "imageRemove", 'imageReplace'], // 'imageCaption' 
                                    videoEditButtons: ["videoDisplay", "videoAlign", "videoSize", "-", "videoRemove", "videoReplace", "videoCaption"],
                                    fontFamily: {
                                        "Roboto,sans-serif": 'Roboto',
                                        "Oswald,sans-serif": 'Oswald',
                                        "Montserrat,sans-serif": 'Montserrat',
                                        "'Open Sans Condensed',sans-serif": 'Open Sans Condensed'
                                    },
                                    fontFamilySelection: true,
                                    events: {
                                        'keydown': function (event) {
                                            if (event.keyCode == 13) {
                                                this.html.insert('<span id="position_mark"></span>');
                                            }

                                        },
                                        initialized: function initialized() {
                                            this.html.set("<div class=\"fr-view\">".concat(content, "</div>"));
                                            let existsClass = $('.fr-element').hasClass('fr-view');
                                            if (!existsClass) {

                                            } else {
                                                $('.fr-element').html(content);
                                            }
                                            $('p br').remove();

                                            let query = {

                                                'queryElementByTable': $('.fr-element .desc_image'),
                                                'queryElementByFigure': $('.fr-element').find('figure')
                                            };
                                            console.log(query.queryElementByFigure.eq(5).closest('.dbox').html());

                                            let elementLenght = {
                                                'tagTable': query.queryElementByTable.length,
                                                'tagFigure': query.queryElementByFigure.length

                                            };

                                            let childNodes = [];

                                            if (elementLenght.tagTable != undefined && elementLenght.tagTable > 0) {
                                                for (var i = 0; i < elementLenght.tagTable; i++) {
                                                    let data = [];
                                                    //   set url
                                                    data['src'] = query.queryElementByTable.eq(i).find('tbody').attr('index-table', i).find('img').attr('src');
                                                    //set  type
                                                    data['type'] = 'index-table';
                                                    // set index
                                                    data['index'] = i;
                                                    //  checked radio

                                                    data['checked'] = query.queryElementByTable.eq(i).hasClass('img-full');
                                                    data['exception'] = true;
                                                    childNodes.push(data);
                                                }
                                            }
                                            if (elementLenght.tagFigure != undefined && elementLenght.tagFigure > 0) {
                                                for (var i = 0; i < elementLenght.tagFigure; i++) {

                                                    let data = [];
                                                    // set  src
                                                    data['src'] = query.queryElementByFigure.eq(i).not('.img-left, .img-right').find('div').attr('index-figure', i).find('img').attr('src');
                                                    //set   type
                                                    data['type'] = 'index-figure';
                                                    // set index
                                                    data['index'] = i;
                                                    //set checked
                                                    data['checked'] = query.queryElementByFigure.eq(i).hasClass('img-full');
                                                    data['exception'] = (query.queryElementByFigure.eq(i).closest('.dbox').html() == undefined) ? true : false;
                                                    data['exception'] = (query.queryElementByFigure.eq(i).closest('div').hasClass('block-quote-style ')) ? false : true;
                                                    data['exception'] = (query.queryElementByFigure.eq(i).find('div').hasClass('grid-2')) ? false : true;
                                                    data['exception'] = (query.queryElementByFigure.eq(i).find('div').hasClass('grid-3-w')) ? false : true;

                                                    data['exception'] = (query.queryElementByFigure.eq(i).closest('table').hasClass('dbox')) ? false : true;
                                                    childNodes.push(data);
                                                }
                                            }


                                            let SelectImageFullSize = $('#select-img-full-size tbody');
                                            if (childNodes != null) {

                                                childNodes.forEach(function (node) {
                                                    if (node.src != undefined && node.exception) {
                                                        SelectImageFullSize.append(
                                                            `<tr><td><img src = "${node.src}"></td>\
                                                             <td><input class="full-size" type ='radio' value=1 name=${node.type}-${node.index}  base_type=${node.type} index=${node.index} ${(node.checked) ? 'checked' : null} ></td>
                                                            <td><input class="cancel-full-size" type="radio" value="0"name=${node.type}-${node.index}  base_type=${node.type} index=${node.index}  ${(!node.checked) ? 'checked' : null}></td>
                                                        </tr>`);
                                                    }
                                                });
                                            } else {

                                                SelectImageFullSize.append('<tr><td>Không tìm thấy ảnh nào </td></tr>');
                                            }
                                            // thoat  chen hinh fullwidth
                                            $(document).on('click', '.close-image-full', function () {
                                                $('#image-full').css({ 'display': 'none' });
                                            })
                                            // event chen hinh fullwidth
                                            $(document).on('change', '.full-size', function () {
                                                let type = $(this).attr('base_type');
                                                let index = $(this).attr('index');
                                                if (type && index != undefined && type && index != null) {
                                                    const table = 'index-table';
                                                    const figure = 'index-figure';
                                                    if (type == table)
                                                        query.queryElementByTable.eq(index).addClass('img-full');
                                                    else
                                                        query.queryElementByFigure.eq(index).removeClass('img-big').addClass('img-full');
                                                }
                                            })
                                            // huy bo hinh full size da chon  sang hinh thong thuong

                                            $(document).on('change', '.cancel-full-size', function () {
                                                let type = $(this).attr('base_type');
                                                let index = $(this).attr('index');
                                                if (type && index != undefined && type && index != null) {
                                                    const table = 'index-table';
                                                    const figure = 'index-figure';
                                                    if (type == table)
                                                        query.queryElementByTable.eq(index).removeClass('img-full');
                                                    else
                                                        query.queryElementByFigure.eq(index).removeClass('img-full');
                                                }
                                            })

                                            //  an  block cho chen full size

                                            $(document).on('click', '#article-img-full-size', function () {
                                                $('#image-full').show();

                                            })


                                            $(document).on('click', 'figcaption', function (parentEvent) {

                                                let nodeParent = $(this);


                                                $(document).on('keyup', nodeParent, function (event) {
                                                    let code = event.keyCode;
                                                    if (code == 46) {
                                                        nodeParent.remove();
                                                    }

                                                    let content = nodeParent.text().trim();
                                                    if (content.length > 0) {
                                                        nodeParent.removeClass('caption-has-border');
                                                    } else {
                                                        nodeParent.addClass('caption-has-border');
                                                    }
                                                })
                                            });

                                            $(document).on('click', 'figure', function () {
                                                let nodeParent = $(this);

                                                $(document).on('keyup', nodeParent, function (e) {
                                                    if (e.keyCode == 46) {
                                                        nodeParent.remove();
                                                    }
                                                })
                                            })

                                        },
                                        contentChanged: function contentChanged() { },
                                    }

                                });

                            }
                        }, {
                            key: "initSelect2",
                            value: function initSelect2() {
                                var _this12 = this;

                                this.$categories.select2({
                                    placeholder: 'Select one',
                                    ajax: {
                                        url: this.$categories.data('url'),
                                        dataType: 'json',
                                        delay: 250,
                                        method: 'POST',
                                        headers: {
                                            'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
                                        },
                                        data: function data(params) {
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
                                this.$themes.select2({
                                    placeholder: 'Chọn chủ đề',
                                    ajax: {
                                        url: this.$themes.data('url'),
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

                                this.$categories.on('select2:select', function () {
                                    var formGroup = _this12.$categories.parent();

                                    formGroup.find('.invalid-feedback').remove();

                                    _this12.$categories.removeClass('icategoriess-invalid');

                                    if (!window.onbeforeunload) window.onbeforeunload = function () {
                                        return '';
                                    };
                                });

                                this.$tags.on('select2:select', function () {
                                    var formGroup = _this12.$tags.parent();

                                    formGroup.find('.invalid-feedback').remove();

                                    _this12.$tags.removeClass('is-invalid');

                                    if (!window.onbeforeunload) window.onbeforeunload = function () {
                                        return '';
                                    };
                                });
                                this.$themes.on('select2:select', function () {
                                    var formGroup = _this12.$themes.parent();

                                    formGroup.find('.invalid-feedback').remove();

                                    _this12.$themes.removeClass('is-invalid');

                                    if (!window.onbeforeunload) window.onbeforeunload = function () {
                                        return '';
                                    };
                                });
                            }
                        }, {
                            key: "setFileMode",
                            value: function setFileMode(value) {
                                this.fileMode = value;
                            }
                        }, {
                            key: "processFileMode",
                            value: function processFileMode() {
                                switch (this.fileMode) {
                                    case 'image':
                                        {
                                            $('#modal-upload-resource-input').attr('accept', 'image/png,image/jpg,image/jpeg');
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
                                            $('#modal-upload-resource-input').attr('accept', 'video/mp4,video/mkv,video/avi');
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
                            key: "setCurrentEditFile",
                            value: function setCurrentEditFile(file) {
                                this.currentEditFile = file;
                                return this.$modalSelectResource;
                            }
                        }, {
                            key: "initHtmlResourceRepo",
                            value: function initHtmlResourceRepo(data, thumbnailId = '') {
                                var _this15 = this;
                                var displayStyle = (thumbnailId == '') ? 'block' : 'none';
                                var resourceFolder = (data.base_url != null) ? data.base_url + "/" : _this15.$baseUrl + '/ttct/';
                                var col = "<div  class = 'row'>";
                                col += "<div class='col'>\
                              <div class='collapse multi-collapse show' id='multiCollapseExample1 show'>\
                                <div class='card card-body'>\
                                  <div class='file-thumb'>\
                                    <img class='thumb-base' style='height:200px'\
                                    src='" + resourceFolder + data.absolute_url + "'\
                                    alt=''>\
                                  </div>\
                                </div>\
                              </div>\
                            </div>";
                                col += "    <div class='col'>\
                            <div class='collapse multi-collapse show' id='multiCollapseExample2'>\
                              <div class='card card-body' style='height:20%'>\
                                <div class='actions'>\
                                  <i><input type='radio' name='thumb' value='" + data.id + "'   thumb = '" + resourceFolder + data.absolute_url + "'  >\
                                    <label style='font-weight: 800;' for=''>Ảnh đại diện</label></i>\
                                  <i  class='fas fa-plus-square  insert-resource-froala'  base_url = '" + resourceFolder + "' absolute_url = '" + data.absolute_url + "' description='" + data.description + "'  ><span> &nbsp Chèn ảnh</span></i>\
                                  <i class='fas fa-exchange-alt  replaceArticleImg' data-id='" + data.id + "' ><span>&nbsp Thay thế</span></i>\
                                  <i class='fa fa-save save-description-btn' data-id='" + data.id + "'><span> &nbsp Lưu chú thích</span></i>\
                                  <i class='far fa-trash-alt deleteThumb' data-id='" + data.id + "' style='display:" + displayStyle + "'><span>&nbsp Xóa hình</span></i>\
                                </div>\
                              </div>\
                              <div class='card card-body' style='margin:0% 0% 0% 0%'>\
                                <textarea  class='" + data.id + "' value='" + data.description + "' cols='20' rows='4' placeholder='Chú thích cho ảnh'>" + data.description + "</textarea>\
                              </div>\
                            </div>\
                          </div>";
                                col += "</div>"
                                return col;

                            }
                        }, {
                            key: "unique",
                            value: function unique(arr) {
                                return Array.from(new Set(arr));
                            }
                        },
                        {
                            key: "initGetData",
                            value: function initGetData() {
                                var _this13 = this;

                                axios__WEBPACK_IMPORTED_MODULE_0___default.a.get($('#kt_content').data('edit')).then(function (_ref3) {
                                    var data = _ref3.data;

                                    var permissions = Object(_helper__WEBPACK_IMPORTED_MODULE_1__["checkPermissions"])(['article-publish'], _this13.acl.permissions);
                                    _this13.data = data;
                                    _this13.thumb = data.thumbnail;

                                    _this13.$title.val(data.title);
                                    var subTitle = data.sub_title.split('@', 2);
                                    _this13.$sub_title.val(subTitle[0]);
                                    _this13.$sub_title.css('color', subTitle[1]);
                                    $('.simpleColorDisplay').css('background-color', subTitle[1]);

                                    _this13.$setTopicalArticle.val(data.priority);


                                    // set id to html
                                    $('#update-content').attr('article_id', data.id);

                                    if (data.display) {
                                        $('#display-article option').each(function () {
                                            if ($(this).val() == data.display) {
                                                $(this).attr("selected", "selected");
                                            }
                                        });
                                    }

                                    var checkThumbId = data.thumbnail.id;
                                    var is = true;
                                    var resources = data.resources;
                                    // resources = resources.concat(data.thumbnail);

                                    for (var i = 0; i < resources.length; i++) {
                                        if (checkThumbId != null && resources[i].id == checkThumbId) {
                                            is = false
                                        }
                                    }

                                    if (is) {

                                        resources = resources.concat(data.thumbnail);
                                    }

                                    var html = '';

                                    resources.forEach(function (item) {
                                        if (item.absolute_url != '') {
                                            html += _this13.initHtmlResourceRepo(item);
                                        }
                                    });

                                    $(document).ready(function () {
                                        $("input[name='thumb']").each(function () {
                                            if ($(this).val() == checkThumbId) {
                                                this.checked = true;
                                            }
                                        });
                                    })

                                    _this13.$tableResource.html(html);


                                    _this13.$excerpt.val(data.excerpt);

                                    _this13.$author.val(data.author);

                                    data.relatedArticle.map(function (item) {
                                        var _option = new Option(item.title, item.id, true, true, true);
                                        $(_option).attr("title", item.title);
                                        _this13.$relatedArticle.append(_option).trigger('change');
                                    });



                                    if (data.published_at) _this13.$updatePublishedAt.val(data.published_at);
                                    document.title = data.title + ' ' + document.title;
                                    data.metas.forEach(function (meta) {
                                        switch (meta.key) {
                                            case 'google-description':
                                                {
                                                    _this13.$updateGoogleDescription.val(meta.value);

                                                    break;
                                                }

                                            case 'google-key':
                                                {
                                                    _this13.$uploadGoogleKey.val(meta.value);

                                                    break;
                                                }

                                            case 'fb-description':
                                                {
                                                    _this13.$uploadFbDescription.val(meta.value);

                                                    break;
                                                }

                                            case 'fb-title':
                                                {
                                                    _this13.$uploadFbTitle.val(meta.value);

                                                    break;
                                                }

                                            case 'off_title':
                                                {
                                                    parseInt(meta.value) === 2 && _this13.$offTitle.prop('checked', true).trigger('change');
                                                    break;
                                                }

                                            case 'off_thumb_pc':
                                                {
                                                    parseInt(meta.value) === 2 && _this13.$offThumbPc.prop('checked', true).trigger('change');
                                                    break;
                                                }

                                            case 'off_thumb_mobile':
                                                {
                                                    parseInt(meta.value) === 2 && _this13.$offThumbMobile.prop('checked', true).trigger('change');
                                                    break;
                                                }

                                            case 'off_description':
                                                {
                                                    parseInt(meta.value) === 2 && _this13.$offDescription.prop('checked', true).trigger('change');
                                                }
                                        }
                                    });

                                    var thumb = _this13.dropifyThumbail.data('dropify');

                                    thumb.settings.defaultFile = "".concat(data.thumbnail.base_url, "/").concat(data.thumbnail.absolute_url);
                                    thumb.destroy();
                                    thumb.init();

                                    if (data.cover_p_c) {
                                        _this13.coverPC = data.cover_p_c;

                                        var coverPC = _this13.dropifyCoverPC.data('dropify');

                                        coverPC.settings.defaultFile = "".concat(data.cover_p_c.base_url, "/").concat(data.cover_p_c.absolute_url);
                                        coverPC.destroy();
                                        coverPC.init();
                                    }

                                    if (data.cover_mobile) {
                                        _this13.coverMobile = data.cover_mobile;

                                        var coverMobile = _this13.dropifyCoverMobile.data('dropify');

                                        coverMobile.settings.defaultFile = "".concat(data.cover_mobile.base_url, "/").concat(data.cover_mobile.absolute_url);
                                        coverMobile.destroy();
                                        coverMobile.init();
                                    }

                                    $('.dropify-clear').hide();
                                    var categories = data.categories;
                                    var valueCa = categories.map(function (item) {
                                        if (parseInt(item.type) === 1) {
                                            var option = new Option(item.name, item.id);

                                            _this13.$categories.append(option);

                                            return item.id;
                                        } else if (parseInt(item.type) === 2) {
                                            $('.topical').show();

                                            var _option = new Option(item.name, item.id);

                                            _this13.$updateTopical.append(_option);

                                            _this13.$updateTopical.select2();

                                            _this13.$updateTopical.prop('disabled', true);
                                        }
                                    });




                                    _this13.$categories.val(valueCa).trigger('change');

                                    var valueTag = data.tags.map(function (tag) {
                                        var option = new Option(tag.name, tag.id);

                                        _this13.$tags.append(option);

                                        return tag.id;
                                    });


                                    _this13.$tags.val(valueTag).trigger('change');

                                    var themes = data.themes;
                                    var valueTheme = themes.map(function (theme) {
                                        var option = new Option(theme.name, theme.id);

                                        _this13.$themes.append(option);

                                        return theme.id;
                                    });

                                    _this13.$themes.val(valueTheme).trigger('change'); //pv, btv


                                    if (!permissions['article-publish']) {
                                        if (parseInt(data.status) === 6) {
                                            _this13.$articleTransferBtn.remove();
                                        }

                                        _this13.$btnSaveAndPublishNow.remove();

                                        _this13.$btnSendBackArticle.remove();
                                    } else {
                                        if (parseInt(data.creator_id) === parseInt(_this13.$userInfo.data('id')) && _this13.$userInfo.data('role-name') === 'tkts' || parseInt(data.status) === 10) {
                                            _this13.$btnSendBackArticle.remove();
                                        }

                                        _this13.$articleTransferBtn.remove();

                                        if (_this13.data.published_at_is_pass && parseInt(_this13.data.status) === 10) {
                                            _this13.$btnSaveAndPublishNow.remove();

                                            _this13.$btnSaveAndGoToPending.remove();

                                            //_this13.$updatePublishedAt.parent().remove();
                                        } else if (!_this13.data.published_at_is_pass && parseInt(_this13.data.status) === 10) {
                                            _this13.$btnSaveAndPublishNow.remove();
                                        }
                                    }

                                    _this13.initEditor(_this13.data.content);

                                    _this13.initPickDate();

                                    setTimeout(function () {
                                        Object(_helper__WEBPACK_IMPORTED_MODULE_1__["hideBlock"])();
                                    }, 500);
                                }, function (err) {
                                    Object(_helper__WEBPACK_IMPORTED_MODULE_1__["hideBlock"])();

                                    _this13.$btnSubmit.prop('disabled', true);

                                    _this13.$modalUploadResourceBtnUpload.remove();

                                    _this13.$articlePreviewBtn.prop('disabled', true);

                                    var status = err.response.status;

                                    if (status === 500) {
                                        toastr.error(err.response.data.message);
                                    }
                                });
                            }
                        },
                        {
                            key: 'selectThumb',
                            value: function selectThumb() {
                                let _this16 = this;
                                $(document).on('change', "input[name='thumb']", function () {
                                    if (this.checked) {
                                        var thumb_link = $(this).attr('thumb');
                                        if (thumb_link != null && thumb_link != undefined) {
                                            _this16.thumbnailId = $(this).val();
                                            var thumb = _this16.dropifyThumbail.data('dropify');
                                            thumb.settings.defaultFile = thumb_link;
                                            thumb.destroy();
                                            thumb.init();

                                            var thumbPC = _this16.dropifyCoverPC.data('dropify');
                                            thumbPC.settings.defaultFile = thumb_link;
                                            thumbPC.destroy();
                                            thumbPC.init();


                                            var thumbMobile = _this16.dropifyCoverMobile.data('dropify');
                                            thumbMobile.settings.defaultFile = thumb_link;
                                            thumbMobile.destroy();
                                            thumbMobile.init();
                                        }
                                    }
                                });
                            }
                        }, {
                            key: "initSubmit",
                            value: function initSubmit() {
                                var _this14 = this;

                                this.$btnSubmit.click(function (event) {
                                    event.preventDefault();


                                    Object(_helper__WEBPACK_IMPORTED_MODULE_1__["showBlock"])();
                                    var url = $(event.currentTarget).data('update');

                                    var fd = _this14.generateFormData();

                                    axios__WEBPACK_IMPORTED_MODULE_0___default.a.post(url, fd).then(function (res) {
                                        if (res.data && res.data.message) {
                                            window.onbeforeunload = null;
                                            toastr.success(res.data.message);
                                            setTimeout(function () {
                                                Object(_helper__WEBPACK_IMPORTED_MODULE_1__["hideBlock"])();
                                                window.location.reload();
                                            }, 1000);
                                        } else {
                                            toastr.error('Có lỗi xảy ra, thử lại sau');
                                        }
                                    }, function (err) {
                                        setTimeout(function () {
                                            Object(_helper__WEBPACK_IMPORTED_MODULE_1__["hideBlock"])();
                                        }, 500);
                                        var status = err.response.status;

                                        if (status === 422) {
                                            Object(_helper__WEBPACK_IMPORTED_MODULE_1__["showError"])('update-', err.response.data.errors);
                                        } else {
                                            toastr.error(err.response.data.message);
                                        }
                                    });
                                });
                            }
                        }, {
                            key: "setLocalStorageData",
                            value: function setLocalStorageData() {
                                var categories = this.$categories.select2('data');
                                var tags = this.$tags.select2('data');
                                var a = $('.fr-element');


                                // if ($(a).children('.fr-view').length > 0) {
                                //   var b = a.children('.fr-view');
                                //   var i = 0;

                                //   do {
                                //     a = b;
                                //     b = $(a).children('.fr-view').length > 0 ? $(a).children('.fr-view') : undefined;
                                //     i++;
                                //   } while (b !== undefined);
                                // }

                                var data = {
                                    title: this.$title.val(),
                                    author: this.$author.val(),
                                    excerpt: this.$excerpt.val(),
                                    google_description: this.$updateGoogleDescription.val(),
                                    google_key: this.$uploadGoogleKey.val(),
                                    fb_description: this.$uploadFbDescription.val(),
                                    fb_title: this.$uploadFbTitle.val(),
                                    content: $(a).html(),
                                    display: this.$display.val(),
                                    subtitle: this.$sub_title.val(),
                                    subtitleColor: this.$sub_title.css('color'),
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
                        }, {
                            key: "generateFormData",
                            value: function generateFormData() {
                                var fd = new FormData();
                                var categories = this.$categories.select2('data');
                                var tags = this.$tags.select2('data');
                                var themes = this.$themes.select2('data');
                                var relatedArticle = this.$relatedArticle.select2('data');
                                var articleCategory = this.$articleCategory.select2('data');
                                fd.append('title', this.$title.val());
                                var subTitleContent = this.$sub_title.val();
                                var subTitleColorCode = (this.$sub_title.attr('color') != undefined) ? this.$sub_title.attr('color') : '#666666';
                                var selectOneIndexLightHeight = this.$setTopicalArticle.val();


                                fd.append('sub_title', subTitleContent + '@' + subTitleColorCode);
                                fd.append('author', this.$author.val());
                                fd.append('editor', this.$editor);
                                fd.append('excerpt', this.$excerpt.val());
                                fd.append('display', this.$display.val());
                                fd.append('indexLightHeight', selectOneIndexLightHeight);
                                if (this.$updatePublishedAt.length > 0) fd.append('published_at', this.$updatePublishedAt.val());
                                fd.append('google-description', this.$updateGoogleDescription.val());
                                fd.append('google-key', this.$uploadGoogleKey.val());
                                fd.append('fb-description', this.$uploadFbDescription.val());
                                fd.append('fb-title', this.$uploadFbTitle.val());

                                var a = $('.fr-element');

                                // if ($(a).children('.fr-view').length > 0) {
                                //   var b = a.children('.fr-view');
                                //   var i = 0;

                                //   do {
                                //     a = b;
                                //     b = $(a).children('.fr-view').length > 0 ? $(a).children('.fr-view') : undefined;
                                //     i++;
                                //   } while (b !== undefined);
                                // }

                                fd.append('content', $(a).html());

                                tags.map(function (tag) {
                                    fd.append('tags[]', tag.id);
                                });
                                categories.map(function (category) {
                                    fd.append('categories[]', category.id);
                                });
                                themes.map(function (theme) {
                                    fd.append('themes[]', theme.id);
                                });
                                relatedArticle.map(function (article) {
                                    fd.append('relatedArticle[]', article.id);
                                });
                                // articleCategory.map(function (item) {
                                //   fd.append('articleCategory[]', item.id);
                                // });


                                if (!this.thumb && !this.$thumbnail[0].files[0]) {
                                    toastr.info('Chưa nhập hình đại diện');
                                    Object(_helper__WEBPACK_IMPORTED_MODULE_1__["hideBlock"])();
                                    return false;
                                }

                                if (this.thumb) {
                                    if (this.thumbnailId != null) {

                                        fd.append('thumb', this.thumbnailId);


                                    } else {
                                        fd.append('thumb', this.thumb.id);

                                    }
                                } else if (this.$thumbnail[0].files[0]) {
                                    fd.append('thumbnail', this.$thumbnail[0].files[0]);
                                }
                                if (this.thumbnailId != null) {

                                    fd.append('cover_pc', this.thumbnailId);
                                    fd.append('cover_mobile', this.thumbnailId);
                                } else {
                                    if (this.coverPC) {
                                        fd.append('cover_pc', this.coverPC.id);
                                    }

                                    if (this.coverMobile) {
                                        fd.append('cover_mobile', this.coverMobile.id);
                                    }
                                }



                                // if (this.coverMobile) {
                                //   fd.append('cover_mobile', this.coverMobile.id);
                                // }

                                fd.append('off_title', this.$offTitle.prop('checked') ? '2' : '1');
                                fd.append('off_thumb_pc', this.$offThumbPc.prop('checked') ? '2' : '1');
                                fd.append('off_thumb_mobile', this.$offThumbMobile.prop('checked') ? '2' : '1');
                                fd.append('off_description', this.$offDescription.prop('checked') ? '2' : '1');
                                return fd;
                            }
                        }
                        ]);
                        return ArticleEdit;
                    }();

                $(function () {
                    var articleEdit = new ArticleEdit();
                    new _article_create_upload_resource__WEBPACK_IMPORTED_MODULE_2__["default"](articleEdit);
                    new _article_create_update_create_tag__WEBPACK_IMPORTED_MODULE_3__["default"](articleEdit.$tags);
                    new _article_create_update_create_theme__WEBPACK_IMPORTED_MODULE_4__["default"](articleEdit.$themes);
                });

                /***/
            }),

        /***/
        "./platform/ttct/resources/assets/js/pages/block.js":
            /*!**********************************************************!*\
              !*** ./platform/ttct/resources/assets/js/pages/block.js ***!
              \**********************************************************/
            /*! exports provided: block */
            /***/
            (function (module, __webpack_exports__, __webpack_require__) {

                "use strict";
                __webpack_require__.r(__webpack_exports__);
                /* harmony export (binding) */
                __webpack_require__.d(__webpack_exports__, "block", function () { return block; });
                /**
                 * @author        Le binh
                 * @description block for create html
                 */
                var block = {
                    block_1: {
                        name: 'Block trích dẫn 1',
                        html: "<table><tr><td style=\"width:100%\"><div class=\"dbox\">\n                <div class=\"inner\">\n                    <p style=\"text-align: justify;\"><span style=\"font-size: 18px;\">&nbsp</span></p>\n                </div>\n            </div><td></tr></table>"
                    },
                    block_2: {
                        name: 'Block trích dẫn 2',
                        html: "<table style=\"width:100%\"><tr><td style=\"width:100%;\"><div class=\"block-quote-style \"><p style=\"text-align: justify;\">&nbsp</p>\n</div></td></tr></table>"
                    },
                    block_3: {
                        name: 'Block đoạn text & tiêu đề lớn',
                        html: "<h2 style=\"font-family: 'Montserrat', serif;margin: 50px 0 30px 0;text-align: center;\">Lorem Ipsum is simply dummy text of the printing and typesetting industry</h2>\n              <p style=\"margin: 0 0 1rem;text-align: justify;\"><span style=\"font-size: 18px;\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>"
                    },
                    block_4: {
                        name: 'Block đoạn text',
                        html: "<p style=\"margin: 0 0 1rem;text-align: justify;\"><span style=\"font-size: 18px;\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>"
                    },
                    block_5: {
                        name: 'Block 1 hình',
                        html: "<figure class=\"img-big\">\n   <div class=\"grid-img\" style=\"text-align: center\">\n                    <div href=\"".concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" data-fancybox=\"gallery\" data-caption=\"\">\n   <span class= 'fr-img-caption fr-draggable fr-fic fr-dii' contenteditable='false'  style='width: 100%;' draggable='false'> \n <span class='fr-img-wrap'>   \n  <img src=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" alt=\"\">\n </span> \n </span>\n</div>\n</div>\n<figcaption style='font-size:13px;color:#555;text-align:center;height:20px;margin-top:15px' class='fr-inner' contenteditable='true'>Caption</figcaption></figure> <p>&nbsp</p>\n ")
                    },
                    block_6: {
                        name: 'Block 2 hình',
                        html: "<figure class=\"img-full\">\n                                <div class=\"grid-img grid-2\">\n                                    <div class=\"w-img-1\" href=\"".concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" data-fancybox=\"gallery\" data-caption=\"\">\n                                        <img src=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" alt=\"\">\n                                    </div>\n                                    <div class=\"w-img-2\" href=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" data-fancybox=\"gallery\" data-caption=\"\">\n                                        <img src=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" alt=\"\">\n                                    </div>\n                                </div>\n                                <figcaption class='fr-inner' style='font-size:13px;color:#555;text-align:center;height:20px;margin-top:10px'>Caption </figcaption>\n </figure>\n<p>&nbsp</p>")
                    },
                    block_7: {
                        name: 'Block 3 hình ngang',
                        html: "<figure class=\"img-full\">\n                                <div class=\"grid-img grid-3-w\">\n                                    <div class=\"w-img-1\" href=\"".concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" data-fancybox=\"gallery\" data-caption=\"\">\n                                        <img src=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" alt=\"\">\n                                    </div>\n                                    <div class=\"w-img-2\" href=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" data-fancybox=\"gallery\" data-caption=\"\">\n                                        <img src=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" alt=\"\">\n                                    </div>\n                                    <div class=\"w-img-3\" href=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" data-fancybox=\"gallery\" data-caption=\"\">\n                                        <img src=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" alt=\"\">\n                                    </div>\n                                </div>\n                                <figcaption class='fr-inner' style='font-size:13px;color:#555;text-align:center;height:23px;margin-top:5px'>Caption</figcaption>\n</figure>\n <p>&nbsp </p>")
                    },
                    block_8: {
                        name: 'Block 3 hình ngang - dọc',
                        html: "<figure class=\"img-full\">\n                                <div class=\"grid-img grid-3-h\">\n                                    <div class=\"w-img-1\" href=\"".concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" data-fancybox=\"gallery\" data-caption=\"\">\n                                        <img src=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" alt=\"\">\n                                    </div>\n                                    <div class=\"w-img-2\" href=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" data-fancybox=\"gallery\" data-caption=\"\">\n                                        <img src=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" alt=\"\">\n                                    </div>\n                                    <div class=\"w-img-3\" href=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" data-fancybox=\"gallery\" data-caption=\"\">\n                                        <img src=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" alt=\"\">\n                                    </div>\n                                </div>\n                                <figcaption class='fr-inner' style='font-size:13px;color:#555;text-align:center;height:20px;margin-top:10px'>Caption</figcaption>\n</figure>\n<p>&nbsp</p>")
                    },
                    block_9: {
                        name: 'Block 4 hình',
                        html: "<figure class=\"img-full\">\n                                <div class=\"grid-img grid-4\">\n                                    <div class=\"w-img-1\" href=\"".concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" data-fancybox=\"gallery\" data-caption=\"\">\n                                        <img src=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" alt=\"\">\n                                    </div>\n                                    <div class=\"w-img-2\" href=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" data-fancybox=\"gallery\" data-caption=\"\">\n                                        <img src=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" alt=\"\">\n                                    </div>\n                                    <div class=\"w-img-3\" href=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" data-fancybox=\"gallery\" data-caption=\"\">\n                                        <img src=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" alt=\"\">\n                                    </div>\n                                    <div class=\"w-img-4\" href=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" data-fancybox=\"gallery\" data-caption=\"\">\n                                        <img src=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" alt=\"\">\n                                    </div>\n                                </div>\n        <figcaption class='fr-inner' style='font-size:13px;color:#555;text-align:center;height:24px;magin-top:10px'> Caption</figcaption>\n </figure>\n<p>&nbsp</p>")
                    },
                    block_10: {
                        name: 'Block hình bên trái',
                        html: "<figure class=\"img-left\">\n                    <div class=\"grid-img\">\n                        <div href=\"".concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" data-fancybox=\"gallery\" data-caption=\"\">\n                            <img src=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" alt=\"\">\n                        </div>\n                    </div>\n                    <figcaption style=\"text-align: center;font-style: italic;font-size: 14px;color: #555;\"><span>Image caption</span></figcaption>\n                </figure>\n                <p style=\"margin: 0 0 1rem;text-align: justify;\"><span style=\"font-size: 18px;\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>")
                    },
                    block_11: {
                        name: 'Block hình bên phải',
                        html: "<figure class=\"img-right\">\n                    <div class=\"grid-img\">\n                        <div href=\"".concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" data-fancybox=\"gallery\" data-caption=\"\">\n                            <img src=\"").concat($('body').data('base-url'), "/assets/img/img-default-placeholder.jpg\" alt=\"\">\n                        </div>\n                    </div>\n                    <figcaption style=\"text-align: center;font-style: italic;font-size: 14px;color: #555;\"><span>Image caption</span></figcaption>\n                </figure>\n                <p style=\"margin: 0 0 1rem;text-align: justify;\"><span style=\"font-size: 18px;\">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</span></p>")
                    }
                };

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
        10:
            /*!***********************************************************************!*\
              !*** multi ./platform/ttct/resources/assets/js/pages/article-edit.js ***!
              \***********************************************************************/
            /*! no static exports found */
            /***/
            (function (module, exports, __webpack_require__) {

                module.exports = __webpack_require__( /*! /var/www/html/ttct_cms/platform/ttct/resources/assets/js/pages/article-edit.js */ "./platform/ttct/resources/assets/js/pages/article-edit.js");


                /***/
            })

        /******/
    });

var _url_article_related_select = $('.list-article').attr('data-reload');
var _per_page = 10;
$(".list-article").select2({
    ajax: {
        url: _url_article_related_select,
        method: 'POST',
        dataType: 'json',
        delay: 250,
        headers: {
            'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
        },
        data: function (params) {
            return {
                q: params.term,
                page: params.page,
                per_page: _per_page
            };
        },
        processResults: function (data, params) {
            return {
                results: data.data.data,
                pagination: {
                    more: _per_page
                }
            };
        },
        cache: true,

    },
    tags: true,
    placeholder: 'Tìm tên bài viết',
    templateResult: formatRepo,
    templateSelection: formatRepoSelection
});

function formatRepo(repo) {
    var $container = $(
        "<div class='select2-result-repository clearfix'>" +
        "<div class='select2-result-repository__meta'>" +
        "<div class='select2-result-repository__title'></div>" +
        "</div>" +
        "</div>"
    );
    $container.find(".select2-result-repository__title").text(repo.title);
    return $container;
}

function formatRepoSelection(repo) {
    return repo.title;
}

$(document).on('mouseup', '.block-quote-style', function (e) {
    var buttionType = e.button;
    if (buttionType == 1)
        $(this).remove();
    return;
})

$(document).on('mouseup', '.dbox', function (e) {
    var buttionType = e.button;
    if (buttionType == 1)
        $(this).remove();
    return;
})


var url = $('#form-create-tag').attr('action')
$(document).on('keyup', '.select2-search__field', function (event) {

    if (event.keyCode == 188) {
        var text = $(this).val().replace(/,/g, '');
        var object = { "name": text, 'description': text };
        $.ajax({

            url: url,
            data: object,
            dataType: 'json',
            method: 'post',
            headers: {
                'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
            },
            success: function (res) {
                var tag = res.tag;
                var option = new Option(tag.name, tag.id, true);
                $('#update-tags').append(option);
                if ($('#update-tags').select2('data').length > 0) {
                    var newValue = $('#update-tags').select2('data').map(function (item) {
                        return item.id;
                    });

                    newValue.push(tag.id);

                    $('#update-tags').val(newValue);
                    $('.select2-search__field').val('');
                }
            }
        })
    }
})

$(document).on('click', '.left-block', function () {
    $(this).css({ 'margin-right': '10px' });
    $('.dbox .inner p span span  ').removeAttr();

})
$(document).on('click', '.right-block', function () {
    $(this).css({ 'margin-left': '10px' });
    $(' .dbox .inner p span  ').removeAttr();
})

$(function () {

    $('.simple_color').simpleColor({
        hideInput: false,
        defaultColor: '#666666',
        boxWidth: '80px',
        boxHeight: '60px',
        cellWidth: 30,
        cellHeight: 15,
        columns: 9,
        onSelect: function (colorCode, InputElement) {
            var hex = '#' + colorCode;
            $('#update_sub_title').css('color', hex);
            $('#update_sub_title').attr('color', hex);
        }
    });
});

$(document).on('click', '#bold-work-author-name', function (event) {
    var letterStyle = $(this).attr('letter');
    var textCase = '';
    var input = '';
    if (letterStyle == "toLowercase") {
        $(this).attr('letter', 'toUpperCase');
        textCase = 'uppercase';
        input = $("#update-author").val().toUpperCase();
    } else {
        $(this).attr('letter', 'toLowercase');
        textCase = 'lowercase';
        input = $("#update-author").val().toLowerCase();
    }

    $("#update-author").css('text-transform', textCase);
    $(this).css('text-transform', textCase);
    $("#update-author").val(input);
});

$(document).on('click', '#bold-work-title', function (event) {
    var letterStyle = $(this).attr('letter');
    var textCase = '';
    var input = '';
    if (letterStyle == "toLowercase") {
        $(this).attr('letter', 'toUpperCase');
        textCase = 'uppercase';
        input = $("#update-title").val().toUpperCase();
    } else {
        $(this).attr('letter', 'toLowercase');
        textCase = 'lowercase';
        input = $("#update-title").val().toLowerCase();
    }

    $("#update-titte").css('text-transform', textCase);
    $(this).css('text-transform', textCase);
    $("#update-title").val(input);
});

