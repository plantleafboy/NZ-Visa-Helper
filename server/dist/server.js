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
const express_1 = __importDefault(require("./config/express"));
const logger_1 = __importDefault(require("./config/logger"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4941;
// Connect to MySQL on start
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await connect();
            app.listen(port, () => {
                logger_1.default.info('Listening on port: ' + port);
            });
        }
        catch (err) {
            logger_1.default.error('Unable to connect to MySQL. err: ', err);
            process.exit(1);
        }
    });
}
main().catch(err => logger_1.default.error(err));
//# sourceMappingURL=server.js.map