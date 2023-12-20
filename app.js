function openModal(foodName, type, ingredients) {
    var modal = document.getElementById("myModal");
    var ingredientsList = document.getElementById("ingredientsList");
    ingredientsList.innerHTML = "";
    document.getElementById("randomfoodname").innerText = foodName;
    document.getElementById("typee").innerText = type;


    ingredients.forEach(function (ingredient) {
        var listItem = document.createElement("li");
        listItem.innerText = ingredient;
        ingredientsList.appendChild(listItem);
    });
    modal.style.display = "block";
}

// random image and its description
async function getrandom() {
    try {
        const response = await axios.get("https://www.themealdb.com/api/json/v1/1/random.php");
        const data = response.data;


        document.getElementById('featured_dish').src = data.meals[0].strMealThumb;
        document.getElementById("randomfoodname").innerText = data.meals[0].strMeal;
        document.getElementById("typee").innerText = data.meals[0].strArea;

        var img = document.getElementById("featured_dish");
        img.onclick = function () {
            openModal(data.meals[0].strMeal, data.meals[0].strArea, getIngredients(data.meals[0]));
        };
    } catch (err) {
        console.log(err);
    }
}

// loop for ingridients after which "The ingridients will be displayed on clicking the random image"
function getIngredients(meal) {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;
        if (meal[ingredientKey] && meal[measureKey]) {
            ingredients.push(`${meal[measureKey]} ${meal[ingredientKey]}`);
        }
    }
    return ingredients;
}

getrandom();

// the close button is made functional which is in the modal
function closeModal() {
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
}


function searchOnEnter(event) {
    if (event.key === "Enter") {
        var searchValue = document.getElementById("searchdishes").value;
        getsearched(searchValue);
    }
}

// On searching the category of the food in the searchbar the output of the meals will be displayed 
async function getsearched(searched) {
    try {
        let response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${searched}`);
        let data = response.data;

        var searchResultsBox = document.querySelector('.box');
        searchResultsBox.innerHTML = "";

        // Check if there are meals available
        if (data.meals && data.meals.length > 0) {
            data.meals.forEach(meal => {
                var block = document.createElement("div");
                block.className = "block";

                var searchImage = document.createElement("div");
                searchImage.className = "searchimage";
                var img = document.createElement("img");
                img.className = "searchimages";
                img.src = meal.strMealThumb;
                searchImage.appendChild(img);

                var searchName = document.createElement("div");
                searchName.className = "searchname";
                var h1 = document.createElement("h1");
                h1.className = "searchnames";
                h1.textContent = meal.strMeal;
                searchName.appendChild(h1);

                block.appendChild(searchImage);
                block.appendChild(searchName);

                searchResultsBox.appendChild(block);
            });
        } else {
            // Display a text message when no results are found
            var noResultsText = document.createElement("p");
            noResultsText.textContent = "No results found.";
            searchResultsBox.appendChild(noResultsText);
        }
    } catch (err) {
        console.log("Error fetching data:", err);
    }
}









