import express from 'express';
import morganLogger from 'morgan';
import cors from 'cors';
import multer from 'multer';
import bodyParser from 'body-parser';
import apiVersion1 from './server/apiVersions/apiVersions';

const app = express();
const upload = multer();

const port = process.env.PORT || 5500;
app.use(cors());
app.use(upload.fields([]));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(morganLogger('combined'));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
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

app.listen(port, () => {
  console.log(`Server running on port: ${port} ....`);
});

export default app;
