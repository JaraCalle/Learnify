from reportlab.pdfgen import canvas
from io import BytesIO
from django.http import HttpResponse
from .interfaces import ReportGenerator

class PDFReportGenerator(ReportGenerator):
    def generate(self, courses):
        buffer = BytesIO()
        p = canvas.Canvas(buffer)

        y = 800
        for course in courses:
            p.drawString(100, y, f"{course.title} - {course.difficulty} - ${course.price}")
            y -= 20

        p.showPage()
        p.save()
        buffer.seek(0)

        return HttpResponse(buffer, content_type='application/pdf')
