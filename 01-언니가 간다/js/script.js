$(function () {
  //대상을 변수로 저장
  const $window = $(window);
  const $document = $(document);
  const $girl = $(".girl");

  //크기를 구해오는 jQuery 메서드 : outerHeight()
  const windowHeight = $window.outerHeight();
  const documentHeight = $document.outerHeight();
  console.log(windowHeight, documentHeight);
  //스크롤 영역의 세로 크기
  const scrollHeight = documentHeight - windowHeight;

  //스크롤이 발생하면
  $window.on("scroll", function () {
    //사용자의 (세로 )스크롤 값을 구해서
    let scrollTop = $(this).scrollTop();

    //비율을 구하자. 공식은  (대상 / 기준)*100
    let percent = (scrollTop / scrollHeight) * 100 + "%";

    //$progressBar 의 width로 적용(%)
    $girl.css("left", percent);
  });

  //마우스 휠 조작했을 때
  $window.on("wheel keydown", function (e) {
    console.log(e);

    if (e.originalEvent.deltaY < 0 || e.keyCode === 38) {
      //휠을 올렸을 때
      $girl.css("transform", "rotateY(180deg)");
    } else if (e.originalEvent.deltaY > 0 || e.keyCode === 40) {
      //휠을 내렸을 때
      $girl.css("transform", "rotateY(0)");
    }
  });
});
