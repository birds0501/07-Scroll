$(function () {
  //대상에 변수를 저장
  const $window = $(window);
  const $sideDot = $(".indicator > li");
  const $section = $("main > section");
  // console.log($window, $sideDot, $section);

  let sec1Pos;
  let sec2Pos;
  let sec3Pos;
  let sec4Pos;

  function getPosition() {
    //섹션별로 y축 위치값 구하기
    sec1Pos = $section.eq(0).offset().top;
    sec2Pos = $section.eq(1).offset().top;
    sec3Pos = $section.eq(2).offset().top;
    sec4Pos = $section.eq(3).offset().top;

    console.log(sec1Pos, sec2Pos, sec3Pos, sec4Pos);
  }

  let secIdx = 0;
  updateDot();
  getPosition();

  //스크롤 값 비교하기
  $window.on("scroll", function () {
    let scrollTop = $(this).scrollTop();

    if (scrollTop >= sec1Pos && scrollTop < sec2Pos) {
      secIdx = 0;
    } else if (scrollTop >= sec2Pos && scrollTop < sec3Pos) {
      secIdx = 1;
    } else if (scrollTop >= sec3Pos && scrollTop < sec4Pos) {
      secIdx = 2;
    } else if (scrollTop >= sec4Pos) {
      secIdx = 3;
    }

    //$sideDot에 적용하기
    updateDot();
  });

  function updateDot() {
    $sideDot.removeClass("on").eq(secIdx).addClass("on");
  }
  // 인디케이커를 클릭하면 이동(e.preventDefault(); 입력해서 a의 동작 먼저 없애고 가자)
  $sideDot.on("click", function (e) {
    e.preventDefault();
    secIdx = $(this).index();
    moveSection(secIdx);
    stop();
  });

  function moveSection(index) {
    $("html, body").animate(
      {
        scrollTop: $section.eq(index).offset().top,
      },
      400
    );
  }

  const $btnTop = $(".btn-top");
  $btnTop.on("click", function (e) {
    //top버튼을 클릭했을 떄
    e.preventDefault();
    moveSection(0);
  });

  //화면이 리사이징 될 때
  $window.on("resize", function () {
    //y위치값을 다시 계산
    getPosition();
    moveSection(secIdx);
  });

  $window.on("wheel", function (e) {
    // 움직이는 중이라면 실행 종료
    if ($("html").is(":animated")) {
      return;
    }
    if (e.originalEvent.deltaY < 0) {
      //휠을 올린 상황
      //위로 이동하겠다는 의사표시
      //위로 이동하겠다는 건 secIdx값을 줄이는 것, 단 0이하로 줄이면 안 됨
      if (secIdx === 0) {
        return;
      } else {
        secIdx--;
      }
    } else {
      //휠을 내린 상황
      if (secIdx === 3) {
        return;
      } else {
        secIdx++;
      }
    }
    console.log(secIdx);
    moveSection(secIdx);
  });
  //기본동작 테스트
  //요소의 y위치값(스크롤) 구하기 : offset().top
  // let test = $section.eq(2).offset().top;
  // $("html, body").animate(
  //   {
  //     scrollTop: test,
  //   },
  //   400
  // );
});
