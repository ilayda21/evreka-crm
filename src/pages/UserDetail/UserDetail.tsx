import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

const position: [number, number] = [39.9208, 32.8541];

const Container = styled.div`
  margin: 2rem 3rem;
  ${({ theme }) => theme.media.tablet} {
    display: flex;
    gap: 3rem;
  }

  ${({ theme }) => theme.media.desktop} {
    margin: 3rem 5rem;
    display: flex;
    gap: 3rem;
  }
`;

const InfoContainer = styled.div`
  flex-shrink: 1;
  margin-bottom: 2rem;
  ${({ theme }) => theme.media.tablet} {
    flex-shrink: 0;
    margin-bottom: 0;
  }
`;

const NameContainer = styled.div`
  font-size: 2rem;
  ${({ theme }) => theme.media.tablet} {
    font-size: 3rem;
  }
`;

const OtherInfo = styled.div`
  font-size: 1.5rem;
  ${({ theme }) => theme.media.tablet} {
    font-size: 2rem;
  }
`;

function UserDetail() {
  return (
    <Container>
      <InfoContainer>
        <NameContainer>Name Surname</NameContainer>
        <OtherInfo>email@gmail.com</OtherInfo>
        <OtherInfo>Role</OtherInfo>
        <OtherInfo>Creation date</OtherInfo>
      </InfoContainer>

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
