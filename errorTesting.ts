function imgoingtoerror() {
    try {
        throw new Error("RED ALERT");
    } catch {
        console.log("in the CHILD catch");
    }
}

function letssee() {
    try {
        imgoingtoerror();
        console.log("finished in the try");
    } catch (err) {
        console.log("in the catch");
    }
}

letssee();