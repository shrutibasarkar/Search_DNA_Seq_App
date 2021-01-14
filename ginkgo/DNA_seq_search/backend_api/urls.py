from django.urls import path
from . import views

urlpatterns = [
    # path('', views.home, name='home'),
    path('', views.IndexView.as_view(), name='index'),
    path('dna_seq', views.getDNA, name='getDNA'),
    
]
