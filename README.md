# Online graph editor

Simple graph editor created using Vue.js, JavaScript and Vite

## Demo
[Demo](https://amalakh.github.io/online-graph-editor/)
## Run locally

### Run manually (NodeJS Required)
```
git clone https://github.com/AmalAkh/online-graph-editor

cd online-graph-editor

npm install

npm run build

npm run preview
```

### Run with Docker
Create dockerfile

```
FROM node:20

RUN git clone https://github.com/AmalAkh/online-graph-editor
WORKDIR /online-graph-editor/

RUN npm install
RUN npm run build
EXPOSE 8001


CMD ["npm", "run", "preview"]
```
Then run these commands

```
docker build -t online-graph-editor .

docker run -p 8001:8080 online-graph-editor
```
Editor available now on http://localhost:8080/

## To do
+ ~~Implement element removal~~
+ Implement simple graph algorithms
+ Implement redo/undo

