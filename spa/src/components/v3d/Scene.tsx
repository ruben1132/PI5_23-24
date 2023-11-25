'use client';

// react
import React, { ChangeEvent, useEffect, useState } from 'react';
// axios
import axios from 'axios';

// config
import config from '../../../config';

// css
import '../../styles/v3d.css';

// models
import { Floor } from '@/models/Floor.jsx';
import { Building } from '@/models/Building.js';
import { Form } from 'react-bootstrap';

// threejs and project itself
import * as THREE from 'three';
import Orientation from './orientation.js';
import ThumbRaiser from './thumb_raiser.js';

// notification component
import { notify } from '@/components/notification/Notification';

interface Props {
    buildings: Building[];
}

export default function Scene(props: Props) {
    let animationFrameId: number;
    const [thumbRaiser, setThumbRaiser] = useState<ThumbRaiser>();
    const [floors, setFloors] = useState<Floor[]>([]);

    useEffect(() => {
        let thumbRaiserr: ThumbRaiser;

        function initialize() {
            thumbRaiserr = new ThumbRaiser(
                {}, // General Parameters
                {
                    enabled: true,
                    introductionClips: [
                        {
                            url: '/v3d/clips/elevator.mp3',
                            position: 'initial', // Global (non-positional) audio object: ""; positional audio object: "scene x y z" (scene specific position in cartesian coordinates), "maze line column" (maze specific position in cell coordinates), "exit" (maze exit location), "initial" (player initial position), "player" (player current position), "spotlight" (spotlight current position)
                            referenceDistance: 1.0,
                            loop: false,
                            volume: 0.5,
                        },
                    ],
                    idleClips: [
                        {
                            url: '/v3d/clips/r2d2.mp3',
                            position: 'player',
                            referenceDistance: 1.0,
                            loop: false,
                            volume: 0.75,
                        },
                        {
                            url: '/v3d/clips/r2d2.mp3',
                            position: 'player',
                            referenceDistance: 1.0,
                            loop: false,
                            volume: 0.75,
                        },
                        {
                            url: '/v3d/clips/r2d2.mp3',
                            position: 'player',
                            referenceDistance: 1.0,
                            loop: false,
                            volume: 0.75,
                        },
                    ],
                    jumpClips: [
                        {
                            url: '/v3d/clips/Cheering-A6-www.fesliyanstudios.com.mp3',
                            position: 'player',
                            referenceDistance: 1.0,
                            loop: false,
                            volume: 0.75,
                        },
                        {
                            url: '/v3d/clips/Cheering-A7-www.fesliyanstudios.com.mp3',
                            position: 'player',
                            referenceDistance: 1.0,
                            loop: false,
                            volume: 0.75,
                        },
                    ],
                    deathClips: [
                        {
                            url: '/v3d/clips/hit.mp3',
                            position: 'player',
                            referenceDistance: 1.0,
                            loop: false,
                            volume: 0.75,
                        },
                        {
                            url: '/v3d/clips/hit.mp3',
                            position: 'player',
                            referenceDistance: 1.0,
                            loop: false,
                            volume: 0.75,
                        },
                    ],
                    danceClips: [
                        {
                            url: '/v3d/clips/best-buddies-12609.mp3',
                            position: 'exit',
                            referenceDistance: 1.0,
                            loop: true,
                            volume: 0.5,
                        },
                    ],
                    endClips: [
                        {
                            url: '/v3d/clips/Ba-Bum-Tss-Joke-Drum-A1-www.fesliyanstudios.com.mp3',
                            position: 'exit',
                            referenceDistance: 1.0,
                            loop: false,
                            volume: 2.0,
                        },
                        {
                            url: '/v3d/clips/yay-6326.mp3',
                            position: 'exit',
                            referenceDistance: 1.0,
                            loop: false,
                            volume: 0.75,
                        },
                        {
                            url: '/v3d/clips/crowd-cheer-ii-6263.mp3',
                            position: 'exit',
                            referenceDistance: 1.0,
                            loop: false,
                            volume: 0.75,
                        },
                    ],
                    credits:
                        "Sound clips downloaded from <a href='https://www.dreamstime.com/' target='_blank' rel='noopener'>Dreamstime</a>, <a href='https://www.fesliyanstudios.com/' target='_blank' rel='noopener'>Fesliyan Studios</a> and <a href='https://pixabay.com/' target='_blank' rel='noopener'>Pixabay</a>.",
                }, // Audio parameters
                {
                    skyboxes: [
                        {
                            // Stormy days
                            name: 'Stormy days',
                            texturePath: '/v3d/cube_textures/envmap_stormydays/',
                            texturePositiveXUrl: 'stormydays_ft.jpg',
                            textureNegativeXUrl: 'stormydays_bk.jpg',
                            texturePositiveYUrl: 'stormydays_up.jpg',
                            textureNegativeYUrl: 'stormydays_dn.jpg',
                            texturePositiveZUrl: 'stormydays_rt.jpg',
                            textureNegativeZUrl: 'stormydays_lf.jpg',
                            credits:
                                "Skybox created by <a href='https://opengameart.org/content/stormy-days-skybox' target='_blank' rel='noopener'>Jockum Skoglund (hipshot)</a>.",
                        },
                        {
                            // Miramar
                            name: 'Miramar',
                            texturePath: '/v3d/cube_textures/red-eclipse-skyboxes/skyboxes/',
                            texturePositiveXUrl: 'miramar_ft.jpg',
                            textureNegativeXUrl: 'miramar_bk.jpg',
                            texturePositiveYUrl: 'miramar_up.jpg',
                            textureNegativeYUrl: 'miramar_dn.jpg',
                            texturePositiveZUrl: 'miramar_rt.jpg',
                            textureNegativeZUrl: 'miramar_lf.jpg',
                            credits:
                                "Skybox created by <a href='https://opengameart.org/content/red-eclipse-skyboxes' target='_blank' rel='noopener'>Red Eclipse</a>.",
                        },
                        {
                            // Flat sunset
                            name: 'Flat sunset',
                            texturePath: '/v3d/cube_textures/red-eclipse-skyboxes/skyboxes/',
                            texturePositiveXUrl: 'sunsetflat_ft.jpg',
                            textureNegativeXUrl: 'sunsetflat_bk.jpg',
                            texturePositiveYUrl: 'sunsetflat_up.jpg',
                            textureNegativeYUrl: 'sunsetflat_dn.jpg',
                            texturePositiveZUrl: 'sunsetflat_rt.jpg',
                            textureNegativeZUrl: 'sunsetflat_lf.jpg',
                            credits:
                                "Skybox created by <a href='https://opengameart.org/content/red-eclipse-skyboxes' target='_blank' rel='noopener'>Red Eclipse</a>.",
                        },
                        {
                            // Calm sea
                            name: 'Calm sea',
                            texturePath: './cube_textures/xonotic-skyboxes/skyboxes/calm_sea/',
                            texturePositiveXUrl: 'calm_sea_ft.jpg',
                            textureNegativeXUrl: 'calm_sea_bk.jpg',
                            texturePositiveYUrl: 'calm_sea_up.jpg',
                            textureNegativeYUrl: 'calm_sea_dn.jpg',
                            texturePositiveZUrl: 'calm_sea_rt.jpg',
                            textureNegativeZUrl: 'calm_sea_lf.jpg',
                            credits:
                                "Skybox created by <a href='https://opengameart.org/content/xonotic-skyboxes' target='_blank' rel='noopener'>Xonotic</a>.",
                        },
                        {
                            // Distant sunset
                            name: 'Distant sunset',
                            texturePath: './cube_textures/xonotic-skyboxes/skyboxes/distant_sunset/',
                            texturePositiveXUrl: 'distant_sunset_ft.jpg',
                            textureNegativeXUrl: 'distant_sunset_bk.jpg',
                            texturePositiveYUrl: 'distant_sunset_up.jpg',
                            textureNegativeYUrl: 'distant_sunset_dn.jpg',
                            texturePositiveZUrl: 'distant_sunset_rt.jpg',
                            textureNegativeZUrl: 'distant_sunset_lf.jpg',
                            credits:
                                "Skybox created by <a href='https://opengameart.org/content/xonotic-skyboxes' target='_blank' rel='noopener'>Xonotic</a>.",
                        },
                        {
                            // Exosystem
                            name: 'Exosystem',
                            texturePath: './cube_textures/xonotic-skyboxes/skyboxes/exosystem/',
                            texturePositiveXUrl: 'exosystem_ft.jpg',
                            textureNegativeXUrl: 'exosystem_bk.jpg',
                            texturePositiveYUrl: 'exosystem_up.jpg',
                            textureNegativeYUrl: 'exosystem_dn.jpg',
                            texturePositiveZUrl: 'exosystem_rt.jpg',
                            textureNegativeZUrl: 'exosystem_lf.jpg',
                            credits:
                                "Skybox created by <a href='https://opengameart.org/content/xonotic-skyboxes' target='_blank' rel='noopener'>Xonotic</a>.",
                        },
                        {
                            // Heaven
                            name: 'Heaven',
                            texturePath: '/v3d/cube_textures/xonotic-skyboxes/skyboxes/heaven/',
                            texturePositiveXUrl: 'heaven_ft.jpg',
                            textureNegativeXUrl: 'heaven_bk.jpg',
                            texturePositiveYUrl: 'heaven_up.jpg',
                            textureNegativeYUrl: 'heaven_dn.jpg',
                            texturePositiveZUrl: 'heaven_rt.jpg',
                            textureNegativeZUrl: 'heaven_lf.jpg',
                            credits:
                                "Skybox created by <a href='https://opengameart.org/content/xonotic-skyboxes' target='_blank' rel='noopener'>Xonotic</a>.",
                        },
                    ],
                    selected: 2,
                }, // Cube texture parameters
                {
                    url: '/v3d/mazes/defaultPlant.json',
                    designCredits: '',
                    texturesCredits: '',
                    helpersColor: new THREE.Color(0xff0077),
                }, // Maze parameters
                { helpersColor: new THREE.Color(0x0055ff) }, // Player parameters
                {
                    intensity: 0.1,
                }, // Ambient light parameters
                {
                    intensity: 0.5,
                    distance: 20.0,
                    orientation: new Orientation(-38.7, 53.1),
                    castShadow: true,
                    shadow: {
                        mapSize: new THREE.Vector2(2048, 2048),
                        camera: {
                            left: -20.0,
                            right: 20.0,
                            top: 20.0,
                            bottom: -20.0,
                            near: 0.0,
                            far: 40.0,
                        },
                    },
                }, // Directional light parameters
                {
                    visible: false,
                    intensity: 90.0,
                    distance: 40.0,
                    angle: 4.0,
                    position: new THREE.Vector3(0.0, 10.0, 0.0),
                    castShadow: true,
                    shadow: {
                        camera: {
                            near: 5.0,
                            far: 30.0,
                        },
                    },
                }, // Spotlight parameters
                {
                    color: new THREE.Color(0xffffa0),
                    visible: false,
                    intensity: 2.0,
                    distance: 5.0,
                    angle: 20.0,
                    orientation: new Orientation(0.0, -20.0),
                    castShadow: true,
                    shadow: {
                        camera: {
                            near: 0.01,
                            far: 10.0,
                        },
                    },
                }, // Flashlight parameters
                {
                    type: THREE.PCFSoftShadowMap,
                }, // Shadows parameters
                {}, // Fog parameters
                {}, // Collision detection parameters
                {
                    view: 'fixed',
                    initialViewport: new THREE.Vector4(0.0, 1.0, 0.45, 0.5),
                    initialFogDensity: 0.1,
                }, // Fixed view camera parameters
                {
                    view: 'first-person',
                    initialViewport: new THREE.Vector4(1.0, 1.0, 0.55, 0.5),
                    initialOrientation: new Orientation(0.0, -10.0),
                    orientationMax: new Orientation(180.0, 90.0),
                    initialFogDensity: 0.7,
                }, // First-person view camera parameters
                {
                    view: 'third-person',
                    initialViewport: new THREE.Vector4(0.0, 0.0, 0.55, 0.5),
                    initialOrientation: new Orientation(0.0, -20.0),
                    initialDistance: 2.0,
                    distanceMin: 1.0,
                    distanceMax: 4.0,
                    initialFogDensity: 0.3,
                }, // Third-person view camera parameters
                {
                    view: 'top',
                    initialViewport: new THREE.Vector4(1.0, 0.0, 0.45, 0.5),
                    initialOrientation: new Orientation(0.0, -90.0),
                    initialDistance: 4.0,
                    distanceMin: 1.0,
                    distanceMax: 16.0,
                    initialFogDensity: 0.2,
                }, // Top view camera parameters
                {
                    view: 'mini-map',
                    initialViewport: new THREE.Vector4(0.5, 0.5, 0.3, 0.3),
                    initialOrientation: new Orientation(180.0, -90.0),
                    initialZoom: 0.64,
                    zoomMin: 0.64,
                    zoomMax: 5.12,
                }, // Mini-map view camera parameters
            );

            setThumbRaiser(thumbRaiserr);
        }

        function animate() {
            animationFrameId = requestAnimationFrame(animate); // Store the animation frame ID
            // Update the game
            thumbRaiserr.update();
        }

        initialize();
        animate();

        function cleanup() {
            // Stop any ongoing animations or event listeners here
            // For example, you can stop the animation loop and remove event listeners
            cancelAnimationFrame(animationFrameId); // Make sure to store the animationFrameId when starting the animation
            thumbRaiserr.dispose(); // Dispose of any Three.js resources
        }

        // Return the cleanup function to be called when the component unmounts
        return () => {
            // Call the cleanup function when the component unmounts
            cleanup();
        };
    }, []);

    const handleSelectBuilding = async (event: ChangeEvent<HTMLSelectElement>) => {
        try {
            const response = await axios.get(
                config.mgiAPI.baseUrl + config.mgiAPI.routes.floors + 'buildingId/' + event.target.value,
            );
            if (response.status !== 200) {
                notify.error('Error fetching floors');
                return;
            }

            setFloors(response.data);
        } catch (e) { }
    };

    const handleSelectFloor = (event: ChangeEvent<HTMLSelectElement>): void => {
        thumbRaiser?.changeMaze(event.target.value + '.json');
    };

    return (
        <>
            <div id="canvas" className="v3dcanvas">
                <div id="container">
                    <div id="views-panel">
                        <table className="v3dtable views">
                            <tbody>
                                <tr>
                                    <td>
                                        View:
                                        <select id="view">
                                            <option value="fixed">Fixed</option>
                                            <option value="first">First-person</option>
                                            <option value="third">Third-person</option>
                                            <option value="top">Top</option>
                                        </select>
                                    </td>
                                    <td>
                                        Orientation (h):
                                        <input className="v3dinput" type="number" id="horizontal" required />
                                    </td>
                                    <td>
                                        Orientation (v):
                                        <input className="v3dinput" type="number" id="vertical" required />
                                    </td>
                                    <td>
                                        <input className="v3dinput" type="button" id="reset" value="Reset view" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Projection:
                                        <select id="projection">
                                            <option value="perspective">Perspective</option>
                                            <option value="orthographic">Orthographic</option>
                                        </select>
                                    </td>
                                    <td>
                                        Distance:
                                        <input className="v3dinput" type="number" id="distance" required />
                                    </td>
                                    <td>
                                        Zoom:
                                        <input className="v3dinput" type="number" id="zoom" required />
                                    </td>
                                    <td>
                                        <input type="button" id="reset-all" value="Reset all views" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="selects-panel">
                        <table className="v3dtable views">
                            <tbody>
                                <tr>
                                    <td>
                                        Buildings:
                                        <Form.Select onChange={handleSelectBuilding}>
                                            <option defaultChecked={true}>Select building</option>
                                            {props.buildings.map((building) => (
                                                <option value={building.id} key={building.id}>{building.name}</option>
                                            ))}
                                        </Form.Select>
                                    </td>
                                    <td>
                                        {floors.length > 0 && (
                                            <>
                                                <span> Floors:</span>
                                                <Form.Select onChange={handleSelectFloor}>
                                                    <option defaultChecked={true}>Select floor</option>
                                                    {floors.map((floor) => (
                                                        <option value={floor.id} key={floor.id}>{floor.information}</option>
                                                    ))}
                                                </Form.Select>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="mouse-help-panel">
                        <table className="v3dtable mouse-help" id="mouse-help-table">
                            <tbody>
                                <tr>
                                    <th colSpan={5} style={{ fontSize: '2.0vmin' }}>
                                        Help - Mouse
                                    </th>
                                </tr>
                                <tr>
                                    <th>View</th>
                                    <th>Primary button</th>
                                    <th>Secondary button</th>
                                    <th>Shift-wheel</th>
                                    <th>Wheel</th>
                                </tr>
                                <tr>
                                    <td>Fixed</td>
                                    <td>Drag / resize</td>
                                    <td>Orbit</td>
                                    <td>Dolly</td>
                                    <td>Zoom</td>
                                </tr>
                                <tr>
                                    <td>First-person</td>
                                    <td>Drag / resize</td>
                                    <td>Orbit</td>
                                    <td>n/a</td>
                                    <td>Zoom</td>
                                </tr>
                                <tr>
                                    <td>Third-person</td>
                                    <td>Drag / resize</td>
                                    <td>Orbit</td>
                                    <td>Dolly</td>
                                    <td>Zoom</td>
                                </tr>
                                <tr>
                                    <td>Top</td>
                                    <td>Drag / resize</td>
                                    <td>Orbit</td>
                                    <td>Dolly</td>
                                    <td>Zoom</td>
                                </tr>
                                <tr>
                                    <td>Mini-map</td>
                                    <td>Drag / resize</td>
                                    <td>Pan</td>
                                    <td>n/a</td>
                                    <td>Zoom</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="keyboard-help-panel">
                        <table className="v3dtable keyboard-help" id="keyboard-help-table">
                            <tbody>
                                <tr>
                                    <th colSpan={2} style={{ fontSize: '2.0vmin' }}>
                                        Help - Keyboard
                                    </th>
                                </tr>
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'left' }}>
                                        Set view mode
                                    </th>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Stabilized view mode / realistic view mode</td>
                                </tr>
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'left' }}>
                                        Display / select / hide views
                                    </th>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Fixed view</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>First-person view</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Third-person view</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Top view</td>
                                </tr>
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'left' }}>
                                        Display / hide subwindows and bounding volumes
                                    </th>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Mini-map</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Statistics</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>User interface</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Help and credits</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Bounding volumes</td>
                                </tr>
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'left' }}>
                                        Turn on / off lights, shadows and fog
                                    </th>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Ambient light</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Directional light</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Spotlight</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Flashlight</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Shadows</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Fog</td>
                                </tr>
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'left' }}>
                                        Move character
                                    </th>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Turn left slowly / quickly (with shift key)</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Turn right slowly / quickly (with shift key)</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Walk / run (with shift key) backward</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Walk / run (with shift key) forward</td>
                                </tr>
                                <tr>
                                    <th colSpan={2} style={{ textAlign: 'left' }}>
                                        Emote character
                                    </th>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Jump</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>No</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Wave</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Punch</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td>Thumbs up</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="credits-panel">
                        <table className="v3dtable credits" id="credits-table">
                            <tbody>
                                <tr>
                                    <th style={{ fontSize: '2.0vmin' }}>Credits</th>
                                </tr>
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div id="subwindows-panel">
                        <table className="subwindows">
                            <tbody>
                                <tr>
                                    <td>
                                        Realistic view mode:
                                        <input className="v3dinput" type="checkbox" id="realistic" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Fixed view:
                                        <input className="v3dinput" type="checkbox" id="fixed" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        First-person view:
                                        <input className="v3dinput" type="checkbox" id="first-person" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Third-person view:
                                        <input className="v3dinput" type="checkbox" id="third-person" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Top view:
                                        <input className="v3dinput" type="checkbox" id="top" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Mini-map:
                                        <input className="v3dinput" type="checkbox" id="mini-map" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Statistics:
                                        <input className="v3dinput" type="checkbox" id="statistics" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        User interface:
                                        <input className="v3dinput" type="checkbox" id="user-interface" />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        Help and credits:
                                        <input className="v3dinput" type="checkbox" id="help" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div id="scene" style={{ paddingTop: 100 }}> </div>
        </>
    );
}
