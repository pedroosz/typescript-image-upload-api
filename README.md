## Image upload api
#### Technologies
- Typescript
- Multer
- Express

#### Dependencies
You can install all dependencies by using `npm install` or `yarn`, you will also need [tsx]("https://www.npmjs.com/package/tsx") in order to run the without using [ts-node]("https://www.npmjs.com/package/ts-node") and [ts-node-dev]("https://www.npmjs.com/package/ts-node-dev"), unlike ts-node and ts-node-dev, tsx is powered by [esbuild]("https://esbuild.github.io/"), making it really fast.

#### Setting up tsx
In order to install [tsx]("https://www.npmjs.com/package/tsx") globally, run: 
`npm install tsx --global` or `yarn global add tsx`
then after installing  tsx you can simply run:
`npm run dev` or `yarn dev`

But if you don't want to install it, you can run by using: 
`npx tsx watch ./src/index.ts`
this way it will run and automatically restart when a file changes.

#### Setting up the files you want to receive

inside `src/config/multer.ts` on the line 6 there is a constant called `FILE_TYPES`, it is a regexp to check if the files sended have a [mime type]("https://mimetype.io/all-types") we want to receive, you can change it to match your desires.

#### Endpoints
- `GET` `/uploads` - Get all uploads id's
- `GET` `/uploads/:id` - Get a specific upload
- `DELETE` `/uploads/:id` - Delete a specific upload
- `POST` `/uploads` - Store uploads

#### Response examples

### GET /uploads
##### Expected response
> **(Status code 200)**
```json
{
  "filenames": [
    "76b32bfa97b161b7f0bace0dafa04ae7",
    "141458a531ba57832d8317526a2dec2c",
    "..."
  ]
}
```

### GET /uploads/:id
##### Expected response
> **(Status code 200)**

`Disered file.`

##### Possible responses
> **(Status code 404)**
```json
{
    "message": "File not found."
}
```
> **(Status code 500)**
```json
{
    "message": "Internal server error.",
}
```

### DELETE /uploads/:id
##### Expected response
> **(Status code 200)**
```json
{
    "message": "File deleted."
}
```

##### Possible responses
> **(Status code 404)**
```json
{
    "message": "File not found."
}
```
> **(Status code 500)**
```json
{
    "message": "Internal server error.",
}
```

### POST /uploads
##### Example fetch
```ts
const exampleForm = document.getElementById("example-form")

// exampleForm must have a input[type="files"] in order to work.

exampleForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(exampleForm);

  fetch("http://localhost:3000/uploads", {
    method: "POST",
    body: formData
  })
  .then((res) => res.json())
  .then((data) => console.log(data))
})
```

##### Expected response
> **(Status code 200)**
```json
{
  "filenames": [
    "76b32bfa97b161b7f0bace0dafa04ae7",
    "141458a531ba57832d8317526a2dec2c",
    "..."
  ]
}
```

##### Possible responses
> **(Status code 400)**
```json
{
  "message": "File(s) not provided."
}
```