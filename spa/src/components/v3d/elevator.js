import * as THREE from 'three';
import { merge } from './merge.js';
import { GLTFLoader } from 'three/examples/jsm/Addons.js';


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
 *  elevator: {positionX: Number, positionY: Number, direction: String},
 *  halfSize: {width: Number, depth: Number},
 * }
 */
export default class Elevator extends THREE.Group {
    constructor(parameters) {
        super();
        merge(this, parameters);

        this.loaded = false;

        this.createTextSprite = (elevatorName, posX, posY) => {
            const finalX = posX - Math.floor(this.mapSize.width / 2);
            const finalY = posY - Math.floor(this.mapSize.depth / 2) + 1;
            const textTexture = createTextTexture(elevatorName);
            const textMaterial = new THREE.SpriteMaterial({ map: textTexture });

            const elevatorNameSprite = new THREE.Sprite(textMaterial);
            elevatorNameSprite.scale.set(2, 2, 2);
            elevatorNameSprite.position.set(finalX, 0, finalY);

            elevatorNameSprite.material.depthTest = false;

            this.add(elevatorNameSprite);

            // console.log('Sprite created for:', elevatorName);
        };

        this.onLoad = function (object) {
            switch (this.elevator.position.direction) {
                case 'north':
                    object.scene.position.set(
                        this.elevator.position.positionX - this.halfSize.width + 0.5,
                        0.5,
                        this.elevator.position.positionY - this.halfSize.depth,
                    );
                    break;
                case 'south':
                    object.scene.position.set(
                        this.elevator.position.positionX - this.halfSize.width + 0.5,
                        0.5,
                        this.elevator.position.positionY - this.halfSize.depth,
                    );
                    object.scene.rotateY(Math.PI);
                    break;
                case 'east':
                    object.scene.position.set(
                        this.elevator.position.positionX - this.halfSize.width,
                        0.5,
                        this.elevator.position.positionY - this.halfSize.depth + 0.5,
                    );
                    object.scene.rotateY(Math.PI / 2);
                    break;
                case 'west':
                    object.scene.position.set(
                        this.elevator.position.positionX - this.halfSize.width,
                        0.5,
                        this.elevator.position.positionY - this.halfSize.depth + 0.5,
                    );
                    object.scene.rotateY(-Math.PI / 2);
                    break;
            }

            // Set the scale after loading textures
            object.scene.scale.set(0.008, 0.003, 0.006);
            this.add(object.scene);

            const elevatorPosX = this.elevator.position.positionX;
            const elevatorPosY = this.elevator.position.positionY;

            this.createTextSprite("Elevator", elevatorPosX, elevatorPosY);

            this.loaded = true;
        };

        const onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + ((100.0 * xhr.loaded) / xhr.total).toFixed(0) + '% loaded.');
        };

        const onError = function (url, error) {
            console.error("Error loading resource '" + url + "' (" + error + ').');
        };

        // Create a resource .gltf or .glb file loader
        const loader = new GLTFLoader();

        // Load a model description resource file
        this.url = '/v3d/models/elevator/elevator.glb';
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
