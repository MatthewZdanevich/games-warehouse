/* ---------- LOGGER ---------- */

const pino = require('pino');
const dayjs = require('dayjs');

const logger = pino({
    level: 'debug',
    browser: {
        asObject: true
    },
    timestamp: () => `${dayjs().format('YYYY-MM-DD HH:mm:ss')}`,
});

module.exports = logger;