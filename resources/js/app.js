import { initMap, refreshMarkers } from './maps.js'
import { getPlaces } from './main.js';

const app = async () => {
    const items = await getPlaces()
    const map = await initMap(items)

    document.querySelector('.testbutton').addEventListener('click', async () => {
        const places = await getPlaces()
        refreshMarkers(places2)
    })

    google.maps.event.addListener(map, 'click', (e) => {
        console.log(e.latLng.toString())
    })
}

document.addEventListener('DOMContentLoaded', app)