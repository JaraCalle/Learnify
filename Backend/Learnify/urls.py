"""
URL configuration for Learnify project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from auth_users.urls import auth_urlpatterns as auth_users_urls
from auth_users.urls import urlpatterns
#Importing the urls from the auth_users to be used in the
from manage_courses.urls import urlpatterns as manage_courses_urls #Importing the urls from the manage_courses to be used in the
from payments.urls import urlpatterns as payments_urls
from courses_gateway.urls import urlpatterns as courses_gateway_urls

#learnify back end

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('dj_rest_auth.urls')), #Endpoint provided by dj_rest_aut
    path('api/social/login/', include(auth_users_urls)), #Endpoint provided by dj_rest_auth,
    path('courses/', include(manage_courses_urls)), #Include the manage_courses URLs
    path('users/', include(urlpatterns)), #Include the auth_users URLs)
    path('payments/', include(payments_urls)),
    path('cart/', include(courses_gateway_urls)),
]

