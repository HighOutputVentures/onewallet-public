"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PQueue = require("p-queue");
const highoutput_utilities_1 = require("highoutput-utilities");
const logger = new highoutput_utilities_1.Logger(['queue']);
class TaskQueue {
    constructor(options) {
        this.stopping = false;
        this.queue = new PQueue(options);
    }
    /**
     * Adds a new task to the queue
     * @param fn Async function
     * @param {PQueue.QueueAddOptions} options
     */
    add(fn, options) {
        if (this.stopping) {
            logger.info('Cannot add new task.');
            return;
        }
        return this.queue.add(fn, options);
    }
    /**
     * Marks the current queue to stop accepting new tasks and awaits all running tasks.
     */
    stop() {
        this.stopping = true;
        return this.queue.onEmpty();
    }
}
exports.default = TaskQueue;
