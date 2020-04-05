import React, { useEffect, useState } from 'react';
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import GoogleMapReact from "google-map-react";


function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
    .all([
      axios.get("https://corona.lmao.ninja/all"),
      axios.get("https://corona.lmao.ninja/countries")
    ])
      .then(responseArr => {
        setLatest(responseArr[0].data);
        setResults(responseArr[1].data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();


  const countriesLocations = results.map((data, i) => {
    return (
      <div
        lat={data.countryInfo.lat}
        lng={data.countryInfo.long}
        style={{
          color: "red",
          backgroundColor: "#FFF",
          height: "25px",
          width: "35px",
          textAlign: "center",
          borderRadius: "30%",
        }}
      >
        <img height="10px" src={data.countryInfo.flag} />
        <br />
        {data.cases}
      </div>
    );
  });

  return (
   <div>
     <br />
     <h2 style={{ textAlign: "center" }}> Covid-19 Live Stats </h2>
     <br />
     <CardDeck>
      <Card 
        bg="secondary" 
        text="white" 
        className="text-center" 
        style={{ margin: "10px" }}>
        <Card.Body>
          <Card.Title>Cases</Card.Title>
          <Card.Text>{latest.cases}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small>Last updated {lastUpdated}</small>
        </Card.Footer>
      </Card>

      <Card 
        bg="danger" 
        text={"white"} 
        className="text-center" 
        style={{ margin: "10px" }}>
        <Card.Body>
          <Card.Title>Deaths</Card.Title>
          <Card.Text>{latest.deaths}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small>Last updated {lastUpdated}</small>
        </Card.Footer>
      </Card>

      <Card 
        bg="success" 
        text={"white"} 
        className="text-center" 
        style={{ margin: "10px" }}>
        <Card.Body>
          <Card.Title>Recovered</Card.Title>
          <Card.Text>{latest.recovered}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small>Last updated {lastUpdated}</small>
        </Card.Footer>
      </Card>
    </CardDeck>
    <br />

    <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyC6ZDKrAtT0FtWH7WcGlrXCk-INOx5h254" }}
          defaultCenter={{ lat: 37, lng: 127.5}}
          defaultZoom={4}
        >
          {countriesLocations}
        </GoogleMapReact>
      </div>
   </div>
  );
}

export default App;