// modal code 
var modal = document.getElementById("myModal");
var img = document.getElementById("randomImage");
img.onclick = function () {
    modal.style.display = "block";
};
function closeModal() {
    modal.style.display = "none";
}

// random code 
async function getrandom() {
    try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = response.data;

        document.getElementById('randomfoodname').textContent = data.meals[0].strMeal;
        document.getElementById('typee').textContent = data.meals[0].strArea;
        document.getElementById('featured_dish').src = data.meals[0].strMealThumb;
        // document.getElementById('ingredients').textContent = data.meals[0].strIngredients;
    } catch (err) {
        console.log(err);
    }
}

getrandom();

// searched code













