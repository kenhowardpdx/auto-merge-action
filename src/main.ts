import {MergeMethod, enableAutoMerge} from './auto_merge'
import {context, getOctokit} from '@actions/github'
import {debug, getInput, info, setFailed} from '@actions/core'
import type {PullRequestEvent} from '@octokit/webhooks-types'

export async function run(): Promise<void> {
  try {
    const enable = Boolean(getInput('enable') === 'true')
    const token = getInput('token')
    const mergeMethod = getInput('merge_method') as MergeMethod

    if (!['MERGE', 'SQUASH', 'REBASE'].includes(mergeMethod)) {
      throw new Error(
        `required field 'merge_method' has incorrect value of '${mergeMethod}'` +
          ` - must be one of MERGE, SQUASH, or REBASE`
      )
    }

    if (!token) {
      throw new Error("required field 'token' missing or empty")
    }

    if (!enable) {
      debug("'enable' evaluated to 'false', skipping")
      return
    }
    const client = getOctokit(token)
    const {payload} = context
    debug('making request to GitHub')
    const data = await enableAutoMerge(
      payload as PullRequestEvent,
      mergeMethod,
      client
    )
    debug(`GitHub response:\n${JSON.stringify(data, null, 2)}`)
    info('auto-merge enabled')
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}

run()
