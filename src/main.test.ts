import {run} from './main'
import {expect, test, jest} from '@jest/globals'
import {debug, getInput, setFailed} from '@actions/core'
jest.mock('@actions/core', () => ({
  debug: jest.fn(),
  getInput: jest.fn(),
  setFailed: jest.fn()
}))

test('enable is false', async () => {
  ;(getInput as any).mockReturnValue('test-token')
  expect.assertions(1)

  run()

  expect(debug).toHaveBeenCalledWith(expect.stringContaining('skipping'))
})

test('token missing', async () => {
  ;(getInput as any).mockReturnValue('')
  expect.assertions(1)

  run()

  expect(setFailed).toHaveBeenCalledWith(
    expect.stringContaining('missing or empty')
  )
})
