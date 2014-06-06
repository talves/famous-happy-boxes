/* globals define */
define(function(require, exports, module) {
  'use strict';
  // import dependencies
  var Engine = require('famous/core/Engine');
  var AppView = require('views/AppView');
  require('famous/inputs/FastClick');

  var mainContext = Engine.createContext();

  var appView = new AppView();

Engine.on('prerender', function() {
  //appView.updatePosition();
});

  mainContext.add(appView);
});
