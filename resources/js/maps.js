let map2;
let markers = []

const initMap = (items) => {
    map2 = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 60.995339758930285, lng: 24.467076726810678},
        zoom: 8
    });
    console.log(items)
    items.map(item => {
        console.log('adding marker')
        addMarker(item, map2)
    })

    return map2
}

const addMarker = (location, map) => {
    const marker = new google.maps.Marker({
        position: location,
        map: map
    })
    markers.push(marker)
}

const refreshMarkers = (places) => {
    console.log('asd')
    markers.map(marker => marker.setMap(null))
    markers = []
    console.log(places)

    places.map(item => {
        console.log('adding marker')
        addMarker(item, map2)
    })

}



module.exports = { initMap, refreshMarkers }