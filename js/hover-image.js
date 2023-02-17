// JavaScript Document

$.fn.hoverImage = function (options) {

  const suffix = '-active'; // 切り替わる画像の添え字
  const selfPage = false; // 自身のページへのリンク画像を常に切り替る（true/false）

  // options
  options = Object.assign({
    suffix: suffix,
    selfPage: selfPage,
  }, options);
  // replace images on hover
  $(this).each(function () {
    if (!$(this).data('hover-image')) {
      // if flag is ON, do not add event again.
      const srcNormal = $(this).attr('src');
      const srcActive = srcNormal.replace(/(.*)\./, '$1' + options.suffix + '.');
      const href = $(this).parent('a').attr('href');
      const path = location.pathname;
      // preload
      $('<img>').attr('src', srcActive);
      // switch image
      if (options.selfPage && (path === href || path.replace('/', '') === href)) {
        // self page
        $(this).attr('src', srcActive);
      } else {
        // hover
        $(this).hover(function () {
          $(this).attr('src', srcActive);
        }, function () {
          $(this).attr('src', srcNormal);
        });
      }
      // flag for adding default '.hover-image' class options
      $(this).data('hover-image', 'true');
    }
  });
  return this;
}

// Initial target class
setTimeout(() => {
  // setTimeout for adding options
  $(function () {
    $('.hover-image').hoverImage();
  });
}, 0);

