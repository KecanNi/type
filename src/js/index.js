require.config({
    paths:{
        'jquery':'./libs/jquery.min',
      
    }
})
define(['jquery'],function($){

        var add=document.getElementById('add');
        var dialog=document.querySelector('.dialog');
        var btnDiv=document.querySelector('.btnDiv');
        var button=btnDiv.querySelectorAll('button');
        var input=document.querySelector('input');
       add.onclick=function(){
        $(".dialog").show()
        $(".alert").show();
        }
        button[0].onclick=function(){
            // dlialog.style.display='none';
            $(".dialog").hide()
            $(".alert").hide();
            input.value='';
        }
        button[1].onclick=function(){
            $.ajax({
                url:'/api/list',
                type:'post',
                data:{
                    name:input.value,
                },
                dataType:'json',
                success:function(data){

                    if(data.code===1){
                        var myDate = new Date();
                        var mytime=myDate.toLocaleTimeString(); 
                        var html=` <li>
                                <p>分类名称: <span>${data.data.name}</span> </p>
                                <p>添加时间：<span>${mytime}</span> </p>
                            </li>`;
                            $('.main').append(html);
                           
                    }
                    $(".dialog").hide()
                    $(".alert").hide();
                    $('.input').val('');
                }
            })
        }
})