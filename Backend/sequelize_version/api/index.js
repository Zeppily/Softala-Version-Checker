import config from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import projectRoutes from './server/routes/ProjectRoutes';
import eolRoutes from './server/routes/EOLRoutes';
import softwareRoutes from './server/routes/SoftwareRoutes';
import porjectSoftwareRoutes from './server/routes/ProjectSoftwareRoutes';

config.config();

const app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

app.use('/api/projects', projectRoutes);
app.use('/api/eols', eolRoutes);
app.use('/api/softwares', softwareRoutes);
app.use('/api/projectsoftwares', porjectSoftwareRoutes);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
   message: 'Welcome to this API.'
}));

app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});

export default app;