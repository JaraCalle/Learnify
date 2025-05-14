import uuid
from django.db import models
from auth_users.models import User
from manage_courses.models import Course

class Order(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="orders")
    total_price = models.DecimalField(max_digits=15, decimal_places=2)
    status = models.CharField(max_length=15, choices=[("pending", "Pending"), ("completed", "Completed"), ("cancelled", "Cancelled")])
    course = models.ManyToManyField(Course, related_name="orders")
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.id} - {self.user}"

class Cart(models.Model):
    id = models.UUIDField(default=uuid.uuid4, primary_key=True, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="cart")
    courses = models.ManyToManyField(Course, related_name="carts")
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "Cart"

    def __str__(self):
        return f"{self.id} - {self.user}"