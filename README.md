# TreasureHunt

Basic API to simulate adventurers hunting treasures at Madre de Dios in Peru. The API expose a route to upload a configuration file and return a simulation report.

## Getting started

Run `yarn` or `npm i` to install dependencies.

## Development server

Run `nx serve api` to launch the TreasureHunt api. By default the server is running at `http://localhost:4200/adventure-simulation`

## To upload configuration file

To upload a configuration file :

- `POST http://localhost:4200/adventure-simulation/upload/treasure-map` with the file attached in the body in the key **`map`** such as `{ map: larah.th }`

CURL example :

```
curl --location --request POST 'http://localhost:4200/adventure-simulation/upload/treasure-map' \
--form 'map=@"/C:/Users/gsainteluce/Desktop/perso/carbon-it/hunts/lara.th"'
```

Javascript fetch example :

```
var formdata = new FormData();
formdata.append("map", fileInput.files[0], "/C:/Users/gsainteluce/Desktop/perso/carbon-it/hunts/lara.th");

var requestOptions = {
 method: 'POST',
 body: formdata,
 redirect: 'follow'
};

fetch("http://localhost:4200/adventure-simulation/upload/treasure-map", requestOptions)
 .then(response => response.text())
 .then(result => console.log(result))
 .catch(error => console.log('error', error));
```

it will upload and generate the simulation report

## Running unit tests

Run `nx test adventure-interpreter` to execute the unit tests via [Jest](https://jestjs.io).
