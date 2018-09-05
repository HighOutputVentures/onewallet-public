"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PQueue = require("p-queue");
const highoutput_utilities_1 = require("highoutput-utilities");
const logger = new highoutput_utilities_1.Logger(['queue']);
class Queue {
    constructor(opts) {
        this.queue = new PQueue(opts);
        this.stopping = false;
    }
    /**
     * Adds a new task to the queue
     * @param fn Sync function that returns a promise or async function
     * @param {PQueue.QueueAddOptions} options
     */
    add(fn, options) {
        if (this.stopping) {
            logger.info('Cannot add new task already received a stop signal.');
            return false;
        }
        return this.queue.add(fn, options);
    }
    /**
     * Marks the current queue to top accepting new tasks and awaits all remaining current task.
     */
    stop() {
        this.stopping = true;
        return this.queue.onEmpty();
    }
}
exports.default = Queue;
