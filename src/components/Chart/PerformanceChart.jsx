// Performance Chart Component

import React, { useEffect, useRef } from 'react';
import { CHART_CONFIG } from '../../utils/constants';
import { useThemeContext } from '../../context/ThemeContext';
import styles from './PerformanceChart.module.css';

/**
 * Performance Chart Component
 * Displays a line chart of typing test performance over time
 */
const PerformanceChart = ({ history }) => {
  const canvasRef = useRef(null);
  const { isDark } = useThemeContext();

  useEffect(() => {
    if (!canvasRef.current || history.length < CHART_CONFIG.MIN_ITEMS_FOR_CHART) {
      return;
    }

    drawChart();
  }, [history, isDark]);

  const drawChart = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = CHART_CONFIG.CHART_HEIGHT;

    // Prepare data (reverse to show oldest to newest)
    const data = history.slice(0, CHART_CONFIG.MAX_HISTORY_ITEMS).reverse();
    const maxWPM = Math.max(...data.map((d) => d.wpm)) + 10;
    const padding = CHART_CONFIG.PADDING;
    const width = canvas.width - padding * 2;
    const height = canvas.height - padding * 2;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Theme colors
    const lineColor = isDark ? '#38BDF8' : '#2563EB';
    const gridColor = isDark ? '#334155' : '#E2E8F0';
    const textColor = isDark ? '#CBD5E1' : '#475569';

    // Draw grid lines
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height / 5) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    // Draw line chart
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = 3;
    ctx.beginPath();

    data.forEach((result, index) => {
      const x = padding + (width / (data.length - 1)) * index;
      const y = padding + height - (result.wpm / maxWPM) * height;

      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.stroke();

    // Draw data points
    data.forEach((result, index) => {
      const x = padding + (width / (data.length - 1)) * index;
      const y = padding + height - (result.wpm / maxWPM) * height;

      ctx.fillStyle = lineColor;
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw X-axis labels (Test numbers)
    ctx.fillStyle = textColor;
    ctx.font = '12px DM Sans';
    ctx.textAlign = 'center';

    data.forEach((result, index) => {
      const x = padding + (width / (data.length - 1)) * index;
      ctx.fillText(`Test ${index + 1}`, x, canvas.height - 10);
    });

    // Draw Y-axis labels (WPM values)
    ctx.textAlign = 'right';
    for (let i = 0; i <= 5; i++) {
      const y = padding + (height / 5) * i;
      const value = Math.round(maxWPM - (maxWPM / 5) * i);
      ctx.fillText(value, padding - 10, y + 5);
    }
  };

  // Don't show chart if not enough data
  if (history.length < CHART_CONFIG.MIN_ITEMS_FOR_CHART) {
    return null;
  }

  return (
    <div className={styles.chartContainer}>
      <h3 className={styles.chartTitle}>Performance Trend</h3>
      <canvas ref={canvasRef} className={styles.canvas}></canvas>
    </div>
  );
};

export default PerformanceChart;