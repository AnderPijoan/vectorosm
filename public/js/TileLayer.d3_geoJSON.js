L.TileLayer.d3_geoJSON =  L.TileLayer.extend({
  onAdd : function(map) {
    L.TileLayer.prototype.onAdd.call(this,map);
    this.g = d3.select(map._container).select("svg").append("g");
    this._path = d3.geo.path().projection(function(d) {
      var point = map.latLngToLayerPoint(new L.LatLng(d[1],d[0]));
      return [point.x,point.y];
    });
    this.on("tileunload",function(d) {
      if (d.tile.xhr) d.tile.xhr.abort();
      if (d.tile.nodes) d.tile.nodes.remove();
      d.tile.nodes = null;
      d.tile.xhr = null;
    });
  },
  _loadTile : function(tile,tilePoint) {
    var self = this;
    this._adjustTilePoint(tilePoint);

    if (!tile.nodes && !tile.xhr) {
      tile.nodes = d3.select();
      tile.xhr = d3.json(this.getTileUrl(tilePoint),function(d) {
        tile.xhr = null;
        tile.nodes = self.g.append("path")
          .datum(d)
          .attr("d",self._path)
          .attr("class",self.options.class);
      });
    }
  }
});
