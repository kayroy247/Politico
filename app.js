import express from 'express';
import morganLogger from 'morgan';
import cors from 'cors';
import multer from 'multer';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import politicoDocument from './politicoSwagger.json';
import apiVersion1 from './server/apiVersions/apiVersions';

const app = express();
const upload = multer();

const port = process.env.PORT || 5000;
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
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(politicoDocument));

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
