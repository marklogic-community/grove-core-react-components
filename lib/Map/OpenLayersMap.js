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

var _MousePosition = require('ol/control/MousePosition.js');

var _MousePosition2 = _interopRequireDefault(_MousePosition);

var _mapUtils = require('./mapUtils.js');

var _mapUtils2 = _interopRequireDefault(_mapUtils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var OpenLayersMap = function (_React$Component) {
  _inherits(OpenLayersMap, _React$Component);

  function OpenLayersMap(props) {
    _classCallCheck(this, OpenLayersMap);

    // Create a unique map identifier so multiple maps can exist on the same view.
    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    var mapId = Math.floor(Math.random() * 1000 + 1);
    _this.state = {
      geoJsonData: {
        projection: 'EPSG:4326',
        type: 'FeatureCollection',
        features: []
      },
      mapTargetId: 'olmap-' + mapId,
      popupContentTargetId: 'olmap-popup-content-' + mapId
    };
    return _this;
  }

  OpenLayersMap.prototype.componentDidMount = function componentDidMount() {
    this.processData();
  };

  OpenLayersMap.prototype.componentDidUpdate = function componentDidUpdate(previousProps) {
    if (previousProps.id !== this.props.id) {
      this.processData();
    }
  };

  OpenLayersMap.prototype.processData = function processData() {
    // Create shape
    var primaryStyle = new _style.Style({
      image: new _style.Circle({
        radius: 7,
        fill: new _style.Fill({ color: 'red' }),
        stroke: new _style.Stroke({ color: 'red', width: 1 })
      })
    });

    // Example of a green square shape
    // The following import is needed:
    //
    // import RegularShape from 'ol/style.js';
    //
    // let primaryStyle = new Style({
    //   image: new RegularShape({
    //     radius: 10,
    //     points: 4,
    //     angle: Math.PI / 4,
    //     fill: new Fill({ color: 'rgba(0, 255, 0, 0.1)' }),
    //     stroke: new Stroke({ color: 'green', width: 1 })
    //   })
    // });

    // Create the point layer.
    var primaryGeoJson = _mapUtils2.default.convertPropsToGeoJson(this.props);
    var primarySource = new _source.Vector({
      projection: 'EPSG:4326',
      features: new _GeoJSON2.default().readFeatures(primaryGeoJson)
    });
    var primaryLayer = new _layer.Vector({
      source: primarySource,
      style: primaryStyle
    });

    var center = (0, _proj.fromLonLat)([-95.79, 34.48]);

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
        zoom: 4
      }),
      controls: (0, _control.defaults)().extend([new _control.FullScreen(), new _MousePosition2.default({
        coordinateFormat: (0, _coordinate.createStringXY)(4),
        projection: 'EPSG:4326'
      })])
    });

    // save map and layer references to local state
    this.setState({
      map: map,
      primaryLayer: primaryLayer,
      overlay: overlay
    });
  };

  OpenLayersMap.prototype.render = function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('div', {
        id: this.state.mapTargetId,
        className: this.props.class || 'olmap'
      }),
      _react2.default.createElement(
        'div',
        { id: this.state.popupContentTargetId, className: 'ol-popup' },
        _react2.default.createElement('div', { id: this.state.popupContentTargetId })
      )
    );
  };

  return OpenLayersMap;
}(_react2.default.Component);

exports.default = OpenLayersMap;
module.exports = exports['default'];