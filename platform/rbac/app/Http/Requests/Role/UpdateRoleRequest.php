<?php

namespace Kuroneko\Rbac\Http\Requests\Role;

use Illuminate\Foundation\Http\FormRequest;
use Kuroneko\Rbac\Classes\Constants\RoleConstant;
use Kuroneko\Rbac\Models\Role;

class UpdateRoleRequest extends FormRequest
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
        $rule = [
            'name' => ['required', 'string'],
            'description' => ['nullable', 'string']
        ];

        if (!empty($this->request->get('name'))) {
            $name = $this->request->get('name');
            $id = $this->id;
            $role = Role::where(function ($query) use ($id, $name) {
                $query->whereNotIn('id', [$id])
                    ->where('name', $name);
                return $query;
            })->first();
            if (!empty($role)) {
                $rule['name'][] = function ($attribute, $value, $fail) {
                    $fail('Tên đã tồn tại trong hệ thống, hãy chọn tên khác');
                };
            }
        }
        return $rule;
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
