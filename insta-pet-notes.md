## Initial Setup

- `npm init -y` create the package.json file
- install dependencies: `npm install express mongoose bcrypt jsonwebtoken dotenv`
- updated the package.json to reflect the `app.js` not the `index.js`
- created the app.js file
- added boiler plate code
- add a gitgnore file and reference the node_modules folder
- refactor the code to use our environment file
- update the gitignore to include your env file.

## Boiler Plate Code

```js
const express = require("express");
const app = express();

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
```

## Creating Models

- Models help define what our data collection will look like.
- You will want to create a file in the models folder for each different "Collection"
- example naming: `users.model.js`