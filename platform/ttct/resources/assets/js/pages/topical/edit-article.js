import {hideBlock, showBlock, showError} from "../helper";
import axios from "axios";
import ArticleCreateUploadResource from '../article-create-upload-resource'

class EditArticle {
    constructor() {
        this.data = null;
        this.$thumbnail = $('#update-thumbnail');
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

        this.$selectThumbnail = $('#select-thumbnail');
        this.$modalUploadResourceBtnUpload = $('#modal-upload-resource-btn-upload');

        //
        this.$modalSelectTemplate = $('#modal-select-template');
        this.$modalSelectResource = $('#modal-select-resource');
        this.$btnSubmit = $('#btn-submit');

        //
        this.$articlePreviewBtn = $('#article-preview');

        this.selectResourceIsCurrentUseFor = null;
        this.fileMode = null;
        this.editor = null;
        this.html = '';
        this.files = [];
        this.currentEditFile = null;
        this.dropify = null;
        this.thumb = null;
        this.quickInsertSetHtmlFunc = null;

        this.window = null;
        this.timeOut = null;

        this.init();
    }

    init() {
        showBlock();
        this.initFroalaEditor();
        this.initSelect2();
        this.dropify = this.$thumbnail.dropify({height: 300});
        this.$selectThumbnail.click(event => {
            event.preventDefault();
            this.fileMode = 'image';
            this.selectResourceIsCurrentUseFor = 'thumbnail';
        });
        this.initGetData();
        this.initSubmit();
        this.$articlePreviewBtn.click(event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('preview');
            this.setLocalStorageData();
            if (this.window) {
                this.window.location.reload();
            } else {
                this.window = window.open(url, '_blank', "location=yes,height=1000,width=1000,scrollbars=yes,status=yes");
                this.window.onbeforeunload = function () {
                    localStorage.removeItem('data_preview');
                }
            }
        });

    }

    setImageDropify(img) {
        let dropify = this.dropify.data('dropify');
        dropify.settings.defaultFile = img.base_url + '/' + img.absolute_url;
        dropify.destroy();
        dropify.init();
        this.thumb = img;
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

    initSelect2() {
        this.$categories.select2({
            placeholder: 'Select one',
            ajax: {
                url: this.$categories.data('url'),
                dataType: 'json',
                delay: 250,
                method: 'POST',
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


        this.$tags.select2({
            placeholder: 'Select one',
            multiple: true,
            ajax: {
                url: this.$tags.data('url'),
                dataType: 'json',
                delay: 250,
                method: 'POST',
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

    setFileMode(value) {
        this.fileMode = value;
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
                this.data = data;
                this.thumb = data.thumbnail;
                this.$title.val(data.title);
                document.title = data.title + " " + document.title;
                this.$excerpt.val(data.excerpt);
                this.$author.val(data.author);
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
                    }
                });

                let dropify = this.dropify.data('dropify');
                dropify.settings.defaultFile = `${data.thumbnail.base_url}/${data.thumbnail.absolute_url}`;
                dropify.destroy();
                dropify.init();
                $('.dropify-clear').hide();
                this.$thumbnail.change(() => {
                    $('.dropify-clear').show();
                    this.thumb = null;
                });

                let categories = data.categories;
                let valueCa = categories.map(item => {
                    let option = new Option(item.name, item.id);
                    this.$categories.append(option);
                    return item.id;
                });
                this.$categories.val(valueCa).trigger('change');
                this.$categories.prop('disabled', true);


                let valueTag = data.tags.map(tag => {
                    let option = new Option(tag.name, tag.id);
                    this.$tags.append(option);
                    return tag.id;
                });

                this.$tags.val(valueTag).trigger('change');
                this.initEditor(this.data.content);
                setTimeout(() => {
                    hideBlock();
                }, 500);

            },
            err => {

            }
        );
    }

    initSubmit() {
        this.$btnSubmit.click(event => {
            event.preventDefault();
            let url = $(event.currentTarget).data('update');
            let fd = new FormData();
            let categories = this.$categories.select2('data');
            let tags = this.$tags.select2('data');

            fd.append('title', this.$title.val());
            fd.append('author', this.$author.val());
            fd.append('excerpt', this.$excerpt.val());
            fd.append('google-description', this.$updateGoogleDescription.val());
            fd.append('google-key', this.$uploadGoogleKey.val());
            fd.append('fb-description', this.$uploadFbDescription.val());
            fd.append('fb-title', this.$uploadFbTitle.val());
            fd.append('content', $('.fr-element.fr-view').html());

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
                        // setTimeout(() => {
                        //     window.location.reload();
                        // }, 1000)
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

    setLocalStorageData() {
        let categories = this.$categories.select2('data');
        let tags = this.$tags.select2('data');
        let data = {
            title: this.$title.val(),
            author: this.$author.val(),
            excerpt: this.$excerpt.val(),
            google_description: this.$updateGoogleDescription.val(),
            google_key: this.$uploadGoogleKey.val(),
            fb_description: this.$uploadFbDescription.val(),
            fb_title: this.$uploadFbTitle.val(),
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
    let editArticle = new EditArticle();
    new ArticleCreateUploadResource(editArticle);
});
