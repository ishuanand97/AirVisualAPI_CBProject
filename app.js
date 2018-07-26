$.ajax({
    async: true,
    crossDomain: true,
    url: "http://api.airvisual.com/v2/countries?key=kN5knCsR3KYZmbnz6",
    method: "GET",
    headers: {},
    success: function (response) {
        // console.log(response.data[0].country);
        for (var i = 0; i < response.data.length; i++) {
            var opt = document.createElement("option");
            opt.value = response.data[i].country;
            opt.innerHTML = response.data[i].country;
            $("#mySelect").append(opt);
        }
    }
});


function listStates(country_name) {

    var u = "http://api.airvisual.com/v2/states?country=" + country_name + "&key=kN5knCsR3KYZmbnz6";

    var settings = {
        "async": true,
        "crossDomain": true,
        "url": u,
        "method": "GET",
        "headers": {}
    }

    $.ajax(settings).done(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var opt = document.createElement("option");
            opt.value = response.data[i].state;
            opt.innerHTML = response.data[i].state;
            $("#states").append(opt);
        }
    });

}


function lStates() {
    var x = document.getElementById("mySelect").value;
    $("#states").empty();
    $("#cities").empty();
    listStates(x);
}

function lCities() {
    var s = document.getElementById("states").value;
    var c = document.getElementById("mySelect").value;
    console.log(c, s);
    var u = " http://api.airvisual.com/v2/cities?state=" + s + "&country=" + c + "&key=kN5knCsR3KYZmbnz6";

    $("#cities").empty();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": u,
        "method": "GET",
        "headers": {}
    }
    $.ajax(settings).done(function (response) {
        for (var i = 0; i < response.data.length; i++) {
            var opt = document.createElement("option");
            opt.value = response.data[i].city;
            opt.innerHTML = response.data[i].city;
            $("#cities").append(opt);
        }
    });
}

function myFunction() {
    var s = document.getElementById("states").value;
    var co = document.getElementById("mySelect").value;
    var ci = document.getElementById("cities").value;

    var u = "http://api.airvisual.com/v2/city?city=" + ci + "&state=" + s + "&country=" + co + "&key=kN5knCsR3KYZmbnz6"


    var settings = {
        "async": true,
        "crossDomain": true,
        "url": u,
        "method": "GET",
        "headers": {}
    }

    $.ajax(settings).done(function (response) {
        console.log(response);

        var newVal = response.data.current.pollution.aqicn;
        document.getElementById("demo").innerHTML = newVal;

        newval = newVal / 5;
        // gauge 2

        var dVal = newval;
        var newVal = dVal * 1.8 - 45;
        $('.circle-inner, .gauge-copy').css({
            'transform': 'rotate(' + newVal + 'deg)'
        });
        $('.gauge-copy').css({
            'transform': 'translate(-50%, -50%) rotate(' + dVal * 1.8 + 'deg)'
        });
        $('.percentage').text(dVal + ' %');

        if (dVal > 20) {
            if (document.querySelector('#clouds').children[0].classList.contains("cloud-w")) {
                var len = document.querySelector('#clouds').children.length;
                for (var i = 0; i < len; i++) {
                    document.querySelector('#clouds').children[i].classList.toggle('cloud-w');
                    document.querySelector('#clouds').children[i].classList.toggle('cloud-b');
                }

                var len = document.querySelector('.small-mountains').children.length;
                for (var i = 0; i < len; i++) {
                    document.querySelector('.small-mountains').children[i].classList.toggle('tri-p');
                    document.querySelector('.small-mountains').children[i].classList.toggle('tri-np');
                }

                var len = document.querySelector('.tall-mountains').children.length;
                for (var i = 0; i < len; i++) {
                    document.querySelector('.tall-mountains').children[i].classList.toggle('tri2-p');
                    document.querySelector('.tall-mountains').children[i].classList.toggle('tri2-np');
                }

                $('.landing').css("background", " #BBCCDD");
                $('.landing').css("background", "linear-gradient( 158deg, rgba(190, 231, 232, 1) 0%, rgb(136, 163, 180) 55%)");
                document.querySelector('.ground').classList.toggle('ground-np');
                document.querySelector('.ground').classList.toggle('ground-p');

            }
        }


        if (dVal < 20) {
            if (document.querySelector('#clouds').children[0].classList.contains("cloud-b")) {
                var len = document.querySelector('#clouds').children.length;
                for (var i = 0; i < len; i++) {
                    document.querySelector('#clouds').children[i].classList.toggle('cloud-w');
                    document.querySelector('#clouds').children[i].classList.toggle('cloud-b');
                }
                var len = document.querySelector('.small-mountains').children.length;
                for (var i = 0; i < len; i++) {
                    document.querySelector('.small-mountains').children[i].classList.toggle('tri-p');
                    document.querySelector('.small-mountains').children[i].classList.toggle('tri-np');
                }

                var len = document.querySelector('.tall-mountains').children.length;
                for (var i = 0; i < len; i++) {
                    document.querySelector('.tall-mountains').children[i].classList.toggle('tri2-p');
                    document.querySelector('.tall-mountains').children[i].classList.toggle('tri2-np');
                }

                $('.landing').css("background", "rgb(190, 231, 232)");
                $('.landing').css("background", "linear-gradient( 158deg, rgba(190, 231, 232, 1) 0%, rgba(255, 212, 201, 1) 55%)");
                document.querySelector('.ground').classList.toggle('ground-np');
                document.querySelector('.ground').classList.toggle('ground-p');

            }
        }
    });
}

function myfunction(x) {
    if (x.matches) { // If media query matches
        $("table").hide();
    } else {
        $("table").show();
    }
}

var x = window.matchMedia("(max-width: 700px)")
myfunction(x) // Call listener function at run time
x.addListener(myfunction) // Attach listener function on state changes