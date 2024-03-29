import type {PullRequestEvent} from '@octokit/webhooks-types'
import type {getOctokit} from '@actions/github'

type Client = ReturnType<typeof getOctokit>

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

export type MergeMethod = 'MERGE' | 'SQUASH' | 'REBASE'

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
