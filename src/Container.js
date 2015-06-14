'use strict';

var Map = require('immutable').Map;
var List = require('immutable').List;
var Parameter = require('./Parameter');
var ParameterCollection = require('./ParameterCollection');
var ServiceArgument = require('./ServiceArgument');
var ServiceArgumentCollection = require('./ServiceArgumentCollection');
var ServiceDefinition = require('./ServiceDefinition');
var ServiceDefinitionCollection = require('./ServiceDefinitionCollection');

/**
 * Use Container.create(...) to create a new container instance.
 *
 * @param {ServiceDefinitionCollection} serviceDefinitionCollection
 * @param {ParameterCollection} parameterCollection
 * @private
 * @constructor
 */
var Container = function Container(serviceDefinitionCollection, parameterCollection) {
    var serviceDefinitionCollection = serviceDefinitionCollection;
    var parameterCollection = parameterCollection;

    /**
     * @param {String} name
     * @returns {*|null}
     */
    this.getParameter = function (name) {
        var parameter = parameterCollection.getParameter(name);

        return parameter.getValue();
    };

    /**
     * @param name
     * @return {*}
     */
    this.getService = function (name) {
        if (!serviceDefinitionCollection.hasServiceDefinition(name)) {
            throw new Error('Unknown service %s.')
        }

        var serviceDefinition = serviceDefinitionCollection.getServiceDefinition(name);
        return serviceDefinition.createInstance(this);
    };
};

/**
 * @param services
 * @returns {ServiceDefinitionCollection}
 * @private
 */
Container._initServiceDefinitionCollection = function (services) {
    var servicesConfigurationList = new List(services);

    var servicesDefinitionList = servicesConfigurationList.map(function (value) {
        if (!value["arguments"]) {
            value["arguments"] = [];
        }

        var argumentConfigurationList = new List(value["arguments"]);
        var serviceArgumentList = argumentConfigurationList.map(function (value) {
            return new ServiceArgument(value);
        });

        return new ServiceDefinition(
            value.name,
            value.service,
            new ServiceArgumentCollection(serviceArgumentList.toArray()),
            value.singleton || undefined
        );
    });

    return new ServiceDefinitionCollection(servicesDefinitionList);
};

/**
 * @param parameters
 * @returns {ParameterCollection}
 * @private
 */
Container._initParameterCollection = function (parameters) {
    var parametersConfigurationMap = new Map(parameters);

    var parameterMap = parametersConfigurationMap.map(function (value, key) {
        return new Parameter(key, value);
    });

    return new ParameterCollection(parameterMap.toArray());
};

/**
 * @param {Array.<{name: String, service: Function, arguments: Array.<String|*>}>} services
 * @param {{String: *}} parameters
 * @returns {Container}
 */
Container.create = function (services, parameters) {
    services = services || [];
    parameters = parameters || {};

    var serviceDefinitionCollection = this._initServiceDefinitionCollection(services);
    var parameterCollection = this._initParameterCollection(parameters);

    return new Container(serviceDefinitionCollection, parameterCollection);
};

module.exports = Container;
