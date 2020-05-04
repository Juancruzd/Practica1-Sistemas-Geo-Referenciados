$(document).ready(function() { 
    $(window).on('scroll', function () {
        let scrollAmount = window.scrollY; 
        if (scrollAmount == 0) { 
            document.getElementById("nav").setAttribute('style','border-bottom:1px solid #F4FCDE'); 
        }
        else{
            document.getElementById("nav").setAttribute('style','border-bottom:1px solid #000');
            console.log(scrollAmount); 
        }  


        if (scrollAmount >= 415) { 
            document.getElementById("formsearch").setAttribute('style','display: block');
        }else{
            document.getElementById("formsearch").setAttribute('style','display: none');
        }
      });
 });