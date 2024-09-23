"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serviceRouter = void 0;
const express_1 = require("express");
const service_controller_1 = require("./service.controller");
const zodValidateHandler_1 = __importDefault(require("../../middleware/zodValidateHandler"));
const service_validate_1 = require("./service.validate");
const slot_validate_1 = require("../slot/slot.validate");
const slot_controller_1 = require("../slot/slot.controller");
const auth_1 = __importDefault(require("../../middleware/auth"));
const user_constant_1 = require("../user/user.constant");
const router = (0, express_1.Router)();
exports.serviceRouter = router;
router.post('/', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, zodValidateHandler_1.default)(service_validate_1.serviceZodSchema.createServiceZodSchema), service_controller_1.serviceControllers.createService); //Only accessible by admin
router.post('/slots', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, zodValidateHandler_1.default)(slot_validate_1.slotZodSchema.createSlotZodSchema), slot_controller_1.slotsControllers.createSlot); //Only accessible by admin
router.get('/', service_controller_1.serviceControllers.getAllService);
router.get('/:id', service_controller_1.serviceControllers.getServiceById);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), service_controller_1.serviceControllers.deleteServiceById); //Only accessible by admin
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, zodValidateHandler_1.default)(service_validate_1.serviceZodSchema.updateServiceZodSchema), service_controller_1.serviceControllers.updateServiceById); //Only accessible by admin
