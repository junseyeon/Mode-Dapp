    $(function(){
        $("#startBtn").click(function(){

            console.log($('input').val());
            $.ajax({
                url: '/apply/start',
                async: true,
                type: 'POST',
                data: {
                    id: $('input').val()
                },
                dataType: 'json',
                success : function(data){
                    alert('성공');
                    location.href="/apply/pstep1";
                },
                error: function(err){
                    alert(err);
                }
            });
        })
    });
