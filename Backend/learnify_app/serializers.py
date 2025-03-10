from rest_framework.serializers import ModelSerializer
from .models import User

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "profile_picture",
            "role",
            "created_at",
            "password",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        """Create a new user with encrypted password"""
        user = User.objects.create_user(
            email=validated_data["email"],
            first_name=validated_data["first_name"],
            last_name=validated_data["last_name"],
            password=validated_data["password"],
            role=validated_data.get("role", "student"),
        )
        return user
