const buttonContainer = document.getElementById("button-container");
let errorMessage = document.getElementById("error-msg");
let cardContainer = document.getElementById("cards-container");
let sortBtn = document.getElementById("sort-btn");

const fetchCategory = async () => {
  let res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  let data = await res.json();
  let categoryData = data.data;
  categoryData.map(function (element) {
    // let elementId = element.category_id;
    // console.log(elementId);
    let button = document.createElement("button");
    button.className = "btn category-btn bg-red-500 text-white  mx-1";
    button.innerText = element.category;
    buttonContainer.appendChild(button);

    // button.classList.remove("bg-red-500");
    button.addEventListener("click", () =>
      fetchDataByCategory(element.category_id)
    );
  });
};

let selectedCategory = 1000;
let sortByView = false;
sortBtn.addEventListener("click", function () {
  sortByView = true;
  fetchDataByCategory(selectedCategory, sortByView);
});
const fetchDataByCategory = async (elementId = 1000, sortByView) => {
  console.log(elementId);

  let res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${elementId}`
  );
  let data = await res.json();
  let allData = data.data;

  // sorted all card by view*************
  if (sortByView) {
    allData.sort((a, b) => {
      let totalViewFristStr = a.others.views;
      let totalViewSecondStr = b.others.views;
      let totalViewFristNum =
        parseFloat(totalViewFristStr.replace("K", "")) || 0;
      let totalViewSecondNum =
        parseFloat(totalViewSecondStr.replace("K", "")) || 0;
      return totalViewSecondNum - totalViewFristNum;
    });
  }
  // whan card are not available then show this error msg*************
  console.log(allData.length);
  if (allData.length === 0) {
    errorMessage.classList.remove("hidden");
  } else {
    errorMessage.classList.add("hidden");
  }

  cardContainer.innerHTML = "";
  allData.map(function (element) {
    console.log(element);
    let varifyedBadge = "";
    if (element.authors[0].verified) {
      varifyedBadge = `
          <img class="w-6 h-6" src="assets/varifyed.png" alt="" srcset="" />
          `;
    }
    let cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
      <div class="card  bg-base-100 shadow-md">
        <figure>
          <img
          class ="h-64 w-full"
            src="${element.thumbnail}"
            alt="Shoes"
          />
        </figure>
        <div class="flex gap-4 py-6 px-2">
          <div class="">
            <img
              class="rounded-full w-10 h-10 "
              src="${element.authors[0].profile_picture}"
              alt=""
              srcset=""
            />
          </div>
          <div class="">
            <h2 class="card-title">
              ${element.title}
            </h2>
            <div class="flex items-center gap-2">
            <p>${element.authors[0].profile_name}</p>
            ${varifyedBadge}
           </div>
            <p class="text-gray-600">${element.others.views}</p>
          </div>
        </div>
      </div>
      `;
    cardContainer.appendChild(cardDiv);
  });
};

fetchCategory();
fetchDataByCategory();
