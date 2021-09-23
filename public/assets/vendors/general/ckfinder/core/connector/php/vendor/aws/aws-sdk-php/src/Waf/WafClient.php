<?php
namespace Aws\Waf;

use Aws\AwsClient;
use Aws\Result;
use GuzzleHttp\Promise\Promise;

/**
 * This client is used to interact with the **AWS WAF** service.
 *
 * @method Result createByteMatchSet(array $args = [])
 * @method Promise createByteMatchSetAsync(array $args = [])
 * @method Result createGeoMatchSet(array $args = [])
 * @method Promise createGeoMatchSetAsync(array $args = [])
 * @method Result createIPSet(array $args = [])
 * @method Promise createIPSetAsync(array $args = [])
 * @method Result createRateBasedRule(array $args = [])
 * @method Promise createRateBasedRuleAsync(array $args = [])
 * @method Result createRegexMatchSet(array $args = [])
 * @method Promise createRegexMatchSetAsync(array $args = [])
 * @method Result createRegexPatternSet(array $args = [])
 * @method Promise createRegexPatternSetAsync(array $args = [])
 * @method Result createRule(array $args = [])
 * @method Promise createRuleAsync(array $args = [])
 * @method Result createRuleGroup(array $args = [])
 * @method Promise createRuleGroupAsync(array $args = [])
 * @method Result createSizeConstraintSet(array $args = [])
 * @method Promise createSizeConstraintSetAsync(array $args = [])
 * @method Result createSqlInjectionMatchSet(array $args = [])
 * @method Promise createSqlInjectionMatchSetAsync(array $args = [])
 * @method Result createWebACL(array $args = [])
 * @method Promise createWebACLAsync(array $args = [])
 * @method Result createXssMatchSet(array $args = [])
 * @method Promise createXssMatchSetAsync(array $args = [])
 * @method Result deleteByteMatchSet(array $args = [])
 * @method Promise deleteByteMatchSetAsync(array $args = [])
 * @method Result deleteGeoMatchSet(array $args = [])
 * @method Promise deleteGeoMatchSetAsync(array $args = [])
 * @method Result deleteIPSet(array $args = [])
 * @method Promise deleteIPSetAsync(array $args = [])
 * @method Result deleteLoggingConfiguration(array $args = [])
 * @method Promise deleteLoggingConfigurationAsync(array $args = [])
 * @method Result deletePermissionPolicy(array $args = [])
 * @method Promise deletePermissionPolicyAsync(array $args = [])
 * @method Result deleteRateBasedRule(array $args = [])
 * @method Promise deleteRateBasedRuleAsync(array $args = [])
 * @method Result deleteRegexMatchSet(array $args = [])
 * @method Promise deleteRegexMatchSetAsync(array $args = [])
 * @method Result deleteRegexPatternSet(array $args = [])
 * @method Promise deleteRegexPatternSetAsync(array $args = [])
 * @method Result deleteRule(array $args = [])
 * @method Promise deleteRuleAsync(array $args = [])
 * @method Result deleteRuleGroup(array $args = [])
 * @method Promise deleteRuleGroupAsync(array $args = [])
 * @method Result deleteSizeConstraintSet(array $args = [])
 * @method Promise deleteSizeConstraintSetAsync(array $args = [])
 * @method Result deleteSqlInjectionMatchSet(array $args = [])
 * @method Promise deleteSqlInjectionMatchSetAsync(array $args = [])
 * @method Result deleteWebACL(array $args = [])
 * @method Promise deleteWebACLAsync(array $args = [])
 * @method Result deleteXssMatchSet(array $args = [])
 * @method Promise deleteXssMatchSetAsync(array $args = [])
 * @method Result getByteMatchSet(array $args = [])
 * @method Promise getByteMatchSetAsync(array $args = [])
 * @method Result getChangeToken(array $args = [])
 * @method Promise getChangeTokenAsync(array $args = [])
 * @method Result getChangeTokenStatus(array $args = [])
 * @method Promise getChangeTokenStatusAsync(array $args = [])
 * @method Result getGeoMatchSet(array $args = [])
 * @method Promise getGeoMatchSetAsync(array $args = [])
 * @method Result getIPSet(array $args = [])
 * @method Promise getIPSetAsync(array $args = [])
 * @method Result getLoggingConfiguration(array $args = [])
 * @method Promise getLoggingConfigurationAsync(array $args = [])
 * @method Result getPermissionPolicy(array $args = [])
 * @method Promise getPermissionPolicyAsync(array $args = [])
 * @method Result getRateBasedRule(array $args = [])
 * @method Promise getRateBasedRuleAsync(array $args = [])
 * @method Result getRateBasedRuleManagedKeys(array $args = [])
 * @method Promise getRateBasedRuleManagedKeysAsync(array $args = [])
 * @method Result getRegexMatchSet(array $args = [])
 * @method Promise getRegexMatchSetAsync(array $args = [])
 * @method Result getRegexPatternSet(array $args = [])
 * @method Promise getRegexPatternSetAsync(array $args = [])
 * @method Result getRule(array $args = [])
 * @method Promise getRuleAsync(array $args = [])
 * @method Result getRuleGroup(array $args = [])
 * @method Promise getRuleGroupAsync(array $args = [])
 * @method Result getSampledRequests(array $args = [])
 * @method Promise getSampledRequestsAsync(array $args = [])
 * @method Result getSizeConstraintSet(array $args = [])
 * @method Promise getSizeConstraintSetAsync(array $args = [])
 * @method Result getSqlInjectionMatchSet(array $args = [])
 * @method Promise getSqlInjectionMatchSetAsync(array $args = [])
 * @method Result getWebACL(array $args = [])
 * @method Promise getWebACLAsync(array $args = [])
 * @method Result getXssMatchSet(array $args = [])
 * @method Promise getXssMatchSetAsync(array $args = [])
 * @method Result listActivatedRulesInRuleGroup(array $args = [])
 * @method Promise listActivatedRulesInRuleGroupAsync(array $args = [])
 * @method Result listByteMatchSets(array $args = [])
 * @method Promise listByteMatchSetsAsync(array $args = [])
 * @method Result listGeoMatchSets(array $args = [])
 * @method Promise listGeoMatchSetsAsync(array $args = [])
 * @method Result listIPSets(array $args = [])
 * @method Promise listIPSetsAsync(array $args = [])
 * @method Result listLoggingConfigurations(array $args = [])
 * @method Promise listLoggingConfigurationsAsync(array $args = [])
 * @method Result listRateBasedRules(array $args = [])
 * @method Promise listRateBasedRulesAsync(array $args = [])
 * @method Result listRegexMatchSets(array $args = [])
 * @method Promise listRegexMatchSetsAsync(array $args = [])
 * @method Result listRegexPatternSets(array $args = [])
 * @method Promise listRegexPatternSetsAsync(array $args = [])
 * @method Result listRuleGroups(array $args = [])
 * @method Promise listRuleGroupsAsync(array $args = [])
 * @method Result listRules(array $args = [])
 * @method Promise listRulesAsync(array $args = [])
 * @method Result listSizeConstraintSets(array $args = [])
 * @method Promise listSizeConstraintSetsAsync(array $args = [])
 * @method Result listSqlInjectionMatchSets(array $args = [])
 * @method Promise listSqlInjectionMatchSetsAsync(array $args = [])
 * @method Result listSubscribedRuleGroups(array $args = [])
 * @method Promise listSubscribedRuleGroupsAsync(array $args = [])
 * @method Result listWebACLs(array $args = [])
 * @method Promise listWebACLsAsync(array $args = [])
 * @method Result listXssMatchSets(array $args = [])
 * @method Promise listXssMatchSetsAsync(array $args = [])
 * @method Result putLoggingConfiguration(array $args = [])
 * @method Promise putLoggingConfigurationAsync(array $args = [])
 * @method Result putPermissionPolicy(array $args = [])
 * @method Promise putPermissionPolicyAsync(array $args = [])
 * @method Result updateByteMatchSet(array $args = [])
 * @method Promise updateByteMatchSetAsync(array $args = [])
 * @method Result updateGeoMatchSet(array $args = [])
 * @method Promise updateGeoMatchSetAsync(array $args = [])
 * @method Result updateIPSet(array $args = [])
 * @method Promise updateIPSetAsync(array $args = [])
 * @method Result updateRateBasedRule(array $args = [])
 * @method Promise updateRateBasedRuleAsync(array $args = [])
 * @method Result updateRegexMatchSet(array $args = [])
 * @method Promise updateRegexMatchSetAsync(array $args = [])
 * @method Result updateRegexPatternSet(array $args = [])
 * @method Promise updateRegexPatternSetAsync(array $args = [])
 * @method Result updateRule(array $args = [])
 * @method Promise updateRuleAsync(array $args = [])
 * @method Result updateRuleGroup(array $args = [])
 * @method Promise updateRuleGroupAsync(array $args = [])
 * @method Result updateSizeConstraintSet(array $args = [])
 * @method Promise updateSizeConstraintSetAsync(array $args = [])
 * @method Result updateSqlInjectionMatchSet(array $args = [])
 * @method Promise updateSqlInjectionMatchSetAsync(array $args = [])
 * @method Result updateWebACL(array $args = [])
 * @method Promise updateWebACLAsync(array $args = [])
 * @method Result updateXssMatchSet(array $args = [])
 * @method Promise updateXssMatchSetAsync(array $args = [])
 */
class WafClient extends AwsClient {}
