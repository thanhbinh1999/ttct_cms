/*
*@author binh le
*@create day : 5/7/2020
*@updated day: 6/8/2020 
*/
atex = {
  $search: $('#search-key'),
  $author_search: $('#search-author'),
  $atex_page: $('#atex_page'),
  $startDate: $('#startDate'),
  $endDate: $('#endDate'),
  $dataTable: $('#atex_table'),
  $search_btn: $('#search-btn'),
  $_btn_save: $('.save-article'),
  constructor() {
    this.initDataTable();
    this.keyup();
    this.templateTime();
    this.submitForm();
    this.saveArticle();
  },
  keyup: function () {
    let _this = this;
    _this.$author_search.keyup(function () {
      _this.$dataTable.search($(this).val(), 'author');
    });

    _this.$atex_page.keyup(function () {
      _this.$dataTable.search($(this).val(), 'atex_page');
    });
  },
  initDataTable: function () {
    let _this = this;
    this.$dataTable.KTDatatable({
      data: {
        type: 'remote',
        source: {
          read: {
            url: '/kho-bao-giay/Call-Api',
            headers: {
              'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
            },
            params: {
              startDate: startDate = function () {
                return _this.$startDate.val();
              },
              endDate: endDate = function () {
                return _this.$endDate.val();
              },

            },
            map: function (raw) {
              var dataSet = raw
              if (typeof raw.data != undefined) {
                dataSet = raw.data;
                console.log(dataSet);
              }
              return dataSet;
            },

          },
        },
        pageSize: 100,
        serverPaging: true,
        serverFiltering: true,
        serverSorting: true,
      },

      layout: {
        scroll: true,
        footer: true,
      },
      search: {
        input: this.$search,
      },
      columns: [
        {
          field: "title",
          title: "Tiêu đề",
          sortable: 'desc',
          width: 400,
          selector: false,
          textAlign: 'center',
          template: function (row) {
            return "<strong>" + row.title + "</strong>";
          }
        },
        {
          field: 'atex_page',
          title: 'Trang',
          width: 150,
          textAligin: 'center',
          template: function (row) {
            return "<strong>" + row.atex_page.replace(/-/gi, '') + "</strong>";
          }
        },
        {
          field: 'created_at',
          title: 'Ngày tạo',
          width: 200,
          textAligin: 'center',
          template: function (row) {
            return "<strong>" + _this.converTimeElasticSearch(row.created_at) + "</strong>";
          }
        },
        {
          field: 'author',
          title: 'Tác giả',
          width: 170,
          textAlign: 'center',
          template: function (row) {
            return "<strong>" + (row.author != null) ? row.author : '' + "</strong>";
          }

        },
        {
          field: "Actions",
          title: "Actions",
          sortable: false,
          width: 130,
          overflow: 'visible',
          textAlign: 'center',
          template: function (row, index, datatable) {
            return '<strong style="color:#5578eb;cursor:pointer" class= "save-article  author-edit" data = "' + row.id + '">\
                         &nbsp Xử lý\
                          </strong>';


          }
        }
      ]
    });
  },
  templateTime: function () {
    let _this = this;
    _this.$startDate.datepicker({
      autoSize: true,
      format: 'dd/mm/yyyy',
      autoclose: true,
      orientation: 'button left', autoSize: true,
      format: 'dd/mm/yyyy',
      autoclose: true,
      orientation: 'button left',
    });
    _this.$endDate.datepicker({
      autoSize: true,
      todayHighlight: true,
      format: 'dd/mm/yyyy',
      autoclose: true,
      orientation: 'button left',
      endDate: new Date(),
    });
  },
  saveArticle: function () {
    let _this = this;
    $(document).ready(function () {
      $(document).on('click', '.save-article', function () {
        let article_id = $(this).attr('data');
        let creator_id = null;
        $.ajax({
          url: "/users/user-acl",
          type: "GET",
          success: function (status) {
            creator_id = status.role.pivot.model_id;
            if (article_id && creator_id != '' && typeof article_id && typeof creator_id == "number") {
              $.ajax({
                url: "/kho-bao-giay/transfer-draft",
                type: "GET",
                dataType: 'JSON',
                data: { 'article_id': article_id, 'creator_id': creator_id },
                success: function (messages) {
                  if (messages.success) {
                    setTimeout(function () {
                      window.open("/articles/edit/" + article_id, "_blank");
                    }, 1000);
                  } else {
                    alert(messages.error);
                  }
                }
              })
            }
          }
        });


      });
    });
  },

  submitForm: function () {
    let _this = this;
    _this.$search_btn.click(function (e) {
      e.preventDefault();
      _this.$dataTable.search();
    });

  },
  converTimeElasticSearch: function (pubday) {
    var a = new Date(pubday * 1000);
    var year = a.getFullYear();
    var month = a.getMonth() + 1;
    var date = a.getDate() + 1;
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + "/" + month + "/" + year + "&nbsp" + hour + ":" + min + ":" + sec;
    return time;
  },
  ConverTime: function (time) {
    var arrayTime = time.split('-');
    var day, month, year, hour;
    year = arrayTime[0];
    month = arrayTime[1];
    day = arrayTime[2].split(' ');
    hour = day[1];
    return (day[0]) + "/" + month + "/" + year + " " + hour;
    var arrayTime = time.split('-');
  }
}
atex.constructor();