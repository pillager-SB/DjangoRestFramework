from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins, viewsets
from .serializers import TodoUserSerializer
from .models import TodoUser


class TodoUserViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin,
                      mixins.UpdateModelMixin, viewsets.GenericViewSet):
    queryset = TodoUser.objects.all()
    serializer_class = TodoUserSerializer
    filterset_fields = ['project']
