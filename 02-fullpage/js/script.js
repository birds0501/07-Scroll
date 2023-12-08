$(function () {
  //대상에 변수를 저장
  const $window = $(window);
  const $sideDot = $(".indicator > li");
  const $section = $("main > section");
  console.log($window, $sideDot, $section);

  const $btnTop = $(".btn-top");
  $btnTop.on("click", function (e) {
    //top버튼을 클릭했을 떄
    e.preventDefault();
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      400
    );
  });

  //기본동작 테스트
  //요소의 y위치값(스크롤) 구하기 : offset().top
  let test = $section.eq(2).offset().top;
  $("html, body").animate(
    {
      scrollTop: test,
    },
    400
  );
});
