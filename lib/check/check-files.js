'use strict'

var fs = require('fs')
var path = require('path')

module.exports = checkIfReferencedFilesExist

function checkIfReferencedFilesExist(ctx, next) {
  var landmarks = ctx.landmarks
  var references = ctx.references
  var filePaths = []
  var filePath
  var actual = 0
  var expected

  for (filePath in references) {
    if (landmarks[filePath] === undefined) {
      filePaths.push(filePath)
    }
  }

  expected = filePaths.length

  if (expected === 0) {
    next()
  } else {
    filePaths.forEach(checkIfExists)
  }

  function checkIfExists(filePath) {
    fs.stat(filePath, onstat)

    function onstat(err, stat) {
      // Inverted error check to avoid having to negate it everywhere it's used
      var foundPath = !err || err.code !== 'ENOENT'

      // If this is a directory and an anchor was referenced in it,
      // look for a readme inside
      if (
        foundPath &&
        stat.isDirectory() &&
        Object.keys(references[filePath]).length > 1
      ) {
        fs.readdir(filePath, function(err, files) {
          var readmePath = null

          if (!err) {
            var i
            for (i = 0; i < files.length; i++) {
              if (/^readme.md$/i.test(files[i])) {
                // Readme file found
                readmePath = path.join(filePath, files[i])
                break
              }
            }
          }

          // If a readme was found, recursively apply the check function to it
          if (readmePath) {
            expected++
            checkIfExists(readmePath)
          }

          landmarks[filePath] = {'': !!readmePath}

          if (++actual === expected) {
            next()
          }
        })
      } else {
        landmarks[filePath] = {'': foundPath}

        if (++actual === expected) {
          next()
        }
      }
    }
  }
}
