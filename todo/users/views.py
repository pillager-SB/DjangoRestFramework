from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import TodoUser
from .serializers import TodoUserSerializer


class TodoUserViewSet(ModelViewSet):
    queryset = TodoUser.objects.all()
    serializer_class = TodoUserSerializer

