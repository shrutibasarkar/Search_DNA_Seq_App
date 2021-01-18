from django.urls import path
from . import views

urlpatterns = [
    path('dna_seq/', views.createBlast, name='createBlast'),
    path('results/', views.getResults, name='result'),
]
