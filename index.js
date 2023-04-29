const currency = "PLN";
let cars = [
  {
    brand: "Volkswagen",
    model: "Golf 7",
    yearOfProduction: 2019,
    engine: "1.8 TSI",
    mileage: 75000,
    image:
      "https://images.pexels.com/photos/11218694/pexels-photo-11218694.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 70000,
  },
  {
    brand: "Volkswagen",
    model: "Golf 7",
    yearOfProduction: 2018,
    engine: "2.0 TSI",
    mileage: 82000,
    image:
      "https://images.pexels.com/photos/10843557/pexels-photo-10843557.jpeg?auto=compress&cs=tinysrgb&w=400",
    price: 98000,
  },
  {
    brand: "Volvo",
    model: "XC90",
    yearOfProduction: 2016,
    engine: "2.0 D5",
    mileage: 157000,
    image:
      "https://images.pexels.com/photos/6740129/pexels-photo-6740129.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 147500,
  },
  {
    brand: "Skoda",
    model: "Superb",
    yearOfProduction: 2018,
    engine: "2.0 TSI",
    mileage: 80000,
    image:
      "https://images.pexels.com/photos/15194846/pexels-photo-15194846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 118000,
  },

  {
    brand: "Land Rover",
    model: "Discovery 4",
    yearOfProduction: 2012,
    engine: "3.0D V6",
    mileage: 375000,
    image:
      "https://images.pexels.com/photos/14860914/pexels-photo-14860914.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    price: 59000,
  },
];

const accessories = [
  {
    name: "Dywaniki",
    price: 1000,
  },
  {
    name: "Opony ziomowe",
    price: 1500,
  },
  {
    name: "Nawigacja",
    price: 4500,
  },
  {
    name: "Ubezpieczenie",
    price: 3200,
  },
];

let $searchCars = document.getElementsByClassName("search_icon")[0];
let $searchCarsInput = document.getElementById("car_search");
let $carContainer = document.querySelectorAll(".car_container");

$searchCars.addEventListener("click", showCarList);
$searchCarsInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();

    $searchCars.click();
  }
});
const $carsContainer = document.getElementById("cars_container");
window.addEventListener("load", showCarList());

function showCarList() {
  $carsContainer.innerHTML = "";
  let searchedCars = $searchCarsInput.value;
  let carsArray = [...cars];
  if (searchedCars != "") {
    carsArray = cars.filter((car) => {
      return car.brand === searchedCars;
    });
  }
  for (let car of carsArray) {
    let $carContainerDiv = document.createElement("div");
    $carContainerDiv.setAttribute("class", "car_container");

    let $carPicture = document.createElement("img");
    $carPicture.setAttribute("class", "car_picture");
    $carPicture.src = car.image;
    $carContainerDiv.appendChild($carPicture);

    let $CarInformationContainer = document.createElement("div");
    $CarInformationContainer.setAttribute("class", "car_information_container");

    $carContainerDiv.appendChild($CarInformationContainer);

    let $brandP = document.createElement("p");
    let $modelP = document.createElement("p");
    let $yearOfProductionP = document.createElement("p");
    let $engineP = document.createElement("p");
    let $mileageP = document.createElement("p");
    let $priceDiv = document.createElement("div");
    let $priceP = document.createElement("p");
    let $priceCurrencyP = document.createElement("p");
    $priceDiv.setAttribute("class", "car_information_price");

    $brandP.innerText = car.brand;
    $modelP.innerText = car.model;
    $yearOfProductionP.innerText = car.yearOfProduction;
    $engineP.innerText = car.engine;
    $mileageP.innerText = `${car.mileage} km`;
    $priceP.innerText = `${car.price}`;
    $priceCurrencyP.innerText = `${currency}`;

    $CarInformationContainer.appendChild($brandP);
    $CarInformationContainer.appendChild($modelP);
    $CarInformationContainer.appendChild($yearOfProductionP);
    $CarInformationContainer.appendChild($engineP);
    $CarInformationContainer.appendChild($mileageP);
    $priceDiv.appendChild($priceP);
    $priceDiv.appendChild($priceCurrencyP);
    $CarInformationContainer.appendChild($priceDiv);

    $carsContainer.appendChild($carContainerDiv);
  }
  $carContainer = document.querySelectorAll(".car_container");

  if (carsArray.length > 0) {
    let $lastCarPic = document.querySelector(
      `img[src="${carsArray[carsArray.length - 1].image}"]`
    );
    $lastCarPic.onload = showSelectedCar;
  } else {
    let $searcherror = document.createElement("p");
    $searcherror.innerText = "Błąd wyszukiwania";
    $carsContainer.appendChild($searcherror);
  }
}
let dateIn2Weeks = new Date();
dateIn2Weeks.setDate(dateIn2Weeks.getDate() + 14);

const $pickUpDate = document.getElementById("date_in_2_weeks");
$pickUpDate.innerText = dateIn2Weeks.toLocaleDateString();

const $accessoriesList = document.getElementById("car_accessories_list");

for (let accessory of accessories) {
  let $singleAccessory = document.createElement("div");
  $singleAccessory.setAttribute("class", "single_accessory");

  let $accessoryName = document.createElement("p");
  $accessoryName.innerText = accessory.name;

  let $accessoryPrice = document.createElement("p");
  $accessoryPrice.innerText = `${accessory.price}`;
  let $accessoryCurrency = document.createElement("p");
  $accessoryCurrency.innerText = `${currency}`;

  let $accessoryCheckboxInput = document.createElement("input");
  $accessoryCheckboxInput.type = "checkbox";
  $accessoryCheckboxInput.setAttribute("class", "accessory_checkbox");

  $singleAccessory.appendChild($accessoryCheckboxInput);
  $singleAccessory.appendChild($accessoryName);
  $singleAccessory.appendChild($accessoryPrice);
  $singleAccessory.appendChild($accessoryCurrency);

  $accessoriesList.appendChild($singleAccessory);
}
let carPrice;
let $carPrice = document.getElementById("car_price");
let $selectedCarDiv = document.getElementById("selected_car_details");
let $configurationForm = document.getElementById("configuration_form");
function showSelectedCar() {
  $carContainer.forEach((i) =>
    i.addEventListener("click", (e) => {
      $selectedCarDiv.innerHTML = e.currentTarget.innerHTML;
      $selectedCarDiv.setAttribute("id", "selected_car");
      $selectedCarDiv.setAttribute("class", "car_container");
      document.querySelector(".cars_container").classList.toggle("hidden");
      $configurationForm.classList.toggle("hidden");

      carPrice = Number(
        e.currentTarget.children[1].children[5].children[0].innerText
      );

      $carPrice.innerText = `${carPrice} ${currency}`;
    })
  );
}

let $returnToCarsList = document.getElementById("return_to_cars_list");
$returnToCarsList.addEventListener("click", () => {
  $configurationForm.classList.toggle("hidden");
  document.querySelector(".cars_container").classList.toggle("hidden");
});

let $accessoryCheckbox = document.querySelectorAll(".accessory_checkbox");
$accessoryCheckbox.forEach((i) =>
  i.addEventListener("click", (e) => {
    e.currentTarget.classList.toggle("selected_accesory");
    let additionalcost = 0;
    let $selectedAccessories = document.querySelectorAll(".selected_accesory");
    $selectedAccessories.forEach(
      (i) => (additionalcost += Number(i.parentElement.children[2].innerText))
    );
    carPrice = Number(
      document.getElementById("selected_car").children[1].children[5]
        .children[0].innerText
    );
    carPrice += additionalcost;
    $carPrice.innerText = `${carPrice} ${currency}`;
  })
);
let buyerName = document.getElementById("full_name");
buyerName.value = localStorage.getItem("full_name");
let financing = document.querySelectorAll('input[name="financing"]');
let valueOfFinancing = localStorage.getItem("financing");
financing.forEach((elem) => {
  if (elem.value == valueOfFinancing) {
    elem.checked = true;
  }
});

buyerName.addEventListener("change", function (e) {
  localStorage.setItem(e.target.id, e.target.value);
});
financing.forEach((elem) => {
  elem.addEventListener("change", function (e) {
    localStorage.setItem(e.target.name, e.target.value);
  });
});

document.getElementById("buy_selected_car").addEventListener("click", () => {
  let $errorDiv = document.getElementsByClassName("wrong_input_data")[0];
  if (checkInputData()) {
    $errorDiv.classList.add("hidden");
    $configurationForm.classList.toggle("hidden");
    showConfirmation();
    localStorage.clear();
  } else {
    $errorDiv.classList.remove("hidden");
  }
});

function checkInputData() {
  if (
    buyerName.value.split(/\W+/).length === 2 &&
    (document.getElementById("leasing").checked ||
      document.getElementById("cash").checked)
  ) {
    return true;
  } else {
    return false;
  }
}

let $confirmationSection = document.getElementById("confirmation_section");
let $confirmationDiv = document.getElementById("selected_car_confirmation");
let $confirmationTotalPrice = document.getElementById(
  "selected_car_total_price"
);
let $confirmationFinancing = document.getElementById("selected_car_financing");

function showConfirmation() {
  $confirmationDiv.setAttribute("class", "car_container");
  $confirmationSection.classList.remove("hidden");
  $confirmationDiv.innerHTML =
    document.getElementById("selected_car").innerHTML;
  $confirmationTotalPrice.innerHTML = document.getElementsByClassName(
    "selected_car_summary"
  )[0].innerHTML;
  let chosenFinancing = localStorage.getItem("financing");

  if (chosenFinancing == "cash") {
    $confirmationFinancing.innerText = "Wybrano finansowanie: Gotówka";
  } else if (chosenFinancing == "leasing") {
    $confirmationFinancing.innerText = "Wybrano finansowanie: Leasing";
  }
}
