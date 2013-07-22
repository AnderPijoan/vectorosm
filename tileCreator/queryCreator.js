////////////////////////////////// QUERY CREATOR

exports.getQuery = function getQuery(zoom, left, top, right, bottom){

switch(zoom){


// ZOOM 0
case 0 : return '';


// ZOOM 1
case 1 : return '';

	
// ZOOM 2
case 2 : return '';


// ZOOM 3
case 3 : return '';


// ZOOM 4
case 4 : return '';


// ZOOM 5
case 5 : return "SELECT ST_ASGEOJSON(ST_INTERSECTION( ST_TRANSFORM(ST_SETSRID(way, 900913),4326) , ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) ) AS geometry, tags AS properties FROM planet_osm_roads WHERE ST_INTERSECTS( ST_TRANSFORM(ST_SETSRID(way, 900913),4326), ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) AND highway = 'primary'";

// ZOOM 6
case 6 : return "SELECT ST_ASGEOJSON(ST_INTERSECTION( ST_TRANSFORM(ST_SETSRID(way, 900913),4326) , ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) ) AS geometry, tags AS properties FROM planet_osm_roads WHERE ST_INTERSECTS( ST_TRANSFORM(ST_SETSRID(way, 900913),4326), ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) AND highway <> ''";

// ZOOM 7

case 7 : return "SELECT ST_ASGEOJSON(ST_INTERSECTION( ST_TRANSFORM(ST_SETSRID(way, 900913),4326) , ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) ) AS geometry, tags AS properties FROM planet_osm_polygon WHERE ST_INTERSECTS( ST_TRANSFORM(ST_SETSRID(way, 900913),4326), ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) AND \"natural\" = 'water'" +
  " UNION " +
  "SELECT ST_ASGEOJSON(ST_INTERSECTION( ST_TRANSFORM(ST_SETSRID(way, 900913),4326) , ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) ) AS geometry, tags AS properties FROM planet_osm_roads WHERE ST_INTERSECTS( ST_TRANSFORM(ST_SETSRID(way, 900913),4326), ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) AND highway <> ''";

// ZOOM 8

case 8 : return "SELECT ST_ASGEOJSON(ST_INTERSECTION( ST_TRANSFORM(ST_SETSRID(way, 900913),4326) , ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) ) AS geometry, tags AS properties FROM planet_osm_polygon WHERE ST_INTERSECTS( ST_TRANSFORM(ST_SETSRID(way, 900913),4326), ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) AND \"natural\" = 'water'" +
  " UNION " +
  "SELECT ST_ASGEOJSON(ST_INTERSECTION( ST_TRANSFORM(ST_SETSRID(way, 900913),4326) , ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) ) AS geometry, tags AS properties FROM planet_osm_roads WHERE ST_INTERSECTS( ST_TRANSFORM(ST_SETSRID(way, 900913),4326), ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) AND highway <> ''";

// ZOOM 9

case 9 : return "SELECT ST_ASGEOJSON(ST_INTERSECTION( ST_TRANSFORM(ST_SETSRID(way, 900913),4326) , ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) ) AS geometry, tags AS properties FROM planet_osm_roads WHERE ST_INTERSECTS( ST_TRANSFORM(ST_SETSRID(way, 900913),4326), ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) AND highway <> ''";

// ZOOM 10

case 10 : return "SELECT ST_ASGEOJSON(ST_INTERSECTION( ST_TRANSFORM(ST_SETSRID(way, 900913),4326) , ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) ) AS geometry, tags AS properties FROM planet_osm_roads WHERE ST_INTERSECTS( ST_TRANSFORM(ST_SETSRID(way, 900913),4326), ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) AND highway <> ''";

// ZOOM 11

case 11 : return "SELECT ST_ASGEOJSON(ST_INTERSECTION( ST_TRANSFORM(ST_SETSRID(way, 900913),4326) , ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) ) AS geometry, tags AS properties FROM planet_osm_roads WHERE ST_INTERSECTS( ST_TRANSFORM(ST_SETSRID(way, 900913),4326), ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) AND highway <> ''";

// ZOOM 12

case 12 : return "SELECT ST_ASGEOJSON(ST_INTERSECTION( ST_TRANSFORM(ST_SETSRID(way, 900913),4326) , ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) ) AS geometry, tags AS properties FROM planet_osm_roads WHERE ST_INTERSECTS( ST_TRANSFORM(ST_SETSRID(way, 900913),4326), ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) AND highway <> ''";

// ZOOM 13

case 13 : return "SELECT ST_ASGEOJSON(ST_INTERSECTION( ST_TRANSFORM(ST_SETSRID(way, 900913),4326) , ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) ) AS geometry, tags AS properties FROM planet_osm_roads WHERE ST_INTERSECTS( ST_TRANSFORM(ST_SETSRID(way, 900913),4326), ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) AND highway <> ''";

// ZOOM 14

case 14 : return "SELECT ST_ASGEOJSON(ST_INTERSECTION( ST_TRANSFORM(ST_SETSRID(way, 900913),4326) , ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) ) AS geometry, tags AS properties FROM planet_osm_roads WHERE ST_INTERSECTS( ST_TRANSFORM(ST_SETSRID(way, 900913),4326), ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) AND highway <> ''";

// ZOOM 15

case 15 : return "SELECT ST_ASGEOJSON(ST_INTERSECTION( ST_TRANSFORM(ST_SETSRID(way, 900913),4326) , ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) ) AS geometry, tags AS properties FROM planet_osm_roads WHERE ST_INTERSECTS( ST_TRANSFORM(ST_SETSRID(way, 900913),4326), ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) AND highway <> ''";

// ZOOM 16

case 16 : return "SELECT ST_ASGEOJSON(ST_INTERSECTION( ST_TRANSFORM(ST_SETSRID(way, 900913),4326) , ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) ) AS geometry, tags AS properties FROM planet_osm_roads WHERE ST_INTERSECTS( ST_TRANSFORM(ST_SETSRID(way, 900913),4326), ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) AND highway <> ''";

// ZOOM 17

case 17 : return "SELECT ST_ASGEOJSON(ST_INTERSECTION( ST_TRANSFORM(ST_SETSRID(way, 900913),4326) , ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) ) AS geometry, tags AS properties FROM planet_osm_roads WHERE ST_INTERSECTS( ST_TRANSFORM(ST_SETSRID(way, 900913),4326), ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) AND highway <> ''";

// ZOOM 18

case 18 : return "SELECT ST_ASGEOJSON(ST_INTERSECTION( ST_TRANSFORM(ST_SETSRID(way, 900913),4326) , ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) ) AS geometry, tags AS properties FROM planet_osm_roads WHERE ST_INTERSECTS( ST_TRANSFORM(ST_SETSRID(way, 900913),4326), ST_SETSRID(ST_MAKEENVELOPE(" + left + "," + top + "," + right + "," + bottom + "), 4326) ) AND highway <> ''";

}

}
