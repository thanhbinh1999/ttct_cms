<?php
namespace Aws\CodePipeline;

use Aws\AwsClient;
use Aws\Result;
use GuzzleHttp\Promise\Promise;

/**
 * This client is used to interact with the **Amazon CodePipeline** service.
 *
 * @method Result acknowledgeJob(array $args = [])
 * @method Promise acknowledgeJobAsync(array $args = [])
 * @method Result acknowledgeThirdPartyJob(array $args = [])
 * @method Promise acknowledgeThirdPartyJobAsync(array $args = [])
 * @method Result createCustomActionType(array $args = [])
 * @method Promise createCustomActionTypeAsync(array $args = [])
 * @method Result createPipeline(array $args = [])
 * @method Promise createPipelineAsync(array $args = [])
 * @method Result deleteCustomActionType(array $args = [])
 * @method Promise deleteCustomActionTypeAsync(array $args = [])
 * @method Result deletePipeline(array $args = [])
 * @method Promise deletePipelineAsync(array $args = [])
 * @method Result deleteWebhook(array $args = [])
 * @method Promise deleteWebhookAsync(array $args = [])
 * @method Result deregisterWebhookWithThirdParty(array $args = [])
 * @method Promise deregisterWebhookWithThirdPartyAsync(array $args = [])
 * @method Result disableStageTransition(array $args = [])
 * @method Promise disableStageTransitionAsync(array $args = [])
 * @method Result enableStageTransition(array $args = [])
 * @method Promise enableStageTransitionAsync(array $args = [])
 * @method Result getJobDetails(array $args = [])
 * @method Promise getJobDetailsAsync(array $args = [])
 * @method Result getPipeline(array $args = [])
 * @method Promise getPipelineAsync(array $args = [])
 * @method Result getPipelineExecution(array $args = [])
 * @method Promise getPipelineExecutionAsync(array $args = [])
 * @method Result getPipelineState(array $args = [])
 * @method Promise getPipelineStateAsync(array $args = [])
 * @method Result getThirdPartyJobDetails(array $args = [])
 * @method Promise getThirdPartyJobDetailsAsync(array $args = [])
 * @method Result listActionTypes(array $args = [])
 * @method Promise listActionTypesAsync(array $args = [])
 * @method Result listPipelineExecutions(array $args = [])
 * @method Promise listPipelineExecutionsAsync(array $args = [])
 * @method Result listPipelines(array $args = [])
 * @method Promise listPipelinesAsync(array $args = [])
 * @method Result listWebhooks(array $args = [])
 * @method Promise listWebhooksAsync(array $args = [])
 * @method Result pollForJobs(array $args = [])
 * @method Promise pollForJobsAsync(array $args = [])
 * @method Result pollForThirdPartyJobs(array $args = [])
 * @method Promise pollForThirdPartyJobsAsync(array $args = [])
 * @method Result putActionRevision(array $args = [])
 * @method Promise putActionRevisionAsync(array $args = [])
 * @method Result putApprovalResult(array $args = [])
 * @method Promise putApprovalResultAsync(array $args = [])
 * @method Result putJobFailureResult(array $args = [])
 * @method Promise putJobFailureResultAsync(array $args = [])
 * @method Result putJobSuccessResult(array $args = [])
 * @method Promise putJobSuccessResultAsync(array $args = [])
 * @method Result putThirdPartyJobFailureResult(array $args = [])
 * @method Promise putThirdPartyJobFailureResultAsync(array $args = [])
 * @method Result putThirdPartyJobSuccessResult(array $args = [])
 * @method Promise putThirdPartyJobSuccessResultAsync(array $args = [])
 * @method Result putWebhook(array $args = [])
 * @method Promise putWebhookAsync(array $args = [])
 * @method Result registerWebhookWithThirdParty(array $args = [])
 * @method Promise registerWebhookWithThirdPartyAsync(array $args = [])
 * @method Result retryStageExecution(array $args = [])
 * @method Promise retryStageExecutionAsync(array $args = [])
 * @method Result startPipelineExecution(array $args = [])
 * @method Promise startPipelineExecutionAsync(array $args = [])
 * @method Result updatePipeline(array $args = [])
 * @method Promise updatePipelineAsync(array $args = [])
 */
class CodePipelineClient extends AwsClient {}
