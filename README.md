# Getting Started with the Paack Deliveries React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). It also uses
React-Bootstrap as the front end framework.

#### Clone the Repo to your Local Environment

If you want to experiment with running this project in Continous Integration, you'll need
to [fork](https://github.com/cypress-io/cypress-example-todomvc#fork-destination-box) it first.

After pulling this project from `Github`, run these commands:

```bash
## clone this repo to a local directory
git clone https://github.com/bonificial/paack-deliveries.git
## cd into the cloned repo
cd paack-deliveries
## install the node_modules
npm install
## start the local webserver
npm start
```

#### The projects files organisation is quite simple:

Every Directory has an index file to centrally export the resources created in that directory. All resources are
categorised with their purpose. For the components, every component has its own style file in it.

#### Create the Environment Variables File

Create a .env file at the root folder add the following contents

```bash
REACT_APP_BASE_URL=https://60e84194673e350017c21844.mockapi.io/api
```

#### Available Scripts

In the project directory, you can run:

### `npm install`

Install project dependencies

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run cypress:open`

Open the Cypress GUI to run the created tests

#### Features

#### 🛠 Built with React

#### 🛠 Zero database dependencies

#### 🛠 Cypress Tests Integrated
