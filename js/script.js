
    // Save l10n strings translated by MDM into variables, so that other .js files can access them.
    var login_label = "$login_label";
    var enter_your_username_label = "$enter_your_username_label";
    var enter_your_password_label = "$enter_your_password_label";

var selected_row = -1;

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
      document.getElementById("label").innerHTML = message;
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
