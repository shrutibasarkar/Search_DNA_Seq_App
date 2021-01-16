from django.shortcuts import render,HttpResponse,redirect
from django.contrib import messages
from .utility import valid_sequence, getBlast
from rest_framework import generics, status
from .models import Query
from .serializers import QuerySerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response

# Create your views here.

class IndexView(generics.ListCreateAPIView):
    queryset = Query.objects.all()
    serializer_class = QuerySerializer

# def home(request):
#     return HttpResponse("hello")
    
@api_view(['POST'])
def createBlast(request):
    dna_seq = request.data
    # print("Submitted dna sequence: {}".format(dna_seq))
    if not dna_seq:
        print("no DNA seq")
        Response(status=status.HTTP_400_BAD_REQUEST)
    
    dna_seq = valid_sequence(dna_seq)
    if dna_seq == False:
        print("not a valid DNA seq")
        return Response(status=status.HTTP_400_BAD_REQUEST)
    else:
        print("valid DNA seq")
        blast_res = getBlast(seq=dna_seq, db="/blastDB/mydb")           
        blast_res.wait(timeout=200, interval=0.5)
        return Response(status=status.HTTP_201_CREATED)
    
