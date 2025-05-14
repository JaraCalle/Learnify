from django.urls import path
from .views import CourseListCreateView, CourseDetailView, get_owned_courses

urlpatterns = [
    path('', CourseListCreateView.as_view(), name='course_list_create'),
    path('<int:pk>/', CourseDetailView.as_view(), name='course_detail'),
    path('owned/', get_owned_courses, name='owned_courses'),
]