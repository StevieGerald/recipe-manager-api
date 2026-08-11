import express from "express";
import { validateRecipe } from "../middleware/validateRecipe.js";

import {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} from "../controllers/recipeController.js";

const router = express.Router();

router.get("/", getAllRecipes);

router.get("/:id", getRecipeById);

router.post("/", validateRecipe, createRecipe);

router.put("/:id", validateRecipe, updateRecipe);

router.delete("/:id", deleteRecipe);

export default router;