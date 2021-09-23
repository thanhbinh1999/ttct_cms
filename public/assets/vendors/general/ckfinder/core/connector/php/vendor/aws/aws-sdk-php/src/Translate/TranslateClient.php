<?php
namespace Aws\Translate;

use Aws\AwsClient;
use Aws\Result;
use GuzzleHttp\Promise\Promise;

/**
 * This client is used to interact with the **Amazon Translate** service.
 * @method Result translateText(array $args = [])
 * @method Promise translateTextAsync(array $args = [])
 */
class TranslateClient extends AwsClient {}
