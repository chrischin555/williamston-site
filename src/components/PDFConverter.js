// PDFConverter.js

import React, { useState } from 'react';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { PDFDocument } from 'pdf-lib';

const PDFConverter = () => {
    const [pdfBytes, setPdfBytes] = useState(null);
    const [wordArrayBuffer, setWordArrayBuffer] = useState(null)


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setWordArrayBuffer(event.target.result);
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const convertWordToPDF = async () => {
        try {
            // Load the Word document
            const zip = new PizZip(wordArrayBuffer);
            const doc = new Docxtemplater().loadZip(zip);


            // Render the Word document
            doc.render();

            // Log the content of the Word document

            const wordDocumentContent = doc.getFullText();
            console.log('Word Document Content:', wordDocumentContent);


            // Get the rendered content as a buffer
            //const renderedBuffer = doc.getZip().generate({ type: 'uint8array' });

            // Assuming A4 dimensions are 595.276 x 841.890 points
            const pageWidth = 595.276;
            const pageHeight = 841.890;

            // Create a PDF document
            const pdfDoc = await PDFDocument.create();
            const page = pdfDoc.addPage([pageWidth, pageHeight]);

            // Embed the Helvetica font
            const font = await pdfDoc.embedFont('Helvetica');
            // Sets font size
            const fontSize = 12;

            // Add the rendered content to the PDF
            const pdfText = docxToPdfText(doc.getFullText(), font, fontSize);
            const validPdfText = pdfText || ''; // Ensure pdfText is a string

            // Set the position at the top-left corner of the page
            let position = { x: 50, y: page.getHeight() - 50 }; // Adjust as needed

            // Draw each line of text with appropriate font size and line breaks
            pdfText.forEach(({ text, y }) => {
                // Ensure that the y-coordinate is a valid number
                const validY = typeof y === 'number' && !isNaN(y) ? y : 0;

                page.drawText(text, { font, x: position.x, y: position.y - validY, size: fontSize });
            });

            // Log the processed PDF text
            console.log('Processed PDF Text:', validPdfText);

            // Save the PDF as a buffer
            const pdfBytes = await pdfDoc.save();

            // Set the PDF bytes
            setPdfBytes(pdfBytes);
        } catch (error) {
            console.error('Error converting Word to PDF:', error);
        }
    };



    const docxToPdfText = (docxText, fontSize) => {
        const lines = docxText.split('\n');
        const lineHeight = fontSize * 1.5; // Adjust as needed

        // Adjust the y-coordinate based on font size and line height
        const adjustedLines = lines.map((line, index) => ({
            text: line,
            y: fontSize + lineHeight * index,
        }));

        return adjustedLines;
    };



    return (
        <div style={{ fontFamily: 'Arial', textAlign: 'center', padding: '20px' }}>
            {/* Add a file input to select a Word document */}
            <input type="file" accept=".docx" onChange={handleFileChange} />

            <button style={{ margin: '10px', padding: '10px', backgroundColor: 'blue', color: 'white' }} onClick={convertWordToPDF}>
                Convert to PDF
            </button>

            {/* Trigger the download of the PDF file */}
            {pdfBytes && (
                <a
                    href={URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }))}
                    download="converted_document.pdf"
                    style={{ display: 'block', margin: '20px', textDecoration: 'none', color: 'green' }}
                >
                    Download PDF
                </a>
            )}
        </div>
    );
};

export default PDFConverter;