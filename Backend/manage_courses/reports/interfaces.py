from abc import ABC, abstractmethod
from django.http import HttpResponse

class ReportGenerator(ABC):
    @abstractmethod
    def generate(self, courses) -> HttpResponse:
        pass
