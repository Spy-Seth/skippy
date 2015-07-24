'use strict';

/**
 * @param {Number} fooMaxSize
 * @param {Number} bar
 * @constructor
 */
var ServiceA = function ServiceA(fooMaxSize, bar) {
    this.fooMaxSize = fooMaxSize;
    this.bar = bar;
};

module.exports = ServiceA;
