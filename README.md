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

you can specify a context to bind to as the 2nd arg
```js
const cat = {
  name: 'speckles',
  meow: async function(){ return `my name is ${this.name}` },
}
const fn = cbify(cat.meow, cat)
fn((err, response) => console.log(response))
// => "my name is speckles"
```

also works with sync fns

```js
const fn = cbify(() => 42)

fn((err, result) => {
  if (err) throw err
  console.log(result)
})
```

for objects it will return a new obj with all fns cbify'd
and bound to the original obj or the specified context

```js
const obj = cbify({
  a: async () => 'a',
  b: async () => 'b',
})

obj.a((err, result) => {
  if (err) throw err
  console.log(result)
})
```