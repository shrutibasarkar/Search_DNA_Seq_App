from django.shortcuts import render,HttpResponse,redirect
from django.contrib import messages

# Create your views here.

def home(request):
    return HttpResponse("hello")
