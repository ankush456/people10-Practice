'use strict';

describe('The main view', function () {
  var page;

  beforeEach(function () {
    browser.get('/index.html');
  });

  describe('Home Page check',function() {
    it('should check url', function () {
      expect(browser.getCurrentUrl()).toContain("localhost");
    });
  });

});
