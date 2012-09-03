describe('jasmine.BondReporter', function() {
  describe('for a spec which invokes a spy', function () {   
    
    var reporter, env, suite; 
    
    beforeEach(function() {
      env = new jasmine.Env();
      env.updateInterval = 0;

      suite = env.describe("top-level suite", function() {
        
        spec = env.it('should be possible to return a specific value', function() {
          var originalFunctionWasCalled = false;
          var TestClass = {
            someFunction: function() {
              originalFunctionWasCalled = true;
              return "return value from original function";
            }
          };

          this.spyOn(TestClass, 'someFunction').andReturn("stubbed return value");
          originalFunctionWasCalled = false;
          var result = TestClass.someFunction('arg1', 'arg2');
          expect(result).toEqual("stubbed return value");
          expect(originalFunctionWasCalled).toEqual(false);
        });
        
        
      });

      reporter = new jasmine.BondReporter();
      env.addReporter(reporter);      
      var runner = env.currentRunner();
      runner.execute();
    });
                
    it("should generate a spec for the spied on function", function() {
      expect(reporter.generatedSpecs()[0]).toEqual(
        [   
        'describe(\'#someFunction("arg1", "arg2")\', function() {',
        '  beforeEach(function() {',
        '    // Add mocks as required here',
        '  });',
        '  it(\'returns "stubbed return value"\', function() {',
        '    expect(someFunction("arg1", "arg2")).toEqual("stubbed return value");',
        '  });',
        '});',
        ].join("\n")
        );      
    });  
      
    // TODO: Expect it to report on spies
    // TODO: Expect it to track the spy specs
    
  });
});