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

    def test_client_get(self):
        user = TodoUser.objects.create(username='user3', first_name='Lala', last_name='Sasa', email='user3@user.com')
        client = APIClient()
        response = client.get(f'/api/users/{user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_client_guest(self):
        user = TodoUser.objects.create(username='user3', first_name='Lala', last_name='Sasa', email='user3@user.com')
        client = APIClient()
        response = client.put(f'/api/users/{user.id}/', {'first_name': 'RaRa'})
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)


    def test_client_create_admin(self):
        user = TodoUser.objects.create(username='user3', first_name='Lala', last_name='Sasa', email='user3@user.com')
        client = APIClient()
        admin = TodoUser.objects.create_superuser('adm1', 'adm1@usr.com', 'adm_0123')
        client.login(username='adm', password='adm_0123')
        response = client.put(f'/api/users/{user.id}/', {'username': 'user4', 'first_name': 'RaRa', 'last_name': 'Zaza',
                                                         'email': 'user4@user.com'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        user = TodoUser.objects.get(id=user.id)
        self.assertEqual(user.first_name, 'RaRa')
        client.logout()

    def tearDown(self):
        pass
