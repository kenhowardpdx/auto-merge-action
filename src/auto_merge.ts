import type {PullRequestEvent} from '@octokit/webhooks-types'
import type {graphql} from '@octokit/graphql'

interface AutoMergeResponse {
  clientMutationId: null | string
  pullRequest: {
    id: string
    state: string
    autoMergeRequest: {
      enabledAt: string
      enableBy: {
        login: string
      }
    }
  }
}

interface Client {
  graphql: typeof graphql
}

export enum MergeMethod {
  MERGE = 'MERGE',
  SQUASH = 'SQUASH',
  REBASE = 'REBASE'
}

export async function enableAutoMerge(
  {pull_request: {node_id: pullRequestId}}: PullRequestEvent,
  mergeMethod: MergeMethod,
  client: Client
): Promise<AutoMergeResponse> {
  return await client.graphql(
    `
      mutation(
        $pullRequestId: ID!,
        $mergeMethod: PullRequestMergeMethod!
      ) {
        enablePullRequestAutoMerge(input: {
          pullRequestId: $pullRequestId,
          mergeMethod: $mergeMethod
        }) {
          clientMutationId
          pullRequest {
            id
            state
            autoMergeRequest {
              enabledAt
              enabledBy {
                login
              }
            }
          }
        }
      }
    `,
    {
      pullRequestId,
      mergeMethod
    }
  )
}
