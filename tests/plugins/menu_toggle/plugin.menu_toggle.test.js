const $ = require('../../../BookReader/jquery-1.10.1.js');
require('../../../BookReader/jquery-ui-1.12.0.min.js');
require('../../../BookReader/jquery.browser.min.js');
require('../../../BookReader/dragscrollable-br.js');
require('../../../BookReader/jquery.colorbox-min.js');
require('../../../BookReader/jquery.bt.min.js');

require('../../../BookReader/BookReader.js');
require('../../../src/js/plugins/menu_toggle/plugin.menu_toggle.js');


let br;
let hideFlag;
beforeAll(() => {
  $.fx.off = true;
  const OGSpeed = $.speed;
  $.speed = function(_speed, easing, callback) {
    console.log('speed');
    return OGSpeed(0, easing, callback);
  };
  document.body.innerHTML = '<div id="BookReader">';

  // sets user agent to show it is a mobile device
  const iOSMobileUserAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_1 like Mac OS X) AppleWebKit/603.1.30 (KHTML, like Gecko) Version/10.0 Mobile/14E304 Safari/602.1';
  Object.defineProperty(window.navigator, 'userAgent', { value: iOSMobileUserAgent, configurable: true });

  br = new BookReader();
  br.init();
});

afterEach(() => {
  $.fx.off = false;
  jest.clearAllMocks();
});

describe('Plugin: Menu Toggle', () => {
  test('has option flag', () => {
    expect(BookReader.defaultOptions.enableMenuToggle).toEqual(true);
  });

  test('core code has animation consts', () => {
    expect(BookReader.constNavAnimationDuration).toEqual(300);
    expect(BookReader.constResizeAnimationDuration).toEqual(100);
  })

  test('core code has registered event: `navToggled`', () => {
    expect(BookReader.eventNames.navToggled).toBeTruthy();
  })

  test('when bookreader loads, the menu shows', () => {
    expect($('.BRfooter').hasClass('js-menu-hide')).toEqual(false);
    expect($('.BRtoolbar').hasClass('js-menu-hide')).toEqual(false);
  })

  test('clicking on background hides the menu', () => {
    expect($('.BRfooter').hasClass('js-menu-hide')).toEqual(false);
    expect($('.BRtoolbar').hasClass('js-menu-hide')).toEqual(false);
    $('.BRcontainer').click();
    expect($('.BRfooter').hasClass('js-menu-hide')).toEqual(true);
    expect($('.BRtoolbar').hasClass('js-menu-hide')).toEqual(true);
  });

  test('core function `setNavigationView` is called `hideNavigation` is called', () => {
    br.setNavigationView = jest.fn((arg) => hideFlag = arg);

    br.hideNavigation();
    expect(br.setNavigationView).toHaveBeenCalled();
    expect(hideFlag).toEqual(true);
  });

  test('core function `setNavigationView` is called `showNavigation` is called', () => {
    br.setNavigationView = jest.fn((arg) => hideFlag = arg);
    br.navigationIsVisible = jest.fn(() => false);

    br.showNavigation();
    expect(br.setNavigationView).toHaveBeenCalled();
    expect(br.navigationIsVisible).toHaveBeenCalled();
    expect(hideFlag).toEqual(undefined);
  });
});
