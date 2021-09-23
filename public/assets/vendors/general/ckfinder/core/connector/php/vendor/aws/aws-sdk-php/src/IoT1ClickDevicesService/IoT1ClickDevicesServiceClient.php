<?php
namespace Aws\IoT1ClickDevicesService;

use Aws\AwsClient;
use Aws\Result;
use GuzzleHttp\Promise\Promise;

/**
 * This client is used to interact with the **AWS IoT 1-Click Devices Service** service.
 * @method Result claimDevicesByClaimCode(array $args = [])
 * @method Promise claimDevicesByClaimCodeAsync(array $args = [])
 * @method Result describeDevice(array $args = [])
 * @method Promise describeDeviceAsync(array $args = [])
 * @method Result finalizeDeviceClaim(array $args = [])
 * @method Promise finalizeDeviceClaimAsync(array $args = [])
 * @method Result getDeviceMethods(array $args = [])
 * @method Promise getDeviceMethodsAsync(array $args = [])
 * @method Result initiateDeviceClaim(array $args = [])
 * @method Promise initiateDeviceClaimAsync(array $args = [])
 * @method Result invokeDeviceMethod(array $args = [])
 * @method Promise invokeDeviceMethodAsync(array $args = [])
 * @method Result listDeviceEvents(array $args = [])
 * @method Promise listDeviceEventsAsync(array $args = [])
 * @method Result listDevices(array $args = [])
 * @method Promise listDevicesAsync(array $args = [])
 * @method Result unclaimDevice(array $args = [])
 * @method Promise unclaimDeviceAsync(array $args = [])
 * @method Result updateDeviceState(array $args = [])
 * @method Promise updateDeviceStateAsync(array $args = [])
 */
class IoT1ClickDevicesServiceClient extends AwsClient {}
