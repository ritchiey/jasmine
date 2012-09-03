jasmine.BondReporter = function() {
  this._generatedSpecs = [];   
};
jasmine.util.inherit(jasmine.BondReporter, jasmine.Reporter);

jasmine.BondReporter.prototype.reportSpecResults = function(spec) {   
  self = this;
  for (var i = 0; i < spec.spies_.length; i++) {   
    var spy = spec.spies_[i];       
    var functionName = spy.methodName; 
    for (var j = 0; j < spy.calls.length; j++) {
      call = spy.calls[j];
      var args = [];
      for (var k = 0; k < call.args.length; k++) {
        args.push(JSON.stringify(call.args[k]));
      }
      args = args.join(', ');
      var returnValue = JSON.stringify(call.returnValue); 
      self._generatedSpecs.push([   
        'describe(\'#'+functionName+'('+args+')\', function() {',
        '  beforeEach(function() {',
        '    // Add mocks as required here',
        '  });',
        '  it(\'returns '+ returnValue +'\', function() {',
        '    expect('+functionName+'('+args+')).toEqual('+ returnValue +');',
        '  });',
        '});',
        ].join("\n"));
    }
  }
};

jasmine.BondReporter.prototype.generatedSpecs = function() {
  return this._generatedSpecs;
}