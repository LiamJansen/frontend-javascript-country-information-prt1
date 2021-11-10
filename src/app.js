import axios from 'axios';

async function fetchCountries() {
  try {
    const result = await axios.get('https://restcountries.com/v2/all');
    const countries = result.data;

    countries.sort((a, b) => {
      return a.population - b.population;
    });

    createListItems(countries);

  } catch (e) {
    console.error(e);
  }
}

fetchCountries();

function createListItems(countries) {
  const countryInfo = document.getElementById("country_list");

  countries.map((country) => {  
    const countryContainer = document.createElement("li");
    const countryFlag = document.createElement("img")
    const countryName = document.createElement("span");
    const countryPopulation = document.createElement("p");
    
    countryFlag.setAttribute("alt", country.name + "_flag");
    countryFlag.setAttribute("src", country.flag);
    countryFlag.setAttribute("class", "flag");
    countryName.setAttribute("class", getRegionClass(country.region));
    countryName.textContent = country.name;
    countryPopulation.setAttribute("class", "population");
    countryPopulation.textContent = "Has a population of " + country.population + " people";
    
    countryInfo.append(countryContainer);
    countryContainer.append(countryFlag);
    countryContainer.append(countryName);
    countryContainer.append(countryPopulation);
  })
}

function getRegionClass(currentRegion) {
  switch (currentRegion) {
    case 'Africa':
      return 'blue';
    case 'Americas':
      return 'green';
    case 'Asia':
      return 'red';
    case 'Europe':
      return 'yellow';
    case 'Oceania':
      return 'purple';
    default:
      return 'default';
  }
}