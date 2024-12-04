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
exports.deletebooking = exports.updatebooking = exports.findbooking = exports.getAllbookings = exports.createbooking = void 0;
const prismaClient_1 = __importDefault(require("./prismaClient"));
const createbooking = (name, purpose, startTimeString, endTimeString, userId, auditoriumId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let startTime = new Date(startTimeString);
        let endTime = new Date(endTimeString);
        return yield prismaClient_1.default.booking.create({
            data: { name, purpose, startTime, endTime, user: { connect: { id: userId } }, auditorium: { connect: { id: auditoriumId } } }
        });
    }
    catch (error) {
        return {
            error: error,
            msg: "Error Creating booking"
        };
    }
});
exports.createbooking = createbooking;
const getAllbookings = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.default.booking.findMany();
});
exports.getAllbookings = getAllbookings;
const findbooking = (id_1, name_1, userId_1, auditoriumId_1, ...args_1) => __awaiter(void 0, [id_1, name_1, userId_1, auditoriumId_1, ...args_1], void 0, function* (id, name, userId, auditoriumId, startTimeString = '', endTimeString = '') {
    try {
        if (!id && !name && !userId && !auditoriumId && startTimeString == '' && endTimeString == '') {
            return { msg: "No Parameters Given" };
        }
        else {
            let startTime = startTimeString ? new Date(startTimeString) : null;
            let endTime = endTimeString ? new Date(endTimeString) : null;
            let booking = yield prismaClient_1.default.booking.findMany({ where: startTime && endTime ? Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (id && { id })), (name && { name })), (userId && { user: { id: userId } })), (auditoriumId && { auditorium: { id: auditoriumId } })), { startTime: { gte: startTime }, endTime: { gte: endTime } }) : startTime ? Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (id && { id })), (name && { name })), (userId && { user: { id: userId } })), (auditoriumId && { auditorium: { id: auditoriumId } })), { startTime: { gte: startTime } }) : endTime ? Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (id && { id })), (name && { name })), (userId && { user: { id: userId } })), (auditoriumId && { auditorium: { id: auditoriumId } })), { endTime: { gte: endTime } }) : Object.assign(Object.assign(Object.assign(Object.assign({}, (id && { id })), (name && { name })), (userId && { user: { id: userId } })), (auditoriumId && { auditorium: { id: auditoriumId } })) });
            if (!booking) {
                return { msg: "No booking Found" };
            }
            return booking;
        }
    }
    catch (error) {
        return {
            error: error,
            msg: "Error Finding booking"
        };
    }
});
exports.findbooking = findbooking;
const updatebooking = (id_1, name_1, purpose_1, ...args_1) => __awaiter(void 0, [id_1, name_1, purpose_1, ...args_1], void 0, function* (id, name, purpose, startTimeString = '', endTimeString = '') {
    try {
        if (!purpose && !name && startTimeString == '' && endTimeString == '') {
            return { msg: "No Parameters To Update" };
        }
        else {
            let booking = yield prismaClient_1.default.booking.findFirst({ where: { id: id } });
            if (!booking) {
                return { msg: "No booking To Update" };
            }
            let startTime = startTimeString ? new Date(startTimeString) : null;
            let endTime = endTimeString ? new Date(endTimeString) : null;
            yield prismaClient_1.default.booking.update({
                where: { id: booking.id },
                data: Object.assign(Object.assign(Object.assign(Object.assign({}, (name && { name })), (purpose && { purpose })), (startTime && { startTime })), (endTime && { endTime }))
            });
            return { msg: "booking Successfully Updated" };
        }
    }
    catch (error) {
        return {
            error: error,
            msg: "Error Updating booking"
        };
    }
});
exports.updatebooking = updatebooking;
const deletebooking = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let booking = yield prismaClient_1.default.booking.findFirst({ where: { id: id } });
        if (!booking) {
            return { msg: "No booking To Delete" };
        }
        yield prismaClient_1.default.booking.delete({
            where: { id: booking.id }
        });
        return { msg: "booking Successfully Deleted" };
    }
    catch (error) {
        return {
            error: error,
            msg: "Error Deleting booking"
        };
    }
});
exports.deletebooking = deletebooking;
