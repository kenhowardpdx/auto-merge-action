import * as core from '@actions/core'

export async function run(): Promise<void> {
  try {
    const enable = Boolean(core.getInput('enable') === 'true')
    const token = core.getInput('token')

    if (!token) {
      throw new Error("required field 'token' missing or empty")
    }

    if (!enable) {
      core.debug("enable evaluated to 'false', skipping")
    }
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
