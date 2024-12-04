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
exports.deleteAuditorium = exports.updateAuditorium = exports.findAuditorium = exports.getAllAuditoriums = exports.createAuditorium = void 0;
const prismaClient_1 = __importDefault(require("./prismaClient"));
const createAuditorium = (name, location, description, capacity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prismaClient_1.default.auditorium.create({
            data: { name, location, capacity, description },
        });
    }
    catch (error) {
        return {
            error: error,
            msg: "Error Creating Auditorium"
        };
    }
});
exports.createAuditorium = createAuditorium;
const getAllAuditoriums = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.default.auditorium.findMany();
});
exports.getAllAuditoriums = getAllAuditoriums;
const findAuditorium = (id, name, capacity) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!id && !name && !capacity) {
            return { msg: "No Parameters Given" };
        }
        else if (!capacity) {
            let auditorium = yield prismaClient_1.default.auditorium.findMany({ where: Object.assign(Object.assign({}, (id && { id })), (name && { name })) });
            if (!auditorium) {
                return { msg: "No Auditorium Found" };
            }
            return auditorium;
        }
        else {
            let auditorium = yield prismaClient_1.default.auditorium.findMany({ where: Object.assign(Object.assign(Object.assign({}, (id && { id })), (name && { name })), { capacity: { gte: capacity } }) });
            if (!auditorium) {
                return { msg: "No Auditorium Found" };
            }
            return auditorium;
        }
    }
    catch (error) {
        return {
            error: error,
            msg: "Error Finding Auditorium"
        };
    }
});
exports.findAuditorium = findAuditorium;
const updateAuditorium = (id, name, location, capacity, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!location && !name && !capacity && !description) {
            return { msg: "No Parameters To Update" };
        }
        else {
            let auditorium = yield prismaClient_1.default.auditorium.findFirst({ where: { id: id } });
            if (!auditorium) {
                return { msg: "No Auditorium To Update" };
            }
            yield prismaClient_1.default.auditorium.update({
                where: { id: auditorium.id },
                data: Object.assign(Object.assign(Object.assign(Object.assign({}, (name && { name })), (location && { location })), (capacity && { capacity })), (description && { description }))
            });
            return auditorium;
        }
    }
    catch (error) {
        return {
            error: error,
            msg: "Error Updating Auditorium"
        };
    }
});
exports.updateAuditorium = updateAuditorium;
const deleteAuditorium = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let auditorium = yield prismaClient_1.default.auditorium.findFirst({ where: { id: id } });
        if (!auditorium) {
            return { msg: "No Auditorium To Delete" };
        }
        yield prismaClient_1.default.auditorium.delete({
            where: { id: auditorium.id }
        });
        return { msg: "Auditorium Successfully Deleted" };
    }
    catch (error) {
        return {
            error: error,
            msg: "Error Deleting Auditorium"
        };
    }
});
exports.deleteAuditorium = deleteAuditorium;
