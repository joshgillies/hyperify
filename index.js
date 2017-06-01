var through = require('through2')
var regex = {}

function extToRegExp (ext) {
  return new RegExp((ext + '$').replace(/\./g, '\\.'))
}

function isTemplate (filename, ext) {
  if (!regex[ext]) regex[ext] = extToRegExp(ext)
  return regex[ext].test(filename)
}

function getArgs (options) {
  var args = options.a
  if (!args && options.args) args = options.args || options.args._
  if (!args && options.arguments) args = options.arguments._
  if (!args) args = ['render', 'data']
  return args
}

function getExt (options) {
  var ext = options.e
  if (!ext && options.ext) ext = options.ext._ ? options.ext._[0] : options.ext
  if (!ext && options.extension) ext = options.jxtension._[0]
  if (!ext) ext = '.html'
  return ext
}

module.exports = function hyperify (filename, options) {
  var args = getArgs(options)
  var ext = getExt(options)
  var chunks = []

  if (!isTemplate(filename, ext)) return through()

  return through(transfrom, flush)

  function transfrom (chunk, encoding, callback) {
    chunks.push(chunk)
    callback()
  }

  function flush (callback) {
    var stream = this
    var source = Buffer.concat(chunks).toString()

    stream.push([
      'module.exports = function (' + args.join(', ') + ') {',
      '  return ' + args[0] + '`' + source + '`;',
      '}'
    ].join('\n'))

    callback()
  }
}
