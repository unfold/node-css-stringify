
/**
 * Module dependencies.
 */

var stringify = require('..')
  , parse = require('css-parse')
  , fs = require('fs')
  , path = require('path')
  , read = fs.readFileSync
  , readdir = fs.readdirSync;

describe('stringify(obj)', function(){
  readdir('test/cases').forEach(function(file){
    var compress = ~file.indexOf('compress');
    if (~file.indexOf('json')) return;
    file = path.basename(file, '.css');
    it('should stringify ' + file, function(){
      var css = read(path.join('test', 'cases', file + '.css'), 'utf8');
      if (compress) file = file.replace('.compress', '');
      var json = read(path.join('test', 'cases', file + '.json'), 'utf8');
      var ret = stringify(parse(css), { compress: compress });
      ret.should.equal(css);
    })
  });
})