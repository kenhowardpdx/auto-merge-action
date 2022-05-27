<p align="center">
  <a href="https://github.com/kenhowardpdx/auto-merge-action/actions"><img alt="auto-merge-action status" src="https://github.com/kenhowardpdx/auto-merge-action/workflows/build-test/badge.svg"></a>
</p>

# Auto Merge Action

Automatically set the `auto-merge` programmatically using
[GitHub Action Expressions][github-expressions].

## Benefits

If you are working on a project independently and you wish to use the same
development workflow you are familiar with when working with other individuals,
you may want this action.

You can set this action to auto-merge dependabot or other bot-generated pull
requests.

## Usage

1. [Enable auto-merge][github-auto-merge]
1. [Create a branch protection rule][github-branch-protection]
1. [Create a required status check][github-required-check]
  - At least one required check must be added to fully enable GitHub's
    auto-merge feature. (this action can be your required check)
1. Add `.github/workflows/auto-merge.yaml` to your repository.

## Example Workflow

```yaml

name: Enable Auto Merge
on:
  pull_request_target:
    branches:
      - main

jobs:
  auto-merge:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: kenhowardpdx/auto-merge-action@v1
        with:
          enable: ${{ github.actor == 'dependabot[bot]' }}
          merge_method: SQUASH
          token: ${{ secrets.AUTO_MERGE_TOKEN }}
```

**NOTE:** The auto-generated `$GITHUB_TOKEN` will not work in most cases if you
expect workflows to be triggered once the merge occurs. It's preferred you
generate a [personal access token][github-personal-access-token] and add it to
your [repository secrets][github-actions-secrets]. In addition, if you enable
auto-merge for dependabot, you will need to add the same secret key (preferably
a different value) to [dependabot secrets][dependabot-secrets].

## Inputs

- `enable`: An expression to determine if auto-merge should be enabled.
- `merge_method`: MERGE, SQUASH, or REBASE. Default: MERGE.
  [PullRequestMergeMethod][github-graphql-pull-request-merge-method]
- `token`: A token with repo write permissions. Default: $GITHUB_TOKEN.

## GitHub Events

While the action works on both `pull_request` and `pull_request_target`, you may
want to use `pull_request_target` which allows this action to be triggered by
pull requests from forks.

[github-auto-merge]: https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/automatically-merging-a-pull-request#enabling-auto-merge
[github-branch-protection]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/managing-a-branch-protection-rule#creating-a-branch-protection-rule
[github-dependabot-secrets]: https://docs.github.com/en/rest/dependabot/secrets
[github-expressions]: https://docs.github.com/en/actions/learn-github-actions/expressions
[github-graphql-pull-request-merge-method]: https://docs.github.com/en/graphql/reference/enums#pullrequestmergemethod
[github-personal-access-token]: https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token
[github-actions-secrets]: https://docs.github.com/en/rest/actions/secrets
[github-required-check]: https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/defining-the-mergeability-of-pull-requests/troubleshooting-required-status-checks
