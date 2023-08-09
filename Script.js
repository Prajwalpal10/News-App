
const API_key="d9212abaccf547669bfa0dd211fca739";
// by login to https://newsapi.org/ generate api key and use it for your File.

window.addEventListener("load",() => fetchNews("India"));


async function fetchNews(query){

  const res= await fetch(`https://newsapi.org/v2/everything?q=${query}&apikey=${API_key}`);
   const data=await res.json();
   console.log(data)
   binddata(data.articles);

}

function binddata(articles)
{
  const cardContainer= document.getElementById("card-container");
  const newsTemplate = document.getElementById("news-card");

  cardContainer.innerHTML="";

  articles.forEach(elem => {
        if(!elem.urlToImage)   return;

        const cardClone = newsTemplate.content.cloneNode(true);
        filldata(cardClone,elem)
        cardContainer.appendChild(cardClone);    
  });

}

function filldata(cardClone,elem)
{
    const newsImg=cardClone.querySelector('#news-img')
    const newsTitle= cardClone.querySelector('#news-title')
   const newsSource = cardClone.querySelector('#news-source')
    const newsDesc = cardClone.querySelector('#news-desc');


    newsImg.src=elem.urlToImage;
    newsTitle.innerHTML=elem.title;
    const date=new Date(elem.publishedAt).toLocaleString("en-us",{timezone:"Asia/Jakarta"})
    newsSource.innerHTML=`${elem.source.name} - ${date}`;
    newsDesc.innerHTML=elem.description;

    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(elem.url,"_blank");
    })


}

let currentElem=null;

function onNavClick(id)
{
    fetchNews(id)
    const navItem=document.getElementById(id);
    currentElem?.classList.remove('active');
    currentElem=navItem;
    currentElem.classList.add('active');
}

function searchQuery()
{
  const searchText = document.getElementById('search-text');
  const btnSearch = document.getElementById("search-btn")

  const query = searchText.value;
  if(!query) return;

  fetchNews(query)
  currentElem?.classList.remove('active');
  currentElem=null;
}


function reload()
{
  window.location.reload();
}


let menu=document.getElementById("menu-icon");
let nav=document.getElementsByClassName("nav-bar")
