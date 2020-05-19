

const setList = (element, content) => {
    document.querySelector(element).innerHTML = content
}

export const getPlaces = async () => {
    return new Promise((resolve, reject) => {
        let items = []

        const placesRequest = new XMLHttpRequest();
        placesRequest.open('GET', 'api/places');
        placesRequest.onload = () => {
            if(placesRequest.status === 200) {
                let buffer = ""
                items = JSON.parse(placesRequest.responseText).map(item => ({lat: parseFloat(item.coordinates.split(',')[0]), lng: parseFloat(item.coordinates.split(',')[1].substr(1))}))
                console.log(items)
                JSON.parse(placesRequest.responseText).map(place => {
                    console.log(place)
                    buffer += "<div><h2>" + place.title +  "</h2><p>" + place.description + "</p><span>" + place.coordinates +  "</span><span>" + place.hours +  "</span></div>"
        
                })
                setList('#list', buffer)
                resolve(items) 
            }
            else {
                reject(placesRequest.status())
                
            }
        };
        placesRequest.send();
    })
    
}
