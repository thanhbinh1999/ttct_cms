import axios from "axios";
import {
    checkPermissions,
    showError,
    showBlock,
    removeError,
    hideBlock
} from "../../../../../../ttct/resources/assets/js/pages/helper";
/**
 * @author        Giang Nguyen
 * @description class for manipulate black key
 */
class BlackKeyIndex {
    constructor() {
        this.$blackKeyTable = $('#black-key-table');
        this.$searchKey = $('#search-key');
        this.datatable = null;

        //create
        this.modalCreateBlackKey = $('#modal-create-black-key');
        this.$formCreateBlackKey = $('#form-create-black-key');
        this.$createKey =$('#create-key');

        this.init();
    }

    init() {
        this.initAcl();
        this.initCreate();
        this.initDelete();
    }

    initAcl() {
        axios.get($('body').data('acl')).then(
            res => {
                this.acl = res.data;
                this.initDatatable();
            }
        )
    }

    initDatatable() {
        this.datatable = this.$blackKeyTable.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$blackKeyTable.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                ['search-key']: ()=> this.$searchKey.val()
                            }
                        },
                        map: function (raw) {
                            let dataSet = raw;
                            if (typeof raw.data !== 'undefined') {
                                dataSet = raw.data;
                            }
                            return dataSet;
                        },
                    },
                },
                pageSize: 10,
                serverPaging: true,
                serverFiltering: true,
                serverSorting: true,
            },
            layout: {
                scroll: true,
                footer: true,
            },
            sortable: true,

            pagination: true,

            search: {
                input: this.$searchKey,
            },
            rows: {
                autoHide: true
            },
            columns: [
                {
                    field: 'id',
                    title: 'ID',
                    width: 150,
                    type: 'string',
                    autoHide: false,
                    sortable: false,
                    textAlign: 'center',
                    template: row => `<strong>${row.id}</strong>`
                },

                {
                    field: 'key',
                    title: 'KEY',
                    width: 150,
                    type: 'string',
                    autoHide: false,
                    textAlign: 'center',
                    template: row => `<strong>${row.key}</strong>`
                },
                {
                    field: 'actions',
                    title: '!!!',
                    sortable: false,
                    width: 50,
                    textAlign: 'center',
                    overflow: 'visible',
                    template: row => {
                        if (this.acl) {
                            let permissions = checkPermissions(['black-key-delete'], this.acl.permissions);
                            let del = permissions['black-key-delete'] ? `<a class="dropdown-item font-weight-bold delete-black-key" href="#" data-url-delete="${row.url_delete}"><i class="la la-close"></i>Xóa</a>` : '';
                            return (del).length > 0 ? `<div class="dropdown">
                                        <a href="javascript:;" class="btn btn-sm btn-clean btn-icon btn-icon-sm" style="cursor: pointer" data-toggle="dropdown">
                                            <i class="flaticon2-console"></i>
                                        </a>
                                        <div class="dropdown-menu dropdown-menu-right">
                                            ${del}
                                        </div>
                                    </div>` : '';
                        }
                    },
                }
            ]
        });
    }

    initCreate() {
        this.modalCreateBlackKey.on('hide.bs.modal', () => {
            this.$formCreateBlackKey.trigger('reset');
            removeError([
                this.$createKey
            ]);
        });
        this.$formCreateBlackKey.submit(event => {
            event.preventDefault();
            showBlock();
            let url = $(event.target).attr('action');
            axios.post(url, new FormData(event.target)).then(
                ({data}) => {
                    toastr.success(data.message);
                    setTimeout(() => {
                        this.modalCreateBlackKey.modal('hide');
                        hideBlock();
                        this.datatable.reload();
                    }, 1000)
                },
                err => {
                    hideBlock();
                    let status = err.response.status;
                    if (status === 422) {
                        showError('create-', err.response.data.errors);
                    } else {
                        toastr.error(err.response.data.message);
                    }
                }
            )
        })
    }

    initDelete() {
        $(document).on('click', '.delete-black-key', event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('url-delete');

            swal.fire({
                title: 'Xác nhận xóa',
                html: "<strong>Xóa từ khóa này?</strong>",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Xóa',
                cancelButtonText: 'Hủy',
                reverseButtons: true
            }).then(result => {
                if (result.value) {
                    showBlock();
                    axios.delete(url).then(
                        res => {
                            toastr.success(res.data.message);
                            setTimeout(() => {
                                hideBlock();
                                this.datatable.load();
                            }, 1000);
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
        })
    }
}

$(() => {
    new BlackKeyIndex();
});
