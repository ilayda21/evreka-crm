import styled from "styled-components";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useParams } from "react-router-dom";
import { useMemo } from "react";
import type { User } from "../../utils/generateData";

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

const Map = styled(MapContainer)`
  height: 400px;
  width: 100%;
`;

function UserDetail() {
  const { id } = useParams();

  const user = useMemo(() => {
    const stored = localStorage.getItem("users");
    if (!stored || !id) return null;
    const parsed: User[] = JSON.parse(stored);
    return parsed.find((user) => user.id === id);
  }, [id]);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Container>
      <InfoContainer>
        <NameContainer>{user.name}</NameContainer>
        <OtherInfo>{user.email}</OtherInfo>
        <OtherInfo>{user.role}</OtherInfo>
        <OtherInfo>{user.createdAt}</OtherInfo>
      </InfoContainer>

      <Map center={user.location} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={user.location}
          icon={L.icon({
            iconUrl:
              "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
          })}
        >
          <Popup>
            Latitude: {user.location[0]} <br />
            Longitude: {user.location[1]}
          </Popup>
        </Marker>
      </Map>
    </Container>
  );
}

export default UserDetail;
