import uuid from "uuid/v1";
import axios from 'axios';
import {showBlock, hideBlock} from './helper';
/**
 * @author        Giang Nguyen
 * @description Class ArticleCreateUploadResource
 */
export default class ArticleCreateUploadResource {
    constructor(createArticleInstant) {
        this.createArticleInstant = createArticleInstant;

        this.mode = 'upload';

        this.$modalUploadTabUpload = $('a[href="#modal-upload-tab-upload"]');
        this.$modalUploadTabSelectResource = $('a[href="#modal-upload-tab-select-resource"]');
        this.$modalUploadFilePreview = $('#modal-upload-file-preview');

        // tab upload
        this.$modalSelectResource = this.createArticleInstant.$modalSelectResource;
        this.$modalUploadResourceBtnSelect = $('#modal-upload-resource-btn-select');
        this.$modalUploadResourceBtnUpload = $('#modal-upload-resource-btn-upload');
        this.$modalUploadResourceInput = $('#modal-upload-resource-input');
        this.$modalUploadResourceRreviewContainer = $('#modal-upload-resource-preview-container');
        this.$modalUploadCompleteBtn = $('#modal-upload-complete-btn');
        this.files = [];
        this.resourceAfterUpload = null;

        // tab select
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

    init() {
        this.initTab();
        this.initModal();
        this.initUpload();
        this.initPickDate();
    }

    initUpload() {
        // on click btn upload => trigger input file for select file
        this.$modalUploadResourceBtnSelect.click(event => {
            event.preventDefault();
            this.$modalUploadResourceInput.click();
        });

        //when select file is done => render html for preview all file
        this.$modalUploadResourceInput.change(event => {
            if ($(event.target)[0].files) {
                let tmpFiles = this.toArray($(event.target)[0].files);
                for (let i = 0; i < tmpFiles.length; i++) {
                    this.files.push({
                        file: tmpFiles[i],
                        id: uuid()
                    });
                }
                this.renderImagePreview();
                this.$modalUploadResourceInput.val(null);
                this.$modalUploadResourceBtnUpload.show();
            }
        });

        // event for remove one file from selected file
        $(document).on('click', '.modal-upload-resource-btn-remove-image', event => {
            event.preventDefault();
            let id = $(event.currentTarget).data('id');
            if (id) {
                this.files = this.files.filter(file => file.id !== id);
                if (this.files.length === 0) {
                    this.$modalUploadResourceBtnUpload.hide();
                }
                this.renderImagePreview();
            }
        });

        // init event for upload file to server
        this.$modalUploadResourceBtnUpload.click(event => {
            event.preventDefault();
            if (this.files.length > 0) {
                if (this.files.length > 5) {
                    toastr.info('Chỉ được phép tải lên tối đa 5 file');
                    return false;
                }
                showBlock();
                let fd = new FormData();
                this.files.forEach(file => {
                    fd.append('files[]', file.file);
                    fd.append('descriptions[]', $(`textarea[id=${file.id}]`).val());
                    fd.append('names[]', $(`input[id=${file.id}]`).val());
                });
                fd.append('creator_id', this.$modalUploadResourceBtnUpload.data('creator-id'));
                fd.append('creator_full_name', this.$modalUploadResourceBtnUpload.data('creator-full-name'));
                fd.append('creator_username', this.$modalUploadResourceBtnUpload.data('creator-username'));

                axios.post(this.$modalUploadResourceBtnUpload.data('url-upload-multi'), fd, {headers: {'Content-Type': 'multipart/form-data'}}).then(
                    ({data}) => {
                        if (data.message) {
                            toastr.success(data.message);
                            this.files = [];
                            this.$modalUploadResourceRreviewContainer.html('');
                            this.$modalUploadResourceBtnUpload.hide();
                            this.$modalUploadResourceInput.val(null);
                            this.resourceAfterUpload = data.resources;
                            this.renderResourceAfterUpload(data.resources);
                            hideBlock();
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
            } else {
                toastr.error('Không thể upload, không có file');
            }
        });

        //on upload is done or resource is selected then inject it as html to editor
        this.$modalUploadCompleteBtn.click(event => {
            event.preventDefault();
            if (this.mode === 'upload') {
                this.processForModeUpload();
            } else {
                this.processForModeSelect();
            }
            this.$modalSelectResource.modal('hide');
        });
    }

    initModal() {
        this.$modalSelectResource.on('hide.bs.modal', event => {
            if (event.namespace === 'bs.modal') {
                this.files = [];
                this.$modalUploadResourceRreviewContainer.html('');
                this.$modalUploadResourceBtnUpload.hide();
                this.$modalUploadResourceInput.val(null);
                this.mode = 'upload';
                this.$modalUploadTabUpload.click();
                this.resourceAfterUpload = null;
                this.selecttedResource = [];
                this.$modalUploadFilePreview.html('');
            }
        }).on('show.bs.modal', event => {
            if (event.namespace === 'bs.modal') {
                this.createArticleInstant.processFileMode();
                if (this.datatable) {
                    this.datatable.reload();
                }
            }
        });
    }

    initTab() {
        this.$modalUploadTabUpload.click(() => {
            this.mode = 'upload';
        });

        this.$modalUploadTabSelectResource.click(() => {
            this.mode = 'select';
            if (this.datatable) {
                this.datatable.reload();
            } else {
                this.initDatable();
            }
            this.$modalUploadFilePreview.html('').hide();
        });
    }

    initPickDate() {
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

    renderImagePreview() {
        this.$modalUploadResourceRreviewContainer.html('');
        for (let i = 0; i < this.files.length; i++) {
            let type = this.files[i].file.type;
            let name = this.files[i].file.name;
            name = name.slice(0, name.lastIndexOf('.'));
            type = type.split('/');
            if (type[0] === 'image') {
                let reader = new FileReader();
                reader.onload = e => {
                    this.$modalUploadResourceRreviewContainer.append(`
                        <div class="col-md-6 mt-2 mb-2 one-file" style="display: flex;justify-content: center;align-items: center" >
                            <div class="row" style="width: 100%;">
                                <div class="col-md-3">
                                    <img src="${e.target.result}" class="img-thumbnail" style="width:100%">
                                </div>
                                <div class="col-md-7">
                                    <div class="form-group">
                                        <input class="form-control" placeholder="Tên" id="${this.files[i].id}" value="${name}">
                                    </div>
                                    <div class="form-group">
                                        <textarea rows="2" class="form-control" placeholder="Mô tả" id="${this.files[i].id}" ></textarea>
                                    </div>
                                </div>
                                <div class="col-md-2" style="display: flex;justify-content: center;align-items: center">
                                    <div data-id="${this.files[i].id}" class="btn btn-danger btn-icon modal-upload-resource-btn-remove-image"><i class="la la-trash"></i></div>
                                </div>
                            </div>
                        </div>
                `);
                };
                reader.readAsDataURL(this.files[i].file);
            } else {
                this.$modalUploadResourceRreviewContainer.append(`
                        <div class="col-md-6 mt-2 mb-2 one-file" style="display: flex;justify-content: center;align-items: center" >
                            <div class="row" style="width: 100%;">
                                <div class="col-md-3">
                                    ${this.generatePreviewHtmlForFile({
                    type: this.textToNumber(type[0])
                })}
                                </div>
                                <div class="col-md-7">
                                    <div class="form-group">
                                        <input class="form-control" placeholder="Tên" id="${this.files[i].id}" value="${name}">
                                    </div>
                                    <div class="form-group">
                                        <textarea rows="2" class="form-control" placeholder="Mô tả" id="${this.files[i].id}" ></textarea>
                                    </div>
                                </div>
                                <div class="col-md-2" style="display: flex;justify-content: center;align-items: center">
                                    <div data-id="${this.files[i].id}" class="btn btn-danger btn-icon modal-upload-resource-btn-remove-image"><i class="la la-trash"></i></div>
                                </div>
                            </div>
                        </div>
                `);
            }
        }
    }

    renderResourceAfterUpload(resources) {
        resources.forEach(res => {
            this.$modalUploadResourceRreviewContainer.append(`
                        <div class="col-md-6 mt-2 mb-2 modal-upload-one-file" style="display: flex;justify-content: center;align-items: center" >
                            <div class="row">
                                <div class="col-md-1" style="display: flex;align-items: center;">
                                    <label class="kt-checkbox kt-checkbox--bold kt-checkbox--brand" style="margin-left: 0;margin-right: 0;padding-left: 0;padding-right: 0;display:flex;justify-content: center;align-items: center">
                                        <input type="checkbox" data-id="${res.id}" checked value="${res.base_url}/${res.absolute_url}">
                                        <span></span>
                                    </label>
                                </div>
                                <div class="col-md-4">
                                    ${this.generatePreviewHtmlForFile(res)}
                                </div>
                                <div class="col-md-7">
                                    <div class="form-group">
                                        <input class="form-control" data-id="${res.id}" value="${res.base_url}/${res.absolute_url}">
                                    </div>
                                </div>
                            </div>
                        </div>
                `);
        })
    }

    toArray(data) {
        let result = [];
        Object.keys(data).forEach(key => {
            result.push(data[key])
        });
        return result;
    }

    initDatable() {
        this.datatable = this.$modalUploadTableSelectResource.KTDatatable({
            data: {
                type: 'remote',
                source: {
                    read: {
                        url: this.$modalUploadTableSelectResource.data('url'),
                        headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                        params: {
                            query: {
                                name: () => this.$modalUploadDatatableInputFileName.val(),
                                from: () => this.$modalUploadDatatableInputFrom.val(),
                                to: () => this.$modalUploadDatatableInputTo.val(),
                                type: () => this.$modalUploadDatatableInputFileType.val(),
                                upload_by: () => this.$modalUploadDatatableInputUploadBy.val()
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
                height: 580,
                footer: false
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
                    width: 10,
                    type: 'string',
                    sortable: false,
                    selector: {class: 'kt-checkbox--solid'},
                    autoHide: false,
                    textAlign: 'left',
                },
                {
                    field: 'content',
                    title: 'NỘI DUNG',
                    width: 200,
                    type: 'string',
                    sortable: false,
                    selector: false,
                    autoHide: false,
                    textAlign: 'center',
                    template: row => this.generatePreviewHtmlForFile(row)
                },
                {
                    field: 'name',
                    title: 'TÊN',
                    width: 200,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    textAlign: 'center',
                    template: row => `<strong style="cursor:pointer" class="file-name" data-id="${row.id}">${row.name}</strong>`
                },
                {
                    field: 'link',
                    title: 'LINK',
                    width: 500,
                    type: 'string',
                    selector: false,
                    sortable: false,
                    autoHide: false,
                    textAlign: 'center',
                    template: row => `<input type="text" data-type="${row.type}" data-id="${row.id}"  data-base-url="${row.base_url}" data-absolute-url="${row.absolute_url}" class="form-control" value="${row.base_url}/${row.absolute_url}" style="width:100%">`
                },
                {
                    field: 'created_at',
                    title: 'CREATED AT',
                    width: 100,
                    type: 'string',
                    selector: false,
                    autoHide: false,
                    textAlign: 'center',
                    template: row => {
                        return `<strong>${row.created_at}</strong>`;
                    }
                },
            ]
        });
        this.datatable.on("kt-datatable--on-check kt-datatable--on-uncheck", () => {
            this.selecttedResource = this.datatable.rows(".kt-datatable__row--active").nodes()
                .find('[data-field="link"]')
                .map((index, cell) => {
                    let formControl = $(cell).find('.form-control');
                    return {
                        id: formControl.data('id'),
                        type: formControl.data('type'),
                        base_url: formControl.data('base-url'),
                        absolute_url: formControl.data('absolute-url'),
                    }
                }).toArray();
        });

        this.$modalUploadDatatableInputBtnSearch.click(event => {
            event.preventDefault();
            this.datatable.search();
        });

        $(document).on('click', '.file-name', event => {
            event.preventDefault();
            let id = $(event.target).data('id');
            axios.get(this.$modalUploadResourceBtnUpload.data('url-get-resource-detail') + id).then(
                ({data}) => {
                    let review = parseInt(data.type) === 1 ? `<img class="img-thumbnail" src="${data.base_url}/${data.absolute_url}" style="width:70%">` :
                        `<video controls style="width:100%">
                          <source src="${data.base_url}/${data.absolute_url}">
                        </video>`;
                    this.$modalUploadFilePreview.show().html(`
                        <div class="row" style="display: flex;justify-content: center">
                        <div class="col-12 text-center">${review}</div>
                        </div>
                        <div class="mt-5 text-right" style="padding: 36px">
                            <h4 style="display:block">${data.name}</h4>
                            <h5 style="color:#292626;display:block"><strong>Ngày tạo: </strong>${data.created_at} - <strong>Upload bởi</strong>: ${data.creator_full_name}</h5>
                            <div class="form-group">
                                <input type="text" value="${data.base_url}/${data.absolute_url}" class="form-control mt-5">
                            </div>
                        </div>
                    `);
                },
                err => {

                }
            );
        });
    }

    processForModeUpload() {
        if (this.resourceAfterUpload && this.resourceAfterUpload.length > 0) {
            let ids = [];
            $('.modal-upload-one-file').toArray().forEach(item => {
                let checkBox = $(item).find('input[type=checkbox]');
                if (checkBox.prop('checked')) {
                    ids.push(parseInt(checkBox.data('id')));
                }
            });

            if (ids.length > 0) {
                let resources = this.resourceAfterUpload.filter(res => ids.includes(parseInt(res.id)));
                let type = this.createArticleInstant.selectResourceIsCurrentUseFor;

                //check if resource select is trigger from thumbnail
                if (type === 'thumbnail' || type === 'cover-pc' || type === 'cover-mobile'
                ) {
                    this.createArticleInstant.setImageDropify(resources[0], type);
                    this.createArticleInstant.selectResourceIsCurrentUseFor = null;
                    this.resourceAfterUpload = null;
                } else if (type === 'resources') {
                    // this.createArticleInstant.setResources(resources);
                    // this.selecttedResource = []
                    //check if resource select is trigger from froala
                } else if (type === 'froala') {
                    //check if current replace an file
                    if (this.createArticleInstant.currentEditFile) {
                        let file = this.createArticleInstant.currentEditFile;
                        let url = resources[0].base_url + '/' + resources[0].absolute_url;
                        if (file.type === 'img') {
                            let currentFile = $(this.createArticleInstant.currentEditFile.img);
                            let parent = currentFile.parent();
                            if (parent.attr('data-fancybox') !== undefined) {
                                parent.attr('href', url)
                            }
                            $(this.createArticleInstant.currentEditFile.img).attr('src', url);
                        } else {
                            let video = $(this.createArticleInstant.currentEditFile.video).find('video');
                            $(this.createArticleInstant.currentEditFile.video).attr('src', url);
                            $(this.createArticleInstant.currentEditFile.video).find('source').attr('src', url);
                            $(video)[0].load();
                        }
                        this.createArticleInstant.currentEditFile = null;
                        this.resourceAfterUpload = null
                    } else {
                        //else add all generated html to editor content
                        let html = '';
                        resources.forEach(res => {
                            html += this.generateHtmlForFile(res);
                        });
                        this.createArticleInstant.initEditor(html);
                        this.resourceAfterUpload = null
                    }
                } else if (type === 'froala-quick-insert') {
                    //else add all generated html to editor content
                    let html = '';
                    resources.forEach(res => {
                        html += this.generateHtmlForFile(res);
                    });
                    let positionMark = document.getElementById('position_mark');
                    $(html).insertAfter(positionMark);
                    $(positionMark).remove();
                    // this.createArticleInstant.quickInsertSetHtmlFunc(html);
                    this.resourceAfterUpload = null
                }
            }
        }
    }

    generateHtmlForFile(res) {
        let file = '';
        switch (parseInt(res.type)) {
            case 1: {
                file = `<img src="${res.base_url}/${res.absolute_url}" class="img-thumbnail">`;
                file = `<figure>
                            <div class="grid-img">
                                <div href="${res.base_url}/${res.absolute_url}" data-fancybox="gallery" data-caption="">
                                    <img src="${res.base_url}/${res.absolute_url}" alt="" style="width: 100%">
                                </div>
                            </div>
                        </figure>`;
                break;
            }
            case 2: {
                file = `<span class="fr-video fr-deletable fr-fvc fr-dvi fr-draggable" contenteditable="false" style="">
                            <video controls="" style="width: 100%;" class="fr-fvc fr-dvi fr-draggable">
                            <source src="${res.base_url}/${res.absolute_url}"></video>
                        </span>`;
                break;
            }
            case 3: {
                file = `<img src="${$('body').data('base-url')}/file-audio-icon.png" class="img-thumbnail" style="width:100%">`;
                break;
            }
            default: {
            }
        }
        return file;
    }

    generatePreviewHtmlForFile(res) {
        let file = '';
        switch (parseInt(res.type)) {
            case 1: {
                file = `<img src="${res.base_url}/${res.absolute_url}" class="img-thumbnail" style="width:100%">`;
                break;
            }
            case 2: {
                file = `<img src="${$('body').data('base-url')}/assets/img/icon/file-video-icon.png" class="img-thumbnail" style="width:100%">`;
                break;
            }
            case 3: {
                file = `<img src="${$('body').data('base-url')}/assets/img/icon/file-audio-icon.png" class="img-thumbnail" style="width:100%">`;
                break;
            }
            default: {
                file = `<img src="${$('body').data('base-url')}/assets/img/icon/file-icon.png" class="img-thumbnail" style="width:100%">`;
            }
        }
        return file;
    }

    processForModeSelect() {
        if (this.selecttedResource.length > 0) {
            //check if resource select is trigger from thumbnail
            let type = this.createArticleInstant.selectResourceIsCurrentUseFor;

            if (type === 'thumbnail' || type === 'cover-pc' || type === 'cover-mobile') {
                this.createArticleInstant.setImageDropify(this.selecttedResource[0], type);
                this.createArticleInstant.selectResourceIsCurrentUseFor = null;
                this.selecttedResource = []
                //check if resource select is trigger from resources
            } else if (this.createArticleInstant.selectResourceIsCurrentUseFor === 'resources') {
                this.createArticleInstant.setResources(this.selecttedResource);
                this.selecttedResource = []
                //check if resource select is trigger from froala
            } else if (this.createArticleInstant.selectResourceIsCurrentUseFor === 'froala') {
                //check if current replace an file
                if (this.createArticleInstant.currentEditFile) {
                    let file = this.createArticleInstant.currentEditFile;
                    let url = this.selecttedResource[0].base_url + '/' + this.selecttedResource[0].absolute_url;
                    if (file.type === 'img') {
                        let currentFile = $(this.createArticleInstant.currentEditFile.img);
                        let parent = currentFile.parent();
                        if (parent.attr('data-fancybox') !== undefined) {
                            parent.attr('href', url)
                        }
                        $(this.createArticleInstant.currentEditFile.img).attr('src', url);
                    } else {
                        let video = $(this.createArticleInstant.currentEditFile.video).find('video');
                        $(this.createArticleInstant.currentEditFile.video).attr('src', url);
                        $(this.createArticleInstant.currentEditFile.video).find('source').attr('src', url);
                        $(video)[0].load();
                    }
                    this.createArticleInstant.currentEditFile = null;
                    this.selecttedResource = []
                } else {
                    //else add all generated html to editor content
                    let html = '';
                    this.selecttedResource.forEach(res => {
                        html += this.generateHtmlForFile(res);
                    });
                    this.createArticleInstant.initEditor(html);
                    this.selecttedResource = []
                }
            } else if (this.createArticleInstant.selectResourceIsCurrentUseFor === 'froala-quick-insert') {
                //else add all generated html to editor content
                let html = '';
                this.selecttedResource.forEach(res => {
                    html += this.generateHtmlForFile(res);
                });
                // this.createArticleInstant.quickInsertSetHtmlFunc(html, true);
                let positionMark = document.getElementById('position_mark');
                $(html).insertAfter(positionMark);
                $(positionMark).remove();
                // this.createArticleInstant.quickInsertSetHtmlFunc.bind(this.createArticleInstant.editor)(html);
                this.selecttedResource = []
            }
        }
    }

    textToNumber(text) {
        switch (text) {
            case 'image': {
                return 1;
            }
            case 'video': {
                return 2;
            }
            case 'audio': {
                return 3;
            }
            default: {
                return 0;
            }
        }
    }
}
