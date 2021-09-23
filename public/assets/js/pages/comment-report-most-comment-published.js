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
/******/ 	return __webpack_require__(__webpack_require__.s = 44);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./platform/comment/resources/assets/js/pages/comment/comment-report-most-comment-published.js":
/*!*****************************************************************************************************!*\
  !*** ./platform/comment/resources/assets/js/pages/comment/comment-report-most-comment-published.js ***!
  \*****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * @author       Giang Nguyen
 * @description class CommentReportMostCommentPublished
 */
var CommentReportMostCommentPublished =
/*#__PURE__*/
function () {
  function CommentReportMostCommentPublished() {
    _classCallCheck(this, CommentReportMostCommentPublished);

    this.$commentReportMostCommentPublishedTable = $('#comment-report-most-comment-published-table');
    this.datatable = null;
    this.$searchBtn = $('#search');
    this.$searchFrom = $('#search-from');
    this.$searchTo = $('#search-to');
    this.$searchCategory = $('#search-category');
    this.init();
  }

  _createClass(CommentReportMostCommentPublished, [{
    key: "init",
    value: function init() {
      this.initSelect2();
      this.initPickDate();
      this.initDatatable();
    }
  }, {
    key: "initDatatable",
    value: function initDatatable() {
      var _this = this;

      this.datatable = this.datatable = this.$commentReportMostCommentPublishedTable.KTDatatable({
        data: {
          type: 'remote',
          source: {
            read: {
              url: this.$commentReportMostCommentPublishedTable.data('url'),
              headers: {
                'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
              },
              params: {
                query: {
                  sort: 'published',
                  status_get: function status_get() {
                    return JSON.stringify(['published']);
                  },
                  from: function from() {
                    return _this.$searchFrom.val();
                  },
                  to: function to() {
                    return _this.$searchTo.val();
                  },
                  category: function category() {
                    return _this.$searchCategory.select2('data').length > 0 ? _this.$searchCategory.select2('data')[0].id : null;
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
        columns: [{
          field: 'title',
          title: 'TIÊU ĐỀ',
          width: 600,
          type: 'string',
          selector: false,
          autoHide: false,
          sortable: false,
          textAlign: 'left',
          template: function template(row) {
            return "<strong>".concat(row.article_link && row.article_link !== '' ? "<a href=\"".concat(row.article_link, "\" target=\"_blank\">").concat(row.article_title, "</a>") : row.article_title, "</strong>");
          }
        }, {
          field: 'total',
          title: 'TỔNG BÌNH LUẬN',
          width: 100,
          type: 'string',
          sort: 'desc',
          selector: false,
          sortable: false,
          textAlign: 'center',
          template: function template(row) {
            return "<strong>".concat(row.published, "</strong>");
          }
        }]
      });
      this.$searchBtn.click(function (event) {
        event.preventDefault();

        _this.datatable.search();
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
            return {
              term: params.term,
              page: params.page,
              type: 1
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
    key: "initPickDate",
    value: function initPickDate() {
      var _this2 = this;

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

        _this2.$searchTo.datepicker('setStartDate', val.replace('/', '-'));
      });
      this.$searchTo.change(function (event) {
        var val = $(event.target).val();

        _this2.$searchFrom.datepicker('setEndDate', val.replace('/', '-'));
      });
    }
  }]);

  return CommentReportMostCommentPublished;
}();

$(function () {
  new CommentReportMostCommentPublished();
});

/***/ }),

/***/ 44:
/*!***********************************************************************************************************!*\
  !*** multi ./platform/comment/resources/assets/js/pages/comment/comment-report-most-comment-published.js ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /var/www/html/cms/platform/comment/resources/assets/js/pages/comment/comment-report-most-comment-published.js */"./platform/comment/resources/assets/js/pages/comment/comment-report-most-comment-published.js");


/***/ })

/******/ });