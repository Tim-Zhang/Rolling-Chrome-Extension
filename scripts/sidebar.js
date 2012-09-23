$(function(){
   $.get('templates/sidebar.tpl', function(tpl){
      $('body').append(tpl);
   });
})
