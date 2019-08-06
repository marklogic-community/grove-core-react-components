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

class OpenLayersMap extends React.Component {
  constructor(props) {
    super(props);

    let mapId = this.getMapId();
    this.state = {
      geoJsonData: this.getJsonData(),
      mapTargetId: this.getMapTargetId(mapId),
      popupContentTargetId: this.getPopupContentTargetId(mapId)
    };
  }

  getJsonData() {
    return {
      projection: 'EPSG:4326',
      type: 'FeatureCollection',
      features: []
    };
  }

  getMapId() {
    // Create a unique map identifier so multiple maps can exist on the same view.
    return Math.floor(Math.random() * 1000 + 1);
  }

  getMapTargetId(mapId) {
    return 'olmap-' + mapId;
  }

  getPopupContentTargetId(mapId) {
    return 'olmap-popup-content-' + mapId;
  }

  componentDidMount() {
    this.processData();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.id !== this.props.id) {
      this.processData();
    }
  }

  getPrimaryGeoJson() {
    return mapUtils.convertPropsToGeoJson(this.props);
  }

  getPrimaryStyle() {
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
  }

  processData() {
    // Create the point layer.
    let primaryGeoJson = this.getPrimaryGeoJson();

    if (primaryGeoJson.features.length === 0) {
      return;
    }

    let convertedGeoJson = new GeoJSON().readFeatures(primaryGeoJson);

    // Update the layer.
    if (
      this.state.primaryLayer != null &&
      this.state.primaryLayer.getSource() != null
    ) {
      this.state.primaryLayer.getSource().clear();
      this.state.primaryLayer.getSource().addFeatures(convertedGeoJson);
    } else {
      //create source and layer
      let primarySource = new VectorSource({
        projection: 'EPSG:4326',
        features: convertedGeoJson
      });
      let primaryLayer = new VectorLayer({
        source: primarySource,
        style: this.getPrimaryStyle()
      });

      let center = this.props.lonLat
        ? fromLonLat(this.props.lonLat)
        : fromLonLat([-95.79, 34.48]);

      // If there is only 1 feature, use it as the map center.
      if (primarySource.getFeatures().length === 1) {
        center = primarySource
          .getFeatures()[0]
          .getGeometry()
          .getCoordinates();
      }

      // Setup overlay for popups
      let container = document.getElementById(this.state.popupContentTargetId);
      let overlay = new Overlay({
        element: container,
        autoPan: true,
        autoPanAnimation: {
          duration: 250
        }
      });

      let map = new Map({
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

          primaryLayer
        ],
        overlays: [overlay],
        view: new View({
          projection: 'EPSG:3857',
          center: center,
          zoom: this.props.zoom ? this.props.zoom : 4
        }),
        controls: defaultControls().extend([
          new FullScreen(),
          new MousePosition({
            coordinateFormat: createStringXY(4),
            projection: 'EPSG:4326'
          })
        ])
      });

      // save map and layer references to local state
      let state = {
        map: map,
        primaryLayer: primaryLayer,
        overlay: overlay
      };
      this.setState(state, this.afterProcessData(map, primaryLayer));
    }
  }

  afterProcessData() {}

  render() {
    return (
      <div>
        <div
          id={this.state.mapTargetId}
          className={this.props.class || 'olmap'}
        />
        <div id={this.state.popupContentTargetId} className="ol-popup">
          <div id={this.state.popupContentTargetId} />
        </div>
      </div>
    );
  }
}

export default OpenLayersMap;
