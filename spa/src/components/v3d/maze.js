import * as THREE from 'three';
import * as BufferGeometryUtils from 'three/addons/utils/BufferGeometryUtils.js';
import { OBB } from 'three/addons/math/OBB.js';
import { merge } from './merge.js';
import Ground from './ground.js';
import Wall from './wall.js';
import Elevator from './elevator.js';
import Door from './door.js';
import Passage from './passage.js';

/*
 * parameters = {
 *  url: String,
 *  designCredits: String,
 *  texturesCredits: String,
 *  scale: Vector3,
 *  helpersColor: Color
 * }
 */

export default class Maze extends THREE.Group {
    constructor(parameters) {
        super();
        merge(this, parameters);
        this.loaded = false;

        this.onLoad = function (description) {
            const normalMapTypes = [THREE.TangentSpaceNormalMap, THREE.ObjectSpaceNormalMap];
            const wrappingModes = [THREE.ClampToEdgeWrapping, THREE.RepeatWrapping, THREE.MirroredRepeatWrapping];
            const magnificationFilters = [THREE.NearestFilter, THREE.LinearFilter];
            const minificationFilters = [
                THREE.NearestFilter,
                THREE.NearestMipmapNearestFilter,
                THREE.NearestMipmapLinearFilter,
                THREE.LinearFilter,
                THREE.LinearMipmapNearestFilter,
                THREE.LinearMipmapLinearFilter,
            ];

            // Store the maze's size, map and exit location
            this.floorId = description.floor;
            this.size = description.maze.size;
            this.halfSize = { width: this.size.width / 2.0, depth: this.size.depth / 2.0 };
            this.map = description.maze.map;
            this.exitLocation = this.cellToCartesian(description.maze.exitLocation);

            // Create the helpers
            this.helper = new THREE.Group();

            // Create the ground
            const ground = new Ground({
                size: new THREE.Vector3(
                    description.ground.size.width,
                    description.ground.size.height,
                    description.ground.size.depth,
                ),
                segments: new THREE.Vector3(
                    description.ground.segments.width,
                    description.ground.segments.height,
                    description.ground.segments.depth,
                ),
                materialParameters: {
                    color: new THREE.Color(parseInt(description.ground.primaryColor, 16)),
                    mapUrl: description.ground.maps.color.url,
                    aoMapUrl: description.ground.maps.ao.url,
                    aoMapIntensity: description.ground.maps.ao.intensity,
                    displacementMapUrl: description.ground.maps.displacement.url,
                    displacementScale: description.ground.maps.displacement.scale,
                    displacementBias: description.ground.maps.displacement.bias,
                    normalMapUrl: description.ground.maps.normal.url,
                    normalMapType: normalMapTypes[description.ground.maps.normal.type],
                    normalScale: new THREE.Vector2(
                        description.ground.maps.normal.scale.x,
                        description.ground.maps.normal.scale.y,
                    ),
                    bumpMapUrl: description.ground.maps.bump.url,
                    bumpScale: description.ground.maps.bump.scale,
                    roughnessMapUrl: description.ground.maps.roughness.url,
                    roughness: description.ground.maps.roughness.rough,
                    wrapS: wrappingModes[description.ground.wrapS],
                    wrapT: wrappingModes[description.ground.wrapT],
                    repeat: new THREE.Vector2(description.ground.repeat.u, description.ground.repeat.v),
                    magFilter: magnificationFilters[description.ground.magFilter],
                    minFilter: minificationFilters[description.ground.minFilter],
                },
                secondaryColor: new THREE.Color(parseInt(description.ground.secondaryColor, 16)),
            });
            this.add(ground);

            // Create a wall
            const wall = new Wall({
                groundHeight: description.ground.size.height,
                segments: new THREE.Vector2(description.wall.segments.width, description.wall.segments.height),
                materialParameters: {
                    color: new THREE.Color(parseInt(description.wall.primaryColor, 16)),
                    mapUrl: description.wall.maps.color.url,
                    aoMapUrl: description.wall.maps.ao.url,
                    aoMapIntensity: description.wall.maps.ao.intensity,
                    displacementMapUrl: description.wall.maps.displacement.url,
                    displacementScale: description.wall.maps.displacement.scale,
                    displacementBias: description.wall.maps.displacement.bias,
                    normalMapUrl: description.wall.maps.normal.url,
                    normalMapType: normalMapTypes[description.wall.maps.normal.type],
                    normalScale: new THREE.Vector2(
                        description.wall.maps.normal.scale.x,
                        description.wall.maps.normal.scale.y,
                    ),
                    bumpMapUrl: description.wall.maps.bump.url,
                    bumpScale: description.wall.maps.bump.scale,
                    roughnessMapUrl: description.wall.maps.roughness.url,
                    roughness: description.wall.maps.roughness.rough,
                    wrapS: wrappingModes[description.wall.wrapS],
                    wrapT: wrappingModes[description.wall.wrapT],
                    repeat: new THREE.Vector2(description.wall.repeat.u, description.wall.repeat.v),
                    magFilter: magnificationFilters[description.wall.magFilter],
                    minFilter: minificationFilters[description.wall.minFilter],
                },
                secondaryColor: new THREE.Color(parseInt(description.wall.secondaryColor, 16)),
            });

            // Build the maze
            let geometry;
            let geometries = [];
            geometries[0] = [];
            geometries[1] = [];
            this.aabb = [];
            for (let i = 0; i <= this.size.depth; i++) {
                // In order to represent the southmost walls, the map depth is one row greater than the actual maze depth
                this.aabb[i] = [];
                for (let j = 0; j <= this.size.width; j++) {
                    // In order to represent the eastmost walls, the map width is one column greater than the actual maze width
                    this.aabb[i][j] = [];
                    /*
                     *  this.map[][] | North wall | West wall
                     * --------------+------------+-----------
                     *       0       |     No     |     No
                     *       1       |     No     |    Yes
                     *       2       |    Yes     |     No
                     *       3       |    Yes     |    Yes
                     */
                    if (this.map[i][j] == 2 || this.map[i][j] == 3) {
                        this.aabb[i][j][0] = new THREE.Box3();
                        for (let k = 0; k < 2; k++) {
                            geometry = wall.geometries[k].clone();
                            geometry.applyMatrix4(
                                new THREE.Matrix4().makeTranslation(
                                    j - this.halfSize.width + 0.5,
                                    0.25,
                                    i - this.halfSize.depth,
                                ),
                            );
                            geometry.computeBoundingBox();
                            geometry.boundingBox.applyMatrix4(
                                new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z),
                            );
                            geometries[k].push(geometry);
                            this.aabb[i][j][0].union(geometry.boundingBox);
                        }
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][0], this.helpersColor));
                    }
                    if (this.map[i][j] == 1 || this.map[i][j] == 3) {
                        this.aabb[i][j][1] = new THREE.Box3();
                        for (let k = 0; k < 2; k++) {
                            geometry = wall.geometries[k].clone();
                            geometry.applyMatrix4(new THREE.Matrix4().makeRotationY(Math.PI / 2.0));
                            geometry.applyMatrix4(
                                new THREE.Matrix4().makeTranslation(
                                    j - this.halfSize.width,
                                    0.25,
                                    i - this.halfSize.depth + 0.5,
                                ),
                            );
                            geometry.computeBoundingBox();
                            geometry.boundingBox.applyMatrix4(
                                new THREE.Matrix4().makeScale(this.scale.x, this.scale.y, this.scale.z),
                            );
                            geometries[k].push(geometry);
                            this.aabb[i][j][1].union(geometry.boundingBox);
                        }
                        this.helper.add(new THREE.Box3Helper(this.aabb[i][j][1], this.helpersColor));
                    }
                }
            }

            // create the elevator
            this.elevator = null;
            if (description.fmElevator) {
                const elevator = new Elevator({
                    elevator: description.fmElevator,
                    halfSize: this.halfSize,
                    mapSize: this.size,
                });

                const elevatorPos = this.cellToCartesian([
                    description.fmElevator.position.positionY,
                    description.fmElevator.position.positionX,
                ]);
                const elevatorAccess = this.cellToCartesian([
                    description.fmElevator.access.positionY,
                    description.fmElevator.access.positionX,
                ]);
                this.elevator = {
                    position: {
                        x: elevatorPos.x,
                        z: elevatorPos.z,
                    },
                    acess: {
                        x: elevatorAccess.x,
                        z: elevatorAccess.z,
                    },
                    direction: description.fmElevator.position.direction,
                    halfSize: elevator.halfSize,
                };
                this.add(elevator);
            }
            
            // create doors
            this.doors = []; // create array of doors to use for collisions detection
            description.fmRooms?.forEach((r) => {
                const door = new Door({
                    roomId: r.roomId,
                    door: r.door,
                    halfSize: this.halfSize,
                    url: '/v3d/models/door/3d-model.fbx',
                    dScale: [0.018, 0.0055, 0.025],
                    mapSize: this.size,
                });

                if (r?.door?.position?.positionX && r?.door?.position?.positionY) {
                    this.doors.push(door);
                }
                this.add(door);
            });

            // create the passage
            this.passages = [];
            description.fmPassages?.forEach((p) => {
                // console.log('Passage ' + p.position.positionX + ' ' + p.position.positionY);
                const passage = new Passage({
                    passageId: p.passageId,
                    floorId: this.floorId,
                    passage: p,
                    halfSize: this.halfSize,
                    url: '/v3d/models/passage/passage.fbx',
                    dScale: [0.0015, 0.0015, 0.0005],
                    mapSize: this.size,
                });

                this.passages.push(passage);
                
                this.add(passage);
            });

            // console.log('Passages ' + this.passages.length);
            // console.log('Passages ' + JSON.stringify(this.passages));

            let mergedGeometry, mesh;
            for (let i = 0; i < 2; i++) {
                mergedGeometry = BufferGeometryUtils.mergeGeometries(geometries[i], false);
                mesh = new THREE.Mesh(mergedGeometry, wall.materials[i]);
                mesh.castShadow = true;
                mesh.receiveShadow = true;
                this.add(mesh);
            }

            // Store the player's initial position and direction
            this.initialPosition = this.cellToCartesian(description.player.initialPosition);
            this.initialDirection = description.player.initialDirection;

            this.loaded = true;
        };

        const onProgress = function (url, xhr) {
            console.log("Resource '" + url + "' " + ((100.0 * xhr.loaded) / xhr.total).toFixed(0) + '% loaded.');
        };

        const onError = function (url, error) {
            console.error("Error loading resource '" + url + "' (" + error + ').');
        };

        // The cache must be enabled; additional information available at https://threejs.org/docs/api/en/loaders/FileLoader.html
        THREE.Cache.enabled = true;

        // Create a resource file loader
        const loader = new THREE.FileLoader();

        // Set the response type: the resource file will be parsed with JSON.parse()
        loader.setResponseType('json');

        // Load a maze description resource file
        loader.load(
            //Resource URL
            this.url,

            // onLoad callback
            (description) => this.onLoad(description),

            // onProgress callback
            (xhr) => onProgress(this.url, xhr),

            // onError callback
            (error) => onError(this.url, error),
        );
    }

    // Convert cell [row, column] coordinates to cartesian (x, y, z) coordinates
    cellToCartesian(position) {
        return new THREE.Vector3(
            (position[1] - this.halfSize.width + 0.5) * this.scale.x,
            0.0,
            (position[0] - this.halfSize.depth + 0.5) * this.scale.z,
        );
    }

    // Convert cartesian (x, y, z) coordinates to cell [row, column] coordinates
    cartesianToCell(position) {
        return [
            Math.floor(position.z / this.scale.z + this.halfSize.depth),
            Math.floor(position.x / this.scale.x + this.halfSize.width),
        ];
    }

    // Detect collision with corners (method: BC/AABB)
    cornerCollision(indices, offsets, orientation, position, delta, radius, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];
        if (this.map[row][column] == 2 - orientation || this.map[row][column] == 3) {
            const x = position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x);
            const z = position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z);
            if (x * x + z * z < radius * radius) {
                console.log('Collision with ' + name + '.');
                return true;
            }
        }
        return false;
    }

    doorCollision(position, halfSize) {
        const indices = this.cartesianToCell(position);

        if (
            this.doorColli(indices, [0, 0], 0, position, { x: 0.0, z: -0.9 }, halfSize, 'north door') || // Collision with north door)
            this.doorColli(indices, [0, 0], 1, position, { x: -0.9, z: 0.0 }, halfSize, 'west door') || // Collision with west door
            this.doorColli(indices, [1, 0], 0, position, { x: 0.0, z: -0.9 }, halfSize, 'south door') || // Collision with south wall
            this.doorColli(indices, [0, 1], 1, position, { x: -0.9, z: 0.0 }, halfSize, 'east door') // Collision with east wall
        ) {
            return true;
        }
        return false;
    }

    doorColli(indices, offsets, orientation, position, delta, radius, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];

        for (let i = 0; i < this.doors.length; i++) {
            if (this.doors[i].door.position.positionX === column && this.doors[i].door.position.positionY === row) {
                if (orientation != 0) {
                    if (
                        Math.abs(position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x)) < radius
                    ) {
                        console.log('Collision1 with ' + name + '.');
                        this.changeDoor(this.doors[i]); // change door
                        this.doors.splice(i, 1); // remove from array
                        return true;
                    }
                } else {
                    if (
                        Math.abs(position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)) < radius
                    ) {
                        console.log('Collision2 with ' + name + '.');
                        this.changeDoor(this.doors[i]); // change door
                        this.doors.splice(i, 1); // remove from array
                        return true;
                    }
                }
            }
        }
        return false;
    }

    // Detect collision with walls (method: BC/AABB)
    wallCollision(indices, offsets, orientation, position, delta, radius, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];
        if (this.map[row][column] == 2 - orientation || this.map[row][column] == 3) {
            if (orientation != 0) {
                if (Math.abs(position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x)) < radius) {
                    console.log('Collision with ' + name + '.');
                    return true;
                }
            } else {
                if (Math.abs(position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)) < radius) {
                    console.log('Collision with ' + name + '.');
                    return true;
                }
            }
        }
        return false;
    }

    // this.wallCollision(indices, [0, 0], 0, position, { x: 0.0, z: -0.475 }, halfSize, 'north wall') || // Collision with north wall

    // Detect collision with walls and corners (method: OBB/AABB)
    wallAndCornerCollision(indices, offsets, orientation, obb, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];
        if (this.map[row][column] == 2 - orientation || this.map[row][column] == 3) {
            if (obb.intersectsBox3(this.aabb[row][column][orientation])) {
                console.log('Collision with ' + name + '.');
                return true;
            }
        }
        return false;
    }

    // Detect collisions
    collision(method, position, halfSize, direction) {
        const indices = this.cartesianToCell(position);
        if (method != 'obb-aabb') {
            if (
                this.wallCollision(indices, [0, 0], 0, position, { x: 0.0, z: -0.475 }, halfSize, 'north wall') || // Collision with north wall
                this.wallCollision(indices, [0, 0], 1, position, { x: -0.475, z: 0.0 }, halfSize, 'west wall') || // Collision with west wall
                this.wallCollision(indices, [1, 0], 0, position, { x: 0.0, z: -0.525 }, halfSize, 'south wall') || // Collision with south wall
                this.wallCollision(indices, [0, 1], 1, position, { x: -0.525, z: 0.0 }, halfSize, 'east wall') || // Collision with east wall
                this.cornerCollision(
                    indices,
                    [1, 0],
                    1,
                    position,
                    { x: -0.475, z: -0.5 },
                    halfSize,
                    'southwest corner (NS-oriented wall)',
                ) || // Collision with southwest corner (NS-oriented wall)
                this.cornerCollision(
                    indices,
                    [1, 1],
                    0,
                    position,
                    { x: -0.5, z: -0.525 },
                    halfSize,
                    'southeast corner (WE-oriented wall)',
                ) || // Collision with southeast corner (WE-oriented wall)
                this.cornerCollision(
                    indices,
                    [1, 1],
                    1,
                    position,
                    { x: -0.525, z: -0.5 },
                    halfSize,
                    'southeast corner (NS-oriented wall)',
                ) || // Collision with southeast corner (NS-oriented wall)
                this.cornerCollision(
                    indices,
                    [0, 1],
                    0,
                    position,
                    { x: -0.5, z: -0.475 },
                    halfSize,
                    'northeast corner (WE-oriented wall)',
                ) || // Collision with northeast corner (WE-oriented wall)
                (indices[0] > 0 &&
                    (this.cornerCollision(
                        indices,
                        [-1, 1],
                        1,
                        position,
                        { x: -0.525, z: 0.5 },
                        halfSize,
                        'northeast corner (NS-oriented wall)',
                    ) || // Collision with northeast corner (NS-oriented wall)
                        this.cornerCollision(
                            indices,
                            [-1, 0],
                            1,
                            position,
                            { x: -0.475, z: 0.5 },
                            halfSize,
                            'northwest corner (NS-oriented wall)',
                        ))) || // Collision with northwest corner (NS-oriented wall)
                (indices[1] > 0 &&
                    (this.cornerCollision(
                        indices,
                        [0, -1],
                        0,
                        position,
                        { x: 0.5, z: -0.475 },
                        halfSize,
                        'northwest corner (WE-oriented wall)',
                    ) || // Collision with northwest corner (WE-oriented wall)
                        this.cornerCollision(
                            indices,
                            [1, -1],
                            0,
                            position,
                            { x: 0.5, z: -0.525 },
                            halfSize,
                            'southwest corner (WE-oriented wall)',
                        ))) // Collision with southwest corner (WE-oriented wall)
            ) {
                return true;
            }
            // No collision
            return false;
        } else {
            // Create the object's oriented bounding box (OBB) in 3D space and set its orientation
            const obb = new OBB(position, halfSize);
            obb.applyMatrix4(new THREE.Matrix4().makeRotationY(direction));
            if (
                this.wallAndCornerCollision(indices, [0, 0], 0, obb, 'north wall') || // Collision with north wall
                this.wallAndCornerCollision(indices, [0, 0], 1, obb, 'west wall') || // Collision with west wall
                this.wallAndCornerCollision(indices, [1, 0], 0, obb, 'south wall') || // Collision with south wall
                this.wallAndCornerCollision(indices, [0, 1], 1, obb, 'east wall') || // Collision with east wall
                this.wallAndCornerCollision(indices, [1, 0], 1, obb, 'southwest corner (NS-oriented wall)') || // Collision with southwest corner (NS-oriented wall)
                this.wallAndCornerCollision(indices, [1, 1], 0, obb, 'southeast corner (WE-oriented wall)') || // Collision with southeast corner (WE-oriented wall)
                this.wallAndCornerCollision(indices, [1, 1], 1, obb, 'southeast corner (NS-oriented wall)') || // Collision with southeast corner (NS-oriented wall)
                this.wallAndCornerCollision(indices, [0, 1], 0, obb, 'northeast corner (WE-oriented wall)') || // Collision with northeast corner (WE-oriented wall)
                (indices[0] > 0 &&
                    (this.wallAndCornerCollision(indices, [-1, 1], 1, obb, 'northeast corner (NS-oriented wall)') || // Collision with northeast corner (NS-oriented wall)
                        this.wallAndCornerCollision(
                            indices,
                            [-1, 0],
                            1,
                            obb,
                            'northwest corner (NS-oriented wall)',
                        ))) || // Collision with northwest corner (NS-oriented wall)
                (indices[1] > 0 &&
                    (this.wallAndCornerCollision(indices, [0, -1], 0, obb, 'northwest corner (WE-oriented wall)') || // Collision with northwest corner (WE-oriented wall)
                        this.wallAndCornerCollision(indices, [1, -1], 0, obb, 'southwest corner (WE-oriented wall)'))) // Collision with southwest corner (WE-oriented wall)
            ) {
                return true;
            }
            // No collision
            return false;
        }
    }

    foundExit(position) {
        return (
            Math.abs(position.x - this.exitLocation.x) < 0.5 * this.scale.x &&
            Math.abs(position.z - this.exitLocation.z) < 0.5 * this.scale.z
        );
    }

    enteredElevator(position) {
        if (this.elevator !== null) {
            const distanceThreshold = 0.5;

            switch (this.elevator.direction) {
                case 'north':
                    return (
                        Math.abs(position.x - this.elevator.position.x) < distanceThreshold &&
                        Math.abs(position.z - (this.elevator.position.z - this.scale.z)) < distanceThreshold
                    );
                case 'south':
                    return (
                        Math.abs(position.x - this.elevator.position.x) < distanceThreshold &&
                        Math.abs(position.z - (this.elevator.position.z + this.scale.z)) < distanceThreshold
                    );
                case 'east':
                    return (
                        Math.abs(position.x - (this.elevator.position.x - this.scale.x)) < distanceThreshold &&
                        Math.abs(position.z - this.elevator.position.z) < distanceThreshold
                    );
                case 'west':
                    return (
                        Math.abs(position.x - this.elevator.position.x) < distanceThreshold &&
                        Math.abs(position.z - this.elevator.position.z) < distanceThreshold
                    );
            }
            console.log('----');
        }
    }

    changeDoor(currentDoor) {
        this.mazeChanged = true;

        const door = new Door({
            roomId: currentDoor.roomId,
            door: currentDoor.door,
            halfSize: this.halfSize,
            url: '/v3d/models/door/door.fbx',
            dScale: [0.0058, 0.0025, 0.002],
            mapSize: this.size,
            camera: this.camera,
        });

        this.remove(currentDoor); // remove current door
        this.add(door); // add new door
    }

    passageCollision(position, halfSize) {
        const indices = this.cartesianToCell(position);

        const northCollision = this.passageColli(
            indices,
            [0, 0],
            0,
            position,
            { x: 0.0, z: -0.9 },
            halfSize,
            'north passage',
        );
        const westCollision = this.passageColli(
            indices,
            [0, 0],
            1,
            position,
            { x: -0.9, z: 0.0 },
            halfSize,
            'west passage',
        );
        const southCollision = this.passageColli(
            indices,
            [1, 0],
            0,
            position,
            { x: 0.0, z: -0.9 },
            halfSize,
            'south passage',
        );
        const eastCollision = this.passageColli(
            indices,
            [0, 1],
            1,
            position,
            { x: -0.9, z: 0.0 },
            halfSize,
            'east passage',
        );

        if (northCollision != null) {
            return northCollision; // Return the value of the collision
        } else if (westCollision != null) {
            return westCollision;
        } else if (southCollision != null) {
            return southCollision;
        } else if (eastCollision != null) {
            return eastCollision;
        }

        return null; // No collision occurred
    }

    passageColli(indices, offsets, orientation, position, delta, radius, name) {
        const row = indices[0] + offsets[0];
        const column = indices[1] + offsets[1];

        for (let i = 0; i < this.passages.length; i++) {
            const passageId = this.passages[i].passage.passageId;
            if (
                this.passages[i].passage.position.positionX === column &&
                this.passages[i].passage.position.positionY === row
            ) {
                console.log('Collision passage ' + passageId);
                if (
                    Math.abs(position.x - (this.cellToCartesian([row, column]).x + delta.x * this.scale.x)) < radius ||
                    Math.abs(position.z - (this.cellToCartesian([row, column]).z + delta.z * this.scale.z)) < radius
                ) {
                    let data = {
                        passageId: passageId,
                        floor: this.floorId,
                    };
                    // console.log(JSON.stringify(data));
                    return data;
                }
            }
        }
        return null;
    }
}
