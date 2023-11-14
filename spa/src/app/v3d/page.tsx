import Scene from '@/components/v3d/Scene';
import axios from 'axios';
import config from '../../../config';
async function fetchFloors() {
    try {
        const response = await axios(config.mgiAPI.baseUrl + config.mgiAPI.routes.floors, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}

async function fetchBuildings() {
    try {
        const response = await axios(config.mgiAPI.baseUrl + config.mgiAPI.routes.buildings, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}

async function fetchFloorMaps() {
    try {
        const response = await axios(config.mgiAPI.baseUrl + config.mgiAPI.routes.floormaps, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export default async function Page() {
    const floors = await fetchFloors();
    const buildings = await fetchBuildings();
    const floorMaps = await fetchFloorMaps();

    return (
        <div>
            <p>V3D</p>

            <Scene floors={floors} buildings={buildings} floorMaps={floorMaps} />
        </div>
    );
}
