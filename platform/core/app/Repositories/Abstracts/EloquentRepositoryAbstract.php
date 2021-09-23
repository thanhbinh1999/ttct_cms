<?php
namespace Kuroneko\Core\Repositories\Abstracts;

use Illuminate\Database\Eloquent\Model;
use Kuroneko\Core\Repositories\Interfaces\EloquentRepositoryInterface;

/**
 * Class EloquentRepositoryAbstract
 * @package Kuroneko\Core\Repositories\Abstracts
 * @author Giang Nguyen
 */
abstract class EloquentRepositoryAbstract implements EloquentRepositoryInterface
{
    /**
     * @var Eloquent | Model
     */
    protected $model;

    /**
     * @var Eloquent | Model
     */
    protected $originModel;

    /**
     * EloquentRepositoryAbstract constructor.
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
        $this->originModel = $model;
    }

    /**
     * @param $model
     */
    public function setModel($model)
    {
        $this->model = $model;
    }

    /**
     * @return Eloquent|Model|mixed
     */
    public function getModel()
    {
        return $this->model;
    }

    /**
     * @return $this
     */
    protected function resetModel(): self
    {
        $this->model = new $this->originModel;
        return $this;
    }

    /**
     * @param $data
     * @return mixed
     */
    protected function applyAfterExecute($data)
    {
        $this->resetModel();
        return $data;
    }

    /**
     * @param $id
     * @param array $with
     * @param array $select
     * @return mixed | null
     */
    public function findById($id, array $with = [], array $select = ['*'])
    {
        return $this->applyAfterExecute($this->model->with($with)->select($select)->where('id', $id)->first());
    }

    /**
     * @param array $ids
     * @param array $with
     * @param array $select
     * @param null $orderBy
     * @return mixed
     */
    public function findManyById(array $ids, $with = [], $select = ['*'], $orderBy = null)
    {
        if (is_string($orderBy) || is_array($orderBy)) {
            $orderBy = $this->resolveOrder($orderBy);
            $models = $this->model->with($with)->select($select)->whereIn('id', $ids)->orderBy($orderBy['filed'], $orderBy['by'])->get();
        } else {
            $models = $this->model->with($with)->select($select)->whereIn('id', $ids)->get();
        }
        return $this->applyAfterExecute($models);
    }

    /**
     * @param $id
     * @param array $with
     * @param array $select
     * @return mixed
     */
    public function findOrFail($id, array $with = [], array $select = ['*'])
    {
        $model = $this->model->with($with)->select($select)->where('id', $id)->first();

        if (!is_null($model))
            return $this->applyAfterExecute($model);

        throw (new ModelNotFoundException)->setModel(
            get_class($this->model), $id
        );
    }

    /**
     * @return string
     */
    public function getTableName(): string
    {
        return $this->model->getTable();
    }

    /**
     * @param array $with
     * @param array $select
     * @param null $orderBy
     * @return mixed
     */
    public function all(array $with = [], array $select = ['*'], $orderBy = null)
    {
        if (is_string($orderBy) || is_array($orderBy)) {
            $orderBy = $this->resolveOrder($orderBy);
            $models = $this->model->with($with)->select($select)->orderBy($orderBy['field'], $orderBy['by'])->get();
        } else {
            $models = $this->model->with($with)->select($select)->get();
        }
        return $this->applyAfterExecute($models);
    }

    /**
     * @param array $conditions
     * @param array $with
     * @param array $select
     * @param null $orderBy
     * @return mixed
     */
    public function allBy(array $conditions = [], array $with = [], array $select = ['*'], $orderBy = null)
    {
        $this->applyConditions($conditions);
        if (is_string($orderBy) || is_array($orderBy)) {
            $orderBy = $this->resolveOrder($orderBy);
            $models = $this->model->with($with)->select($select)->orderBy($orderBy['field'], $orderBy['by'])->get();
        } else {
            $models = $this->model->with($with)->select($select)->get();
        }
        return $this->applyAfterExecute($models);
    }

    /**
     * @param array $conditions
     * @param array $with
     * @param array $select
     * @return mixed
     */
    public function firstBy(array $conditions = [], array $with = [], array $select = ['*'])
    {
        $this->applyConditions($conditions);
        return $this->applyAfterExecute($this->model->with($with)->select($select)->first());
    }

    /**
     * @param array $conditions
     * @return int
     */
    public function count(array $conditions = []): int
    {
        $this->applyConditions($conditions);
        return $this->applyAfterExecute($this->model->count());
    }

    /**
     * @param string $column
     * @param array $conditions
     * @return int|null
     */
    public function max(string $column, array $conditions = []): ?int
    {
        $this->applyConditions($conditions);
        return $this->applyAfterExecute($this->model->max($column));
    }

    /**
     * @param array $attribute
     * @return mixed|void
     */
    public function insert(array $attribute)
    {
        $class = get_class($this->model);
        return $class::create($attribute);
    }

    /**
     * @param array $attributes
     * @return mixed
     */
    public function firstOrCreate(array $attributes)
    {
        return $this->applyAfterExecute($this->model->firstOrCreate($attributes));
    }

    /**
     * @param array $attributes
     * @return mixed
     */
    public function firstOrNew(array $attributes)
    {
        return $this->applyAfterExecute($this->model->firstOrNew($attributes));
    }

    /**
     * @param array $attributes
     * @return mixed
     */
    public function updateOrCreate(array $attributes)
    {
        return $this->applyAfterExecute($this->updateOrCreate($attributes));
    }

    /**
     * @param $id
     * @param array $attributes
     * @return mixed
     */
    public function update($id, array $attributes)
    {
        $model = $this->findById($id);
        return $this->applyAfterExecute($model ? $model->update($attributes) : false);
    }

    /**
     * @param $ids
     * @param array $attributes
     * @return mixed
     */
    public function updateMany($ids, array $attributes)
    {
        $modelClass = get_class($this->model);
        return $modelClass::whereIn('id', $ids)->update($attributes);
    }

    /**
     * @param $id
     * @return mixed
     */
    public function delete($id)
    {
        $model = $this->findById($id);
        return $this->applyAfterExecute($model ? $model->delete() : false);
    }

    /**
     * @param array $ids
     * @return mixed|void
     */
    public function deleteMany(array $ids)
    {
        $modelClass = get_class($this->model);
        if ($modelClass) $modelClass::destroy($ids);
    }


    /**
     * @param array $conditions
     * @param null|Model $_model
     * 'WHERE' => [
     * ['id','>','0']
     * ]
     */
    public function applyConditions(array $conditions, Model &$_model = null)
    {
        if (!empty($conditions)) {
            if ($_model) {
                $model = $_model;
            } else {
                $model = $this->getModel();
            }

            if (isset($conditions['WHERE']) && isset($conditions['OR_WHERE'])) {
                $this->applyConditionsWithWhereAndOrWhere($conditions, $model);
            } else {
                $this->applyConditionsWithWhere($conditions, $model);
            }

            if ($_model)
                $_model = $model;
            else
                $this->setModel($model);
        }
    }

    /**
     * @param $conditions
     * @param $model
     */
    private function applyConditionsWithWhereAndOrWhere($conditions, &$model)
    {
        $where = $conditions['WHERE'];
        $orWhere = $conditions['OR_WHERE'];
        $model = $model->where(function ($query) use ($where) {
            foreach ($where as $sentence) {
                list($field, $condition, $value) = $sentence;
                $query = $query->where($field, $condition, $value);
            }
            return $query;
        });

        $model = $model->orWhere(function ($query) use ($orWhere) {
            foreach ($orWhere as $sentence) {
                list($field, $condition, $value) = $sentence;
                $query = $query->where($field, $condition, $value);
            }
            return $query;
        });
    }

    /**
     * @param $conditions
     * @param $model
     */
    private function applyConditionsWithWhere($conditions, &$model)
    {
        if (isset($conditions['WHERE'])) $where = $conditions['WHERE'];
        else if (isset($conditions['OR_WHERE'])) $where = $conditions['OR_WHERE'];
        else $where = $conditions;

        foreach ($where as $sentence) {
            list($field, $condition, $value) = $sentence;
            $condition = strtoupper($condition);
            switch ($condition) {
                case 'IN':
                {
                    $model = $model->whereIn($field, $value);
                    break;
                }
                case 'NOT_IN':
                {
                    $model = $model->whereNotIn($field, $value);
                    break;
                }
                default :
                {
                    $model = $model->where($field, $condition, $value);
                }
            }
        }
    }

    /**
     * @param $order
     * @return array
     */
    private function resolveOrder($order)
    {
        if (is_string($order)) {
            $orderField = $order;
            $orderBy = 'asc';
        } else {
            $orderField = array_key_first($order);
            $orderBy = $order[$orderField];
        }
        return [
            'field' => $orderField,
            'by' => $orderBy
        ];
    }
}
