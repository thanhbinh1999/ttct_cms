<?php
namespace Aws\XRay;

use Aws\AwsClient;
use Aws\Result;
use GuzzleHttp\Promise\Promise;

/**
 * This client is used to interact with the **AWS X-Ray** service.
 * @method Result batchGetTraces(array $args = [])
 * @method Promise batchGetTracesAsync(array $args = [])
 * @method Result createGroup(array $args = [])
 * @method Promise createGroupAsync(array $args = [])
 * @method Result createSamplingRule(array $args = [])
 * @method Promise createSamplingRuleAsync(array $args = [])
 * @method Result deleteGroup(array $args = [])
 * @method Promise deleteGroupAsync(array $args = [])
 * @method Result deleteSamplingRule(array $args = [])
 * @method Promise deleteSamplingRuleAsync(array $args = [])
 * @method Result getEncryptionConfig(array $args = [])
 * @method Promise getEncryptionConfigAsync(array $args = [])
 * @method Result getGroup(array $args = [])
 * @method Promise getGroupAsync(array $args = [])
 * @method Result getGroups(array $args = [])
 * @method Promise getGroupsAsync(array $args = [])
 * @method Result getSamplingRules(array $args = [])
 * @method Promise getSamplingRulesAsync(array $args = [])
 * @method Result getSamplingStatisticSummaries(array $args = [])
 * @method Promise getSamplingStatisticSummariesAsync(array $args = [])
 * @method Result getSamplingTargets(array $args = [])
 * @method Promise getSamplingTargetsAsync(array $args = [])
 * @method Result getServiceGraph(array $args = [])
 * @method Promise getServiceGraphAsync(array $args = [])
 * @method Result getTraceGraph(array $args = [])
 * @method Promise getTraceGraphAsync(array $args = [])
 * @method Result getTraceSummaries(array $args = [])
 * @method Promise getTraceSummariesAsync(array $args = [])
 * @method Result putEncryptionConfig(array $args = [])
 * @method Promise putEncryptionConfigAsync(array $args = [])
 * @method Result putTelemetryRecords(array $args = [])
 * @method Promise putTelemetryRecordsAsync(array $args = [])
 * @method Result putTraceSegments(array $args = [])
 * @method Promise putTraceSegmentsAsync(array $args = [])
 * @method Result updateGroup(array $args = [])
 * @method Promise updateGroupAsync(array $args = [])
 * @method Result updateSamplingRule(array $args = [])
 * @method Promise updateSamplingRuleAsync(array $args = [])
 */
class XRayClient extends AwsClient {}
