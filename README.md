# Radar Signals Chrome Extension
### Quick Start

#### Install dependencies
* `yarn` or `yarn install`
* In `src/data/` copy `.test.channels.example.json` to a new file called `.test.channels.json` (e.g. `src/data/.test.channels.json`) and populate with your channel names, categories, id's and webhooks.

> RADAR DAO members: ask in [#product-squad](https://discord.com/channels/913873017287884830/961996856198590544) for an example file with test channels

#### Development
* `yarn dev`
* Then visit [http://localhost:3000](http://localhost:3000) in your web browser

> The page will reload if you make edits.
> You will also see any lint errors in the console.

#### Production (run as a Chrome extension)

* `yarn build`
* Now, [load the extension from the `build` folder](https://support.google.com/chrome/a/answer/2714278?hl=en#:~:text=At%20the%20top%20right%2C%20turn,the%20app%20or%20extension%20folder.&text=click%20the%20app%20or%20extension.)



#### Testing
> TODO 
* `yarn test`

> Launches the test runner in the interactive watch mode.
> See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

