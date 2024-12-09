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
exports.deleteUser = exports.updateUser = exports.getUser = exports.getAllUsers = exports.createUser = void 0;
const prismaClient_1 = __importDefault(require("./prismaClient"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = (name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        password = yield bcrypt_1.default.hash(password, 10);
        return yield prismaClient_1.default.user.create({
            data: { name, email, password },
        });
    }
    catch (error) {
        return {
            error: error,
            msg: "Error Creating User"
        };
    }
});
exports.createUser = createUser;
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield prismaClient_1.default.user.findMany();
});
exports.getAllUsers = getAllUsers;
const findUser = (criteria) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, name, email, password } = criteria;
    return yield prismaClient_1.default.user.findFirst({
        where: Object.assign(Object.assign(Object.assign(Object.assign({}, (id && { id })), (name && { name })), (email && { email })), { password }),
    });
});
const getUser = (id, name, email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((!name && !email && !id)) {
            return { error: 'No parameters sent' };
        }
        return yield findUser({ id, name, email });
    }
    catch (error) {
        return {
            error,
            msg: 'Error fetching user',
        };
    }
});
exports.getUser = getUser;
const updateUser = (id, name, email, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if ((!name && !email && !id) || !password) {
            return { error: 'No parameters To Update' };
        }
        const user = yield findUser({ id });
        if (!user) {
            return { error: "User Not Found" };
        }
        prismaClient_1.default.user.update({
            where: { id: user.id },
            data: Object.assign(Object.assign(Object.assign({}, (name && { name })), (email && { email })), (password && { password: yield bcrypt_1.default.hash(password, 10) }))
        });
        return { msg: "User Successfully Updated" };
    }
    catch (error) {
        return {
            error,
            msg: 'Error Updating user',
        };
    }
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield findUser({ id });
        if (!user) {
            return { error: "User NOt Found" };
        }
        yield prismaClient_1.default.user.delete({
            where: { id: user.id }
        });
        return { msg: "User Successfully Deleted" };
    }
    catch (error) {
        return {
            error,
            msg: 'Error Deleting user',
        };
    }
});
exports.deleteUser = deleteUser;
