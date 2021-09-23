<?php

namespace Kuroneko\Comment\Http\Requests\BlackKey;

use Illuminate\Foundation\Http\FormRequest;

class CreateBlackKeyRequest extends FormRequest
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
            'key' => ['required', 'string'],
        ];
    }

    /**
     * @return array
     */
    public function attributes()
    {
        return [
            'key' => 'key',
        ];
    }

    public function messages()
    {
        return [
            'required' => trans('base::validation.required'),
            'string' => trans('base::validation.string')
        ];
    }
}
