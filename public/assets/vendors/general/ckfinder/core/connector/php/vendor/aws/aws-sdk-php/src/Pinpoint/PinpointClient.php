<?php
namespace Aws\Pinpoint;

use Aws\Api\ApiProvider;
use Aws\Api\DocModel;
use Aws\Api\Service;
use Aws\AwsClient;
use Aws\Result;
use GuzzleHttp\Promise\Promise;

/**
 * This client is used to interact with the **Amazon Pinpoint** service.
 * @method Result createApp(array $args = [])
 * @method Promise createAppAsync(array $args = [])
 * @method Result createCampaign(array $args = [])
 * @method Promise createCampaignAsync(array $args = [])
 * @method Result createExportJob(array $args = [])
 * @method Promise createExportJobAsync(array $args = [])
 * @method Result createImportJob(array $args = [])
 * @method Promise createImportJobAsync(array $args = [])
 * @method Result createSegment(array $args = [])
 * @method Promise createSegmentAsync(array $args = [])
 * @method Result deleteAdmChannel(array $args = [])
 * @method Promise deleteAdmChannelAsync(array $args = [])
 * @method Result deleteApnsChannel(array $args = [])
 * @method Promise deleteApnsChannelAsync(array $args = [])
 * @method Result deleteApnsSandboxChannel(array $args = [])
 * @method Promise deleteApnsSandboxChannelAsync(array $args = [])
 * @method Result deleteApnsVoipChannel(array $args = [])
 * @method Promise deleteApnsVoipChannelAsync(array $args = [])
 * @method Result deleteApnsVoipSandboxChannel(array $args = [])
 * @method Promise deleteApnsVoipSandboxChannelAsync(array $args = [])
 * @method Result deleteApp(array $args = [])
 * @method Promise deleteAppAsync(array $args = [])
 * @method Result deleteBaiduChannel(array $args = [])
 * @method Promise deleteBaiduChannelAsync(array $args = [])
 * @method Result deleteCampaign(array $args = [])
 * @method Promise deleteCampaignAsync(array $args = [])
 * @method Result deleteEmailChannel(array $args = [])
 * @method Promise deleteEmailChannelAsync(array $args = [])
 * @method Result deleteEndpoint(array $args = [])
 * @method Promise deleteEndpointAsync(array $args = [])
 * @method Result deleteEventStream(array $args = [])
 * @method Promise deleteEventStreamAsync(array $args = [])
 * @method Result deleteGcmChannel(array $args = [])
 * @method Promise deleteGcmChannelAsync(array $args = [])
 * @method Result deleteSegment(array $args = [])
 * @method Promise deleteSegmentAsync(array $args = [])
 * @method Result deleteSmsChannel(array $args = [])
 * @method Promise deleteSmsChannelAsync(array $args = [])
 * @method Result deleteUserEndpoints(array $args = [])
 * @method Promise deleteUserEndpointsAsync(array $args = [])
 * @method Result deleteVoiceChannel(array $args = [])
 * @method Promise deleteVoiceChannelAsync(array $args = [])
 * @method Result getAdmChannel(array $args = [])
 * @method Promise getAdmChannelAsync(array $args = [])
 * @method Result getApnsChannel(array $args = [])
 * @method Promise getApnsChannelAsync(array $args = [])
 * @method Result getApnsSandboxChannel(array $args = [])
 * @method Promise getApnsSandboxChannelAsync(array $args = [])
 * @method Result getApnsVoipChannel(array $args = [])
 * @method Promise getApnsVoipChannelAsync(array $args = [])
 * @method Result getApnsVoipSandboxChannel(array $args = [])
 * @method Promise getApnsVoipSandboxChannelAsync(array $args = [])
 * @method Result getApp(array $args = [])
 * @method Promise getAppAsync(array $args = [])
 * @method Result getApplicationSettings(array $args = [])
 * @method Promise getApplicationSettingsAsync(array $args = [])
 * @method Result getApps(array $args = [])
 * @method Promise getAppsAsync(array $args = [])
 * @method Result getBaiduChannel(array $args = [])
 * @method Promise getBaiduChannelAsync(array $args = [])
 * @method Result getCampaign(array $args = [])
 * @method Promise getCampaignAsync(array $args = [])
 * @method Result getCampaignActivities(array $args = [])
 * @method Promise getCampaignActivitiesAsync(array $args = [])
 * @method Result getCampaignVersion(array $args = [])
 * @method Promise getCampaignVersionAsync(array $args = [])
 * @method Result getCampaignVersions(array $args = [])
 * @method Promise getCampaignVersionsAsync(array $args = [])
 * @method Result getCampaigns(array $args = [])
 * @method Promise getCampaignsAsync(array $args = [])
 * @method Result getChannels(array $args = [])
 * @method Promise getChannelsAsync(array $args = [])
 * @method Result getEmailChannel(array $args = [])
 * @method Promise getEmailChannelAsync(array $args = [])
 * @method Result getEndpoint(array $args = [])
 * @method Promise getEndpointAsync(array $args = [])
 * @method Result getEventStream(array $args = [])
 * @method Promise getEventStreamAsync(array $args = [])
 * @method Result getExportJob(array $args = [])
 * @method Promise getExportJobAsync(array $args = [])
 * @method Result getExportJobs(array $args = [])
 * @method Promise getExportJobsAsync(array $args = [])
 * @method Result getGcmChannel(array $args = [])
 * @method Promise getGcmChannelAsync(array $args = [])
 * @method Result getImportJob(array $args = [])
 * @method Promise getImportJobAsync(array $args = [])
 * @method Result getImportJobs(array $args = [])
 * @method Promise getImportJobsAsync(array $args = [])
 * @method Result getSegment(array $args = [])
 * @method Promise getSegmentAsync(array $args = [])
 * @method Result getSegmentExportJobs(array $args = [])
 * @method Promise getSegmentExportJobsAsync(array $args = [])
 * @method Result getSegmentImportJobs(array $args = [])
 * @method Promise getSegmentImportJobsAsync(array $args = [])
 * @method Result getSegmentVersion(array $args = [])
 * @method Promise getSegmentVersionAsync(array $args = [])
 * @method Result getSegmentVersions(array $args = [])
 * @method Promise getSegmentVersionsAsync(array $args = [])
 * @method Result getSegments(array $args = [])
 * @method Promise getSegmentsAsync(array $args = [])
 * @method Result getSmsChannel(array $args = [])
 * @method Promise getSmsChannelAsync(array $args = [])
 * @method Result getUserEndpoints(array $args = [])
 * @method Promise getUserEndpointsAsync(array $args = [])
 * @method Result getVoiceChannel(array $args = [])
 * @method Promise getVoiceChannelAsync(array $args = [])
 * @method Result phoneNumberValidate(array $args = [])
 * @method Promise phoneNumberValidateAsync(array $args = [])
 * @method Result putEventStream(array $args = [])
 * @method Promise putEventStreamAsync(array $args = [])
 * @method Result putEvents(array $args = [])
 * @method Promise putEventsAsync(array $args = [])
 * @method Result removeAttributes(array $args = [])
 * @method Promise removeAttributesAsync(array $args = [])
 * @method Result sendMessages(array $args = [])
 * @method Promise sendMessagesAsync(array $args = [])
 * @method Result sendUsersMessages(array $args = [])
 * @method Promise sendUsersMessagesAsync(array $args = [])
 * @method Result updateAdmChannel(array $args = [])
 * @method Promise updateAdmChannelAsync(array $args = [])
 * @method Result updateApnsChannel(array $args = [])
 * @method Promise updateApnsChannelAsync(array $args = [])
 * @method Result updateApnsSandboxChannel(array $args = [])
 * @method Promise updateApnsSandboxChannelAsync(array $args = [])
 * @method Result updateApnsVoipChannel(array $args = [])
 * @method Promise updateApnsVoipChannelAsync(array $args = [])
 * @method Result updateApnsVoipSandboxChannel(array $args = [])
 * @method Promise updateApnsVoipSandboxChannelAsync(array $args = [])
 * @method Result updateApplicationSettings(array $args = [])
 * @method Promise updateApplicationSettingsAsync(array $args = [])
 * @method Result updateBaiduChannel(array $args = [])
 * @method Promise updateBaiduChannelAsync(array $args = [])
 * @method Result updateCampaign(array $args = [])
 * @method Promise updateCampaignAsync(array $args = [])
 * @method Result updateEmailChannel(array $args = [])
 * @method Promise updateEmailChannelAsync(array $args = [])
 * @method Result updateEndpoint(array $args = [])
 * @method Promise updateEndpointAsync(array $args = [])
 * @method Result updateEndpointsBatch(array $args = [])
 * @method Promise updateEndpointsBatchAsync(array $args = [])
 * @method Result updateGcmChannel(array $args = [])
 * @method Promise updateGcmChannelAsync(array $args = [])
 * @method Result updateSegment(array $args = [])
 * @method Promise updateSegmentAsync(array $args = [])
 * @method Result updateSmsChannel(array $args = [])
 * @method Promise updateSmsChannelAsync(array $args = [])
 * @method Result updateVoiceChannel(array $args = [])
 * @method Promise updateVoiceChannelAsync(array $args = [])
 */
class PinpointClient extends AwsClient
{
    private static $nameCollisionOverrides = [
        'GetUserEndpoint' => 'GetEndpoint',
        'GetUserEndpointAsync' => 'GetEndpointAsync',
        'UpdateUserEndpoint' => 'UpdateEndpoint',
        'UpdateUserEndpointAsync' => 'UpdateEndpointAsync',
        'UpdateUserEndpointsBatch' => 'UpdateEndpointsBatch',
        'UpdateUserEndpointsBatchAsync' => 'UpdateEndpointsBatchAsync',
    ];

    public function __call($name, array $args)
    {
        // Overcomes a naming collision with `AwsClient::getEndpoint`.
        if (isset(self::$nameCollisionOverrides[ucfirst($name)])) {
            $name = self::$nameCollisionOverrides[ucfirst($name)];
        }

        return parent::__call($name, $args);
    }

    /**
     * @internal
     * @codeCoverageIgnore
     */
    public static function applyDocFilters(array $api, array $docs)
    {
        foreach (self::$nameCollisionOverrides as $overrideName => $operationName) {
            if (substr($overrideName, -5) === 'Async') {
                continue;
            }
            // Overcomes a naming collision with `AwsClient::getEndpoint`.
            $api['operations'][$overrideName] = $api['operations'][$operationName];
            $docs['operations'][$overrideName] = $docs['operations'][$operationName];
            unset($api['operations'][$operationName], $docs['operations'][$operationName]);
        }
        ksort($api['operations']);

        return [
            new Service($api, ApiProvider::defaultProvider()),
            new DocModel($docs)
        ];
    }
}
