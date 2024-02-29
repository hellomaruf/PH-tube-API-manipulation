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

const fetchDataByCategory = async (elementId) => {
  console.log(elementId);
  let res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${elementId}`
  );
  let data = await res.json();
  let allData = data.data;
  allData.map(function (element) {
    console.log(element);
    let cardContainer = document.getElementById("cards-container");
    let cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
      <div class="card  bg-base-100 shadow-md">
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>
        <div class="flex gap-4 py-6 px-2">
          <div class="">
            <img
              class="rounded-full w-24"
              src="assets/Noha.jpg"
              alt=""
              srcset=""
            />
          </div>
          <div class="">
            <h2 class="card-title">
              Building a Winning UX Strategy Using the Kano Model
            </h2>
            <p>Awlad Hossain</p>
            <p class="text-gray-600">91K views</p>
          </div>
        </div>
      </div>
      `;
    cardContainer.appendChild(cardDiv);
  });
};

fetchCategory();
