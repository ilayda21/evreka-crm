import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';

function UserDetail() {

    return <div>
        UserDetailpage

        <MapContainer
            center={[39.92, 32.85]}
            zoom={6}
            style={{height: '20rem', width: '20rem'}}
        >
            <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {<Marker position={[39.92, 32.85]} icon={L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })} />}
        </MapContainer>
    </div>
}

export default UserDetail