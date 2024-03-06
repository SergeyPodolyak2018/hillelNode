import logger from './lib/logger/logger.js';

import color from './color.js';
import fruit from './fruit.js';
import { add } from './handler.js';

const log = logger.getLogger('app.js');

log.info(color);
//log.info(fruit, color);
// log.error('ERROR occur: My log');
log.debug(fruit);
// log.trace(fruit);

// add(3, 5);
