<?php
namespace Aws\Sms;

use Aws\AwsClient;
use Aws\Result;
use GuzzleHttp\Promise\Promise;

/**
 * This client is used to interact with the **AWS Server Migration Service** service.
 * @method Result createReplicationJob(array $args = [])
 * @method Promise createReplicationJobAsync(array $args = [])
 * @method Result deleteReplicationJob(array $args = [])
 * @method Promise deleteReplicationJobAsync(array $args = [])
 * @method Result deleteServerCatalog(array $args = [])
 * @method Promise deleteServerCatalogAsync(array $args = [])
 * @method Result disassociateConnector(array $args = [])
 * @method Promise disassociateConnectorAsync(array $args = [])
 * @method Result getConnectors(array $args = [])
 * @method Promise getConnectorsAsync(array $args = [])
 * @method Result getReplicationJobs(array $args = [])
 * @method Promise getReplicationJobsAsync(array $args = [])
 * @method Result getReplicationRuns(array $args = [])
 * @method Promise getReplicationRunsAsync(array $args = [])
 * @method Result getServers(array $args = [])
 * @method Promise getServersAsync(array $args = [])
 * @method Result importServerCatalog(array $args = [])
 * @method Promise importServerCatalogAsync(array $args = [])
 * @method Result startOnDemandReplicationRun(array $args = [])
 * @method Promise startOnDemandReplicationRunAsync(array $args = [])
 * @method Result updateReplicationJob(array $args = [])
 * @method Promise updateReplicationJobAsync(array $args = [])
 */
class SmsClient extends AwsClient {}
