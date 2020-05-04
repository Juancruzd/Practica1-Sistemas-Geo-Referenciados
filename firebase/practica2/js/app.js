$(document).ready(function() { 
    $(window).on('scroll', function () {
        let scrollAmount = window.scrollY; 
        if (scrollAmount == 0) { 
            document.getElementById("nav").setAttribute('style','border-bottom:1px solid #F4FCDE'); 
        }
        else{
            document.getElementById("nav").setAttribute('style','border-bottom:1px solid #000');
        }  


        if (scrollAmount >= 415) { 
            document.getElementById("formsearch").setAttribute('style','opacity: 1;animation: fade 1s;display: block;');
        }else{
            document.getElementById("formsearch").setAttribute('style','opacity: 0;display: none;');
        }
      });
 });