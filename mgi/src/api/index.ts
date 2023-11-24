import { Router } from 'express';
import auth from './routes/authRoute';
import user from './routes/userRoute';
import role from './routes/roleRoute';
import building from './routes/buildingRoute';
import floor from './routes/floorRoute';
import passageRoute from './routes/passageRoute';
import elevatorRoute from './routes/elevatorRoute';
import task from './routes/taskRoute';
import taskType from './routes/taskTypeRoute';
import robotType from './routes/robotTypeRoute';
import roomRoute from './routes/roomRoute';
import floorMapRoute from './routes/floorMapRoute';
import robotRoute from './routes/robotRoute';

export default () => {
	const app = Router();

	auth(app);
	user(app);
	role(app);
	building(app);
	floor(app);
	floorMapRoute(app);
    passageRoute(app);
	elevatorRoute(app);
	task(app);
    taskType(app);
    robotType(app);
	roomRoute(app);
    robotRoute(app);

	return app
}
