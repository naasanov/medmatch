# Medmatch
## Tech Stack
* Frontend
  * Next.js
  * Tailwind CSS
* Backend
  * Express.js
  * MongoDB (mongoose)
  * Libraries
    * Validation - express-validator, class-validator
    * Testing - jest
## Onboarding
### Installing Dependencies
To get started after cloning the repo, first install the necessary dependencies.
The `client` and `server` folders are individual `npm` packages, so you will need to install the respective dependencies separately.  
Run the following commands from the root folder.
```sh
cd client
npm ci
cd ../server
npm ci
```
### Connecting To The Database
By this point, you should have recieved an invitation email to the database.  
If you haven't already, follow the link, make a new MongoDB account, and navigate to the overview page for MedMatch (may have to navigate through projects).   
A banner should appear at the top saying that your IP address is not added to the whitelist. Click the button to add your IP address.  
The tech lead should make a database user for you and provide you with a username and password. These will be necessary for the next section.  
### Setting Up Environment Variables
You will need to create a `.env` file in the `/server` directory.  
*Note: The file name should be ".env" verbatim, no file ending.*  
Then copy paste the following into the newly created file.
```.env
DB_USERNAME=[YOUR DATABASE USERNAME]
DB_PASSWORD=[YOUR DATABASE PASSWORD]
DB_HOST=radish.5ujpyx5.mongodb.net
DB_COLLECTION=medmatch
DB_CLUSTER=radish
DEV_PORT=4000
NODE_ENV=development
```
Make sure to replace the bracketed values with the corresponding data.
### Starting The Development Server
In order to start the frontend development server, run the following command from the `client` directory.
```
npm run dev
```
This works the same for the backend. Just run the same command from the `server` directory.
## API Structure
### Layers
The API is built on a multi-layer architecture. An overview of each layer and its function:
* **Data Layer** - Defines models that represent how data is structred in the database, and provides methods for simple database actions.
* **Service Layer** - Interfaces with the database and returns data in a defined structure. If any data related errors (such as 404s and 409s) occur, this is where they are handled (more on that later).
* **Controller Layer** - Handles core HTTP logic for the route, including extracting data from the request, performing the action requested via the injected service, and returning a response.
* **Router Layer** - Configures relevant services and controllers, defines the paths for each endpoint, and applies input validation and other middleware.

There are two other structures that contribute to the request flow of the API.
### Input Validation
All input validation is done through middleware, effectively creating a barrier to entry for the API layers. If any input validation errors are encountered through the process, they are automatically converted to an HTTP response and sent back to the client before the request reaches the controller.  
### Error Handling
If any errors occur within the controller logic, such as an absent document or an id conflict, a custom error is thrown, passed to the error handler, converted to an HTTP response, and sent to the client. This allows the controller to delegate most of the error logic to the error handler, with the HTTP configuration defined within the custom error class. This also keeps any HTTP logic out of the service layer, maintaining the desired amount of decoupling.
### Overview
Below is a diagram that details the flow of a request through the api  

![MedmatchAPI drawio (3)](https://github.com/user-attachments/assets/2e65c763-3fbf-4be3-9f1e-69da0be93c46)
## File Structure
The backend follows a modular structure, keeping all structures related to a certain feature nearby, within one directory. Each module follows a similar structure.
* ***.model.ts** - The data layer for the module. Contains relavent interfaces and `mongoose` models for the given feature.
* ***.service.ts** - The service layer for the module. Defines a service class and methods for the given feature.
* ***.controller.ts** - The controller layer for the module. Defines a controller class and request handlers for the given feature.
* ***.router.ts** - The router layer for the module. Configures the services, controllers, and routes for the given feature.
* utils
  * ***.errors.ts** - Defines custom errors thrown in the service, configured to be converted to an HTTP response.
  * ***.validator.ts** - Contains input validation logic and models for the given feature.

## Documentation Website
We will be using MkDocs for documentation. To run the documentation server, you need to do a few
things.

### Setup 
1. Install MkDocs and required plugins:
```bash
pip install mkdocs mkdocs-material pymdown-extensions 
```
2. Run documentation server:
```bash
cd docs
mkdocs serve
```
3. View the site on: http://127.0.0.1:8000/ 

### Building static documentation
To build the static site:
```bash
cd docs
mkdocs build
```
The static site is built in the ```docs/site``` directory.
