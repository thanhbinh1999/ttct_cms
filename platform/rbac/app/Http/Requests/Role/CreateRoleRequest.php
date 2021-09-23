<?php

namespace Kuroneko\Rbac\Http\Requests\Role;

use Illuminate\Foundation\Http\FormRequest;
use Kuroneko\Rbac\Classes\Constants\RoleConstant;

class CreateRoleRequest extends FormRequest
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
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string']
        ];
    }

    /**
     * @return array
     */
    public function attributes()
    {
        return [
            'name' => 'tên',
            'excerpt' => 'mô tả',
        ];
    }

    /**
     * @return array
     */
    public function messages()
    {
        return [
            'required' => trans('base::validation.required'),
            'string' => trans('base::validation.string'),
        ];
    }

    /**
     * @return array
     */
    public function validated()
    {
        $validated = parent::validated();
        $validated['slug'] = \Str::slug($validated['name']);
        $validated['status'] = RoleConstant::ROLE_STATUS_ACTIVE;
        return $validated;
    }
}
