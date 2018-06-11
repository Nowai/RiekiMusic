<p align="center">
    <h1>Rieki Music</h1>
</p>

<p align="center">
    <a href="https://github.com/Nowai/muimp/blob/master/LICENSE">
       <img src="https://img.shields.io/badge/license-MIT-blue.svg"> 
    </a>
    <a href="https://github.com/Nowai/muimp/blob/master/LICENSE">
        <img src="https://img.shields.io/badge/build-passing-green.svg"> 
    </a>
    <a href="">
        <img src="https://img.shields.io/badge/version-3.0-lightgrey.svg"> 
    </a>
</p>

### A modern music player interface written in react 

![img1](https://raw.githubusercontent.com/Nowai/muimp/master/imgs/screenshot_1.png)
![img2](https://raw.githubusercontent.com/Nowai/muimp/master/imgs/screenshot_2.png)

Rieki Music is a modern music player interface inspired by players like spotify and soundcloud. It is build using modern JavaScript utilizing React and howler.js providing a multiplatform user interface to access and play your music locally or from the internet.

All Rieki Music requires is a REST server providing it with data, I recommend [jmrs](https://github.com/Nowai/jmrs) which was developed in tandem with Rieki Music but it is also quite easy to adapt the source to a different data provider. 

## Build

To build muimp clone this repository and run ```npm install```. For the development build run ```npm run dev``` for the minified production build run ```npm run build```. The dev script will run a local node.js server on port 3000. 

## License

MIT - Copyright 2018 Florian Marienwald