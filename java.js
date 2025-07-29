//استخدمت if & else 
  //اكواد ل الالوان وتغير ال cops 
//function Section(gotocatogary)

function changeImage(clickedImg) {

  let mainImage = document.getElementById("mainImage");
  let maintag = document.getElementById("maintag");
  let circle = document.querySelector(".color");
  let pon = document.querySelector(".pon");
  let coc = document.querySelector(".coc");
  let cookies = document.querySelector(".cookies");

  mainImage.src = clickedImg.src;// اول ما يدوس علي ال small img ينقلها مكان ال main img

mainImage.className = "active-main";


if (clickedImg.classList.contains("matsh")) {
  mainImage.classList.add("matsh2");
} else if (clickedImg.classList.contains("coffe")) {
  mainImage.classList.add("coffe2");
} else if (clickedImg.classList.contains("chocolat2")) {
  mainImage.classList.add("chocolat");
}


  if (clickedImg.classList.contains("coffe")) {
    pon.style.display = "block";
    coc.style.display = "none";
    cookies.style.display = "none";
  } else if (clickedImg.classList.contains("matsh")) {
    coc.style.display = "block";
    pon.style.display = "none";
    cookies.style.display = "none";

  } else {
    
    pon.style.display = "none";
    coc.style.display = "none";
    cookies.style.display = "block";
  }

  if (clickedImg.classList.contains("matsh")) {
    circle.style.backgroundColor = "#3b7a57";
  } else if (clickedImg.classList.contains("coffe")) {
    circle.style.backgroundColor = "#a67c52";
  } else {
    circle.style.backgroundColor = "rgb(99, 79, 61)";
  }

  
}
function goToCategory(categoryName) {
    localStorage.setItem("selectedCategory", categoryName);
    window.location.href = "All Products.html";
  }