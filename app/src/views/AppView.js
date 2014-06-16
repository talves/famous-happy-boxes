define(function(require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var ImageSurface = require('famous/surfaces/ImageSurface');
  var Modifier = require('famous/core/Modifier');
  var Draggable = require('famous/modifiers/Draggable');
  var PhysicsEngine = require('famous/physics/PhysicsEngine');
  var Circle = require('famous/physics/bodies/Circle');
  var Force = require('famous/physics/forces/Force');
  var Collision = require('famous/physics/constraints/Collision');
  var Wall = require('famous/physics/constraints/Wall');
  var GitHubBanner = require('adarta/widgets/GitHubBanner');

  var Random = require('famous/math/Random');

  // Play with this Number
  var numBodies = 25;

  var gravity = new Force([0, 0.0015, 0]);

  var b1;
  var b2;
  var ceiling = new Wall({normal: [0, 1, 0], distance: 300, restitution: 0});
  var floor = new Wall({normal: [0, -1, 0], distance: 300, restitution: 0});
  var left = new Wall({normal: [1, 0, 0], distance: 350, restitution: 0});
  var right = new Wall({normal: [-1, 0, 0], distance: 350, restitution: 0});

  function _initialize() {
    this.pe = new PhysicsEngine();
    this.moleculeBodies = [];
    this.collision = new Collision({restitution: 0});
  }

  function _addHeader() {
    var banner = new GitHubBanner({
      size: [400, 40],
      message: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fork me on GitHub&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
      account: 'talves',
      repo: 'famous-happy-boxes',
      position: GitHubBanner.POSITION.RIGHT_TOP,
      classes: ['github-banner']
    });
    this.add(banner);

    var headerModifier = new Modifier({
      origin: [1, 0]
    });
    var header = new Surface({
      size: [undefined, 40],
      properties: {
        backgroundColor: 'rgba(0,0,0,0.4)',
        textAlign: 'center'
      }
    });
    header.setContent('Drag the square box around to put objects in motion!');
    this.add(headerModifier).add(header);
  }
  function addBodyTransform() {
    gravity.applyForce(this);
    return this.getTransform();
  }

  function _addMolecules() {
    for (var i = 0; i < numBodies; i++) {

      // Play with this range
      var radius = Random.integer(20, 60);

//      var molecule = new Surface({
//        size: [radius * 2, radius * 2],
//        properties: {
//          //borderRadius: radius + 'px',
//          backgroundColor: 'rgba(0,0,0,0.4)'
//        }
//      });
//
      var molecule = new ImageSurface({
        size: [radius * 2, radius * 2]
      });
      if (Random.integer(0, 1)) {
        molecule.setContent('content/images/3alves_logo.png');
      }
      else
      {
        molecule.setContent('content/images/famous_logo.png');
      }

      molecule.body = new Circle({
        radius: radius,
        mass: 2
      });

      this.pe.addBody(molecule.body);

      this.moleculeBodies.push(molecule.body);

      molecule.state = new Modifier({origin: [0.5, 0.5]});
      molecule.state.transformFrom(addBodyTransform.bind(molecule.body));

      this._add(molecule.state).add(molecule);

    }
  }

  function _addCollisions() {

    for (var i = 0; i < this.moleculeBodies.length; i++) {
      b1 = this.moleculeBodies[i];
      if ((i + 1) < this.moleculeBodies.length) {
        for (var j = i + 1; j < this.moleculeBodies.length; j++) {
          b2 = this.moleculeBodies[j];
          this.pe.attach(this.collision, b1, b2);
        }
      }
    }
    this.pe.attach([right, left, floor, ceiling], this.moleculeBodies);
  }

  function _addDragger() {
    this.dragger = new Surface({
      size: [60, 60],
      properties: {
        border: '2px solid red',
        backgroundColor: 'rgba(0,0,0,0.4)'
      }
    });

    this.dragger.body = new Circle({
      radius: 42,
      mass: 5
    });

    this.pe.addBody(this.dragger.body);

    this.dragger.state = new Modifier({origin: [0.5, 0.5]});

    this.dragger.draggable = new Draggable();
    this.dragger.pipe(this.dragger.draggable);
    this.dragger.draggable.pipe(this._eventOutput);
    this.on('update', this.updatePosition);

    this.pe.attach(this.collision, this.moleculeBodies, this.dragger.body);

    this._add(this.dragger.state).add(this.dragger.draggable).add(this.dragger);
  }

  function AppView(options) {
    View.apply(this, arguments);

    _initialize.call(this);
    _addMolecules.call(this);
    _addCollisions.call(this);
    _addDragger.call(this);
    _addHeader.call(this);
  }

  AppView.prototype = Object.create(View.prototype);
  AppView.prototype.constructor = AppView;

  AppView.prototype.updatePosition = function() {
    if (!this.dragger)
      return;
    var pos = this.dragger.draggable.getPosition();
    this.dragger.body.setPosition([pos[0], pos[1]]);
  };

  module.exports = AppView;

});
