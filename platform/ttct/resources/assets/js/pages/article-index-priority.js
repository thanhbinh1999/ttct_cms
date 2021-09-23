import Sortable from "sortablejs";
import axios from "axios";
import {showBlock, hideBlock} from './helper'

/**
 * @author        Giang Nguyen
 * @description Class ArticleIndexPriority
 */
class ArticleIndexPriority {
    constructor() {
        this.$selectArticle = $('#select-article');
        this.$addArticle = $('#add-article');
        this.$save = $('#save');
        this.$sortArticleContainer = $('#sort-article-container');
        this.selectedArticles = [];
        this.init();
    }

    init() {
        this.getData();
        this.initSelect2();
        this.initAdd();
        this.initDelete();
        this.initSave();
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
                        except: () => JSON.stringify(this.selectedArticles.map(item => item.id))
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

    initAdd() {
        this.$addArticle.click(event => {
            event.preventDefault();
            if (this.$selectArticle.select2('data').length === 0) {
                toastr.info('Chưa chọn bài viết nào');
                return false;
            }

            let articles = this.$selectArticle.select2('data').map(item => {
                return {
                    id: item.id,
                    title: item.title
                }
            });
            this.selectedArticles = this.selectedArticles.concat(articles);
            this.renderSort();
            this.$selectArticle.val(null).trigger('change')
        })
    }

    initDelete() {
        $(document).on('click', '.delete-item', event => {
            event.preventDefault();
            let id = $(event.currentTarget).data('id');
            swal.fire({
                title: 'Xác nhận xóa',
                html: "<p style='font-size: 14px;color: black'>Xóa bài viết bày khỏi bài viết nổi bật?</p>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'OK',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    this.selectedArticles = this.selectedArticles.filter(item => parseInt(item.id) !== parseInt(id));
                    this.renderSort();
                }
            });
        })
    }

    renderSort() {
        let html = this.selectedArticles.reduce((c, n) => {
            return c + `
                    <div class="dd-item dd3-item" data-id="${n.id}" style="cursor: pointer">
                            <div class="dd-handle dd3-handle"></div>
                            <div class="dd3-content">
                                <div style="display: flex;justify-content: left">
                                    <span style="font-weight: 600;font-size:15px; flex: 3;" title="${n.title}"> ${n.title.length > 100 ? (n.title.slice(0, 100) + '...') : n.title}</span>
                                    <div class="btn btn-danger btn-sm delete-item btn-icon" data-id="${n.id}" style="cursor: pointer;margin-top: 5px">
                                       <i class="la la-trash"></i>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        }, '');

        this.$sortArticleContainer.html(html);
        this.sortable = Sortable.create(this.$sortArticleContainer[0], {
            onSort: () => {
                let data = this.sortable.toArray();
                let tmp = [];
                data.forEach(item => {
                    for (let i = 0; i < this.selectedArticles.length; i++) {
                        if (parseInt(this.selectedArticles[i].id) === parseInt(item)) {
                            tmp.push({
                                id: this.selectedArticles[i].id,
                                title: this.selectedArticles[i].title,
                            });
                            break;
                        }
                    }
                });
                this.selectedArticles = tmp;
            }
        });
    }

    initSave() {
        this.$save.click(event => {
            event.preventDefault();
            showBlock();
            if (this.selectedArticles.length < 4) {
                toastr.error('Cần tối thiểu 4 bài nổi bật');
                return false;
            }

            let url = $(event.currentTarget).data('url');

            axios.post(url, {articles: JSON.stringify(this.selectedArticles)}).then(
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
                    let status = err.response.status;
                    if (status === 500) {
                        toastr.error(err.response.data.message);
                    }
                }
            )
        });
    }

    getData() {
        showBlock();
        axios.get(this.$sortArticleContainer.data('url')).then(
            ({data}) => {
                this.selectedArticles = data;
                this.renderSort();
                setTimeout(() => {
                    hideBlock();
                }, 1000);
            },
            err => {
                hideBlock();
                let status = err.response.status;
                if (status === 500) {
                    toastr.error(err.response.data.message);
                }
                this.$save.prop('disabled', true)
            }
        )
    }
}


$(() => {
    new ArticleIndexPriority();
});
