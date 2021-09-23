<?php

namespace Kuroneko\Comment\Http\Requests\Sticker;

use Illuminate\Foundation\Http\FormRequest;

class CreateStickerRequest extends FormRequest
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
            'avatar' => ['required', 'file', 'mimes:png,jpg,jpeg'],
            'sticker-theme' => ['nullable'],
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
            'avatar' => 'nhãn dán',
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
