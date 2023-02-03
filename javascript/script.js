
const darkMode = document.querySelector('.header-switch-btn');
const body = document.querySelector('body');
const container = document.querySelector('.main-container');
const switchSpan = document.querySelector('.header-switch-mode');
const switchBtn = document.querySelector('.switch-btn');
const flagContainer = document.querySelector('.flag-list-container');
const loader = document.querySelector("#loading");

//* -------Dark--------mode---------------
darkMode.addEventListener('click', () => {
    body.classList.toggle('dark');
    container.classList.toggle('dark');
    if (body.classList.contains('dark')) {
        switchBtn.setAttribute('src', 'img/icons/sun.svg')
        switchSpan.innerHTML = 'Light Mode';
    } else {
        switchBtn.setAttribute('src', 'img/icons/moon.svg')
        switchSpan.innerHTML = 'Dark Mode';
    }
});

//* -------Loading-----screen-------------
function displayLoading() {
    setTimeout(() => {
        loader.style.display = 'block'
    }, 5000);
}
displayLoading();
function hideLoading() {
    loader.style.display = 'none'
}

//*--------Create-----content--------------
async function getCountries() {
    try {
        const response = await fetch('https://restcountries.com/v3.1/all')
        const data = await response.json()
        return data;
    } catch (err) {
        console.log(err);
    } finally {
        console.log('Hi');
    }
}
const getCountry = function() {
    getCountries()
    .then(data => {
        hideLoading();
        for (const country of data) {
            createCountry(country);
        }
    })
    .then(() => {
        const allCountries = document.querySelectorAll('.country');
        const searchInput = document.querySelector('#search');
        const pag = document.querySelectorAll('.pag');
        const selectChange = document.querySelector('#filter');
        allCountries.forEach(country => {

            const lowerCaseCountry = country.children[1].children[0].textContent.toLowerCase();            
            searchInput.addEventListener('keyup', () => {
                let lowerCaseInput = searchInput.value.toLowerCase();
                if (lowerCaseCountry.indexOf(lowerCaseInput) == -1) {
                    country.classList.add('hidden');
                } else {
                    country.classList.remove('hidden');
                }
            });
            for (let i = 0; i < pag.length; i++) {
                pag[i].addEventListener('click', () => {
                    let filter = pag[i].textContent.toLowerCase();
                    if (lowerCaseCountry[0].indexOf(filter) != -1) {
                        country.classList.remove('hidden');
                    } else {
                        country.classList.add('hidden');
                    }
                    if (filter === 'all') {
                        country.classList.remove('hidden');
                    }
                })
                
            }
            selectChange.addEventListener('change', (e) => {
                const getRegion = country.children[1].children[1].children[1].textContent.slice(7, 22).toLowerCase();
                const target = e.target;
                if (getRegion.indexOf(target.value) != -1) {
                    country.classList.remove('hidden');                    
                } else {
                    country.classList.add('hidden');
                }
            });
        }) 
    })
    
    .catch(err => {
        console.log('Data missing');
        console.log(err);
    })
}
getCountry();

function createCountry(country) {
    let something = `
    <div class="flag-list-country country ">
        <img class="country-flag" src="${country.flags.png}" alt="country-flag">
        <div class="country-text ">
            <h2 class="country-name">${getName(country)}</h2>
            <div class="country-info">
            <p class="country-population"><b>Population: </b>${country.population}</p>
            <p class="country-region"><b>Region: </b>${country.region}</p>
            <p class="country-capital"><b>Capital: </b>${getCapital(country)}</p>
            </div>
        </div>
    </div>`;
    flagContainer.innerHTML+=something

    
}
function getCapital(country) {
    try {
        return country.capital[0]
    } catch {
        return 'No info'
    }
}
function getName(country) {
    if (country.name.official.length < 45){
        return country.name.official
    } else {
        return country.name.official.substring(0, 45).concat('...')
    }
}


