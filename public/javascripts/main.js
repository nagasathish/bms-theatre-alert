var qCount = 0;



function ajaxScrapCall() {
    // 1. create a new XMLHttpRequest object -- an object like any other!
    var myRequest = new XMLHttpRequest();
    // 2. open the request and pass the HTTP method name and the resource as parameters
    myRequest.open('GET', 'http://localhost:3000/bms/');
    // 3. write a function that runs anytime the state of the AJAX request changes
    myRequest.send();


    myRequest.onreadystatechange = function () {
        // 4. check if the request has a readyState of 4, which indicates the server has responded (complete)
        if (myRequest.readyState === 4) {
            // 5. insert the text sent by the server into the HTML of the 'ajax-content'
            //document.getElementById('ajax-content').innerHTML = myRequest.responseText;
            qCount++;
            var resp = JSON.parse(myRequest.responseText);
            //document.write(resp.statusCode);
            //console.log(resp);
            var parser = new DOMParser();
            var dom = parser.parseFromString(resp.body, "text/html");
            //console.log(dom.getElementById('venuelist').children);

            var theatres = dom.getElementById('venuelist').children, count = 0;
            var imageQuery = dom.getElementById('imgBanner').style.backgroundImage;
            var imageUrl = imageQuery.split('//',2)[1].split(')',1)[0].split('"',1);
            document.getElementById('imageViewer').src = 'http://'+imageUrl[0];


            //console.log(count++);
            var oldCount = parseInt(localStorage.getItem('thCount'));
            var out = "";
            for (var i = 0; i < theatres.length; i++) {
                var thName = theatres[i].dataset.name;
                var thID = theatres[i].dataset.id;
                console.log(thName);
                out += thName + '</br>';
                count = theatres.length;

                //SPECIFIC SHOWS ADDED
                if (thID === 'ACPM') {   //By Theatre ID you can find in DOM
                    //window.alert("Moosapet Added");
                    var showsMailReq1M = new XMLHttpRequest();
                    showsMailReq1M.open('GET', 'http://localhost:3000/sendmail/');
                    showsMailReq1M.send();

                    var ACPMCount = parseInt(localStorage.getItem('acpmCount')),
                        curCount = theatres[i].children[1].children.length;
                    if (ACPMCount != curCount) {
                        console.log("Moosapet Shows Added");
                        var showsMailReq1 = new XMLHttpRequest();
                        showsMailReq1.open('GET', 'http://localhost:3000/sendmail/');
                        showsMailReq1.send();
                        localStorage.setItem('acpmCount', curCount.toString())
                    }
                }

                if (thID === 'CNTW') {
                    var CNTWCount = parseInt(localStorage.getItem('cntwCount')),
                        curCount = theatres[i].children[1].children.length;
                    if (CNTWCount != curCount) {
                        console.log("Cinetown Shows Added");
                        window.alert("Cinetown Shows Added");

                        var showsMailReq2 = new XMLHttpRequest();
                        showsMailReq2.open('GET', 'http://localhost:3000/sendmail/');
                        showsMailReq2.send();
                        localStorage.setItem('cntwCount', curCount.toString())
                    }
                }

                if (thID === 'AGHM') {
                    var AGHMCount = parseInt(localStorage.getItem('aghmCount')),
                        curCount = theatres[i].children[1].children.length;
                    if (AGHMCount != curCount) {
                        window.alert("Asian Shows Added");

                        console.log("Asian GPR Shows Added");
                        var showsMailReq3 = new XMLHttpRequest();
                        showsMailReq3.open('GET', 'http://localhost:3000/sendmail/');
                        showsMailReq3.send();
                        localStorage.setItem('aghmCount', curCount.toString())
                    }
                }

                //Todo SRI RANGA DISABLED
                if (thID === 'SRCM') {   //IF THEATRE BOOKING DOWN.
                    if (theatres[i].dataset.isDown !== 'true') {
                        //window.alert("Miyapur UP");
                        console.log("Miyapur Sriranga UP");
                        var showsMailReq4 = new XMLHttpRequest();
                        showsMailReq4.open('GET', 'http://localhost:3000/sendmail/');
                        showsMailReq4.send();
                    }
                }
            }

            if (oldCount !== count) {
                var mailRequest = new XMLHttpRequest();
                // 2. open the request and pass the HTTP method name and the resource as parameters
                mailRequest.open('GET', 'http://localhost:3000/sendmail/');
                // 3. write a function that runs anytime the state of the AJAX request changes
                mailRequest.send();


                var confirmWindow = window.confirm("New theatres added!");
            }
            if (confirmWindow) {
                localStorage.setItem('thCount', count.toString());
            }
            document.getElementById('timeStamp').innerHTML = '<h3>Last Refreshed at ' + new Date() + '</h3>';
            document.getElementById('fetchCount').innerHTML = '<h5>' + qCount + ' times fetched</h5>';

            document.getElementById('totalCount').innerHTML = '<h2 style="color: red">Total theatres are ' + count + '</h2>';
            document.getElementById('theatresList').innerHTML = out;
        }
    };
}


setInterval(function () {
    ajaxScrapCall();
}, 300000);


function sendTheAJAX() {
    document.getElementById('reveal').style.display = 'none';
}

//21
