'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _const = require('../../const');

var _const2 = _interopRequireDefault(_const);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({
    COORDS_SEPARATOR: ',',
    FORCE_IDEAL_STRENGTH: -100, // TODO: Expose as configurable,
    FORCE_X: 0.06,
    FORCE_Y: 0.06,
    GRAPH_CONTAINER_ID: 'graph-container-zoomable',
    GRAPH_WRAPPER_ID: 'graph-wrapper',
    KEYWORDS: {
        SAME: 'SAME'
    },
    LINK_CLASS_NAME: 'link',
    NODE_CLASS_NAME: 'node'
}, _const2.default);