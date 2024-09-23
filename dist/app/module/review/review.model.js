"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, required: true, ref: 'User' },
    rating: { type: Number, required: true },
    feedback: { type: String, required: true },
}, { timestamps: true });
const Review = (0, mongoose_1.model)('Review', reviewSchema);
exports.default = Review;
