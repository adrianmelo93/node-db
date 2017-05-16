$(document).ready(function(){
    var $name= $('#name');
    var $craft= $('#craft');
    var $data= $('#data');
    var $container= $('#container');

    getdata();
    function getdata(search){
        $.ajax({
            url:"http://api.open-notify.org/astros.json",
            dataType:"json",
            method:'get',
            success: function(response){
                console.log(response);
                $.each(response.people, function(index,people) {
                    var $tr = $('<tr/>');
                     $tr.append($('<td/>').html(people.name+" "+people.craft));
                      $tr.append($('<td/>'));
                       $('.list-order tr:last').before($tr);
                });

            }
        });

    }


})
