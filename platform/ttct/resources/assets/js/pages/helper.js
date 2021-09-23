/**
 * @author        Giang Nguyen
 */
export const showBlock = ($el) => {
    let themeBlock = $el ? $el : $('body');
    themeBlock.css({'overflow-y': 'hidden'});
    themeBlock.block({
        overlayCSS: {
            backgroundColor: '#1b2024',
            opacity: 0.8,
            zIndex: 9999999,
            cursor: 'wait',
            overflow: 'hidden',
        },
        css: {
            border: 0,
            color: '#fff',
            padding: 0,
            zIndex: 9999999,
            backgroundColor: 'transparent',
            overflow: 'hidden',
        },
        message: null
    });
};

export const hideBlock = ($el) => {
    let themeBlock = $el ? $el : $('body');
    themeBlock.removeAttr('style');
    themeBlock.unblock();
};

export const showError = (prefix, errors) => {
    Object.keys(errors).forEach(key => {
        if (key === 'tags.0') {
            let input = $(`#${prefix}tags`);
            let formGroup = input.parent();
            formGroup.find('.invalid-feedback').remove();
            input.addClass('is-invalid');
            formGroup.append(`<div class="invalid-feedback">${errors[key]}</div>`);

            input.focus(event => {
                formGroup.find('.invalid-feedback').remove();
                input.removeClass('is-invalid');
            });
        } else {
            let input = $(`#${prefix}${key}`);
            let formGroup = input.parent();
            formGroup.find('.invalid-feedback').remove();
            input.addClass('is-invalid');
            formGroup.append(`<div class="invalid-feedback">${errors[key]}</div>`);

            input.focus(event => {
                formGroup.find('.invalid-feedback').remove();
                input.removeClass('is-invalid');
            });
        }
    })
};

export const removeError = inputs => {
    if (Array.isArray(inputs)) {
        inputs.forEach(input => {
            let formGroup = $(input).parent();
            formGroup.find('.invalid-feedback').remove();
            $(input).removeClass('is-invalid');
        })
    } else {
        let formGroup = $(inputs).parent();
        formGroup.find('.invalid-feedback').remove();
        $(inputs).removeClass('is-invalid');
    }
};

export const checkPermissions = (needed, permissions) => {
    if (Array.isArray(needed)) {
        let checks = [];
        for (let i = 0; i < needed.length; i++) {
            let check = false;
            for (let j = 0; j < permissions.length; j++) {
                if (permissions[j].name == needed[i]) {
                    check = true;
                    break;
                }
            }
            checks[needed[i]] = check;
        }
        return checks;
    } else {
        let check = false;
        for (let i = 0; i < permissions.length; i++) {
            if (permissions[i] == needed) {
                check = true;
                break;
            }
        }
        return check;
    }
};
