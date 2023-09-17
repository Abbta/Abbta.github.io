var xhttp = new XMLHttpRequest();
var register = 
'<?xml version="1.0"?>' +
'soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:tns="http://www.timeedit.se/timeedit3/version3">' +
   '<soapenv:Header/>' +
   '<soapenv:Body>' +
      '<tns:register>' +
         '<tns:certificate>Base64 encoded certificate goes here</tns:certificate>' +
      '</tns:register>' +
   '</soapenv:Body>' +
'</soapenv:Envelope>';
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       document.getElementById("demo").innerHTML = xhttp.responseText;
    }
};
xhttp.open("POST", "https://cloud.timeedit.net", true);
xhttp.setRequestHeader("Content-Type", "text/xml;charset=UTF-8")
xhttp.setRequestHeader("SOAPAction", "register")
xhttp.setRequestHeader("Host", "cloud.timeedit.net")
xhttp.setRequestHeader("User-Agent", "Sampl")
xhttp.send();
Host: cloud.timeedit.net
User-Agent: SampleClient