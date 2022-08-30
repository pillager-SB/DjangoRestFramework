import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from users.models import TodoUser
from .views import ToDoViewSet, ProjectViewSet
from users.views import TodoUserViewSet
from .models import Project, ToDo


class TestTodoUserViewSet(TestCase):
    def setUp(self):
        self.url = '/api/users/'
        self.users = {'username': 'user3', 'first_name': 'Lala', 'last_name': 'Sasa', 'email': 'user3@user.com', }

        self.format = 'json'
        self.admin = TodoUser.objects.create_superuser('adm', 'adm@usr.com', 'adm_0123')

    def test_factory_get_list(self):
        factory = APIRequestFactory()
        request = factory.get(self.url)
        print(request)
        view = TodoUserViewSet.as_view({'get': 'list'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_factory_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post(self.url)
        view = TodoUserViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_factory_create_user(self):
        factory = APIRequestFactory()
        request = factory.post(self.url, self.users, format=self.format)
        force_authenticate(request, self.admin)
        view = TodoUserViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def tearDown(self):
        pass
