import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import passportMiddleware from './middlewares/passport';
import passport from 'passport';
import specialRoutes from './routes/special.routes';
//inializacion
const app = express();

//settings
app.set('port', process.env.PORT || 3000);

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);
//routes    
app.get('/', (req, res) => {
     res.send(`The API is at http://localhost:${app.get('port')}`);    
}
    );
app.use(authRoutes);
app.use(specialRoutes);
export default app;