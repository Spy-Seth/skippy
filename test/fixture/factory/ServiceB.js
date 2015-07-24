'use strict';

/**
 * This service has a dependency on a service who need to be build thought a factory service.
 *
 * @param {ServiceA} serviceA
 * @constructor
 */
var ServiceB = function ServiceB(serviceA) {
    this.serviceA = serviceA;
};

module.exports = ServiceB;
