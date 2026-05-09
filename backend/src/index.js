require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const locationsRouter = require('./routes/locations');
const groupsRouter = require('./routes/groups');
const directoryRouter = require('./routes/directory');
const eventsRouter = require('./routes/events');
const jobsRouter = require('./routes/jobs');
const meetupsRouter = require('./routes/meetups');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.use('/api/locations', locationsRouter);
app.use('/api/groups', groupsRouter);
app.use('/api/directory', directoryRouter);
app.use('/api/events', eventsRouter);
app.use('/api/jobs', jobsRouter);
app.use('/api/meetups', meetupsRouter);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Square 1 API running on port ${PORT}`));
