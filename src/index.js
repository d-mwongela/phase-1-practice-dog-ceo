console.log('%c HI', 'color: firebrick')
const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

document.addEventListener("DOMContentLoaded", () => {
    fetchImages()
        .then((array) => {
            array.forEach((image) => {
                document.body.innerHTML += `<img src='${image}'></img>`;
            });
        })
        .then(() => {
            fetchBreed().then((breeds) => {
                let count = 0;
                for (const breed in breeds) {
                    document.body.innerHTML += `<li onClick ='changeColor(${count})' style ="cursor: pointer;"class='breed'>${breed}</li>`;
                    count++;
                }
                const dropdown = document.getElementById("breed-dropdown");
                dropdown.addEventListener("change", filter);
            });
        });
});

const changeColor = (id) => {
    document.querySelectorAll("li")[id].style.color = "red";
};
const fetchImages = async () => {
    const response = await fetch(imgUrl);
    const json = await response.json();
    return json.message;
};
const fetchBreed = async () => {
    const response = await fetch(breedUrl);
    const json = await response.json();
    return json.message;
};
const filter = () => {
    const dropdown = document.getElementById("breed-dropdown");
    const filterValue = dropdown.value;
    document.querySelectorAll("li").forEach((breed) => {
        if (breed.innerText[0] !== filterValue) {
            breed.style.display = "none";
        }
    });
};