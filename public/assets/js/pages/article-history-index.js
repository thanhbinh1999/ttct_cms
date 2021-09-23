
ArticleHistory = {
    /**
      *  params
     */
    $searchTitle: $('#search-title'),
    $searchEditor: $('#search-editor'),
    $searchId: $('#search-id'),
    $dataTable: $('#article-history-table'),
    $userInfo: $('#user-info'),
    /*** render button*/
    $viewHistoryBtn: $('.view-history-btn'),
    $numberPage: $('#number-page'),
    $revertBtn: $('#revertDataBtn'),
    /***/

    /***  title */
    $title: $('#title'),
    /** */

    /** div  old list  themes */
    $selectOldThemes: $('#select-old-themes'),
    /**  */

    /**  old tags */
    $selectOldTags: $('#select-old-tags'),
    /**  */

    /** old content */
    $oldContent: $('#old-content'),
    /** */

    /**  new themes */
    $selectNewThemes: $('#select-new-themes'),
    /** */

    /***  new tags*/
    $selectNewTags: $('#select-new-tags'),
    /** */

    /** new content */
    $newContent: $('#new-content'),
    /** */

    /** input time  published */
    $timePublished: $('#time-published'),
    /**  */
    /**  editor name */
    $editorName: $('#editor-name'),
    /** */
    $articles: [],



    /**
     * ajax url 
     */
    $datataleUrl: $('#listUrl').attr('datatable_url'),
    $revertDataUrl: $('#listUrl').attr('revert-data-url'),

    constructor() {
        this.keyup();
        this.initDataTable();
        this.showModalHistory();
        this.handleViewHistoryDetail();
        this.handleRevertData();
    },
    keyup: function () {
        let _this = this;
        _this.$searchId.keyup(function () {
            _this.$dataTable.search($(this).val(), 'id')
        })
        _this.$searchEditor.keyup(function () {
            _this.$dataTable.search($(this).val(), 'editorName')
        })
        _this.$searchTitle.keyup(function () {
            _this.$dataTable.search($(this).val(), 'title');
        })

    },

    initDataTable: function () {
        let _this = this;
        this.$dataTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: _this.$datataleUrl,
                        headers: {
                            'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
                        },
                        params: {
                        },
                        map: function (raw) {
                            var dataSet = [];
                            if (typeof raw.data != undefined) {
                                dataSet = raw.data;
                                _this.$articles = dataSet;
                                dataSet = [... new Map(raw.data.map(item => [item['article_id'], item])).values()];
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
                    field: "id",
                    title: "ID",
                    width: 100,
                    sortable: 'desc',
                    textAlign: 'center',
                    template: function (row) {
                        return "<strong>" + row.article_id + "</strong>";
                    }
                },
                {
                    field: 'title',
                    title: "Tiêu đề",
                    width: 300,
                    textAligin: 'center',
                    template: function (row) {
                        return "<strong>" + row.title + "</strong>";
                    }
                },
                {
                    field: 'editor',
                    title: 'Người dùng',
                    width: 170,
                    textAlign: 'center',
                    template: function (row) {
                        return "<strong>" + (row.editor != undefined) ? row.editor.username : '' + "</strong>";
                    }

                },
                {
                    field: 'updated_at',
                    title: 'Lần cập nhật gần nhất ',
                    width: 200,
                    sort: 'desc',
                    textAligin: 'center',
                    template: function (row) {
                        return "<strong>" + row.updated + "</strong>";
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
                        return ` <button class="btn btn-primary view-history-btn" object-id=${row.article_id} object-title="${row.title}" data-toggle="modal" data-target=".bd-show-list-history-modal-lg" >Xem</button>`
                    }
                }
            ]
        });
    },
    showModalHistory: function () {
        let _this = this;
        let id = null;
        $(document).on('click', '.view-history-btn', function (e) {
            id = $(this).attr('object-id'); // get id 
            title = $(this).attr('object-title');
            _this.$title.text(title);
            _this.$timePublished.val('');
            _this.$selectOldThemes.html('');
            _this.$selectOldTags.html('');
            _this.$oldContent.html('');
            _this.$selectNewThemes.html('');
            _this.$selectNewTags.html('');
            _this.$newContent.html('');
            _this.$editorName.val('');
            _this.$revertBtn.removeAttr('themes');
            _this.$revertBtn.removeAttr('tags');
            _this.$revertBtn.removeAttr('object_id');
            try {

                let dataSeach = _this.handleFindArticleById(id);
                let count = dataSeach.length;
                if (count != undefined) {
                    let renderPageButton = '';
                    for (var i = 1; i <= count; i++) {
                        renderPageButton += `<button class="btn btn-success  view-history-detail" object-id =${id} index = ${i} >` + i + `</button>`;
                    }
                    _this.$numberPage.html(renderPageButton);
                }

            } catch (error) {
                alert('Có  lỗi vui lòng  tải lại trang !');
            }
        })
    },
    handleFindArticleById: function (id) {
        let _this = this;
        if (_this.$articles != undefined && _this.$articles != null) {
            result = _this.$articles.filter(function (article) {
                return article.article_id == id;
            });
        }
        return result;
    },
    handleViewHistoryDetail: function () {
        let _this = this;
        $(document).on('click', '.view-history-detail', function () {
            let id = $(this).attr('object-id');
            let indexOf = $(this).attr('index');
            indexOf--;
            let data = _this.handleFindArticleById(id);
            if (data != undefined & data != null) {
                let masterObj = data[indexOf];
                _this.$title.text(masterObj.title);
                _this.$timePublished.val(masterObj.updated);
                _this.$selectOldThemes.html(masterObj.before_themes.map(theme => {
                    return `<option>${theme.name}</option>`
                }));
                _this.$selectOldTags.html(masterObj.before_tags.map(tag => {
                    return `<option>${tag.name}</option>`;
                }));
                _this.$oldContent.html((masterObj.before_content != undefined) ? masterObj.before_content : '');
                _this.$newContent.html((masterObj.after_content != undefined) ? masterObj.after_content : '');
                _this.$selectNewThemes.html(masterObj.after_themes.map(theme => {
                    return `<option>${theme.name}</option>`;
                }));
                _this.$selectNewTags.html(masterObj.after_tags.map(tag => {
                    return `<option>${tag.name}</option>`;
                }));
                _this.$editorName.val(masterObj.editor.username);
                _this.$revertBtn.attr('themes', masterObj.after_themes.map(theme => {
                    return theme.id
                }));
                _this.$revertBtn.attr('tags', masterObj.after_tags.map(tag => {
                    return tag.id
                }));
                _this.$revertBtn.attr('object_id', id);
            }
        })
    },
    handleRevertData: function () {
        let _this = this;
        $(_this.$revertBtn).click(function () {
            let id = $(this).attr('object_id');
            let themes = $(this).attr('themes').split(',');
            let tags = $(this).attr('tags').split(',');
            let userInfo = _this.$userInfo.attr('data-username');

            if (themes && tags != undefined && themes && tags != "") {
                swal.fire({
                    title: "Xác nhận cập nhật bản sửa này",
                    text: "Bản cập nhật sẽ làm thay đổi thông tin bao gồm chủ đề , thẻ của bài hiện tại bạn có muốn  thực hiện ?",
                    showCancelButton: true,
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Hủy',
                })
                    .then(result => {
                        if (result.value) {
                            $.ajax({
                                url: _this.$revertDataUrl + id,
                                method: 'POST',
                                dataType: 'Json',
                                headers: {
                                    'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')
                                },
                                data: { tags: tags, themes: themes, editorUserName: userInfo },
                                success: function (res) {
                                    if (res.status == 200) {
                                        new Swal(res.message, {
                                            icon: 'success'
                                        })
                                    } else {
                                        console.log(res);
                                        new Swal('Không  thể revert vui lòng thử lại sau !', {
                                            icon: 'failed'
                                        })
                                    }
                                }

                            })
                        }
                    });
            } else {

                alert('Có lỗi vui lòng tải lại trang!');
            }
        });
    }
}
ArticleHistory.constructor();