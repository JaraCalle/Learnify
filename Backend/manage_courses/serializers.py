from rest_framework.serializers import ModelSerializer, ValidationError, SerializerMethodField
from auth_users.serializers import UserSerializer
from .models import Course

class CourseSerializer(ModelSerializer):
    instructor = UserSerializer(read_only=True)
    thumbnail_url = SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            "id",
            "title",
            "description",
            "instructor",
            "created_at",
            "category",
            'difficulty',
            "estimated_duration",
            "price",
            "status",
            "rating_avg",
            "thumbnail",
            "thumbnail_url",
        ]
        extra_kwargs = {
            'thumbnail': {'write_only': True}
        }

    def get_thumbnail_url(self, obj):
        if obj.thumbnail:
            return obj.thumbnail.url
        return None


    def create(self, validated_data):
        """Create a new course"""
        request = self.context.get('request', None)
        print(request)
        if request and hasattr(request, 'user'):
            instructor = request.user
        else:
            raise ValidationError("Instructor information is missing.")
        
        course = Course.objects.create(
            title=validated_data["title"],
            description=validated_data["description"],
            instructor=instructor,
            difficulty=validated_data["difficulty"],
            estimated_duration=validated_data["estimated_duration"],
            category=validated_data["category"],
            price=validated_data["price"],
            status=validated_data["status"],
            thumbnail=validated_data["thumbnail"]
        )
        return course