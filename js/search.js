
/* toggle div open and close */
    $('h4').click(function(){
    $(this).next('div').slideToggle('slow');
});
    $('h3').click(function(){
    $(this).next().slideToggle('slow');
});

/* search and highlight functions */
$(function(){
    $("#filter").keyup(function(){

        // Retrieve the input field text and reset the count to zero
        var filter = $(this).val();
        var count  = 0;
        var output = '<div class = "searchresults">';
        var regEx  = new RegExp(filter, "i");
        var keywords = filter;
        
        
        
        // Loop through each h4 tag with class faqSubHeader
        // check each one against the search query
        // if there's a match in the h4 or the div below it
        // the html will be added to the output object
        // if the search query is empty, results is empty
        $('.faqSubHeader').each(function(){
            if ( ( $(this).text().search(regEx) != -1
                || $(this).next('div').text().search(regEx) != -1 )
                && filter != ""
            ) {
                var duplicates = new RegExp($(this).text(), "im"); // search for text, global, multiline
                // if not already found add the h4 to results (output)
                if (!duplicates.test(output)) {
                    output += '<h4 class = "searchresultheader">' + $(this).html() + '</h4> <div class = "searchresultdiv">';
                    // add the next div to output
                    // this data is displayed when the user clicks // on the h4 element
                    output +=  $(this).next('.faqdetails').html() + '</div>';
                    // increase count
                    count++;
                }
            }
        });

        //create the search result div
        output += '</div>';
        $('.searchresults').html(output);

        // add highlighting to matched FAQ
        if (count > 0 && filter.length > 2) {
            
            // the source string is only in class "searchResults"
            var src_str = $(".searchresults").html();
            // term is equal to the filter/search text used
            var term = filter;
            
            // quick fix to avoid messing up div and class matches
            var except = new RegExp("div|ass|cla|clas|class|las|lass|hdiv", "g");
            var exceptTwo = new RegExp("(div[A-z]|[A-z]div)|(class[A-z]|[A-z]class)", "g");
            
            // if the search includes div or class do not update with highlighting
            // if the search includes (char)div(char) or (char)class(char) update highlighting
            // ie... division is allowable, div is not
            if (!except.test(filter) || exceptTwo.test(filter) ) {
                // replace white space with reg ex
                term = term.replace(/(\s+)/,"(<[^div][^class][^>]+>)*$1(<[^>]+>)*");
                var pattern = new RegExp("("+term+")", "gi");
            
                src_str = src_str.replace(pattern, "<mark>$1</mark>");
                src_str = src_str.replace(/(<mark>[^<>]*)((<[^>]+>)+)([^<>]*<\/mark>)/,"$1</mark>$2<mark>$4");

                $(".searchresults").html(src_str);
            }
        }
        
        
        // Update the count
        $("#filter-count").text(
                    (filter != "" ? (count + (count != 1 ? ' results ' : ' result ') + 'found') : ""));
                    
        $('.searchresultheader').click(function(){
            $(this).next('.searchresultdiv').slideToggle('slow');
        });
        
    });

        
});

/* toggle divs in search results */
$('.clearFormField').click(function() {
    $('.searchresults').html('<p></p>');
    $("#filter-count").text('');
    $("#filter").focus();
});