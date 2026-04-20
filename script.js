const body = document.body;
const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".links");
const themeBtn = document.querySelector(".theme-btn");
const topBtn = document.querySelector(".top-btn");
const items = document.querySelectorAll(".show");
const nums = document.querySelectorAll(".num");
const bars = document.querySelectorAll(".bar div");
const filterBtns = document.querySelectorAll(".f-btn");
const projects = document.querySelectorAll(".project");
const form = document.querySelector(".form");
const role = document.getElementById("role");
const year = document.getElementById("year");

const roles = ["Data Science Student", "Web Designer", "Software Developer"];
let roleIndex = 0;

if (localStorage.getItem("mode") === "light") {
  body.classList.add("light");
  if (themeBtn) {
    themeBtn.textContent = "Light";
  }
}

function showItems() {
  items.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    if (top < window.innerHeight - 70) {
      item.classList.add("done");
    }
  });
}

function countNums() {
  nums.forEach((num) => {
    if (num.dataset.start === "yes") {
      return;
    }

    if (num.getBoundingClientRect().top < window.innerHeight - 40) {
      num.dataset.start = "yes";
      let now = 0;
      const end = Number(num.dataset.num);

      const timer = setInterval(() => {
        now++;
        num.textContent = now;
        if (now >= end) {
          clearInterval(timer);
        }
      }, 60);
    }
  });
}

function fillBars() {
  bars.forEach((bar) => {
    if (bar.getBoundingClientRect().top < window.innerHeight - 40) {
      bar.style.width = bar.dataset.width;
    }
  });
}

function topButton() {
  if (!topBtn) {
    return;
  }

  if (window.scrollY > 400) {
    topBtn.classList.add("show-top");
  } else {
    topBtn.classList.remove("show-top");
  }
}

function runAll() {
  showItems();
  countNums();
  fillBars();
  topButton();
}

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    links.classList.toggle("open");
  });
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    body.classList.toggle("light");

    if (body.classList.contains("light")) {
      localStorage.setItem("mode", "light");
      themeBtn.textContent = "Light";
    } else {
      localStorage.setItem("mode", "dark");
      themeBtn.textContent = "Dark";
    }
  });
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((item) => item.classList.remove("on"));
    btn.classList.add("on");

    const type = btn.dataset.type;
    projects.forEach((project) => {
      if (type === "all" || project.dataset.type === type) {
        project.style.display = "grid";
      } else {
        project.style.display = "none";
      }
    });
  });
});

if (topBtn) {
  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let ok = true;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const message = form.message.value.trim();

    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const passwordError = document.getElementById("passwordError");
    const messageError = document.getElementById("messageError");

    nameError.textContent = "";
    emailError.textContent = "";
    passwordError.textContent = "";
    messageError.textContent = "";

    if (name === "" || name.length < 3) {
      nameError.textContent = "Please enter at least 3 characters.";
      ok = false;
    }

    if (email === "" || !email.includes("@") || !email.includes(".")) {
      emailError.textContent = "Please enter a valid email address.";
      ok = false;
    }

    if (password === "" || password.length < 6) {
      passwordError.textContent = "Password must be at least 6 characters.";
      ok = false;
    }

    if (message === "") {
      messageError.textContent = "Message is required.";
      ok = false;
    }

    if (ok) {
      alert("Thanks " + name + "! Your message was sent.");
      form.reset();
    }
  });
}

if (role) {
  setInterval(() => {
    roleIndex++;
    if (roleIndex >= roles.length) {
      roleIndex = 0;
    }
    role.textContent = roles[roleIndex];
  }, 2200);
}

if (year) {
  year.textContent = new Date().getFullYear();
}

window.addEventListener("scroll", runAll);
window.addEventListener("load", runAll);
