// client-side js for [main_users_workflow]

$(() => {
   // LOGOUT btn logic
    $("#logout").click(() => {
        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/logout', true);

        xhr.send();

        xhr.onreadystatechange = function() {
          if (this.readyState != 4) return;
          if (this.status != 200) {
            alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
            return;
          }
          let response = JSON.parse(this.responseText);
          if(response.error == 0) {
            window.location.href = "/";
          }
        }
    });
  
  
   // GET information about user
    const xhr = new XMLHttpRequest();

          xhr.open('GET', '/user-inf', true);

          xhr.send();

          xhr.onreadystatechange = function() {
            if (this.readyState != 4) return;
            if (this.status != 200) {
              alert( 'error: ' + (this.status ? this.statusText : 'request has not been set') );
              return;
            }
            let response = JSON.parse(this.responseText);
            // set user inf into "USER BLOCK"
            $("#name").text(response.name);
            $("#lastname").text(response.lastname);
            $('#user-avatar').attr("src","data:image/png;base64, " + response.img);   
          }
});