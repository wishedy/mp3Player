/**
 * Created by Administrator on 2016/7/20.
 */
$(document).ready(function(){
    var arrMusic = [];
    $("#outmusic").click(function(){
     console.log(($("#musicname").val()).split("\n"));
     var arr = ($("#musicname").val()).split("\n");
     for(var i = 0;i<arr.length;i++){
     arrMusic[i] =decodeURI("audio/"+arr[i]);
     }
     console.log(arrMusic);

        init(0);
     });
    var pic = ['images/pic1.jpeg','images/pic2.jpg','images/pic3.jpeg','images/pic4.jpg','images/pic5.jpg','images/pic6.jpg','images/pic7.jpg','images/pic8.jpg','images/pic9.jpg','images/pic10.jpg','images/pic11.jpeg','images/pic12.jpg','images/pic13.jpg','images/pic14.jpg','images/pic15.jpeg'];
    function init(m){
        console.log(arrMusic);
        console.log($("#musicbox").attr("src"));
        $("#musicbox").attr({"src":decodeURI(arrMusic[m])});
        $(".pic img").attr({"src":pic[m]});
        var progressStep =  Math.ceil(musicbox.duration/100);
        var volumStep = 1/100;
        $(".volum").attr({"max":1,"step":volumStep});
        $(".progress").attr({"max":musicbox.duration,"step":progressStep});
        musicbox.volume =0.5;
        var musicname = decodeURI(musicbox.src.substring(musicbox.src.lastIndexOf('/')+1));
        $(".title").html(musicname);
        var a = musicbox.volume*100;
        $(".high").html(a);

    }

    function time(num){
        var a = parseInt(num/60);
        var b = parseInt(num%60);
        return a+"."+b;
    }
    function PlayOrPause(){
        if($(".pause").attr("play")){
            $(".pause").removeAttr("play").removeClass('zanting').addClass('zanting-copy');
            musicbox.play();
            console.log(musicbox)
            $(musicbox).on("timeupdate",function(){
                $(".progress").prop("value",this.currentTime);
                $(".time").html(time(this.currentTime)+"/"+time(this.duration));
                changeMusic();
            });
        }else{
            $(".pause").attr({"play":"on"}).removeClass('zanting-copy').addClass('zanting');
            musicbox.pause();
        }
    }
    PlayOrPause();
    $(".pause").click(function(){
        PlayOrPause();
    });
    $(".off").on("click",function(){
        PlayOrPause();
        musicbox.currentTime = 0;
    })
    function changeMusic(){
        var m = 0;
        $(".pre").on("click",function(){
            if(m<1){
                m=0;
            }else{
                m--;
            }
            init(m);
            $(".pause").removeAttr("play").removeClass('zanting').addClass('zanting-copy');
            musicbox.play();
        })
        function nextmusic(){
            if(m>arrMusic.length-1){
                m=arrMusic.length-1;
            }else{
                m++;
            }
            init(m);
            $(".pause").removeAttr("play").removeClass('zanting').addClass('zanting-copy');
            musicbox.play();
        }
        $(".next").on("click",function(){
            nextmusic();
        })
        if(musicbox.ended){
            nextmusic();
        }
    }
    changeMusic();
    $(".progress").on("change",function(){
        var progressStep =  Math.ceil(musicbox.duration/100);
        var volumStep = 1/100;
        $(".volum").attr({"max":1,"step":volumStep});
        $(".progress").attr({"max":musicbox.duration,"step":progressStep});
        var val=$(this).val();
        musicbox.currentTime=val;
    })
    $(".volum").on("change",function(){
        var progressStep =  Math.ceil(musicbox.duration/100);
        var volumStep = 1/100;
        $(".volum").attr({"max":1,"step":volumStep});
        $(".progress").attr({"max":musicbox.duration,"step":progressStep});
        var val=$(this).val();
        musicbox.volume=val;
        var a = parseInt(musicbox.volume*100);
        if(a==0){
            $(".voicenum").html('静音');
        }else{
            $(".voicenum").html('音量');
        }
        $(".high").html(a);
    })

    $(".hidde").click(function(){
        if(!($(".hidde").attr("hidde"))){
            $(".hidde").attr("hidde","hidde");
            $("#musiclist").hide(2000,function(){
                $("#music").animate({
                    "borderBottomLeftRadius": 48+"px",
                    "borderTopLeftRadius": 48+"px"
                },600)
            });
            $(this).html("显示");

        }else{
            $(".hidde").removeAttr("hidde");
            $("#musiclist").show(2000,function(){
                $("#music").animate({
                    "borderBottomLeftRadius":0 ,
                    "borderTopLeftRadius":0
                },600);
            });

            $(this).html("隐藏");
        }
    });
});
