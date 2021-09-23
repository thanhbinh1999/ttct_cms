<?php

namespace Kuroneko\Comment\Http\Requests\Sticker;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStickerRequest extends FormRequest
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
            'old_avatar_base_url' => ['required'],
            'old_avatar_path' => ['required'],
            'new_avatar' => ['nullable', 'file', 'mimes:png,jpg,jpeg'],
            'note' => ['nullable'],
            'name' => ['required'],
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
            'new_avatar' => 'nhãn dán'
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
