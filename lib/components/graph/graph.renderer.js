'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.buildGraph = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * @module Graph/renderer
                                                                                                                                                                                                                                                                   * @description
                                                                                                                                                                                                                                                                   * Offers a series of methods that isolate render logic for Graph component.
                                                                                                                                                                                                                                                                   */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _graph = require('./graph.const');

var _graph2 = _interopRequireDefault(_graph);

var _Link = require('../link/Link');

var _Link2 = _interopRequireDefault(_Link);

var _Node = require('../node/Node');

var _Node2 = _interopRequireDefault(_Node);

var _graph3 = require('./graph.helper');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Build Link components given a list of links.
 * @param  {Object.<string, Object>} nodes - same as {@link #buildGraph|nodes in buildGraph}.
 * @param  {Array.<Object>} links - array of links {@link #Link|Link}.
 * @param  {Array.<Object>} linksMatrix - array of links {@link #Link|Link}.
 * @param  {Object} config - same as {@link #buildGraph|config in buildGraph}.
 * @param  {Function[]} linkCallbacks - same as {@link #buildGraph|linkCallbacks in buildGraph}.
 * @param  {string} highlightedNode - same as {@link #buildGraph|highlightedNode in buildGraph}.
 * @param  {Object} highlightedLink - same as {@link #buildGraph|highlightedLink in buildGraph}.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @returns {Object[]} returns the generated array of Link components.
 * @memberof Graph/helper
 */
function _buildLinks(nodes, links, linksMatrix, config, linkCallbacks, highlightedNode, highlightedLink, transform) {
    return links.map(function (link) {
        var source = link.source,
            target = link.target;
        // FIXME: solve this source data inconsistency later

        var sourceId = source.id || source;
        var targetId = target.id || target;
        var key = '' + sourceId + _graph2.default.COORDS_SEPARATOR + targetId;
        var props = (0, _graph3.buildLinkProps)(_extends({}, link, { source: '' + sourceId, target: '' + targetId }), nodes, linksMatrix, config, linkCallbacks, '' + highlightedNode, highlightedLink, transform);

        return _react2.default.createElement(_Link2.default, _extends({ key: key }, props));
    });
}

/**
 * Function that builds Node components.
 * @param  {Object.<string, Object>} nodes - an object containing all nodes mapped by their id.
 * @param  {Function[]} nodeCallbacks - array of callbacks for used defined event handler for node interactions.
 * @param  {Object} config - an object containing rd3g consumer defined configurations {@link #config config} for the graph.
 * @param  {string} highlightedNode - this value contains a string that represents the some currently highlighted node.
 * @param  {Object} highlightedLink - this object contains a source and target property for a link that is highlighted at some point in time.
 * @param  {string} highlightedLink.source - id of source node for highlighted link.
 * @param  {string} highlightedLink.target - id of target node for highlighted link.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @returns {Object} returns the generated array of nodes components
 * @memberof Graph/helper
 */
function _buildNodes(nodes, nodeCallbacks, config, highlightedNode, highlightedLink, transform) {
    return Object.keys(nodes).map(function (nodeId) {
        var props = (0, _graph3.buildNodeProps)(Object.assign({}, nodes[nodeId], { id: '' + nodeId }), config, nodeCallbacks, highlightedNode, highlightedLink, transform);

        return _react2.default.createElement(_Node2.default, _extends({ key: nodeId }, props));
    });
}

/**
 * Method that actually is exported an consumed by Graph component in order to build all Nodes and Link
 * components.
 * @param  {Object.<string, Object>} nodes - an object containing all nodes mapped by their id.
 * @param  {Function[]} nodeCallbacks - array of callbacks for used defined event handler for node interactions.
 * @param  {Array.<Object>} links - array of links {@link #Link|Link}.
 * @param  {Object.<string, Object>} linksMatrix - an object containing a matrix of connections of the graph, for each nodeId,
 * there is an Object that maps adjacent nodes ids (string) and their values (number).
 * ```javascript
 *  // links example
 *  {
 *     "Androsynth": {
 *         "Chenjesu": 1,
 *         "Ilwrath": 1,
 *         "Mycon": 1,
 *         "Spathi": 1,
 *         "Umgah": 1,
 *         "VUX": 1,
 *         "Guardian": 1
 *     },
 *     "Chenjesu": {
 *         "Androsynth": 1,
 *         "Mycon": 1,
 *         "Spathi": 1,
 *         "Umgah": 1,
 *         "VUX": 1,
 *         "Broodhmome": 1
 *     },
 *     ...
 *  }
 * ```
 * @param  {Function[]} linkCallbacks - array of callbacks for used defined event handler for link interactions.
 * @param  {Object} config - an object containing rd3g consumer defined configurations {@link #config config} for the graph.
 * @param  {string} highlightedNode - this value contains a string that represents the some currently highlighted node.
 * @param  {Object} highlightedLink - this object contains a source and target property for a link that is highlighted at some point in time.
 * @param  {string} highlightedLink.source - id of source node for highlighted link.
 * @param  {string} highlightedLink.target - id of target node for highlighted link.
 * @param  {number} transform - value that indicates the amount of zoom transformation.
 * @returns {Object} returns an object containing the generated nodes and links that form the graph. The result is
 * returned in a way that can be consumed by es6 **destructuring assignment**.
 * @memberof Graph/helper
 */
function buildGraph(nodes, nodeCallbacks, links, linksMatrix, linkCallbacks, config, highlightedNode, highlightedLink, transform) {
    return {
        nodes: _buildNodes(nodes, nodeCallbacks, config, highlightedNode, highlightedLink, transform),
        links: _buildLinks(nodes, links, linksMatrix, config, linkCallbacks, highlightedNode, highlightedLink, transform)
    };
}

exports.buildGraph = buildGraph;