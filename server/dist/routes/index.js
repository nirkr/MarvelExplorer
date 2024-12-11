"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moviesRouter = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.moviesRouter = router;
router.get("/moviesPerActor", (req, res) => {
    // Implementation to fetch and return movies per actor
    res.json({}); // Placeholder
});
router.get("/actorsWithMultipleCharacters", (req, res) => {
    // Implementation to fetch actors with multiple characters
    res.json({}); // Placeholder
});
router.get("/charactersWithMultipleActors", (req, res) => {
    // Implementation to fetch characters with multiple actors
    res.json({}); // Placeholder
});
