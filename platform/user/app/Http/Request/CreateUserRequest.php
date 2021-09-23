<?php


namespace Kuroneko\User\Http\Request;


use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;

class CreateUserRequest extends FormRequest
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
            'username' => ['required', 'string'],
            'dob' => ['nullable', 'string'],
            'phone' => ['nullable', 'string'],
            'address' => ['nullable', 'string'],
            'gender' => ['nullable'],
            'role' => ['required', 'exists:roles,id'],
            'password' => ['required', 'confirmed'],
            'password_confirmation' => ['required'],
            'avatar' => ['required', 'file', 'mimes:png,jpg,jpeg']
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
            'username' => 'tên đăng nhập',
            'dob' => 'ngày sinh',
            'phone' => 'sđt',
            'address' => 'địa chỉ',
            'gender' => 'giới tính',
            'role' => 'vai trò',
            'password' => 'mật khẩu',
            'password_confirmation' => 'nhập lại mật khẩu',
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
        unset($validated['password_confirmation']);
        if (!empty($validated['dob'])) {
            $validated['dob'] = Carbon::parse(str_replace('/', '-', $validated['dob']))->toDateString();
        }
        return $validated;
    }
}
