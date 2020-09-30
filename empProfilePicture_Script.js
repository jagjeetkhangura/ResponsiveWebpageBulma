//upload new employee picture
function handleFileSelect(evt) {
    var files = evt.target.files;
    for (var i = 0, f; f = files[i]; i++) {
        if (!f.type.match('image.*')) {
            continue;
        }
        var reader = new FileReader();
        reader.onload = (function (theFile) {
            return function (e) {
                DOM_EmpImage = e.target.result;
            };
        })(f);
        reader.readAsDataURL(f);
    }
}

document.getElementById('profile').addEventListener('change', handleFileSelect, false);