import Scene from '@/components/v3d/Scene';
import axios from 'axios';
import config from '../../../../config';

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
        return [];
    }
}

export default async function Page() {
    const buildings = await fetchBuildings();

    return (
        <div>
            <p>V3D</p>

            <Scene buildings={buildings} />
        </div>
    );
}
