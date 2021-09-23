<?php
namespace Aws\Lambda;

use Aws\AwsClient;
use Aws\CommandInterface;
use Aws\Middleware;
use Aws\Result;
use GuzzleHttp\Promise\Promise;

/**
 * This client is used to interact with AWS Lambda
 *
 * @method Result addPermission(array $args = [])
 * @method Promise addPermissionAsync(array $args = [])
 * @method Result createAlias(array $args = [])
 * @method Promise createAliasAsync(array $args = [])
 * @method Result createEventSourceMapping(array $args = [])
 * @method Promise createEventSourceMappingAsync(array $args = [])
 * @method Result createFunction(array $args = [])
 * @method Promise createFunctionAsync(array $args = [])
 * @method Result deleteAlias(array $args = [])
 * @method Promise deleteAliasAsync(array $args = [])
 * @method Result deleteEventSourceMapping(array $args = [])
 * @method Promise deleteEventSourceMappingAsync(array $args = [])
 * @method Result deleteFunction(array $args = [])
 * @method Promise deleteFunctionAsync(array $args = [])
 * @method Result deleteFunctionConcurrency(array $args = [])
 * @method Promise deleteFunctionConcurrencyAsync(array $args = [])
 * @method Result getAccountSettings(array $args = [])
 * @method Promise getAccountSettingsAsync(array $args = [])
 * @method Result getAlias(array $args = [])
 * @method Promise getAliasAsync(array $args = [])
 * @method Result getEventSourceMapping(array $args = [])
 * @method Promise getEventSourceMappingAsync(array $args = [])
 * @method Result getFunction(array $args = [])
 * @method Promise getFunctionAsync(array $args = [])
 * @method Result getFunctionConfiguration(array $args = [])
 * @method Promise getFunctionConfigurationAsync(array $args = [])
 * @method Result getPolicy(array $args = [])
 * @method Promise getPolicyAsync(array $args = [])
 * @method Result invoke(array $args = [])
 * @method Promise invokeAsync(array $args = [])
 * @method Result invokeAsync(array $args = [])
 * @method Promise invokeAsyncAsync(array $args = [])
 * @method Result listAliases(array $args = [])
 * @method Promise listAliasesAsync(array $args = [])
 * @method Result listEventSourceMappings(array $args = [])
 * @method Promise listEventSourceMappingsAsync(array $args = [])
 * @method Result listFunctions(array $args = [])
 * @method Promise listFunctionsAsync(array $args = [])
 * @method Result listTags(array $args = [])
 * @method Promise listTagsAsync(array $args = [])
 * @method Result listVersionsByFunction(array $args = [])
 * @method Promise listVersionsByFunctionAsync(array $args = [])
 * @method Result publishVersion(array $args = [])
 * @method Promise publishVersionAsync(array $args = [])
 * @method Result putFunctionConcurrency(array $args = [])
 * @method Promise putFunctionConcurrencyAsync(array $args = [])
 * @method Result removePermission(array $args = [])
 * @method Promise removePermissionAsync(array $args = [])
 * @method Result tagResource(array $args = [])
 * @method Promise tagResourceAsync(array $args = [])
 * @method Result untagResource(array $args = [])
 * @method Promise untagResourceAsync(array $args = [])
 * @method Result updateAlias(array $args = [])
 * @method Promise updateAliasAsync(array $args = [])
 * @method Result updateEventSourceMapping(array $args = [])
 * @method Promise updateEventSourceMappingAsync(array $args = [])
 * @method Result updateFunctionCode(array $args = [])
 * @method Promise updateFunctionCodeAsync(array $args = [])
 * @method Result updateFunctionConfiguration(array $args = [])
 * @method Promise updateFunctionConfigurationAsync(array $args = [])
 */
class LambdaClient extends AwsClient
{
    /**
     * {@inheritdoc}
     */
    public function __construct(array $args)
    {
        parent::__construct($args);
        $list = $this->getHandlerList();
        if (extension_loaded('curl')) {
            $list->appendInit($this->getDefaultCurlOptionsMiddleware());
        }
    }

    /**
     * Provides a middleware that sets default Curl options for the command
     *
     * @return callable
     */
    public function getDefaultCurlOptionsMiddleware()
    {
        return Middleware::mapCommand(function (CommandInterface $cmd) {
            $defaultCurlOptions = [
                CURLOPT_TCP_KEEPALIVE => 1,
            ];
            if (!isset($cmd['@http']['curl'])) {
                $cmd['@http']['curl'] = $defaultCurlOptions;
            } else {
                $cmd['@http']['curl'] += $defaultCurlOptions;
            }
            return $cmd;
        });
    }
}
