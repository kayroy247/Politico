import { Router } from 'express';
import offices from '../routes/offices';
import parties from '../routes/parties';
import auth from '../routes/auth';
import candidates from '../routes/candidates';
import votes from '../routes/votes';

const apiVersion1 = Router();

apiVersion1.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'Welcome to Politico API VERSION 1'
  });
});

apiVersion1.use('/offices', offices);
apiVersion1.use('/parties', parties);
apiVersion1.use('/auth', auth);
apiVersion1.use('/office', candidates);
apiVersion1.use('/votes', votes);


export default apiVersion1;
