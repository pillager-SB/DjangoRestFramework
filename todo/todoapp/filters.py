from django_filters import rest_framework as filters
from .models import ToDo


class ToDoFilter(filters.FilterSet):
    class Meta:
        model = ToDo
        fields = ['project']
