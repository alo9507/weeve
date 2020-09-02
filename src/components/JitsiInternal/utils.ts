export const importJitsiApi = (): Promise<void> => new Promise(async (resolve) => {
    if(window.JitsiMeetExternalAPI) {
        resolve(window.JitsiMeetExternalAPI)
    } else {
        const head = document.getElementsByTagName("head")[0];
        const script = document.createElement("script");

        script.setAttribute("type", "text/javascript");
        script.setAttribute("src", "https://167.172.10.231/external_api.js");

        head.addEventListener("load", function(event: any) {
            if (event.target.nodeName === "SCRIPT") {
                resolve(window.JitsiMeetExternalAPI)
            }
        }, true);

        head.appendChild(script);
    }
})
