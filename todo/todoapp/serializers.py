from rest_framework.relations import StringRelatedField
from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer, HyperlinkedRelatedField

from .models import Project, ToDo


class ProjectSerializer(ModelSerializer):
    # users = StringRelatedField(many=True)

    class Meta:
        model = Project
        fields = '__all__'


class ToDoSerializer(ModelSerializer):
    # project = StringRelatedField()
    # creator = StringRelatedField()

    class Meta:
        model = ToDo
        fields = '__all__'
