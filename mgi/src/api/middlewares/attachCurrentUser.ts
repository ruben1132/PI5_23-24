import { Container } from 'typedi';
import winston from 'winston';
import config from '../../../config';
import axios from 'axios';
import { IAuthUserDTO } from '../../dto/IAuthUserDTO';

/**
 * Attach user to req.user
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req, res, next) => {
    const Logger = Container.get('logger') as winston.Logger;

    try {
        if (!req.token || req.token === undefined || req.token === null) {
            return res.status(401).json({ error: 'Invalid token.' });
        }

        const result : IAuthUserDTO | boolean = await validateToken(req.token);

        if (result === false) {
            return res.status(401).json({ error: 'Invalid user.' });
        } else {
            const user: IAuthUserDTO = result as IAuthUserDTO;
            req.user = user;
            console.log('User attached to req.user');
            next();
        }
    } catch (e) {
        Logger.error('🔥 Error attaching user to req: %o', e);
        return next(e);
    }
};

// calls external API to validate if the user exists and if its account is active
const validateToken = async (token : string): Promise<IAuthUserDTO | boolean> => {
    try {

        const response = await axios(`${config.mptAPI}/api/auth/validate/`, {
            method: 'post',
            data: {
              token: token,
            },
            withCredentials: true,
        });
        
        

        if (response.status === 200) {
            const userData: IAuthUserDTO = await response.data;
            return userData;
        }

        return false;
    } catch (error) {
        console.error('Error validating user:', error.response.status + ' - ' + error.response.statusText);
        console.error('+info', error.response.data);
        return false;
    }
};

export default attachCurrentUser;
