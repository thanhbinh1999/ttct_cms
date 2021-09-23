import axios from "axios";
import {showError} from "../helper";
import ArticleCreateUploadResource from '../article-create-upload-resource'

class CreateArticle {
    constructor() {
        this.$thumbnail = $('#create-thumbnail');
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

        this.$selectThumbnail = $('#select-thumbnail');
        this.$selectResources = $('#select-resources');
        this.$articlePreviewBtn = $('#article-preview');
        //
        this.$modalSelectTemplate = $('#modal-select-template');
        this.$modalSelectResource = $('#modal-select-resource');
        this.$btnSubmit = $('#btn-submit');
        this.$modalUploadResourceBtnUpload = $('#modal-upload-resource-btn-upload');

        this.selectResourceIsCurrentUseFor = null;
        this.fileMode = null;
        this.editor = null;
        this.html = '';
        this.files = [];
        this.currentEditFile = null;
        this.dropify = null;
        this.thumb = null;
        this.quickInsertSetHtmlFunc = null;

        this.init();
    }

    init() {
        this.initFroalaEditor();
        this.initDropify();
        this.initSelect2();
        this.initSubmit();
        this.initEditor();

        this.$selectThumbnail.click(event => {
            event.preventDefault();
            this.fileMode = 'image';
            this.selectResourceIsCurrentUseFor = 'thumbnail';
        });

        this.$selectResources.click(event => {
            event.preventDefault();
            this.fileMode = 'image';
            this.selectResourceIsCurrentUseFor = 'resources';
        });

        this.$articlePreviewBtn.click(event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('preview');
            this.setLocalStorageData();
            if (this.window) {
                this.window.location.reload();
            } else {
                this.window = window.open(url, '_blank', "location=yes,height=1000,width=1000,scrollbars=yes,status=yes");
                this.window.onbeforeunload = () => {
                    this.window = null;
                    localStorage.removeItem('data_preview');
                }
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
        FroalaEditor.DefineIcon('selectTemplate', {ICON: 'flaticon2-download-2', template: 'flat-icon'});

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
            title: 'Chọn template',
            icon: 'selectTemplate',
            focus: true,
            undo: true,
            refreshAfterCallback: false,
            callback: () => {
                this.$modalSelectTemplate.modal('show');
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
            height: 700,
            colorsButtons: ["colorsBack"],
            toolbarButtons: [
                "bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "fontFamily", "fontSize",
                'textColor', 'backgroundColor', "specialCharacters", "paragraphFormat", "align", "formatOL", "formatUL", "outdent", "indent",
                "insertLink", "popupBrowseImage", "popupBrowseVideo", "insertTable", "quote", "insertHR", "undo", "redo",
                "clearFormatting", "selectAll", "html",
                "popupInsertRelatedObject", "embedly",
                'modalBrowseImage', 'modalBrowseVideo', 'modalSelectTemplate'
            ],
            quickInsertButtons: ['quickInsertButtonImage', 'quickInsertButtonVideo'],
            imageEditButtons: ["imageDisplay", "imageAlign", "imageSize", "-", "imageRemove", 'imageReplace', 'imageCaption'],
            videoEditButtons: ["videoDisplay", "videoAlign", "videoSize", "-", "videoRemove", "videoReplace"],
            events: {
                initialized: function () {
                    this.html.set(`<div class="fr-view">${content}</div>`)
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
            let url = $(event.currentTarget).data('url');
            let fd = new FormData();
            let categories = this.$categories.select2('data');
            let tags = this.$tags.select2('data');
            this.$createGoogleKey = $('#create-google-key');
            this.$createFbDescription = $('#create-fb-description');
            this.$createFbTitle = $('#create-fb-title');

            fd.append('title', this.$title.val());
            fd.append('author', this.$author.val());
            fd.append('excerpt', this.$excerpt.val());
            fd.append('google-description', this.$createGoogleDescription.val());
            fd.append('google-key', this.$createGoogleKey.val());
            fd.append('fb-description', this.$createFbDescription.val());
            fd.append('fb-title', this.$createFbTitle.val());
            fd.append('content', $('.fr-element.fr-view').html());
            fd.append('creator_id', this.$modalUploadResourceBtnUpload.data('creator-id'));
            fd.append('creator_full_name', this.$modalUploadResourceBtnUpload.data('creator-full-name'));
            fd.append('creator_username', this.$modalUploadResourceBtnUpload.data('creator-username'));
            fd.append('type',2);

            tags.map(tag => {
                fd.append('tags[]', tag.id)
            });

            categories.map(category => {
                fd.append('categories[]', category.id);
            });

            if (this.thumb) {
                fd.append('thumb', this.thumb.id);
            } else if (this.$thumbnail[0].files[0]) {
                fd.append('thumbnail', this.$thumbnail[0].files[0]);
            }

            axios.post(url, fd).then(
                res => {
                    if (res.data && res.data.message) {
                        toastr.success(res.data.message);
                        setTimeout(() => {
                            // window.location.reload();
                        }, 1000)
                    } else {
                        toastr.error('Có lỗi xảy ra, thử lại sau');
                    }
                },
                err => {
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

    initDropify() {
        this.dropify = this.$thumbnail.dropify({
            messages: {
                'default': 'Kéo và thả tệp vào đây hoặc click',
                'replace': 'Kéo và thả hoặc click để thay thế',
                'remove': 'Xóa',
                'error': 'Ooops, có lỗi bất ngờ xảy ra.'
            }
        });
        this.$thumbnail.change(() => {
            $('.dropify-clear').show();
            this.thumb = null;
        })
    }

    setImageDropify(img) {
        let dropify = this.dropify.data('dropify');
        dropify.settings.defaultFile = img.base_url + '/' + img.absolute_url;
        dropify.destroy();
        dropify.init();
        this.thumb = img;
        $('.dropify-clear').hide();
    }

    initSelect2() {
        let urlGetTopical = this.$categories.data('url');

        axios.get(urlGetTopical).then(
            ({data}) => {
                this.$categories.append(`<option value="${data.id}">${data.name}</option>`);
                this.$categories.select2();
                this.$categories.prop('disabled', true)
            },
            err => {

            }
        );


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
                    console.log(params.term);
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

        this.$categories.on('select2:select', () => {
            let formGroup = this.$categories.parent();
            formGroup.find('.invalid-feedback').remove();
            this.$categories.removeClass('is-invalid');
        });

        this.$tags.on('select2:select', () => {
            let formGroup = this.$tags.parent();
            formGroup.find('.invalid-feedback').remove();
            this.$tags.removeClass('is-invalid');
        });
    }

    processFileMode() {
        switch (this.fileMode) {
            case'image': {
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
        let data = {
            title: this.$title.val(),
            author: this.$author.val(),
            excerpt: this.$excerpt.val(),
            google_description: this.$createGoogleDescription.val(),
            google_key: this.$createGoogleKey.val(),
            fb_description: this.$createFbDescription.val(),
            fb_title: this.$createFbTitle.val(),
            content: $('.fr-element.fr-view').html(),
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
    let createArticle = new CreateArticle();
    new ArticleCreateUploadResource(createArticle);
});
