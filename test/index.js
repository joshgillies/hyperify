var test = require('tape').test
var browserify = require('browserify')
var viperHTML = require('viperhtml')
var path = require('path')
var vm = require('vm')

test('default transform', function (assert) {
  var bundle = browserify()
  bundle.require(path.join(__dirname, './test.html'), {
    expose: 'bundle'
  })
  bundle.transform(path.join(__dirname, '..'))
  bundle.bundle(function (err, src) {
    assert.plan(2)
    assert.error(err)
    var context = {}
    vm.runInNewContext(src, context)
    assert.equal(
      context.require('bundle')(viperHTML.wire(), { text: 'aaa' }),
      '<div> aaa </div>'
    )
  })
})

test('use custom extension', function (assert) {
  var bundle = browserify()
  bundle.require(path.join(__dirname, './test.hyper.html'), {
    expose: 'bundle'
  })
  bundle.transform(path.join(__dirname, '..'), {
    ext: '.hyper.html'
  })
  bundle.bundle(function (err, src) {
    assert.plan(2)
    assert.error(err)
    var context = {}
    vm.runInNewContext(src, context)
    assert.equal(
      context.require('bundle')(viperHTML.wire(), { text: 'bbb' }),
      '<div> bbb </div>'
    )
  })
})

test('use custom arguments', function (assert) {
  var bundle = browserify()
  bundle.require(path.join(__dirname, './test-args.html'), {
    expose: 'bundle'
  })
  bundle.transform(path.join(__dirname, '..'), {
    args: ['render', 'text']
  })
  bundle.bundle(function (err, src) {
    assert.plan(2)
    assert.error(err)
    var context = {}
    vm.runInNewContext(src, context)
    assert.equal(
      context.require('bundle')(viperHTML.wire(), 'ccc'),
      '<div> ccc </div>'
    )
  })
})
