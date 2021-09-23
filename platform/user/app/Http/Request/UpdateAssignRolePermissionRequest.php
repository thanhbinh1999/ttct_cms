<?php

namespace Kuroneko\User\Http\Request;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAssignRolePermissionRequest extends FormRequest
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
            'role' => ['required', 'exists:roles,id'],
            'permissions' => ['nullable', 'array']
        ];
    }

    /**
     * @return array
     */
    public function attributes()
    {
        return [
            'role' => 'tên',
            'permissions' => 'mô tả',
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
        ];
    }

    public function validated()
    {
        $validated = parent::validated();
        if (empty($validated['permissions'])) {
            $validated['permissions'] = [];
        }
        return $validated;
    }
}
