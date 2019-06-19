'use strict';

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Map = require('ol/Map');

var _Map2 = _interopRequireDefault(_Map);

var _View = require('ol/View');

var _View2 = _interopRequireDefault(_View);

var _layer = require('ol/layer.js');

var _GeoJSON = require('ol/format/GeoJSON.js');

var _GeoJSON2 = _interopRequireDefault(_GeoJSON);

var _Overlay = require('ol/Overlay.js');

var _Overlay2 = _interopRequireDefault(_Overlay);

var _source = require('ol/source.js');

var _style = require('ol/style.js');

var _proj = require('ol/proj');

var _coordinate = require('ol/coordinate.js');

var _control = require('ol/control.js');

var _interaction = require('ol/interaction.js');

var _MousePosition = require('ol/control/MousePosition.js');

var _MousePosition2 = _interopRequireDefault(_MousePosition);

var _mapUtils = require('./mapUtils.js');

var _mapUtils2 = _interopRequireDefault(_mapUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OpenLayersSearchMap = function (_React$Component) {
  _inherits(OpenLayersSearchMap, _React$Component);

  function OpenLayersSearchMap(props) {
    _classCallCheck(this, OpenLayersSearchMap);

    // Create a unique map identifier so multiple maps can exist on the same view.
    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

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
      if (count === 1) {
        styles = [new _style.Style({
          image: new _style.Circle({
            radius: radius,
            fill: new _style.Fill({ color: '#0066ff' }),
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
            fill: new _style.Fill({ color: '#0066ff' }),
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

      return styles;
    };

    _this.handleShowMap = function () {
      _this.setState({ showMap: !_this.state.showMap });
    };

    var mapId = Math.floor(Math.random() * 1000 + 1);
    _this.state = {
      geoJsonData: {
        projection: 'EPSG:4326',
        type: 'FeatureCollection',
        features: []
      },
      mapTargetId: 'olmap-' + mapId,
      popupContentTargetId: 'olmap-popup-content-' + mapId,
      showMap: true
    };
    return _this;
  }

  OpenLayersSearchMap.prototype.componentDidMount = function componentDidMount() {
    this.initializeMap();
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

  OpenLayersSearchMap.prototype.processData = function processData() {
    // Create the main point layer features.
    var primaryGeoJson = _mapUtils2.default.convertFacetsToGeoJson(this.props.facets, this.props.geoFacetName);
    var convertedGeoJson = new _GeoJSON2.default().readFeatures(primaryGeoJson);

    // Update the layer.
    this.state.primaryLayer.getSource().clear();
    this.state.primaryLayer.getSource().addFeatures(convertedGeoJson);
  };

  OpenLayersSearchMap.prototype.initializeMap = function initializeMap() {
    // Create the main point layer.
    var primaryGeoJson = _mapUtils2.default.convertFacetsToGeoJson(this.props.facets, this.props.geoFacetName);
    var primarySource = new _source.Vector({
      projection: 'EPSG:4326',
      features: new _GeoJSON2.default().readFeatures(primaryGeoJson)
    });

    var primaryLayer = new _layer.Vector({
      source: primarySource,
      style: this.createClusterMarker
    });

    //
    // Convert from EPSG:4326 to EPSG:3857 coordinates because that is the default for
    // OpenLayers and the base maps look better in that projection.
    //
    var center = this.props.lonLat ? (0, _proj.fromLonLat)(this.props.lonLat) : (0, _proj.fromLonLat)([-95.79, 34.48]);

    // If there is only 1 feature, use it as the map center.
    if (primarySource.getFeatures().length === 1) {
      center = primarySource.getFeatures()[0].getGeometry().getCoordinates();
    }

    // Setup overlay for popups
    var container = document.getElementById(this.state.popupContentTargetId);
    var overlay = new _Overlay2.default({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    var map = new _Map2.default({
      target: this.state.mapTargetId,
      layers: [
      // This is an example of an Esri base map.  The following imports are needed:
      //
      // import XYZ from 'ol/source/XYZ.js';
      //
      // new TileLayer({
      //   source: new XYZ({
      //     attributions:
      //       'Tiles © <a href="https://services.arcgisonline.com/ArcGIS/' +
      //       'rest/services/World_Topo_Map/MapServer">ArcGIS</a>',
      //     url:
      //       'https://server.arcgisonline.com/ArcGIS/rest/services/' +
      //       'World_Topo_Map/MapServer/tile/{z}/{y}/{x}'
      //   })
      // }),

      // Default base map is Open Street Map.
      new _layer.Tile({
        source: new _source.OSM()
      }),

      // This is an example of 2 layers from a local map server when internet
      // access is not available.
      //
      // The following imports are needed:
      //
      // import { Image as ImageLayer } from 'ol/layer.js';
      // import ImageWMS from 'ol/source.js';
      //
      // new ImageLayer({
      //   source: new ImageWMS({
      //     url: 'http://localhost:8080/geoserver/tm_world/wms',
      //     params: {
      //       LAYERS: 'tm_world:TM_WORLD_BORDERS-0.3'
      //     }
      //   })
      // }),
      // new ImageLayer({
      //   source: new ImageWMS({
      //     url: 'http://localhost:8080/geoserver/topp/wms',
      //     params: {
      //       LAYERS: 'topp:states'
      //     }
      //   })
      // }),

      primaryLayer],
      overlays: [overlay],
      view: new _View2.default({
        projection: 'EPSG:3857',
        center: center,
        zoom: this.props.zoom ? this.props.zoom : 4
      }),
      controls: (0, _control.defaults)().extend([new _control.FullScreen(), new _MousePosition2.default({
        coordinateFormat: (0, _coordinate.createStringXY)(4),
        projection: 'EPSG:4326'
      })])
    });

    var typeSelect = document.getElementById('map-selection-type');
    var draw; // global so we can remove them later

    function addInteractions() {
      if (draw) {
        map.removeInteraction(draw);
      }
      draw = new _interaction.Draw({
        source: primarySource,
        type: typeSelect.value
      });
      map.addInteraction(draw);
    }

    /**
     * Handle change event.
     */
    typeSelect.onchange = function () {
      addInteractions();
    };

    addInteractions();

    var that = this;
    var addedFeature;
    var addFeatureLocked = false;
    primarySource.on('addfeature', function (event) {
      if (!addFeatureLocked) {
        addFeatureLocked = true;
        var extent = event.feature.getGeometry().getExtent();
        // If the feature is new
        if (!addedFeature || addedFeature.getGeometry().getExtent().toString() !== extent.toString()) {
          addedFeature = event.feature;
          that.updateMapFilter(extent);
        }
        addFeatureLocked = false;
      }
    });

    // Bind handler for map clicks.
    map.on('click', this.handleMapClick.bind(this));

    // Comment out this line to prevent filtering the search using the map bounds.
    map.on('moveend', this.handleMapMove.bind(this));

    // save map and layer references to local state
    this.setState({
      map: map,
      primaryLayer: primaryLayer,
      overlay: overlay
    });
  };

  OpenLayersSearchMap.prototype.handleMapMove = function handleMapMove() {
    var size = this.state.map.getSize();
    var extent = this.state.map.getView().calculateExtent(size);
    this.updateMapFilter(extent);
  };

  OpenLayersSearchMap.prototype.updateMapFilter = function updateMapFilter(extent) {
    var convertedExtent = (0, _proj.transformExtent)(extent, 'EPSG:3857', 'EPSG:4326');
    var geoSearch = {
      box: [{
        south: convertedExtent[1],
        west: convertedExtent[0],
        north: convertedExtent[3],
        east: convertedExtent[2]
      }]
    };
    // Assumes that geospatial constraint can be used to filter search.
    this.props.replaceFilter(this.props.geoFacetName, 'custom', geoSearch);
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
          display += '<li><a href="/detail/?id=' + encodeURIComponent(uri) + '">' + label + '</a></li>';
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
        null,
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
        )
      ),
      _react2.default.createElement(
        'div',
        { className: 'inline-block' },
        _react2.default.createElement(
          'label',
          null,
          'Geometry type \xA0'
        ),
        _react2.default.createElement(
          'select',
          { id: 'map-selection-type' },
          _react2.default.createElement(
            'option',
            { value: 'Point' },
            'Point'
          ),
          _react2.default.createElement(
            'option',
            { value: 'LineString' },
            'LineString'
          ),
          _react2.default.createElement(
            'option',
            { value: 'Polygon' },
            'Polygon'
          ),
          _react2.default.createElement(
            'option',
            { value: 'Circle' },
            'Circle'
          ),
          _react2.default.createElement(
            'option',
            { value: 'None' },
            'None'
          )
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
}(_react2.default.Component);

exports.default = OpenLayersSearchMap;
module.exports = exports['default'];