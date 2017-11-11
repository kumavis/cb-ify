# cb-ify

callbackify your promise-returning fns

### usage

```js
const cbify = require('cb-ify')

const fn = cbify(async () => {
  return 42
})

fn((err, result) => {
  if (err) throw err
  console.log(result)
})
```