function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style.js';
import { transformExtent } from 'ol/proj';
import { Draw } from 'ol/interaction.js';
import mapUtils from './mapUtils.js';
import OpenLayersMap from './OpenLayersMap.js';

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
          styles = [new Style({
            image: new CircleStyle({
              radius: radius,
              fill: new Fill({ color: color }),
              stroke: new Stroke({
                color: 'black',
                width: strokeWidth,
                lineDash: lineDash
              })
            }),
            text: _this.createClusterTextStyle(countValue)
          })];
        } else {
          styles = [new Style({
            image: new CircleStyle({
              radius: radius + 8,
              fill: new Fill({ color: color }),
              stroke: new Stroke({
                color: 'black',
                width: strokeWidth,
                lineDash: lineDash
              })
            })
          }), new Style({
            image: new CircleStyle({
              radius: radius,
              fill: new Fill({ color: '#cce0ff' }),
              stroke: new Stroke({
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
        Point: new Style({
          image: new CircleStyle({
            radius: 5,
            fill: null,
            stroke: new Stroke({ color: 'blue', width: 1 })
          })
        }),
        Polygon: new Style({
          stroke: new Stroke({
            color: 'blue',
            lineDash: [4],
            width: 3
          }),
          fill: new Fill({
            color: 'rgba(0, 0, 255, 0.1)'
          })
        }),
        Circle: new Style({
          stroke: new Stroke({
            color: 'red',
            width: 2
          }),
          fill: new Fill({
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
    return new Text({
      textAlign: 'center',
      textBaseline: 'middle',
      font: '14px Arial',
      text: text,
      fill: new Fill({ color: 'black' }),
      offsetX: 0,
      offsetY: 0,
      rotation: 0
    });
  };

  OpenLayersSearchMap.prototype.getPrimaryGeoJson = function getPrimaryGeoJson() {
    var geoFacets = mapUtils.getGeoFacets(this.props.facets, this.props.geoFacetNames);

    this.setState({ geoFacets: geoFacets });

    return mapUtils.convertFacetsToGeoJson(geoFacets);
  };

  OpenLayersSearchMap.prototype.getPrimaryStyle = function getPrimaryStyle() {
    return this.createClusterMarker;
  };

  OpenLayersSearchMap.prototype.afterProcessData = function afterProcessData(map, primaryLayer) {
    var that = this;
    var typeSelect = document.getElementById('map-selection-type');
    var draw = void 0; // global so we can remove them later

    function addInteractions() {
      var value = typeSelect.value;
      if (value !== 'None') {
        draw = new Draw({
          source: primaryLayer.getSource(),
          type: value
        });
        map.addInteraction(draw);
      }
    }

    /**
     * Handle change event.
     */
    typeSelect.onchange = function () {
      if (draw) {
        map.removeInteraction(draw);
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
        // If the feature is new
        if (typeSelect.value && (!addedFeature || addedFeature.getGeometry().getExtent().toString() !== extent.toString())) {
          addedFeature = event.feature;
          that.updateDrawnBounds(typeSelect.value.toLowerCase(), addedFeature.getGeometry());
        }
        addFeatureLocked = false;
      }
    });

    // Bind handler for map clicks.
    map.on('click', this.handleMapClick.bind(this));
  };

  OpenLayersSearchMap.prototype.getBoxBounds = function getBoxBounds(extent) {
    var convertedExtent = transformExtent(extent, 'EPSG:3857', 'EPSG:4326');
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

  OpenLayersSearchMap.prototype.updateDrawnBounds = function updateDrawnBounds(shape, geometry) {
    var bounds = {};
    if (shape === 'point') {
      bounds = this.getPointBounds(geometry);
    } else if (shape === 'circle') {
      bounds = this.getCircleBounds(geometry);
    } else {
      shape = 'box';
      bounds = this.getBoxBounds(geometry.getExtent());
    }

    if (!this.state.drawnBounds[shape]) {
      this.state.drawnBounds[shape] = [];
    }
    this.state.drawnBounds[shape].push(bounds);

    if (this.props.boundsChanged) {
      this.props.boundsChanged(this.state.drawnBounds);
    }
  };

  OpenLayersSearchMap.prototype.handleMapClick = function handleMapClick(event) {
    // Close the old popup first.
    this.closePopup();

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
          display += '<li><a href="/detail/' + encodeURIComponent(uri) + '">' + label + '</a></li>';
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
    return React.createElement(
      'div',
      null,
      React.createElement(
        'div',
        { className: 'inline-block' },
        React.createElement(
          'span',
          null,
          React.createElement('input', {
            name: 'showMap',
            type: 'checkbox',
            checked: this.state.showMap,
            onChange: this.handleShowMap
          }),
          React.createElement(
            'span',
            null,
            ' Show Map'
          )
        ),
        '\xA0\xA0',
        React.createElement(
          'label',
          null,
          'Geometry type \xA0'
        ),
        React.createElement(
          'select',
          { id: 'map-selection-type' },
          React.createElement(
            'option',
            { value: 'Point' },
            'Point'
          ),
          React.createElement(
            'option',
            { value: 'Polygon' },
            'Polygon'
          ),
          React.createElement(
            'option',
            { value: 'Circle' },
            'Circle'
          ),
          React.createElement(
            'option',
            { value: 'None' },
            'None'
          )
        ),
        '\xA0\xA0',
        React.createElement(
          'label',
          null,
          'Legend \xA0'
        ),
        this.state.geoFacets.map(function (geoFacet, index) {
          return React.createElement(
            'span',
            { key: index },
            React.createElement(
              'b',
              { style: { color: geoFacet.color } },
              '\u25C9'
            ),
            '\xA0',
            geoFacet.facet.name,
            '\xA0'
          );
        })
      ),
      React.createElement('div', {
        id: this.state.mapTargetId,
        className: this.props.class || 'olmap',
        style: !this.state.showMap ? { display: 'none' } : { display: 'block' }
      }),
      React.createElement(
        'div',
        { id: this.state.popupContentTargetId, className: 'ol-popup' },
        React.createElement('div', { id: this.state.popupContentTargetId })
      )
    );
  };

  return OpenLayersSearchMap;
}(OpenLayersMap);

export default OpenLayersSearchMap;