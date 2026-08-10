import fs from "fs";

// Helper function to read recipes from recipes.json
const getRecipes = () => {
  const data = fs.readFileSync("recipes.json", "utf8");
  return JSON.parse(data);
};

// Helper function to save recipes to recipes.json
const saveRecipes = (recipes) => {
  fs.writeFileSync(
    "recipes.json",
    JSON.stringify(recipes, null, 2)
  );
};

// GET /recipes
export const getAllRecipes = (req, res) => {
  const recipes = getRecipes();

  res.status(200).json(recipes);
};

// GET /recipes/:id
export const getRecipeById = (req, res) => {
  const recipes = getRecipes();

  const id = Number(req.params.id);

  const recipe = recipes.find(recipe => recipe.id === id);

  if (!recipe) {
    return res.status(404).json({
      message: "Recipe not found"
    });
  }

  res.status(200).json(recipe);
};

// POST /recipes
export const createRecipe = (req, res) => {
  const recipes = getRecipes();

  const nextId = recipes.length > 0 ? Math.max(...recipes.map(recipe => recipe.id)) + 1 : 1;

  const newRecipe = {
    id: nextId,
    ...req.body,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  recipes.push(newRecipe);

  saveRecipes(recipes);

  res.status(201).json({
    message: "Recipe added successfully",
    recipe: newRecipe
  });
};

// PUT /recipes/:id
export const updateRecipe = (req, res) => {
  const recipes = getRecipes();

  const id = Number(req.params.id);

  const recipe = recipes.find(recipe => recipe.id === id);

  if (!recipe) {
    return res.status(404).json({
      message: "Recipe not found"
    });
  }

  recipe.name = req.body.name || recipe.name;
  recipe.ingredients = req.body.ingredients || recipe.ingredients;
  recipe.instructions = req.body.instructions || recipe.instructions;
  recipe.updatedAt = new Date().toISOString();

  saveRecipes(recipes);

  res.status(200).json({
    message: "Recipe updated successfully",
    recipe
  });
};

// DELETE /recipes/:id
export const deleteRecipe = (req, res) => {
  const recipes = getRecipes();

  const id = Number(req.params.id);

  const recipeIndex = recipes.findIndex(recipe => recipe.id === id);

  if (recipeIndex === -1) {
    return res.status(404).json({
      message: "Recipe not found"
    });
  }

  recipes.splice(recipeIndex, 1);

  saveRecipes(recipes);

  res.status(200).json({
    message: "Recipe deleted successfully"
  });
};