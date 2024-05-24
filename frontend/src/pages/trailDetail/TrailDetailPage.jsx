import React, { useEffect, useState, useCallback } from "react";
import MainLayout from "../../components/MainLayout";
import styles from "./styles/traildetailpage.module.css";
import BreadCrumbs from "../../components/BreadCrumbs";
import { images } from "../../constants";
import { Link } from "react-router-dom";
import SuggestedTrails from "./SuggestedTrails";
import axios from "axios";
import { trails } from "../../constants";
import { IoMdDownload } from "react-icons/io";
import CommentsContainer from "../../components/comments/CommentsContainer";
import SocialShareButtons from "../../components/SocialShareButtons";

const breadCrumbsData = [
  { name: "Acasă", link: "/" },
  { name: "Trails", link: "/trail" },
  { name: "Trail title", link: "/trail/1" },
];

const photoData = [
  {
    _id: "1",
    image: images.HeroImage,
  },
  {
    _id: "2",
    image: images.HeroImage,
  },
  {
    _id: "3",
    image: images.HeroImage,
  },
  {
    _id: "4",
    image: images.HeroImage,
  },
  {
    _id: "5",
    image: images.HeroImage,
  },
  {
    _id: "6",
    image: images.HeroImage,
  },
];

const postsData = [
  {
    _id: "1",
    image: images.post,
    title: "Lorem ipsum dolor sit amet.",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "2",
    image: images.post,
    title: "Lorem ipsum dolor sit amet.",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "3",
    image: images.post,
    title: "Lorem ipsum dolor sit amet.",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
  {
    _id: "4",
    image: images.post,
    title: "Lorem ipsum dolor sit amet.",
    createdAt: "2023-01-28T15:35:53.607+0000",
  },
];

const tagsData = ["Enduro", "Singletrack", "Cross-country", "Downhill"];

const TrailDetailPage = () => {
  const [map, setMap] = useState(null);
  const [currentRoute, setCurrentRoute] = useState(null);

  const initializeMap = useCallback(() => {
    if (!map) {
      const defaultLocation = { lat: 47.1387, lng: 24.5136 }; // Coordonatele pentru Bistrița, România
      const mapInstance = new window.google.maps.Map(
        document.getElementById("map"),
        {
          center: defaultLocation,
          zoom: 13,
          mapTypeId: "satellite", // Setează modul de hartă la satelit
          streetViewControl: false, // Dezactivează controlul Street View
          zoomControlOptions: {
            style: window.google.maps.ZoomControlStyle.SMALL, // Face butoanele de zoom mai mici
          },
          mapTypeControlOptions: {
            style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU, // Face butoanele de tip de hartă mai mici
            position: window.google.maps.ControlPosition.TOP_RIGHT, // Poziționează butoanele de tip de hartă în partea dreaptă sus
          },
          fullscreenControl: false, // Dezactivează controlul de fullscreen
          labels: true, // Activează etichetele pe hartă
        }
      );
      setMap(mapInstance);
    }
  }, [map]);

  useEffect(() => {
    // Initializează harta la încărcarea paginii
    initializeMap();
  }, [initializeMap]);

  const drawGpxRoute = useCallback(
    (gpxContent) => {
      // Șterge traseul anterior dacă există
      if (currentRoute) {
        currentRoute.setMap(null);
      }

      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(gpxContent, "text/xml");
      const tracks = xmlDoc.getElementsByTagName("trk");
      const coordinates = [];

      for (let i = 0; i < tracks.length; i++) {
        const trackpoints = tracks[i].getElementsByTagName("trkpt");
        for (let j = 0; j < trackpoints.length; j++) {
          const lat = parseFloat(trackpoints[j].getAttribute("lat"));
          const lng = parseFloat(trackpoints[j].getAttribute("lon"));
          coordinates.push({ lat, lng });
        }
      }

      const route = new window.google.maps.Polyline({
        path: coordinates,
        geodesic: true,
        strokeColor: "#FF0000",
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      route.setMap(map);
      setCurrentRoute(route);

      // Zoom către traseul nou desenat
      const bounds = new window.google.maps.LatLngBounds();
      coordinates.forEach((coord) => bounds.extend(coord));
      map.fitBounds(bounds);
    },
    [currentRoute, map]
  );

  useEffect(() => {
    if (map && trails.ValeaMagherusului) {
      axios
        .get(trails.ValeaMagherusului) // Încarcă conținutul fișierului GPX folosind axios
        .then((response) => {
          drawGpxRoute(response.data);
        })
        .catch((error) => console.error("Eroare încărcare fișier GPX:", error));
    }
  }, [map, drawGpxRoute]);

  return (
    <MainLayout>
      <section className={styles.container}>
        <article className={styles.breadcrumbs_wrap}>
          <BreadCrumbs data={breadCrumbsData} />
          <img
            className={styles.post_image}
            src={images.post}
            alt="post_image"
          />
          <Link
            to="/trail?category=selectedCategory"
            className={styles.category_link}
          >
            DOWNHILL
          </Link>
          <h1 className={styles.post_title}>Lorem ipsum dolor sit amet.</h1>
          <div className={styles.post_description}>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat
              at rerum totam saepe omnis magni fuga nemo quos recusandae sequi
              quasi, accusamus iusto autem dignissimos minus, nisi itaque fugit
              obcaecati explicabo consequatur ipsum officia error. Quod
              adipisci, ipsum doloremque fugit non nobis quis enim commodi
              alias, minima accusantium repellendus nesciunt quia dignissimos
              rerum iure nam natus debitis ratione recusandae aliquam?
            </p>
          </div>
          <div className={styles.photos_container}>
            {photoData.map((item, index) => (
              <img
                key={index}
                className={styles.post_image}
                src={item.image}
                alt="enduro"
              />
            ))}
          </div>
          <h2 className={styles.map_title}>Lorem ipsum:</h2>
          <div id="map" className={styles.map}></div>
          <button className={styles.download_button}>
            Descarcă traseul <IoMdDownload className={styles.button_icon} />
          </button>
          <CommentsContainer logginedUserId="a" />
        </article>
        <div>
          <div className={styles.suggested_shares}>
            <SuggestedTrails
              header="Ultimele trasee"
              posts={postsData}
              tags={tagsData}
            />
            <h2 className={styles.shares}>Distribuie </h2>
            <SocialShareButtons
              url={encodeURI(
                `https://www.linkedin.com/in/gabriel-stanciu-b66482268/`
              )}
              title={encodeURIComponent("Stanciu Gabriel LinkedIn")}
            />
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default TrailDetailPage;
