# Radar Signal Sharing Extension

This browser extension allows Radar members to share signals more efficiently
without having to move from browser to discord and back

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

As this is a browser extension, do not expect full functionality when run in browser page mode

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The post build script will copy the build into 2 separate folders, `v2` and `v3`.\
As Firefox does not support Manifest v3 as of August 2022, you must use the v2 folder.\
Chrome requires a v3 manifest for publishing and to avoid deprecation warnings.
