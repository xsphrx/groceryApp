from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls, {'extra_context': {'mycontext': '123'}}),
    path('', include('groceryApp.urls')),
]
