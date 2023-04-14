<h1 align="center" id="top" border="none"> 👩‍💻 Single Page Aplication - Svelte</h1>

### Netlify link: <a href="http://daffy-experience.surge.sh/" target="_blank" title="acess project">SPA</a>

<div align="center">
<a href="#sobre">About</a> | <a href="#requisitos">Requirements</a> | <a href="#regras">Business rules</a> | <a href="#opcionais">Opcionals done</a> | <a href='#backlog'>Backlog</a> | <a href='#run'>Run application</a> | <a href='#docker'>Docker</a> | <a href='#preview'>Preview</a> 
</div>

## <h2 id="sobre">📓 About<h2>

<p align="center">🚀 This project is a single page application following the requirements and business rules proposed in technical challenge</p>

## <h2 id="requisitos">📋 Requirements<h2>

The SPA must have:

- [x] A form (F1) with the following structure:
    * File input that accepts only files in the format ".json" and labeled "File"
    * Button labeled "Import"

- [x] Contains a second form (F2) with the following structure:
    * Text input with 1 to 20 characters and labeled "Extension"
    * Text input for integer numbers that range from 0 to 9999 and labeled "Count"
    * Text input for decimal numbers that range from 0 to 1000000 and labeled "Filesize"
    * Button labeled "Add"
 
- [x] Contains a table (T1) with the following columns:
    * "Extension", "Count", "Filesize", "Action"
 
## <h2 id="regras">💼 Business rules<h2>
 
- [x] The form F1 should accept json files with the following structure:
```
  [
	{
		"extension": "java",
		"count": 5000,
		"filesize": 360
	},
	{
		"extension": "xml",
		"count": 3,
		"filesize": 45.54
	},
	{
		"extension": "xml",
		"count": 14,
		"filesize": 45
	},
  ...
]
```

- [x] Once a valid file is selected and the user clicks on the button "Import", all the valid objects within the file should be added to the table "T1"
- [x] Once all fields in the form F2 are filled as valid and the user clicks on the button "Add", the valid object should also be added to the table "T1"
- [x] For each row, the "Action" should have an option link labeled "Delete" that, once clicked, will remove the corresponding row
- [x] The field "Extension" shall be unique, therefore only one row should be displayed on T1 for each extension type
- [x] Try to map as many error cases as possible within the SPA and display them for the user in a friendly manner
 
## <h2 id="opcionais">✔️ Opcionals done<h2>
  
- [x] Add an "Edit" link as an "Action" that allows the user to update any specific input within T1
- [x] Make usage of TypeScript on the implementation of the solution
- [x] Publish a Docker image with your application (including its dependencies) in a registry like Docker Hub
- [x] Create a README file or page on how to use your SPA

## <h2 id="backlog">🚧 Backlog<h2>

Opcional tasks not done:

- [ ] Add a pagination feature to table T1.
- [ ] Make the buttons "Add" and "Import" send a Post request to a Rest API (URL provided by a given environment variable)
- [ ] Create one ore more automated tests using a plugin of your choosing
- [ ] Deploy your solution to a cloud provider like Amazon AWS or Heroku

## <h2 id="run">🏃‍♀️ Run application<h2>

1 - Clone this repository:
```
git clone https://github.com/adriatls/SPA-Svelte.git
```
2 - Install dependencies:
```
npm install
```
3 - Run the application:
```
npm run dev
```

## <h2 id="docker">🐋♀️ Docker<h2>

1 - Pull my container from Docker Hub:
```
docker pull adriatls/adria-spa-web:latest
```

2 - Run the container:
```
docker run -d -p 3000:3000 adria/adria-spa-web
```
3 - In your browser: http://localhost:3000/

If you do not want to pull, it is possible to build and run the container locally
1 - Run the comand:
```
docker compose up -d --build --force-recreate
```

2 - In your browser: http://localhost:3000/

## <h2 id="preview">💻 Preview<h2>

![image](https://user-images.githubusercontent.com/71045022/232082554-d0ba319d-e55c-4d8a-bd12-811ad6b39aad.png)

![svelte](https://user-images.githubusercontent.com/71045022/232083393-2d80ac42-9574-488a-bf1b-3779b33d4d7e.gif)

___________________________________
<a href='#top'>Back to the top</a>
