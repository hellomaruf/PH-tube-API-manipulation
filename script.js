const buttonContainer = document.getElementById("button-container");
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
    button.className = "btn bg-red-500 text-white hover:bg-red-400 mx-1";
    button.innerText = element.category;
    buttonContainer.appendChild(button);
    button.addEventListener("click", () =>
      fetchDataByCategory(element.category_id)
    );
  });
};

let errorMessage = document.getElementById("error-msg");
let cardContainer = document.getElementById("cards-container");
const fetchDataByCategory = async (elementId = 1000) => {
  console.log(elementId);

  let res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${elementId}`
  );
  let data = await res.json();
  let allData = data.data;

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
