// document.addEventListener("DOMContentLoaded", function () {
//     const recipeGallery = document.getElementById("recipe-gallery");

//     // Sample data (replace with actual data fetched from the server)
//     const sampleRecipes = [
//         {
//             title: "Spaghetti Carbonara",
//             ingredients: "Pasta, eggs, bacon, Parmesan cheese, black pepper",
//             steps: "1. Cook pasta 2. Cook bacon 3. Mix eggs and cheese 4. Combine all ingredients",
//             image_url: "spaghetti.jpg",
//         },
//         {
//             title: "Chicken Stir-Fry",
//             ingredients: "Chicken, bell peppers, broccoli, soy sauce, garlic, ginger",
//             steps: "1. Cook chicken 2. Stir-fry vegetables 3. Add sauce 4. Combine",
//             image_url: "stir-fry.jpg",
//         },
//     ];

//     // Function to render recipes
//     function renderRecipes(recipes) {
//         recipeGallery.innerHTML = "";
//         recipes.forEach(function (recipe) {
//             const recipeCard = document.createElement("div");
//             recipeCard.classList.add("recipe-card");

//             const recipeImage = document.createElement("img");
//             recipeImage.src = recipe.image_url;
//             recipeCard.appendChild(recipeImage);

//             const recipeTitle = document.createElement("h2");
//             recipeTitle.textContent = recipe.title;
//             recipeCard.appendChild(recipeTitle);

//             const recipeIngredients = document.createElement("p");
//             recipeIngredients.textContent = "Ingredients: " + recipe.ingredients;
//             recipeCard.appendChild(recipeIngredients);

//             const recipeSteps = document.createElement("p");
//             recipeSteps.textContent = "Steps: " + recipe.steps;
//             recipeCard.appendChild(recipeSteps);

//             recipeGallery.appendChild(recipeCard);
//         });
//     }

//     // Fetch and display recipes (replace with actual API calls)
//     renderRecipes(sampleRecipes);
// });




document.addEventListener("submit", async (e) => {
    


    e.preventDefault();
    // const recipeForm = document.getElementById("recipe-form");
    // Gather data from the form
    const title = document.getElementById("recipe-title").value;
    const ingredients = document.getElementById("recipe-ingredients").value;
    const steps = document.getElementById("recipe-steps").value;
    const imageUrl = document.getElementById("recipe-image").value;

    // Create a new recipe object
    const newRecipe = {
        title: title,
        ingredients: ingredients,
        steps: steps,
        image_url: imageUrl,
    };
    console.log(newRecipe)

    try {
        const response = await fetch('/recipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newRecipe),
        });

        if (response.ok) {
            // Recipe created successfully
            const data = await response.json();
            console.log('Recipe created:', data);
        } else {
            // Handle errors (e.g., show an error message)
            console.error('Error creating recipe:', response.statusText);
        }
    } catch (error) {
        console.error('Error creating recipe:', error);
    }


})
