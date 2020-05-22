<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    
    <title>Map places</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet">

    <script src="{{ URL::asset('js/modal.js')}}"></script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key={{ env('APP_MAPSAPIKEY') }}" type="text/javascript"></script>
    <link rel="stylesheet" href="{{ URL::asset('css/app.css') }}">

</head>
<body>
    <div id="map"></div>
    <div>
        <div class="place"><h2>Select place from the map!</h2></div>
        <button onclick="window.toggleAddModal()">Test modal</button>
        <button class="testbutton">test button</button>
    
        <div class="modal" style="display: none;">
            <div class="modal-content">
                <button onclick="toggleModal()">close</button>
            </div>
        </div>
    
        <div class="addModal modal" style="display: none;" data-method="">
            <div class="modal-content">
                <div class="item">
                    <label for="title">Title</label>
                    <input type="text" name="title">
                </div>
                <div class="item">
                    <label for="description">Description</label>
                    <input type="text" name="description">
                </div>
                <div class="item">
                    <label for="coordinates">Coodinates</label>
                    <input type="text" name="coordinates">
                </div>
                <div class="item">
                    <label for="hours">Open hours</label>
                    <input type="text" name="hours">
                </div>
                <div class="item tags">
                </div>

                <div class="controls">
                    <button class="addSubmit send-button">Submit</button>
                    <button onclick="toggleAddModal()">close</button>
                </div>
            </div>
        </div>
    </div>
    <script type="module" src="{{ URL::asset('js/app.js')}}"></script>
</body>
</html>