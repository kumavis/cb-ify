const promiseToCallback = require('promise-to-callback')
const fallbackCallback = function (err) { throw new Error('cbify - callback was not specified and an error was encountered:\n' + err.stack) }

module.exports = function cbify (fn, context) {
  return function () {
    const args = [].slice.call(arguments)
    const lastArg = args[args.length - 1]
    const lastArgIsCallback = typeof lastArg === 'function'
    let callback
    if (lastArgIsCallback) {
      callback = lastArg
      args.pop()
    } else {
      callback = fallbackCallback
    }
    let promise
    try {
      const maybePromise = fn.apply(context, args)
      promise = isPromise(maybePromise) ? maybePromise : Promise.resolve(maybePromise)
    } catch (err) {
      promise = Promise.reject(err)
    }
    promiseToCallback(promise)(callback)
  }
}

function isPromise(maybePromise) {
  return maybePromise && maybePromise.then && maybePromise.catch
}