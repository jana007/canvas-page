/* set count down timer */

$(".timer")
  .countdown("2018/01/01", function(event) {
    $(this).text(
      event.strftime('%D | %H | %M | %S')
    );
});