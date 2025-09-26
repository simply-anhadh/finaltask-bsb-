import jsPDF from 'jspdf';
import { Roadmap } from '../types';

export const exportToPDF = (roadmap: Roadmap, goalText: string, completedWeeks: Set<string>) => {
  const pdf = new jsPDF();
  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;
  let yPos = 30;

  // Title
  pdf.setFontSize(24);
  pdf.setFont('helvetica', 'bold');
  pdf.text('🌱 Agentic AI Planner - Your Roadmap', margin, yPos);
  yPos += 20;

  // Goal
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Goal:', margin, yPos);
  yPos += 10;
  
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  const goalLines = pdf.splitTextToSize(goalText, pageWidth - 2 * margin);
  pdf.text(goalLines, margin, yPos);
  yPos += goalLines.length * 6 + 15;

  // Progress
  const totalWeeks = Object.keys(roadmap.weeks).length;
  const completedCount = completedWeeks.size;
  const progressPercent = Math.round((completedCount / totalWeeks) * 100);
  
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Progress: ${completedCount}/${totalWeeks} weeks completed (${progressPercent}%)`, margin, yPos);
  yPos += 20;

  // Milestones
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Key Milestones:', margin, yPos);
  yPos += 10;

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  roadmap.milestones.forEach((milestone, index) => {
    if (yPos > 250) { // New page if needed
      pdf.addPage();
      yPos = 30;
    }
    pdf.text(`• ${milestone}`, margin + 5, yPos);
    yPos += 8;
  });

  yPos += 10;

  // Weekly Breakdown
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.text('Weekly Plan:', margin, yPos);
  yPos += 15;

  Object.entries(roadmap.weeks).forEach(([week, data]) => {
    if (yPos > 200) { // New page if needed
      pdf.addPage();
      yPos = 30;
    }

    const isCompleted = completedWeeks.has(week);
    const status = isCompleted ? '✅' : '⏳';

    // Week header
    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.text(`${status} ${week}`, margin, yPos);
    yPos += 10;

    // Tasks
    pdf.setFontSize(10);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Tasks:', margin + 5, yPos);
    yPos += 6;
    
    pdf.setFont('helvetica', 'normal');
    data.tasks.forEach(task => {
      if (yPos > 270) {
        pdf.addPage();
        yPos = 30;
      }
      const taskLines = pdf.splitTextToSize(`• ${task}`, pageWidth - 2 * margin - 10);
      pdf.text(taskLines, margin + 10, yPos);
      yPos += taskLines.length * 5 + 2;
    });

    // Mentor Tip
    yPos += 5;
    pdf.setFont('helvetica', 'bold');
    pdf.text('Mentor Tip:', margin + 5, yPos);
    yPos += 6;
    
    pdf.setFont('helvetica', 'italic');
    const tipLines = pdf.splitTextToSize(`"${data.mentorTip}"`, pageWidth - 2 * margin - 10);
    pdf.text(tipLines, margin + 10, yPos);
    yPos += tipLines.length * 5 + 10;
  });

  // Save the PDF
  const fileName = `agentic-ai-planner-${new Date().toISOString().split('T')[0]}.pdf`;
  pdf.save(fileName);
};