import { Component } from "@angular/core";

@Component({
    selector : 'app-root',
    templateUrl : './signup.component.html',
    styleUrls : ['./signup.component.css'],
})

export class signup {
    title : "Register";

    onClickSubmit(data) {
        debugger;
        alert("Entered Email id : " + data.emailid);
     }


}