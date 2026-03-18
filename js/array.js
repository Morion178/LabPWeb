let arr = Array.from(document.querySelectorAll("div#education2 ol li"));

console.log(arr.forEach(arr => console.log(arr.textContent)));

function searchInArray(keyword){
    console.log(`Searching for "${keyword}" in array...`);
    arr.filter(arr => arr.textContent.includes(keyword)).forEach(arr => console.log(arr.textContent));
}

searchInArray("2016");
searchInArray("2024");

function findLicense(){
    console.log("Finding licenses...");
    arr.forEach(arr => {let words = arr.textContent.split(" ");
            console.log(words[1]);
    });
}

findLicense();

function findSchoolYears(){
    console.log("Finding total study years...");
    let totalYears = 0;
    arr.forEach(arr => {let words = arr.textContent.split(" ");
            let years = words[0].split("-");
            years[1] = years[1].replace(":", "");
            totalYears += parseInt(years[1]) - parseInt(years[0]);
});
    console.log(`Total school years: ${totalYears}`);
}

findSchoolYears();