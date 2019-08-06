'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _style = require('ol/style.js');

var _proj = require('ol/proj');

var _interaction = require('ol/interaction.js');

var _mapUtils = require('./mapUtils.js');

var _mapUtils2 = _interopRequireDefault(_mapUtils);

var _OpenLayersMap2 = require('./OpenLayersMap.js');

var _OpenLayersMap3 = _interopRequireDefault(_OpenLayersMap2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OpenLayersSearchMap = function (_OpenLayersMap) {
  _inherits(OpenLayersSearchMap, _OpenLayersMap);

  function OpenLayersSearchMap(props) {
    _classCallCheck(this, OpenLayersSearchMap);

    var _this = _possibleConstructorReturn(this, _OpenLayersMap.call(this, props));

    _this.createClusterMarker = function (feature) {
      var radius = 10;
      var count = 0;
      var countLength = 0;
      var lineDash = [5];
      var strokeWidth = 2;

      if (feature.get('count')) {
        count = feature.get('count');
        countLength = count.toString().length;
        radius = 10 + (countLength > 1 ? (countLength - 1) * 5 : 0);
      }

      if (count === 1) {
        radius = 5;
        strokeWidth = 1;
        lineDash = [];
      }

      var countValue = count > 1 ? count.toString() : '';
      var styles = [];
      var color = feature.getProperties()['color'];
      if (color) {
        if (count === 1) {
          styles = [new _style.Style({
            image: new _style.Circle({
              radius: radius,
              fill: new _style.Fill({ color: color }),
              stroke: new _style.Stroke({
                color: 'black',
                width: strokeWidth,
                lineDash: lineDash
              })
            }),
            text: _this.createClusterTextStyle(countValue)
          })];
        } else {
          styles = [new _style.Style({
            image: new _style.Circle({
              radius: radius + 8,
              fill: new _style.Fill({ color: color }),
              stroke: new _style.Stroke({
                color: 'black',
                width: strokeWidth,
                lineDash: lineDash
              })
            })
          }), new _style.Style({
            image: new _style.Circle({
              radius: radius,
              fill: new _style.Fill({ color: '#cce0ff' }),
              stroke: new _style.Stroke({
                color: 'black',
                width: strokeWidth,
                lineDash: lineDash
              })
            }),
            text: _this.createClusterTextStyle(countValue)
          })];
        }
      } else {
        styles = [_this.state.geoStyles[feature.getGeometry().getType()]];
      }

      return styles;
    };

    _this.handleShowMap = function () {
      _this.setState({ showMap: !_this.state.showMap });
    };

    var mapId = _this.getMapId();
    _this.state = {
      geoJsonData: _this.getJsonData(),
      mapTargetId: _this.getMapTargetId(mapId),
      popupContentTargetId: _this.getPopupContentTargetId(mapId),
      showMap: true,
      geoFacets: [],
      drawnBounds: {},
      geoStyles: {
        Point: new _style.Style({
          image: new _style.Circle({
            radius: 5,
            fill: null,
            stroke: new _style.Stroke({ color: 'blue', width: 1 })
          })
        }),
        Polygon: new _style.Style({
          stroke: new _style.Stroke({
            color: 'blue',
            lineDash: [4],
            width: 3
          }),
          fill: new _style.Fill({
            color: 'rgba(0, 0, 255, 0.1)'
          })
        }),
        Circle: new _style.Style({
          stroke: new _style.Stroke({
            color: 'red',
            width: 2
          }),
          fill: new _style.Fill({
            color: 'rgba(255,0,0,0.2)'
          })
        })
      }
    };
    return _this;
  }

  OpenLayersSearchMap.prototype.componentDidMount = function componentDidMount() {
    this.processData();
  };

  OpenLayersSearchMap.prototype.componentDidUpdate = function componentDidUpdate(previousProps) {
    if (previousProps.facets !== this.props.facets) {
      this.processData();
    }
  };

  OpenLayersSearchMap.prototype.createClusterTextStyle = function createClusterTextStyle(text) {
    return new _style.Text({
      textAlign: 'center',
      textBaseline: 'middle',
      font: '14px Arial',
      text: text,
      fill: new _style.Fill({ color: 'black' }),
      offsetX: 0,
      offsetY: 0,
      rotation: 0
    });
  };

  OpenLayersSearchMap.prototype.getPrimaryGeoJson = function getPrimaryGeoJson() {
    var geoFacets = _mapUtils2.default.getGeoFacets(this.props.facets, this.props.geoFacetNames);

    this.setState({ geoFacets: geoFacets });

    return _mapUtils2.default.convertFacetsToGeoJson(geoFacets);
  };

  OpenLayersSearchMap.prototype.getPrimaryStyle = function getPrimaryStyle() {
    return this.createClusterMarker;
  };

  OpenLayersSearchMap.prototype.afterProcessData = function afterProcessData(map, primaryLayer) {
    var that = this;
    var typeSelect = document.getElementById('map-selection-type');
    var interaction = void 0; // global so we can remove them later

    function addInteractions() {
      var value = typeSelect.value;
      if (value === 'Free Hand') {
        interaction = new _interaction.DragZoom();
      } else {
        interaction = new _interaction.Draw({
          source: primaryLayer.getSource(),
          type: value
        });
      }
      map.addInteraction(interaction);
    }

    /**
     * Handle change event.
     */
    typeSelect.onchange = function () {
      if (interaction) {
        map.removeInteraction(interaction);
      }
      addInteractions();
    };

    addInteractions();

    var addedFeature = void 0;
    var addFeatureLocked = false;
    primaryLayer.getSource().on('addfeature', function (event) {
      if (!addFeatureLocked) {
        addFeatureLocked = true;
        var extent = event.feature.getGeometry().getExtent();
        var isGeoFacet = event.feature.getProperties() && event.feature.getProperties()['layer'] === 'primary';
        // If the feature is new
        if (!isGeoFacet && (!addedFeature || addedFeature.getGeometry().getExtent().toString() !== extent.toString())) {
          addedFeature = event.feature;
          that.updateDrawnBounds(addedFeature.getGeometry());
        }
        addFeatureLocked = false;
      }
    });

    // Bind handler for map clicks.
    map.on('click', this.handleMapClick.bind(this));

    // Bind handler for right clicks.
    map.getViewport().addEventListener('contextmenu', function () {
      that.resetDrawnBounds();
      that.processData();
      if (interaction) {
        map.removeInteraction(interaction);
      }
      addInteractions();
    });
  };

  OpenLayersSearchMap.prototype.getBoxBounds = function getBoxBounds(extent) {
    var convertedExtent = (0, _proj.transformExtent)(extent, 'EPSG:3857', 'EPSG:4326');
    return {
      south: convertedExtent[1],
      west: convertedExtent[0],
      north: convertedExtent[3],
      east: convertedExtent[2]
    };
  };

  OpenLayersSearchMap.prototype.getCircleBounds = function getCircleBounds(geometry) {
    var center = geometry.getCenter();
    return {
      radius: geometry.getRadius(),
      point: {
        latitude: center[1],
        longitude: center[0]
      }
    };
  };

  OpenLayersSearchMap.prototype.getPointBounds = function getPointBounds(geometry) {
    var lonLat = geometry.getCoordinates();
    return {
      latitude: lonLat[1],
      longitude: lonLat[0]
    };
  };

  OpenLayersSearchMap.prototype.updateDrawnBounds = function updateDrawnBounds(geometry) {
    var bounds = {};
    var shape = geometry.getType();
    if (shape === 'Point') {
      bounds = this.getPointBounds(geometry);
    } else if (shape === 'Circle') {
      bounds = this.getCircleBounds(geometry);
    } else if (shape === 'Polygon') {
      shape = 'Box';
      bounds = this.getBoxBounds(geometry.getExtent());
    }

    if (shape) {
      shape = shape.toLowerCase();
      if (!this.state.drawnBounds[shape]) {
        this.state.drawnBounds[shape] = [];
      }
      this.state.drawnBounds[shape].push(bounds);
    }

    console.log(shape);
    console.log(this.state.drawnBounds);
    if (this.props.boundsChanged) {
      this.props.boundsChanged(this.state.drawnBounds);
    }
  };

  OpenLayersSearchMap.prototype.resetDrawnBounds = function resetDrawnBounds() {

    this.setState({ drawnBounds: {} });
    if (this.props.boundsChanged) {
      this.props.boundsChanged(this.state.drawnBounds);
    }
  };

  OpenLayersSearchMap.prototype.handleMapClick = function handleMapClick(event) {
    // Close the old popup first.
    this.closePopup();
    var that = this;
    // Find the feature near the clicked location.
    var features = this.state.map.getFeaturesAtPixel(event.pixel);
    if (features && features.length > 0) {
      // Group the features into buckets based on layer.
      var layers = {};
      features.forEach(function (feature) {
        var layer = feature.get('layer');
        var uri = feature.get('uri');
        if (layer && uri) {
          if (layers[layer]) {
            layers[layer].push(feature);
          } else {
            layers[layer] = [feature];
          }
        }
      });

      var display = null;
      if (layers['primary'] && layers['primary'].length > 0) {
        display = '<div><ul>';
        layers['primary'].forEach(function (primFeat) {
          var uri = primFeat.get('uri');
          var label = primFeat.get('label') || primFeat.get('name') || uri || 'unknown';
          display += '<li>';
          if (that.props.markerClick) {
            display += '<a onclick="' + that.props.markerClick + '">';
          } else {
            display += '<a href="/detail/' + encodeURIComponent(uri) + '">';
          }
          display += label + '</a></li>';
        });
        display += '</ul></div>';
      }

      var content = document.getElementById(this.state.popupContentTargetId);
      if (content && display) {
        content.innerHTML = display;
        var coordinate = event.coordinate;
        this.state.overlay.setPosition(coordinate);
      }
    }
  };

  OpenLayersSearchMap.prototype.closePopup = function closePopup() {
    this.state.overlay.setPosition(undefined);
  };

  OpenLayersSearchMap.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'inline-block' },
        _react2.default.createElement(
          'span',
          null,
          _react2.default.createElement('input', {
            name: 'showMap',
            type: 'checkbox',
            checked: this.state.showMap,
            onChange: this.handleShowMap
          }),
          _react2.default.createElement(
            'span',
            null,
            ' Show Map'
          )
        ),
        '\xA0\xA0',
        _react2.default.createElement(
          'label',
          null,
          'Interaction \xA0'
        ),
        _react2.default.createElement(
          'select',
          { id: 'map-selection-type' },
          _react2.default.createElement(
            'option',
            { value: 'Free Hand' },
            'Free Hand'
          ),
          _react2.default.createElement(
            'option',
            { value: 'Point' },
            'Draw Point'
          ),
          _react2.default.createElement(
            'option',
            { value: 'Polygon' },
            'Draw Polygon'
          ),
          _react2.default.createElement(
            'option',
            { value: 'Circle' },
            'Draw Circle'
          )
        ),
        '\xA0\xA0',
        _react2.default.createElement(
          'label',
          null,
          'Legend \xA0'
        ),
        this.state.geoFacets.map(function (geoFacet, index) {
          return _react2.default.createElement(
            'span',
            { key: index },
            _react2.default.createElement(
              'b',
              { style: { color: geoFacet.color } },
              '\u25C9'
            ),
            '\xA0',
            geoFacet.facet.name,
            '\xA0'
          );
        }),
        '\xA0\xA0',
        _react2.default.createElement(
          'i',
          null,
          'Right click will clear the drawings'
        )
      ),
      _react2.default.createElement('div', {
        id: this.state.mapTargetId,
        className: this.props.class || 'olmap',
        style: !this.state.showMap ? { display: 'none' } : { display: 'block' }
      }),
      _react2.default.createElement(
        'div',
        { id: this.state.popupContentTargetId, className: 'ol-popup' },
        _react2.default.createElement('div', { id: this.state.popupContentTargetId })
      )
    );
  };

  return OpenLayersSearchMap;
}(_OpenLayersMap3.default);

exports.default = OpenLayersSearchMap;
module.exports = exports['default'];