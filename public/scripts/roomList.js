import { showToast } from "./toast.js";

$(document).ready(()=>{
    $('.page').hide(); // 페이지 숨김
    $('.page.active').show(); // 현재 페이지만 표시

    $('.pagination li').click(function(){
        console.log(this)
        $('.pagination li').removeClass('active');
        $(this).addClass('active');
        $('.page').hide();
        var pageNum = $(this).index();
        $('.page').eq(pageNum).show();
    });

    window.modalBtnClickEvent=(modalData)=>{
        modalBtnClickEvent(modalData);
    }

    const roomInfo = JSON.parse(window.serverData.roomInfo);
    if(roomInfo) showToast(roomInfo);
});

const modalBtnClickEvent=(modalData)=>{
    let limit;
    const {desc,Candidates,v} = modalData;

    for(let i=limit+1;i<Candidates.length;i++){
        $(`#c${i}`).remove();
    }

    const candidates = Candidates;

    const sliderWrapper = document.getElementById('slider');
    const modalItemsPerPage = 4; 
    let currentSlide = 0;

    function initSlider() {
        sliderWrapper.innerHTML = candidates.map(candidate => `
            <div class="slider-item">
                <div class="card">
                    <img src="${candidate.img}" class="card-img-top" onerror="handleError(this)" alt="${candidate.name}">
                    <div class="card-body">
                        <p class="rank-circle">${1}</p>
                        <h5 class="card-title">${candidate.name}</h5>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function slideTo(index) {
        currentSlide = index;
        const maxIndex = Math.max(0, candidates.length - modalItemsPerPage);
        currentSlide = Math.max(0, Math.min(currentSlide, maxIndex));
        sliderWrapper.style.transform = `translateX(-${currentSlide * 210}px)`;
    }

    document.getElementById('prevBtn').addEventListener('click', () => {
        slideTo(currentSlide - 1);
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        slideTo(currentSlide + 1);
    });
    initSlider();
    slideTo(0);

    $(`#desc`).text(desc)
    $('#roomModal').modal('show');
} 

  


