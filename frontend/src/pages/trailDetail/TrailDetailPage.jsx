import React, { useEffect, useState, useCallback } from "react";
import MainLayout from "../../components/MainLayout";
import styles from "./styles/traildetailpage.module.css";
import BreadCrumbs from "../../components/BreadCrumbs";
import { images, stables } from "../../constants";
import { Link, useParams } from "react-router-dom";
import SuggestedTrails from "./SuggestedTrails";
import axios from "axios";
import { IoMdDownload } from "react-icons/io";
import CommentsContainer from "../../components/comments/CommentsContainer";
import SocialShareButtons from "../../components/SocialShareButtons";
import Bold from "@tiptap/extension-bold";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import { useQuery } from "@tanstack/react-query";
import { getAllPosts, getSinglePost } from "../../services/index/posts";
import { generateHTML } from "@tiptap/react";
import parse from "html-react-parser";
import TrailDetailSkeleton from "../components/TrailDetailSkeleton";
import ErrorMessage from "../../components/ErrorMessage";
import { useSelector } from "react-redux";

const TrailDetailPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);
  const [breadCrumbsData, setBreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);
  const [map, setMap] = useState(null);
  const [currentRoute, setCurrentRoute] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ["trail", slug],
    onSuccess: (data) => {
      setBreadCrumbsData([
        { name: "Acasă", link: "/" },
        { name: "Trail", link: "/trail" },
        { name: data.title, link: `/trails/${slug}` },
      ]);
      setBody(
        parse(
          generateHTML(data?.body, [Bold, Italic, Text, Paragraph, Document])
        )
      );
    },
  });

  useEffect(() => {
    if (data) {
      setBreadCrumbsData([
        { name: "Acasă", link: "/" },
        { name: "Trail", link: "/trail" },
        { name: data.title, link: `/trails/${slug}` },
      ]);
      parse(
        generateHTML(data?.body, [Bold, Italic, Text, Paragraph, Document])
      );
    }
  }, [data, slug]);

  const initializeMap = useCallback(() => {
    if (!map && data) {
      const defaultLocation = { lat: 47.1387, lng: 24.5136 }; // Coordinates for Bistrita, Romania
      const mapInstance = new window.google.maps.Map(
        document.getElementById("map"),
        {
          center: defaultLocation,
          zoom: 13,
          mapTypeId: "satellite", // Set map type to satellite
          streetViewControl: false, // Disable street view control
          zoomControlOptions: {
            style: window.google.maps.ZoomControlStyle.SMALL, // Make zoom buttons smaller
          },
          mapTypeControlOptions: {
            style: window.google.maps.MapTypeControlStyle.DROPDOWN_MENU, // Make map type buttons smaller
            position: window.google.maps.ControlPosition.TOP_RIGHT, // Position map type buttons top right
          },
          fullscreenControl: false, // Disable fullscreen control
          labels: true, // Enable labels on map
        }
      );
      setMap(mapInstance);
    }
  }, [map, data]);

  useEffect(() => {
    // Initialize map when component mounts
    initializeMap();
  }, [initializeMap]);

  const drawGpxRoute = useCallback(
    (gpxContent) => {
      // Remove previous route if exists
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

      // Zoom to the newly drawn route
      const bounds = new window.google.maps.LatLngBounds();
      coordinates.forEach((coord) => bounds.extend(coord));
      map.fitBounds(bounds);
    },
    [currentRoute, map]
  );

  useEffect(() => {
    if (map && data?.gpxTrail && !isLoaded) {
      const gpxFilePath = `/uploads/${data.gpxTrail}`;

      axios
        .get(gpxFilePath, { responseType: "blob" })
        .then((response) => {
          const url = URL.createObjectURL(response.data);
          fetch(url)
            .then((res) => res.text())
            .then((text) => {
              drawGpxRoute(text);
              setIsLoaded(true);
            })
            .catch((error) => {
              console.error("Error processing GPX file:", error);
            });
        })
        .catch((error) => {
          console.error("Error loading GPX file:", error);
          // Handle error, e.g., show an error message to the user
        });
    }
  }, [map, data, drawGpxRoute, isLoaded]);

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ["posts"],
  });

  return (
    <MainLayout>
      {isLoading ? (
        <TrailDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Failed to load trails." />
      ) : (
        <section className={styles.container}>
          <article className={styles.breadcrumbs_wrap}>
            <BreadCrumbs data={breadCrumbsData} />
            <img
              className={styles.post_image}
              src={
                data?.photo
                  ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo
                  : images.post_image
              }
              alt={data?.title}
            />
            <div className={styles.category_wrapper}>
              {data?.categories.map((category) => (
                <Link
                  key={category._id}
                  to={`/trail?category=${category.name}`}
                  className={styles.category_link}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className={styles.post_title}>{data?.title}</h1>
            <div className={styles.post_description}>
              <p>{body}</p>
            </div>
            <div className={styles.photos_container}>
              {data?.photoGallery.map((photo, index) => (
                <img
                  key={index}
                  className={styles.post_images}
                  src={`${stables.UPLOAD_FOLDER_BASE_URL}${photo}`}
                  alt={`Poza - Traseu ${index}`}
                />
              ))}
            </div>
            <h2 className={styles.map_title}>Map:</h2>
            <div id="map" className={styles.map}></div>
            <button className={styles.download_button}>
              Descarcă traseul <IoMdDownload className={styles.button_icon} />
            </button>
            <CommentsContainer
              comments={data?.comments}
              logginedUserId={userState?.userInfo?._id}
              postSlug={slug}
            />
          </article>
          <div>
            <div className={styles.suggested_shares}>
              <SuggestedTrails
                header="Ultimele trasee"
                posts={postsData}
                tags={data?.tags}
              />
              <h2 className={styles.shares}>Share</h2>
              <SocialShareButtons
                url={encodeURI(window.location.href)}
                title={encodeURIComponent(data?.title)}
              />
            </div>
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default TrailDetailPage;
