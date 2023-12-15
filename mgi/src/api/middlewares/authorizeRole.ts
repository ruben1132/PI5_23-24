import { Container } from 'typedi';
import winston from 'winston';

// Middleware to authorize access based on user role
const authorizeRole = (roles: string[]) => {
    return (req, res, next) => {
        const Logger = Container.get('logger') as winston.Logger;
        
        try {
            // Check if req.user has the required role
            if (!req.user || !req.user.role || !req.user.role.name) {
                return res.status(403).json({ message: 'Forbidden: User not authenticated' });
            }

            if (roles.includes(req.user.role.name)) {                
                next();
            } else {
                return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
            }
        } catch (error) {
            Logger.error('🔥 Error authorizing roles: %o', error);
            return next(error);
        }
    };
};

export default authorizeRole;
