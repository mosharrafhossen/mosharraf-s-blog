
/* ===== Search & Filter ===== */
const searchInput = document.getElementById("search");
const filterBtns = document.querySelectorAll(".filter-btn");
const cards = document.querySelectorAll(".card");

let activeCategory = "all";

searchInput.addEventListener("input", filterPosts);

filterBtns.forEach(btn=>{
  btn.addEventListener("click",()=>{
    filterBtns.forEach(b=>b.classList.remove("active"));
    btn.classList.add("active");
    activeCategory = btn.dataset.category;
    filterPosts();
  });
});

function filterPosts(){
  const text = searchInput.value.toLowerCase();
  cards.forEach(card=>{
    const title = card.querySelector("h2").innerText.toLowerCase();
    const body = card.querySelector("p").innerText.toLowerCase();
    const category = card.dataset.category;

    const matchText = title.includes(text) || body.includes(text);
    const matchCat = activeCategory === "all" || category === activeCategory;

    card.style.display = matchText && matchCat ? "block" : "none";
  });
}

/* ===== Comment System ===== */
const commentForm = document.getElementById("commentForm");
const commentList = document.getElementById("commentList");
const STORAGE_KEY = "homepage_comments";

function loadComments(){
  const comments = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  commentList.innerHTML = "";
  comments.forEach(c=>{
    const div = document.createElement("div");
    div.className = "comment";
    div.innerHTML = `
      <strong>${c.name}</strong>
      <small>${c.date}</small>
      <p>${c.text}</p>
    `;
    commentList.appendChild(div);
  });
}

commentForm.addEventListener("submit", e=>{
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const text = document.getElementById("comment").value.trim();
  if(!name || !text) return;

  const comments = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  comments.unshift({
    name,
    text,
    date: new Date().toLocaleString("bn-BD")
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments));
  commentForm.reset();
  loadComments();
});

loadComments();
