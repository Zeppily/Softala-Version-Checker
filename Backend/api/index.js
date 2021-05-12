import config from 'dotenv';
import express from 'express';
import bodyParser, { raw } from 'body-parser';
import projectRoutes from './server/routes/ProjectRoutes';
import eolRoutes from './server/routes/EOLRoutes';
import softwareRoutes from './server/routes/SoftwareRoutes';
import porjectSoftwareRoutes from './server/routes/ProjectSoftwareRoutes';
import startScanRoutes from './server/routes/StartScanRoutes';
import ProjectSoftwareService from './server/services/ProjectSoftwareService';
import ProjectService from './server/services/ProjectService';
import cron from 'node-cron';
import database from './server/src/models';
import ProjectSoftwareController from './server/controller/ProjectSoftwareController'

config.config();
const app = express();
const cors = require('cors');

app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
}
)

// Schduling the python scanner to run every day at 1am
// For developement purposes this runs every minute
// For running at 1am change the * * * * * to 0 1 * * * 

cron.schedule('0 1 * * *', async () => {
   console.log('running a task at 1am');
   try {
        await database.project.findAll({
            attributes: ['name'],
            raw: true
        })
        .then(result => {
            let projects = []
            result.forEach(res => {
                projects.push(res.name)
            })
            let req = {
                'body': {
                    'name': projects
                }
            }
            ProjectSoftwareController.startScan(req)
        })
    } catch (error) {
        // console.log(error)
        throw error;
    }
   }, {
   scheduled: true,
   timezone: "Europe/Helsinki"
   }
);


app.use(bodyParser.json());
app.use(express.json());

app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 8000;

// API endpoints being used
app.use('/api/projects', projectRoutes);
app.use('/api/eols', eolRoutes);
app.use('/api/softwares', softwareRoutes);
app.use('/api/projectsoftwares', porjectSoftwareRoutes);
app.use('/api/startscan', startScanRoutes);

// when a random route is inputed
app.get('*', (req, res) => res.status(200).send({
   message: 'Welcome to this API.'
}));

const server = app.listen(port, () => {
   console.log(`Server is running on PORT ${port}`);
});

export default app;

module.exports = server;
