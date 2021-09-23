import axios from 'axios';
import {showBlock, hideBlock, showError, checkPermissions} from './helper';
import ArticleCreateUploadResource from './article-create-upload-resource';
import ArticleCreateUpdateCreateTag from './article-create-update-create-tag';
import ArticleCreateUpdateCreateTheme from './article-create-update-create-theme'

import {block} from "./block";

/**
 * @author        Giang Nguyen
 * @description Class ArticleEdit
 */
class ReservePaperEdit {
    constructor() {
        this.data = null;
        this.$thumbnail = $('#update-thumbnail');
        this.$updateCoverPc = $('#update-cover-pc');
        this.$updateCoverMoblie = $('#update-cover-mobile');
        this.$categories = $('#update-categories');
        this.$tags = $('#update-tags');
        this.$title = $('#update-title');
        this.$excerpt = $('#update-excerpt');
        this.$content = $('#update-content');
        this.$author = $('#update-author');
        this.$updateGoogleDescription = $('#update-google-description');
        this.$uploadGoogleKey = $('#update-google-key');
        this.$uploadFbDescription = $('#update-fb-description');
        this.$uploadFbTitle = $('#update-fb-title');
        this.$themes = $('#update-themes');
        this.$updateTopical = $('#update-topical');
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

        //
        this.$modalSelectTemplate = $('#modal-select-template');
        this.$modalSelectResource = $('#modal-select-resource');
        this.$btnSubmit = $('#btn-submit');

        //
        this.$articlePreviewBtn = $('#article-preview');

        //
        this.$btnPublish = $('#btn-publish');

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

        this.init();
    }

    init() {
        this.initFroalaEditor();
        this.initSelect2();
        this.initThumbnail();
        this.initCover();
        this.initGetAcl();
        this.initSubmit();
        this.initPublish();
        this.initSelectBlock();
        this.initPreview();
        this.initPreventReload();
    }

    initGetAcl() {
        showBlock();
        axios.get($('body').data('acl')).then(
            res => {
                this.acl = res.data;
                this.initGetData();
            }
        )
    }

    initPreventReload() {
        this.$title.on('keyup change', () => {
            if (!window.onbeforeunload)
                window.onbeforeunload = function () {
                    return '';
                }
        });

        this.$excerpt.on('keyup change', () => {
            if (!window.onbeforeunload)
                window.onbeforeunload = function () {
                    return '';
                }
        });

        this.$uploadGoogleKey.on('keyup change', () => {
            if (!window.onbeforeunload)
                window.onbeforeunload = function () {
                    return '';
                }
        });

        this.$updateGoogleDescription.on('keyup change', () => {
            if (!window.onbeforeunload)
                window.onbeforeunload = function () {
                    return '';
                }
        });

        this.$uploadFbTitle.on('keyup change', () => {
            if (!window.onbeforeunload)
                window.onbeforeunload = function () {
                    return '';
                }
        });

        this.$uploadFbDescription.on('keyup change', () => {
            if (!window.onbeforeunload)
                window.onbeforeunload = function () {
                    return '';
                }
        });

        this.$author.on('keyup change', () => {
            if (!window.onbeforeunload)
                window.onbeforeunload = function () {
                    return '';
                }
        });

    }

    initThumbnail() {
        this.dropifyThumbail = this.$thumbnail.dropify({
            height: 150,
            messages: {
                'default': 'Chọn hình đại diện',
                'replace': 'Click để thay thế',
                'remove': 'Xóa',
                'error': 'Ooops, có lỗi bất ngờ xảy ra.'
            }
        });
        this.$selectThumbnail.click(event => {
            event.preventDefault();
            this.fileMode = 'image';
            this.selectResourceIsCurrentUseFor = 'thumbnail';
        });
        this.$thumbnail.click(event => {
            event.preventDefault();
            this.$selectThumbnail.click();
        })
    }

    initCover() {
        this.dropifyCoverPC = this.$updateCoverPc.dropify({
            height: 300,
            messages: {
                'default': 'Chọn hình cover cho PC',
                'replace': 'Click để thay thế',
                'remove': 'Xóa',
                'error': 'Ooops, có lỗi bất ngờ xảy ra.'
            }
        });
        this.$selectCoverPc.click(event => {
            event.preventDefault();
            this.fileMode = 'image';
            this.selectResourceIsCurrentUseFor = 'cover-pc';
        });
        this.$updateCoverPc.click(event => {
            event.preventDefault();
            this.$selectCoverPc.click();
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
        this.$selectCoverMobile.click(event => {
            event.preventDefault();
            this.fileMode = 'image';
            this.selectResourceIsCurrentUseFor = 'cover-mobile';
        });
        this.$updateCoverMoblie.click(event => {
            event.preventDefault();
            this.$selectCoverMobile.click();
        })
    }

    initPreview() {
        this.$articlePreviewBtn.click(event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('preview');
            this.setLocalStorageData();
            if (this.window) {
                this.window.location.reload();
            } else {
                this.window = window.open(url, '_blank');
                this.window.onbeforeunload = () => {
                    this.window = null;
                    localStorage.removeItem('data_preview');
                }
            }
        });
    }

    initSelectBlock() {
        this.$modalSelectBlock.on('show.bs.modal', event => {
            let html = Object.keys(block).reduce((c, n) => {
                return c + `<dic class="row mt-2 mb-2">
                                <div class="col-6">
                                    <label class="kt-radio kt-radio--bold kt-radio--brand"><input type="radio" value="${n}" name="select-block-html"><strong>${block[n].name}</strong><span></span></label>
                                </div>
                                <div class="col-6">
                                    <burron class="btn btn-info preview-block" data-key="${n}" style="cursor: pointer">Xem</burron>
                                </div>
                            </dic>`;
            }, '');
            $('#checkbox').html(html);
        }).on('hide.bs.modal', event => {
            $('#checkbox').html('');
            $('#preview-block').html('');
        });

        $(document).on('click', '.preview-block', event => {
            event.preventDefault();
            let key = $(event.currentTarget).data('key');
            $('#preview-block').html(block[key].html);
            if (key === 'block_11')
                $('#preview-block').find('p').css({'margin-left': '-100px'})
        });

        this.$selectBlock.click(() => {
            let html = '';
            $('input[name=select-block-html]').toArray().forEach(check => {
                if ($(check).prop('checked')) {
                    html += block[$(check).val()].html;
                }
            });
            html += `<p></p>`;
            let positionMark = document.getElementById('position_mark');
            $(html).insertAfter(positionMark);
            $(positionMark).remove();
            // this.editor.html.insert(html);
            // this.editor.html.insert('<p></p>')
        });

        $(document).on('change', 'input[name=select-block-html]', event => {
            let val = $('input[name=select-block-html]:checked').val();
            $('#preview-block').html(block[val].html);
            if (val === 'block_11')
                $('#preview-block').find('p').css({'margin-left': '-100px'})
        })
    }

    setImageDropify(img, type) {
        switch (type) {
            case 'thumbnail': {
                let thumb = this.dropifyThumbail.data('dropify');
                thumb.settings.defaultFile = img.base_url + '/' + img.absolute_url;
                thumb.destroy();
                thumb.init();
                this.thumb = img;
                break;
            }
            case 'cover-pc': {
                let cover = this.dropifyCoverPC.data('dropify');
                cover.settings.defaultFile = img.base_url + '/' + img.absolute_url;
                cover.destroy();
                cover.init();
                this.coverPC = img;
                break;
            }
            case 'cover-mobile': {
                let cover = this.dropifyCoverMobile.data('dropify');
                cover.settings.defaultFile = img.base_url + '/' + img.absolute_url;
                cover.destroy();
                cover.init();
                this.coverMobile = img;
                break;
            }
        }
        $('.dropify-clear').hide();
    }

    initFroalaEditor() {
        let setCurrentEditFile = this.setCurrentEditFile.bind(this);
        let setFileMode = this.setFileMode.bind(this);
        let processFileType = this.processFileMode.bind(this);
        let setSelectResourceIsCurrentUseFor = this.setSelectResourceIsCurrentUseFor.bind(this);
        let setQuickInsertSetHtmlFunc = this.setQuickInsertSetHtmlFunc.bind(this);

        let getWindow = this.getWindow.bind(this);
        let setLocalStorageData = this.setLocalStorageData.bind(this);
        // define icon template
        FroalaEditor.DefineIconTemplate('svg-icon', '[SVG]');
        FroalaEditor.DefineIconTemplate('fontawesome-icon', '<i class="[ICON]"></i>');
        FroalaEditor.DefineIconTemplate('lineawesome-icon', '<i class="[ICON]"></i>');
        FroalaEditor.DefineIconTemplate('flat-icon', '<i class="[ICON]"></i>');
        FroalaEditor.DefineIconTemplate('soc-icon', '<i class="[ICON]"></i>');

        // define icon
        FroalaEditor.DefineIcon('browseImage', {ICON: 'flaticon2-image-file', template: 'flat-icon'});
        FroalaEditor.DefineIcon('browseVideo', {ICON: 'socicon-filmweb', template: 'soc-icon'});
        FroalaEditor.DefineIcon('selectBlockHtml', {ICON: 'flaticon2-download-2', template: 'flat-icon'});

        //register command
        FroalaEditor.RegisterCommand('modalBrowseImage', {
            title: 'Chèn hình ảnh',
            icon: 'browseImage',
            focus: true,
            undo: true,
            refreshAfterCallback: false,
            callback: () => {
                this.selectResourceIsCurrentUseFor = 'froala';
                this.fileMode = 'image';
                this.$modalSelectResource.modal('show');
            }
        });
        FroalaEditor.RegisterCommand('modalBrowseVideo', {
            title: 'Chèn video',
            icon: 'browseVideo',
            focus: true,
            undo: true,
            refreshAfterCallback: false,
            callback: () => {
                this.selectResourceIsCurrentUseFor = 'froala';
                this.fileMode = 'video';
                this.$modalSelectResource.modal('show');
            }
        });
        FroalaEditor.RegisterCommand('modalSelectBlockHtml', {
            title: 'Chọn block',
            icon: 'selectBlockHtml',
            focus: true,
            undo: true,
            refreshAfterCallback: false,
            callback: () => {
                this.editor.html.insert('<div id="position_mark"></div>');
                this.$modalSelectBlock.modal('show');
            }
        });
        FroalaEditor.RegisterCommand('imageReplace', {
            title: 'Thay thế',
            focus: true,
            undo: true,
            refreshAfterCallback: false,
            callback: function () {
                setSelectResourceIsCurrentUseFor('froala');
                let img = this.image.get()[0];
                let model = setCurrentEditFile({
                    type: 'img',
                    img
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
            callback: function () {
                setSelectResourceIsCurrentUseFor('froala');
                let video = this.video.get()[0];
                let model = setCurrentEditFile({
                    type: 'video',
                    video
                });
                setFileMode('video');
                processFileType();
                $(model).modal('show');
            }
        });
        FroalaEditor.RegisterCommand('reloadPreview', {
            refreshAfterCallback: false,
            callback: () => {
                if (getWindow()) {
                    setLocalStorageData();
                    getWindow().location.reload()
                }
            }
        });

        // Define a button.
        FroalaEditor.RegisterQuickInsertButton('quickInsertButtonImage', {
            icon: 'browseImage',
            title: 'Chèn hình',
            callback: function () {
                this.html.insert('<div id="position_mark"></div>');
                setQuickInsertSetHtmlFunc(this.html.insert.bind(this));
                setSelectResourceIsCurrentUseFor('froala-quick-insert');
                let model = setCurrentEditFile(null);
                setFileMode('image');
                processFileType();
                $(model).modal('show');
            },
            undo: true
        });
        FroalaEditor.RegisterQuickInsertButton('quickInsertButtonVideo', {
            icon: 'browseVideo',
            title: 'Chèn video',
            callback: function () {
                this.html.insert('<div id="position_mark"></div>');
                setQuickInsertSetHtmlFunc(this.html.insert.bind(this));
                setSelectResourceIsCurrentUseFor('froala-quick-insert');
                let model = setCurrentEditFile(null);
                setFileMode('video');
                processFileType();
                $(model).modal('show');
            },
            undo: true
        });
        FroalaEditor.RegisterShortcut(83, 'reloadPreview', 'H1', 'H', false);
    }

    initEditor(newContent = null) {
        let oldContent = '';
        if (newContent) {
            oldContent = $('.fr-element.fr-view').html();
            if (this.editor) {
                this.editor.destroy();
                this.editor = null;
            }
        }
        let content = (oldContent ? oldContent : '') + (newContent ? newContent : '');

        this.editor = new FroalaEditor(this.$content[0], {
            language: 'vi',
            toolbarInline: false,
            height: 600,
            colorsButtons: ["colorsBack"],
            toolbarButtons: [
                "bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "fontFamily", "fontSize",
                'textColor', 'backgroundColor', "specialCharacters", "paragraphFormat", "align", "formatOL", "formatUL", "outdent", "indent",
                "insertLink", "popupBrowseImage", "popupBrowseVideo", "insertTable", "quote", "insertHR", "undo", "redo",
                "clearFormatting", "selectAll", "html",
                "popupInsertRelatedObject", "embedly",
                'modalBrowseImage', 'modalBrowseVideo', 'modalSelectBlockHtml'
            ],
            quickInsertButtons: ['quickInsertButtonImage', 'quickInsertButtonVideo'],
            imageEditButtons: ["imageDisplay", "imageAlign", "imageSize", "-", "imageRemove", 'imageReplace', 'imageCaption'],
            videoEditButtons: ["videoDisplay", "videoAlign", "videoSize", "-", "videoRemove", "videoReplace"],
            events: {
                initialized: function () {
                    this.html.set(`<div class="fr-view">${content}</div>`)
                },
                contentChanged: function () {
                    if (!window.onbeforeunload)
                        window.onbeforeunload = function () {
                            return '';
                        }
                }
            }
        });
    }

    initSelect2() {
        this.$categories.select2();

        this.$tags.select2({
            placeholder: 'Select one',
            multiple: true,
            ajax: {
                url: this.$tags.data('url'),
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

        this.$themes.select2({
            placeholder: 'Chọn chủ đề',
            ajax: {
                url: this.$themes.data('url'),
                dataType: 'json',
                delay: 250,
                method: 'POST',
                headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                data: function (params) {
                    console.log(params.term);
                    return {
                        term: params.term,
                        page: params.page,
                        type: 2
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

        this.$categories.on('select2:select', () => {
            let formGroup = this.$categories.parent();
            formGroup.find('.invalid-feedback').remove();
            this.$categories.removeClass('is-invalid');
            if (!window.onbeforeunload)
                window.onbeforeunload = function () {
                    return '';
                }
        });

        this.$tags.on('select2:select', () => {
            let formGroup = this.$tags.parent();
            formGroup.find('.invalid-feedback').remove();
            this.$tags.removeClass('is-invalid');
            if (!window.onbeforeunload)
                window.onbeforeunload = function () {
                    return '';
                }
        });

        this.$themes.on('select2:select', () => {
            let formGroup = this.$themes.parent();
            formGroup.find('.invalid-feedback').remove();
            this.$themes.removeClass('is-invalid');
            if (!window.onbeforeunload)
                window.onbeforeunload = function () {
                    return '';
                }
        });
    }

    setFileMode(value) {
        this.fileMode = value;
    }

    processFileMode() {
        switch (this.fileMode) {
            case'image': {
                $('#modal-upload-resource-input').attr('accept', 'image/png,image/jpg,image/jpeg');
                $('#modal-upload-datatable-input-file-type').find('option').toArray().forEach(option => {
                    if (parseInt($(option).attr('value')) !== 1) {
                        $(option).prop('disabled', true);
                    } else {
                        $(option).prop('disabled', false);
                        $(option).prop('selected', true);
                    }
                });
                break;
            }
            case 'video': {
                $('#modal-upload-resource-input').attr('accept', 'video/mp4,video/mkv,video/avi');
                $('#modal-upload-datatable-input-file-type').find('option').toArray().forEach(option => {
                    if (parseInt($(option).attr('value')) !== 2) {
                        $(option).prop('disabled', true);
                    } else {
                        $(option).prop('disabled', false);
                        $(option).prop('selected', true);
                    }
                });
                break;
            }
            default: {
                break;
            }
        }
    }

    setSelectResourceIsCurrentUseFor(target) {
        this.selectResourceIsCurrentUseFor = target;
    }

    setQuickInsertSetHtmlFunc(func) {
        this.quickInsertSetHtmlFunc = func;
    }

    setCurrentEditFile(file) {
        this.currentEditFile = file;
        return this.$modalSelectResource;
    }

    initGetData() {
        axios.get($('#kt_content').data('edit')).then(
            ({data}) => {
                if (data.id) {
                    let permissions = checkPermissions(['reserve-paper-update'], this.acl.permissions);

                    this.data = data;
                    this.thumb = data.thumbnail;
                    this.$title.val(data.title);
                    this.$excerpt.val(data.excerpt);
                    this.$author.val(data.author);

                    document.title = data.title + ' ' + document.title;
                    data.metas.forEach(meta => {
                        switch (meta.key) {
                            case 'google-description': {
                                this.$updateGoogleDescription.val(meta.value);
                                break;
                            }
                            case 'google-key': {
                                this.$uploadGoogleKey.val(meta.value);
                                break;
                            }
                            case 'fb-description': {
                                this.$uploadFbDescription.val(meta.value);
                                break;
                            }
                            case 'fb-title': {
                                this.$uploadFbTitle.val(meta.value);
                                break;
                            }
                            case 'off_title': {
                                parseInt(meta.value) === 2 && this.$offTitle.prop('checked', true).trigger('change');
                                break;
                            }
                            case 'off_thumb_pc': {
                                parseInt(meta.value) === 2 && this.$offThumbPc.prop('checked', true).trigger('change');
                                break;
                            }
                            case 'off_thumb_mobile': {
                                parseInt(meta.value) === 2 && this.$offThumbMobile.prop('checked', true).trigger('change');
                                break;
                            }
                            case 'off_description': {
                                parseInt(meta.value) === 2 && this.$offDescription.prop('checked', true).trigger('change');
                                break;
                            }
                        }
                    });

                    let thumb = this.dropifyThumbail.data('dropify');
                    thumb.settings.defaultFile = `${data.thumbnail.base_url}/${data.thumbnail.absolute_url}`;
                    thumb.destroy();
                    thumb.init();
                    if (data.cover_p_c) {
                        this.coverPC = data.cover_p_c;
                        let coverPC = this.dropifyCoverPC.data('dropify');
                        coverPC.settings.defaultFile = `${data.cover_p_c.base_url}/${data.cover_p_c.absolute_url}`;
                        coverPC.destroy();
                        coverPC.init();
                    }

                    if (data.cover_mobile) {
                        this.coverMobile = data.cover_mobile;
                        let coverMobile = this.dropifyCoverMobile.data('dropify');
                        coverMobile.settings.defaultFile = `${data.cover_mobile.base_url}/${data.cover_mobile.absolute_url}`;
                        coverMobile.destroy();
                        coverMobile.init();
                    }

                    $('.dropify-clear').hide();

                    this.$categories.append(new Option('TTCT- Kỳ báo', 'reserve-paper')).trigger('change');

                    let valueTag = data.tags.map(tag => {
                        let option = new Option(tag.name, tag.id);
                        this.$tags.append(option);
                        return tag.id;
                    });
                    this.$tags.val(valueTag).trigger('change');

                    let themes = data.themes;
                    let valueTheme = themes.map(theme => {
                        let option = new Option(theme.name, theme.id);
                        this.$themes.append(option);
                        return theme.id;
                    });
                    this.$themes.val(valueTheme).trigger('change');

                    if (permissions['reserve-paper-update'] && parseInt(data.status) === 1) {
                        this.$btnPublish.show();
                    }

                    this.initEditor(this.data.content);
                    setTimeout(() => {
                        hideBlock();
                    }, 500);
                } else {
                    hideBlock();
                    toastr.error('Oop, có lỗi xẩy ra');
                    this.$themes.prop('disabled', true);
                    this.$tags.prop('disabled', true);
                    this.$articlePreviewBtn.prop('disabled', true);
                    this.$btnSubmit.prop('disabled', true)
                }
            },
            err => {
                hideBlock();
                this.$btnSubmit.prop('disabled', true);
                this.$modalUploadResourceBtnUpload.remove();
                this.$articlePreviewBtn.prop('disabled', true);
                let status = err.response.status;
                if (status === 500) {
                    toastr.error(err.response.data.message);
                }
            }
        );
    }

    initSubmit() {
        this.$btnSubmit.click(event => {
            event.preventDefault();
            showBlock();
            let url = $(event.currentTarget).data('update');
            let fd = this.generateFormData();
            axios.post(url, fd).then(
                res => {
                    if (res.data && res.data.message) {
                        window.onbeforeunload = null;
                        toastr.success(res.data.message);
                        setTimeout(() => {
                            hideBlock();
                            window.location.reload();
                        }, 1000);
                    } else {
                        toastr.error('Có lỗi xảy ra, thử lại sau');
                    }
                },
                err => {
                    setTimeout(() => {
                        hideBlock();
                    }, 500);
                    let status = err.response.status;
                    if (status === 422) {
                        showError('update-', err.response.data.errors);
                    } else {
                        toastr.error(err.response.data.message)
                    }
                }
            )
        });
    }

    initPublish() {
        this.$btnPublish.click(event => {
            event.preventDefault();
            showBlock();
            let urlUpdateStatus = this.data.url_publish ? this.data.url_publish : '';
            let urlUpdate = this.$btnSubmit.data('update');
            let status = this.data.status_publish ? this.data.status_publish : 0;
            let fd = this.generateFormData();
            if (urlUpdateStatus !== '') {
                axios.post(urlUpdate, fd).then(
                    res => {
                        axios.post(urlUpdateStatus, {status}).then(
                            res => {
                                if (res.data && res.data.message) {
                                    window.onbeforeunload = null;
                                    toastr.success(res.data.message);
                                    setTimeout(() => {
                                        hideBlock();
                                        window.location.reload();
                                    }, 1000);
                                } else {
                                    toastr.error('Có lỗi xảy ra, thử lại sau');
                                }
                            },
                            err => {
                                setTimeout(() => {
                                    hideBlock();
                                }, 500);
                                let status = err.response.status;
                                if (status === 422) {
                                    showError('update-', err.response.data.errors);
                                } else {
                                    toastr.error(err.response.data.message)
                                }
                            }
                        )
                    },
                    err => {
                        setTimeout(() => {
                            hideBlock();
                        }, 500);
                        let status = err.response.status;
                        if (status === 422) {
                            showError('update-', err.response.data.errors);
                        } else {
                            toastr.error(err.response.data.message)
                        }
                    }
                );
            } else {
                toastr.error('Oop.., có lỗi xảy ra, thử lại sau');
                return false;
            }
        });
    }

    setLocalStorageData() {
        let categories = this.$categories.select2('data');
        let tags = this.$tags.select2('data');
        let a = $('.fr-element.fr-view');
        if ($(a).children('.fr-view').length > 0) {
            let b = a.children('.fr-view');
            let i = 0;
            do {
                a = b;
                b = $(a).children('.fr-view').length > 0 ? $(a).children('.fr-view') : undefined;
                i++;
            } while (b !== undefined);
        }
        let data = {
            title: this.$title.val(),
            author: this.$author.val(),
            excerpt: this.$excerpt.val(),
            google_description: this.$updateGoogleDescription.val(),
            google_key: this.$uploadGoogleKey.val(),
            fb_description: this.$uploadFbDescription.val(),
            fb_title: this.$uploadFbTitle.val(),
            content: $(a).html(),
            tags: tags.map(tag => tag.text),
            categories: categories.map(category => category.text),
        };
        localStorage.setItem('data_preview', JSON.stringify(data));
    }

    getWindow() {
        return this.window;
    }

    generateFormData() {
        let fd = new FormData();
        let tags = this.$tags.select2('data');
        let themes = this.$themes.select2('data');

        fd.append('title', this.$title.val());
        fd.append('author', this.$author.val());
        fd.append('excerpt', this.$excerpt.val());
        fd.append('google-description', this.$updateGoogleDescription.val());
        fd.append('google-key', this.$uploadGoogleKey.val());
        fd.append('fb-description', this.$uploadFbDescription.val());
        fd.append('fb-title', this.$uploadFbTitle.val());
        let a = $('.fr-element.fr-view');

        if ($(a).children('.fr-view').length > 0) {
            let b = a.children('.fr-view');
            let i = 0;
            do {
                a = b;
                b = $(a).children('.fr-view').length > 0 ? $(a).children('.fr-view') : undefined;
                i++;
            } while (b !== undefined);
        }

        fd.append('content', $(a).html());

        tags.map(tag => {
            fd.append('tags[]', tag.id)
        });


        themes.map(theme => {
            fd.append('themes[]', theme.id);
        });

        if (!this.thumb && !this.$thumbnail[0].files[0]) {
            toastr.info('Chưa nhập hình đại diện');
            hideBlock();
            return false;
        }

        if (this.thumb) {
            fd.append('thumb', this.thumb.id);
        } else if (this.$thumbnail[0].files[0]) {
            fd.append('thumbnail', this.$thumbnail[0].files[0]);
        }

        if (this.coverPC) {
            fd.append('cover_pc', this.coverPC.id)
        }

        if (this.coverMobile) {
            fd.append('cover_mobile', this.coverMobile.id)
        }

        fd.append('off_title', this.$offTitle.prop('checked') ? '2' : '1');
        fd.append('off_thumb_pc', this.$offThumbPc.prop('checked') ? '2' : '1');
        fd.append('off_thumb_mobile', this.$offThumbMobile.prop('checked') ? '2' : '1');
        fd.append('off_description', this.$offDescription.prop('checked') ? '2' : '1');

        return fd;
    }

}

$(() => {
    let reservePaperEdit = new ReservePaperEdit();
    new ArticleCreateUploadResource(reservePaperEdit);
    new ArticleCreateUpdateCreateTag(reservePaperEdit.$tags);
    new ArticleCreateUpdateCreateTheme(reservePaperEdit.$themes);
});
