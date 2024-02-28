import {getInput, setFailed} from '@actions/core'
import {expect, jest, test} from '@jest/globals'
import {run} from './main'

jest.mock('@actions/core', () => ({
  info: jest.fn(),
  getInput: jest.fn(),
  setFailed: jest.fn()
}))

test('token missing', async () => {
  ;(getInput as ReturnType<typeof jest.fn>).mockImplementation(
    (key: string): string => {
      const values: {[key: string]: string} = {
        enable: 'false', // TODO: mock the github client
        merge_method: 'MERGE',
        token: ''
      }
      return values[key]
    }
  )

  expect.assertions(1)

  run()

  expect(setFailed).toHaveBeenCalledWith(
    expect.stringContaining('missing or empty')
  )
})

test('invalid merge method', async () => {
  ;(getInput as ReturnType<typeof jest.fn>).mockImplementation(
    (key: string): string => {
      const values: {[key: string]: string} = {
        enable: 'false', // TODO: mock the github client
        merge_method: 'chimichanga',
        token: 'test-token'
      }
      return values[key]
    }
  )

  expect.assertions(2)

  run()

  expect(setFailed).toHaveBeenCalledWith(
    expect.stringContaining('must be one of MERGE, SQUASH, or REBASE')
  )
  expect(setFailed).toHaveBeenCalledWith(
    expect.stringContaining("'chimichanga'")
  )
})
