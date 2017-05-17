$(document).ready(function(){
    getdata();
    function getdata(search){

        $.ajax({
            url:"/stocks",
            dataType:"json",
            method:'get',
            success: function(response){
            $('#data-table').html("");
            response.forEach(function(value){
                $('#data-table').append(`<tr class="gf"><td class="gf">${value.name}</td>+<td class="gf">${value.price}</td>+<td class="gf">${value.symbol}</td>+<td class="gf"><button class='button_del' id='button_del'idendb='${value._id}'>DELETE</button></td></tr>`)

            })
            }
        });

    };

    $('#data-table').on('click', '.button_del', function (e){
        e.preventDefault();
       var del = $(this).attr('idendb');

      $.ajax({
          url:'/stocks/'+del,
          method:'DELETE',
          success: function(res){
              $("gf").remove(".button_del");


          },
          data:{
              id: del
          }
      })
  })

});
