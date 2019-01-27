import express from 'express';
import morganLogger from 'morgan';
import cors from 'cors';
import apiVersion1 from './server/apiVersions/apiVersions';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morganLogger('combined'));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: [],
    message: 'Welcome to Politico Application'
  });
});

// api versioning
app.use('/api/v1', apiVersion1);

app.use((req, res) => {
  res.status(404).json({
    status: 404,
    error: 'Resource Not Found'
  });
});

app.listen(app.get('port'), () => {
  console.log(`Server running on port: ${app.get('port')} ....`);
});

export default app;
