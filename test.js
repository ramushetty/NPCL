const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const {pool} = require('../databases/database.js')

app.use(express.static('../public'));


// const connectionString = 'postgres://ramu:test1234@localhost:5432/RecipeBook'; // Update with your database connection details



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Define your routes here (e.g., GET /recipes, POST /recipes, PUT /recipes/:id, DELETE /recipes/:id, POST /ratings)

// Endpoint for adding a new recipe
app.post('/recipes', async (req, res) => {
    try {
        const { title, ingredients, steps, image_url } = req.body;

        const client = await pool.connect();
        const query = `
            INSERT INTO recipes (title, ingredients, steps, image_url)
            VALUES ($1, $2, $3, $4)
            RETURNING id;
        `;

        const values = [title, ingredients, steps, image_url];
        const result = await client.query(query, values);
        const newRecipeId = result.rows[0].id;
        
        client.release();

        // Return the newly created recipe's ID
        res.status(201).json({ id: newRecipeId });
    } catch (error) {
        console.error('Error inserting recipe:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
