const test = require('tape')
const cbify = require('../')

test('basic', (t) => {

  const fn = cbify(async () => {
    return 42
  })

  fn((err, result) => {
    t.notOk(err, 'no error')
    t.equals(result, 42, 'correct result')
    t.end()
  })

})

test('timeout', (t) => {

  const fn = cbify(() => {
    return new Promise(setTimeout)
  })

  fn((err, result) => {
    t.notOk(err, 'no error')
    t.equals(result, undefined, 'correct result')
    t.end()
  })

})


test('error', (t) => {

  const fn = cbify(async () => {
    throw new Error('boom!')
  })

  fn((err, result) => {
    t.ok(err, 'has error')
    t.ok(err.message.includes('boom!'), 'contains original error message')
    t.notOk(result, 'no result')
    t.end()
  })

})

test('sync fn', (t) => {

  const fn = cbify(() => {})

  fn((err, result) => {
    t.ok(err, 'has error')
    t.ok(err.message.includes('did not return a promise'), 'contains relevant error message')
    t.notOk(result, 'no result')
    t.end()
  })

})