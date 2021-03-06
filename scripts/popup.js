$(function(){
	_.mixin(_.str.exports()); // Include Underscore.string methods to Underscore name
	var API_SEARCH = "http://cloud.rollingword.com/api/word/" ;
	$('form').submit(function(e){
		e.preventDefault();
		var word = $('#word').val();
		var source = $("#tpl-word-def").html();
		var template = Handlebars.compile(source);
		if (_.trim(word).length == 0) { //Search empty 
			$('#result').html(template({info: '好像少了点什么'}));
			return;
		}
		$.ajax({
			url: API_SEARCH + encodeURI(word),
			dataType:'json',
			success:function(data){
            replaceJSON(data);
            $('#result').html(template(_.extend(data, {word: word})));
            // $('#result').html(Mustache.render(_.extend(data, {word: word})));

			},
		});

	});

   function replaceJSON(json) 
   { 
      for(var i in json){         
         if(typeof json[i]=="object"){ 
            replaceJSON(json[i]); 
         } else {
            try {
               json[i] = json[i].replace("%27","'"); 
            }
            catch(exception){
               console.log(exception, json[i]);
               //log but do nothing
            
            }
         } 
      } 
      return json
   }
   function decodeJSON(json) 
   { 
      for(var i in json){         
         if(typeof json[i]=="object"){ 
            decodeJSON(json[i]); 
         } else {
            try {
               json[i] = decodeURI(json[i]);
            }
            catch(exception){
               console.log(exception, json[i]);
               //log but do nothing
            
            }
         } 
      } 
      return json
   }
});
