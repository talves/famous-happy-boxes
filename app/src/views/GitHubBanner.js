define(function(require, exports, module) {
  var View = require('famous/core/View');
  var Surface = require('famous/core/Surface');
  var Modifier = require('famous/core/Modifier');
  var Transform = require('famous/core/Transform');

  function _addSurfaces() {

    var rotateModifier = new Modifier({
      origin: [0.5, -1],
      align: [1, 0]
    });
    rotateModifier.setTransform(Transform.rotateZ(Math.PI / 4));
    var surface = new Surface({
      size: [400, this._githubHeight],
      content: '<a target="' + this._githubTarget + '" href="https://github.com/' + this._githubAccount + '/' + this._githubRepoName + '" >' + this._githubMessage + '</a>',
      classes: ['github-banner'],
      properties: {
        backgroundColor: this._githubBackgroundColor,
        lineHeight: this._githubHeight + 'px',
        textAlign: 'center'
      }
    });
    this.add(rotateModifier).add(surface);
  }

  function GitHubBanner(options) {
    this._githubAccount = options.account || '';
    this._githubRepoName = options.repo || '';
    this._githubMessage = options.message || '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Fork me on GitHub&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';
    this._githubTarget = options.target || '_blank';
    this._githubBackgroundColor = options.backgroundColor || 'rgba(40,40,40,0.6)';
    this._githubHeight = options.height || 40;
    View.apply(this, arguments);

    _addSurfaces.call(this);
  }

  GitHubBanner.prototype = Object.create(View.prototype);
  GitHubBanner.prototype.constructor = GitHubBanner;

  module.exports = GitHubBanner;
});
