// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************
const date = document.getElementById('date');
date.innerHTML = new Date().getFullYear();

// ********** close links ************
const navToggle = document.querySelector('.nav-toggle');
const linksContainer = document.querySelector('.links-container');
const links = document.querySelector('.links');

navToggle.addEventListener('click', () =>{
    // linksContainer.classList.toggle('show-links')

    //add extra links
    const containerHeight = linksContainer.getBoundingClientRect().height;
    const linksHeight = links.getBoundingClientRect().height;
    if(containerHeight === 0){
        linksContainer.style.height = `${linksHeight}px`
    }else{
        linksContainer.style.height = 0;
    }
});

const navbar = document.getElementById('nav');
const topLink = document.querySelector('.top-link');
// ********** fixed navbar ************
window.addEventListener('scroll', () =>{
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;
    if(scrollHeight > navHeight){
        navbar.classList.add('fixed-nav');
    }else{
        navbar.classList.remove('fixed-nav');
    }
    if(scrollHeight > 500){
        topLink.classList.add('show-link')
    }else{
        topLink.classList.remove('show-link')
    }
})

// ********** smooth scroll ************
// select links
const scrollLinks = document.querySelectorAll('.scroll-link');

scrollLinks.forEach((link) =>{
    link.addEventListener('click', (e) =>{
        //prevent Default
        e.preventDefault();
        
        //navigate to specific spot
        const id = e.currentTarget.getAttribute('href').slice(1);
        const element = document.getElementById(id);

        //calculate the height
        const navHeight = navbar.getBoundingClientRect().height;
        const containerHeight = links.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains('fixed-nav');
        let position = element.offsetTop - navHeight;
        if(!fixedNav){
            position = position - navHeight;
        }
        if(navHeight > 82){
            position = position + containerHeight;
        }
        window.scrollTo({
            left:0,
            top:position,
        });
        linksContainer.style.height = 0;
    });
});


// thumbnail-
const controls = document.querySelector('.controls')
const container=document.querySelector('.thumbnail-container');
const allBox=container.children;
const containerWidth=container.offsetWidth;
const margin=30;
var items=0;
var totalItems=0;
var jumpSlideWidth=0;

//item setup per slide

responsive=[
    {breakPoint:{width:0,item:1}}, //if you greater than 0 (1 will them show)
    {breakPoint:{width:600,item:2}}, //if you greater than 600 (1 will them show)
    {breakPoint:{width:1000,item:4}} //if you greater than 1000 (1 will them show)
   
]

function load(){
    for(let i=0; i<responsive.length;i++){
        if(window.innerWidth>responsive[i].breakPoint.width){
            items=responsive[i].breakPoint.item;
        }
    }
    start();
}

function start(){
    var totalItemsWidth=0
    for(let i=0;i<allBox.length;i++){
        // width and margin setup of items
        allBox[i].style.width=(containerWidth/items)-margin + "px";
        allBox[i].style.margin=(margin/2)+ "px";
        totalItemsWidth+=containerWidth/items;
        totalItems++;
    }

    //thumbnail.container width set up
    container.style.width= totalItemsWidth + "px";

    //slides controls number set up
    const allSlides=Math.ceil(totalItems/items);
    const ul = document.createElement('ul');
    for(let i=1;i<=allSlides;i++){
        const li=document.createElement('li');
        li.id = i;
        li.innerHTML = i;
        li.setAttribute('onclick', 'controlSlides(this)');
        ul.appendChild(li);
        if(i==1){
            li.className='active';
        }

    }
    controls.appendChild(ul);
}
//when click on number slide to next slide
function controlSlides(ele){
    //select control ul element
    const ul=controls.children;
    //select ul children 'li' elements
    const li=ul[0].children
    var active;
    for(let i=0;i<li.length;i++){
        if(li[i].className=='active'){
    //find who is now active
            active=i;
            //remove active class from all 'li' elements
            li[i].className='';
        }
    }
    //add active class to current slide
    ele.className='active';

    var numb=(ele.id-1)-active;
    jumpSlideWidth=jumpSlideWidth+(containerWidth*numb);
    container.style.marginLeft=-jumpSlideWidth + "px"

}
window.onload = load();
