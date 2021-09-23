<?php

namespace Kuroneko\Comment\Http\Requests\StickerTheme;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStickerThemeRequest extends FormRequest
{
    /**
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * @return array
     */
    public function rules()
    {
        return [
            //new sticker
            'new_stickers' => ['nullable', 'array'],
            'new_stickers.*' => ['file', 'mimes:png,jpg,jpeg'],
            'new_descriptions' => ['nullable', 'array'],
            'new_descriptions.*' => ['nullable', 'string'],
            'new_names' => ['nullable', 'array'],
            'new_names.*' => ['string'],
            //old sticker
            'old_stickers' => ['nullable', 'array'],
            'old_stickers.*' => ['required', 'string'],
            'old_descriptions' => ['nullable', 'array'],
            'old_descriptions.*' => ['nullable', 'string'],
            'old_names' => ['nullable', 'array'],
            'old_names.*' => ['required', 'string'],
            'old_sticker_avatar_base_urls' => ['nullable', 'array'],
            'old_sticker_avatar_base_urls.*' => ['required', 'string'],
            'old_sticker_avatar_paths' => ['nullable', 'array'],
            'old_sticker_avatar_paths.*' => ['required', 'string'],
            //sticker old avatar
            'old_avatar_base_url' => ['required'],
            'old_avatar_path' => ['required'],
            //sticker new avatar
            'new_avatar' => ['nullable', 'file', 'mimes:png,jpg,jpeg'],

            'note' => ['nullable'],
            'name' => ['required'],
            'order' => ['required'],
        ];
    }

    /**
     * @return array
     */
    public function attributes()
    {
        return [
            'descriptions' => 'mô tả',
            'files' => 'file',
            'name' => 'tên',
            'note' => 'mô tả',
        ];
    }

    public function messages()
    {
        return [
            'required' => trans('base::validation.required'),
            'file' => trans('base::validation.file'),
            'mimes' => trans('base::validation.mimes')
        ];
    }
}
