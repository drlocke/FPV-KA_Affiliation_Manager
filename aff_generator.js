var code = "H8052232981273201905";

function writeOut(text) {
    var output = document.getElementById('links');
    var timestamp = new Date().toLocaleTimeString('de-DE', { hour12: false, 
        hour: "numeric", 
        minute: "numeric", 
        second: "numeric"});
    if (text.startsWith("http"))
    {
        var textDescription = text;
        var regex = new RegExp("https://www.banggood.com/");
        textDescription = textDescription.replace(regex, "");
        regex = new RegExp("\.html.*");
        textDescription = textDescription.replace(regex, "");
        text = "<p>" + timestamp + " | " + "<a href=\"" + text + "\" target=\"_blank\">" + textDescription + "</a>" + "</p>";
        //<a href="https://www.thesitewizard.com/" target="_blank">thesitewizard.com</a>
    }
    else
    {
        text = "<p>" + timestamp + " | " + text + "</p>";
    }
    output.innerHTML = text + output.innerHTML;
}

function generateAffLink() {
    var url = document.querySelector("#refcode_banggood").value;

    if (!url.startsWith("https://www.banggood.com/") && !url.startsWith("https://www.m.banggood.com/"))
    {
        writeOut("Error: This isn't a valid URL!");
    }
    else
    {
        if (!code.startsWith("p="))
        {
            code = "p=" + code;
        }

        var codeExtended = code + "&";

        if (!url.includes(codeExtended))
        {
            var prefixIndex = url.lastIndexOf('/') + 1;
            var prefixUrl = url.substr(0, prefixIndex);
            var postUrl = url.substr(prefixIndex);
            
            if (postUrl.includes("?")) {
                if (postUrl.includes("p=")) {
                    //replace existing ref code
                    var regex = new RegExp("p=\\w+&");
                    postUrl = postUrl.replace(regex, code + "&");
                } 
                else 
                {
                    //add our very own ref code to the front
                    postUrl = postUrl.replace("?", "?" + code + "&");
                }
            } 
            else 
            {
                postUrl = postUrl.concat("?" + code);
            }
            
            if (postUrl != null)
            {
                writeOut(prefixUrl + postUrl);
            }
            else
            {
                writeOut("Error: Please check your URL!")
            }
        }	
        else
        {
            writeOut(url);
        }
    }
}

document.getElementById('genAff').onclick = generateAffLink;