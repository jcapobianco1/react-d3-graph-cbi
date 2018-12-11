'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _d3Shape = require('d3-shape');

var _node = require('./node.const');

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Converts a string that specifies a symbol into a concrete instance
 * of d3 symbol.<br/>
 * {@link https://github.com/d3/d3-shape/blob/master/README.md#symbol}
 * @param  {string} typeName - the string that specifies the symbol type (should be one of {@link #node-symbol-type|node.symbolType}).
 * @returns {Object} concrete instance of d3 symbol (defaults to circle).
 * @memberof Node/helper
 */
/**
 * @module Node/helper
 * @description
 * Some methods that help no the process of rendering a node.
 */
function _convertTypeToD3Symbol(typeName) {
    switch (typeName) {
        case _node2.default.SYMBOLS.CIRCLE:
            return _d3Shape.symbolCircle;
        case _node2.default.SYMBOLS.CROSS:
            return _d3Shape.symbolCross;
        case _node2.default.SYMBOLS.DIAMOND:
            return _d3Shape.symbolDiamond;
        case _node2.default.SYMBOLS.SQUARE:
            return _d3Shape.symbolSquare;
        case _node2.default.SYMBOLS.STAR:
            return _d3Shape.symbolStar;
        case _node2.default.SYMBOLS.TRIANGLE:
            return _d3Shape.symbolTriangle;
        case _node2.default.SYMBOLS.WYE:
            return _d3Shape.symbolWye;
        default:
            return _d3Shape.symbolCircle;
    }
}

/**
 * Build a d3 svg symbol based on passed symbol and symbol type.
 * @param  {number} [size=80] - the size of the symbol.
 * @param  {string} [symbolTypeDesc='circle'] - the string containing the type of symbol that we want to build
 * (should be one of {@link #node-symbol-type|node.symbolType}).
 * @returns {Object} concrete instance of d3 symbol.
 * @memberof Node/helper
 */
function buildSvgSymbol() {
    var size = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _node2.default.DEFAULT_NODE_SIZE;
    var symbolTypeDesc = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : _node2.default.SYMBOLS.CIRCLE;

    return (0, _d3Shape.symbol)().size(function () {
        return size;
    }).type(function () {
        return _convertTypeToD3Symbol(symbolTypeDesc);
    })();
}

exports.default = {
    buildSvgSymbol: buildSvgSymbol
};