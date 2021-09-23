<?php


namespace Kuroneko\User\Http\Request;


use Illuminate\Foundation\Http\FormRequest;

class UpdateProfileRequest extends FormRequest
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
            'first_name' => ['nullable', 'string'],
            'last_name' => ['required', 'string'],
            'email' => ['required', 'string', 'email'],
            'dob' => ['nullable', 'string'],
            'phone' => ['nullable', 'string'],
            'address' => ['nullable', 'string'],
            'gender' => ['nullable'],
            'avatar' => ['nullable', 'file', 'mimes:png,jpg,jpeg']
        ];
    }

    /**
     * @return array
     */
    public function attributes()
    {
        return [
            'first_name' => 'họ & tên đệm',
            'last_name' => 'tên',
            'email' => 'email',
            'dob' => 'ngày sinh',
            'phone' => 'sđt',
            'address' => 'địa chỉ',
            'gender' => 'giới tính',
            'avatar' => 'avatar'
        ];
    }

    /**
     * @return array
     */
    public function messages()
    {
        return [
            'required' => trans('base::validation.required'),
            'array' => trans('base::validation.array'),
            'exists' => trans('base::validation.exists'),
            'file' => trans('base::validation.file'),
            'mimes' => trans('base::validation.mimes'),
            'email' => trans('base::validation.email'),
            'string' => trans('base::validation.string'),
            'confirmed' => trans('base::validation.confirmed'),
        ];
    }

    public function validated()
    {
        $validated = parent::validated();
        $validated['dob'] = empty($validated['dob']) ? null : date('Y-m.d', strtotime(str_replace('/', '-', $validated['dob'])));
        return $validated;
    }
}
