'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var HIGHLIGHTED = 'H';
var MARKER_SMALL_SIZE = 16;
var MARKER_MEDIUM_OFFSET = 2;
var MARKER_LARGE_OFFSET = 4;
// internal marker flavors for cross referencing
var MARKERS = {
    MARKER_S: 'marker-small',
    MARKER_SH: 'marker-small-highlighted',
    MARKER_M: 'marker-medium',
    MARKER_MH: 'marker-medium-highlighted',
    MARKER_L: 'marker-large',
    MARKER_LH: 'marker-large-highlighted'
};
// hard coded aggregation of the different sizes available for markers
var SIZES = {
    S: 'S',
    M: 'M',
    L: 'L'
};

exports.HIGHLIGHTED = HIGHLIGHTED;
exports.MARKER_LARGE_OFFSET = MARKER_LARGE_OFFSET;
exports.MARKER_MEDIUM_OFFSET = MARKER_MEDIUM_OFFSET;
exports.MARKER_SMALL_SIZE = MARKER_SMALL_SIZE;
exports.MARKERS = MARKERS;
exports.SIZES = SIZES;