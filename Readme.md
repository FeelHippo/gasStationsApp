# Filippo Miorin's autoSense Coding Challenge

This is the front end application for the RESTful API that can be found [here](https://github.com/FeelHippo/gasStationsAPI)

## Built With:

- [VueJs](https://www.npmjs.com/package/vue)
- [Vuex](https://www.npmjs.com/package/vuex)
- [Vue Router](https://www.npmjs.com/package/vue-router)
- [Vue2Leaflet](https://www.npmjs.com/package/vue2-leaflet)

... and several other packages that can be found in this repo's package.json.

## Install Dependencies

```
npm install
```

## Run the app

```
npm run serve
```

## Usage:

### Authentication:

In order to login, you must provide a valid username/password pair.
If you are not registered, provide a valid username/password pair, and then login using the same credentials.
Once logged in, a JWT token will be stored in the local storage, which is valid for 7 days, and will allow to automatically authenticate.

### Map:

- Create a new gas station by clicking on any point on the map.
- See a station's details by clicking on the corresponding icon.
- Modify a station's data by updating the input fields, and clicking on "Save".
- To delete a station, click on "Delete" and confirm.
