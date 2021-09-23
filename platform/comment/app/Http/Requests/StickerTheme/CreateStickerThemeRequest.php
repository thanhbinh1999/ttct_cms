<?php

namespace Kuroneko\Comment\Http\Requests\StickerTheme;

use Illuminate\Foundation\Http\FormRequest;

class CreateStickerThemeRequest extends FormRequest
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
            'files' => ['required', 'array'],
            'files.*' => ['file', 'mimes:png,jpg,jpeg'],
            'descriptions' => ['required', 'array'],
            'descriptions.*' => ['nullable', 'string'],
            'names' => ['required', 'array'],
            'names.*' => ['nullable', 'string'],
            'name' => ['required', 'string'],
            'note' => ['nullable'],
            'avatar' => ['required', 'file', 'mimes:png,jpg,jpeg'],
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
