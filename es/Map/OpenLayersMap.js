function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import Overlay from 'ol/Overlay.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { fromLonLat } from 'ol/proj';
import { createStringXY } from 'ol/coordinate.js';
import { defaults as defaultControls, FullScreen } from 'ol/control.js';
import MousePosition from 'ol/control/MousePosition.js';
import mapUtils from './mapUtils.js';

var OpenLayersMap = function (_React$Component) {
  _inherits(OpenLayersMap, _React$Component);

  function OpenLayersMap(props) {
    _classCallCheck(this, OpenLayersMap);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    var mapId = _this.getMapId();
    _this.state = {
      geoJsonData: _this.getJsonData(),
      mapTargetId: _this.getMapTargetId(mapId),
      popupContentTargetId: _this.getPopupContentTargetId(mapId)
    };
    return _this;
  }

  OpenLayersMap.prototype.getJsonData = function getJsonData() {
    return {
      projection: 'EPSG:4326',
      type: 'FeatureCollection',
      features: []
    };
  };

  OpenLayersMap.prototype.getMapId = function getMapId() {
    // Create a unique map identifier so multiple maps can exist on the same view.
    return Math.floor(Math.random() * 1000 + 1);
  };

  OpenLayersMap.prototype.getMapTargetId = function getMapTargetId(mapId) {
    return 'olmap-' + mapId;
  };

  OpenLayersMap.prototype.getPopupContentTargetId = function getPopupContentTargetId(mapId) {
    return 'olmap-popup-content-' + mapId;
  };

  OpenLayersMap.prototype.componentDidMount = function componentDidMount() {
    this.processData();
  };

  OpenLayersMap.prototype.componentDidUpdate = function componentDidUpdate(previousProps) {
    if (previousProps.id !== this.props.id) {
      this.processData();
    }
  };

  OpenLayersMap.prototype.getPrimaryGeoJson = function getPrimaryGeoJson() {
    return mapUtils.convertPropsToGeoJson(this.props);
  };

  OpenLayersMap.prototype.getPrimaryStyle = function getPrimaryStyle() {
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

    return new Style({
      image: new CircleStyle({
        radius: 7,
        fill: new Fill({ color: 'red' }),
        stroke: new Stroke({ color: 'red', width: 1 })
      })
    });
  };

  OpenLayersMap.prototype.processData = function processData() {
    // Create the point layer.
    var primaryGeoJson = this.getPrimaryGeoJson();
    var convertedGeoJson = new GeoJSON().readFeatures(primaryGeoJson);

    // Update the layer.
    if (this.state.primaryLayer != null && this.state.primaryLayer.getSource() != null) {
      this.state.primaryLayer.getSource().clear();
      this.state.primaryLayer.getSource().addFeatures(convertedGeoJson);
    } else {
      //create source and layer
      var primarySource = new VectorSource({
        projection: 'EPSG:4326',
        features: convertedGeoJson
      });
      var primaryLayer = new VectorLayer({
        source: primarySource,
        style: this.getPrimaryStyle()
      });

      var center = this.props.lonLat ? fromLonLat(this.props.lonLat) : fromLonLat([-95.79, 34.48]);

      // If there is only 1 feature, use it as the map center.
      if (primarySource.getFeatures().length === 1) {
        center = primarySource.getFeatures()[0].getGeometry().getCoordinates();
      }

      // Setup overlay for popups
      var container = document.getElementById(this.state.popupContentTargetId);
      var overlay = new Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      });

      var map = new Map({
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
        new TileLayer({
          source: new OSM()
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
        view: new View({
          projection: 'EPSG:3857',
          center: center,
          zoom: this.props.zoom ? this.props.zoom : 4
        }),
        controls: defaultControls().extend([new FullScreen(), new MousePosition({
          coordinateFormat: createStringXY(4),
          projection: 'EPSG:4326'
        })])
      });

      // save map and layer references to local state
      var state = {
        map: map,
        primaryLayer: primaryLayer,
        overlay: overlay
      };
      this.setState(state, this.afterProcessData(map, primaryLayer));
    }
  };

  OpenLayersMap.prototype.afterProcessData = function afterProcessData() {};

  OpenLayersMap.prototype.render = function render() {
    return React.createElement(
      'div',
      null,
      React.createElement('div', {
        id: this.state.mapTargetId,
        className: this.props.class || 'olmap'
      }),
      React.createElement(
        'div',
        { id: this.state.popupContentTargetId, className: 'ol-popup' },
        React.createElement('div', { id: this.state.popupContentTargetId })
      )
    );
  };

  return OpenLayersMap;
}(React.Component);

export default OpenLayersMap;