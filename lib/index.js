'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _keyframe = require('keyframe');

var _keyframe2 = _interopRequireDefault(_keyframe);

var _popmotion = require('popmotion');

var _util = require('./util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createExpoIn = _popmotion.easing.createExpoIn;
var pipe = _popmotion.transform.pipe;

var strongerEaseIn = createExpoIn(50);

var getBox = function getBox(elm) {
  var box = elm.getBoundingClientRect();
  return {
    top: box.top + window.scrollY,
    left: box.left + window.scrollX,
    width: box.width,
    height: box.height
  };
};

var fadeOutTween = function fadeOutTween(_ref) {
  var element = _ref.element,
      _ref$options = _ref.options,
      options = _ref$options === undefined ? {} : _ref$options;
  return (0, _popmotion.tween)(Object.assign({
    from: 1,
    to: 0,
    ease: _popmotion.easing.linear
  }, options)).start(function (v) {
    element.style.opacity = v;
    if (v === 1) element.style.pointerEvents = 'all';
  });
};

var fadeInTween = function fadeInTween(_ref2) {
  var element = _ref2.element,
      _ref2$options = _ref2.options,
      options = _ref2$options === undefined ? {} : _ref2$options;
  return (0, _popmotion.keyframes)(Object.assign({
    values: [{ opacity: 0 }, { opacity: 1 }],
    easings: _popmotion.easing.linear,
    times: [0.8, 1]
  }, options)).start(function (style) {
    var styler = (0, _popmotion.css)(element);

    styler.set(style);

    if (style.opacity === 1) element.style.pointerEvents = 'all';
  }).pause();
};

var hideTween = function hideTween(_ref3) {
  var element = _ref3.element,
      _ref3$options = _ref3.options,
      options = _ref3$options === undefined ? {} : _ref3$options;
  return {
    seek: pipe(Math.round, function (t) {
      element.style.visibility = t > 0 ? 'hidden' : 'visible';
    })
  };
};

var hide = function hide(styler) {
  return function (t) {
    return styler.set({
      opacity: t,
      visibility: t > 0 ? 'visible' : 'hidden'
    });
  };
};

var diffRect = function diffRect(a, b) {
  return {
    translateY: a.top - b.top,
    translateX: a.left - b.left,
    scaleY: a.height / b.height,
    scaleX: a.width / b.width
  };
};

var Morph = function (_Component) {
  _inherits(Morph, _Component);

  function Morph() {
    var _ref4;

    var _temp, _this, _ret;

    _classCallCheck(this, Morph);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref4 = Morph.__proto__ || Object.getPrototypeOf(Morph)).call.apply(_ref4, [this].concat(args))), _this), _this.elementFrom = {}, _this.elementTo = {}, _this.hideElements = [], _this.fadeInElements = [], _this.fadeOutElements = [], _this.isPlaying = false, _this.timeline = [], _this.hide = function (options) {
      return {
        ref: function ref(elm) {
          var element = elm;
          _this.hideElements.push({ element: element, options: options });
        }
      };
    }, _this.progress = (0, _popmotion.value)(0, _this.seek), _this.fadeIn = function (options) {
      return {
        ref: function ref(elm) {
          var element = elm;
          element.style.willChange = 'opacity';
          element.style.pointerEvents = 'none';
          element.style.opacity = 0;
          _this.fadeInElements.push({ element: element, options: options });
        }
      };
    }, _this.fadeOut = function (options) {
      return {
        ref: function ref(elm) {
          var element = elm;
          element.style.willChange = 'opacity';
          _this.fadeOutElements.push({ element: element, options: options });
        }
      };
    }, _this.from = function (key, options) {
      return {
        ref: function ref(elm) {
          var element = elm;
          element.style.willChange = 'transform';
          _this.elementFrom[key] = { element: element, options: options };
        }
      };
    }, _this.to = function (key, options) {
      return {
        ref: function ref(elm) {
          var element = elm;
          element.style.visibility = 'hidden';
          element.style.opacity = 0;
          element.style.willChange = 'transform';
          _this.elementTo[key] = { element: element, options: options };
        }
      };
    }, _this.go = function (to) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!_this.timeline.length) {
        _this.init(to);
        return;
      }

      (0, _popmotion.spring)(Object.assign({
        from: _this.progress.get(),
        to: to
      }, _this.props.spring, options)).start(function (x) {
        _this.progress.update(x);
        _this.seek(x);
      });
    }, _this.seek = function (t) {
      _this.timeline.forEach(function (x) {
        return x.seek(t);
      });
    }, _this.morph = function (key) {
      var _this$elementFrom$key = _this.elementFrom[key],
          original = _this$elementFrom$key.element,
          _this$elementFrom$key2 = _this$elementFrom$key.options;
      _this$elementFrom$key2 = _this$elementFrom$key2 === undefined ? {} : _this$elementFrom$key2;

      var zIndex = _this$elementFrom$key2.zIndex,
          _this$elementFrom$key3 = _this$elementFrom$key2.easing,
          optEasing = _this$elementFrom$key3 === undefined ? function (x) {
        return x;
      } : _this$elementFrom$key3,
          options = _objectWithoutProperties(_this$elementFrom$key2, ['zIndex', 'easing']);

      var target = _this.elementTo[key].element;


      var originalRect = getBox(original);
      var targetRect = getBox(target);
      var originalCloneContainer = document.createElement('div');
      var originalClone = original.cloneNode(true);

      originalCloneContainer.appendChild(originalClone);

      var originalStyler = (0, _popmotion.css)(original);
      var cloneStyler = (0, _popmotion.css)(originalCloneContainer);
      var targetStyler = (0, _popmotion.css)(target);

      // originalStyler.set({ color: 'red' });
      // cloneStyler.set({ color: 'green' });
      // targetStyler.set({ color: 'blue' });

      cloneStyler.set(Object.assign({
        position: 'absolute',
        transformOrigin: 'top left',
        pointerEvents: 'none'
      }, originalRect, {
        zIndex: zIndex
      }));
      targetStyler.set({
        'transform-origin': 'top left',
        visibility: 'visible'
      });

      document.body.appendChild(originalCloneContainer);

      var diffStyle = diffRect(targetRect, originalRect);

      var cloneTranslateIn = (0, _util.interpolateObject)({ translateX: 0, translateY: 0, scaleX: 1, scaleY: 1 }, diffStyle);

      var diffTargetStyles = diffRect(originalRect, targetRect);
      var targetTranslateFLIP = (0, _util.interpolateObject)(diffTargetStyles, {
        translateX: 0,
        translateY: 0,
        scaleX: 1,
        scaleY: 1
      });

      _this.timeline.push(
      // In and out track.
      {
        seek: (0, _keyframe2.default)({
          0.1: function _(t) {
            hide(originalStyler)(1 - t);
          },

          30: function _() {},

          100: function _(t) {
            hide(cloneStyler)(1 - t);
          }
        })
      },
      // Full track.
      {
        seek: (0, _keyframe2.default)({
          100: function _(t) {
            pipe(optEasing, cloneTranslateIn, cloneStyler.set)(t);
            pipe(optEasing, targetTranslateFLIP, targetStyler.set)(t);
          }
        })
      },
      // Half way.
      {
        seek: (0, _keyframe2.default)({
          0.01: function _(t) {
            hide(cloneStyler)(t);
          },
          30: function _(t) {
            return hide(targetStyler)(t);
          }
        })
      });

      _this.isPlaying = true;
    }, _this.init = function () {
      if (_this.timeline.length) return;

      Object.keys(_this.elementFrom).forEach(_this.morph);

      var fadeOuts = _this.fadeOutElements.map(fadeOutTween);
      var fadeIns = _this.fadeInElements.map(fadeInTween);
      var hidesIns = _this.hideElements.map(hideTween);

      _this.timeline = [].concat(_toConsumableArray(fadeOuts), _toConsumableArray(fadeIns), _toConsumableArray(hidesIns), _toConsumableArray(_this.timeline));

      _this.go(1);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  /* eslint-disable max-statements */


  _createClass(Morph, [{
    key: 'render',
    value: function render() {
      var renderedChildren = this.props.children({
        from: this.from,
        to: this.to,

        fadeIn: this.fadeIn,
        fadeOut: this.fadeOut,

        back: this.back,
        seek: this.seek,
        go: this.go,

        progress: this.progress,

        hide: this.hide,
        init: this.init
      });

      return renderedChildren && _react2.default.Children.only(renderedChildren);
    }
  }]);

  return Morph;
}(_react.Component);

Morph.propTypes = {
  children: _propTypes2.default.func.isRequired,
  spring: _propTypes2.default.shape({
    stiffness: _propTypes2.default.number.isRequired,
    mass: _propTypes2.default.number.isRequired,
    damping: _propTypes2.default.number.isRequired
  })
};
Morph.defaultProps = {
  spring: {
    stiffness: 500,
    mass: 5,
    damping: 300
  }
};
exports.default = Morph;
//# sourceMappingURL=index.js.map