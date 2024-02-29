const buttonContainer = document.getElementById("button-container");
const fetchCategory = async () => {
  let res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  let data = await res.json();
  let categoryData = data.data;
  categoryData.map(function (element) {
    let button = document.createElement("button");
    button.className = "btn bg-red-500 text-white hover:bg-red-400 mx-1";
    button.innerText = element.category;
    buttonContainer.appendChild(button);
  });
};
fetchCategory();
