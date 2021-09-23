import Sortable from 'sortablejs'
import axios from "axios";
import slug from "slug";
import {showBlock, hideBlock} from "./helper";
/**
 * @author        Giang Nguyen
 * @description Class TopicalEdit
 */
class TopicalEdit {
    constructor() {
        this.$selectArticle = $('#select-article');
        this.$sortArticle = $('#sort-article');
        this.$addToTopicalArticle = $('#add-to-topical-article');

        this.$selectTopicalType = $('#select-topical-type');
        this.$createArticle = $('#create-article');
        this.$publishTopical = $('#publish-topical');
        this.$offName = $('#off_name');
        this.$offDescription = $('#off_description');

        //
        this.$modalChangeStatus = $('#modal-change-status');
        this.$modalChangeStatusSelectStatus = $('#modal-change-status-select-status');
        this.$modalChangeStatusArticleId = $('#modal-change-status-article-id');
        this.$modalChangeStatusBtnSave = $('#modal-change-status-btn-save');
        //
        this.$modalEditCategory = $('#modal-edit-category');
        this.$formUpdateCategory = $('#form-update-category');
        this.$updateName = $('#update-name');
        this.$updateDescription = $('#update-description');
        this.$updateAutoGenerateSlug = $('#update-auto-generate-slug');
        this.$updateThumbnail = $('#update-thumbnail');
        this.$updateSlug = $('#update-slug');
        //
        this.$saveTopical = $('#save-topical');
        this.$previewDemo = $('#preview-demo');
        this.$topicalPreview = $('#topical-preview');
        this.listArticle = [];
        this.sortedArticle = [];
        this.changedStatusArticle = [];
        this.deletedArticles = [];
        this.sortable = null;

        this.topical = null;

        this.init();
    }

    init() {
        this.getData();
        this.initSelect();
        this.initSelect2();
        this.initClick();
        this.initChangeStatus();
        this.initSubmit();
        this.initDelete();
    }

    initSelect2() {
        this.$selectArticle.select2({
            placeholder: 'Select one',
            multiple: true,
            ajax: {
                url: this.$selectArticle.data('url'),
                dataType: 'json',
                delay: 250,
                method: 'POST',
                headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                data: params => {
                    return {
                        key: params.term,
                        page: params.page,
                        except: () => JSON.stringify(this.listArticle.map(item => item.id))
                    };
                },
                processResults: data => {
                    return {
                        results: $.map(data.data, item => {
                            return {
                                text: `<strong>${item.title}</strong>`,
                                id: item.id,
                                title: `${item.title}`,
                                status: item.status
                            }
                        }),
                        pagination: {
                            more: data.current_page < data.total
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: markup => markup
        });
    }

    renderSort() {
        let html = this.listArticle.reduce((c, n) => {
            let urlEdit = this.$sortArticle.data('url-edit-article');
            urlEdit = urlEdit.slice(0, urlEdit.lastIndexOf('/') + 1) + n.id;
            let changedStatus = this.changedStatusArticle.find(item => parseInt(item.id) === parseInt(n.id));
            return c + `
                    <div class="dd-item dd3-item" data-id="${n.id}" style="cursor: pointer">
                        <div class="dd-handle dd3-handle"></div>
                        <div class="dd3-content">
                            <div style="display: flex;justify-content: left">
                                <span style="font-weight: 600;font-size:15px; flex: 1;" title="${n.title}"> ${n.title.length > 50 ? (n.title.slice(0, 50) + '...') : n.title} </span>
                                <span style="font-weight: 600;font-size:15px; flex: 1;">${this.renderStatus(changedStatus ? changedStatus.status : n.status)}</span>
                                <div class="dropdown">
                                    <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                        <i class="flaticon2-console"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-right">
                                        <div class="dropdown-item edit-item" data-id="${n.id}" data-url-edit-article="${urlEdit}" style="display: flex;height:30px;justify-content: start;align-items: center"><i class="la la-edit"></i> Sửa</div>
<!--                                        <div class="dropdown-item" data-toggle="modal" data-target="#modal-change-status" data-id="${n.id}" data-url-edit-article="${urlEdit}" style="display: flex;height:30px;justify-content: start;align-items: center"><i class="la la-edit"></i> Thay đổi trạng thái</div>-->
                                        <div class="dropdown-item delete-item" data-id="${n.id}" data-url-edit-article="${urlEdit}" style="display: flex;height:30px;justify-content: start;align-items: center"><i class="la la-trash"></i> Xóa</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
        }, '');

        this.$sortArticle.html(html);
        this.sortable = Sortable.create(this.$sortArticle[0], {
            onSort: () => {
                this.sortedArticle = this.sortable.toArray();
                let tmp = [];
                this.sortedArticle.forEach(item => {
                    for (let i = 0; i < this.listArticle.length; i++) {
                        if (parseInt(this.listArticle[i].id) === parseInt(item)) {
                            tmp.push({
                                id: item,
                                title: this.listArticle[i].title,
                                status: this.listArticle[i].status
                            });
                            break;
                        }
                    }
                });
                this.listArticle = tmp;
            }
        });
    }

    renderStatus(status) {
        let text = '';
        switch (parseInt(status)) {
            case 1: {
                text = '<span class="kt-badge  kt-badge--primary kt-badge--inline kt-badge--pill">Pending</span>';
                break;
            }
            case 6: {
                text = '<span class="kt-badge  kt-badge--warning kt-badge--inline kt-badge--pill">Take down</span>';
                break;
            }
            case 10: {
                text = '<span class="kt-badge  kt-badge--success kt-badge--inline kt-badge--pill">Publish</span>';
                break;
            }
            case 4: {
                text = '<span class="kt-badge  kt-badge--danger kt-badge--inline kt-badge--pill">Delete</span>';
                break;
            }
            default: {
                text = 'N/A';
            }
        }
        return text;
    }

    reloadSelectedArticle() {
        let url = this.$sortArticle.data('get-many-article');
        let ids = this.sortedArticle;
        axios.post(url, {ids}).then(
            ({data}) => {
                data.forEach(item => {
                    for (let i = 0; i < this.listArticle.length; i++) {
                        if (parseInt(this.listArticle[i].id) === parseInt(item.id)) {
                            this.listArticle[i].title = item.title;
                            break;
                        }
                    }
                });
                this.renderSort();
            }
        )
    }

    initChangeStatus() {
        this.$modalChangeStatus.on('show.bs.modal', event => {
            let id = $(event.relatedTarget).data('id');
            this.$modalChangeStatusArticleId.val(id);
            let article = this.listArticle.find(item => parseInt(item.id) === parseInt(id));
            this.$modalChangeStatusSelectStatus.val(article.status);
        }).on('hide.bs.modal', event => {
            this.$modalChangeStatusArticleId.val('');
        });

        this.$modalChangeStatusBtnSave.click(event => {
            event.preventDefault();
            let id = this.$modalChangeStatusArticleId.val();
            let status = this.$modalChangeStatusSelectStatus.val();

            let article = this.listArticle.find(item => parseInt(item.id) === parseInt(id));
            let tmpArticle = this.changedStatusArticle.find(item => parseInt(item.id) === parseInt(id));
            let tmpStatus = tmpArticle !== undefined ? tmpArticle.status : article.status;

            if (parseInt(tmpStatus) !== parseInt(status)) {
                if (tmpArticle !== undefined) {
                    tmpArticle.status = status;
                } else {
                    this.changedStatusArticle.push({
                        id: article.id,
                        title: article.title,
                        status
                    })
                }

                this.renderSort();
            }
            this.$modalChangeStatus.modal('hide');
        })
    }

    initSubmit() {
        this.$saveTopical.click(event => {
            event.preventDefault();
            this.$formUpdateCategory.trigger('submit');
        });

        this.$formUpdateCategory.submit(event => {
            event.preventDefault();
            showBlock();
            let arr = this.sortedArticle;
            let status = this.changedStatusArticle;
            let url = this.$saveTopical.data('update');
            let fd = new FormData(event.target);
            arr.forEach(item => {
                fd.append('articles[]', item);
            });

            status.forEach(item => {
                fd.append('status_changed[]', JSON.stringify(item));
            });

            if (this.$updateAutoGenerateSlug.prop('checked')) {
                fd.append('slug', this.$updateSlug.val())
            }

            fd.append('display_type', this.$selectTopicalType.val());

            fd.append('deleted_articles', JSON.stringify(this.deletedArticles));
            fd.append('off_name', this.$offName.prop('checked') ? '2' : '1');
            fd.append('off_description', this.$offDescription.prop('checked') ? '2' : '1');

            axios.post(url, fd).then(
                ({data}) => {
                    if (data.message) {
                        toastr.success(data.message);
                        setTimeout(() => {
                            hideBlock();
                            window.location.reload();
                        }, 1000)
                    }
                },
                err => {
                    hideBlock();
                    toastr.error(err.response.data.message);
                }
            )
        });
    }

    initClick() {
        this.$addToTopicalArticle.click(event => {
            event.preventDefault();
            let data = this.$selectArticle.select2('data');
            if (data.length > 0) {
                data.forEach(item => {
                    //
                    this.deletedArticles = this.deletedArticles.filter(i => parseInt(i) !== parseInt(item.id));

                    this.listArticle.push({
                        id: item.id,
                        title: item.title,
                        status: item.status
                    });
                    this.sortedArticle.push(item.id);
                });
                this.renderSort();
                this.$selectArticle.val(null).trigger('change');
            } else {
                toastr.info('Chưa bọn bài viết nào');
            }
        });
        this.$previewDemo.click(event => {
            event.preventDefault();
            let url = this.$previewDemo.data('url');
            url = url.slice(0, url.lastIndexOf('/') + 1) + this.$selectTopicalType.val();
            window.open(url, '_blank')
        });

        this.$topicalPreview.click(event => {
            event.preventDefault();
            let articles = JSON.parse(JSON.stringify(this.sortedArticle));
            articles = articles.map(item => this.listArticle.find(i => parseInt(i.id) === parseInt(item)));
            articles = articles.map(item => {
                let changedStatus = this.changedStatusArticle.find(i => parseInt(i.id) === parseInt(item.id));
                return {
                    ...item,
                    status: changedStatus !== undefined ? parseInt(changedStatus.status) : parseInt(item.status)
                }
            });

            localStorage.setItem('preview-topical-data', JSON.stringify({
                articles,
                id: this.$topicalPreview.data('topical')
            }));

            let url = this.$topicalPreview.data('url');
            url = url.slice(0, url.lastIndexOf('/') + 1) + this.$selectTopicalType.val();
            window.open(url, '_blank')
        });

        $(document).on('click', '.edit-item', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url-edit-article');
            let tab = window.open(url, '_blank');
            tab.onbeforeunload = () => {
                this.reloadSelectedArticle();
            }
        });
        this.$createArticle.click(event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url');
            let tab = window.open(url, '_blank');
        });

        this.$publishTopical.click(event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('publish');
            swal.fire({
                title: 'Xác nhận xuất bản',
                html: "<p style='font-size: 15px;color: black'>Bạn có muốn xuất bản chuyên đề này?</p>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    showBlock();
                    axios.post(url, {status: 10}).then(
                        res => {
                            toastr.success(res.data.message);
                            hideBlock();
                            setTimeout(() => {
                                window.location.reload();
                            }, 500)
                        },
                        err => {
                            hideBlock();
                            let status = err.response.status;
                            if (status === 404 || status === 500) {
                                toastr.error(err.response.data.message);
                            }
                        }
                    )
                }
            });
        });
    }

    initSelect() {
        this.$selectTopicalType.selectpicker();
    }

    initDelete() {
        $(document).on('click', '.delete-item', event => {
            event.preventDefault();
            let id = $(event.currentTarget).data('id');
            let urlDelete = this.$saveTopical.data('delete-from-topical') + id;
            swal.fire({
                title: 'Xác nhận xóa?',
                text: "Xóa bài viết ra khỏi chuyên đề này?",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    this.listArticle = this.listArticle.filter(item => parseInt(item.id) !== parseInt(id));
                    this.changedStatusArticle = this.changedStatusArticle.filter(item => parseInt(item.id) !== parseInt(id));
                    this.sortedArticle = this.sortedArticle.filter(item => parseInt(item) !== parseInt(id));
                    this.deletedArticles.push(id);
                    this.renderSort();
                }
            });
        });
    }

    getData() {
        showBlock();
        axios.get(this.$saveTopical.data('get-data')).then(
            ({data}) => {
                if (parseInt(data.status) === 1) {
                    this.$publishTopical.show();
                } else {
                    this.$publishTopical.remove();
                }
                document.title = data.name + ' ' + document.title;
                this.sortedArticle = data.articles.map(item => item.id);
                this.listArticle = data.articles;
                if (data.display_type) {
                    this.$selectTopicalType.val(data.display_type).trigger('change').prop('disabled', true)
                }
                this.renderSort();

                this.$updateName.val(data.name);
                this.$updateDescription.val(data.description);
                this.$updateSlug.val(data.slug);
                if (data.meta && data.meta.length > 0) {
                    data.meta.forEach(meta => {
                        switch (meta.key) {
                            case 'off_name': {
                                this.$offName.prop('checked', parseInt(meta.value) === 2);
                                break;
                            }
                            case 'off_description': {
                                this.$offDescription.prop('checked', parseInt(meta.value) === 2);
                                break;
                            }
                        }
                    })
                }

                let updateDropify = this.$updateThumbnail.dropify({
                    messages: {
                        'default': 'Kéo và thả tệp vào đây hoặc click',
                        'replace': 'Kéo và thả hoặc click để thay thế',
                        'remove': 'Xóa',
                        'error': 'Ooops, có lỗi bất ngờ xảy ra.'
                    }
                });
                updateDropify = updateDropify.data('dropify');

                if (data.thumbnail) {
                    updateDropify.settings.defaultFile = `${data.thumbnail.base_url}/${data.thumbnail.absolute_url}`;
                    updateDropify.destroy();
                    updateDropify.init();
                }

                this.$updateAutoGenerateSlug.change(event => {
                    if ($(event.target).prop('checked')) {
                        this.$updateSlug.prop('disabled', true);
                        this.$updateSlug.val(slug(this.$updateName.val(), {lower: true}));
                    } else {
                        this.$updateSlug.prop('disabled', false);
                    }
                });
                this.$updateName.on('keydown keyup', event => {
                    if (this.$updateAutoGenerateSlug.prop('checked')) {
                        this.$updateSlug.val(slug(this.$updateName.val(), {lower: true}));
                    }
                });
                this.$updateSlug.on('change', event => {
                    this.$updateSlug.val(slug($(event.target).val(), {lower: true}))
                });
                setTimeout(() => {
                    hideBlock();
                }, 1000);
            },
            err => {

            }
        );
    }
}

$(() => {
    new TopicalEdit()
});
