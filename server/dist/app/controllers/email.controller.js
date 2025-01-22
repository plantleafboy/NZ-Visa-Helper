"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testLog = exports.sendEmailTest = void 0;
const logger_1 = __importDefault(require("../../config/logger"));
const nodemailerConfig_1 = require("../utilities/nodemailerConfig");
// extra to do
// import * as schemas from '../resources/schemas.json';
// import {validate} from '../services/validator'
const sendEmailTest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, nodemailerConfig_1.sendEmailWithoutParameters)();
        res.status(200).send('Email sent successfully');
    }
    catch (e) {
        logger_1.default.error(e);
    }
    return;
});
exports.sendEmailTest = sendEmailTest;
const testLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info("working query received");
    res.status(200).send('Test hold query sent successfully');
});
exports.testLog = testLog;
//# sourceMappingURL=email.controller.js.map