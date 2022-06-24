const backdrop=document.getElementById('backdrop');
const addMovieModal=document.getElementById('add-modal');
const deleteMovieModal=document.getElementById('delete-modal');
const addMovieButton=document.querySelector('header button');
const entryText=document.querySelector('#entry-text');
const movieList=document.getElementById('movie-list');//will change it to query selector to see changes
const cancelAddMovieButton=addMovieModal.querySelector('.btn--passive');
const confirmAddMovieButton=cancelAddMovieButton.nextElementSibling;
const inputs=addMovieModal.querySelectorAll('input');
let   DeleteMovieButton=deleteMovieModal.querySelector('.btn--danger');
const CancelDeleteButton=DeleteMovieButton.previousElementSibling;
const movies=[]

function toggleAddMovieModal()
{addMovieModal.classList.toggle('visible');}

function togglebackdrop()
{ backdrop.classList.toggle('visible'); }

function toggleDeleteMovieModal(){
    deleteMovieModal.classList.toggle('visible');
}

function clearInput(){
for(let el of inputs)
el.value='' }

function updateUI() {
  if(movies.length===0)
  entryText.style.display="block"
  else
  entryText.style.display="none"
}
function toggleDeleteMovieHandler()
{
toggleDeleteMovieModal();
togglebackdrop()
}

function deleteMovieHandler(id){
let index=0;
for(const movie of movies) {
    if(movie.id===id)
    break;
   index++; 
   }
movies.splice(index,1)
movieList.children[index].remove();
toggleDeleteMovieHandler();
   updateUI();
}
function startDeleteMovieHandler(id)
{     backdrop.removeEventListener('click',toggleMovieModal);
    toggleDeleteMovieHandler();
    DeleteMovieButton.replaceWith(DeleteMovieButton.cloneNode(true));
    DeleteMovieButton=deleteMovieModal.querySelector('.btn--danger')
    DeleteMovieButton.addEventListener('click',deleteMovieHandler.bind(null,id));
    CancelDeleteButton.addEventListener('click',toggleDeleteMovieHandler);
    backdrop.addEventListener('click',toggleDeleteMovieHandler);
    
}

function renderNewMovie(title,imageURL,rating,id)
{
const newElement=document.createElement('li');
newElement.classList.add('movie-element');
newElement.addEventListener('click',startDeleteMovieHandler.bind(null,id));
newElement.innerHTML=
`<div class="movie-element__image">
   <img src="${imageURL}" alt="${title}">   
   </div>
   <div class="movie-element__info">
   <h2>${title}</h2>
   <p>${rating}/5 stars</p>
   </div>`;

   movieList.append(newElement);
}

function confirmAddMovieButtonhandler()
{
const title=inputs[0].value;
const imageURL=inputs[1].value;
const rating=inputs[2].value;

if(title.trim()===''||imageURL.trim()===''||rating===''||rating<1 || rating>5)
{alert('please enter correct  values (rating should br from 1 to 5')
return}
 
const newMovie={
    id:Math.random(),
    title:title,
    imageURL:imageURL,
    rating:rating
}
movies.push(newMovie);
togglebackdrop();
toggleAddMovieModal();
renderNewMovie(title,imageURL,rating,newMovie.id);
clearInput();
updateUI();

}

function toggleMovieModal()
{
   toggleAddMovieModal()  //showing movie modal
   backdrop.removeEventListener('click',toggleDeleteMovieHandler);
   togglebackdrop()       //showing backdrop
   clearInput()
   backdrop.addEventListener('click',toggleMovieModal);

}


addMovieButton.addEventListener('click',toggleMovieModal)
confirmAddMovieButton.addEventListener('click',confirmAddMovieButtonhandler)
cancelAddMovieButton.addEventListener('click',toggleMovieModal)