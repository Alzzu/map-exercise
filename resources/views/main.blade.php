<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Map places</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">

    <script src="{{ URL::asset('js/modal.js')}}"></script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key={{ env('APP_MAPSAPIKEY') }}&callback=initMap" type="text/javascript"></script>
    <style>
        html {
            font-family: 'Open Sans', sans-serif;
        }

        #map {
            height: 30em;
        }

        .modal {
            display: none;
            position: fixed;
            z-index: 1;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            overflow: auto;
            background: rgba(150, 150, 150, 0.5);
        }

        .modal-content {
            margin: 15% auto;
            padding: 1em;
            width: 80%;
            background: #000;
        }
    </style>

</head>
<body>
    <div id="map"></div>
    <ul id="list"></ul>
    <button onclick="toggleModal()">Test modal</button>

    <div class="modal" style="display: none;">
        <div class="modal-content">
            <button onclick="toggleModal()">close</button>
        </div>
    </div>
    <script src="{{ URL::asset('js/main.js')}}"></script>
    <script src="{{ URL::asset('js/maps.js')}}"></script>
</body>
</html>