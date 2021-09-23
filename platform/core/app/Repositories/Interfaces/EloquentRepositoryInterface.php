<?php

namespace Kuroneko\Core\Repositories\Interfaces;

/**
 * Interface EloquentRepositoryInterface
 * @package Kuroneko\Core\Repositories\Interfaces
 * @author Giang Nguyen
 */
interface EloquentRepositoryInterface
{
    /**
     * @param $model
     * @return mixed
     */
    public function setModel($model);

    /**
     * @return mixed
     */
    public function getModel();

    /**
     * Get table name
     * @return string
     */
    public function getTableName(): string;

    /**
     * Retrieve model by id
     * @param $id
     * @param array $with
     * @param array $select
     * @return mixed | null
     */
    public function findById($id, array $with = [], array $select = ['*']);

    /**
     * Retrieve many models by array id
     * @param array $ids
     * @param array $with
     * @param array $select
     * @return mixed
     */
    public function findManyById(array $ids, $with = [], $select = ['*']);

    /**
     * @param $id
     * @param array $with
     * @param array $select
     * @return mixed
     */
    public function findOrFail($id, array $with = [], array $select = ['*']);

    /**
     * @param array $with
     * @param array $select
     * @return mixed
     */
    public function all(array $with = [], array $select = ['*']);

    /**
     * @param array $conditions
     * @param array $with
     * @param array $select
     * @return mixed
     */
    public function allBy(array $conditions = [], array $with = [], array $select = ['*']);

    /**
     * @param array $conditions
     * @param array $with
     * @param array $select
     * @return mixed
     */
    public function firstBy(array $conditions = [], array $with = [], array $select = []);

    /**
     * @param array $conditions
     * @return int
     */
    public function count(array $conditions = []): int;

    /**
     * @param string $column
     * @param array $conditions
     * @return int
     */
    public function max(string $column, array $conditions = []): ?int;

    /**
     * @param array $attributes
     * @return mixed
     */
    public function insert(array $attributes);

    /**
     * @param array $attributes
     * @return mixed
     */
    public function firstOrCreate(array $attributes);

    /**
     * @param array $attributes
     * @return mixed
     */
    public function firstOrNew(array $attributes);

    /**
     * @param array $attributes
     * @return mixed
     */
    public function updateOrCreate(array $attributes);

    /**
     * @param $id
     * @param array $attributes
     * @return mixed
     */
    public function update($id, array $attributes);

    /**
     * @param $id
     * @return mixed
     */
    public function delete($id);

    /**
     * @param array $ids
     * @return mixed
     */
    public function deleteMany(array $ids);
}
