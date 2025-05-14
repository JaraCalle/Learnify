from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.filters import SearchFilter
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Course
from manage_courses.serializers import CourseSerializer

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