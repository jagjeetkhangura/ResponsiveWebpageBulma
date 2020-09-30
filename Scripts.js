

const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
var DOM_IdIncrement = 0;
var api_PageNo = 0;
var DOM_EmpImage = "";

window.onload = function ()
{
    getEmployeeData();
    
};

//Load more pages from api on page scroll
window.onscroll = function (ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        getEmployeeData();
    }
};

//close notification box, when user click on close(x) 
document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('.notification .delete') || []).forEach(($delete) => {
        $notification = $delete.parentNode;
        $delete.addEventListener('click', () => {
            close_model
            document.getElementById("notifications").style.display = "none";
        });
    });
});

//Get all employees from api ,Fetch 15 employees per page
function getEmployeeData() {
    if (api_PageNo < 3) {
        document.getElementById("page_loading").style.display = "block";
    }    
    api_PageNo = api_PageNo + 1;
    var api_Url = 'https://emplistapi-258220.appspot.com/?pageSize=15&pageNumber=' + api_PageNo + '';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', corsProxyUrl + api_Url, true);
    xhr.responseType = 'json';
    xhr.onload = function () {
        var data = this.response;
        document.getElementById("btnaddemployee").style.display = "block";
        var ol = "";
        if (xhr.status >= 200 && xhr.status < 400) {
            document.getElementById("page_loading").style.display = "none";
            data.forEach(empData => {
                DOM_IdIncrement = DOM_IdIncrement + 1;
                var element = document.createElement("div");
                document.getElementById("page_loading").style.display = "none";
                ol = '<div id="' + empData.name.first + '_' + DOM_IdIncrement + '" class="card-header card_custom_style" ><div class="card-content"><div class="media"><div class="media-left"><figure class="image is-square is-64x64">';
                if (empData.photoURL != null) {
                    ol = ol + '<img class="is-rounded is-64x64" style="object-fit: cover;" src="' + empData.photoURL + '" alt="' + empData.photoURL + '"></figure></div><div class="media-content" style="overflow:hidden">';
                }
                else {
                    ol = ol + '<img class="is-rounded is-64x64" style="object-fit: cover;" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png" alt="not available"></figure></div><div class="media-content" style="overflow:hidden">';
                }
                if (empData.name.first != null) {
                    ol = ol + '<p style="" class="title is-6"><b>' + empData.name.first + '';
                }
                else { }
                if (empData.name.last != null) {
                    ol = ol + '&nbsp' + empData.name.last + '</b> </p>';
                }
                else { }
                if (empData.jobTitle != null) {
                    ol = ol + '<p class="subtitle is-6">' + empData.jobTitle + '</p></div></div></div></div>';
                }
                else {
                    ol = ol + '<p class="subtitle is-6"> </p></div></div></div></div>';
                }
                element.innerHTML = ol;
                document.getElementById("wrapper").appendChild(element);

            })
        }
        else {
            console.log('error');
        }
    }

    xhr.send()


}

//Open popup modal
function OpenModal() {
    var modal = document.getElementById("modal-ter");
    modal.style.display = "flex";
}

//Close popup modal
function CloseModal() {
    var modal = document.getElementById("modal-ter");
    modal.style.display = "none";
}

//Save new employee at top of list
function emp_save() {
   
    var fname = document.getElementById("txtfname").value;
    var lname = document.getElementById("txtlname").value;
    var jtitle = document.getElementById("jobtitle").value;
    var profil = document.getElementById("profile").value;
    var regex = /^[a-zA-Z ]{2,30}$/;
    if (!regex.test(fname)) {
        document.getElementById("messages").innerHTML = "Please check first name";
        document.getElementById("notifications").style.display = "block";
        document.getElementById('notifications').style.background = '#ff5555';
        setTimeout(function () {
            document.getElementById('notifications').style.display = 'none';

        }, 5000);
    }
    else if (!regex.test(lname)) {
        document.getElementById("messages").innerHTML = "Please check last name";
        document.getElementById("notifications").style.display = "block";
        document.getElementById('notifications').style.background = '#ff5555';
        setTimeout(function () { document.getElementById('notifications').style.display = 'none' }, 5000);
    }
    else {
        var modal = document.getElementById("modal-ter");
        var elementa = document.createElement("div");
        document.getElementById("page_loading").style.display = "none";
        var ola = '<div class="card-header card_custom_style" ><div class="card-content"><div class="media"><div class="media-left"><figure class="image is-square is-64x64">';
        if (DOM_EmpImage != "") {
            ola = ola + '<img class="is-rounded is-64x64" style="object-fit: cover;" src="' + DOM_EmpImage + '" alt="' + DOM_EmpImage + '"></figure></div><div class="media-content" style="overflow:hidden">';
        }
        else {
            ola = ola + '<img class="is-rounded is-64x64" style="object-fit: cover;" src="https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_640.png" alt="' + DOM_EmpImage + '"></figure></div><div class="media-content">';
        }
        ola = ola + '<p class="title is-6" style="overflow-y:hidden;"><b>' + fname + '';
        ola = ola + '&nbsp' + lname + '</b> </p>';
        ola = ola + '<p class="subtitle is-6">' + jtitle + '</p></div></div></div></div>';
        elementa.innerHTML = ola;
        document.getElementById("wrapper").insertBefore(elementa, document.getElementById("wrapper").firstChild);
        document.getElementById("messages").innerHTML = "New employee details saved successfully!";
        document.getElementById("notifications").style.display = "block";
        document.getElementById('notifications').style.background = '#3298dc';

        setTimeout(function () { document.getElementById('notifications').style.display = 'none' }, 5000);
        document.getElementById("txtfname").value = "";
        document.getElementById("txtlname").value = "";
        const scrollToTop = () => {
            const c = document.documentElement.scrollTop || document.body.scrollTop;
            if (c > 0) {
                window.requestAnimationFrame(scrollToTop);
                window.scrollTo(0, c - c / 8);
            }
        };
        scrollToTop();
    }
}
    
  
      