import graphene
from graphene import ObjectType, String, Schema
from graphene_django import DjangoObjectType
from todoapp.models import Project, ToDo
from users.models import TodoUser


class TodoUserType(DjangoObjectType):
    class Meta:
        model = TodoUser
        fields = '__all__'

class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'

class ToDoType(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(TodoUserType)

    def resolve_all_users(root, info):
        return TodoUser.objects.all()

    all_projects = graphene.List(ProjectType)

    def resolve_all_projects(root, info):
        return Project.objects.all()

    all_todos = graphene.List(ToDoType)

    def resolve_all_todos(root, info):
        return ToDo.objects.all()


schema = graphene.Schema(query=Query)
