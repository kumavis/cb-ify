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

  const fn = cbify(() => 42)

  fn((err, result) => {
    t.notOk(err, 'no error')
    t.equal(result, 42, 'correct result')
    t.end()
  })

})

test('sync error', (t) => {

  const fn = cbify(() => {
    throw new Error('boom!')
  })

  fn((err, result) => {
    t.ok(err, 'has error')
    t.ok(err.message.includes('boom!'), 'contains original error message')
    t.notOk(result, 'no result')
    t.end()
  })

})

test('obj', (t) => {

  const obj = cbify({
    a: async () => 'a',
    b: async () => 'b',
  })

  t.equal(typeof obj, 'object', 'returned obj')
  t.ok(obj.a, 'has child "a"')
  t.equal(typeof obj.a, 'function', 'child is fn')

  obj.a((err, result) => {
    t.notOk(err, 'no error')
    t.equal(result, 'a', 'correct result')
    t.end()
  })

})

test('obj this ref', (t) => {

  const source = {
    a: function() { return this },
  }
  const obj = cbify(source)

  obj.a((err, result) => {
    t.notOk(err, 'no error')
    t.equal(result, source, 'correct result')
    t.end()
  })

})