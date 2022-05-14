import {debug, getInput, setFailed} from '@actions/core'
import {expect, jest, test} from '@jest/globals'
import {run} from './main'

const getInputMock = jest.fn<string, []>()

jest.mock('@actions/core', () => ({
  debug: jest.fn(),
  getInput: jest.fn(),
  setFailed: jest.fn()
}))

test('enable is false', async () => {
  ;(getInput as typeof getInputMock).mockReturnValue('test-token')
  expect.assertions(1)

  run()

  expect(debug).toHaveBeenCalledWith(expect.stringContaining('skipping'))
})

test('token missing', async () => {
  ;(getInput as typeof getInputMock).mockReturnValue('')
  expect.assertions(1)

  run()

  expect(setFailed).toHaveBeenCalledWith(
    expect.stringContaining('missing or empty')
  )
})
