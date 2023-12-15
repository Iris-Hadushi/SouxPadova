import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"

export default class Maps {
    constructor(){
        this.header = {
            el: document.querySelector('header'),
        };

        this.map = {
            container: document.getElementById('map'),
        }

        this.footer = document.querySelector('footer');

        this.token = {
            public: 'pk.GENERATE_YOUR_OWN_PUBLICK_KEY',
        }
    }

    init(){
        mapboxgl.accessToken = this.token.public;
        const map = new mapboxgl.Map({
            container: this.map.container.id, // container ID
            style: 'mapbox://styles/mapbox/light-v10', // style URL
            center: [11.780601510027918, 45.25738621010686], // starting position [lng, lat]
            zoom: 10 // starting zoom
        });

        const geojson = {
            type: 'FeatureCollection',
            features: [
                {
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: [11.780601510027918, 45.25738621010686]
                    },
                    properties: {
                        title: this.map.container.getAttribute('data-company'),
                        description: '<p>' + this.map.container.getAttribute('data-address') + '</p><ul class="nav flex-column"><li class="nav-item">' + this.map.container.getAttribute('data-phone') + ' dall\'italia</li><li class="nav-item">+39'+ this.map.container.getAttribute('data-phone') + ' dall\'estero</li><li class="nav-item">'+ this.map.container.getAttribute('data-email') +'</li></ul>'
                    }
                },
            ]
        };

          // add markers to map
        for (const { geometry, properties } of geojson.features) {
            // create a HTML element for each feature
            const el = document.createElement('div');
            el.className = 'marker';
        
            // make a marker for each feature and add to the map
            new mapboxgl.Marker(el)
            .setLngLat(geometry.coordinates)
            .setPopup(
                new mapboxgl.Popup({ offset: 25 }) // add popups
                .setHTML(`<h3>${properties.title}</h3><p>${properties.description}</p>`)
            )
            .addTo(map);
        }
    }

    set = () => {
        // Set using GSAP
    }

    animation = () => {
        // Animate using GSAP
    }
}
