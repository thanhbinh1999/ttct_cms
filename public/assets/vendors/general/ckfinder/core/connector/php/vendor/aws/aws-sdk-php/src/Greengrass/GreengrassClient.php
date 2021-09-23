<?php
namespace Aws\Greengrass;

use Aws\AwsClient;
use Aws\Result;
use GuzzleHttp\Promise\Promise;

/**
 * This client is used to interact with the **AWS Greengrass** service.
 * @method Result associateRoleToGroup(array $args = [])
 * @method Promise associateRoleToGroupAsync(array $args = [])
 * @method Result associateServiceRoleToAccount(array $args = [])
 * @method Promise associateServiceRoleToAccountAsync(array $args = [])
 * @method Result createCoreDefinition(array $args = [])
 * @method Promise createCoreDefinitionAsync(array $args = [])
 * @method Result createCoreDefinitionVersion(array $args = [])
 * @method Promise createCoreDefinitionVersionAsync(array $args = [])
 * @method Result createDeployment(array $args = [])
 * @method Promise createDeploymentAsync(array $args = [])
 * @method Result createDeviceDefinition(array $args = [])
 * @method Promise createDeviceDefinitionAsync(array $args = [])
 * @method Result createDeviceDefinitionVersion(array $args = [])
 * @method Promise createDeviceDefinitionVersionAsync(array $args = [])
 * @method Result createFunctionDefinition(array $args = [])
 * @method Promise createFunctionDefinitionAsync(array $args = [])
 * @method Result createFunctionDefinitionVersion(array $args = [])
 * @method Promise createFunctionDefinitionVersionAsync(array $args = [])
 * @method Result createGroup(array $args = [])
 * @method Promise createGroupAsync(array $args = [])
 * @method Result createGroupCertificateAuthority(array $args = [])
 * @method Promise createGroupCertificateAuthorityAsync(array $args = [])
 * @method Result createGroupVersion(array $args = [])
 * @method Promise createGroupVersionAsync(array $args = [])
 * @method Result createLoggerDefinition(array $args = [])
 * @method Promise createLoggerDefinitionAsync(array $args = [])
 * @method Result createLoggerDefinitionVersion(array $args = [])
 * @method Promise createLoggerDefinitionVersionAsync(array $args = [])
 * @method Result createResourceDefinition(array $args = [])
 * @method Promise createResourceDefinitionAsync(array $args = [])
 * @method Result createResourceDefinitionVersion(array $args = [])
 * @method Promise createResourceDefinitionVersionAsync(array $args = [])
 * @method Result createSoftwareUpdateJob(array $args = [])
 * @method Promise createSoftwareUpdateJobAsync(array $args = [])
 * @method Result createSubscriptionDefinition(array $args = [])
 * @method Promise createSubscriptionDefinitionAsync(array $args = [])
 * @method Result createSubscriptionDefinitionVersion(array $args = [])
 * @method Promise createSubscriptionDefinitionVersionAsync(array $args = [])
 * @method Result deleteCoreDefinition(array $args = [])
 * @method Promise deleteCoreDefinitionAsync(array $args = [])
 * @method Result deleteDeviceDefinition(array $args = [])
 * @method Promise deleteDeviceDefinitionAsync(array $args = [])
 * @method Result deleteFunctionDefinition(array $args = [])
 * @method Promise deleteFunctionDefinitionAsync(array $args = [])
 * @method Result deleteGroup(array $args = [])
 * @method Promise deleteGroupAsync(array $args = [])
 * @method Result deleteLoggerDefinition(array $args = [])
 * @method Promise deleteLoggerDefinitionAsync(array $args = [])
 * @method Result deleteResourceDefinition(array $args = [])
 * @method Promise deleteResourceDefinitionAsync(array $args = [])
 * @method Result deleteSubscriptionDefinition(array $args = [])
 * @method Promise deleteSubscriptionDefinitionAsync(array $args = [])
 * @method Result disassociateRoleFromGroup(array $args = [])
 * @method Promise disassociateRoleFromGroupAsync(array $args = [])
 * @method Result disassociateServiceRoleFromAccount(array $args = [])
 * @method Promise disassociateServiceRoleFromAccountAsync(array $args = [])
 * @method Result getAssociatedRole(array $args = [])
 * @method Promise getAssociatedRoleAsync(array $args = [])
 * @method Result getBulkDeploymentStatus(array $args = [])
 * @method Promise getBulkDeploymentStatusAsync(array $args = [])
 * @method Result getConnectivityInfo(array $args = [])
 * @method Promise getConnectivityInfoAsync(array $args = [])
 * @method Result getCoreDefinition(array $args = [])
 * @method Promise getCoreDefinitionAsync(array $args = [])
 * @method Result getCoreDefinitionVersion(array $args = [])
 * @method Promise getCoreDefinitionVersionAsync(array $args = [])
 * @method Result getDeploymentStatus(array $args = [])
 * @method Promise getDeploymentStatusAsync(array $args = [])
 * @method Result getDeviceDefinition(array $args = [])
 * @method Promise getDeviceDefinitionAsync(array $args = [])
 * @method Result getDeviceDefinitionVersion(array $args = [])
 * @method Promise getDeviceDefinitionVersionAsync(array $args = [])
 * @method Result getFunctionDefinition(array $args = [])
 * @method Promise getFunctionDefinitionAsync(array $args = [])
 * @method Result getFunctionDefinitionVersion(array $args = [])
 * @method Promise getFunctionDefinitionVersionAsync(array $args = [])
 * @method Result getGroup(array $args = [])
 * @method Promise getGroupAsync(array $args = [])
 * @method Result getGroupCertificateAuthority(array $args = [])
 * @method Promise getGroupCertificateAuthorityAsync(array $args = [])
 * @method Result getGroupCertificateConfiguration(array $args = [])
 * @method Promise getGroupCertificateConfigurationAsync(array $args = [])
 * @method Result getGroupVersion(array $args = [])
 * @method Promise getGroupVersionAsync(array $args = [])
 * @method Result getLoggerDefinition(array $args = [])
 * @method Promise getLoggerDefinitionAsync(array $args = [])
 * @method Result getLoggerDefinitionVersion(array $args = [])
 * @method Promise getLoggerDefinitionVersionAsync(array $args = [])
 * @method Result getResourceDefinition(array $args = [])
 * @method Promise getResourceDefinitionAsync(array $args = [])
 * @method Result getResourceDefinitionVersion(array $args = [])
 * @method Promise getResourceDefinitionVersionAsync(array $args = [])
 * @method Result getServiceRoleForAccount(array $args = [])
 * @method Promise getServiceRoleForAccountAsync(array $args = [])
 * @method Result getSubscriptionDefinition(array $args = [])
 * @method Promise getSubscriptionDefinitionAsync(array $args = [])
 * @method Result getSubscriptionDefinitionVersion(array $args = [])
 * @method Promise getSubscriptionDefinitionVersionAsync(array $args = [])
 * @method Result listBulkDeploymentDetailedReports(array $args = [])
 * @method Promise listBulkDeploymentDetailedReportsAsync(array $args = [])
 * @method Result listBulkDeployments(array $args = [])
 * @method Promise listBulkDeploymentsAsync(array $args = [])
 * @method Result listCoreDefinitionVersions(array $args = [])
 * @method Promise listCoreDefinitionVersionsAsync(array $args = [])
 * @method Result listCoreDefinitions(array $args = [])
 * @method Promise listCoreDefinitionsAsync(array $args = [])
 * @method Result listDeployments(array $args = [])
 * @method Promise listDeploymentsAsync(array $args = [])
 * @method Result listDeviceDefinitionVersions(array $args = [])
 * @method Promise listDeviceDefinitionVersionsAsync(array $args = [])
 * @method Result listDeviceDefinitions(array $args = [])
 * @method Promise listDeviceDefinitionsAsync(array $args = [])
 * @method Result listFunctionDefinitionVersions(array $args = [])
 * @method Promise listFunctionDefinitionVersionsAsync(array $args = [])
 * @method Result listFunctionDefinitions(array $args = [])
 * @method Promise listFunctionDefinitionsAsync(array $args = [])
 * @method Result listGroupCertificateAuthorities(array $args = [])
 * @method Promise listGroupCertificateAuthoritiesAsync(array $args = [])
 * @method Result listGroupVersions(array $args = [])
 * @method Promise listGroupVersionsAsync(array $args = [])
 * @method Result listGroups(array $args = [])
 * @method Promise listGroupsAsync(array $args = [])
 * @method Result listLoggerDefinitionVersions(array $args = [])
 * @method Promise listLoggerDefinitionVersionsAsync(array $args = [])
 * @method Result listLoggerDefinitions(array $args = [])
 * @method Promise listLoggerDefinitionsAsync(array $args = [])
 * @method Result listResourceDefinitionVersions(array $args = [])
 * @method Promise listResourceDefinitionVersionsAsync(array $args = [])
 * @method Result listResourceDefinitions(array $args = [])
 * @method Promise listResourceDefinitionsAsync(array $args = [])
 * @method Result listSubscriptionDefinitionVersions(array $args = [])
 * @method Promise listSubscriptionDefinitionVersionsAsync(array $args = [])
 * @method Result listSubscriptionDefinitions(array $args = [])
 * @method Promise listSubscriptionDefinitionsAsync(array $args = [])
 * @method Result resetDeployments(array $args = [])
 * @method Promise resetDeploymentsAsync(array $args = [])
 * @method Result startBulkDeployment(array $args = [])
 * @method Promise startBulkDeploymentAsync(array $args = [])
 * @method Result stopBulkDeployment(array $args = [])
 * @method Promise stopBulkDeploymentAsync(array $args = [])
 * @method Result updateConnectivityInfo(array $args = [])
 * @method Promise updateConnectivityInfoAsync(array $args = [])
 * @method Result updateCoreDefinition(array $args = [])
 * @method Promise updateCoreDefinitionAsync(array $args = [])
 * @method Result updateDeviceDefinition(array $args = [])
 * @method Promise updateDeviceDefinitionAsync(array $args = [])
 * @method Result updateFunctionDefinition(array $args = [])
 * @method Promise updateFunctionDefinitionAsync(array $args = [])
 * @method Result updateGroup(array $args = [])
 * @method Promise updateGroupAsync(array $args = [])
 * @method Result updateGroupCertificateConfiguration(array $args = [])
 * @method Promise updateGroupCertificateConfigurationAsync(array $args = [])
 * @method Result updateLoggerDefinition(array $args = [])
 * @method Promise updateLoggerDefinitionAsync(array $args = [])
 * @method Result updateResourceDefinition(array $args = [])
 * @method Promise updateResourceDefinitionAsync(array $args = [])
 * @method Result updateSubscriptionDefinition(array $args = [])
 * @method Promise updateSubscriptionDefinitionAsync(array $args = [])
 */
class GreengrassClient extends AwsClient {}
