async function common_processing(e) {
    $(".step-2-page-c-4-outer-wrapper").removeClass("show"),
        $(".analyzing-page-c-5-outer-wrapper").addClass("show"),
        (capturedPicBlobUrl = URL.createObjectURL(e)),
        (document.getElementById("capturedPic").src = capturedPicBlobUrl),
        (document.getElementById("capturedPicAnalyze").src = capturedPicBlobUrl);
    var t = { key1: capturedPicBlobUrl };
    localStorage.setItem("myData1", JSON.stringify(t));
    const upload = await uploadToServer(e);
    uploadData(upload);
    const r = await performSkinAnalysis(e);
    displayResult(r), show(document.getElementById("btnReset"));
}
const cameraModule = new CameraModule("vdoSrc");
let capturedPicBlobUrl = "";
const uploadData = function(e){
    console.log(e);
    if(e.error==null){
        document.getElementById("file-hidden").value = e.data.file_name;
        console.log('inside');
    }
};
const displayError = function (e) {
        (document.getElementById("errMessage").innerText = e.message), show(document.getElementById("results-err"));
    },
    displayScores = function (e) {
        const t = (e, t) => `<tr><td>${e}</td><td>${t}</td></tr>`;
        let r = "";
        for (key in e) r += t(key, e[key]);
        const a = document.getElementById("resultsHere");
        (a.innerHTML = r), show(document.getElementById("results-tbl"));
    },
    displayResult = function (e) {
        if ((e.error ? displayError(e.error) : displayScores(e.data), e.error)) $(".step-2-page-c-4-outer-wrapper").addClass("show"), $(".analyzing-page-c-5-outer-wrapper").removeClass("show");
        else {
            $(".step-2-page-c-4-outer-wrapper").removeClass("show"), $(".analyzing-page-c-5-outer-wrapper").addClass("show");
            var t = { key2: e.data };
            localStorage.setItem("myData2", JSON.stringify(t)),
                setTimeout(function () {
                    $(".analyzing-page-c-5-outer-wrapper").removeClass("show"), $(".form-page-c-6-outer-wrapper").addClass("show"), new_results();
                }, 1e3);
        }
    },
    process = async function () {
        const e = await cameraModule.capture();
        cameraModule.stopCamera(), hide(document.getElementById("cameraContainer")), show(document.getElementById("results-section")), common_processing(e);
    },
    processimage = async function (e) {
        hide(document.getElementById("cameraContainer")),
            show(document.getElementById("results-section")),
            (capturedPicBlobUrl = URL.createObjectURL(e)),
            (document.getElementById("capturedPic").src = capturedPicBlobUrl),
            // common_processing(e);
    },
    hide = function (e) {
        e.classList.add("hide");
    },
    show = function (e) {
        e.classList.remove("hide");
    },
    startCamera = function () {
        cameraModule
            .startCamera()
            .then(() => {
                hide(document.getElementById("btnStart")), show(document.getElementById("cameraContainer")), hide(document.getElementById("errorMessage"));
            })
            .catch(() => {
                document.getElementById("errorMessage").innerText = "Unable to start the camera, check your settings.";
            }),
            hide(document.getElementById("cameraLoadImage"));
    },
    reset = function () {
        show(document.getElementById("btnStart")),
            hide(document.getElementById("cameraContainer")),
            hide(document.getElementById("results-section")),
            hide(document.getElementById("btnReset")),
            hide(document.getElementById("results-tbl")),
            hide(document.getElementById("results-err")),
            capturedPicBlobUrl && URL.revokeObjectURL(capturedPicBlobUrl),
            (document.getElementById("file-upload-1").value = "");
    };
