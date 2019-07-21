import React from 'react';
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from 'ol/style.js';
import { transformExtent } from 'ol/proj';
import { Draw } from 'ol/interaction.js';
import mapUtils from './mapUtils.js';
import OpenLayersMap from './OpenLayersMap.js';

class OpenLayersSearchMap extends OpenLayersMap {
  constructor(props) {
    super(props);

    let mapId = this.getMapId();
    this.state = {
      geoJsonData: this.getJsonData(),
      mapTargetId: this.getMapTargetId(mapId),
      popupContentTargetId: this.getPopupContentTargetId(mapId),
      showMap: true,
      geoFacetNames: []
    };
  }

  componentDidMount() {
    this.processData();
  }

  componentDidUpdate(previousProps) {
    if (previousProps.facets !== this.props.facets) {
      this.processData();
    }
  }

  createClusterTextStyle(text) {
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
  }

  createClusterMarker = feature => {
    let radius = 10;
    let count = 0;
    let countLength = 0;
    let lineDash = [5];
    let strokeWidth = 2;

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

    let countValue = count > 1 ? count.toString() : '';
    let styles = [];
    if (count === 1) {
      styles = [
        new Style({
          image: new CircleStyle({
            radius: radius,
            fill: new Fill({ color: '#0066ff' }),
            stroke: new Stroke({
              color: 'black',
              width: strokeWidth,
              lineDash: lineDash
            })
          }),
          text: this.createClusterTextStyle(countValue)
        })
      ];
    } else {
      styles = [
        new Style({
          image: new CircleStyle({
            radius: radius + 8,
            fill: new Fill({ color: '#0066ff' }),
            stroke: new Stroke({
              color: 'black',
              width: strokeWidth,
              lineDash: lineDash
            })
          })
        }),
        new Style({
          image: new CircleStyle({
            radius: radius,
            fill: new Fill({ color: '#cce0ff' }),
            stroke: new Stroke({
              color: 'black',
              width: strokeWidth,
              lineDash: lineDash
            })
          }),
          text: this.createClusterTextStyle(countValue)
        })
      ];
    }

    return styles;
  };

  getPrimaryGeoJson() {
    let geoFacetNames = mapUtils.getGeoFacetNames(
      this.props.facets,
      this.props.geoFacetName
    );

    this.setState({ geoFacetNames: geoFacetNames });

    return mapUtils.convertFacetsToGeoJson(this.props.facets, geoFacetNames);
  }

  getPrimaryStyle() {
    return this.createClusterMarker;
  }

  afterProcessData(map, primaryLayer) {
    var typeSelect = document.getElementById('map-selection-type');
    var draw; // global so we can remove them later

    function addInteractions() {
      draw = new Draw({
        source: primaryLayer.getSource(),
        type: typeSelect.value
      });
      map.addInteraction(draw);
    }

    /**
     * Handle change event.
     */
    typeSelect.onchange = function() {
      if (draw) {
        map.removeInteraction(draw);
      }
      addInteractions();
    };

    addInteractions();

    let that = this;
    let addedFeature;
    let addFeatureLocked = false;
    primaryLayer.getSource().on('addfeature', function(event) {
      if (!addFeatureLocked) {
        addFeatureLocked = true;
        var extent = event.feature.getGeometry().getExtent();
        // If the feature is new
        if (
          !addedFeature ||
          addedFeature
            .getGeometry()
            .getExtent()
            .toString() !== extent.toString()
        ) {
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
  }

  handleMapMove() {
    let size = this.state.map.getSize();
    let extent = this.state.map.getView().calculateExtent(size);
    this.updateMapFilter(extent);
  }

  updateMapFilter(extent) {
    let convertedExtent = transformExtent(extent, 'EPSG:3857', 'EPSG:4326');
    let geoSearch = {
      box: [
        {
          south: convertedExtent[1],
          west: convertedExtent[0],
          north: convertedExtent[3],
          east: convertedExtent[2]
        }
      ]
    };

    var that = this;
    // Assumes that geospatial constraint can be used to filter search.
    this.state.geoFacetNames.forEach(function(geoFacetName) {
      that.props.replaceFilter(geoFacetName, 'custom', geoSearch);
    });
  }

  handleMapClick(event) {
    // Close the old popup first.
    this.closePopup();

    // Find the feature near the clicked location.
    let features = this.state.map.getFeaturesAtPixel(event.pixel);
    if (features && features.length > 0) {
      // Group the features into buckets based on layer.
      let layers = {};
      features.forEach(function(feature) {
        let layer = feature.get('layer');
        let uri = feature.get('uri');
        if (layer && uri) {
          if (layers[layer]) {
            layers[layer].push(feature);
          } else {
            layers[layer] = [feature];
          }
        }
      });

      let display = null;
      if (layers['primary'] && layers['primary'].length > 0) {
        display = '<div><ul>';
        layers['primary'].forEach(function(primFeat) {
          let uri = primFeat.get('uri');
          let label =
            primFeat.get('label') || primFeat.get('name') || uri || 'unknown';
          display +=
            '<li><a href="/detail/' +
            encodeURIComponent(uri) +
            '">' +
            label +
            '</a></li>';
        });
        display += '</ul></div>';
      }

      let content = document.getElementById(this.state.popupContentTargetId);
      if (content && display) {
        content.innerHTML = display;
        let coordinate = event.coordinate;
        this.state.overlay.setPosition(coordinate);
      }
    }
  }

  closePopup() {
    this.state.overlay.setPosition(undefined);
  }

  handleShowMap = () => {
    this.setState({ showMap: !this.state.showMap });
  };

  render() {
    return (
      <div>
        <div>
          <span>
            <input
              name="showMap"
              type="checkbox"
              checked={this.state.showMap}
              onChange={this.handleShowMap}
            />
            <span> Show Map</span>
          </span>
        </div>
        <div className="inline-block">
          <label>Geometry type &nbsp;</label>
          <select id="map-selection-type">
            <option value="Point">Point</option>
            <option value="LineString">LineString</option>
            <option value="Polygon">Polygon</option>
            <option value="Circle">Circle</option>
            <option value="None">None</option>
          </select>
        </div>
        <div
          id={this.state.mapTargetId}
          className={this.props.class || 'olmap'}
          style={
            !this.state.showMap ? { display: 'none' } : { display: 'block' }
          }
        />
        <div id={this.state.popupContentTargetId} className="ol-popup">
          <div id={this.state.popupContentTargetId} />
        </div>
      </div>
    );
  }
}

export default OpenLayersSearchMap;
