# Version Checker Frontend

For the code navigate: 
> version-checker-frontend/src

Folder / file structure explained below

## Index.js
- The root file
- Renders the Redux Provider

## App.js

- Renders all of the components
- Utilizes Redux to store states of the serversoftware and Eols
- When the page is first rendered functions fetchEolsIfNeeded and fetchServerSoftwareIfNeeded are called from actions/index.js
- This is done to check if the Redux state should be updated
- Same functions are called as well when handleRefreshClick is called which also invalidates the server software and EoL data so it will be updated
- handleChange function handles the change of the data when a different server is selected
- Rendering the software version info and EoL info components has conditional rendering for cases when data set is empty or still loading

## Components

### - Overview.js
	- Data comes as props from App.js
	- Shows total number of software running on a server
	- Number of software that have newer versions available as updateable
	- Number of software that have EoL-date approaching in less than 90 days as EoL approaching
	- Number of software that is past the EoL-date for the version

### - Versioninfo.js
	- Gets serverdata from the App.js as props
	- Displays the following data as a table:
	  - Software name installed on the server
	  - Version of the software installed on the server
	  - Newest version available for the software

### - Eolinfo.js
	- Gets EoL data from the App.js as props
	- Displays the following data as a table:
	  - Software name installed on server
	  - Version of the software installed on the server
	  - EoL date of the version installed on the server

### - AddServerForm.js
	- Renders a dialog box that is opened when the button Add New Server is pressed
	- Dialog box allows the user to enter following details:
	  - Hostname
	  - Project name
	  - Username that is used to form an SSH-connection
	  - Password that is used to form an SSH-connection (Optional since SSH-connectivity works with keypairs as well)
	- When Save-button on the dialog box is pressed a POST-request is sent to the backend and data is saved to the DB

### - Listbutton.js
	- Gets function handleChange as props from the App.js
	- Said function handles the change of a server to get correct data from Redux
	- Renders a Menu that allows the user to change between servers
	- When a new menu item is selected function is called that calls handleChange and updates the button text to the menu item value
	- Renders a StartScan button that makes a call to the backend's startScan function
	- StartScan in the backend calls the Python server scan and Python EoL scan updating all server and EoL info
	- When StartScan button is pressed conditional rendering prevents a user from pressing the button again

## - Actions/index.js
- Contains necessary actions for Redux to work (fetch functions for software and EoL data, handling server change etc.)
- Utilizes reducers to simplify the code

## - Reducers/index.js
- Contains switch statements that actions/index.js can utilize to operate properly whilst reducing the amount of code in one file
- Creates the rootReducer that the root file index.js uses so Redux can be utilized in the App.js file
