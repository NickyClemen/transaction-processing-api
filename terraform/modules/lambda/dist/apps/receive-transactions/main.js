/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@codegenie/serverless-express");

/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReceiveTransactionsModule = void 0;
const common_1 = __webpack_require__(4);
const config_1 = __webpack_require__(5);
const receiveTransactionFromSqs_provider_1 = __webpack_require__(6);
const sqs_provider_1 = __webpack_require__(10);
const receiveMessage_provider_1 = __webpack_require__(7);
const infraestructure_1 = __webpack_require__(15);
let ReceiveTransactionsModule = class ReceiveTransactionsModule {
};
exports.ReceiveTransactionsModule = ReceiveTransactionsModule;
exports.ReceiveTransactionsModule = ReceiveTransactionsModule = __decorate([
    (0, common_1.Module)({
        providers: [
            receiveTransactionFromSqs_provider_1.default,
            receiveMessage_provider_1.default,
            sqs_provider_1.default,
            infraestructure_1.SqsProvide,
        ],
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env.testing'],
            }),
        ],
    })
], ReceiveTransactionsModule);


/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(4);
const receiveMessage_provider_1 = __webpack_require__(7);
let ReceiveTransactionFromSqs = class ReceiveTransactionFromSqs {
    constructor(receiveMessageFromSqs) {
        this.receiveMessageFromSqs = receiveMessageFromSqs;
    }
    async execute() {
        return await this.receiveMessageFromSqs.receiveMessages();
    }
};
ReceiveTransactionFromSqs = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(receiveMessage_provider_1.default)),
    __metadata("design:paramtypes", [typeof (_a = typeof receiveMessage_provider_1.default !== "undefined" && receiveMessage_provider_1.default) === "function" ? _a : Object])
], ReceiveTransactionFromSqs);
exports["default"] = ReceiveTransactionFromSqs;


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(4);
const sqsMessageList_1 = __webpack_require__(8);
const sqs_provider_1 = __webpack_require__(10);
let ReceiveMessage = class ReceiveMessage {
    constructor(sqsProvider) {
        this.sqsProvider = sqsProvider;
    }
    async receiveMessages() {
        const response = await this.sqsProvider.receiveMessage();
        const sqsMessageList = new sqsMessageList_1.default(response);
        return sqsMessageList.valueMapper();
    }
};
ReceiveMessage = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(sqs_provider_1.default)),
    __metadata("design:paramtypes", [typeof (_a = typeof sqs_provider_1.default !== "undefined" && sqs_provider_1.default) === "function" ? _a : Object])
], ReceiveMessage);
exports["default"] = ReceiveMessage;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const valueObject_1 = __webpack_require__(9);
class SqsMessageList extends valueObject_1.ValueObject {
    constructor(value) {
        super(value);
        this.value = value;
    }
    valueMapper() {
        const { $metadata, Messages = [] } = this.value;
        return {
            status: $metadata.httpStatusCode,
            requestId: $metadata.requestId,
            messages: Messages.map((message) => {
                const { Body, MessageId } = message;
                return {
                    body: JSON.parse(Body),
                    id: MessageId,
                };
            }),
        };
    }
}
exports["default"] = SqsMessageList;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ValueObject = void 0;
class ValueObject {
    constructor(value) {
        this.value = value;
        this.value = value;
    }
    getValue() {
        return this.value;
    }
}
exports.ValueObject = ValueObject;


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
const common_1 = __webpack_require__(4);
const client_sqs_1 = __webpack_require__(11);
const sqsClient_exception_1 = __webpack_require__(12);
const awsClient_exceptions_1 = __webpack_require__(14);
const infraestructure_1 = __webpack_require__(15);
let SqsProvider = class SqsProvider {
    constructor(sqsClient) {
        this.sqsClient = sqsClient;
    }
    async sendMessage(messageBody) {
        try {
            const { REGION, SQS_QUEUE_URL, SQS_QUEUE_NAME } = process.env;
            const sqsCommand = new client_sqs_1.SendMessageCommand({
                QueueUrl: `http://sqs.${REGION}.${SQS_QUEUE_URL}/000000000000/${SQS_QUEUE_NAME}`,
                MessageBody: JSON.stringify(messageBody),
            });
            return await this.sqsClient.send(sqsCommand);
        }
        catch (error) {
            if (error instanceof client_sqs_1.SQSServiceException) {
                throw new sqsClient_exception_1.default(error);
            }
            throw new awsClient_exceptions_1.default(error);
        }
    }
    async receiveMessage() {
        try {
            const { REGION, SQS_QUEUE_URL, SQS_QUEUE_NAME } = process.env;
            const sqsCommand = new client_sqs_1.ReceiveMessageCommand({
                QueueUrl: `http://sqs.${REGION}.${SQS_QUEUE_URL}/000000000000/${SQS_QUEUE_NAME}`,
                MaxNumberOfMessages: 10,
            });
            return await this.sqsClient.send(sqsCommand);
        }
        catch (error) {
            if (error instanceof client_sqs_1.SQSServiceException) {
                throw new sqsClient_exception_1.default(error);
            }
            throw new awsClient_exceptions_1.default(error);
        }
    }
};
SqsProvider = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(infraestructure_1.SQS_CLIENT)),
    __metadata("design:paramtypes", [typeof (_a = typeof client_sqs_1.SQSClient !== "undefined" && client_sqs_1.SQSClient) === "function" ? _a : Object])
], SqsProvider);
exports["default"] = SqsProvider;


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@aws-sdk/client-sqs");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const errorCodes_1 = __webpack_require__(13);
class SqsClientException extends Error {
    constructor(error) {
        super();
        this.error = error;
    }
    getError() {
        const { name, message, $metadata } = this.error;
        return {
            type: name,
            message,
            statusName: errorCodes_1.default[name],
            metadata: { ...$metadata },
        };
    }
}
exports["default"] = SqsClientException;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports["default"] = {
    CredentialsProviderError: 'FORBIDDEN',
    QueueDoesNotExist: 'BAD_REQUEST',
    InternalError: 'INTERNAL_SERVER_ERROR',
    UnrecognizedClientException: 'BAD_REQUEST',
    ValidationException: 'BAD_REQUEST',
};


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const errorCodes_1 = __webpack_require__(13);
class AwsClientException extends Error {
    constructor(error) {
        super();
        this.error = error;
    }
    getError() {
        const { name, message } = this.error;
        return {
            type: name,
            message,
            statusName: errorCodes_1.default[name] ?? 'BAD_REQUEST',
        };
    }
}
exports["default"] = AwsClientException;


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SQS_CLIENT = exports.SqsProvide = void 0;
const client_sqs_1 = __webpack_require__(11);
const SQS_CLIENT = 'SQS_CLIENT';
exports.SQS_CLIENT = SQS_CLIENT;
const SqsProvide = {
    provide: SQS_CLIENT,
    useFactory: async () => {
        return new client_sqs_1.SQSClient({
            region: process.env.REGION,
        });
    },
};
exports.SqsProvide = SqsProvide;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.handler = void 0;
const core_1 = __webpack_require__(1);
const serverless_express_1 = __webpack_require__(2);
const receive_transactions_module_1 = __webpack_require__(3);
let server;
const handler = async (event, context, callback) => {
    server = server ?? (await bootstrap());
    return server(event, context, callback);
};
exports.handler = handler;
async function bootstrap() {
    const app = await core_1.NestFactory.create(receive_transactions_module_1.ReceiveTransactionsModule);
    await app.init();
    const expressApp = app.getHttpAdapter().getInstance();
    return (0, serverless_express_1.default)({ app: expressApp });
}

})();

/******/ })()
;