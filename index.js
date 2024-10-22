(function() {
    function downloadPage(htmlContent) {
        const a = document.createElement('a');
        const blob = new Blob([htmlContent], { type: 'text/html' });
        a.href = URL.createObjectURL(blob);
        a.download = 'snapshot.html';
        a.click();
    }

    function serializeDocument() {
        const docClone = document.cloneNode(true);
        const styleSheets = Array.from(document.styleSheets);

        styleSheets.forEach(sheet => {
            try {
                const rules = sheet.cssRules;
                const style = document.createElement('style');
                Array.from(rules).forEach(rule => {
                    style.appendChild(document.createTextNode(rule.cssText));
                });
                docClone.head.appendChild(style);
            } catch (e) {
            }
        });

        docClone.querySelectorAll('script').forEach(script => script.remove());

        return '<!DOCTYPE html>\n' + docClone.documentElement.outerHTML;
    }

    const htmlContent = serializeDocument();
    downloadPage(htmlContent);
})();
