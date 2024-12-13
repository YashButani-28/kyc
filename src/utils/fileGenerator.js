// utils/fileGenerator.js
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

// Utility function to get non-empty entries from an object
export const getNonEmptyEntries = (form) => {
  if (form && typeof form === "object") {
    return Object.entries(form)
      .map(([key, value]) => ({ key, value }));
  }
  return [];
};

// Mapping of form keys to their respective section titles
const sectionTitles = {
  form1: "Basic Details :-",
  form2: "Terms Details :-",
  form3: "User Details :-",
  form4: "Address Details :-"
};

export const generatePDF = (formDetails1) => {
  if (!formDetails1 || Object.keys(formDetails1).length === 0) {
    console.error("No form data available to download.");
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0); // Set text color to black
  const text = "KYC Report";
  const textWidth = doc.getTextWidth(text);
  const x = (doc.internal.pageSize.width - textWidth) / 2; // Calculate the center position
  doc.text(text, x, 10);

  let yOffset = 20; // Initial Y position for text
  const lineHeight = 10; // Height of each line of text
  const pageHeight = doc.internal.pageSize.height; // Page height in points
  let currentY = yOffset;

  // Define the form order as 1, 2, 3, 4
  const formOrder = ['form1', 'form2', 'form3', 'form4'];

  formOrder.forEach((formKey, index) => {
    const formValue = formDetails1[formKey];
    if (formValue && typeof formValue === "object") {
      const nonEmptyEntries = getNonEmptyEntries(formValue);
      if (nonEmptyEntries.length > 0) {
        // Get the section title from the mapping or use the form key as a fallback
        const sectionTitle = sectionTitles[formKey] || formKey;

        // Calculate the total space required for the section (title + entries)
        const sectionHeight = lineHeight * (nonEmptyEntries.length + 1); 
        const spaceRequired = sectionHeight + 10; 

        if (currentY + spaceRequired > pageHeight) {
          
          if (index !== 2) { 
            doc.addPage();
            currentY = 10; 
          }
        }

        // Set content positioning
        const padding = 5;
        currentY += padding; // Space between the content and top of the page
        const contentX = 10 + padding; // X position with padding
        const contentY = currentY; // Y position with padding

        doc.setFontSize(14);
        doc.setTextColor(107, 93, 199); // Set section title color to blue
        doc.text(sectionTitle, contentX, contentY);
        currentY = contentY + lineHeight; // Update currentY after the title

        // Set the content positions with equal padding on left and right
        const columnWidth = (doc.internal.pageSize.width - 3 * padding) / 2; // Two columns with equal space in between

        // Divide entries into two columns
        const leftColumnEntries = nonEmptyEntries.slice(0, Math.ceil(nonEmptyEntries.length / 2));
        const rightColumnEntries = nonEmptyEntries.slice(Math.ceil(nonEmptyEntries.length / 2));

        // Print left column entries
        let columnY = currentY;
        const leftColumnX = contentX;
        leftColumnEntries.forEach(({ key, value }) => {
          if (columnY + lineHeight > pageHeight) {
            doc.addPage();
            columnY = 10; // Reset Y position after adding a new page
          }
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0); // Set text color to black for content
          doc.text(`${key}: ${value}`, leftColumnX, columnY);
          columnY += lineHeight;
        });

        // Print right column entries
        columnY = currentY;
        const rightColumnX = contentX + columnWidth + padding; 
        rightColumnEntries.forEach(({ key, value }) => {
          if (columnY + lineHeight > pageHeight) {
            doc.addPage();
            columnY = 10; // Reset Y position after adding a new page
          }
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0); // Set text color to black for content
          doc.text(`${key}: ${value}`, rightColumnX, columnY);
          columnY += lineHeight;
        });

        
        currentY = Math.max(columnY, currentY);
      }
    }
    
  });

  doc.save("KYC_Report.pdf");
};


// Function to generate an XML file from form data
export const generateXML = (formDetails1) => {
  if (!formDetails1 || Object.keys(formDetails1).length === 0) {
    console.error("No form data available to download.");
    return;
  }

  let xmlData = `<KYCReport>\n`;

  // Loop through the form details to create XML structure
  Object.entries(formDetails1).forEach(([formKey, formValue]) => {
    if (formValue && typeof formValue === "object") {
      const nonEmptyEntries = getNonEmptyEntries(formValue);
      if (nonEmptyEntries.length > 0) {
        // Add a section title as a comment or tag
        const sectionTitle = sectionTitles[formKey] || formKey;
        xmlData += `  <!-- ${sectionTitle} -->\n`;
        xmlData += `  <${formKey}>\n`;

        nonEmptyEntries.forEach(({ key, value }) => {
          xmlData += `    <${key}>${value}</${key}>\n`;
        });
        xmlData += `  </${formKey}>\n`;
      }
    }
  });

  xmlData += `</KYCReport>`;

  const blob = new Blob([xmlData], { type: "application/xml" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "KYC_Report.xml";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


// Generate Excel sheet 



export const generateExcel = (formDetails1) => {
  if (!formDetails1 || Object.keys(formDetails1).length === 0) {
    console.error("No form data available to download.");
    return;
  }

  const data = [];
  
  // Header for the Excel sheet
  const headers = ["KYC Form :-"];
  data.push(headers);
  data.push([]);  // Empty row to separate the header

  // Form sections to iterate through
  const formSections = ['form1', 'form2', 'form3', 'form4'];

  formSections.forEach((formKey) => {
    const formData = formDetails1[formKey];
    if (formData && typeof formData === "object") {
      // Add section title
      data.push([sectionTitles[formKey] || formKey]);
      data.push([]);  // Empty row to separate sections

      // Get non-empty entries for the form
      const nonEmptyEntries = getNonEmptyEntries(formData);

      // Add each entry (key-value pair) to the Excel data
      nonEmptyEntries.forEach(({ key, value }) => {
        data.push([key, value || ""]);  // If value is null or undefined, set empty string
      });

      data.push([]);  // Empty row after each form section
    }
  });

  // Convert the data array to a worksheet
  const ws = XLSX.utils.aoa_to_sheet(data);

  // Create a new workbook and append the worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "KYC Report");

  // Write the Excel file
  XLSX.writeFile(wb, "KYC_Report.xlsx");
};
