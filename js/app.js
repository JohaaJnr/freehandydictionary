$(document).ready(function(){
    $('#form').on('submit', function(e){
        e.preventDefault();
        $('.loading').show();
        $('.result').empty();
        $('.error').empty();
        let key = $('.input').val();
        
        if(key == ''){
            alert('Input required');
            $('.loading').hide();
            return false;
        }
        $.getJSON(
            'https://api.dictionaryapi.dev/api/v2/entries/en_US/'+key,
            
            function(data){
               $('.loading').hide();
                let words = data[0].word;
                let phonetic = data[0].phonetics[0];
                
                $('.result').html(`
                    <h2> Word : ${words}</h2><hr>
                    <h3> Meaning: </h3>
                    <div class="list"></div><hr>
                    <h3>Audio : </h3>
                    <audio controls><source src="${phonetic.audio}" type="audio/mpeg"></audio><hr>
                    <h3>Synonyms: </h3>
                    <div class="simi"></div><hr>
                    <h3> Examples: </h3>
                    <div class="ex"></div><hr>
                `);
               
               
                for(i=0; i<data.length; i++){
                
                const meaning = data[i].meanings;
               
                   
                for(j=0; j<meaning.length; j++){
                    let def = meaning[j].definitions[0];
                   
                    let syno = def.synonyms;
                    
                    let exampl = def.example;
                   
                   $('.list').append(`
                    <h2><span class="lead">${def.definition}</span></h2>
                   `);
                   $.each(syno, function(k){
                    $('.simi').append(`
                    <h2><span class="lead">${syno[k]}</span></h2>
                        `);
                   });
                  
                    $('.ex').append(`
                    <h2><span class="lead">${exampl}</span></h2>
                        `);
  
                }
            }
         }
        ).fail(function(){
            $('.loading').hide();
            $('.error').html(`
                <h3>Sorry!! Word not found!</h3>
            `);
        });
      
    });
});