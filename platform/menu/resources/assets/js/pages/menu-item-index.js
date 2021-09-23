import axios from 'axios';
import {showError, removeError, showBlock, hideBlock} from '../../../../../ttct/resources/assets/js/pages/helper'

/**
 * @author       Giang Nguyen
 * @description class manipulate menu item
 */
class MenuItemIndex {
    constructor() {
        this.$menuNestable = $('#menu-nestable');

        //
        this.$modelEditMenuItem = $('#model-edit-menu-item');
        this.$formUpdateMenuItem = $('#form-update-menu-item');
        this.$updateName = $('#update-name');
        this.$updateDescription = $('#update-description');
        this.$updateIcon = $('#update-icon');
        this.$updateUrl = $('#update-url');
        this.$updateTarget = $('#update-target');
        this.$updateRouteName = $('#update-route-name');
        this.$updatePermissions = $('#update-permissions');
        this.editMenuItem = null;

        //
        this.$formCreateMenuItem = $('#form-create-menu-item');
        this.$createName = $('#create-name');
        this.$createDescription = $('#create-description');
        this.$createIcon = $('#create-icon');
        this.$createUrl = $('#create-url');
        this.$createTarget = $('#create-target');
        this.$createRouteName = $('#create-route-name');
        //
        this.sorted = null;
        this.$submitOrder = $('#submit-order');

        this.init();
    }

    init() {
        this.initCreate();
        this.initNestableMenu();
        this.initModal();
        this.initUpdate();
        this.initUpdateOrder();
        this.initDelete();
        this.initSelect2();
        this.initRestore();
    }

    initCreate() {
        this.$formCreateMenuItem.submit(event => {
            event.preventDefault();
            showBlock();
            let url = $(event.target).attr('action');

            let fd = new FormData(event.target);
            if (this.$createRouteName.select2('data').length) {
                let routeName = {
                    text: this.$createRouteName.select2('data')[0].text,
                    name: this.$createRouteName.select2('data')[0].id
                };
                fd.append('route-name', JSON.stringify(routeName));
            }

            axios.post(url, fd).then(
                res => {
                    toastr.success(res.data.message);
                    this.initNestableMenu();
                    this.$formCreateMenuItem.trigger('reset');
                    this.$createRouteName.val(null).trigger('change');
                    axios.post(this.$menuNestable.data('remove-cache'))
                    hideBlock();
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
        });
    }

    initUpdate() {
        this.$formUpdateMenuItem.submit(event => {
            event.preventDefault();
            if (this.editMenuItem) {
                showBlock();
                let url = this.editMenuItem.url_update;
                let fd = new FormData(event.target);
                if (this.$updateRouteName.select2('data')[0]) {
                    fd.append('menu_id', this.editMenuItem.menu_id);
                    let routeName = {
                        text: this.$updateRouteName.select2('data')[0].text,
                        name: this.$updateRouteName.select2('data')[0].id
                    };
                    fd.append('route-name', JSON.stringify(routeName));
                    if (this.$updatePermissions.select2('data').length > 0) {
                        let permission = {
                            id: this.$updatePermissions.select2('data')[0].id,
                            text: this.$updatePermissions.select2('data')[0].text,
                        };
                        fd.append('permission', JSON.stringify(permission));
                    }
                }

                axios.post(url, fd).then(
                    res => {
                        toastr.success(res.data.message);
                        this.initNestableMenu();
                        this.$modelEditMenuItem.modal('hide');
                        axios.post(this.$menuNestable.data('remove-cache'))
                        hideBlock();
                    },
                    err => {
                        hideBlock();
                        let status = err.response.status;
                        if (status === 422) {
                            showError('update-', err.response.data.errors);
                        } else {
                            toastr.error(err.response.data.message);
                        }
                    }
                )
            }
        });
    }

    initUpdateOrder() {
        this.$submitOrder.click(event => {
            event.preventDefault();

            let url = this.$menuNestable.data('update');
            if (this.sorted != null) {
                showBlock();
                axios.post(url, {data: this.sorted}).then(
                    res => {
                        toastr.success(res.data.message);
                        this.initNestableMenu();
                        this.sorted = null;
                        axios.post(this.$menuNestable.data('remove-cache'));
                        hideBlock();
                    },
                    err => {
                        hideBlock();
                        toastr.error(err.response.data.message);
                    }
                )
            }
        })
    }

    initRestore() {
        $(document).on('click', '.restore-item', event => {
            event.preventDefault();
            showBlock();
            let id = $(event.currentTarget).data('id');
            let url = this.$menuNestable.data('restore');
            url = url.slice(0, url.lastIndexOf('/') + 1) + id;
            axios.post(url).then(
                res => {
                    toastr.success(res.data.message);
                    this.initNestableMenu();
                    axios.post(this.$menuNestable.data('remove-cache'));
                    hideBlock();
                },
                err => {
                    hideBlock();
                    toastr.error(err.response.data.message)
                }
            );
        })
    }

    initDelete() {
        $(document).on('click', '.delete-item', event => {
            event.preventDefault();
            let id = $(event.currentTarget).data('id');
            let url = this.$menuNestable.data('delete');
            url = url.slice(0, url.lastIndexOf('/') + 1) + id;
            swal.fire({
                title: 'Xác nhận xóa?',
                text: "Xóa menu này!",
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
                            this.initNestableMenu();
                            axios.post(this.$menuNestable.data('remove-cache'));
                            hideBlock();
                        },
                        err => {
                            hideBlock();
                            toastr.error(err.response.data.message)
                        }
                    );
                }
            });
        })
    }

    initModal() {
        this.$modelEditMenuItem.on('show.bs.modal', event => {
            let id = $(event.relatedTarget).data('id');
            let url = this.$menuNestable.data('edit');
            url = url.slice(0, url.lastIndexOf('/') + 1) + id;
            axios.get(url).then(
                ({data}) => {
                    this.editMenuItem = data;
                    this.$updateName.val(data.name);
                    this.$updateDescription.val(data.description);
                    this.$updateIcon.val(data.icon);
                    this.$updateTarget.val(data.target);
                    this.$updateUrl.val(data.url);
                    if (data.route_name) {
                        let option = new Option(data.route_name.text, data.route_name.name);
                        this.$updateRouteName.append(option).trigger('change');
                    }
                    if (data.permission) {
                        let option = new Option(data.permission.text, data.permission.name);
                        this.$updatePermissions.append(option).trigger('change');
                    }
                },
                err => {
                    toastr.error(err.response.data.message);
                }
            )
        }).on('hide.bs.modal', () => {
            this.$formCreateMenuItem.trigger('reset');
            removeError([
                this.$updateName,
                this.$updateDescription,
                this.$updateIcon,
                this.$updateTarget,
                this.$updateUrl,
                this.$updateRouteName
            ]);
            this.$updateRouteName.val(null).trigger('change');
            this.$updatePermissions.html('');
            this.$updatePermissions.val(null).trigger('change');
            this.$updateRouteName.html('');
        })
    }

    initSelect2() {
        this.$createRouteName.select2({
            placeholder: 'Select one',
            ajax: {
                tags: true,
                url: this.$createRouteName.data('url'),
                dataType: 'json',
                delay: 250,
                method: 'GET',
                headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                data: function (params) {
                    return {
                        term: params.term
                    };
                },
                processResults: data => {
                    return {
                        results: $.map(data, function (item) {
                            return {
                                text: `Name: <strong>${item.name}</strong> | pattern: <strong>${item.uri}</strong>`,
                                id: item.name
                            };
                        })
                    };
                },
                cache: true
            },
            escapeMarkup: markup => markup,
        });

        this.$updateRouteName.select2({
            placeholder: 'Select one',
            ajax: {
                url: this.$createRouteName.data('url'),
                dataType: 'json',
                delay: 250,
                method: 'GET',
                headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                data: function (params) {
                    return {
                        term: params.term
                    };
                },
                processResults: data => {
                    return {
                        results: $.map(data, function (item) {
                            let a = {
                                text: `Name: <strong>${item.name}</strong> | pattern: <strong>${item.uri}</strong>`,
                                id: item.name,
                            };
                            return a;
                        })
                    };
                },
                cache: true
            },
            escapeMarkup: markup => markup
        });
        this.$updatePermissions.select2({
            placeholder: 'Select one',
            allowClear: true,
            ajax: {
                url: this.$updatePermissions.data('url'),
                dataType: 'json',
                delay: 250,
                method: 'POST',
                headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                data: function (params) {
                    return {
                        term: params.term,
                        page: params.page,
                    };
                },
                processResults: data => {
                    return {
                        results: $.map(data.data, function (item) {
                            return {
                                text: `${item.name}`,
                                id: item.id,
                                title: `${item.name}`
                            }
                        }),
                        pagination: {
                            more: data.current_page < data.total_pages
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: markup => markup
        });

        this.$createRouteName.on('select2:select', () => {
            removeError([this.$createRouteName])
        });

        this.$updateRouteName.on('select2:select', () => {
            removeError([this.$updateRouteName])
        });

    }

    initNestableMenu() {
        const url = $('#test').data('url');
        axios.get(url).then(response => {
            const data = response.data;
            const html = data.length > 0 ? this.generateNestableHtml(data) : '<div class="dd-empty"></div>';
            this.$menuNestable.html(html);
            this.$menuNestable.nestable({
                maxDepth: 3
            });
            this.$menuNestable.on('change', () => {
                this.sorted = JSON.stringify(this.$menuNestable.nestable('serialize'));
                console.log(this.sorted)
            });
        });
    }

    generateNestableHtml(data) {
        let html = '<ol class="dd-list">';
        for (let menu of data) {
            html += `<li class="dd-item dd3-item" data-id="${menu.id}">
                        <div class="dd-handle dd3-handle"></div>
                        <div class="dd3-content">
                            <div style="display: flex;justify-content: left">
                                <span style="font-weight: 600;font-size:15px; flex: 1;">${menu.name} </span>
                                <div>
                                    <div class="btn btn-info btn-sm" data-id="${menu.id}" data-toggle="modal" data-target="#model-edit-menu-item" style="cursor: pointer">
                                        <i class="la la-edit"></i> Sửa
                                    </div>
                                    ${menu.status === 10 ? `
                                        <div class="btn btn-danger btn-sm delete-item" data-id="${menu.id}" style="cursor: pointer">
                                            <i class="la la-trash"></i> Xóa
                                        </div>
                                    ` : `
                                        <div class="btn btn-warning btn-sm restore-item" data-id="${menu.id}" style="cursor: pointer">
                                            <i class="la la-mail-reply"></i> Khôi phục
                                        </div>
                                    `}

                                </div>
                                </div>
                        </div>
                        ${(menu.children && menu.children.length > 0) ? this.generateNestableHtml(menu.children) : ''}
                    </li>
            `;
        }
        html += '</ol>';
        return html;
    }
}

$(() => {
    new MenuItemIndex();
});
