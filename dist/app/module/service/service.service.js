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
exports.serviceServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const service_constant_1 = require("./service.constant");
const service_model_1 = __importDefault(require("./service.model"));
const createService = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.default.create(payload);
    return result;
});
const getAllService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const serviceQuery = new QueryBuilder_1.default(service_model_1.default.find(), Object.assign(Object.assign({}, query), { sort: `${query.sort} isDeleted` }))
        .searchQuery(service_constant_1.serviceSearchableFields)
        .filterQuery()
        .sortQuery()
        .paginateQuery()
        .fieldFilteringQuery();
    const result = yield (serviceQuery === null || serviceQuery === void 0 ? void 0 : serviceQuery.queryModel);
    const total = yield service_model_1.default.countDocuments(serviceQuery.queryModel.getFilter());
    return { data: result, total };
});
const getServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.default.findById(id);
    return result;
});
const deleteServiceById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.default.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
const updateServiceById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield service_model_1.default.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.serviceServices = {
    createService,
    getAllService,
    getServiceById,
    deleteServiceById,
    updateServiceById,
};
