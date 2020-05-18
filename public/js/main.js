document.addEventListener('DOMContentLoaded', () => {
    const setList = (element, content) => {
        document.querySelector(element).innerHTML = content
    }

    const getPlaces = () => {
        const placesRequest = new XMLHttpRequest();

        placesRequest.open('GET', 'api/places');
        placesRequest.onload = () => {
            if(placesRequest.status === 200) {
                let buffer = ""
                JSON.parse(placesRequest.responseText).map(place => {
                    console.log(place)
                    buffer += "<div><h2>" + place.title +  "</h2><p>" + place.description + "</p><span>" + place.coordinates +  "</span><span>" + place.hours +  "</span></div>"
        
                })
                setList('#list', buffer)
            }
            else {
                placesRequest.status();
            }
        };
    placesRequest.send();
    }    
    
    getPlaces()

}, false)
