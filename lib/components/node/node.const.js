'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graph = require('../graph/graph.config');

var _graph2 = _interopRequireDefault(_graph);

var _const = require('../../const');

var _const2 = _interopRequireDefault(_const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({
    ARC: {
        START_ANGLE: 0,
        END_ANGLE: 2 * Math.PI
    },
    DEFAULT_NODE_SIZE: _graph2.default.node.size,
    NODE_LABEL_DX: '.90em',
    NODE_LABEL_DY: '.35em'
}, _const2.default);