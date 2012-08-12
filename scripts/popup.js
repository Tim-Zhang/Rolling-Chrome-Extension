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
				if(data.status == "OK") {
               decodeJSON(data);
					$('#result').html(template(_.extend(data, {word: word})));
					// $('#result').html(Mustache.render(_.extend(data, {word: word})));


				} else {
					$('#result').html(template(_.extend(data, {info: '翻滚吧，牛宝宝！'})));

				}

			},
		});

	});

   function decodeJSON(json) 
   { 
      for(var i in json){         
         if(typeof json[i]=="object"){ 
            decodeJSON(json[i]); 
         } else {
            json[i] = decodeURI(json[i]);
         } 
      } 
      return json
   }
});
