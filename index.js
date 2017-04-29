var through = require('through2')
var regex = {}

function extToRegExp (ext) {
  return new RegExp((ext + '$').replace(/\./g, '\\.'))
}

function isTemplate (filename, ext) {
  if (!regex[ext]) regex[ext] = extToRegExp(ext)
  return regex[ext].test(filename)
}

module.exports = function hyperify (filename, options) {
  var args = options.args || ['render', 'data']
  var ext = options.ext || '.html'
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
