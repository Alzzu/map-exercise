<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Map places</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">

    <script src="{{ URL::asset('js/modal.js')}}"></script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key={{ env('APP_MAPSAPIKEY') }}" type="text/javascript"></script>
<link rel="stylesheet" href="{{ URL::asset('css/app.css') }}">

</head>
<body>
    <div id="map"></div>
    <ul id="list"></ul>
    <button onclick="toggleModal()">Test modal</button>
    <button class="testbutton">test button</button>

    <div class="modal" style="display: none;">
        <div class="modal-content">
            <button onclick="toggleModal()">close</button>
        </div>
    </div>
    <script type="module" src="{{ URL::asset('js/app.js')}}"></script>
</body>
</html>