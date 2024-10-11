import { format } from "date-fns";

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const renderFormatDate = (startDate, endDate) => {
  const formatstartDate = format(startDate, "MMM dd,yyyy");
  const formatendDate = format(endDate, "MMM dd,yyyy");

  return `${formatstartDate} – ${formatendDate}`;
};

export function getFileExtension(filename) {
  // Split the filename by dots and return the last element as the extension
  const parts = filename.split(".");
  if (parts.length > 1) {
    return parts.pop(); // pop removes and returns the last element
  }
  return ""; // Return empty string if no extension is found
}

export function getColorForFileType(fileType) {
  switch (fileType) {
    case "pdf":
      return "#EB5D3E"; // Orange color for PDF files
    case "doc":
    case "docx":
      return "#2F80ED"; // Blue color for DOC and DOCX files
    case "jpeg":
    case "jpg":
    case "png":
      return "#27AE60"; // Green color for image files (example colors)
    case "ppt":
    case "pptx":
      return "#D24726";
    case "xls":
    case "xlsx":
      return "#1D6F42";
    default:
      return "#CCCCCC"; // Default gray color for unknown file types
  }
}
