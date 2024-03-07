import logger from './lib/logger/logger.js';

import color from './color.js';
import fruit from './fruit.js';

const log = logger.getLogger('app.js');

log.info(color);
log.error(color);
log.debug(fruit);
