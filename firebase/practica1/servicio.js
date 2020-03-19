db.collection("productos").onSnapshot({
    // Listen for document metadata changes
    includeMetadataChanges: true
    }, function(snapshot) {
        ObtenerProductos();
        snapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
            console.log("New: ", change.doc.data());
        }
        if (change.type === "modified") {
            console.log("Modified: ", change.doc.data());
        }
        if (change.type === "removed") {
            console.log("Removed: ", change.doc.data());
        }
        });
});