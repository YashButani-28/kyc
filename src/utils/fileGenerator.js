import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";

// Utility function to get non-empty entries from an object
export const getNonEmptyEntries = (form) => {
  if (form && typeof form === "object") {
    return Object.entries(form).map(([key, value]) => ({ key, value }));
  }
  return [];
};

// Mapping of form keys to their respective section titles
const sectionTitles = {
  form1: "Basic Details :-",
  form2: "Terms Details :-",
  form3: "User Details :-",
  form4: "Address Details :-",
};

export const generatePDF = (formDetails1) => {
  if (!formDetails1 || Object.keys(formDetails1).length === 0) {
    console.error("No form data available to download.");
    return;
  }

  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.setTextColor(0, 0, 0);
  const text = "KYC Report";
  const textWidth = doc.getTextWidth(text);
  const x = (doc.internal.pageSize.width - textWidth) / 2;
  doc.text(text, x, 10);

  let yOffset = 20;
  const lineHeight = 10;
  const pageHeight = doc.internal.pageSize.height;
  let currentY = yOffset;

  const formOrder = ["form1", "form2", "form3", "form4"];

  formOrder.forEach((formKey, index) => {
    const formValue = formDetails1[formKey];
    if (formValue && typeof formValue === "object") {
      const nonEmptyEntries = getNonEmptyEntries(formValue);
      if (nonEmptyEntries.length > 0) {
        const sectionTitle = sectionTitles[formKey] || formKey;

        const sectionHeight = lineHeight * (nonEmptyEntries.length + 1);
        const spaceRequired = sectionHeight + 10;

        if (currentY + spaceRequired > pageHeight) {
          if (index !== 2) {
            doc.addPage();
            currentY = 10;
          }
        }

        const padding = 5;
        currentY += padding;
        const contentX = 10 + padding;
        const contentY = currentY;

        doc.setFontSize(14);
        doc.setTextColor(107, 93, 199);
        doc.text(sectionTitle, contentX, contentY);
        currentY = contentY + lineHeight;

        const columnWidth = (doc.internal.pageSize.width - 3 * padding) / 2;

        const leftColumnEntries = nonEmptyEntries.slice(
          0,
          Math.ceil(nonEmptyEntries.length / 2)
        );
        const rightColumnEntries = nonEmptyEntries.slice(
          Math.ceil(nonEmptyEntries.length / 2)
        );

        let columnY = currentY;
        const leftColumnX = contentX;
        leftColumnEntries.forEach(({ key, value }) => {
          if (columnY + lineHeight > pageHeight) {
            doc.addPage();
            columnY = 10;
          }
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.text(`${key}: ${value}`, leftColumnX, columnY);
          columnY += lineHeight;
        });

        columnY = currentY;
        const rightColumnX = contentX + columnWidth + padding;
        rightColumnEntries.forEach(({ key, value }) => {
          if (columnY + lineHeight > pageHeight) {
            doc.addPage();
            columnY = 10;
          }
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
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

  Object.entries(formDetails1).forEach(([formKey, formValue]) => {
    if (formValue && typeof formValue === "object") {
      const nonEmptyEntries = getNonEmptyEntries(formValue);
      if (nonEmptyEntries.length > 0) {
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

  const headers = ["KYC Form :-"];
  data.push(headers);
  data.push([]);

  const formSections = ["form1", "form2", "form3", "form4"];

  formSections.forEach((formKey) => {
    const formData = formDetails1[formKey];
    if (formData && typeof formData === "object") {
      data.push([sectionTitles[formKey] || formKey]);
      data.push([]);
      const nonEmptyEntries = getNonEmptyEntries(formData);

      nonEmptyEntries.forEach(({ key, value }) => {
        data.push([key, value || ""]);
      });

      data.push([]);
    }
  });

  const ws = XLSX.utils.aoa_to_sheet(data);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "KYC Report");

  XLSX.writeFile(wb, "KYC_Report.xlsx");
};
