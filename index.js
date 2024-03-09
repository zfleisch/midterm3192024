function buildHome()
{
    fetch("./data.json")
        .then(response => response.json())
        .then(home => loadHome(home));

    function loadHome(home)
    {
        var containers = document.getElementsByClassName("horizontal_container");
        console.log(containers.length);
        let flip = 0;
        for(var i = 0; i < home.home.length; i++)
        {
            let div;
            let imageDiv;
            let text = home.home[i].text;
            let image = home.home[i].image;
            var mainContainer = containers[i];
            div = document.createElement("div");
            div.innerHTML = `<p> <strong>${text} </strong> </p>`;
            imageDiv = document.createElement("div");
            imageDiv.innerHTML = `<img src=${image} width="650">`;
            if(flip % 2 == 0)
            {
                mainContainer.appendChild(div);
                mainContainer.appendChild(imageDiv);
            }
            else
            {
                mainContainer.appendChild(imageDiv);
                mainContainer.appendChild(div);
            }
            flip++;
        }
    }
}
function getRoutine(input)
{
    console.log(input);

    fetch("./data.json")
        .then(response => response.json())
        .then(exercise => loadExcercise(exercise));

    function loadExcercise(excercise)
    {
        let div;
        let imageDiv;
        var mainContainer = document.getElementById("routines_container");
        var imageContainer = document.getElementById("routines_image_container");
        //Clear routine_container for call to different routine
        while(mainContainer.firstChild)
        {
            mainContainer.removeChild(mainContainer.firstChild);
        }
        //Clear routine_image_container for call to different routine
        while(imageContainer.firstChild)
        {
            imageContainer.removeChild(imageContainer.firstChild);
        }
        for (var i = 0; i < excercise.routines.length; i++)
        {
            if (excercise.routines[i].muscle_group == input)
            {
                let muscle_group = excercise.routines[i].muscle_group;
                let description = excercise.routines[i].description;
                let image = excercise.routines[i].image;
                let excercises = excercise.routines[i].exercises;
                let routine = "";
                for (var j = 0; j < excercises.length - 1; j++)
                {
                    routine = routine + excercises[j] + ", ";
                }
                routine = routine + excercises[j];
                console.log(`Muscle Group: ${muscle_group} descriptions: ${description} image: ${image}`);
                div = document.createElement("div");
                div.innerHTML = `<h1>${muscle_group} </h1>
                                 <h2>Exercises (Sets-Reps):</h2> 
                                 <h3> ${routine}</h3>
                ${description} <br>`;
                mainContainer.appendChild(div);
                imageDiv = document.createElement("div");
                imageDiv.innerHTML = `<img src=${image} width="500"> <figcaption>Image courtesy of musclecharts.net</figcaption>`;
                imageContainer.appendChild(imageDiv);
            }
        }
        if (div == null)
        {
            div = document.createElement("div");
            div.innerHTML = `<br> <h3>Muscle Group Not Found</h3> <br>`;
            mainContainer.appendChild(div);
        }
    }
}
function getDiet(input) {
    console.log(input);

    fetch("./data.json")
        .then(response => response.json())
        .then(diet => loadDiet(diet));

    function loadDiet(diet) {
        const diets = diet.nutrition;
        const selectedDiet = diets.find(item => item.diet === input);

        if (selectedDiet) {
            const mainContainer = document.getElementById("main_container");
            const imageContainer = document.getElementById("image_container");

            mainContainer.innerHTML = `
                <h2>${selectedDiet.diet}</h2>
                <p>${selectedDiet.description}</p>
                <p><strong>Benefits:</strong> ${selectedDiet.benefits}</p>
                <p><strong>Downsides:</strong> ${selectedDiet.downsides}</p>
            `;

            imageContainer.innerHTML = `<img src="${selectedDiet.image}" alt="${selectedDiet.diet} Image">`;
        } else {
            console.error("Diet not found");
        }
    }
}
