from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from rest_framework.generics import RetrieveAPIView
from django.conf import settings
from rest_framework.permissions import AllowAny
from .models import User
from .serializers import UserSerializer

# GOOGLE AUTH TOKEN VIEW
class GoogleLoginView(SocialLoginView):
    auyhentication_classes = []
    adapter_class = GoogleOAuth2Adapter
    callback_url = settings.FRONT_END_BASE_URL
    client_class = OAuth2Client
    
class UserDetailByEmailView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    lookup_field = 'email'
    lookup_url_kwarg = 'email'