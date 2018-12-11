'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Drag = require('d3-drag');

var _d3Force = require('d3-force');

var _d3Selection = require('d3-selection');

var _d3Zoom = require('d3-zoom');

var _graph = require('./graph.const');

var _graph2 = _interopRequireDefault(_graph);

var _graph3 = require('./graph.config');

var _graph4 = _interopRequireDefault(_graph3);

var _err = require('../../err');

var _err2 = _interopRequireDefault(_err);

var _graph5 = require('./graph.renderer');

var graphRenderer = _interopRequireWildcard(_graph5);

var _graph6 = require('./graph.helper');

var graphHelper = _interopRequireWildcard(_graph6);

var _utils = require('../../utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Some d3 constant values
var D3_CONST = {
    FORCE_LINK_STRENGTH: 1,
    LINK_IDEAL_DISTANCE: 100,
    SIMULATION_ALPHA_TARGET: 0.05
};

/**
 * Graph component is the main component for react-d3-graph components, its interface allows its user
 * to build the graph once the user provides the data, configuration (optional) and callback interactions (also optional).
 * The code for the [live example](https://danielcaldas.github.io/react-d3-graph/sandbox/index.html)
 * can be consulted [here](https://github.com/danielcaldas/react-d3-graph/blob/master/sandbox/Sandbox.jsx)
 * @example
 * import { Graph } from 'react-d3-graph';
 *
 * // graph payload (with minimalist structure)
 * const data = {
 *     nodes: [
 *       {id: 'Harry'},
 *       {id: 'Sally'},
 *       {id: 'Alice'}
 *     ],
 *     links: [
 *         {source: 'Harry', target: 'Sally'},
 *         {source: 'Harry', target: 'Alice'},
 *     ]
 * };
 *
 * // the graph configuration, you only need to pass down properties
 * // that you want to override, otherwise default ones will be used
 * const myConfig = {
 *     nodeHighlightBehavior: true,
 *     node: {
 *         color: 'lightgreen',
 *         size: 120,
 *         highlightStrokeColor: 'blue'
 *     },
 *     link: {
 *         highlightColor: 'lightblue'
 *     }
 * };
 *
 * // graph event callbacks
 * const onClickNode = function(nodeId) {
 *      window.alert('Clicked node ${nodeId}');
 * };
 *
 * const onMouseOverNode = function(nodeId) {
 *      window.alert(`Mouse over node ${nodeId}`);
 * };
 *
 * const onMouseOutNode = function(nodeId) {
 *      window.alert(`Mouse out node ${nodeId}`);
 * };
 *
 * const onClickLink = function(source, target) {
 *      window.alert(`Clicked link between ${source} and ${target}`);
 * };
 *
 * const onMouseOverLink = function(source, target) {
 *      window.alert(`Mouse over in link between ${source} and ${target}`);
 * };
 *
 * const onMouseOutLink = function(source, target) {
 *      window.alert(`Mouse out link between ${source} and ${target}`);
 * };
 *
 * <Graph
 *      id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
 *      data={data}
 *      config={myConfig}
 *      onClickNode={onClickNode}
 *      onClickLink={onClickLink}
 *      onMouseOverNode={onMouseOverNode}
 *      onMouseOutNode={onMouseOutNode}
 *      onMouseOverLink={onMouseOverLink}
 *      onMouseOutLink={onMouseOutLink}/>
 */

var Graph = function (_React$Component) {
    _inherits(Graph, _React$Component);

    _createClass(Graph, [{
        key: '_graphForcesConfig',

        /**
         * Sets d3 tick function and configures other d3 stuff such as forces and drag events.
         * @returns {undefined}
         */
        value: function _graphForcesConfig() {
            this.state.simulation.nodes(this.state.d3Nodes).on('tick', this._tick);

            var forceLink = (0, _d3Force.forceLink)(this.state.d3Links).id(function (l) {
                return l.id;
            }).distance(D3_CONST.LINK_IDEAL_DISTANCE).strength(D3_CONST.FORCE_LINK_STRENGTH);

            this.state.simulation.force(_graph2.default.LINK_CLASS_NAME, forceLink);

            var customNodeDrag = (0, _d3Drag.drag)().on('start', this._onDragStart).on('drag', this._onDragMove).on('end', this._onDragEnd);

            (0, _d3Selection.select)('#' + this.state.id + '-' + _graph2.default.GRAPH_WRAPPER_ID).selectAll('.node').call(customNodeDrag);
        }

        /**
         * Handles d3 drag 'end' event.
         * @returns {undefined}
         */


        /**
         * Handles d3 'drag' event.
         * {@link https://github.com/d3/d3-drag/blob/master/README.md#drag_subject|more about d3 drag}
         * @param  {Object} ev - if not undefined it will contain event data.
         * @param  {number} index - index of the node that is being dragged.
         * @param  {Array.<Object>} nodeList - array of d3 nodes. This list of nodes is provided by d3, each
         * node contains all information that was previously fed by rd3g.
         * @returns {undefined}
         */


        /**
         * Handles d3 drag 'start' event.
         * @returns {undefined}
         */


        /**
         * Sets nodes and links highlighted value.
         * @param  {string} id - the id of the node to highlight.
         * @param  {boolean} [value=false] - the highlight value to be set (true or false).
         * @returns {undefined}
         */


        /**
         * The tick function simply calls React set state in order to update component and render nodes
         * along time as d3 calculates new node positioning.
         * @param {Object} state - new state to pass on.
         * @returns {undefined}
         */


        /**
         * Configures zoom upon graph with default or user provided values.<br/>
         * {@link https://github.com/d3/d3-zoom#zoom}
         * @returns {undefined}
         */


        /**
         * Handler for 'zoom' event within zoom config.
         * @returns {Object} returns the transformed elements within the svg graph area.
         */


        /**
         * Handles mouse over node event.
         * @param  {string} id - id of the node that participates in the event.
         * @returns {undefined}
         */


        /**
         * Handles mouse out node event.
         * @param  {string} id - id of the node that participates in the event.
         * @returns {undefined}
         */


        /**
         * Handles mouse over link event.
         * @param  {string} source - id of the source node that participates in the event.
         * @param  {string} target - id of the target node that participates in the event.
         * @returns {undefined}
         */


        /**
         * Handles mouse out link event.
         * @param  {string} source - id of the source node that participates in the event.
         * @param  {string} target - id of the target node that participates in the event.
         * @returns {undefined}
         */


        /**
         * Calls d3 simulation.stop().<br/>
         * {@link https://github.com/d3/d3-force#simulation_stop}
         * @returns {undefined}
         */


        /**
         * This method resets all nodes fixed positions by deleting the properties fx (fixed x)
         * and fy (fixed y). Following this, a simulation is triggered in order to force nodes to go back
         * to their original positions (or at least new positions according to the d3 force parameters).
         * @returns {undefined}
         */


        /**
         * Calls d3 simulation.restart().<br/>
         * {@link https://github.com/d3/d3-force#simulation_restart}
         * @returns {undefined}
         */

    }]);

    function Graph(props) {
        _classCallCheck(this, Graph);

        var _this = _possibleConstructorReturn(this, (Graph.__proto__ || Object.getPrototypeOf(Graph)).call(this, props));

        _this._onDragEnd = function () {
            return !_this.state.config.staticGraph && _this.state.config.automaticRearrangeAfterDropNode && _this.state.simulation.alphaTarget(D3_CONST.SIMULATION_ALPHA_TARGET).restart();
        };

        _this._onDragMove = function (ev, index, nodeList) {
            var id = nodeList[index].id;

            if (!_this.state.config.staticGraph) {
                // this is where d3 and react bind
                var draggedNode = _this.state.nodes[id];

                draggedNode.x += _d3Selection.event.dx;
                draggedNode.y += _d3Selection.event.dy;

                // set nodes fixing coords fx and fy
                draggedNode['fx'] = draggedNode.x;
                draggedNode['fy'] = draggedNode.y;

                _this._tick();
            }
        };

        _this._onDragStart = function () {
            return _this.pauseSimulation();
        };

        _this._setNodeHighlightedValue = function (id) {
            var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
            return _this._tick(graphHelper.updateNodeHighlightedValue(_this.state.nodes, _this.state.links, _this.state.config, id, value));
        };

        _this._tick = function () {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            return _this.setState(state);
        };

        _this._zoomConfig = function () {
            return (0, _d3Selection.select)('#' + _this.state.id + '-' + _graph2.default.GRAPH_WRAPPER_ID).call((0, _d3Zoom.zoom)().scaleExtent([_this.state.config.minZoom, _this.state.config.maxZoom]).on('zoom', _this._zoomed));
        };

        _this._zoomed = function () {
            var transform = _d3Selection.event.transform;

            (0, _d3Selection.selectAll)('#' + _this.state.id + '-' + _graph2.default.GRAPH_CONTAINER_ID).attr('transform', transform);

            _this.state.config.panAndZoom && _this.setState({ transform: transform.k });
        };

        _this.onMouseOverNode = function (id) {
            _this.props.onMouseOverNode && _this.props.onMouseOverNode(id);

            _this.state.config.nodeHighlightBehavior && _this._setNodeHighlightedValue(id, true);
        };

        _this.onMouseOutNode = function (id) {
            _this.props.onMouseOutNode && _this.props.onMouseOutNode(id);

            _this.state.config.nodeHighlightBehavior && _this._setNodeHighlightedValue(id, false);
        };

        _this.onMouseOverLink = function (source, target) {
            _this.props.onMouseOverLink && _this.props.onMouseOverLink(source, target);

            if (_this.state.config.linkHighlightBehavior) {
                _this.state.highlightedLink = { source: source, target: target };

                _this._tick();
            }
        };

        _this.onMouseOutLink = function (source, target) {
            _this.props.onMouseOutLink && _this.props.onMouseOutLink(source, target);

            if (_this.state.config.linkHighlightBehavior) {
                _this.state.highlightedLink = undefined;

                _this._tick();
            }
        };

        _this.pauseSimulation = function () {
            return _this.state.simulation.stop();
        };

        _this.resetNodesPositions = function () {
            if (!_this.state.config.staticGraph) {
                for (var nodeId in _this.state.nodes) {
                    var node = _this.state.nodes[nodeId];

                    if (node.fx && node.fy) {
                        Reflect.deleteProperty(node, 'fx');
                        Reflect.deleteProperty(node, 'fy');
                    }
                }

                _this.state.simulation.alphaTarget(D3_CONST.SIMULATION_ALPHA_TARGET).restart();

                _this._tick();
            }
        };

        _this.restartSimulation = function () {
            return !_this.state.config.staticGraph && _this.state.simulation.restart();
        };

        if (!_this.props.id) {
            _utils2.default.throwErr(_this.constructor.name, _err2.default.GRAPH_NO_ID_PROP);
        }

        _this.state = graphHelper.initializeGraphState(_this.props, _this.state);
        return _this;
    }

    _createClass(Graph, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var newGraphElements = nextProps.data.nodes.length !== this.state.nodesInputSnapshot.length || nextProps.data.links.length !== this.state.linksInputSnapshot.length || !_utils2.default.isDeepEqual(nextProps.data, {
                nodes: this.state.nodesInputSnapshot,
                links: this.state.linksInputSnapshot
            });
            var configUpdated = !_utils2.default.isObjectEmpty(nextProps.config) && !_utils2.default.isDeepEqual(nextProps.config, this.state.config);
            var state = newGraphElements ? graphHelper.initializeGraphState(nextProps, this.state) : this.state;
            var config = configUpdated ? _utils2.default.merge(_graph4.default, nextProps.config || {}) : this.state.config;

            // in order to properly update graph data we need to pause eventual d3 ongoing animations
            newGraphElements && this.pauseSimulation();

            var transform = nextProps.config.panAndZoom !== this.state.config.panAndZoom ? 1 : this.state.transform;

            this.setState(_extends({}, state, {
                config: config,
                newGraphElements: newGraphElements,
                configUpdated: configUpdated,
                transform: transform
            }));
        }
    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            // if the property staticGraph was activated we want to stop possible ongoing simulation
            this.state.config.staticGraph && this.pauseSimulation();

            if (!this.state.config.staticGraph && this.state.newGraphElements) {
                this._graphForcesConfig();
                this.restartSimulation();
                this.setState({ newGraphElements: false });
            }

            if (this.state.configUpdated) {
                this._zoomConfig();
                this.setState({ configUpdated: false });
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (!this.state.config.staticGraph) {
                this._graphForcesConfig();
            }

            // graph zoom and drag&drop all network
            this._zoomConfig();
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            this.pauseSimulation();
        }
    }, {
        key: 'render',
        value: function render() {
            var _graphRenderer$buildG = graphRenderer.buildGraph(this.state.nodes, {
                onClickNode: this.props.onClickNode,
                onMouseOverNode: this.onMouseOverNode,
                onMouseOut: this.onMouseOutNode
            }, this.state.d3Links, this.state.links, {
                onClickLink: this.props.onClickLink,
                onMouseOverLink: this.onMouseOverLink,
                onMouseOutLink: this.onMouseOutLink
            }, this.state.config, this.state.highlightedNode, this.state.highlightedLink, this.state.transform),
                nodes = _graphRenderer$buildG.nodes,
                links = _graphRenderer$buildG.links;

            var svgStyle = {
                height: this.state.config.height,
                width: this.state.config.width
            };

            return _react2.default.createElement(
                'div',
                { id: this.state.id + '-' + _graph2.default.GRAPH_WRAPPER_ID },
                _react2.default.createElement(
                    'svg',
                    { style: svgStyle },
                    _react2.default.createElement(
                        'g',
                        { id: this.state.id + '-' + _graph2.default.GRAPH_CONTAINER_ID },
                        links,
                        nodes
                    )
                )
            );
        }
    }]);

    return Graph;
}(_react2.default.Component);

exports.default = Graph;