openFooterModal = document.querySelector('.footer-section__link');
closeFooterModalBtn = document.querySelector('.footer-modal__btn');
footerModal = document.querySelector('[data-footerModal]');

openFooterModal.addEventListener('click', toggleModal);
closeFooterModalBtn.addEventListener('click', toggleModal);

function toggleModal(e) {
    e.preventDefault();
    footerModal.classList.toggle('is-hidden');
}