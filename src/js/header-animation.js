
const input = document.querySelector('.header__input');
const btn = document.querySelector('.header__formBnt');
const form = document.querySelector('.header__search')
const members = document.querySelector('.team__members')
const back = document.querySelector('.home')
members.classList.add('hidden');
back.classList.remove('our__team');



function AnimationFn(e){
    console.dir(e.target.value);

    if (e.target.value == "json method"){
        console.log('done');
        members.classList.remove('hidden');
        back.classList.add('our__team');
        form.parentNode.classList.add("header__formJS");
        form.parentNode.classList.remove("header__form");
        return;
    }

    else if (e.target.value) {
    btn.classList.add('icon-animation');
    form.classList.add('search__js');
    back.classList.remove('our__team');
    members.classList.add('hidden');
    form.parentNode.classList.remove("header__formJS");
    form.parentNode.classList.add("header__form");
    return;
    }
    else {
        btn.classList.remove('icon-animation');
        form.classList.remove('search__js');
    }

}

input.addEventListener('input', AnimationFn);

