<?php
namespace Aws\KinesisVideoArchivedMedia;

use Aws\AwsClient;
use Aws\Result;
use GuzzleHttp\Promise\Promise;

/**
 * This client is used to interact with the **Amazon Kinesis Video Streams Archived Media** service.
 * @method Result getHLSStreamingSessionURL(array $args = [])
 * @method Promise getHLSStreamingSessionURLAsync(array $args = [])
 * @method Result getMediaForFragmentList(array $args = [])
 * @method Promise getMediaForFragmentListAsync(array $args = [])
 * @method Result listFragments(array $args = [])
 * @method Promise listFragmentsAsync(array $args = [])
 */
class KinesisVideoArchivedMediaClient extends AwsClient {}
