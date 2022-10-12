    $(function(){
        $("#startBtn").click(function(){

            console.log($('input').val());
            $.ajax({
                url: '/apply/start',
                async: true,
                type: 'POST',
                dataType: 'json',
                success : function(data){
                    alert('프로젝트가 생성되었습니다.');
                    // data.success , data.regid::프로젝트생성id 값 리턴 받음.
                    location.href="/apply/pstep1?regid="+data.regid;
                },
                error: function(err){
                    alert(err);
                }
            });
        })
    });
