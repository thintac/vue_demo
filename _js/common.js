jQuery( function ( $ ) {
  // vhをウィンドウサイズ内側に合わせる
  // 最初に、ビューポートの高さを取得し、0.01を掛けて1%の値を算出して、vh単位の値を取得
  let vh = window.innerHeight * 0.01;
  // カスタム変数--vhの値をドキュメントのルートに設定
  document.documentElement.style.setProperty( '--vh', vh + 'px' );

  $( function () {
    var timer = false;
    $( window ).on( 'load resize', function () {
      if ( timer !== false ) {
        clearTimeout( timer );
      }
      timer = setTimeout( function () {
        var headerBrandingAreaWidth = $( ".p-header__branding-area" ).innerWidth();
        var spHeaderBrandingAreaWidth = $( ".p-sp-header__branding-area" ).innerWidth();

        if ( window.matchMedia( '(min-width: 992px)' ).matches ) {
          $( ".p-hero__bg" ).width( headerBrandingAreaWidth + 40 );
        } else if ( window.matchMedia( '(max-width: 750px)' ).matches ) {
          $( ".p-hero__bg" ).width( spHeaderBrandingAreaWidth );
        } else {
          $( ".p-hero__bg" ).width( headerBrandingAreaWidth + 30 );
        }
      }, 50 );
    } )
  } );

  // ローディングアニメーション
  window.addEventListener( 'load', function () {
    $( '.c-loading' ).addClass( 'is-loaded' );
  } );

  setTimeout( function () {
    $( '.c-loading' ).addClass( 'is-loaded' );
  }, 5000 );

  var scrollPos;
  $( '.c-hamburger-btn, .p-full-screen-menu a' ).on( 'click', function () {
    if ( $( 'body' ).hasClass( 'is-fixed' ) ) {
      $( 'body' ).removeClass( 'is-fixed' ).css( 'top', 0 + 'px' );
      window.scrollTo( 0, scrollPos ); //初期化
      $( '.c-hamburger-btn' ).removeClass( 'is-opened' );
      $( '.p-full-screen-menu' ).fadeOut( 300 );
    } else {
      scrollPos = $( window ).scrollTop(); //現在のスクロール位置
      $( '.c-hamburger-btn' ).addClass( 'is-opened' );
      $( '.p-full-screen-menu' ).fadeIn( 300 );
      setTimeout( function () {
        $( 'body' ).addClass( 'is-fixed' ).css( 'top', -scrollPos + 'px' );
      }, 300 );
    }
  } );

  // スクロール用のクラスを付与
  $( window ).scroll( function () {
    if ( $( this ).scrollTop() > 0 ) {
      $( '.p-header' ).addClass( 'is-scrolled' );
      $( '.c-hamburger-btn--sticky' ).not( '.c-hamburger-btn--top' ).addClass( 'is-scrolled' );
      $( '.p-full-screen-menu' ).addClass( 'is-scrolled' );
    } else {
      $( '.p-header' ).removeClass( 'is-scrolled' );
      $( '.c-hamburger-btn--sticky' ).not( '.c-hamburger-btn--top' ).removeClass( 'is-scrolled' );
      $( '.p-full-screen-menu' ).removeClass( 'is-scrolled' );
    };
  } );

  $( window ).scroll( function () {
    var hamburgerTop = $( '.c-hamburger-btn--sticky' ).not( '.c-hamburger-btn--top' ).offset().top;
    if ( $( this ).scrollTop() > hamburgerTop / 2 ) {
      $( '.c-hamburger-btn--sticky' ).not( '.c-hamburger-btn--top' ).addClass( 'is-scrolled' );
    } else {
      $( '.c-hamburger-btn--sticky' ).not( '.c-hamburger-btn--top' ).removeClass( 'is-scrolled' );
    };
  } );

  $( ".p-large-accordion-list" ).not( ".p-large-accordion-list--no-accordion" ).find( ".p-large-accordion-list__data" ).hide();
  $( ".p-large-accordion-list__term" ).click( function () {
    if ( $( this ).hasClass( 'is-opened' ) ) {
      $( this ).removeClass( 'is-opened' );
      $( this ).next( '.p-large-accordion-list__data' ).slideUp();
    } else {
      $( this ).addClass( 'is-opened' );
      $( this ).next( '.p-large-accordion-list__data' ).slideDown();
    };
  } );

  $( ".p-accordion-list__data" ).hide();
  $( ".p-accordion-list__term" ).click( function () {
    if ( $( this ).hasClass( 'is-opened' ) ) {
      $( this ).removeClass( 'is-opened' );
      $( this ).next( '.p-accordion-list__data' ).slideUp();
    } else {
      $( this ).addClass( 'is-opened' );
      $( this ).next( '.p-accordion-list__data' ).slideDown();
    };
  } );

  $( ".p-school-card__body" ).hide();
  $( ".p-school-card__head" ).click( function () {
    if ( $( this ).hasClass( 'is-opened' ) ) {
      $( this ).removeClass( 'is-opened' );
      $( this ).next( '.p-school-card__body' ).slideUp();
    } else {
      $( this ).addClass( 'is-opened' );
      $( this ).next( '.p-school-card__body' ).slideDown();
    };
  } );

  $( ".p-plan-acordion-list__body" ).hide();
  $( ".p-plan-acordion-list__head" ).click( function () {
    if ( $( this ).hasClass( 'is-opened' ) ) {
      $( this ).removeClass( 'is-opened' );
      $( this ).next( '.p-plan-acordion-list__body' ).slideUp();
    } else {
      $( this ).addClass( 'is-opened' );
      $( this ).next( '.p-plan-acordion-list__body' ).slideDown();
    };
  } );

  var headerHeight = $( '.p-header' ).outerHeight();
  var urlHash = location.hash;
  if ( urlHash ) {
    $( 'body,html' ).stop().scrollTop( 0 );
    setTimeout( function () {
      var target = $( urlHash );
      var position = target.offset().top - headerHeight;
      $( 'body,html' ).stop().animate( {
        scrollTop: position
      }, 500 );
    }, 100 );
  }
  $( 'a[href^="#"]' ).click( function () {
    var href = $( this ).attr( "href" );
    var target = $( href );
    var position = target.offset().top - headerHeight;
    $( 'body,html' ).stop().animate( {
      scrollTop: position
    }, 500 );
  } );

  $( ".p-category-nav" ).not( ".p-category-nav--no-accordion" ).children( ".p-category-nav__head" ).click( function () {
    if ( $( this ).hasClass( 'is-opened' ) ) {
      $( this ).removeClass( 'is-opened' );
      $( this ).next( '.p-category-nav__body' ).slideUp();
    } else {
      $( this ).addClass( 'is-opened' );
      $( this ).next( '.p-category-nav__body' ).slideDown();
    };
  } );

  $( 'a[data-rel^=lightcase]' ).lightcase( {
    showSequenceInfo: false,
    showTitle: false,
    loop: true,
    slideshowAutoStart: false,
    maxWidth: 1000,
    maxHeight: 1220
  } );
} );
