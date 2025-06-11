"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.saveBook = exports.login = exports.createUser = exports.getSingleUser = void 0;
// import user model
const User_js_1 = __importDefault(require("../models/User.js"));
// import sign token function from auth
const auth_js_1 = require("../services/auth.js");
// get a single user by either their id or their username
const getSingleUser = async (req, res) => {
    const foundUser = await User_js_1.default.findOne({
        $or: [{ _id: req.user ? req.user._id : req.params.id }, { username: req.params.username }],
    });
    if (!foundUser) {
        return res.status(400).json({ message: 'Cannot find a user with this id!' });
    }
    return res.json(foundUser);
};
exports.getSingleUser = getSingleUser;
// create a user, sign a token, and send it back (to client/src/components/SignUpForm.js)
const createUser = async (req, res) => {
    const user = await User_js_1.default.create(req.body);
    if (!user) {
        return res.status(400).json({ message: 'Something is wrong!' });
    }
    const token = (0, auth_js_1.signToken)(user.username, user.password, user._id);
    return res.json({ token, user });
};
exports.createUser = createUser;
// login a user, sign a token, and send it back (to client/src/components/LoginForm.js)
// {body} is destructured req.body
const login = async (req, res) => {
    const user = await User_js_1.default.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (!user) {
        return res.status(400).json({ message: "Can't find this user" });
    }
    const correctPw = await user.isCorrectPassword(req.body.password);
    if (!correctPw) {
        return res.status(400).json({ message: 'Wrong password!' });
    }
    const token = (0, auth_js_1.signToken)(user.username, user.password, user._id);
    return res.json({ token, user });
};
exports.login = login;
// save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
// user comes from `req.user` created in the auth middleware function
const saveBook = async (req, res) => {
    try {
        const updatedUser = await User_js_1.default.findOneAndUpdate({ _id: req.user._id }, { $addToSet: { savedBooks: req.body } }, { new: true, runValidators: true });
        return res.json(updatedUser);
    }
    catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
};
exports.saveBook = saveBook;
// remove a book from `savedBooks`
const deleteBook = async (req, res) => {
    const updatedUser = await User_js_1.default.findOneAndUpdate({ _id: req.user._id }, { $pull: { savedBooks: { bookId: req.params.bookId } } }, { new: true });
    if (!updatedUser) {
        return res.status(404).json({ message: "Couldn't find user with this id!" });
    }
    return res.json(updatedUser);
};
exports.deleteBook = deleteBook;
