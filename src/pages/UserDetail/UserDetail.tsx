import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const position: [number, number] = [39.9208, 32.8541];

const Container = styled.div`
  margin: 0 3rem;
`;

function UserDetail() {
  return (
    <Container>
      <div>Name Surname</div>
      <div>email</div>
      <div>Creation date</div>
      <div>Role</div>
      <MapContainer
        center={position}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={position}
          icon={L.icon({
            iconUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        >
          <Popup>
            Latitude: {position[0]} <br />
            Longitude: {position[1]}
          </Popup>
        </Marker>
      </MapContainer>
    </Container>
  );
}

export default UserDetail;
