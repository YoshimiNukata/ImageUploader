$(function () {


  //コピーアンドペースト--->
  $(".editor--textbox").on('paste', function (event) {
    var items = event.originalEvent.clipboardData.items; 
    for (var i = 0; i < items.length; i++) {
      var item = items[i];

      if (item.type.indexOf("string") != -1) {


      }
      if (item.type.indexOf("image") != -1) {
        var file = item.getAsFile();
        var fd = new FormData();
        fd.append('file', file);
        console.log(fd)
        sendFileToServer(fd);
        event.preventDefault();
      }
    }
  });
  //コピーアンドペースト



  function handleFileUpload(files) {
    for (var i = 0; i < files.length; i++) {
      var fd = new FormData();
      fd.append('file', files[i]);
      sendFileToServer(fd);

    }
  }

  function sendFileToServer(formData) {

    var id = $(".aricle_id").text();

    $.ajax({
      url: '/article/' + id + '/upload_image',
      method: 'post',
      dataType: 'json',
      data: formData,
      processData: false,
      contentType: false
    }).done(function (res) {
      // success
      var url = res.url
      insertText("![img]" + "(" + url + ")")


    }).fail(function (jqXHR, textStatus, errorThrown) {
      // fail
      console.log('ERROR', jqXHR, textStatus, errorThrown);
    });

  }


  function insertText(url) {

    var textarea = document.querySelector('textarea');

    var sentence = textarea.value;
    var len = sentence.length;
    var pos = textarea.selectionStart;

    var before = sentence.substr(0, pos);
    var word = url;
    var after = sentence.substr(pos, len);

    sentence = before + word + after;

    textarea.value = sentence;
  };


  // textの自動保存ーーーー＞

  var stack = []; //入力数を保存する変数
  $(".editor--textbox").on('keyup', function (e) {

    stack.push(1); //入力ごとに値を追加する

    setTimeout(function () {
      stack.pop(); //中身を一つ取り出す

      if (stack.length == 0) {
        //最後キー入力後に処理したいイベント
        sendTextToServer()

        stack = []; //stackを初期化
      }
    }, 500);

    function sendTextToServer() {
      var userText = $(".editor--text").val();
      var id = $(".aricle_id").text();
      $.ajax({
        url: '/article/' + id,
        method: 'PATCH',
        dataType: 'html',
        // dataに FormDataを指定
        data: {
          text: userText
        },
  
      }).done(function (res) {
        // success
        $(".editor--preview--box").html(res)

      }).fail(function (jqXHR, textStatus, errorThrown) {
        // fail
        $(".editor--preview--box").html("<h1>HIHI</hi>")
        console.log('ERROR', jqXHR, textStatus, errorThrown);
      });
    }

  });

  // textの自動保存　＜ーーーー

});