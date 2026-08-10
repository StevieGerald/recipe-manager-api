import fs from "fs";

// Read recipes from recipes.json
const getRecipes = () => {
  const data = fs.readFileSync("recipes.json", "utf8");
  return JSON.parse(data);
};

export const validateRecipe = (req, res, next) => {
  const { name, ingredients, instructions } = req.body;

  // Required fields
  if (!name || !ingredients || !instructions) {
    return res.status(400).json({
      message: "All fields are required."
    });
  }

  // Data types
  if (typeof name !== "string") {
    return res.status(400).json({
      message: "Name must be a string."
    });
  }

  if (!Array.isArray(ingredients)) {
    return res.status(400).json({
      message: "Ingredients must be an array."
    });
  }

  if (typeof instructions !== "string") {
    return res.status(400).json({
      message: "Instructions must be a string."
    });
  }

  // Unique ID
  const recipes = getRecipes();

  const nextId = recipes.length > 0 ? Math.max(...recipes.map(recipe => recipe.id)) + 1 : 1;

// req.body.id = nextId;q
  next();
};