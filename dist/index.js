"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awsGetCredentials = exports.createAWSConnection = void 0;
const opensearch_1 = require("@opensearch-project/opensearch");
const http_1 = require("http");
const global_1 = require("aws-sdk/global");
const https_1 = require("https");
const aws4_1 = require("aws4");
function generateAWSConnectionClass(credentials) {
    return class AWSConnection extends opensearch_1.Connection {
        constructor(opts) {
            super(opts);
            this.makeRequest = this.signedRequest;
        }
        signedRequest(reqParams) {
            const request = (reqParams === null || reqParams === void 0 ? void 0 : reqParams.protocol) === 'https:' ? https_1.request : http_1.request;
            return request((0, aws4_1.sign)(Object.assign(Object.assign({}, reqParams), { service: 'es' }), credentials));
        }
    };
}
function generateAWSTransportClass(credentials) {
    return class AWSTransport extends opensearch_1.Transport {
        request(params, options, callback = undefined) {
            if (typeof options === 'function') {
                callback = options;
                options = {};
            }
            if (typeof params === 'function' || params == null) {
                callback = params;
                params = {};
                options = {};
            }
            // Wrap promise API
            const isPromiseCall = typeof callback !== 'function';
            if (isPromiseCall) {
                return credentials.getPromise().then(() => super.request(params, options, callback));
            }
            // Wrap callback API
            credentials.get(err => {
                if (err) {
                    callback(err, null);
                    return;
                }
                return super.request(params, options, callback);
            });
        }
    };
}
function createAWSConnection(awsCredentials) {
    return {
        Connection: generateAWSConnectionClass(awsCredentials),
        Transport: generateAWSTransportClass(awsCredentials)
    };
}
exports.createAWSConnection = createAWSConnection;
const awsGetCredentials = () => {
    return new Promise((resolve, reject) => {
        global_1.config.getCredentials(err => {
            if (err) {
                return reject(err);
            }
            resolve(global_1.config.credentials);
        });
    });
};
exports.awsGetCredentials = awsGetCredentials;
