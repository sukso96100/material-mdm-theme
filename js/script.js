// Save l10n strings translated by MDM into variables, so that other .js files can access them.
var login_label = "$login_label";
var enter_your_username_label = "$enter_your_username_label";
var enter_your_password_label = "$enter_your_password_label";

function initLogin() {
   $("body").css("display", "none");
  $('body').css('cursor', 'progress');
  $('body').css('background-color', 'black');
  document.getElementById("error").style.display = 'none';

  // mdm_add_user('example','Example User', 'Not Logged in', 'PATH');
}
document.addEventListener('WebComponentsReady', function() {

  $("body").css("display", "block");
  displayTime();
  setTimeout(function(){
    document.getElementById('usersdialog').open();
    $('body').css('cursor', 'default');
    if(!document.getElementById("avatar")){
      mdm_prompt(enter_your_username_label);
      document.getElementById('close_btn').disabled = "disabled";
    }
  }, 1000)


});

var selected_row = -1;

// Called by MDM to set the welcome message
function set_welcome_message(message) {
  document.getElementById("welcome_message").innerHTML = message;
}
    // Called by MDM to disable user input
		function mdm_disable() {
			// document.getElementById("entry").value = "disabled";
			document.getElementById("entry").disabled = "disabled";
			document.getElementById("ok_button").disabled = "disabled";
      $('#ok_button').css('cursor', 'progress');
		}

		// Called by MDM to enable user input
		function mdm_enable() {
			document.getElementById("entry").value = "";
			document.getElementById("entry").disabled = false;
			document.getElementById("ok_button").disabled = false;
      $('#ok_button').css('cursor', 'default');
		}

    // Called by MDM to allow the user to input a username
    function mdm_prompt(message) {
      mdm_enable();
      // document.getElementById("msg").innerHTML = message;
      document.getElementById("entry").value = "";
      document.getElementById("entry").type = "text";
      document.getElementById('usersdialog').close();
      document.getElementById('logindialog').open();
      document.getElementById("entry").focus();
    }

    // Called by MDM to allow the user to input a password
    function mdm_noecho(message) {
      mdm_enable();
      document.getElementById("msg").innerHTML = message;
      document.getElementById("entry").value = "";
      document.getElementById("entry").type = "password";
      document.getElementById('usersdialog').close();
      document.getElementById('logindialog').open();
      document.getElementById("entry").focus();
    }

    //사용자 입력을 MDM 으로 보내기
    // Sends the user input to MDM
    function send_login() {
        // read the value before we disable the field, as it will be changed to "disabled"
        var value = document.getElementById("entry").value;
        mdm_disable();
        alert("LOGIN###" + value);
        return false;
    }

    function open_loginbox_from_usersdialog(username, gecos, avatar){
      alert('USER###'+username);
      // mdm_noecho(enter_your_password_label);
      document.getElementById('usersdialog').close();
      document.getElementById('logindialog').open();
      if(gecos==""){
        document.getElementById('selected_user').innerHTML = username;
      }else {
        document.getElementById('selected_user').innerHTML = gecos;
      }
      document.getElementById("avatar-big").style.backgroundImage = "url('file://"+avatar+"')"
    }

    function backToUsersList(){
      document.getElementById('usersdialog').open();
      document.getElementById('logindialog').close();
    }
    // Initialize a few things in the theme
    document.getElementById("timed").style.display = 'none';

function selectWithEnter(username, gecos, avatar){
  if (event.keyCode == 13){
    open_loginbox_from_usersdialog(username, gecos, avatar);
  }
}
    //키보드 네비게이션
    // Keyboard navigation and focus
    $("body").on("keydown", function(e){
      console.log(e.keyCode);
        if(e.keyCode === 38) {
            // up
            select_user_at_index(selected_user - 1, true);
            return false;
        }
        else if(e.keyCode === 40) {
            // down
            select_user_at_index(selected_user + 1, true);
            return false;
        }
        else if (e.keyCode == 9) {
            // tab
            $('#entry').focus();
            return false;
        }
        else if (e.keyCode == 13) {
            // enter
            if ($('#login_box').is(':hidden')) {
                return false;
            }
            else {
                send_login();
                return false;
            }
        }else if (e.keyCode == 27) {
            // esc
            console.log("ESC");
            return false;
        }
    });

    //사용자 목록에 사용자 추가
		// Called by MDM to add a user to the list of users
    //mdm_add_user("example","Example User", "Not Logged in", "PATH");
		function mdm_add_user(username, gecos, status, avatar) {

			var p1 = '<paper-item onclick="open_loginbox_from_usersdialog('+"'"+username+"','"+gecos+"','"+avatar+"'"+')"';
      var p1a = 'onkeyup="selectWithEnter('+"'"+username+"','"+gecos+"','"+avatar+"'"+')"><div id="avatar" class="avatar"';
      var p1b = "style="+'"'+"background-image:url('file://"+avatar+"')"+'"'+"";
      var p1c = '></div><paper-item-body two-line><div>';
      var p2;
      if(gecos==undefined){
				p2 = username;
			}else{
				p2 = gecos;
			}
			var p3 = '</div><div secondary>';
      var p4;
			if (status != undefined) {
			p4 = status;
			}
			var p5 = '</div></paper-item-body></paper-item>'
      console.log(p1+p1a+p1b+p1c+p2+p3+p4+p5);
      var useritem = p1+p1a+p1b+p1c+p2+p3+p4+p5;
      // $('#entry').css('cursor', 'text');
        // useritem.style.backgroundImage = "url('file://"+avatar+"')"
        $('#userlist').append(useritem);

		}

    // Called by MDM to show an error
    function mdm_error(message) {
        if (message != "") {
            document.getElementById("error").style.display = 'block';
        }
        else {
            document.getElementById("error").style.display = 'none';
        }
        document.getElementById("error").innerHTML = message;
    }
    //세션목록에 세션추가.
    // Called by MDM to add a session to the list of sessions
    function mdm_add_session(session_name, session_file) {

      session_name = session_name.replace("Ubuntu", "Unity");

      var filename = session_file.toLowerCase();
      filename = filename.replace(/ /g, "-");
      filename = filename.replace(/\(/g, "");
      filename = filename.replace(/\)/g, "");
      filename = filename.replace(/.desktop/g, "");

      var session_item = document.createElement('paper-item');
      session_item.innerHTML = session_name;
        session_item.setAttribute('onclick', "alert('SESSION###"+session_name+"###"+session_file+"');mdm_set_current_session('"+session_name+"','"+session_file+"');");
      $('#session_menu').append(session_item);
      // $('#session_menu_login').append(session_item);

    }

    // Called by MDM to add a language to the list of languages
		function mdm_add_language(language_name, language_code) {
			var lang_item = document.createElement('paper-item');
      lang_item.innerHTML = language_name;
				lang_item.setAttribute('href', "javascript:alert('LANGUAGE###"+language_code+"');mdm_set_current_language('"+language_name+"','"+language_code+"');");
$('#lang_menu').append(lang_item);

		}

    // Called by MDM if the SHUTDOWN command shouldn't appear in the greeter
    function mdm_hide_shutdown() {
      document.getElementById("shutdown").style.display = 'none';
      document.getElementById("shutdown_lb").style.display = 'none';
    }

    // Called by MDM if the SUSPEND command shouldn't appear in the greeter
    function mdm_hide_suspend() {
      document.getElementById("suspend").style.display = 'none';
      document.getElementById("suspend_lb").style.display = 'none';
    }

    // Called by MDM if the RESTART command shouldn't appear in the greeter
    function mdm_hide_restart() {
      document.getElementById("restart").style.display = 'none';
        document.getElementById("restart_lb").style.display = 'none';
    }
    //
    // // Called by MDM if the QUIT command shouldn't appear in the greeter
    // function mdm_hide_quit() {
    //   document.getElementById("quit").style.display = 'none';
    // }
    //
    // // Called by MDM if the XDMCP command shouldn't appear in the greeter
    // function mdm_hide_xdmcp() {
    //   document.getElementById("xdmcp").style.display = 'none';
    // }
