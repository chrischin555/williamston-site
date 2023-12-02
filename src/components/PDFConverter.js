import React, { useState } from 'react';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';
import { PDFDocument } from 'pdf-lib';

const PDFConverter = () => {
    const [pdfBytes, setPdfBytes] = useState(null);
    const [fileArrayBuffer, setFileArrayBuffer] = useState(null);
    const [isImage, setIsImage] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setFileArrayBuffer(event.target.result);
                // Check if the file is an image
                setIsImage(file.type.startsWith('image'));
            };
            reader.readAsArrayBuffer(file);
        }
    };

    const convertToPDF = async () => {
        try {
            if (isImage) {
                // Convert image to PDF
                const pdfDoc = await PDFDocument.create();
                const page = pdfDoc.addPage();
                const { width, height } = page.getSize();
                const imageBytes = new Uint8Array(fileArrayBuffer);
                const image = await pdfDoc.embedPng(imageBytes);
                const imageWidth = width; // Set the desired width of the image
                const imageHeight = (imageWidth / image.width) * image.height;
                page.drawImage(image, {
                    x: 0,
                    y: height - imageHeight, // Adjust the y-coordinate to position the image at the top
                    width: imageWidth,
                    height: imageHeight,
                });
                const newPdfBytes = await pdfDoc.save();
                setPdfBytes(newPdfBytes);
            } else {
                // Convert Word document to PDF
                const zip = new PizZip(fileArrayBuffer);
                const doc = new Docxtemplater().loadZip(zip);
                doc.render();

                const pdfDoc = await PDFDocument.create();
                const page = pdfDoc.addPage();
                const font = await pdfDoc.embedFont('Helvetica');
                let pdfText = doc.getFullText();

                // Replace different newline characters with a consistent one
                pdfText = pdfText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

                // Set the position at the top of the page
                const position = { x: 50, y: page.getHeight() - 50 }; // Adjust as needed

                // Set the font size for the text
                const fontSize = 12; // Adjust as needed

                // Split the text into lines based on newlines
                const lines = pdfText.split('\n');

                // Draw each line of text with appropriate font size and line breaks
                lines.forEach((line, index) => {
                    page.drawText(line, { font, x: position.x, y: position.y - index * fontSize, size: fontSize });
                });

                const newPdfBytes = await pdfDoc.save();
                setPdfBytes(newPdfBytes);
            }
        } catch (error) {
            console.error('Error converting to PDF:', error);
        }
    };
    
    return (
    <div className="pdf-converter-container">
      <input
        type="file"
        accept=".docx, .png"
        onChange={handleFileChange}
        className="pdf-converter-input"
      />
      <button
        onClick={convertToPDF}
        className="pdf-converter-button"
      >
        Convert to PDF
      </button>
      {pdfBytes && (
        <a
          href={URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }))}
          download="converted_document.pdf"
          className="pdf-download-link"
        >
          Download PDF
        </a>
      )}
    </div>
  );
};

export default PDFConverter;