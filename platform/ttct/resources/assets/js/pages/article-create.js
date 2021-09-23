import axios from 'axios';
import {showError, showBlock, hideBlock} from './helper';
import ArticleCreateUploadResource from './article-create-upload-resource';
import ArticleCreateUpdateCreateTag from './article-create-update-create-tag';
import ArticleCreateUpdateCreateTheme from './article-create-update-create-theme';
import {block} from './block'

/**
 * @author        Giang Nguyen
 * @description Class ArticleCreate
 */
class ArticleCreate {
    constructor() {
        // input
        this.$thumbnail = $('#create-thumbnail');
        this.$coverPC = $('#create-cover-pc');
        this.$coverMobile = $('#create-cover-mobile');
        this.$categories = $('#create-categories');
        this.$tags = $('#create-tags');
        this.$title = $('#create-title');
        this.$excerpt = $('#create-excerpt');
        this.$content = $('#create-content');
        this.$author = $('#create-author');
        this.$createGoogleDescription = $('#create-google-description');
        this.$createGoogleKey = $('#create-google-key');
        this.$createFbDescription = $('#create-fb-description');
        this.$createFbTitle = $('#create-fb-title');
        this.$createTheme = $('#create-themes');
        this.$createPriority = $('#create-priority');
        this.$createPublishedAt = $('#create-published_at');
        this.$offTitle = $('#off_title');
        this.$offThumbPc = $('#off_thumb_pc');
        this.$offThumbMobile = $('#off_thumb_mobile');
        this.$offDescription = $('#off_description');

        //select image
        this.$selectThumbnail = $('#select-thumbnail');
        this.$selectCoverPc = $('#select-cover-pc');
        this.$selectCoverMobile = $('#select-cover-mobile');

        this.$selectResources = $('#select-resources');
        this.$articlePreviewBtn = $('#article-preview');
        //
        this.$modalSelectBlock = $('#modal-select-block');
        this.$modalSelectResource = $('#modal-select-resource');
        this.$btnSubmit = $('#btn-submit');
        this.$modalUploadResourceBtnUpload = $('#modal-upload-resource-btn-upload');

        //
        this.$selectBlock = $('#select-block');
        this.selectResourceIsCurrentUseFor = null;
        this.fileMode = null;
        this.editor = null;
        this.html = '';
        this.files = [];
        this.currentEditFile = null;
        this.dropifyThumbnail = null;
        this.dropifyCoverPC = null;
        this.dropifyCoverMobile = null;
        this.thumb = null;
        this.coverPC = null;
        this.coverMobile = null;
        this.quickInsertSetHtmlFunc = null;

        this.init();
    }

    init() {
        this.initFroalaEditor();
        this.initDropify();
        this.initSelectImage();
        this.initSelect2();
        this.initSubmit();
        this.initEditor();
        this.initSelectBlock();
        this.initPreventReload();
        this.initSelectResource();
        this.initPreview();
        this.initPickDate();
    }

    initPickDate() {
        this.$createPublishedAt.datetimepicker({
            todayHighlight: true,
            orientation: "bottom left",
            autoclose: true,
            format: 'dd/mm/yyyy hh:ii',
            startDate: new Date(),
            templates: {
                leftArrow: '<i class="la la-angle-left"></i>',
                rightArrow: '<i class="la la-angle-right"></i>'
            }
        });
    }

    initSelectImage() {
        this.$selectThumbnail.click(event => {
            event.preventDefault();
            this.fileMode = 'image';
            this.selectResourceIsCurrentUseFor = 'thumbnail';
        });
        this.$selectCoverPc.click(event => {
            event.preventDefault();
            this.fileMode = 'image';
            this.selectResourceIsCurrentUseFor = 'cover-pc';
        });

        this.$selectCoverMobile.click(event => {
            event.preventDefault();
            this.fileMode = 'image';
            this.selectResourceIsCurrentUseFor = 'cover-mobile';
        });
    }

    initSelectResource() {
        this.$selectResources.click(event => {
            event.preventDefault();
            this.fileMode = 'image';
            this.selectResourceIsCurrentUseFor = 'resources';
        });
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

        this.$createGoogleKey.on('keyup change', () => {
            if (!window.onbeforeunload)
                window.onbeforeunload = function () {
                    return '';
                }
        });

        this.$createGoogleDescription.on('keyup change', () => {
            if (!window.onbeforeunload)
                window.onbeforeunload = function () {
                    return '';
                }
        });

        this.$createFbTitle.on('keyup change', () => {
            if (!window.onbeforeunload)
                window.onbeforeunload = function () {
                    return '';
                }
        });

        this.$createFbDescription.on('keyup change', () => {
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

    initFroalaEditor() {
        let setCurrentEditFile = this.setCurrentEditFile.bind(this);
        let setFileMode = this.setFileMode.bind(this);
        let processFileType = this.processFileMode.bind(this);
        let setSelectResourceIsCurrentUseFor = this.setSelectResourceIsCurrentUseFor.bind(this);
        let setQuickInsertSetHtmlFunc = this.setQuickInsertSetHtmlFunc.bind(this);

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
        // Define a button.
        FroalaEditor.RegisterQuickInsertButton('quickInsertButtonImage', {
            icon: 'browseImage',
            title: 'Chèn hình asdas',
            callback: () => {
                this.editor.html.insert('<div id="position_mark"></div>');
                setQuickInsertSetHtmlFunc(this.editor.html.insert.bind(this.editor));
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

    }

    initEditor(newContent = null) {
        let oldContent = '';
        if (newContent) {
            oldContent = $('.fr-element.fr-view').html();
            this.editor.destroy();
            this.editor = null;
        }
        let content = (oldContent ? oldContent : '') + (newContent ? newContent : '');

        this.editor = new FroalaEditor('#example', {
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

    setCurrentEditFile(file) {
        this.currentEditFile = file;
        return this.$modalSelectResource;
    }

    initSubmit() {
        this.$btnSubmit.click(event => {
            event.preventDefault();
            showBlock();
            let url = $(event.currentTarget).data('url');

            if (!this.thumb && !this.$thumbnail[0].files[0]) {
                toastr.info('Chưa nhập hình đại diện');
                hideBlock();
                return false;
            }

            if (this.$categories.select2('data').length === 0) {
                toastr.info('Chưa nhập chuyên mục');
                hideBlock();
                return false;
            }

            let fd = this.generateFormData();


            if (this.$categories.select2('data')[0].id === 'reserve-paper') {
                url = this.$categories.data('store');
            }

            axios.post(url, fd).then(
                res => {
                    if (res.data && res.data.message) {
                        window.onbeforeunload = null;
                        toastr.success(res.data.message);
                        setTimeout(() => {
                            window.location.href = (this.$categories.select2('data').length > 0 && this.$categories.select2('data')[0].id === 'reserve-paper') ? this.$categories.data('reload') : this.$btnSubmit.data('reload')
                        }, 1000)
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
                        showError('create-', err.response.data.errors);
                    } else {
                        toastr.error(err.response.data.message)
                    }
                }
            )
        });
    }

    generateFormData() {
        let fd = new FormData();
        let categories = this.$categories.select2('data');
        let tags = this.$tags.select2('data');
        let themes = this.$createTheme.select2('data');

        fd.append('title', this.$title.val());
        fd.append('author', this.$author.val());
        fd.append('excerpt', this.$excerpt.val());
        fd.append('published_at', this.$createPublishedAt.val());
        fd.append('google-description', this.$createGoogleDescription.val());
        fd.append('google-key', this.$createGoogleKey.val());
        fd.append('fb-description', this.$createFbDescription.val());
        fd.append('fb-title', this.$createFbTitle.val());

        if (this.$createPriority.length > 0)
            fd.append('priority', this.$createPriority.val());
        else {
            fd.append('priority', 0);
        }

        let content = $('.fr-element.fr-view');
        if (content.children('.fr-view').length > 0) {
            let tmp = content.children('.fr-view');
            let i = 0;
            do {
                content = tmp;
                tmp = $(content).children('.fr-view').length > 0 ? $(content.children('.fr-view')) : undefined;
                i++;
            } while (tmp !== undefined);
        }

        fd.append('content', $(content).html());
        fd.append('creator_id', this.$modalUploadResourceBtnUpload.data('creator-id'));
        fd.append('creator_full_name', this.$modalUploadResourceBtnUpload.data('creator-full-name'));
        fd.append('creator_username', this.$modalUploadResourceBtnUpload.data('creator-username'));

        tags.map(tag => {
            fd.append('tags[]', tag.id)
        });

        categories.map(category => {
            fd.append('categories[]', category.id);
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

    initDropify() {
        this.dropifyThumbnail = this.$thumbnail.dropify({
            messages: {
                'default': 'Chọn hình đại diện',
                'replace': 'Kéo và thả hoặc click để thay thế',
                'remove': 'Xóa',
                'error': 'Ooops, có lỗi bất ngờ xảy ra.'
            }
        });

        this.dropifyCoverPC = this.$coverPC.dropify({
            messages: {
                'default': 'Chọn hình cover cho PC',
                'replace': 'Kéo và thả hoặc click để thay thế',
                'remove': 'Xóa',
                'error': 'Ooops, có lỗi bất ngờ xảy ra.'
            }
        });

        this.dropifyCoverMobile = this.$coverMobile.dropify({
            messages: {
                'default': 'Chọn hình cover cho Moble',
                'replace': 'Kéo và thả hoặc click để thay thế',
                'remove': 'Xóa',
                'error': 'Ooops, có lỗi bất ngờ xảy ra.'
            }
        });

        this.$thumbnail.click(event => {
            event.preventDefault();
            this.$selectThumbnail.click();
        });
        this.$coverPC.click(event => {
            event.preventDefault();
            this.$selectCoverPc.click();
        });
        this.$coverMobile.click(event => {
            event.preventDefault();
            this.$selectCoverMobile.click();
        });
    }

    setImageDropify(img, type) {
        switch (type) {
            case 'thumbnail': {
                let thumb = this.dropifyThumbnail.data('dropify');
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

    initSelect2() {
        this.$categories.select2({
            placeholder: 'Chọn chuyên mục',
            ajax: {
                url: this.$categories.data('url'),
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
                    let tmpData = {...data};
                    if (this.$categories.data('reserve-paper') !== undefined)
                        tmpData.data.push({
                            name: 'TTCT - Kỳ báo',
                            id: 'reserve-paper'
                        });
                    return {
                        results: $.map(tmpData.data, function (item) {
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

        this.$tags.select2({
            placeholder: 'Chọn từ khóa',
            multiple: true,
            ajax: {
                url: this.$tags.data('url'),
                dataType: 'json',
                delay: 250,
                method: 'POST',
                headers: {'X-CSRF-TOKEN': $('meta[name=csrf-token]').attr('content')},
                data: function (params) {
                    console.log(params.term);
                    return {
                        term: params.term,
                        page: params.page,
                        type: 1
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

        this.$createTheme.select2({
            placeholder: 'Chọn chủ đề',
            ajax: {
                url: this.$tags.data('url'),
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

            let data = this.$categories.select2('data');
            if (data.length > 0 && data[0].id === 'reserve-paper') {
                this.$createPublishedAt.val('').prop('disabled', true);
                this.$createPriority.prop('disabled', true);
            } else {
                this.$createPublishedAt.prop('disabled', false);
                this.$createPriority.prop('disabled', false);
            }

            if (!window.onbeforeunload)
                window.onbeforeunload = function () {
                    return '';
                }
        });

        this.$tags.on('select2:select', () => {
            let formGroup = this.$tags.parent();
            formGroup.find('.invalid-feedback').remove();
            this.$tags.removeClass('is-invalid');

            if (this.$createTheme.select2('data').length > 0) {
                if (!window.onbeforeunload)
                    window.onbeforeunload = function () {
                        return '';
                    }
            } else {
                window.onbeforeunload = null;
            }
        });

        this.$createTheme.on('select2:select', () => {
            let formGroup = this.$createTheme.parent();
            formGroup.find('.invalid-feedback').remove();
            this.$createTheme.removeClass('is-invalid');

            if (this.$createTheme.select2('data').length > 0) {
                if (!window.onbeforeunload)
                    window.onbeforeunload = function () {
                        return '';
                    }
            } else {
                window.onbeforeunload = null;
            }
        });
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

    setFileMode(value) {
        this.fileMode = value;
    }

    setSelectResourceIsCurrentUseFor(target) {
        this.selectResourceIsCurrentUseFor = target;
    }

    setQuickInsertSetHtmlFunc(func) {
        this.quickInsertSetHtmlFunc = func;
    }

    setLocalStorageData() {
        let categories = this.$categories.select2('data');
        let tags = this.$tags.select2('data');
        let a = $('.fr-element.fr-view');
        if (a.children('.fr-view').length > 0) {
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
            google_description: this.$createGoogleDescription.val(),
            google_key: this.$createGoogleKey.val(),
            fb_description: this.$createFbDescription.val(),
            fb_title: this.$createFbTitle.val(),
            content: $(a).html(),
            tags: tags.map(tag => tag.text),
            categories: categories.map(category => category.text),
        };
        localStorage.setItem('data_preview', JSON.stringify(data));
    }

    getWindow() {
        return this.window;
    }

}

$(() => {
    let articleCreate = new ArticleCreate();
    new ArticleCreateUploadResource(articleCreate);
    new ArticleCreateUpdateCreateTag(articleCreate.$tags);
    new ArticleCreateUpdateCreateTheme(articleCreate.$createTheme);
});
