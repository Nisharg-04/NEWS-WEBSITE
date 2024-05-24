const API_KEY = "784dd5a82f854b50b5f5c91a648002bd";
const url = "https://newsapi.org/v2/everything?q=";
window.addEventListener("load", () => fetchNews("india"));

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apikey=${API_KEY}`);
  const data = await res.json();
  console.log(data);
  bindData(data.articles);
}
function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsTemplete = document.getElementById("templete");
  cardsContainer.innerHTML = "";
  articles.forEach((articles) => {
    if (!articles.urlToImage) return;
    const cardClone = newsTemplete.content.cloneNode(true);
    fillDataInCard(cardClone, articles);
    cardsContainer.appendChild(cardClone);
  });
}
function fillDataInCard(cardClone, articles) {
  const newsImg = cardClone.querySelector("#news-img");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImg.src = articles.urlToImage;
  newsTitle.innerHTML = articles.title;
  newsDesc.innerHTML= articles.description;
  const date = new Date(articles.publishedAt).toLocaleString("en-us", {
    timeZone: "Asia/Jakarta",
  });
  newsSource.innerHTML = `${articles.source.name} . ${date}`;
}

let currNav=null;
function onNavClick(id){
fetchNews(id);
const navitem=document.getElementById(id);
currNav?.classList.remove('active');
currNav=navitem;
currNav.classList.add('active');
}


const searchbtn=document.getElementById("search-button");
const searchtxt=document.getElementById("search-text");

searchbtn.addEventListener("click",()=>{
    const query=searchtxt.value;
    if(!query)return;
    fetchNews(query);
    currNav?.classList.remove('active');
    
})