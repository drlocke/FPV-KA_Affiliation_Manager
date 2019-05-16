var code = "H8052232981273201905";

function writeOut(text) {
    writeOut(text, text)
}
function writeOut(text, description) {
    var output = document.getElementById('links');
    var timestamp = new Date().toLocaleTimeString('de-DE', { hour12: false, 
        hour: "numeric", 
        minute: "numeric", 
        second: "numeric"});
    if (text.startsWith("http"))
    {
        text = "<p>" + timestamp + " | " + "<a href=\"" + text + "\" target=\"_blank\">" + description + "</a>" + "</p>";
        //<a href="https://www.thesitewizard.com/" target="_blank">thesitewizard.com</a>
    }
    else
    {
        text = "<p>" + timestamp + " | " + text + "</p>";
    }
    output.innerHTML = text + output.innerHTML;
}

function generateUrlDesc(fullUrl)
{
    return fullUrl.replace(new RegExp(urlRegexExp), "").replace(new RegExp("\.html.*"), "");
}

function generateAffLink() {
    var url = document.querySelector("#refcode_banggood").value;
    var urlRegexExp = "http(s)?://(www\.)?(m\.)?banggood\.com/(.*/)*";
    var urlRegex = new RegExp(urlRegexExp + ".*");

    if (!url.match(urlRegex))
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
                var affUrl = prefixUrl + postUrl;
                writeOut(affUrl, generateUrlDesc(affUrl));
            }
            else
            {
                writeOut("Error: Please check your URL!")
            }
        }	
        else
        {
            writeOut(url, generateUrlDesc(url));
        }
    }
}

document.getElementById('genAff').onclick = generateAffLink;