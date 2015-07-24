'use strict';

module.exports = {
    'parameters': {
        'foo.max.size': 3,
    },

    'services': [
        {
            'name': 'foo.serviceA',
            'service': require('./ServiceA'),
            'singleton': true,
            'factory': '@foo.serviceB.factory::create'
        },
        {
            'name': 'foo.serviceA.factory',
            'service': require('./ServiceAFactory'),
            'singleton': true,
            'arguments': [
                '%foo.max.size%'
            ]
        },
        {
            'name': 'foo.serviceB',
            'service': require('./ServiceB'),
            'singleton': true,
            'arguments': [
                '@foo.serviceA'
            ],
        }
    ]
};
