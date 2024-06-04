// "use strict";

// let inp1 = document.querySelector("#input");
// const soni = 15;

// function fetchFunction() {
//   const query = inp1.value.trim();
//   if (query !== "") {
//     fetch(
//       `https://api.unsplash.com/search/photos/random?page=1&query=${query}&client_id=`

//     )
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//         createHtml(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       })
//       .finally(() => {
//         console.log("Yaxshi natija");
//       });
//   } else {
//     alert("Input bo'sh bo'lishi mumkin emas");
//   }
// }

// function createHtml(data) {
//   let div = document.querySelector(".box");

//   div.style.margin = "0 auto";
//   div.innerHTML = "";
//   console.log(data.results);

//   for (let i = 0; i < 10; i++) {
//     let images = document.createElement("img");
//     let manba = data.results[i].urls.regular;
//     images.src = manba;

//     div.appendChild(images);

//     let link = document.createElement("a");
//     link.href = manba;

//     link.innerHTML = `<i class="fa-solid fa-download"></i>`;

//     div.appendChild(link);
//   }
// }

"use strict";

let inp1 = document.querySelector("#input");
const soni = 15;

function fetchFunction() {
  const query = inp1.value.trim();
  if (query !== "") {
    fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=tdxZAi8EEb4rbo61oBzjxNikSYMLCL_3R_HcHJ4WzsI`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        createHtml(data.results);
        saveToLocalStorage(data.results);
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      })
      .finally(() => {
        console.log("Fetch completed");
      });
  } else {
    alert("Input cannot be empty");
  }
}

function createHtml(results) {
  let div = document.querySelector(".box");
  div.innerHTML = "";

  results.forEach((result) => {
    let container = document.createElement("div");

    let images = document.createElement("img");
    let manba = result.urls.regular;
    images.src = manba;
    images.alt = result.description || "Unsplash Image";
    images.style.display = "block";
    images.style.marginBottom = "10px";

    let link = document.createElement("a");
    link.href = manba;
    link.download = "image";

    container.appendChild(images);
    container.appendChild(link);

    div.appendChild(container);
  });
}

function saveToLocalStorage(results) {
  const urls = results.map((result) => result.urls.regular);
  localStorage.setItem("imageUrls", JSON.stringify(urls));
  console.log("Saved to localStorage:", urls);
}

document.querySelector("button").addEventListener("click", fetchFunction);
