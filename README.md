# 321movies

[321moviesinfo.com](https://321moviesinfo.com) is a react web app created with CRA, that provides users with all the latest and updated information about any sort of movie.

The data has been provided by [tmdb](https://www.themoviedb.org/documentation/api) api.

## Installation
Check the version of __node__ you have installed with the following command
```bash
node -v
```
If __node__ is not in your computer, download it [here](https://nodejs.dev/download)

Run the following command to install [npm](https://www.npmjs.com/package/install) locally
```bash
npm install
```
OR

Run the following command to install [npm](https://www.npmjs.com/package/install) globally.
```bash
npm install -g
```

Check the [documentation](https://docs.npmjs.com/) for more info.

Just to make sure everything has been installed correctly, check the version of both __node__ and __npm__ with the following commands
```bash
node -v
```

AND

```bash
npm -v
```

## Usage

Get your personal API key by creating a [tmdb](https://www.themoviedb.org/signup) account. Then, go to the following [link](https://www.themoviedb.org/settings/api), click on the link provided under "Request an API Key", and follow the instructions provided.

Once you've got your own API key, create a .env file in the project's root folder and type the following
```bash
REACT_APP_SECRET_KEY=your_api_key
```
Run the following command to run the project in a localhost
```bash
npm start
```
AND the following for the sass compiler

```bash
npm run sass
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)