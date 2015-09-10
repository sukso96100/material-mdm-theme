document.addEventListener('WebComponentsReady', function() {
  document.getElementById('usersdialog').toggle();
});


    // Save l10n strings translated by MDM into variables, so that other .js files can access them.
    var login_label = "$login_label";
    var enter_your_username_label = "$enter_your_username_label";
    var enter_your_password_label = "$enter_your_password_label";

var selected_row = -1;

// function onLoad(){
//   document.getElementById("usersbox").toggle();
//   document.getElementById("loginbox").toggle();
// }

    // Called by MDM to disable user input
		function mdm_disable() {
			document.getElementById("entry").value = "disabled";
			document.getElementById("entry").disabled = "disabled";
			document.getElementById("ok_button").disabled = "disabled";
		}

		// Called by MDM to enable user input
		function mdm_enable() {
			document.getElementById("entry").value = "";
			document.getElementById("entry").disabled = false;
			document.getElementById("ok_button").disabled = false;
		}

    // Called by MDM to allow the user to input a username
    function mdm_prompt(message) {
      mdm_enable();
      document.getElementById("label").innerHTML = message;
      document.getElementById("entry").value = "";
      document.getElementById("entry").type = "text";
      document.getElementById("entry").focus();
      selected_row = -1;
    }

    // Called by MDM to allow the user to input a password
    function mdm_noecho(message) {
      mdm_enable();
      document.getElementById("entry").label = message;
      document.getElementById("entry").value = "";
      document.getElementById("entry").type = "password";
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

    function open_loginbox_from_usersdialog(username){
      alert("USER###"+username);
      document.getElementById('logindialog').toggle();

    }
    // Initialize a few things in the theme
    document.getElementById("error").style.display = 'none';
    document.getElementById("timed").style.display = 'none';
    document.getElementById("current_session_picture").width = 16;

    //키보드 네비게이션
    // Keyboard navigation and focus
    $("body").on("keydown", function(e){
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
        }
    });

    //사용자 목록에 사용자 추가
		// Called by MDM to add a user to the list of users
    //mdm_add_user("example","Example User", "Not Logged in", "PATH");
		function mdm_add_user(username, gecos, status, avatar) {

			var p1 = '<paper-item onclick="open_loginbox_from_usersdialog('+'"'+username+'"'+')"><div class="avatar"></div><paper-item-body two-line><div>';
      var p2;
      if(gecos==undefined){
				p2 = username;
			}else{
				p2 = gecos;
			}
			var p3 = '</div><div secondary>';
      var p4;
			if (status != "") {
			p4 = status;
			}
			var p5 = '</div></paper-item-body></paper-item>'
      console.log(p1+p2+p3+p4+p5);
      var useritem = p1+p2+p3+p4+p5;

        $('#userlist').append(useritem);

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

      var link1 = document.createElement('a');
        link1.setAttribute('href', "javascript:alert('SESSION###"+session_name+"###"+session_file+"');mdm_set_current_session('"+session_name+"','"+session_file+"');");

      var link2 = document.createElement('a');
        link2.setAttribute('href', "javascript:alert('SESSION###"+session_name+"###"+session_file+"');mdm_set_current_session('"+session_name+"','"+session_file+"');");

      var picture = document.createElement('img');
        picture.setAttribute('class', "session-picture");
        picture.setAttribute('src', "../common/img/sessions/"+filename+".svg");
        picture.setAttribute('onerror', "this.src='../common/img/sessions/default.svg';");

      var name_div = document.createTextNode(session_name);

      link1.appendChild(picture);
      link2.appendChild(name_div);

      var table = document.getElementById("sessions");

            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);

            var cell1 = row.insertCell(0);
            cell1.width = "28px";
            cell1.appendChild(link1);

            var cell2 = row.insertCell(1);
            cell2.appendChild(link2);
    }

    // Called by MDM to add a language to the list of languages
		function mdm_add_language(language_name, language_code) {
			var link1 = document.createElement('a');
				link1.setAttribute('href', "javascript:alert('LANGUAGE###"+language_code+"');mdm_set_current_language('"+language_name+"','"+language_code+"');");

			var link2 = document.createElement('a');
				link2.setAttribute('href', "javascript:alert('LANGUAGE###"+language_code+"');mdm_set_current_language('"+language_name+"','"+language_code+"');");

			var picture = document.createElement('img');
				picture.setAttribute('class', "language-picture");
				picture.setAttribute('src', mdm_get_language_flag_filepath(language_code));
				picture.setAttribute('onerror', "this.src='../common/img/languages/generic.png';");
				picture.setAttribute('title', language_name);

			var name_div = document.createTextNode(language_name);

			link1.appendChild(picture);
			link2.appendChild(name_div);

			var table = document.getElementById("languages");

            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);

            var cell1 = row.insertCell(0);
            cell1.width = "25px";
            cell1.appendChild(link1);

            var cell2 = row.insertCell(1);
            cell2.appendChild(link2);

		}
