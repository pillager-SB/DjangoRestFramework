from django.shortcuts import render
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.renderers import JSONRenderer, BrowsableAPIRenderer
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAdminUser
from .filters import ToDoFilter
from .serializers import ToDoSerializer, ProjectSerializer
from .models import Project, ToDo


# class ProjectPagination(LimitOffsetPagination):
#     default_limit = 10


class ProjectViewSet(ModelViewSet):
    renderer_classes = [JSONRenderer, BrowsableAPIRenderer]
    serializer_class = ProjectSerializer
    queryset = Project.objects.all()
    # pagination_class = ProjectPagination

    # def get_queryset(self):
    #     queryset = Project.objects.all()
    #     name = self.request.query_params.get('name', '')
    #     if name:
    #         queryset = queryset.filter(name__contains=name)
    #     return queryset


# class ToDoPagination(LimitOffsetPagination):
#     default_limit = 20


class ToDoViewSet(ModelViewSet):
    serializer_class = ToDoSerializer
    queryset = ToDo.objects.all()

    # pagination_class = ToDoPagination
    # filter_class = ToDoFilter

    # def destroy(self, request, *args, **kwargs):
    #     try:
    #         instance = self.get_object()
    #         instance.is_active = False
    #         instance.save()
    #     except Exception as exc:
    #         raise Warning('Destroy is not completed!!!') from exc
