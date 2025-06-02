import jsPDF from 'jspdf';
import { GroupedOrderData } from './groupingUtils';
import { format } from 'date-fns';

/**
 * Export simple category summary to PDF using native jsPDF
 */
export const exportNativeCategorySummaryToPDF = (groupedData: GroupedOrderData): void => {
  try {
    // Create new jsPDF instance
    const doc = new jsPDF();
    
    // Set up document properties
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    let yPosition = margin;
    
    // Title
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('Active Orders by Category', margin, yPosition);
    yPosition += 15;
    
    // Date
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    const currentDate = format(new Date(), 'PPP');
    doc.text(`Generated on: ${currentDate}`, margin, yPosition);
    yPosition += 20;
    
    // Header line
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;
    
    // Category items
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    
    // Process categorized groups
    groupedData.categorizedGroups.forEach((group) => {
      // Check if we need a new page
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = margin;
      }
      
      // Category name
      doc.setFont('helvetica', 'bold');
      doc.text(`${group.categoryName}`, margin, yPosition);
      
      // Order count
      doc.setFont('helvetica', 'normal');
      doc.text(`${group.orders.length} orders`, margin + 100, yPosition);
      
      yPosition += 12;
    });
    
    // Add uncategorized if present
    if (groupedData.uncategorizedGroup.orders.length > 0) {
      if (yPosition > pageHeight - 40) {
        doc.addPage();
        yPosition = margin;
      }
      
      doc.setFont('helvetica', 'bold');
      doc.text('Uncategorized', margin, yPosition);
      doc.setFont('helvetica', 'normal');
      doc.text(`${groupedData.uncategorizedGroup.orders.length} orders`, margin + 100, yPosition);
      yPosition += 12;
    }
    
    // Total summary
    yPosition += 10;
    doc.setLineWidth(0.5);
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;
    
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.text(
      `Total: ${groupedData.summary.totalOrders} orders across ${groupedData.summary.totalCategories} categories`,
      margin,
      yPosition
    );
    
    // Footer
    const footerY = pageHeight - 20;
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text('Sacred Sutra Tools - Category Summary Report', margin, footerY);
    
    // Save the PDF
    const filename = `category-summary-${format(new Date(), 'yyyy-MM-dd')}.pdf`;
    doc.save(filename);
    
  } catch (error) {
    console.error('Native PDF export failed:', error);
    
    // Fallback: create a simple text-based summary
    const summary = groupedData.categorizedGroups.map(group => 
      `${group.categoryName}: ${group.orders.length} orders`
    ).join('\n');
    
    const uncategorizedSummary = groupedData.uncategorizedGroup.orders.length > 0 
      ? `\nUncategorized: ${groupedData.uncategorizedGroup.orders.length} orders` 
      : '';
    
    const totalSummary = `\n\nTotal: ${groupedData.summary.totalOrders} orders across ${groupedData.summary.totalCategories} categories`;
    
    const fullSummary = `Active Orders Summary\nGenerated on: ${format(new Date(), 'PPP')}\n\n${summary}${uncategorizedSummary}${totalSummary}`;
    
    const blob = new Blob([fullSummary], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `category-summary-${format(new Date(), 'yyyy-MM-dd')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }
}; 