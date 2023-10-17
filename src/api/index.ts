import { Router } from 'express';
import auth from './routes/userRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import building from './routes/buildingRoute';
import floor from './routes/floorRoute';
import passageRoute from './routes/passageRoute';
import elevatorRoute from './routes/elevatorRoute';
import taskType from './routes/taskTypeRoute';
import robotType from './routes/robotTypeRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	building(app);
	floor(app);
    passageRoute(app);
	elevatorRoute(app);
    taskType(app);
    robotType(app);


	return app
}
