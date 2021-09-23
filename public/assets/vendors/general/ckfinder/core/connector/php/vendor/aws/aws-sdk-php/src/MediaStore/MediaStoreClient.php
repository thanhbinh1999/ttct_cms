<?php
namespace Aws\MediaStore;

use Aws\AwsClient;
use Aws\Result;
use GuzzleHttp\Promise\Promise;

/**
 * This client is used to interact with the **AWS Elemental MediaStore** service.
 * @method Result createContainer(array $args = [])
 * @method Promise createContainerAsync(array $args = [])
 * @method Result deleteContainer(array $args = [])
 * @method Promise deleteContainerAsync(array $args = [])
 * @method Result deleteContainerPolicy(array $args = [])
 * @method Promise deleteContainerPolicyAsync(array $args = [])
 * @method Result deleteCorsPolicy(array $args = [])
 * @method Promise deleteCorsPolicyAsync(array $args = [])
 * @method Result describeContainer(array $args = [])
 * @method Promise describeContainerAsync(array $args = [])
 * @method Result getContainerPolicy(array $args = [])
 * @method Promise getContainerPolicyAsync(array $args = [])
 * @method Result getCorsPolicy(array $args = [])
 * @method Promise getCorsPolicyAsync(array $args = [])
 * @method Result listContainers(array $args = [])
 * @method Promise listContainersAsync(array $args = [])
 * @method Result putContainerPolicy(array $args = [])
 * @method Promise putContainerPolicyAsync(array $args = [])
 * @method Result putCorsPolicy(array $args = [])
 * @method Promise putCorsPolicyAsync(array $args = [])
 */
class MediaStoreClient extends AwsClient {}
