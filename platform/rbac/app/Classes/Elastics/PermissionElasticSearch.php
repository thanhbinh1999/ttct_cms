<?php

namespace Kuroneko\Rbac\Classes\Elastics;

use Kuroneko\ElasticSearch\Abstracts\BaseElasticSearchAbstract;

/**
 * Class PermissionElasticSearch
 * @package Kuroneko\Rbac\Classes\Elastics
 * @author Giang Nguyen - 黒猫
 */
class PermissionElasticSearch extends BaseElasticSearchAbstract
{

    /**
     * PermissionElasticSearch constructor.
     */
    public function __construct()
    {
        parent::__construct(env('ELASTIC_SEARCH_HOST'));
    }

    /**
     * @inheritDoc
     */
    public function index(): string
    {
        return 'ttct_permissions';
    }

    /**
     * @return array
     */
    public function settings()
    {
        return [
            'analysis' => [
                'analyzer' => [
                    'vietnamese_standard' => [
                        'tokenizer' => 'icu_tokenizer',
                        'filter' => [
                            'icu_folding',
                            'icu_normalizer',
                            'icu_collation'
                        ]
                    ]
                ]
            ]
        ];
    }

    /**
     * @inheritDoc
     */
    public function map(): array
    {
        return [
            'id' => [
                'type' => 'long',
                "fields" => [
                    'keyword' => [
                        'type' => 'keyword',
                        "ignore_above" => 256
                    ]
                ]
            ],
            'name' => [
                'type' => 'text',
                'fielddata' => true,
                "fields" => [
                    'keyword' => [
                        'type' => 'keyword',
                        "ignore_above" => 256
                    ]
                ],
                'analyzer' => 'vietnamese_standard'
            ],
            'slug' => [
                'type' => 'text',
                'fielddata' => true,
                "fields" => [
                    'keyword' => [
                        'type' => 'keyword',
                        "ignore_above" => 256
                    ]
                ],
            ],
            'guard_name' => [
                'type' => 'text',
                'fielddata' => true,
                "fields" => [
                    'keyword' => [
                        'type' => 'keyword',
                        "ignore_above" => 256
                    ]
                ],
            ],
            'status' => [
                'type' => 'integer',
                "fields" => [
                    'keyword' => [
                        'type' => 'keyword',
                        "ignore_above" => 256
                    ]
                ],
            ],
            'description' => [
                'type' => 'text',
                'fielddata' => true,
                "fields" => [
                    'keyword' => [
                        'type' => 'keyword',
                        "ignore_above" => 256
                    ]
                ],
                'analyzer' => 'vietnamese_standard'
            ],
            'created_at' => [
                'type' => 'long',
                "fields" => [
                    'keyword' => [
                        'type' => 'keyword',
                        "ignore_above" => 256
                    ]
                ]
            ],
            'updated_at' => [
                'type' => 'long',
                "fields" => [
                    'keyword' => [
                        'type' => 'keyword',
                        "ignore_above" => 256
                    ]
                ]
            ],
            'roles' => [
                'properties' => [
                    'id' => [
                        'type' => 'long',
                        "fields" => [
                            'keyword' => [
                                'type' => 'keyword',
                                "ignore_above" => 256
                            ]
                        ]
                    ],
                    'name' => [
                        'type' => 'text',
                        'fielddata' => true,
                        "fields" => [
                            'keyword' => [
                                'type' => 'keyword',
                                "ignore_above" => 256
                            ]
                        ],
                        'analyzer' => 'vietnamese_standard'
                    ],
                    'slug' => [
                        'type' => 'text',
                        'fielddata' => true,
                        "fields" => [
                            'keyword' => [
                                'type' => 'keyword',
                                "ignore_above" => 256
                            ]
                        ],
                    ],
                    'guard_name' => [
                        'type' => 'text',
                        'fielddata' => true,
                        "fields" => [
                            'keyword' => [
                                'type' => 'keyword',
                                "ignore_above" => 256
                            ]
                        ],
                    ],
                    'status' => [
                        'type' => 'integer',
                        "fields" => [
                            'keyword' => [
                                'type' => 'keyword',
                                "ignore_above" => 256
                            ]
                        ],
                    ],
                    'description' => [
                        'type' => 'text',
                        'fielddata' => true,
                        "fields" => [
                            'keyword' => [
                                'type' => 'keyword',
                                "ignore_above" => 256
                            ]
                        ],
                        'analyzer' => 'vietnamese_standard'
                    ],
                    'created_at' => [
                        'type' => 'long',
                        "fields" => [
                            'keyword' => [
                                'type' => 'keyword',
                                "ignore_above" => 256
                            ]
                        ]
                    ],
                    'updated_at' => [
                        'type' => 'long',
                        "fields" => [
                            'keyword' => [
                                'type' => 'keyword',
                                "ignore_above" => 256
                            ]
                        ]
                    ],
                ]
            ],
            'models' => [
                'properties' => [
                    'id' => [
                        'type' => 'long',
                        "fields" => [
                            'keyword' => [
                                'type' => 'keyword',
                                "ignore_above" => 256
                            ]
                        ]
                    ],
                    'username' => [
                        'type' => 'text',
                        'fielddata' => true,
                        "fields" => [
                            'keyword' => [
                                'type' => 'keyword',
                                "ignore_above" => 256
                            ]
                        ],
                    ],
                    'first_name' => [
                        'type' => 'text',
                        'fielddata' => true,
                        "fields" => [
                            'keyword' => [
                                'type' => 'keyword',
                                "ignore_above" => 256
                            ]
                        ],
                        'analyzer' => 'vietnamese_standard'
                    ],
                    'last_name' => [
                        'type' => 'text',
                        'fielddata' => true,
                        "fields" => [
                            'keyword' => [
                                'type' => 'keyword',
                                "ignore_above" => 256
                            ]
                        ],
                        'analyzer' => 'vietnamese_standard'
                    ],
                ]
            ]
        ];
    }
}
