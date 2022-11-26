async function updated(){

    // calling the api
const url = "https://coronavirus-tracker-api.herokuapp.com/v2/locations"

    //  fetching the api
  const response = await fetch(url)
  const data = await response.json();
  console.log(data.locations)
  const locations=data.locations

//  looping in the api
  for(let element of locations){
    latitude = element.coordinates.latitude;
    longitude= element.coordinates.longitude;
    deaths = element.latest.deaths
    // recovered = element.latest.recovered
    cases = element.latest.confirmed;
    last_updated = element.last_updated.split('T')[0]
    country = element.country
    // coloring the countries based on thier cases
    if  (cases <=150000){
        color = "green"
    }
    else if (cases >150000 && cases <=250000 ){
        color = "yellow"
    }
    else if(cases >250000 && cases <=300000){
        color = "orange"
    }
    else{
        color= "red"
    }
//  popup display
    const popup = new mapboxgl.Popup({ offset: 25 }).setText(
        `Country : ${country},
        Total Cases  :  ${cases} , 
         No.of Deaths :  ${deaths},
         last Update : ${last_updated}`  
                
        );

    // marking in the map

    new mapboxgl.Marker({
        draggable: false,
        color: color,
        zoom: 0,
        // center:[100,100]
        })
        .setLngLat([longitude, latitude])
        .setPopup(popup)
        .addTo(map); 
    }
}
updated()

// themes
const layerList = document.getElementById('menu');
const inputs = layerList.getElementsByTagName('input');

for (const input of inputs) {
input.onclick = (layer) => {
const layerId = layer.target.id;
map.setStyle('mapbox://styles/mapbox/' + layerId);
};
}