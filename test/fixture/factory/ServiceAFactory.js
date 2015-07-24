'use strict';

var ServiceA = require('./ServiceA');

/**
 * @param {Number} fooMaxSize
 * @param {Number} bar
 * @constructor
 */
var ServiceAFactory = function ServiceAFactory(fooMaxSize) {
    this.fooMaxSize = fooMaxSize;

    this.create = function () {
        var serviceA = new ServiceA(this.fooMaxSize, 51);

        return serviceA;
    }
};

module.exports = ServiceAFactory;
