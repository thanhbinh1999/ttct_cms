<?php
namespace Aws\CloudWatchEvents;

use Aws\AwsClient;
use Aws\Result;
use GuzzleHttp\Promise\Promise;

/**
 * This client is used to interact with the **Amazon CloudWatch Events** service.
 *
 * @method Result deleteRule(array $args = [])
 * @method Promise deleteRuleAsync(array $args = [])
 * @method Result describeEventBus(array $args = [])
 * @method Promise describeEventBusAsync(array $args = [])
 * @method Result describeRule(array $args = [])
 * @method Promise describeRuleAsync(array $args = [])
 * @method Result disableRule(array $args = [])
 * @method Promise disableRuleAsync(array $args = [])
 * @method Result enableRule(array $args = [])
 * @method Promise enableRuleAsync(array $args = [])
 * @method Result listRuleNamesByTarget(array $args = [])
 * @method Promise listRuleNamesByTargetAsync(array $args = [])
 * @method Result listRules(array $args = [])
 * @method Promise listRulesAsync(array $args = [])
 * @method Result listTargetsByRule(array $args = [])
 * @method Promise listTargetsByRuleAsync(array $args = [])
 * @method Result putEvents(array $args = [])
 * @method Promise putEventsAsync(array $args = [])
 * @method Result putPermission(array $args = [])
 * @method Promise putPermissionAsync(array $args = [])
 * @method Result putRule(array $args = [])
 * @method Promise putRuleAsync(array $args = [])
 * @method Result putTargets(array $args = [])
 * @method Promise putTargetsAsync(array $args = [])
 * @method Result removePermission(array $args = [])
 * @method Promise removePermissionAsync(array $args = [])
 * @method Result removeTargets(array $args = [])
 * @method Promise removeTargetsAsync(array $args = [])
 * @method Result testEventPattern(array $args = [])
 * @method Promise testEventPatternAsync(array $args = [])
 */
class CloudWatchEventsClient extends AwsClient {}
