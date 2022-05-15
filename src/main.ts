import {MergeMethod, enableAutoMerge} from './auto_merge'
import {context, getOctokit} from '@actions/github'
import {debug, getInput, setFailed} from '@actions/core'
import type {PullRequestEvent} from '@octokit/webhooks-types'

export async function run(): Promise<void> {
  try {
    const enable = Boolean(getInput('enable') === 'true')
    const token = getInput('token')

    if (!token) {
      throw new Error("required field 'token' missing or empty")
    }

    if (!enable) {
      debug("enable evaluated to 'false', skipping")
    }
    const client = getOctokit(token)
    const {payload} = context
    debug('making request to GitHub')
    const data = enableAutoMerge(
      payload as PullRequestEvent,
      MergeMethod.MERGE,
      client
    )
    debug(`GitHub response:\n${JSON.stringify(data, null, 2)}`)
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}

run()
