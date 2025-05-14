import requests
import os
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.filters import SearchFilter
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Course
from manage_courses.serializers import CourseSerializer
from manage_courses.reports.pdf_report import PDFReportGenerator
from manage_courses.reports.excel_report import ExcelReportGenerator
from manage_courses.reports.interfaces import ReportGenerator

@api_view(['GET'])
@permission_classes([AllowAny])
def export_courses_report(request):
    format = request.query_params.get('format', 'pdf')
    courses = Course.objects.all()
    # Inversión de dependencia
    generator: ReportGenerator
    if format == 'excel':
        generator = ExcelReportGenerator()
    else:
        generator = PDFReportGenerator()

    return generator.generate(courses)

@api_view(['GET'])
def fetch_external_nfts(request):
    external_api_url = os.getenv('EXTERNAL_API_BASE_URL')
    try:
        response = requests.get(external_api_url, timeout=5)
        response.raise_for_status()
        return Response(response.json())
    except requests.RequestException as e:
        return Response({'error': str(e)}, status=500)

class CourseListCreateView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]
    
    # Filtro de búsqueda
    filter_backends = [SearchFilter]
    search_fields = [
        'title', 
        'description', 
        'category', 
        'difficulty', 
    ]
    
class CourseDetailView(generics.RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_owned_courses(request):
    owned_courses = request.user.owned_courses.all()
    return Response(CourseSerializer(owned_courses, many=True).data)

