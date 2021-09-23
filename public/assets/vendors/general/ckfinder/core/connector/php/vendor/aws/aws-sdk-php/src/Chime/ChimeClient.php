<?php
namespace Aws\Chime;

use Aws\AwsClient;
use Aws\Result;
use GuzzleHttp\Promise\Promise;

/**
 * This client is used to interact with the **Amazon Chime** service.
 * @method Result batchSuspendUser(array $args = [])
 * @method Promise batchSuspendUserAsync(array $args = [])
 * @method Result batchUnsuspendUser(array $args = [])
 * @method Promise batchUnsuspendUserAsync(array $args = [])
 * @method Result batchUpdateUser(array $args = [])
 * @method Promise batchUpdateUserAsync(array $args = [])
 * @method Result createAccount(array $args = [])
 * @method Promise createAccountAsync(array $args = [])
 * @method Result deleteAccount(array $args = [])
 * @method Promise deleteAccountAsync(array $args = [])
 * @method Result getAccount(array $args = [])
 * @method Promise getAccountAsync(array $args = [])
 * @method Result getAccountSettings(array $args = [])
 * @method Promise getAccountSettingsAsync(array $args = [])
 * @method Result getUser(array $args = [])
 * @method Promise getUserAsync(array $args = [])
 * @method Result inviteUsers(array $args = [])
 * @method Promise inviteUsersAsync(array $args = [])
 * @method Result listAccounts(array $args = [])
 * @method Promise listAccountsAsync(array $args = [])
 * @method Result listUsers(array $args = [])
 * @method Promise listUsersAsync(array $args = [])
 * @method Result logoutUser(array $args = [])
 * @method Promise logoutUserAsync(array $args = [])
 * @method Result resetPersonalPIN(array $args = [])
 * @method Promise resetPersonalPINAsync(array $args = [])
 * @method Result updateAccount(array $args = [])
 * @method Promise updateAccountAsync(array $args = [])
 * @method Result updateAccountSettings(array $args = [])
 * @method Promise updateAccountSettingsAsync(array $args = [])
 * @method Result updateUser(array $args = [])
 * @method Promise updateUserAsync(array $args = [])
 */
class ChimeClient extends AwsClient {}
