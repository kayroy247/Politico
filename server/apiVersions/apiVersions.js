import { Router } from 'express';
import offices from '../routes/offices';
import parties from '../routes/parties';


const apiVersion1 = Router();

apiVersion1.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Politico API VERSION 1'
  });
});

apiVersion1.use('/offices', offices);
apiVersion1.use('/parties', parties);


export default apiVersion1;
