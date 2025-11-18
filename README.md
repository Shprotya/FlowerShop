To have Sass working, go to Setting of Sass Compiler Extension (Glenn Marks), edit your settings json and then change the path: **"savePath": null**, to the desired paths of the output generated css. e.g. "/public/outputcss"
Change the link in the head to the output css:
<link rel="stylesheet" href="/outputcss/style.css">