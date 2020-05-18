<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Map places</title>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key={{ env('APP_MAPSAPIKEY') }}&callback=initMap" type="text/javascript"></script>
    <style>
        #map {
            height: 30em;
        }
    </style>
</head>
<body>
    <h1>Places</h1>
    <div id="map"></div>
    <ul id="list"></ul>

    <script src="{{ URL::asset('js/main.js')}}"></script>
    <script src="{{ URL::asset('js/maps.js')}}"></script>
</body>
</html>