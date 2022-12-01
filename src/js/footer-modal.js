openFooterModal = document.querySelector('.footer-section__link');
closeFooterModalBtn = document.querySelector('.footer-modal__btn');
footerModal = document.querySelector('[data-footerModal]');

openFooterModal.addEventListener('click', onOpenFooterModalClick);
closeFooterModalBtn.addEventListener('click', onCloseFooterModalClick);


function onOpenFooterModalClick(e) {
    e.preventDefault();
    footerModal.classList.remove('is-hidden');
    document.body.classList.add('overflow');
}

function onCloseFooterModalClick(e) {
    e.preventDefault();
    footerModal.classList.add('is-hidden');
    document.body.classList.remove('overflow');
}