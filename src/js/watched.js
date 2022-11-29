import ApiService from './js/apiService';


const WATCHED_FILM_KEY = 'watched-films';
let filmInfo = {774752};



  localStorage.setItem(FORM_KEY, JSON.stringify(filmInfo));
  // <a href="./library.html">ССЫЛКА</a>


// function onFormSubmit(event) {
//   event.preventDefault();
//   event.currentTarget.reset();
//   localStorage.removeItem(FORM_KEY);
//   formInfo = {};
//   console.log(formInfo);
// }

// function savedComment() {
//   const commentText = localStorage.getItem(FORM_KEY);
//   if (commentText) {
//     const saveObj = JSON.parse(commentText);

//     for (let key of form) {
//       if (saveObj.hasOwnProperty(key.name)) {
//         formInfo[key.name] = key.value = saveObj[key.name];
//       }
//     }
//   }
// }
// savedComment();