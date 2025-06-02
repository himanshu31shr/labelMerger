import html2pdf from 'html2pdf.js';
import { CategoryGroup, GroupedOrderData, getCategoryStatistics } from './groupingUtils';
import { format } from 'date-fns';

/**
 * Generate HTML template for PDF export of grouped category data
 */
export const generateCategoryGroupHTML = (groupedData: GroupedOrderData): string => {
  const currentDate = format(new Date(), 'PPP');
  const currentTime = format(new Date(), 'p');

  const generateCategorySection = (group: CategoryGroup) => {
    const stats = getCategoryStatistics(group);
    
    return `
      <div class="category-section">
        <div class="category-header">
          <h3>${group.categoryName}</h3>
          <div class="category-stats">
            <span class="stat">Items: ${stats.itemCount}</span>
            <span class="stat">Qty: ${stats.totalQuantity}</span>
            <span class="stat">Revenue: ₹${stats.totalRevenue.toLocaleString()}</span>
            <span class="stat">Platforms: ${stats.platforms}</span>
          </div>
        </div>
        <table class="orders-table">
          <thead>
            <tr>
              <th>SKU</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Platform</th>
              <th>Revenue</th>
            </tr>
          </thead>
          <tbody>
            ${group.orders.map(order => {
              const revenue = (order.product?.sellingPrice || 0) * (parseInt(order.quantity) || 0);
              return `
                <tr>
                  <td>${order.SKU || 'N/A'}</td>
                  <td>${order.name || 'N/A'}</td>
                  <td>${order.quantity}</td>
                  <td><span class="platform platform-${order.type}">${order.type.toUpperCase()}</span></td>
                  <td>₹${revenue.toLocaleString()}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;
  };

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Active Orders by Category - ${currentDate}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: white;
          color: #333;
          line-height: 1.4;
          padding: 20px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #1976d2;
          padding-bottom: 20px;
        }
        
        .header h1 {
          color: #1976d2;
          font-size: 28px;
          margin-bottom: 8px;
        }
        
        .header .date-time {
          color: #666;
          font-size: 14px;
        }
        
        .summary-cards {
          display: flex;
          justify-content: space-around;
          margin-bottom: 30px;
          gap: 15px;
        }
        
        .summary-card {
          background: #f5f5f5;
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          flex: 1;
          border-left: 4px solid #1976d2;
        }
        
        .summary-card h4 {
          color: #1976d2;
          font-size: 16px;
          margin-bottom: 5px;
        }
        
        .summary-card .value {
          font-size: 24px;
          font-weight: bold;
          color: #333;
        }
        
        .category-section {
          margin-bottom: 30px;
          break-inside: avoid;
        }
        
        .category-header {
          background: #1976d2;
          color: white;
          padding: 15px;
          border-radius: 8px 8px 0 0;
        }
        
        .category-header h3 {
          font-size: 18px;
          margin-bottom: 8px;
        }
        
        .category-stats {
          display: flex;
          gap: 15px;
          font-size: 14px;
        }
        
        .stat {
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 8px;
          border-radius: 4px;
        }
        
        .orders-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 15px;
          background: white;
          border: 1px solid #ddd;
        }
        
        .orders-table th {
          background: #f8f9fa;
          padding: 12px 8px;
          text-align: left;
          border-bottom: 2px solid #ddd;
          font-weight: 600;
          font-size: 14px;
        }
        
        .orders-table td {
          padding: 10px 8px;
          border-bottom: 1px solid #eee;
          font-size: 13px;
        }
        
        .orders-table tr:nth-child(even) {
          background: #f9f9f9;
        }
        
        .platform {
          padding: 4px 8px;
          border-radius: 4px;
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
        }
        
        .platform-amazon {
          background: #ff9500;
          color: white;
        }
        
        .platform-flipkart {
          background: #2874f0;
          color: white;
        }
        
        .footer {
          margin-top: 30px;
          text-align: center;
          color: #666;
          font-size: 12px;
          border-top: 1px solid #ddd;
          padding-top: 15px;
        }
        
        @media print {
          body { padding: 10px; }
          .category-section { page-break-inside: avoid; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Active Orders Grouped by Category</h1>
        <div class="date-time">Generated on ${currentDate} at ${currentTime}</div>
      </div>
      
      <div class="summary-cards">
        <div class="summary-card">
          <h4>Total Categories</h4>
          <div class="value">${groupedData.summary.totalCategories}</div>
        </div>
        <div class="summary-card">
          <h4>Total Orders</h4>
          <div class="value">${groupedData.summary.totalOrders}</div>
        </div>
        <div class="summary-card">
          <h4>Total Revenue</h4>
          <div class="value">₹${groupedData.summary.totalRevenue.toLocaleString()}</div>
        </div>
      </div>
      
      ${groupedData.categorizedGroups.map(group => generateCategorySection(group)).join('')}
      
      ${groupedData.uncategorizedGroup.totalItems > 0 ? generateCategorySection(groupedData.uncategorizedGroup) : ''}
      
      <div class="footer">
        <p>Sacred Sutra Tools - Active Orders Report</p>
        <p>This report contains ${groupedData.summary.totalOrders} orders across ${groupedData.summary.totalCategories} categories</p>
      </div>
    </body>
    </html>
  `;
};

/**
 * Export grouped category data to PDF
 */
export const exportCategoryGroupsToPDF = (groupedData: GroupedOrderData, filename?: string): void => {
  const htmlContent = generateCategoryGroupHTML(groupedData);
  
  // Create a temporary element to hold the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  tempDiv.style.top = '-9999px';
  document.body.appendChild(tempDiv);

  const options = {
    margin: 0.5,
    filename: filename || `active-orders-by-category-${format(new Date(), 'yyyy-MM-dd')}.pdf`,
    image: { type: 'png', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      letterRendering: true
    },
    jsPDF: { 
      unit: 'in', 
      format: 'a4', 
      orientation: 'portrait' 
    },
  };

  const worker = html2pdf();
  
  try {
    worker
      .set(options)
      .from(tempDiv)
      .save();
    
    // Clean up the temporary element after a delay
    setTimeout(() => {
      if (document.body.contains(tempDiv)) {
        document.body.removeChild(tempDiv);
      }
    }, 1000);
  } catch (error: unknown) {
    console.error('Error generating PDF:', error);
    // Clean up the temporary element even on error
    if (document.body.contains(tempDiv)) {
      document.body.removeChild(tempDiv);
    }
  }
};

/**
 * Generate summary-only PDF for quick overview
 */
export const exportCategorySummaryToPDF = (groupedData: GroupedOrderData): void => {
  const currentDate = format(new Date(), 'PPP');
  const currentTime = format(new Date(), 'p');

  const summaryHTML = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Category Summary - ${currentDate}</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: white;
          color: #333;
          padding: 30px;
        }
        
        .header {
          text-align: center;
          margin-bottom: 40px;
          border-bottom: 2px solid #1976d2;
          padding-bottom: 20px;
        }
        
        .header h1 {
          color: #1976d2;
          font-size: 32px;
          margin-bottom: 10px;
        }
        
        .summary-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 30px;
        }
        
        .summary-table th {
          background: #1976d2;
          color: white;
          padding: 15px 10px;
          text-align: left;
          font-weight: 600;
        }
        
        .summary-table td {
          padding: 12px 10px;
          border-bottom: 1px solid #ddd;
        }
        
        .summary-table tr:nth-child(even) {
          background: #f9f9f9;
        }
        
        .total-row {
          background: #1976d2 !important;
          color: white;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Category Summary Report</h1>
        <div>Generated on ${currentDate} at ${currentTime}</div>
      </div>
      
      <table class="summary-table">
        <thead>
          <tr>
            <th>Category</th>
            <th>Items</th>
            <th>Total Quantity</th>
            <th>Total Revenue</th>
            <th>Platforms</th>
          </tr>
        </thead>
        <tbody>
          ${groupedData.categorizedGroups.map(group => {
            const stats = getCategoryStatistics(group);
            return `
              <tr>
                <td>${group.categoryName}</td>
                <td>${stats.itemCount}</td>
                <td>${stats.totalQuantity}</td>
                <td>₹${stats.totalRevenue.toLocaleString()}</td>
                <td>${stats.platforms}</td>
              </tr>
            `;
          }).join('')}
          ${groupedData.uncategorizedGroup.totalItems > 0 ? `
            <tr>
              <td>Uncategorized</td>
              <td>${groupedData.uncategorizedGroup.totalItems}</td>
              <td>${groupedData.uncategorizedGroup.totalQuantity}</td>
              <td>₹${groupedData.uncategorizedGroup.totalRevenue.toLocaleString()}</td>
              <td>${groupedData.uncategorizedGroup.platforms.join(', ')}</td>
            </tr>
          ` : ''}
          <tr class="total-row">
            <td><strong>TOTAL</strong></td>
            <td><strong>${groupedData.summary.totalOrders}</strong></td>
            <td><strong>${groupedData.categorizedGroups.reduce((sum, g) => sum + g.totalQuantity, 0) + groupedData.uncategorizedGroup.totalQuantity}</strong></td>
            <td><strong>₹${groupedData.summary.totalRevenue.toLocaleString()}</strong></td>
            <td><strong>${groupedData.summary.totalCategories} Categories</strong></td>
          </tr>
        </tbody>
      </table>
    </body>
    </html>
  `;

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = summaryHTML;
  tempDiv.style.position = 'absolute';
  tempDiv.style.left = '-9999px';
  document.body.appendChild(tempDiv);

  const worker = html2pdf();
  
  try {
    worker
      .set({
        margin: 0.5,
        filename: `category-summary-${format(new Date(), 'yyyy-MM-dd')}.pdf`,
        image: { type: 'png', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
      })
      .from(tempDiv)
      .save();
    
    // Clean up after a delay
    setTimeout(() => {
      if (document.body.contains(tempDiv)) {
        document.body.removeChild(tempDiv);
      }
    }, 1000);
  } catch (error: unknown) {
    console.error('Error generating summary PDF:', error);
    if (document.body.contains(tempDiv)) {
      document.body.removeChild(tempDiv);
    }
  }
}; 