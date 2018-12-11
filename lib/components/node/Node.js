'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _node = require('./node.const');

var _node2 = _interopRequireDefault(_node);

var _node3 = require('./node.helper');

var _node4 = _interopRequireDefault(_node3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Node component is responsible for encapsulating node render.
 * @example
 * const onClickNode = function(nodeId) {
 *      window.alert('Clicked node', nodeId);
 * };
 *
 * const onMouseOverNode = function(nodeId) {
 *      window.alert('Mouse over node', nodeId);
 * };
 *
 * const onMouseOutNode = function(nodeId) {
 *      window.alert('Mouse out node', nodeId);
 * };
 *
 * <Node
 *     id='nodeId'
 *     cx=22
 *     cy=22
 *     fill='green'
 *     fontSize=10
 *     fontColor='black'
 *     fontWeight='normal'
 *     dx=90
 *     label='label text'
 *     opacity=1
 *     renderLabel=true
 *     size=200
 *     stroke='none'
 *     strokeWidth=1.5
 *     svg='assets/my-svg.svg'
 *     type='square'
 *     className='node'
 *     onClickNode={onClickNode}
 *     onMouseOverNode={onMouseOverNode}
 *     onMouseOutNode={onMouseOutNode} />
 */
var Node = function (_React$Component) {
    _inherits(Node, _React$Component);

    function Node() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Node);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Node.__proto__ || Object.getPrototypeOf(Node)).call.apply(_ref, [this].concat(args))), _this), _this.handleOnClickNode = function () {
            return _this.props.onClickNode && _this.props.onClickNode(_this.props.id);
        }, _this.handleOnMouseOverNode = function () {
            return _this.props.onMouseOverNode && _this.props.onMouseOverNode(_this.props.id);
        }, _this.handleOnMouseOutNode = function () {
            return _this.props.onMouseOut && _this.props.onMouseOut(_this.props.id);
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }
    /**
     * Handle click on the node.
     * @returns {undefined}
     */


    /**
     * Handle mouse over node event.
     * @returns {undefined}
     */


    /**
     * Handle mouse out node event.
     * @returns {undefined}
     */


    _createClass(Node, [{
        key: 'render',
        value: function render() {
            var nodeProps = {
                cursor: this.props.cursor,
                onClick: this.handleOnClickNode,
                onMouseOut: this.handleOnMouseOutNode,
                onMouseOver: this.handleOnMouseOverNode,
                opacity: this.props.opacity
            };

            var textProps = {
                dx: this.props.dx || _node2.default.NODE_LABEL_DX,
                dy: _node2.default.NODE_LABEL_DY,
                fill: this.props.fontColor,
                fontSize: this.props.fontSize,
                fontWeight: this.props.fontWeight,
                opacity: this.props.opacity
            };

            var size = this.props.size;
            var gtx = this.props.cx;
            var gty = this.props.cy;
            var label = void 0;
            var node = void 0;

            if (this.props.svg) {
                var height = size / 10;
                var width = size / 10;
                var tx = width / 2;
                var ty = height / 2;
                var transform = 'translate(' + tx + ',' + ty + ')';

                label = _react2.default.createElement(
                    'text',
                    _extends({}, textProps, { transform: transform }),
                    this.props.label
                );
                node = _react2.default.createElement('image', _extends({}, nodeProps, { href: this.props.svg, width: width, height: height }));

                // svg offset transform regarding svg width/height
                gtx -= tx;
                gty -= ty;
            } else {
                nodeProps.d = _node4.default.buildSvgSymbol(size, this.props.type);
                nodeProps.fill = this.props.fill;
                nodeProps.stroke = this.props.stroke;
                nodeProps.strokeWidth = this.props.strokeWidth;

                label = _react2.default.createElement(
                    'text',
                    textProps,
                    this.props.label
                );
                node = _react2.default.createElement('path', nodeProps);
            }

            var gProps = {
                className: this.props.className,
                cx: this.props.cx,
                cy: this.props.cy,
                id: this.props.id,
                transform: 'translate(' + gtx + ',' + gty + ')'
            };

            return _react2.default.createElement(
                'g',
                gProps,
                node,
                this.props.renderLabel && label
            );
        }
    }]);

    return Node;
}(_react2.default.Component);

exports.default = Node;