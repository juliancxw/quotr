let viewer;



const options = {
    env: 'AutodeskProduction',
    api: 'derivativeV2', // TODO: for models uploaded to EMEA change this option to 'derivativeV2_EU'
    accessToken: accessToken
};
const documentId = 'urn:' + urn;

// Run this when the page is loaded
Autodesk.Viewing.Initializer(options, function onInitialized(){
    // Find the element where the 3d viewer will live.    
    const htmlElement = document.getElementById('forge-viewer');
    if (htmlElement) {
        // Create and start the viewer in that element    
        viewer = new Autodesk.Viewing.GuiViewer3D(htmlElement);
        viewer.setTheme("light-theme")
        viewer.start();
        // Load the document into the viewer.
        // if (!pdf) return;
     
        viewer.loadExtension('Autodesk.PDF').then( () => {
            Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
            viewer.loadExtension("Autodesk.Viewing.MarkupsCore")
            viewer.loadExtension("Autodesk.Viewing.MarkupsGui")
        });
        // viewer.loadExtension('Autodesk.Snapping')
        Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
       
    }
});


        /**
        * Autodesk.Viewing.Document.load() success callback.
        * Proceeds with model initialization.
        */
         function onDocumentLoadSuccess(doc) {
            // Load the default viewable geometry into the viewer.
            // Using the doc, we have access to the root BubbleNode,
            // which references the root node of a graph that wraps each object from the Manifest JSON.
            const viewable = doc.getRoot().getDefaultGeometry();
            if (viewable) {
                viewer.loadDocumentNode(doc, viewable).then(function(result) {
                    console.log('Viewable Loaded!');
                }).catch(function(err) {
                    console.log('Viewable failed to load.');
                    console.log(err);
                }
              )
            }
        }

        /**
        * Autodesk.Viewing.Document.load() failure callback.
        */
        function onDocumentLoadFailure(viewerErrorCode) {
            console.error('onDocumentLoadFailure() - errorCode: ' + viewerErrorCode);
           
        }

