import * as THREE from 'three';
import { merge } from './merge.js';
import { FBXLoader } from 'three/examples/jsm/Addons.js';
import axios from 'axios'; // Import axios

import config from '../../../config/config.js';


// Function to create a texture with text
function createTextTexture(text) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    const fontSize = 24;
    context.font = `${fontSize}px Arial`;
    context.fillStyle = 'white';
    context.fillText(text, 0, fontSize);

    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.needsUpdate = true;

    return texture;
}

/*
 * parameters = {
 *  url: String,
 *  passage: {positionX: Number, positionY: Number, direction: String},
 *  halfSize: {width: Number, depth: Number},
 * }
 */
export default class Passage extends THREE.Group {
    constructor(parameters) {
        super();
        merge(this, parameters);

        this.loaded = false;

        // Function to fetch room name using axios
        const fetchPassageFromDatabase = async (passageId) => {
            console.log('Passage ID:', passageId);
            console.log('Floor ID:', this.floorId);
            try {
                const response = await axios.get(config.mgiAPI.baseUrl + config.mgiAPI.routes.passages + passageId, {
                    withCredentials: true,
                });

                // console.log('Response:', response);

                if(this.floorId == response.data.fromFloor.id){
                    return response.data.toFloor.information;
                }else{
                    return response.data.fromFloor.information;
                }
            } catch (error) {
                console.error('Error fetching room name:', error);
                return null; // Return null in case of an error
            }
        };

        this.createTextSprite = (passageName, posX, posY) => {
            const finalX = posX - Math.floor(this.mapSize.width / 2);
            const finalY = posY - Math.floor(this.mapSize.depth / 2) + 1;
            const textTexture = createTextTexture(passageName);
            const textMaterial = new THREE.SpriteMaterial({ map: textTexture });

            const passageNameSprite = new THREE.Sprite(textMaterial);
            passageNameSprite.scale.set(2, 2, 2);
            passageNameSprite.position.set(finalX, 0, finalY);

            passageNameSprite.material.depthTest = false;

            this.add(passageNameSprite);

            // console.log('Sprite created for:', passageName);
        };

        this.onLoad = async function (object) {
            object.scale.set(0.1, 0.1, 0.1);
            if (this.passage.position.direction === 'north') {
                object.position.set(
                    this.passage.position.positionX - this.halfSize.width + 0.5,
                    0,
                    this.passage.position.positionY - this.halfSize.depth,
                );
            } else {
                object.position.set(
                    this.passage.position.positionX - this.halfSize.width,
                    0,
                    this.passage.position.positionY - this.halfSize.depth + 0.5,
                );
                object.rotateY(Math.PI / 2);
            }

            // // Create a material with light brown color
            // const material = new THREE.MeshPhongMaterial({ color: 0xd2b48c }); // Use the color code for light brown

            // // Assign the material to the object's children (assuming the model has child meshes)
            // object.traverse((child) => {
            //     if (child.isMesh) {
            //         child.material = material;
            //     }
            // });

            // Set the scale after loading textures
            object.scale.set(this.dScale[0], this.dScale[1], this.dScale[2]);

            // Add the passage object to the scene
            this.add(object);

            
            // Get room name asynchronously using roomId from parameters
            const name = await fetchPassageFromDatabase(parameters.passageId);

            const passageName = `${name}`;
            const passagePosX = this.passage.position.positionX;
            const passagePosY = this.passage.position.positionY;

            this.createTextSprite(passageName, passagePosX, passagePosY);


            this.loaded = true;
        };

        const onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + ((100.0 * xhr.loaded) / xhr.total).toFixed(0) + '% loaded.');
        };

        const onError = function (url, error) {
            console.error("Error loading resource '" + url + "' (" + error + ').');
        };

        // Create a resource .fbx file loader
        const loader = new FBXLoader();

        // Load a model description resource file
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            (object) => this.onLoad(object),

            // onProgress callback
            (xhr) => onProgress(this.url, xhr),

            // onError callback
            (error) => onError(this.url, error),
        );
    }
}
