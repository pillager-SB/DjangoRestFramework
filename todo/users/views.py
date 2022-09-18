from rest_framework.viewsets import ModelViewSet
from rest_framework import mixins, viewsets
from .serializers import TodoUserSerializer, TodoUserSerializerBase
from .models import TodoUser


class TodoUserViewSet(mixins.ListModelMixin, mixins.RetrieveModelMixin, mixins.CreateModelMixin,
                      mixins.UpdateModelMixin, viewsets.GenericViewSet):
    serializer_class = TodoUserSerializer
    queryset = TodoUser.objects.all()

    def get_serializer_class(self):
        return [TodoUserSerializer, TodoUserSerializerBase][self.request.version == '2.0']
    # filterset_fields = ['project']
