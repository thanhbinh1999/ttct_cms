<?php

namespace Kuroneko\Rbac\Http\Requests\Permission;

use Illuminate\Foundation\Http\FormRequest;
use Kuroneko\Rbac\Classes\Constants\PermissionConstant;
use Kuroneko\Rbac\Models\Permission;

class UpdatePermissionRequest extends FormRequest
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

        if ($this->request->has('name')) {
            $id = $this->id;
            $name = $this->request->get('name');
            $permission = Permission::where(function ($query) use ($id, $name) {
                $query->whereNotIn('id', [$id])
                    ->where('name', $name);
                return $query;
            })->first();
            if (!empty($permission)) {
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
        $validated['status'] = PermissionConstant::PERMISSION_STATUS_ACTIVE;
        return $validated;
    }
}
