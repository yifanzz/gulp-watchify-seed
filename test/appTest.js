var expect = require('expect.js')
var app = require('../public/js/app.js')

describe('app', function(){
  describe('#hello', function(){
    it('should return "hello"', function(){ 
      expect(app.hello()).to.be('hello') 
    })
  })
})